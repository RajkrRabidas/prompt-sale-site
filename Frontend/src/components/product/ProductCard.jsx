import React from 'react'
import axios from 'axios'
import cors from 'cors';

const ProductCard = ({ product = [] }) => {
    if (!Array.isArray(product) || product.length === 0) {
        return (
            <div className="p-6">
                <p className="text-sm text-gray-300">No products available.</p>
            </div>
        )
    }


    const cheakoutHandeler = async (amount) => {
        const {data: keydata} = await axios.get('http://localhost:8000/api/v1/payment/key');
        const {key} = keydata;
        console.log(key);
        const {data: orderData} = await axios.post('http://localhost:8000/api/v1/payment/process', { amount });
        const {order} = orderData
        console.log(order);

        const options = {
        key: key, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: 'http://localhost:8000/api/v1/payment-success', // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }

    return (
        <div className="w-full h-full p-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {product.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer">
                        <div className="w-full h-72 bg-gray-100 rounded-2xl">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xl font-bold text-indigo-600">₹{item.price}</span>
                                <button onClick={()=> cheakoutHandeler(item.price)} className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCard
