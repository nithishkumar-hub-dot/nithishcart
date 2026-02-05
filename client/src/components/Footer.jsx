const Footer = () => {
    return (
        <footer className="bg-orange-950 text-orange-50 pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">NithishCart</h2>
                    <p className="text-orange-200/80 text-sm leading-relaxed">
                        Bringing the best of Indian fashion, electronics, and home essentials to your doorstep with a touch of festival.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6">Quick Links</h3>
                    <ul className="space-y-3 text-orange-200/60 text-sm">
                        <li><a href="/shop" className="hover:text-nithish-gold transition-colors">Shop All</a></li>
                        <li><a href="/about" className="hover:text-nithish-gold transition-colors">About Us</a></li>
                        <li><a href="/contact" className="hover:text-nithish-gold transition-colors">Contact</a></li>
                        <li><a href="/policies" className="hover:text-nithish-gold transition-colors">Policies</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6">Customer Care</h3>
                    <ul className="space-y-3 text-orange-200/60 text-sm">
                        <li><a href="/track" className="hover:text-nithish-gold transition-colors">Track Order</a></li>
                        <li><a href="/returns" className="hover:text-nithish-gold transition-colors">Returns & Refunds</a></li>
                        <li><a href="/faq" className="hover:text-nithish-gold transition-colors">FAQs</a></li>
                        <li><a href="/shipping" className="hover:text-nithish-gold transition-colors">Shipping Info</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6">Newsletter</h3>
                    <p className="text-orange-200/60 text-sm mb-4">Subscribe for festive offers!</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-white/10 border-transparent border-none rounded-l-lg px-4 py-2 w-full focus:ring-0 text-sm"
                        />
                        <button className="bg-nithish-orange px-4 py-2 rounded-r-lg font-bold hover:bg-nithish-maroon transition-colors">
                            Go
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-orange-200/40 text-xs">
                <p>&copy; 2026 NithishCart. Built with ❤️ for India.</p>
            </div>
        </footer>
    );
};

export default Footer;
