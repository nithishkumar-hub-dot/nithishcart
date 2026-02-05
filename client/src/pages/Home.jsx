import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Award, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative h-[500px] overflow-hidden bg-diwali-gradient text-white flex items-center">
                <div className="container mx-auto px-4 grid md:grid-absolute gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="z-10 space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Festive Sale <br /> <span className="text-nithish-gold">Up to 70% Off</span>
                        </h1>
                        <p className="text-xl text-orange-50 font-medium">
                            Celebrate with style. Massive discounts on Fashion, Electronics, and Home Decor.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/shop" className="btn-primary">
                                Shop Now
                            </Link>
                            <button className="px-8 py-3 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
                                View Deals
                            </button>
                        </div>
                    </motion.div>
                    {/* Background Elements */}
                    <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block opacity-20 pointer-events-none">
                        {/* You could add a decorative SVG or image here */}
                        <svg className="w-full h-full" viewBox="0 0 400 400">
                            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" />
                            <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: <Truck />, title: 'Free Delivery', desc: 'On orders over ₹499' },
                        { icon: <Award />, title: 'Premium Quality', desc: 'Curated Indian brands' },
                        { icon: <Zap />, title: 'Express Service', desc: 'Fast delivery to urban areas' },
                        { icon: <ShoppingBag />, title: 'Secure Payment', desc: 'UPI, EMI & Card options' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
                            <div className="p-3 bg-orange-100 rounded-xl text-nithish-orange">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Categories */}
            <section className="container mx-auto px-4 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 font-poppins">Shop by <span className="text-nithish-orange">Category</span></h2>
                    <Link to="/shop" className="text-nithish-orange font-semibold hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {['Fashion', 'Electronics', 'Home Decor', 'Groceries', 'Beauty', 'Kitchen'].map((cat, i) => (
                        <Link key={i} to={`/shop?category=${cat}`} className="group space-y-3 text-center">
                            <div className="aspect-square bg-blue-100 rounded-full flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 shadow-inner group-hover:shadow-lg">
                                <span className="text-4xl">🎁</span>
                            </div>
                            <p className="font-semibold text-gray-700">{cat}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
