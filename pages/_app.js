import Header from "../components/Header";
import Footer from "../components/Footer";

import { AuthProvider } from "../context/AuthContext";

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </AuthProvider>;
}

export default MyApp;
