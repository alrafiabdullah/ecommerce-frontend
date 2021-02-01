import Head from 'next/head';
import Link from "next/link";
import styles from '../styles/Home.module.css';

import { fromImagetoURL, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";

export default function Home({ products }) {

  return (
    <div>
      <Head>
        <title>E-Commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {products.map(product => {
        return <div key={product.id} className={styles.product}>

          <Link href={`/products/${product.slug}`}>
            <a>
              <div className={styles.product__Row}>

                <div className={styles.product__ColImg}>
                  <img src={fromImagetoURL(product.image)} />
                </div>

                <div className={styles.product__Col}>
                  {product.name} ${twoDecimals(product.price)}
                </div>

              </div>
            </a>
          </Link>
        </div>;
      })}

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
