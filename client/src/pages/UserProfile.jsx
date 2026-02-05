import { useSelector } from 'react-redux';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);

    const dummyUser = {
        name: 'Nithish Kumar',
        email: 'nithish@example.com',
        orders: [
            { id: 'ORD001', date: '2026-01-28', total: 5899, status: 'Delivered' },
            { id: 'ORD002', date: '2026-02-01', total: 1250, status: 'Processing' }
        ]
    };

    const displayUser = user || dummyUser;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 text-center space-y-4">
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-nithish-orange">
                            <User className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900">{displayUser.name}</h2>
                            <p className="text-sm text-gray-500">{displayUser.email}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                        {[
                            { icon: <Package />, label: 'My Orders', active: true },
                            { icon: <MapPin />, label: 'Addresses' },
                            { icon: <Settings />, label: 'Account Settings' },
                            { icon: <LogOut />, label: 'Logout', color: 'text-red-500' }
                        ].map((item, i) => (
                            <button key={i} className={`w-full flex items-center space-x-3 px-6 py-4 text-sm font-semibold transition-colors hover:bg-orange-50 ${item.active ? 'text-nithish-orange bg-orange-50' : 'text-gray-600'} ${item.color || ''}`}>
                                <span className="w-5 h-5">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* content */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100">
                        <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
                        <div className="space-y-4">
                            {displayUser.orders.map((ord) => (
                                <div key={ord.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-orange-50 rounded-2xl hover:border-orange-100 transition-colors">
                                    <div>
                                        <p className="font-bold text-gray-800">Order #{ord.id}</p>
                                        <p className="text-sm text-gray-500">{ord.date}</p>
                                    </div>
                                    <div className="flex items-center space-x-8 mt-4 md:mt-0">
                                        <span className="font-bold text-nithish-orange">₹{ord.total}</span>
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold ${ord.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {ord.status}
                                        </span>
                                        <button className="text-sm font-bold text-gray-400 hover:text-nithish-orange">Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
