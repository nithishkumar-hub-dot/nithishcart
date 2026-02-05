import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { items, total } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        pincode: ''
    });

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpay();

        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            const amount = total + total * 0.18; // Including tax
            const { data } = await axios.post("http://localhost:5000/api/orders/checkout", {
                amount,
                items,
                shippingAddress: address
            });

            const options = {
                key: "rzp_test_yourkey", // Replace with actual test key if available
                amount: data.amount,
                currency: "INR",
                name: "NithishCart",
                description: "Festive Shopping",
                order_id: data.order_id,
                handler: async (response) => {
                    try {
                        const verifyRes = await axios.post("http://localhost:5000/api/orders/verify", {
                            ...response,
                            orderData: {
                                user: user?._id || 'guest_id', // Handle guest checkout
                                items,
                                shippingAddress: address,
                                totalPrice: amount
                            }
                        });

                        if (verifyRes.data.success) {
                            toast.success("Payment Successful!");
                            navigate("/");
                        }
                    } catch (err) {
                        toast.error("Payment Verification Failed");
                    }
                },
                prefill: {
                    name: user?.name || "Customer",
                    email: user?.email || "customer@example.com",
                },
                theme: {
                    color: "#FF6600",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            toast.error("Error initiating payment");
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 space-y-6">
                    <h2 className="text-xl font-bold font-poppins">Shipping Address</h2>
                    <div className="grid gap-4">
                        <input
                            type="text"
                            placeholder="Street Address"
                            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl"
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl"
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="State"
                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl"
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Pincode"
                            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100 space-y-6">
                    <h2 className="text-xl font-bold font-poppins">Order Summary</h2>
                    <div className="space-y-4">
                        {items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <span>{item.name} x 1</span>
                                <span className="font-bold">₹{item.price}</span>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-orange-50 flex justify-between items-center">
                            <span className="font-bold">Total (incl. tax)</span>
                            <span className="text-2xl font-bold text-nithish-orange">₹{(total + total * 0.18).toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handlePayment}
                            className="w-full btn-primary py-4 text-lg"
                        >
                            Pay with Razorpay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
