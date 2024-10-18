import mongoose from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "../models/Order";

const MyOrder = ({ order }) => {
  console.log(order)
  const router = useRouter();
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
    if (order && order.createdAt) {
      setDate(new Date(order.createdAt));
    }
  }, [order, router])
  const formattedDate = date instanceof Date &&
    `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">

          <h1 className="text-gray-405 text-sm sm:text-xl text-center font-mono">Oder ID: #{order._id.toUpperCase()}</h1>
          <p className={`${order.orderStatus == 'Pending' ? 'text-red-500' : 'text-green-400'} font-thin text-sm sm:text-base text-center mb-7`}>Your order has been {order.orderStatus}.</p>
          <hr className="border border-pink-300" />
          {order.products.map((item) => (
            <>
              {/* <div className=" md:w-4/6 mx-auto mb-6 border p-4 rounded-lg shadow-md flex items-center justify-center flex-wrap">
                <div className="lg:w-3/4 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <div className="flex">
                    <h2 className="flex-grow text-sm text-gray-500 tracking-widest uppercase">{formattedDate}</h2>
                    <h2 className="flex-grow text-sm text-gray-500 tracking-widest uppercase">CodesWear.com</h2>
                    <h2 className="flex-grow text-sm text-gray-500 tracking-widest uppercase">Product ID: #{item._id}</h2>
                  </div>
                  <hr className="border border-pink-400" />
                  <div className="flex mb-4">
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-4">Product</a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-4">Description</a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 mx-auto">Quantity</a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 mx-auto">Price</a>
                  </div>

                  <div className="flex mx-5 border-t border-gray-200 py-4">
                    <div className="w-1/4 text-gray-700 font-medium">{item.name}</div>
                    <div className="w-1/4 text-gray-500 text-center">{item.description.toUpperCase()}</div>
                    <div className="w-1/6 text-gray-500 text-center">{item.quantity}</div>
                    <div className="w-1/4 text-gray-900 font-semibold text-right">₹{item.price}</div>
                  </div>


                  <div className="flex mx-10 items-center">
                    <div className="font-medium mx-8 ml-auto text-xl text-gray-900 py-3">Total: ₹{item.price * item.quantity}</div>
                    <button className="mx-4 text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">
                      Track Order
                    </button>

                  </div>
                </div>
                <div className="w-32 flex items-center justify-center">
                  <img
                    alt="ecommerce"
                    className="w-28 mt-16 max-w-xs h-auto m-4 object-cover object-center rounded"
                    src={item.image}
                  />
                </div>
              </div > */}
              <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-3 mx-auto">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full m-auto lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                      <h2 className="flex-grow text-sm text-gray-500 tracking-widest uppercase">CodesWear.com</h2>
                      <h1 className="text-gray-900  sm:text-2xl title-font font-medium mb-4">Product Name: {item.name} [ {item.description.toUpperCase()} ]</h1>
                      <h1 className="flex-grow text-sm text-gray-500 tracking-widest uppercasem">Date: <span className="text-red-400">{formattedDate}</span></h1>
                      <h1 className="flex-grow text-sm text-gray-500 tracking-widest uppercasem">Product ID: {item._id.toUpperCase()}</h1>
                      <div className="flex mb-4">
                        {/* <a className="flex-grow text-pink-500 border-b-2 border-indigo-500 py-2 text-lg px-1">{item.description.toUpperCase()}</a> */}
                      </div>
                      <p className="leading-relaxed mb-4">Description: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, autem, maiores eos sint id suscipit molestias similique ipsa dignissimos laborum rerum, pariatur fuga. Eos nisi odit, cupiditate error voluptatem perspiciatis reiciendis saepe, animi voluptas iusto Varient: {item.description.toUpperCase()}</p>
                      <div className="flex border-t border-gray-200 py-2">
                        <span className="text-gray-500">Size, Color</span>
                        <span className="ml-auto text-gray-900">{item.description.toUpperCase()}</span>
                      </div>
                      {/* <div className="flex border-t border-gray-200 py-2">
                        <span className="text-gray-500">Size</span>
                        <span className="ml-auto text-gray-900">Medium</span>
                      </div> */}
                      <div className="flex border-t border- border-gray-200 py-2">
                        <span className="text-gray-500">Quantity</span>
                        <span className="ml-auto text-gray-900">{item.quantity}</span>
                      </div>
                      <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                        <span className="text-gray-500">Price</span>
                        <span className="ml-auto text-gray-900">{item.price}</span>
                      </div>
                      <div className="flex">
                        <span className="title-font font-medium text-2xl text-gray-900">Total Price: ₹{item.price * item.quantity}</span>
                        <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* className="w-28 mt-16 max-w-xs h-auto m-4 object-cover object-center rounded" */}
                    {/* lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded */}
                    <img alt="ecommerce" className="w mt-16 w-full max-w-xs h-auto m-auto object-cover object-center rounded" src={item.image} />
                  </div>
                </div>
              </section>
            </>
          ))}
          <div className="md:w-4/6 m-auto border p-4 mt-16 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4 text-center">Billing Details & Address</h2>
            <hr />
            <div className="flex flex-col lg:flex-row justify-center">
              <div className="my-4 mx-10">
                <h3 className="font-semibold text-gray-700 mb-2">Contact Details:</h3>
                <p><span className="font-semibold">Name:</span> {order.address.name} {order.address.lastname}</p>
                <p><span className="font-semibold">Email:</span> {order.email}</p>
                <p><span className="font-semibold">Phone:</span> {order.phone}</p>
              </div>
              <div className="my-4 mx-10">
                <h3 className="font-semibold text-gray-700 mb-2">Address:</h3>
                <p>{order.address.city}, {order.address.state}</p>
                <p>{order.address.pincode}</p>
                <p>Land Mark: {order.address.landmark} </p>
              </div>
              <div className="my-4 mx-10">
                <h3 className="font-semibold text-gray-700 mb-2">Order Summary</h3>
                <p><span className="font-semibold">Order ID:</span> #{order._id.toUpperCase()}</p>
                <p><span className="font-semibold">Billing Amount:</span> ₹{order.amount / 100}</p>
                <p><span className="font-semibold">Status:</span> {order.status}</p>
              </div>
            </div>
          </div>
        </div >
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const { query } = context;
  const orderId = Object.keys(query)[0];
  let order = await Order.findById(orderId);
  return {
    props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  };
}
export default MyOrder;