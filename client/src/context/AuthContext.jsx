import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios to send cookies
    axios.defaults.withCredentials = true;

    const checkAuth = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users/me");
            if (res.data) {
                setUser(res.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            if (res.data && res.data.user) {
                setUser(res.data.user);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.get("http://localhost:5000/api/auth/logout");
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
