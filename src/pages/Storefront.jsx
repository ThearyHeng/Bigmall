import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, SlidersHorizontal, ShoppingBag, ArrowLeft, Filter, Sparkles,
  Check, Store, ShieldCheck, Truck, ChevronDown, X, Plus
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import AddProductModal from '../components/AddProductModal';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import { translations } from '../translations';

export default function Storefront({ lang, setLang }) {
  const { products, addProduct, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [activeProduct, setActiveProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = translations[lang] || translations.en;

  // Add to cart handler
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          p.titleEn.toLowerCase().includes(q) ||
          p.titleKh.toLowerCase().includes(q) ||
          p.merchant.toLowerCase().includes(q) ||
          p.categoryNameEn.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceUsd - b.priceUsd;
        if (sortBy === 'price-high') return b.priceUsd - a.priceUsd;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-[#0f2744] border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-gray-50 transition-colors flex items-center">
                <img
                  alt="BigMallCambodia.com"
                  src="/bigmall-logo.png"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#8b6914]/20 border border-[#d4b878]/30 text-[#d4b878] text-xs font-bold uppercase">
              Marketplace Store
            </span>
          </div>

          {/* Center Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'kh' ? 'ស្វែងរកម្រេចកំពត អង្ករ គ្រឿងអេឡិចត្រូនិច...' : 'Search Kampot pepper, jasmine rice, tech...'}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white focus:text-gray-900 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right: Cart & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#d4b878] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'kh' ? 'បន្ថែមទំនិញ' : 'Add Product'}</span>
            </button>

            <Link
              to="/dashboard"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Merchant Hub</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 rounded-xl bg-[#8b6914] hover:bg-[#a67e1a] text-white flex items-center gap-2 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'kh' ? 'កន្ត្រក' : 'Cart'}</span>
              {totalCartItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-[#8b6914] font-black text-xs flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <LanguageSelector lang={lang} setLang={setLang} />
          </div>

        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-[#0f2744] px-4 pb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'kh' ? 'ស្វែងរកទំនិញ...' : 'Search 160+ products...'}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white focus:text-gray-900"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl flex-1">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#1a365d] via-[#234876] to-[#3d6b9c] text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#d4b878] text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              {lang === 'kh' ? 'ទំនិញក្នុងស្រុកពិតៗ ២០ មុខក្នុងមួយផ្នែក' : 'Authentic 20 Products Per Category'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
              {lang === 'kh' ? 'ផ្សារទំនិញ BigMallCambodia.com កម្ពុជា' : "Cambodia's Trusted Marketplace"}
            </h1>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              {lang === 'kh'
                ? 'ទិញទំនិញដោយផ្ទាល់ពីអ្នកលក់ក្នុងស្រុកដែលបានផ្ទៀងផ្ទាត់។ ទូទាត់តាម ABA / KHQR ដោយផ្ទាល់ ដឹកជញ្ជូនរហ័សក្នុងភ្នំពេញ។'
                : 'Shop directly from verified local merchants. Pay directly via ABA Bank & KHQR. Same-day delivery across Phnom Penh.'}
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="flex -space-x-2">
              {['/brand/nine.png', '/brand/skechers.png', '/brand/mont-blanc.png'].map((src, i) => (
                <img key={i} src={src} alt="brand" className="w-9 h-9 rounded-full bg-white border-2 border-white object-contain shadow-sm" />
              ))}
            </div>
            <div className="text-xs text-white/90">
              <span className="font-bold block">100+ Local Merchants</span>
              <span className="text-white/60">Verified Onsite</span>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
              selectedCategory === 'all'
                ? 'bg-[#1e3a5f] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {lang === 'kh' ? `ទាំងអស់ (${products.length})` : `All Categories (${products.length})`}
          </button>

          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#8b6914] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{lang === 'kh' ? cat.nameKh : cat.nameEn}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-extrabold ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter / Sort Sub-header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="text-xs sm:text-sm text-gray-600 font-semibold">
            {lang === 'kh' ? 'បង្ហាញលទ្ធផល' : 'Showing'}{' '}
            <span className="text-[#1e3a5f] font-bold">{filteredProducts.length}</span>{' '}
            {lang === 'kh' ? 'ផលិតផល' : 'products'}
            {searchQuery && (
              <span className="text-[#8b6914] ml-1">
                for "{searchQuery}"
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold uppercase">{lang === 'kh' ? 'តម្រៀបតាម:' : 'Sort by:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8b6914]"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-200">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {lang === 'kh' ? 'រកមិនឃើញផលិតផល' : 'No products found'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              {lang === 'kh' ? 'សូមសាកល្បងស្វែងរកពាក្យផ្សេង' : 'Try adjusting your search query or category filters.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#8b6914] text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onQuickView={(p) => setActiveProduct(p)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

      </main>

      {/* Modals & Drawers */}
      <ProductModal
        product={activeProduct}
        isOpen={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        lang={lang}
        onAddToCart={handleAddToCart}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={addProduct}
        lang={lang}
      />

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
