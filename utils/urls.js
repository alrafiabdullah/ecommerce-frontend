export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_test_5F9EBAEDE1133405";

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || "pk_test_ldsMjawYsGcUsdNYL88Fdpb000QVC4TXUM";

/**
 * Given an image return the Url
 * works for local and deployed strapis
 * @param {*} image 
 */

export const fromImagetoURL = (image) => {
    if (!image) {
        return "../public/vercel.svg";
    }

    if (image.url.indexOf("/") === 0) {
        return `${API_URL}${image.url}`;
    }

    return image.url;
};