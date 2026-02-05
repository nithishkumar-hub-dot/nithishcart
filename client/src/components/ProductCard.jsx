import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="festive-card group relative"
        >
            <Link to={`/product/${product._id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = 'https://placehold.co/600x800/orange/white?text=Restocking'; }}
                    />
                    {product.isFestive && (
                        <div className="absolute top-3 left-3 bg-diwali-gradient text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Festive Deal
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider">{product.category}</p>
                    <div className="flex items-center text-nithish-gold">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs ml-1 font-bold text-gray-600">{product.ratings?.average || 4.5}</span>
                    </div>
                </div>
                <Link to={`/product/${product._id}`} className="block">
                    <h3 className="font-bold text-gray-800 line-clamp-1 hover:text-nithish-orange transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold text-nithish-orange">₹{product.price}</span>
                        {product.discountPrice && (
                            <span className="text-sm text-gray-400 line-through">₹{product.discountPrice}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="p-2 bg-orange-50 text-nithish-orange rounded-full hover:bg-nithish-orange hover:text-white transition-all transform hover:rotate-12 z-20 relative"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
