import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        dispatch(register({ name, email, password }));
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
                    <h1 className="text-3xl font-bold text-gray-900 font-poppins">Join NithishCart</h1>
                    <p className="text-gray-500">Celebrate every purchase with us</p>
                </div>

                <form className="space-y-6" onSubmit={submitHandler}>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nithish Kumar"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-nithish-orange/50 transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

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

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-nithish-orange/50 transition-all"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center space-x-2 py-4 shadow-lg shadow-orange-200">
                        {loading ? <Loader className="animate-spin w-5 h-5" /> : (
                            <>
                                <span>Create Account</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="font-bold text-nithish-orange hover:underline">Login here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
