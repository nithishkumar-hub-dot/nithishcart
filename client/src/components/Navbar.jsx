import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-gradient">
                    NithishCart
                </Link>

                <div className="hidden md:flex flex-1 mx-8 max-w-xl">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search for fashion, electronics, groceries..."
                            className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-nithish-orange/50 transition-all font-poppins"
                        />
                        <Search className="absolute left-3 top-2.5 text-orange-400 w-5 h-5" />
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <LanguageToggle />

                    <Link to="/cart" className="relative group text-gray-700 hover:text-nithish-orange transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-nithish-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="relative group flex items-center gap-2">
                            <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-nithish-orange transition-colors">
                                <User className="w-6 h-6" />
                                <span className="hidden sm:inline font-medium text-sm">{userInfo.name}</span>
                            </Link>
                            <button onClick={logoutHandler} className="text-gray-500 hover:text-red-500">
                                <LogOut className="w-5 h-5" />
                            </button>
                            {userInfo.role === 'admin' && (
                                <Link to="/admin" className="ml-2 text-xs bg-gray-800 text-white px-2 py-1 rounded">Admin</Link>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-nithish-orange transition-colors">
                            <User className="w-6 h-6" />
                            <span className="hidden sm:inline font-medium text-sm">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
