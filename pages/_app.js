import "@/styles/globals.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
