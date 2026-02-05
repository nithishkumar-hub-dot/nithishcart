import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cartItems: items, totalPrice: total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    if (!items || items.length === 0) return (
        <div className="container mx-auto px-4 py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-nithish-orange">
                <Plus className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Your cart is empty</h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Looks like you haven't added any festive goodies to your cart yet.
            </p>
            <Link to="/shop" className="btn-primary inline-block">
                Continue Shopping
            </Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping <span className="text-nithish-orange">Cart</span></h1>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-cols-2 space-y-6">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            layout
                            className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-orange-50"
                        >
                            <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button className="p-1 hover:text-nithish-orange"><Minus className="w-4 h-4" /></button>
                                        <span className="px-3 text-sm font-bold">1</span>
                                        <button className="p-1 hover:text-nithish-orange"><Plus className="w-4 h-4" /></button>
                                    </div>
                                    <span className="font-bold text-nithish-orange">₹{item.price}</span>
                                </div>
                            </div>
                            <button className="text-gray-300 hover:text-red-500 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 space-y-4">
                        <h2 className="font-bold text-xl border-b border-orange-50 pb-4">Order Summary</h2>
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">FREE</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax (GST)</span>
                            <span>₹{(total * 0.18).toFixed(2)}</span>
                        </div>
                        <div className="pt-4 border-t border-orange-50 flex justify-between items-center">
                            <span className="font-bold text-lg">Total</span>
                            <span className="text-2xl font-bold text-nithish-orange">₹{(total + total * 0.18).toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="w-full btn-primary flex items-center justify-center space-x-2">
                            <span>Proceed to Checkout</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-xl border border-dashed border-orange-200">
                        <p className="text-xs text-orange-800 font-medium">Use code <span className="font-bold">FIRST10</span> to get 10% off on your first order!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
