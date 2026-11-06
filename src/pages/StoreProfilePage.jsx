import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Store, MapPin, Phone, Send, CheckCircle2, ShieldCheck, Clock,
  Star, Heart, Share2, Search, Filter, ShoppingBag, ArrowLeft,
  Truck, Award, Sparkles, MessageCircle, ExternalLink, QrCode,
  Check, ChevronRight, Edit3, Plus, AlertCircle, Eye, ThumbsUp
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import AddProductModal from '../components/AddProductModal';
import EditStoreProfileModal from '../components/EditStoreProfileModal';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import { translations } from '../translations';

export default function StoreProfilePage({ lang, setLang }) {
  const { storeProfile, updateStoreProfile, isFollowing, toggleFollow } = useStore();
  const { products, addProduct, categories } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'about' | 'reviews' | 'policy'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  const [activeProduct, setActiveProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = translations[lang] || translations.en;

  // Filter products by merchant
  const merchantProducts = useMemo(() => {
    return products.filter((p) => {
      // Show products matching this merchant or general sample catalog
      return true;
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    return merchantProducts
      .filter((p) => {
        const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          p.titleEn.toLowerCase().includes(q) ||
          p.titleKh.toLowerCase().includes(q) ||
          p.categoryNameEn.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceUsd - b.priceUsd;
        if (sortBy === 'price-high') return b.priceUsd - a.priceUsd;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [merchantProducts, selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Sample customer reviews for this store
  const reviews = [
    {
      id: 1,
      name: 'Vannak Heng',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      date: 'Yesterday',
      comment: 'Ordered Kampot Black Pepper & Jasmine Rice. Arrived in Tonle Bassac in 45 minutes! Quality is exceptional and packaging is eco-friendly.',
      item: 'Organic Black Kampot Pepper 100g',
      likes: 14,
      merchantReply: 'Thank you so much Vannak! We work directly with our Kampot farm partners to ensure fast dispatch. Enjoy your cooking!'
    },
    {
      id: 2,
      name: 'Chenda Meas',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      date: '3 days ago',
      comment: 'The handmade silk krama is stunning. Soft texture and authentic Khmer pattern. Paid directly via ABA KHQR with instant confirmation.',
      item: 'Handwoven Pure Silk Krama',
      likes: 9,
      merchantReply: 'Thank you Chenda! Our Takeo weaving cooperative will be so pleased to hear your kind words.'
    },
    {
      id: 3,
      name: 'Marc Lefevre',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      date: '1 week ago',
      comment: 'Top quality Mondulkiri medium roast beans. Fresh aroma and roasted within the week. Highly recommended store on BigMallCambodia.com.',
      item: 'Mondulkiri Highland Arabica 250g',
      likes: 21,
      merchantReply: 'Merci beaucoup Marc! Glad you love our Mondulkiri roast.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      
      {/* Top Navigation */}
      <header className="bg-[#0f2744] border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link to="/shop" className="text-white/70 hover:text-white flex items-center gap-1 text-xs font-semibold">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Marketplace</span>
            </Link>
            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-gray-50 transition-colors flex items-center">
                <img src="/bigmall-logo.png" alt="BigMallCambodia.com" className="h-6 sm:h-7 w-auto object-contain" />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-[#d4b878] rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'kh' ? 'កែប្រែព័ត៌មានហាង' : 'Edit Profile'}</span>
            </button>

            <Link
              to="/dashboard"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white rounded-xl text-xs font-bold transition-all"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vendor Dashboard</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center gap-1.5 font-bold text-xs shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {totalCartItems > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#8b6914] text-white font-black text-[10px] flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            <LanguageSelector lang={lang} setLang={setLang} />
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16">
        
        {/* Store Profile Hero Banner Section */}
        <div className="bg-white border-b border-gray-200 shadow-xs">
          
          {/* Cover Banner */}
          <div className="h-44 sm:h-64 lg:h-72 w-full relative bg-[#0f2744] overflow-hidden">
            <img
              src={storeProfile.banner}
              alt="Store Cover Banner"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Verified Onsite Ribbon */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-emerald-500 text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Onsite Merchant</span>
            </div>
          </div>

          {/* Store Info Bar (Overlapping Logo & Profile) */}
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="relative -mt-16 sm:-mt-20 pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              
              {/* Logo & Identity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                <div className="relative">
                  <img
                    src={storeProfile.logo}
                    alt={storeProfile.nameEn}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#8b6914] text-white p-1.5 rounded-full shadow-md border-2 border-white" title="BigMallCambodia.com Verified">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div className="pt-2 sm:pt-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-normal font-sans">
                      {storeProfile.nameEn}
                    </h1>
                    {storeProfile.nameKh && (
                      <span className="text-lg sm:text-xl font-bold text-gray-600 font-khmer">
                        ({storeProfile.nameKh})
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-1">
                      <Check className="w-3 h-3 text-blue-600" />
                      <span>{storeProfile.verifiedBadge}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8b6914] font-semibold mt-1 font-sans">
                    {lang === 'kh' ? (storeProfile.taglineKh || storeProfile.taglineEn) : (storeProfile.taglineEn || storeProfile.taglineKh)}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{storeProfile.province}, Cambodia</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <strong className="text-gray-900">{storeProfile.rating}</strong> ({storeProfile.reviewsCount} reviews)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Express 1-Day Delivery</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Follow, Chat, ABA QR */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                <button
                  onClick={toggleFollow}
                  className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    isFollowing
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-[#1e3a5f] hover:bg-[#152943] text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFollowing ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFollowing ? 'Following (1.2k)' : 'Follow Store'}</span>
                </button>

                <a
                  href={`tel:${storeProfile.phone}`}
                  className="px-3.5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Call</span>
                </a>

                <a
                  href={`https://t.me/${storeProfile.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Telegram</span>
                </a>

                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="px-3.5 py-2.5 bg-amber-50 border border-[#8b6914]/30 hover:bg-amber-100 text-[#8b6914] font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>ABA Pay</span>
                </button>
              </div>

            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Fulfillment Rate</span>
                <span className="font-extrabold text-gray-900 text-sm">{storeProfile.fulfillmentRate}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Response Time</span>
                <span className="font-extrabold text-emerald-600 text-sm">{storeProfile.responseTime}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Products Listed</span>
                <span className="font-extrabold text-[#1e3a5f] text-sm">{products.length} Items</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Member On Platform</span>
                <span className="font-extrabold text-gray-900 text-sm">{storeProfile.joinedDate}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Selector Navigation */}
        <div className="sticky top-16 sm:top-20 z-30 bg-white border-b border-gray-200 shadow-xs">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar font-bold text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'products' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{lang === 'kh' ? `ផលិតផលក្នុងហាង (${products.length})` : `Store Products (${products.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'about' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{lang === 'kh' ? 'អំពីហាង & វិញ្ញាបនបត្រ' : 'About & Verification'}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'reviews' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>{lang === 'kh' ? `ការវាយតម្លៃ (${storeProfile.reviewsCount})` : `Reviews (${storeProfile.reviewsCount})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('policy')}
              className={`py-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'policy' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{lang === 'kh' ? 'គោលការណ៍ដឹកជញ្ជូន & ធានា' : 'Shipping & Policy'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl pt-8">
          
          {/* TAB 1: Products */}
          {activeTab === 'products' && (
            <div>
              {/* Category Pills & Search */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#1e3a5f] text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All ({products.length})
                  </button>
                  {categories.map((c) => {
                    const count = products.filter((p) => p.categoryId === c.id).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                          selectedCategory === c.id
                            ? 'bg-[#8b6914] text-white shadow-sm'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{c.icon}</span>
                        <span>{lang === 'kh' ? c.nameKh : c.nameEn}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === c.id ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-60">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search store items..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-3.5 py-1.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white font-bold text-xs rounded-xl flex items-center gap-1 whitespace-nowrap shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                  <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h4 className="font-bold text-gray-700">No items match your search</h4>
                  <p className="text-xs text-gray-400 mt-1">Try another keyword or category filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      lang={lang}
                      onQuickView={(prod) => setActiveProduct(prod)}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: About & Verification */}
          {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 space-y-6">
                {/* Store Story Card */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#8b6914]" />
                    <span>Our Artisan Story</span>
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                    {lang === 'kh' ? storeProfile.bioKh || storeProfile.bioEn : storeProfile.bioEn}
                  </p>
                  <div className="p-4 bg-amber-50/70 border border-[#d4b878]/30 rounded-2xl flex items-center gap-3">
                    <Award className="w-8 h-8 text-[#8b6914] shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-[#8b6914] block">100% Authentic Cambodian Artisan Guarantee</span>
                      <span className="text-gray-600">Every item in our collection is sustainably sourced and directly benefits local rural communities.</span>
                    </div>
                  </div>
                </div>

                {/* Verification Documents & Badges */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Government & Marketplace Verification</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Ministry of Commerce Registration</span>
                      </div>
                      <p className="text-xs text-gray-600">Business Reg ID: #MOC-KH-2024-88392</p>
                      <span className="text-[10px] text-emerald-700 font-bold mt-1 inline-block">✓ Active & Validated</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-800 font-bold text-xs mb-1">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>General Department of Taxation (GDT)</span>
                      </div>
                      <p className="text-xs text-gray-600">Tax ID: {storeProfile.taxId}</p>
                      <span className="text-[10px] text-blue-700 font-bold mt-1 inline-block">✓ Tax Compliant Local Business</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                {/* Location & Hours */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Store Location & Hours
                  </h4>

                  <div className="space-y-3 text-xs text-gray-700">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block">Physical Store Address:</span>
                        <span>{storeProfile.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block">Opening & Order Processing:</span>
                        <span>{storeProfile.openingHours}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold text-gray-900 block">Customer Hotline:</span>
                        <span>{storeProfile.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct ABA KHQR Card */}
                <div className="bg-[#0f2744] text-white p-6 rounded-3xl shadow-md border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#d4b878] font-bold uppercase">Direct ABA Settlement</span>
                    <QrCode className="w-5 h-5 text-[#d4b878]" />
                  </div>
                  <p className="text-xs text-white/80">Payments are deposited directly to merchant account with Bakong KHQR confirmation.</p>
                  <div className="pt-2 border-t border-white/10 text-xs">
                    <span className="text-white/50 block">Account Name</span>
                    <strong className="text-white text-sm">{storeProfile.abaAccountName}</strong>
                    <span className="text-[#d4b878] font-mono block mt-0.5 font-bold">{storeProfile.abaAccountNumber}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Rating Summary Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="text-4xl sm:text-5xl font-black text-gray-900">{storeProfile.rating}</span>
                    <span className="text-gray-400 text-lg">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 my-1 justify-center sm:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Based on {storeProfile.reviewsCount} verified purchase reviews</p>
                </div>

                <div className="flex gap-4 text-xs font-semibold">
                  <div className="text-center p-3 bg-gray-50 rounded-2xl min-w-[100px]">
                    <span className="text-emerald-600 text-lg font-bold block">99.4%</span>
                    <span className="text-gray-500 text-[11px]">Positive Reviews</span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-2xl min-w-[100px]">
                    <span className="text-[#1e3a5f] text-lg font-bold block">100%</span>
                    <span className="text-gray-500 text-[11px]">Genuine Goods</span>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        <div>
                          <h5 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                            <span>{rev.name}</span>
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                              ✓ Verified Buyer
                            </span>
                          </h5>
                          <div className="flex items-center gap-2 text-[11px] text-gray-400">
                            <div className="flex text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                              ))}
                            </div>
                            <span>•</span>
                            <span>{rev.date}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] text-[#8b6914] font-semibold bg-amber-50 px-2.5 py-1 rounded-lg">
                        {rev.item}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-13">
                      {rev.comment}
                    </p>

                    {/* Merchant Reply */}
                    {rev.merchantReply && (
                      <div className="ml-13 p-3.5 bg-gray-50 rounded-2xl border-l-4 border-[#8b6914] text-xs text-gray-600 space-y-1">
                        <span className="font-bold text-gray-900 flex items-center gap-1">
                          <Store className="w-3.5 h-3.5 text-[#8b6914]" />
                          <span>Store Response</span>
                        </span>
                        <p>{rev.merchantReply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: Policy */}
          {activeTab === 'policy' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#8b6914]" />
                  <span>Delivery & Courier Logistics</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {storeProfile.shippingPolicy}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-gray-50 rounded-xl text-xs">
                    <strong className="text-gray-900 block mb-0.5">Phnom Penh Express:</strong>
                    <span>1 to 3 hours with Grab / FoodPanda / Local driver</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl text-xs">
                    <strong className="text-gray-900 block mb-0.5">Provinces Delivery:</strong>
                    <span>VET, J&T Express, or Virak Buntham Express</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Return, Refund & Guarantee Policy</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {storeProfile.returnPolicy}
                </p>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* ABA KHQR Pay Direct Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-gray-200 shadow-2xl text-center relative">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-gray-900 text-lg mb-1">Direct Merchant KHQR</h3>
            <p className="text-xs text-gray-500 mb-4">Scan with ABA Mobile or any Bakong-enabled banking app</p>

            <div className="p-4 bg-[#f8fafc] border-2 border-dashed border-gray-200 rounded-2xl mb-4">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://pay.ababank.com/hg24-artisan-88392"
                alt="ABA QR"
                className="w-48 h-48 mx-auto rounded-xl"
              />
              <span className="text-[11px] font-bold text-[#0f2744] block mt-2">{storeProfile.abaAccountName}</span>
              <span className="text-xs text-[#8b6914] font-mono font-extrabold">{storeProfile.abaAccountNumber}</span>
            </div>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-2.5 bg-[#8b6914] text-white font-bold rounded-xl text-xs hover:bg-[#a67e1a]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditStoreProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        storeProfile={storeProfile}
        onSave={updateStoreProfile}
        lang={lang}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={addProduct}
        lang={lang}
      />

      {/* Product Quick View Modal */}
      <ProductModal
        product={activeProduct}
        isOpen={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        lang={lang}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        lang={lang}
      />

      {/* Footer */}
      <Footer t={t} />

    </div>
  );
}
