import React from 'react'
import Link from "next/link";

import { AiFillPlusSquare, AiFillMinusSquare, AiFillShopping } from "react-icons/ai";
import { MdDelete } from 'react-icons/md';

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  return (<>
    <div>
      <h2 className='text-center text-xl font-semibold text-pink-500 my-4'>Check Out</h2>
      <hr />
      <form className='px-4 md:px-48'>
        <h5 className='font-bold my-4'>1. Delivery Details</h5>
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          <div>
            <label forhtml="first_name" className="block mb-2 text-sm  text-gray-900 ">First name</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
          </div>
          <div>
            <label forhtml="last_name" className="block mb-2 text-sm  text-gray-900 ">Last name</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Doe" />
          </div>
          <div>
            <label forhtml="email" className="block mb-2 text-sm  text-gray-900 ">Email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="email@gmail.com" required />
          </div>
          <div>
            <label forhtml="phone" className="block mb-2 text-sm  text-gray-900 ">Phone number</label>
            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
          </div>
          <div>
            <label forhtml="city" className="block mb-2 text-sm  text-gray-900 ">City</label>
            <input type="url" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="City" required />
          </div>
          <div>
            <label forhtml="state" className="block mb-2 text-sm  text-gray-900 ">State</label>
            <input type="number" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="State" required />
          </div>
        </div>
        <div className="mb-6">
          <label forhtml="address" className="block mb-2 text-sm  text-gray-900 ">Address</label>
          <textarea type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows='2' placeholder="Enter your address" required />
        </div>

        {/* 
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}
      </form>


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
            <label forhtml="remember" className="ml-2 text-sm  text-gray-900 dark:text-gray-500">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
          </div>
          <div className="flex mt-2">
            <span className='font-bold py-2 mr-20'>SubTotal: ₹{subTotal}</span>
            <Link href={'/checkout'}>
              <button
                // onClick={() => clearCart}
                type="button"
                className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center  mr-2 mb-2">
                <AiFillShopping className="text-lg mx-1" />
                Pay ₹{subTotal}
              </button></Link>
          </div>
        </div>
      </div>

    </div>
  </>
  )
}

export default Checkout