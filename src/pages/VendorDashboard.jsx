import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Store, Package, ShoppingBag, DollarSign, QrCode, Plus, LogOut,
  TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowUpRight, BarChart3,
  Search, Filter, X, Trash2, ExternalLink, RotateCcw, Edit3, Award, MapPin
} from 'lucide-react';
import VendorHeader from '../components/vendor/VendorHeader';
import AddProductModal from '../components/AddProductModal';
import EditStoreProfileModal from '../components/EditStoreProfileModal';
import { useProducts } from '../context/ProductContext';
import { useStore } from '../context/StoreContext';
import { useOrders } from '../context/OrderContext';

export default function VendorDashboard({ lang, setLang }) {
  const { products, addProduct, deleteProduct, resetToDefaults, categories } = useProducts();
  const { storeProfile, updateStoreProfile } = useStore();
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'profile'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedOrderMap, setSelectedOrderMap] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.categoryId === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQ = !q || p.titleEn.toLowerCase().includes(q) || p.titleKh.toLowerCase().includes(q) || p.merchant.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <VendorHeader lang={lang} setLang={setLang} />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl flex-1">
        
        {/* Top Profile Banner */}
        <div className="bg-[#0f2744] text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={storeProfile.logo}
              alt={storeProfile.nameEn}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#d4b878] shadow-md bg-white shrink-0"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-normal font-sans">
                  {storeProfile.nameEn}
                </h1>
                {storeProfile.nameKh && (
                  <span className="text-sm sm:text-base font-semibold text-white/80 font-khmer">
                    ({storeProfile.nameKh})
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  ✓ Verified Merchant
                </span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm mt-1">
                Merchant ID: #LL24-88392 · {storeProfile.address || `${storeProfile.commune}, ${storeProfile.province}`} · Direct ABA KHQR ({storeProfile.abaAccountNumber})
              </p>
            </div>
          </div>

          <div className="flex gap-2.5 flex-wrap">
            <button
              onClick={() => setShowEditProfileModal(true)}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-[#d4b878] text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>{lang === 'kh' ? 'កែប្រែព័ត៌មានហាង' : 'Edit Profile'}</span>
            </button>

            <Link
              to="/store/profile"
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'kh' ? 'ទំព័រហាងសាធារណៈ' : 'Public Store'}</span>
            </Link>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'kh' ? 'បន្ថែមផលិតផលថ្មី' : '+ Add Product'}</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">{lang === 'kh' ? 'ចំណូលសរុប (USD)' : 'Total Revenue'}</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">$4,820.50</p>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +24.8% this month
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8b6914] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">{lang === 'kh' ? 'ទូទាត់តាម ABA / KHQR' : 'Direct ABA KHQR'}</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">19,282,000 ៛</p>
              <span className="text-xs text-gray-500 font-medium mt-1 block">Direct to merchant account</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">{lang === 'kh' ? 'ការបញ្ជាទិញសរុប' : 'Total Orders'}</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">128 Orders</p>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 99.1% delivered
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">{lang === 'kh' ? 'ផលិតផលក្នុងកាតាឡុក' : 'Products in Catalog'}</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{products.length} Active</p>
              <span className="text-xs text-gray-500 font-medium mt-1 block">Across {categories.length} categories</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Main Tabs Section */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden">
          
          {/* Tabs Bar */}
          <div className="border-b border-gray-200 px-6 pt-4 flex items-center justify-between">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'products'
                    ? 'border-[#8b6914] text-[#8b6914]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{lang === 'kh' ? `ផលិតផលទាំងអស់ (${products.length})` : `Inventory Products (${products.length})`}</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'orders'
                    ? 'border-[#8b6914] text-[#8b6914]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'kh' ? 'ការបញ្ជាទិញ (Orders)' : 'Recent Orders (5)'}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'profile'
                    ? 'border-[#8b6914] text-[#8b6914]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>{lang === 'kh' ? 'ព័ត៌មាន & គណនីហាង' : 'Store Profile & Bank'}</span>
              </button>
            </div>

            {/* Quick action */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 text-xs font-bold text-[#8b6914] hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Product</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                {/* Search & Category Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        categoryFilter === 'all'
                          ? 'bg-[#1e3a5f] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All ({products.length})
                    </button>
                    {categories.map((c) => {
                      const count = products.filter((p) => p.categoryId === c.id).length;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setCategoryFilter(c.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                            categoryFilter === c.id
                              ? 'bg-[#8b6914] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <span>{c.icon}</span>
                          <span>{lang === 'kh' ? c.nameKh : c.nameEn}</span>
                          <span className={`text-[10px] px-1 py-0.2 rounded-full ${categoryFilter === c.id ? 'bg-white/20' : 'bg-gray-200 text-gray-700'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search input & actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search inventory..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase">
                        <th className="pb-3 font-semibold">Image</th>
                        <th className="pb-3 font-semibold">Product Name</th>
                        <th className="pb-3 font-semibold">Category</th>
                        <th className="pb-3 font-semibold">USD Price</th>
                        <th className="pb-3 font-semibold">KHR Price</th>
                        <th className="pb-3 font-semibold">Stock</th>
                        <th className="pb-3 font-semibold">Rating</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.slice(0, 100).map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3">
                            <img
                              src={p.image}
                              alt={p.titleEn}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200"
                            />
                          </td>
                          <td className="py-3 font-bold text-gray-900 max-w-xs">
                            <div className="truncate">{p.titleEn}</div>
                            <div className="text-[11px] font-normal text-gray-400 truncate">{p.titleKh}</div>
                          </td>
                          <td className="py-3 text-gray-600 font-medium whitespace-nowrap">
                            {p.categoryNameEn}
                          </td>
                          <td className="py-3 font-extrabold text-[#1e3a5f]">
                            ${p.priceUsd.toFixed(2)}
                          </td>
                          <td className="py-3 font-semibold text-gray-500 whitespace-nowrap">
                            {p.priceKhr.toLocaleString()} ៛
                          </td>
                          <td className="py-3 text-gray-700 font-semibold">
                            {p.stock} units
                          </td>
                          <td className="py-3 text-amber-500 font-bold whitespace-nowrap">
                            ★ {p.rating} ({p.reviews})
                          </td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold whitespace-nowrap">
                              ✓ In Stock
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Remove "${p.titleEn}" from your inventory?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase">
                      <th className="pb-3 font-semibold">Order ID</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Items</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Customer Location (Google Map)</th>
                      <th className="pb-3 font-semibold">Payment Method</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((o) => {
                      const loc = o.customerLocation || {
                        province: 'Phnom Penh',
                        district: 'Chamkar Mon',
                        commune: 'Tonle Bassac',
                        addressDetails: 'Phnom Penh, Cambodia',
                        lat: 11.5564,
                        lng: 104.9282,
                        googleMapsUrl: 'https://www.google.com/maps?q=11.5564,104.9282'
                      };
                      return (
                        <tr key={o.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 font-mono font-bold text-[#1e3a5f]">
                            {o.id}
                            <span className="block text-[10px] text-gray-400 font-normal">{o.time}</span>
                          </td>
                          <td className="py-4 font-medium text-gray-900">
                            <div>{o.buyer}</div>
                            <a href={`tel:${o.phone}`} className="text-[11px] text-gray-500 hover:text-[#8b6914] block">
                              {o.phone}
                            </a>
                          </td>
                          <td className="py-4 text-gray-600 max-w-[180px] truncate" title={o.items}>
                            {o.items}
                          </td>
                          <td className="py-4 font-extrabold text-gray-900">{o.total}</td>
                          
                          {/* Customer Location on Google Map */}
                          <td className="py-4">
                            <div className="space-y-1 max-w-xs">
                              <div className="text-xs font-semibold text-gray-900 truncate">
                                {loc.addressDetails}
                              </div>
                              <div className="text-[11px] text-gray-500">
                                {loc.commune ? `${loc.commune}, ` : ''}{loc.district}, {loc.province}
                              </div>
                              <div className="flex items-center gap-1.5 pt-0.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedOrderMap(o)}
                                  className="px-2 py-0.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  <MapPin className="w-3 h-3 text-red-600" />
                                  <span>Pin Map ({loc.lat.toFixed(4)}, {loc.lng.toFixed(4)})</span>
                                </button>
                                <a
                                  href={loc.googleMapsUrl || `https://www.google.com/maps?q=${loc.lat},${loc.lng}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-gray-100 transition-colors"
                                  title="Open in Google Maps"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          </td>

                          <td className="py-4">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold whitespace-nowrap">
                              {o.payment}
                            </span>
                          </td>
                          <td className="py-4">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                                o.status === 'Completed'
                                  ? 'bg-gray-100 text-gray-700 border-gray-200'
                                  : o.status === 'Delivering'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-amber-50 text-[#8b6914] border-amber-200'
                              }`}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Delivering">Delivering</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: Store Profile Overview */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <img src={storeProfile.logo} alt="logo" className="w-16 h-16 rounded-2xl object-cover border border-gray-300 bg-white" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{storeProfile.nameEn} ({storeProfile.nameKh})</h4>
                      <p className="text-xs text-gray-500">{storeProfile.taglineEn}</p>
                      <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">✓ Registered Enterprise · {storeProfile.taxId}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowEditProfileModal(true)}
                      className="px-4 py-2 bg-[#8b6914] text-white rounded-xl text-xs font-bold hover:bg-[#a67e1a] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Store Profile</span>
                    </button>
                    <Link
                      to="/store/profile"
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview Storefront</span>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
                  <div className="p-5 bg-white rounded-2xl border border-gray-200 space-y-3">
                    <h5 className="font-bold text-gray-900 uppercase text-xs">Direct Payment & Bank Settlement</h5>
                    <div>
                      <span className="text-gray-400 block">ABA Account Name:</span>
                      <strong className="text-gray-900 text-sm">{storeProfile.abaAccountName}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">ABA Account Number:</span>
                      <strong className="font-mono text-base text-[#1e3a5f]">{storeProfile.abaAccountNumber}</strong>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-[11px] font-bold inline-block">
                      ✓ Bakong KHQR Direct Payout Active
                    </span>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-gray-200 space-y-3">
                    <h5 className="font-bold text-gray-900 uppercase text-xs">Store Contact & Support</h5>
                    <div>
                      <span className="text-gray-400 block">Phone Support:</span>
                      <strong className="text-gray-900">{storeProfile.phone}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Telegram Channel:</span>
                      <strong className="text-[#8b6914]">{storeProfile.telegram}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Address:</span>
                      <span>{storeProfile.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddProduct={addProduct}
        lang={lang}
      />

      {/* Edit Store Profile Modal */}
      <EditStoreProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        storeProfile={storeProfile}
        onSave={updateStoreProfile}
        lang={lang}
      />

      {/* Customer Location on Google Map Viewer Modal */}
      {selectedOrderMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100 flex flex-col relative max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#f8fafc]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                  <MapPin className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    Customer Delivery Pin on Google Map
                  </h3>
                  <span className="text-xs text-gray-500">
                    Order {selectedOrderMap.id} · {selectedOrderMap.buyer}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrderMap(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              {/* Google Map Embed */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100">
                <iframe
                  title="Customer Location on Google Map"
                  src={`https://maps.google.com/maps?q=${selectedOrderMap.customerLocation?.lat || 11.5564},${selectedOrderMap.customerLocation?.lng || 104.9282}&hl=en&z=16&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="w-full h-full"
                />

                <div className="absolute top-3 right-3">
                  <a
                    href={selectedOrderMap.customerLocation?.googleMapsUrl || `https://www.google.com/maps?q=${selectedOrderMap.customerLocation?.lat},${selectedOrderMap.customerLocation?.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open in Google Maps App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Delivery Address & Driver Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Delivery Address:</span>
                  <p className="font-bold text-gray-900 text-sm">
                    {selectedOrderMap.customerLocation?.addressDetails}
                  </p>
                  <p className="text-gray-600">
                    {selectedOrderMap.customerLocation?.commune}, {selectedOrderMap.customerLocation?.district}, {selectedOrderMap.customerLocation?.province}
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">GPS Coordinates:</span>
                  <p className="font-mono font-bold text-red-600 text-sm">
                    {selectedOrderMap.customerLocation?.lat.toFixed(6)}, {selectedOrderMap.customerLocation?.lng.toFixed(6)}
                  </p>
                  {selectedOrderMap.customerLocation?.landmark && (
                    <p className="text-gray-600">
                      Landmark: <span className="font-medium text-gray-900">{selectedOrderMap.customerLocation?.landmark}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Notes for Driver */}
              {selectedOrderMap.customerLocation?.notes && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong className="block mb-0.5">Customer Delivery Notes:</strong>
                  <span>{selectedOrderMap.customerLocation?.notes}</span>
                </div>
              )}

              {/* Customer Contact & Status Summary */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{selectedOrderMap.buyer}</span>
                  <span>·</span>
                  <a href={`tel:${selectedOrderMap.phone}`} className="font-bold text-emerald-600 hover:underline">
                    {selectedOrderMap.phone}
                  </a>
                  <span>·</span>
                  <span className="font-bold text-[#1e3a5f]">{selectedOrderMap.total}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateOrderStatus(selectedOrderMap.id, 'Delivering');
                      setSelectedOrderMap({ ...selectedOrderMap, status: 'Delivering' });
                    }}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Mark as Delivering
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrderMap(null)}
                    className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
