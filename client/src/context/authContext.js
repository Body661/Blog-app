import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
axios.defaults.withCredentials = true;

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    useEffect(() => {
        if (!cookies.access_token) {
            setCurrentUser(null);
        }
    }, [cookies.access_token])

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