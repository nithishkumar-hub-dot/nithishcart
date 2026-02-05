import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error])

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-orange-50 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-orange-100 p-8 space-y-8"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 font-poppins">Namaste!</h1>
                    <p className="text-gray-500">Welcome back to <span className="text-nithish-orange font-bold">NithishCart</span></p>
                </div>

                <form className="space-y-6" onSubmit={submitHandler}>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="nithish@example.com"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-nithish-orange/50 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-nithish-orange/50 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="rounded text-nithish-orange focus:ring-nithish-orange" />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="font-semibold text-nithish-orange hover:underline">Forgot?</a>
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center space-x-2 py-4 shadow-lg shadow-orange-200">
                        {loading ? <Loader className="animate-spin w-5 h-5" /> : (
                            <>
                                <span>Login</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400">Or continue with</span></div>
                </div>

                <button className="w-full py-3 px-4 border border-gray-200 rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-50 transition-all">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    <span className="font-semibold text-gray-700">Google</span>
                </button>

                <p className="text-center text-sm text-gray-500">
                    New to NithishCart? <Link to="/register" className="font-bold text-nithish-orange hover:underline">Create an account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
