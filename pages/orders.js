import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Orders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            console.log('Fetching orders...');
            let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: localStorage.getItem('token') }),
            });
            let res = await data.json();
            setOrders(res.orders);
            console.log('Orders fetched:', res.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const updataPaymentStatus = async () => {
        try {
            const orderId = localStorage.getItem('orderid');
            console.log(orderId)
            const data = await fetch('/api/updatepaymentstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: orderId }),
            });
            let res = await data.json();
            console.log('Paid Data', res)
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('orderid')) {
            updataPaymentStatus()
        }
        if (!localStorage.getItem('token')) {
            router.push('/');
        } else {
            fetchOrders();
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
                            <th scope="col" className="px-6 py-4">Payment Status</th>
                            <th scope="col" className="px-6 py-4">Order Status</th>
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
                                    <td className="whitespace-nowrap px-6 py-4 uppercase">{order.status == 'paid' ? 'Success' : order.status}</td>
                                    <td className="whitespace-nowrap px-6 py-4 uppercase">{order.orderStatus}</td>
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

export default Orders;
