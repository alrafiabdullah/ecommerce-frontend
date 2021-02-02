import Image from "next/image";

import { fromImagetoURL } from "../utils/urls";
import { twoDecimals } from "../utils/format";
import styles from "../styles/Product.module.css";

const Product = (props) => {
    const { image, name, price } = props;

    return (
        <div className={styles.product}>
            <img className={styles.img} src={fromImagetoURL(image)} alt={name} />
            <p>{name}</p>
            <p>${twoDecimals(price)}</p>
        </div>
    );
};

export default Product;
