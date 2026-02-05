import { useState } from 'react';
import { Package, Plus, Trash2, Edit } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import axios from 'axios';

const AdminDashboard = () => {
    const { data: products, isLoading } = useProducts();
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin <span className="text-nithish-orange">Dashboard</span></h1>
                    <p className="text-gray-500">Manage your festive catalog</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-orange-50 text-orange-800 uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-50">
                        {(products || []).map((p) => (
                            <tr key={p._id} className="hover:bg-orange-50/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                        <span className="font-bold text-gray-800">{p.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{p.category}</td>
                                <td className="px-6 py-4 font-bold text-nithish-orange">₹{p.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${p.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {p.stock} In Stock
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3 text-gray-400">
                                        <button className="hover:text-nithish-orange"><Edit className="w-5 h-5" /></button>
                                        <button
                                            className="hover:text-red-500"
                                            onClick={async () => {
                                                if (window.confirm('Are you sure?')) {
                                                    try {
                                                        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                                                        const config = {
                                                            headers: { Authorization: `Bearer ${userInfo.token}` }
                                                        };
                                                        await axios.delete(`http://localhost:5000/api/products/${p._id}`, config);
                                                        window.location.reload(); // Simple reload for now
                                                    } catch (err) {
                                                        alert(err.message);
                                                    }
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isLoading && <div className="p-12 text-center text-gray-400">Loading products...</div>}
            </div>
        </div>
    );
};

export default AdminDashboard;
