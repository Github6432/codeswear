import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const adminmenu = ({user}) => {
    const router = useRouter();
    // useEffect(() => {
    //   if(user.role != 'admin'){
    //     router.push('/')
    //   }
    // }, [])
    return (
        <div className="bg-blue-100 p-4 rounded-lg">
            <ul className="mt-4 space-y-2">
                <li className="py-1 hover:text-red-500 cursor-pointer">
                    <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="py-1 hover:text-red-500 cursor-pointer">
                    <Link href="/admin/addproducts">Add Products</Link>
                </li>
                <li className="py-1 hover:text-red-500 cursor-pointer">
                    <Link href="/admin/products">All Products</Link>
                </li>
                <li className="py-1 hover:text-red-500 cursor-pointer">
                    <Link href="/admin/orders">Orders</Link>
                </li>
            </ul>
        </div>
    )
}

export default adminmenu