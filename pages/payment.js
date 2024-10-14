import React, { useEffect, useState } from 'react'
import Link from "next/link";
const jwt = require('jsonwebtoken');

import { AiFillPlusSquare, AiFillMinusSquare, AiFillShopping } from "react-icons/ai";
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Bounce, toast } from 'react-toastify';

const Payment = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const router = useRouter();
  const { session_id } = router.query;

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [userid, setUserid] = useState('');
  const [address, setAddress] = useState([]);
  const [showform, setShowform] = useState(true);
  const [showbutton, setShowbutton] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);


  const handleSelect = (item) => {
    setSelectedAddress(item);;
    setName(item.name);
    setLastname(item.lastname);
    setEmail(item.email);
    setPhone(item.phone);
    setCity(item.city);
    setState(item.state);
    setCountry(item.country);
    setPincode(item.pincode);
    setLandmark(item.landmark);
    setUserid(item.userid);
  };
  const fetchUserAddress = async (userid) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getaddress`, {
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

  console.log(showbutton)


  const updateAddress = () => {
    if (selectedAddress?._id) {
      toggleForm()
    } else {
      alert('Plese Select the Address for Editing Or Add New Address')
    }
  }
  const addNewAddress = () => {
    setShowbutton(!showbutton)
    toggleForm()
  }
  const updateUserAddress = async (id, name, lastname, email, phone, city, state, country, pincode, landmark) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateaddress`, {
        method: "POST", // or 'PUT'
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ id, name, lastname, email, phone, city, state, country, pincode, landmark }),
      });
      let response = await res.json();
      if (response.success) {
        // console.log(response)
        window.location.reload();
      } else {
        console.log('Error fetching address:', response.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setUserid(decoded.userid);
      } catch (err) {
        console.error('Failed to decode token:', err);
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  }, []);

  useEffect(() => {
    if (userid) {
      fetchUserAddress(userid);
    }
  }, [userid]);


  const handleChange = (e) => {
    if (e.target.name == 'name') { setName(e.target.value) }
    else if (e.target.name == 'lastname') { setLastname(e.target.value) }
    else if (e.target.name == 'email') { setEmail(e.target.value) }
    else if (e.target.name == 'phone') { setPhone(e.target.value) }
    else if (e.target.name == 'city') { setCity(e.target.value) }
    else if (e.target.name == 'state') { setState(e.target.value) }
    else if (e.target.name == 'country') { setCountry(e.target.value) }
    else if (e.target.name == 'pincode') { setPincode(e.target.value) }
    else if (e.target.name == 'landmark') { setLandmark(e.target.value) }
  }

  const addAddress = async () => {
    const data = { userid, name, lastname, email, phone, city, state, country, pincode, landmark, }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/address`, {
      method: "POST", // or 'PUT'
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    const { massage, success, err } = response;
    if (success) {
      window.location.reload()
      toast.success(massage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(massage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    // setName('');
    // setEmail('');
    // setPhone('');
    // setSecurityquestion('');
    // setAnswer('');
    // setPassword('');
    // setRepassword('')
  };
  const toggleForm = () => {
    setShowform(!showform);
  };

  // const handlePayment = async () => {
  //   console.log(cart, email, phone)
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/stripe-server-instance`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ cart, email, phone }),
  //     });
  //     const data = await res.json();
  //     console.log('Payment data', data?.session);
  //     // Redirect to the Stripe Payment page
  //     if (data?.session?.id) {
  //       const response = await fetch('/api/save-order', {
  //         method: 'POST', headers: { 'Content-Type': 'application/json', },
  //         body: JSON.stringify({ session_id: data?.session?.id }),
  //       });
  //       const jsonData = await response.json();
  //       console.log('paydata', jsonData)
  //       const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  //       await stripe.redirectToCheckout({ sessionId: data.session.id });
  //     } else {
  //       console.error('Error saving the order:', error);
  //     }
  //   } catch (error) {
  //     console.log('ERROR: =>', error)
  //   }
  // }

  // useEffect(() => {
  //   console.log('test ok')
  //   const saveOrder = async () => {
  //     if (session_id) {
  // try {
  //   const response = await fetch('/api/save-order', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ session_id }),
  //   });
  //   const data = await response.json();
  //   console.log('paydata', data)
  // } catch (error) {
  //   console.error('Error saving the order:', error);
  // }
  // }
  //   };
  //   saveOrder()
  // }, [session_id]);


  return (<>
    <div>
      <h2 className='text-center text-xl font-semibold text-pink-500 my-4'>Payment Page</h2>
      <hr />
      {address && <>
        <div className='px-4 md:px-48'>
          <h5 className=' font-bold my-4'>1. Address</h5>
          <div className='px-4 md:px-48'>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-6 mx-auto">
                <div className="flex flex-wrap -m-2">
                    <h5>addreess</h5>
                  {address.map(item => (
                    <div key={item._id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                      <div className="h-full flex items-center border-gray-400 border p-4 rounded-lg">
                        <input
                          type="radio"
                          name="selectedAddress"
                          className="mr-4 transform scale-150"
                          onChange={() => handleSelect(item)}
                          checked={selectedAddress?._id === item._id} // Check if the current address is selected
                        />
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between">
                            <h2 className="text-gray-900 title-font font-bold">{item.name} {item.lastname}</h2>
                            <h2 className="text-gray-900 title-font font-bold">{item.phone}</h2>
                          </div>
                          <div>
                            <div className="text-black font-medium">Landmark: {item.landmark}</div>
                            <span className="text-gray-950">Address : </span>
                            <span className='font-normal'>{item.city} {item.state} {item.landmark} {item.country} - {item.pincode}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          {!showform && <form className='px-4 md:px-48'>
            <div className="grid gap-6 mb-6 md:grid-cols-2 ">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm  text-gray-900 ">First name</label>
                <input type="text" name='name' id="name" onChange={handleChange} value={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Name" required />
              </div>
              <div>
                <label htmlFor="lastname" className="block mb-2 text-sm  text-gray-900 ">Last name</label>
                <input type="text" name='lastname' id="lastname" onChange={handleChange} value={lastname} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Last Name" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm  text-gray-900 ">Email</label>
                <input type="email" name='email' id="email" onChange={handleChange} value={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Email" required />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm  text-gray-900 ">Phone number</label>
                <input type="number" name='phone' id="phone" onChange={handleChange} value={phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
              </div>
              <div>
                <label htmlFor="city" className="block mb-2 text-sm  text-gray-900 ">City</label>
                <input type="text" name='city' id="city" onChange={handleChange} value={city} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="City" required />
              </div>
              <div>
                <label htmlFor="pincode" className="block mb-2 text-sm  text-gray-900 ">Pincode</label>
                <input type="number" name='pincode' id="pincode" onChange={handleChange} value={pincode} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Pincode" required />
              </div>
              <div>
                <label htmlFor="state" className="block mb-2 text-sm  text-gray-900 ">State</label>
                <input type="text" name='state' id="state" onChange={handleChange} value={state} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="State" required />
              </div>
              <div>
                <label htmlFor="country" className="block mb-2 text-sm  text-gray-900 ">Country</label>
                <input type="text" name='country' id="country" onChange={handleChange} value={country} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Country" required />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="landmark" className="block mb-2 text-sm  text-gray-900 ">Landmark</label>
              <textarea type="text" name='landmark' id="landmark" onChange={handleChange} value={landmark} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows='2' placeholder="Landmark" required />
            </div>
          </form>}
          {!showform && <div className=' flex justify-center px-4 md:px-48'>
            {!showbutton && <button onClick={() => addAddress(userid, name, lastname, email, phone, city, state, country, pincode, landmark)} className="mx-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Address</button>}
            {showbutton && <button onClick={() => updateUserAddress(selectedAddress._id, name, lastname, email, phone, city, state, country, pincode, landmark)} className="mx-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Address</button>}
          </div>}
          {showform && <div className=' flex justify-center px-4 md:px-48'>
            {<button onClick={addNewAddress} className="mx-6 text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Add New Address</button>}
            {<button onClick={updateAddress} className="mx-6 text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Edit Address</button>}
          </div>}

        </div>
      </>}



      <div className=" px-4 md:px-48">
        <h5 className=' font-bold my-4'>2. Review Cart Item(s)</h5>
        {/* //todo cart */}

        <div className=" sidebar p-2 m-3 pl-8 bg-pink-50  z-10">

          <ol className="list-decimal px-4">
            {Object.keys(cart).length == 0 && (
              <div className="m-1 text-center">No Items in Cart.</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex text-center items-center mt-2">
                    <div className='text-sm font-semibold mx-1 w-56'>{cart[k].name}</div>
                    <img alt="ecommerce" className="w-12 md:w-10 m-2 object-cover object-center rounded" src={cart[k].image} />
                    <div className='text-sm mx-1 w-56'>{cart[k].size}</div>
                    <div className='text-sm mx-1 w-56'>{cart[k].variant}</div>
                    <div className='text-sm mx-1 w-56'>₹ {cart[k].price * cart[k].qty}</div>
                    <div className="w-1/3 flex font-semibold text-center content-between items-center text-lg">
                      <AiFillMinusSquare onClick={() => { removeFromCart(k, 1, cart[k].name, cart[k].size, cart[k].variant) }} className="text-pink-500 cursor-pointer" />
                      <span className="flex font-semibold mx-1 justify-center w-4">{cart[k].qty}</span>
                      <AiFillPlusSquare onClick={() => { addToCart(k, 1, cart[k].name, cart[k].size, cart[k].variant) }} className="text-pink-500 cursor-pointer" />
                      <MdDelete className='text-pink-700 cursor-pointer mx-2' onClick={() => { deleteCartItem(Object.keys(cart)[0]) }} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="flex items-start my-4">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm  text-gray-900 dark:text-gray-500">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
          </div>
          <div className="flex mt-2">
            <span className='font-bold py-2 mr-20'>SubTotal: ₹{subTotal}</span>
            <Link href={'/payment'}>
              <button
                // onClick={handlePayment}
                type="button"
                className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center  mr-2 mb-2">
                <AiFillShopping className="text-lg mx-1" />Continue To Pay</button></Link>
          </div>
        </div>
      </div>

    </div>
  </>
  )
}

export default Payment