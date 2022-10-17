import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const response = await axios.post("https://wezo-blog.herokuapp.com/api/auth/login", inputs, { withCredentials: true });
        setCurrentUser(response.data);
    };

    const logout = async () => {
        await axios.post("https://wezo-blog.herokuapp.com/api/auth/logout", {}, { withCredentials: true });
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}