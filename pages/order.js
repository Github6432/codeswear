import mongoose from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Order from "../models/Order";

const MyOrder = ({ order }) => {
  console.log(order)
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/');
    }
  }, [])
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">

          <h1 className="text-gray-900 text-xl text-center font-medium">Oder ID: #{order._id.toUpperCase()}</h1>
          <p className={`${order.orderStatus == 'Pending' ? 'text-red-500' : 'text-green-400'} text-center mb-7`}>Your order has been {order.orderStatus}.</p>
          {order.products.map((item) => (
            <>
              <div className=" md:w-4/6 mx-auto mb-6 border p-4 rounded-lg shadow-md flex items-center justify-center flex-wrap">
                <div className="lg:w-3/4 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <div className="flex">
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
              </div >
            </>
          ))}
          <div className="md:w-4/6 m-auto border p-4 rounded-lg shadow-md">
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
                <p><span className="font-semibold">Amount:</span> ₹{order.amount / 100}</p>
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