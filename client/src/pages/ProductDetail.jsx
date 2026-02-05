import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { useProducts } from '../hooks/useProducts';
import { useState } from 'react';

const ProductDetail = () => {
    const { id } = useParams();
    const { data: products } = useProducts();
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState('M');

    // Find product or use dummy
    const product = (products || []).find(p => p._id === id) || {
        _id: id,
        name: 'Festive Silk Saree',
        price: 4999,
        discountPrice: 6999,
        category: 'Fashion',
        description: 'This exquisite Banarasi silk saree is handcrafted with intricate zari work, perfect for weddings and festive occasions. The vibrant saffron color and premium silk fabric make it a timeless masterpiece.',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
        isFestive: true,
        ratings: { average: 4.8, count: 124 },
        stock: 12
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success('Added to cart!');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Product Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-orange-50 shadow-sm">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, i) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-orange-100 cursor-pointer hover:border-nithish-orange transition-colors">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Product Info */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <p className="text-sm font-bold text-nithish-orange uppercase tracking-[0.2em]">{product.category}</p>
                        <h1 className="text-4xl font-bold text-gray-900 font-poppins">{product.name}</h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-nithish-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.ratings.average) ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">({product.ratings.count} Reviews)</span>
                        </div>
                    </div>

                    <div className="flex items-baseline space-x-4">
                        <span className="text-4xl font-bold text-nithish-orange">₹{product.price}</span>
                        {product.discountPrice && (
                            <span className="text-xl text-gray-400 line-through">₹{product.discountPrice}</span>
                        )}
                        <span className="text-green-600 font-bold">Save ₹{product.discountPrice - product.price}</span>
                    </div>


                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-800">Select Size</h3>
                        <div className="flex gap-3">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold transition-all ${selectedSize === size ? 'border-nithish-orange bg-orange-50 text-nithish-orange' : 'border-gray-100 text-gray-400 hover:border-orange-200'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-grow btn-primary flex items-center justify-center space-x-3 py-4 text-lg shadow-xl shadow-orange-200"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            <span>Add to Cart</span>
                        </button>
                        <button className="p-4 border-2 border-orange-100 text-gray-400 rounded-2xl hover:bg-orange-50 hover:text-nithish-orange transition-all">
                            <Heart className="w-6 h-6" />
                        </button>
                        <button className="p-4 border-2 border-orange-100 text-gray-400 rounded-2xl hover:bg-orange-50 hover:text-nithish-orange transition-all">
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-orange-50">
                        <div className="text-center space-y-1">
                            <Truck className="w-6 h-6 mx-auto text-nithish-orange" />
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Express Delivery</p>
                        </div>
                        <div className="text-center space-y-1">
                            <RotateCcw className="w-6 h-6 mx-auto text-nithish-orange" />
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Easy Returns</p>
                        </div>
                        <div className="text-center space-y-1">
                            <ShieldCheck className="w-6 h-6 mx-auto text-nithish-orange" />
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Secure Checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
