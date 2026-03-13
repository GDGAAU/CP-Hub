import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { Pool } = pg;

async function setup() {
    const config = {
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
    };

    const postgresPool = new Pool({ ...config, database: 'postgres' });

    try {
        console.log('Connecting to postgres database...');
        await postgresPool.query('SELECT 1');
        console.log('Connected!');

        const dbName = process.env.DB_DATABASE || 'cphub';
        const res = await postgresPool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (res.rows.length === 0) {
            console.log(`Creating database ${dbName}...`);
            await postgresPool.query(`CREATE DATABASE ${dbName}`);
            console.log('Database created!');
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
        await postgresPool.end();

        console.log(`Connecting to ${dbName}...`);
        const cphubPool = new Pool({ ...config, database: dbName });
        
        const sqlPath = path.join(process.cwd(), 'init.sql');
        console.log(`Reading ${sqlPath}...`);
        // Using fs.readFileSync with encoding to handle the potential UTF-16LE issue
        let sql = fs.readFileSync(sqlPath, 'utf8');
        
        // Basic check for UTF-16LE if it looks like garbage
        if (sql.includes('\u0000')) {
             sql = fs.readFileSync(sqlPath, 'utf16le');
        }

        console.log('Executing init.sql...');
        await cphubPool.query(sql);
        console.log('Database initialized successfully!');
        await cphubPool.end();

    } catch (err) {
        console.error('Error during database setup:', err);
        process.exit(1);
    }
}

setup();
