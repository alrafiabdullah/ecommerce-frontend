import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState("");
    const router = useRouter();

    /**
     * handles the login using Strapi
     * @param {string} email 
     * @param {string} password 
     */
    const loginWithStrapi = (email, password) => {

        axios.post(`${API_URL}/auth/local`, {
            identifier: email,
            password: password,
        }).then(response => {
            // Handle success.
            setJwt(response.data.jwt);
            setUser(response.data.user);
            router.push("/");
        }).catch(error => {
            // Handle error.
            router.push("/login");
        });
    };


    /**
     * Logs in the user with email and password
     * @param {string} email
     * @param {string} password
     */
    const loginUser = (email, password) => {
        try {
            loginWithStrapi(email, password);
        } catch {

        }
    };

    /**
     * Sets the user to null
     */
    const logoutUser = () => {
        setUser(null);
        router.push("/");
    };


    return <AuthContext.Provider value={{ user, loginUser, logoutUser, jwt }}>
        {props.children}
    </AuthContext.Provider>;
};


export default AuthContext;

