import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import styles from "../styles/Login.module.css";

function login() {
    const { loginUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); //disables the submit button after one click


    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();

        loginUser(email, password);

        setLoading(false);
    };

    return (
        <div>
            <Head>
                <title>Log In</title>
                <meta name="description" content="Login here to make your purchase" />
            </Head>
            <h2>Log In</h2>
            <small>If you enter wrong credential, you will be redirected here instead of the home page!</small>
            <form onSubmit={handleSubmit}>
                <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
                <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input className={styles.button} disabled={loading} id="submit" type="submit" value="Login" />
            </form>
            <div>
                Need an account? <Link href="/register"><button>Register Here</button></Link>
            </div>
        </div>
    );
}

export default login;
