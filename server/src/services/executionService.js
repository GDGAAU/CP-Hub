import { exec } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";
import { fileURLToPath } from "url";

// Polyfill for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = util.promisify(exec);
const tempDir = path.join(__dirname, "../../../temp");

// Ensure temp directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

export const executeCode = async (language, code, testCases) => {
    const fileId = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const executionDir = path.join(tempDir, fileId);

    // Create unique directory for this execution
    if (!fs.existsSync(executionDir)) {
        fs.mkdirSync(executionDir, { recursive: true });
    }

    // Language configurations
    let image, ext, buildCmd, runCmd;

    if (language === "Python") {
        image = "python:3.9-slim";
        ext = "py";
        runCmd = `python /app/code_${fileId}.py`;
    } else if (language === "JavaScript") {
        image = "node:18-slim";
        ext = "js";
        runCmd = `node /app/code_${fileId}.js`;
    } else if (language === "C++") {
        image = "gcc:latest";
        ext = "cpp";
        buildCmd = `g++ /app/code_${fileId}.cpp -o /app/a.out_${fileId}`;
        runCmd = `/app/a.out_${fileId}`;
    } else if (language === "Java") {
        image = "openjdk:17-slim";
        ext = "java";
        buildCmd = `javac /app/Main.java`;
        runCmd = `java -cp /app Main`;
        // For Java, the file name often needs to match the public class name. Let's just use Main.java
        code = code.replace(/public\s+class\s+\w+/g, "public class Main");
    } else {
        throw new Error(`Unsupported language: ${language}`);
    }

    // Adjust filename for Java
    const filename = language === "Java" ? `Main.java` : `code_${fileId}.${ext}`;
    const filepath = path.join(executionDir, filename);

    // Write code to file
    fs.writeFileSync(filepath, code);

    let results = [];
    let allPassed = true;
    let totalRuntime = 0;

    try {
        // If there's a build command (like C++ or Java), run it first
        if (buildCmd) {
            const dockerBuildCmd = `docker run --rm -v "${executionDir}:/app" -w /app ${image} sh -c "${buildCmd}"`;
            try {
                await execPromise(dockerBuildCmd, { timeout: 10000 }); // 10s for compilation
            } catch (err) {
                return {
                    status: "Compilation Error",
                    results: [],
                    runtime: 0,
                    memory: 0,
                    error: err.stderr || err.message
                };
            }
        }

        // Now run against test cases
        for (let i = 0; i < testCases.length; i++) {
            const testcase = testCases[i];
            const input = testcase.input || "";
            const expectedOutput = testcase.output ? testcase.output.trim() : "";

            const inputFilename = `input_${fileId}_${i}.txt`;
            const inputFilepath = path.join(executionDir, inputFilename);
            fs.writeFileSync(inputFilepath, input);

            const startTime = performance.now();

            const dockerRunCmd = `docker run --rm -v "${executionDir}:/app" -w /app --network none --memory="128m" --cpus="0.5" ${image} sh -c "${runCmd} < /app/${inputFilename}"`;

            try {
                const { stdout, stderr } = await execPromise(dockerRunCmd, { timeout: 5000 }); // 5s runtime limit

                const runtime = performance.now() - startTime;
                totalRuntime += runtime;

                const actualOutput = (stdout || "").trim();
                const passed = actualOutput === expectedOutput;

                if (!passed) allPassed = false;

                results.push({
                    passed,
                    input,
                    expectedOutput,
                    actualOutput,
                    runtime: Math.round(runtime),
                    error: stderr || null
                });

            } catch (err) {
                allPassed = false;
                results.push({
                    passed: false,
                    input,
                    expectedOutput,
                    actualOutput: null,
                    runtime: 0,
                    error: err.killed ? "Time Limit Exceeded (TLE)" : err.message || err.stderr
                });
                break; // Stop running subsequent test cases if one fails (fail fast)
            } finally {
                if (fs.existsSync(inputFilepath)) fs.unlinkSync(inputFilepath);
            }
        }

        return {
            status: allPassed ? "Accepted" : "Wrong Answer",
            results,
            runtime: Math.round(totalRuntime / testCases.length) || 0,
            memory: Math.floor(Math.random() * 15) + 20 // Mock memory for now
        };

    } finally {
        // Comprehensive cleanup: Remove the entire execution directory
        if (fs.existsSync(executionDir)) {
            try {
                fs.rmSync(executionDir, { recursive: true, force: true });
            } catch (err) {
                console.error(`Failed to clean up execution directory: ${executionDir}`, err);
            }
        }
    }
};
