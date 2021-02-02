import { useContext } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "universal-cookie";

import AuthContext from "../context/AuthContext";
import styles from "../styles/BuyButton.module.css";
import { STRIPE_PK, API_URL } from "../utils/urls";

const stripePromise = loadStripe(STRIPE_PK);

const BuyButton = ({ product }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const cookies = new Cookies();
    const token = cookies.get("jwt");
    console.log();

    const redirectToLogin = () => (router.push("/login"));

    const handleBuy = async () => {
        const stripe = await stripePromise;

        const res = await fetch(`${API_URL}/orders`, {
            method: "POST",
            body: JSON.stringify({ product }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const session = await res.json();
        console.log(session.id);
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
    };

    return (
        <>
            {!user && <button className={styles.buy} onClick={redirectToLogin}>Login to Buy</button>}
            {user && <button className={styles.buy} onClick={handleBuy}>BUY</button>}
        </>
    );
};

export default BuyButton;
