import axios from "axios";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

import { API_URL } from "../utils/urls";
import styles from "../styles/Login.module.css";

function login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        axios
            .post(`${API_URL}/auth/local/register`, {
                username: username,
                email: email,
                password: password,
            })
            .then(response => {
                // Handle success.
                toast.success("Registration Success! Please login to continue.", { duration: 10000 });
            })
            .catch(error => {
                // Handle error.
                toast.error("Please try again with valid information!", { duration: 10000 });
            });
        setLoading(false);
    };

    return (
        <div>
            <Head>
                <title>Registration</title>
                <meta name="description" content="Login here to make your purchase" />
            </Head>
            <Toaster />
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
                <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input className={styles.button} disabled={loading} id="submit" type="submit" value="Register" />
            </form>
        </div>
    );
}

export default login;
