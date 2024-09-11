import mongoose from 'mongoose';
import Link from 'next/link'
import React from 'react'
import Product from "@/models/Product";

const Tshirts = ({ products }) => {
  console.log(products);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div>
          <h2 className='text-center text-pink-400  text-4xl pb-3'>T-Shirts</h2>
        </div>
        <hr />
        <div className="container px-5 py-8 mx-auto">
          <div className="grid md:grid-cols-4 gap-4 mx-20 md:mx-44">
            <div className="p-4 px-10 w-full shadow-lg shadow-gray-500 rounded-lg">
              <Link href={`/product/wear-the-code`} legacyBehavior>
                <div className="block relative rounded overflow-hidden flex justify-center  cursor-pointer">
                  <img alt="ecommerce" className="" width={170} height={200} src="https://plus.unsplash.com/premium_photo-1661373644394-ebc6f569826c?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </div>
              </Link>
              <div className="mt-4 ">
                <h3 className="text-gray-500 text-xs tracking-widest title-font text-center mb-1">CATEGORY</h3>
                <h2 className="text-gray-900 title-font text-lg text-center font-medium">The Catalyzer</h2>
                <p className="mt-1 text-center">$16.00</p>
                <p className="mt-1 text-gray-600 text-center text-sm">S, M, L, XL, XXL</p>
              </div>
            </div>
          </div >
        </div >
      </section >

    </>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readystate) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({});

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default Tshirts