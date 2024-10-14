import React, { useEffect } from 'react';
import Order from '../models/Order';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import Link from 'next/link';

const Orders = ({ orders }) => {
    const router = useRouter();
    console.log(orders)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="container mx-auto px-4">
            <h1 className="font-bold text-xl text-center py-2">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-black">
                    <thead className="border-b bg-pink-100 border-neutral-200 font-medium dark:border-white/10">
                        <tr>
                            <th scope="col" className="px-6 py-4">SN.</th>
                            <th scope="col" className="px-6 py-4">Product Name</th>
                            <th scope="col" className="px-6 py-4">Price</th>
                            <th scope="col" className="px-6 py-4">Qty.</th>
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="px-6 py-4">Track</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.flatMap((order, i) =>
                            order.products.map((product, j) => (
                                <tr key={product._id} className="border-b text-center border-neutral-200 dark:border-white/10">
                                    <td className="py-4 font-medium">{i * order.products.length + j + 1}</td> {/* Unique Serial Number */}
                                    <td className="">{product.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.quantity}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{order.address.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <Link href={`/order?${order._id}`}>
                                            <button className="bg-pink-500 text-white font-bold py-1 p-2 rounded hover:bg-pink-400">Track & Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let orders = await Order.find({});
    return {
        props: { orders: JSON.parse(JSON.stringify(orders)) }, // will be passed to the page component as props
    };
}

export default Orders;
