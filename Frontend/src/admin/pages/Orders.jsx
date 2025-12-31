// src/admin/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("admin_token");

                const { data } = await axios.get(
                    "http://localhost:8000/api/admin/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setOrders(data.orders);
            } catch (err) {
                console.error("Orders fetch failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1">
                <Header />

                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Payments</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Phone</th>
                                    <th className="border p-2">Amount</th>
                                    <th className="border p-2">Currency</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Method</th>
                                    <th className="border p-2">Payment ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr style={{textAlign:"center"}} key={order._id}>
                                        <td className="border p-2">{order.name}</td>
                                        <td className="border p-2">{order.email}</td>
                                        <td className="border p-2">{order.contact}</td>
                                        <td className="border p-2">₹{order.amount}</td>
                                        <td className="border p-2">{order.currency}</td>
                                        <td className="border p-2">{order.status}</td>
                                        <td className="border p-2">{order.method}</td>
                                        <td className="border p-2">
                                            <details>
                                                <summary className="cursor-pointer">View ID</summary>
                                                <p className="mt-2">RezorpayOrderId - {order.razorpayOrderId}</p>
                                                <p className="mt-2">RazorpayPaymentId - {order.razorpayPaymentId}</p>
                                                <p className="mt-2">RazorpaySignature - {order.razorpaySignature}</p>
                                            </details>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
