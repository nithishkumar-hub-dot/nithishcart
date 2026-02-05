import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const ProductList = () => {
    const { data: products, isLoading, error } = useProducts();

    // Fallback data for demo if API/DB is down
    const dummyProducts = [
        {
            _id: '1',
            name: 'Festive Silk Saree',
            price: 4999,
            discountPrice: 6999,
            category: 'Fashion',
            isFestive: true,
            images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80']
        },
        {
            _id: '2',
            name: 'Premium Basmati Rice (5kg)',
            price: 850,
            discountPrice: 999,
            category: 'Groceries',
            isFestive: false,
            images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80']
        },
        {
            _id: '3',
            name: 'Smart Watch Series X',
            price: 2499,
            discountPrice: 4999,
            category: 'Electronics',
            isFestive: true,
            images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80']
        }
    ];

    if (isLoading) return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nithish-orange mx-auto"></div>
            <p className="mt-4 text-gray-500 font-medium">Curating festive collection...</p>
        </div>
    );

    const displayProducts = error ? dummyProducts : (products || dummyProducts);

    return (
        <div className="container mx-auto px-4 py-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Explore <span className="text-nithish-orange">NithishCart</span></h1>
                    <p className="text-gray-500 mt-1">Found {displayProducts.length} festive essentials for you</p>
                </div>

                <div className="flex items-center space-x-4">
                    <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nithish-orange/50">
                        <option>Sort by: Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Customer Rating</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {displayProducts.map((p, i) => (
                    <motion.div
                        key={p._id || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <ProductCard product={p} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
