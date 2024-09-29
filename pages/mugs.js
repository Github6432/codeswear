import mongoose from 'mongoose';
import Link from 'next/link'
import React from 'react'
import Product from "@/models/Product";

const Mugs = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div>
          <h2 className='text-center text-pink-400  text-4xl pb-3'>Mugs</h2>
        </div>
        <hr />
        <div className="container px-5 py-8 mx-auto">
          <div className="grid md:grid-cols-4 gap-4 mx-20 md:mx-44">
            {
              Object.keys(products).map((item) => {
                return <div key={products[item]._id} className="p-4 px-10 w-full shadow-lg shadow-gray-500 rounded-lg">
                  <div className="cursor-pointer md:h-1/2 h-3/6 shadow-lg flex justify-center items-center">
                    <Link href={`/product/${products[item].slug}`} legacyBehavior>
                      <img alt={`${products[item].title} Picture`} className='mx-auto' width={170} height={200} src={products[item].img} />
                    </Link>
                  </div>
                  <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font text-center mb-1">{products[item].category}</h3>
                    <Link href={`/product/${products[item].slug}`} legacyBehavior>
                      <h2 className="text-gray-900 title-font text-lg text-center cursor-pointer font-medium">{products[item].title}</h2>
                    </Link>
                    <p className="mt-1 text-center">₹{products[item].price}</p>
                    <p className="mt-1 text-gray-600 text-sm space-x-1">
                      {products[item].size.includes("S") && (<span className="border border-gray-300 px-1">S</span>)}
                      {products[item].size.includes("M") && (<span className="border border-gray-300 px-1">M</span>)}
                      {products[item].size.includes("L") && (<span className="border border-gray-300 px-1">L</span>)}
                      {products[item].size.includes("XL") && (<span className="border border-gray-300 px-1">XL</span>)}
                      {products[item].size.includes("XXL") && (<span className="border border-gray-300 px-1">XXL</span>)}
                    </p>
                    <p className="mt-3 mb-8 text-gray-600 text-sm space-x-1">
                      {products[item].color.includes("red") && (<button className="border-2 border-gray-300 rounded-full bg-none bg-red-700 hover:bg-red-600 w-6 h-6 focus:outline-none"></button>)}
                      {products[item].color.includes("blue") && (<button className="border-2 border-gray-300 rounded-full bg-none bg-blue-700 hover:bg-blue-600 w-6 h-6 focus:outline-none"></button>)}
                      {products[item].color.includes("black") && (<button className="border-2 border-gray-300 rounded-full bg-none bg-black hover:bg-black w-6 h-6 focus:outline-none"></button>)}
                      {products[item].color.includes("white") && (<button className="border-2 border-gray-300 rounded-full bg-none bg-white hover:bg-white w-6 h-6 focus:outline-none"></button>)}
                      {products[item].color.includes("pink") && (<button className="border-2 border-gray-300 rounded-full bg-none bg-pink-700 hover:bg-pink-600 w-6 h-6 focus:outline-none"></button>)}
                      {products[item].color.includes("green") && (<button className="border-2 border-gray-300 rounded-full bg-none bg-green-700 hover:bg-green-600 w-6 h-6 focus:outline-none"></button>)}
                      {products[item].color.includes("yellow") && (<button className="border-2 border-gray-300 rounded-full bg-none bg-yellow-700 hover:bg-yellow-600 w-6 h-6 focus:outline-none"></button>)}
                    </p>
                  </div>
                </div>
              })
            }
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

  let products = await Product.find({ category: 'mugs' });
  let mugs = {};
  for (let item of products) {
    // console.log('ok11', mugs);
    if (item.title in mugs) {
      // Ensure 'color' is an array before using .push()
      if (Array.isArray(mugs[item.title].color) && item.availableQty > 0) {
        if (!mugs[item.title].color.includes(item.color)) {
          mugs[item.title].color.push(item.color);
        }
      }
      // Ensure 'size' is an array before using .push()
      if (Array.isArray(mugs[item.title].size) && item.availableQty > 0) {
        if (!mugs[item.title].size.includes(item.size)) {
          mugs[item.title].size.push(item.size);
        }
      }
    } else {
      // Initialize mug entry
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        // Ensure colors and sizes are arrays1
        mugs[item.title].color = [item.color];
        mugs[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(mugs)) }, // will be passed to the page component as props
  };
}

export default Mugs