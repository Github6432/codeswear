import React, { useEffect, useState } from 'react';
import Adminmenu from './adminmenu';
import { useRouter } from 'next/router';

const AdminOrders = ({user}) => {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
          if(user.role != 'admin'){
            router.push('/')
          }
        const fetchOrders = async () => {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        const response = await fetch('/api/updateorderstatus', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status: newStatus }),
        });

        if (response.ok) {
            const updatedOrder = await response.json();
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
            );
        } else {
            console.error('Failed to update order status');
        }
    };

    return (
        <>
            <div>
                <h2 className='text-center my-2 text-pink-400 text-4xl uppercase sticky top-0 bg-white z-10'>Dashboard</h2>
            </div>
            <div className="flex w-full p-6 mx-4 bg-white border shadow-xl rounded-lg overflow-hidden">
                <div className="w-1/6 sticky top-0 bg-white z-10"><Adminmenu /></div>
                <div className="w-5/6 mx-4 bg-green-100 p-4 rounded-lg">
                    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-6 sticky top-0 bg-white z-10">Admin Orders</h2>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-4">Email</th>
                                        <th className="border border-gray-300 p-4">Phone</th>
                                        <th className="border border-gray-300 p-4">Products</th>
                                        <th className="border border-gray-300 p-4">Amount</th>
                                        <th className="border border-gray-300 p-4">Status</th>
                                        <th className="border border-gray-300 p-4">Payment Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="border border-gray-300 p-4">{order.email}</td>
                                            <td className="border border-gray-300 p-4">{order.phone}</td>
                                            <td className="border border-gray-300 p-4">
                                                <ul>
                                                    {order.products.map((product) => (
                                                        <li key={product._id} className="flex items-center">
                                                            <img src={product.image} alt={product.name} className="h-12 w-12 mr-2" />
                                                            <span>{product.name} ({product.description})</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="border border-gray-300 p-4">{order.amount / 100}</td>
                                            <td className="border border-gray-300 p-4">
                                                <select
                                                    value={order.orderStatus}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Out for Delivery">Out for Delivery</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="border border-gray-300 p-4 uppercase">{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOrders;
