import React, { useEffect } from 'react'
import Order from '../models/Order';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';

const Orders = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/');
        }
    }, [])
    return (
        <div className="container mx-auto px-4">
            <h1 className="font-bold  text-xl text-center py-2">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-black">
                    <thead className="border-b bg-pink-100 border-neutral-200 font-medium dark:border-white/10">
                        <tr>
                            <th scope="col" className="px-6 py-4">#</th>
                            <th scope="col" className="px-6 py-4">Heading</th>
                            <th scope="col" className="px-6 py-4">Heading</th>
                            <th scope="col" className="px-6 py-4">Heading</th>
                            <th scope="col" className="px-6 py-4">Heading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b text-center border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b text-center border-neutral-200 dark:border-white/10">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                        <tr className="border-b text-center">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readystate) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let orders = await Order.find({});
    return {
        props: { orders: JSON.parse(JSON.stringify(orders) )}, // will be passed to the page component as props
    };

}

export default Orders
