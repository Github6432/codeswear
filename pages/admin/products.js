import React, { useEffect } from 'react'
import Adminmenu from './adminmenu';
import { useRouter } from 'next/router';

const products = ({ products, user }) => {

  const router = useRouter();
  useEffect(() => {
    if(user.role != 'admin'){
      router.push('/')
    }
  }, [])
  return (
    <>
      <div>
        <h2 className='text-center my-2 text-pink-400 text-4xl uppercase'>Dashboard</h2>
      </div>
      <div className="flex w-full my-8 p-6 mx-4 bg-white border shadow-xl rounded-lg overflow-hidden">
        <div className="w-1/6"><Adminmenu /></div>
        <div className="w-5/6 mx-4 bg-green-100 p-4 rounded-lg">
          <div>
            <h3 className='text-center my-2 text-pink-400 text-2xl uppercase'>Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Slug</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Size</th>
                  <th className="py-2 px-4 text-left">Color</th>
                  <th className="py-2 px-4 text-left">Available Quantity</th>
                  <th className="py-2 px-4 text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                { products && products.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-2 px-4">{item.title}</td>
                    <td className="py-2 px-4">{item.slug}</td>
                    <td className="py-2 px-4">{item.desc}</td>
                    <td className="py-2 px-4">₹{item.price}</td>
                    <td className="py-2 px-4">{item.size}</td>
                    <td className="py-2 px-4" style={{ color: item.color }}>{item.color}</td>
                    <td className="py-2 px-4">{item.availableQty}</td>
                    <td className="py-2 px-4">
                      <img src={item.img} alt={item.title} className="w-16 h-16 object-cover" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}

export default products