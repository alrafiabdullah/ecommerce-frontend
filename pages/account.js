import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";
import styles from "../styles/Login.module.css";

function account() {

    const { user, logoutUser } = useContext(AuthContext);

    if (!user) {
        return (
            <div>
                <p>Please Login or Register</p>
                <Link href="/">Go Back</Link>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>{user.email}</title>
                <meta name="description" content="The account page, view your orders" />
            </Head>

            <h2>Account Page</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <Link href="/orders"><a style={{ textAlign: "center" }} className={styles.button}>Show Orders</a></Link>
            <a href="#" onClick={logoutUser}>Logout</a>
        </div>
    );
}

export default account;
