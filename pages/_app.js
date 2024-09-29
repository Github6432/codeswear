import "@/styles/globals.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  //STATE
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  //USEFFECT GET ITEM LOCAL STORAGE
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
        subTotal
      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
  }, [])

  //SAVE CART & SUB TOTAL
  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    let subT = 0;
    let keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subT += newCart[keys[i]].price * newCart[keys[i]].qty;
    }
    setSubTotal(subT);
  };
  //ADD TO CART
  const addToCart = (itemCode, qty, price, name, size, variant, image) => {
    console.log('ccc1', cart)
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty, price, name, size, variant, image };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  //REMOVE FROM CART
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
    };
    if (newCart[itemCode]["qty"] < 1) {
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
  };

  //CLEAR CART
  const deleteCartItem = (itemCode) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      delete newCart[itemCode]
    };
    setCart(newCart);
    saveCart(newCart);
  }
  const buyNow = (itemCode, qty, price, name, size, variant, image) => {
    addToCart(itemCode, qty, price, name, size, variant, image);
    router.push('/checkout');
  }

  return (
    <>
      <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} deleteCartItem={deleteCartItem} subTotal={subTotal} />
      <Component {...pageProps} cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} deleteCartItem={deleteCartItem} subTotal={subTotal} />
      <Footer />
    </>
  );
}
