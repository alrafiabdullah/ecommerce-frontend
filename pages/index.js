import { useState } from "react";
import Head from 'next/head';
import Link from "next/link";
import styles from '../styles/Home.module.css';
import IndividualProduct from "../components/Product";

import { fromImagetoURL, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";

export default function Home({ products }) {
  const [light, setLight] = useState(true);

  const handleTheme = () => {
    setLight(light ? false : true);
  };

  return (
    <div>
      <Head>
        <title>E-Commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={light ? styles.lightMode : styles.darkMode}>
        <a><button style={{ padding: "1%", cursor: "pointer" }} onClick={handleTheme}>{light ? "Dark" : "Light"}</button></a>
        {products.map(product => {
          return <div key={product.id} className={styles.product}>

            <Link href={`/products/${product.slug}`}>
              <a>
                <IndividualProduct key={product.id} image={product.image} name={product.name} price={product.price} />
              </a>
            </Link>
          </div>;
        })}
      </div>

    </div>
  );
}

export async function getStaticProps() {
  //Fetch the products
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();

  //Return the products
  return {
    props: {
      products: products
    }
  };
}
