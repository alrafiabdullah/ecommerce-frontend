import { API_URL } from "../utils/urls";
import AuthContext from "../context/AuthContext";
import styles from "../styles/Order.module.css";

import { useContext, useState, useEffect } from 'react';
import Link from "next/link";

const formatTime = (timestamp) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const newDate = new Date(timestamp);
    let hours = newDate.getUTCHours();
    let minutes = newDate.getUTCMinutes();
    let seconds = newDate.getUTCSeconds();
    let day = newDate.getUTCDate();
    let month = newDate.getUTCMonth();
    let year = newDate.getUTCFullYear();

    return `${day} ${monthNames[month]}, ${year} - ${hours}:${minutes}:${seconds}`;
};

const orders = () => {
    const { user, jwt } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = () => {
            fetch(`${API_URL}/orders`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }).then((response) => (response.json())).then(data => setOrders(data)).catch((err) => (console.log(err)));
        };

        getOrders();
    }, []);

    if (!user) {
        return (
            <div>
                <p>Please Login or Register</p>
                <Link href="/account">Go Back</Link>
            </div>
        );
    }
    return (
        <div>
            <h2>Orders - {user.username}</h2>
            <table border="1" className={styles.table}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price (USD)</th>
                        <th>Status</th>
                        <th>Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.product.name}</td>
                            <td>{order.product.price}</td>
                            <td>{order.status[0].toUpperCase() + order.status.substring(1)}</td>
                            <td>{formatTime(order.updated_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default orders;
