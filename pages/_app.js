import "@/styles/globals.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  //STATE
  const [key, setKey] = useState();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [progress, setProgress] = useState(0)
  const [usertoken, setUsertoken] = useState({ value: null });
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [userid, setUserid] = useState();
  const [products, setProducts] = useState();

  //USEFFECT GET ITEM LOCAL STORAGE
  useEffect(() => {
    setKey(Math.random());
    router.events.on('routeChangeStart', () => {
      setProgress(50);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
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
    const token = localStorage.getItem("token");
    if (token) {
      const data = jwt.decode(token);
      if (data.userid) {
        setUserid(data.userid);
      }
      setUsertoken({ value: token })
      setKey(Math.random());
    }
    getallproducts()
  }, [router.query])
  useEffect(() => {
    if (userid) {
      fetchUser(userid);
      fetchUserAddress(userid)

    }
  }, [userid]); // Only call fetchUser when userid is available

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
  const removeFromCart = (itemCode, qty, price, name, size, varian, image) => {
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
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    router.push('/');

  }

  const clearCart = () => {
    localStorage.removeItem('cart');
  }

  const fetchUser = async (userid) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid }),
      });

      let response = await res.json();
      if (response.success) {
        setUser(response.userDetails);
      } else {
        console.log('Error fetching user:', response.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  const fetchUserAddress = async (userid) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/useraddress`, {
        method: "POST", // or 'PUT'
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ userid }),
      });
      let response = await res.json();
      if (response.success) {
        setAddress(response.address)
      } else {
        console.log('Error fetching address:', response.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  const getallproducts = async () => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getallproducts`, {
        method: "POST", // or 'PUT'
        headers: { "Content-Type": "application/json", },
      });
      let response = await res.json();
      if (response.success) {
        setProducts(response.products)
      } else {
        console.log('Error fetching products:', response.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  return (
    <>
      <LoadingBar color='#ff2d55' progress={progress} onLoaderFinished={() => setProgress(0)} />
      {key && <Navbar user={user} usertoken={usertoken} userid={userid} key={key} logout={logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} deleteCartItem={deleteCartItem} subTotal={subTotal} />}
      {/* <Navbar user={user} key={key} logout={logout} cart={cart} /> */}
      <Component {...pageProps} cart={cart} products={products} user={user} address={address} userid={userid} clearCart={clearCart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} deleteCartItem={deleteCartItem} subTotal={subTotal} />
      <Footer />
    </>
  );
}
