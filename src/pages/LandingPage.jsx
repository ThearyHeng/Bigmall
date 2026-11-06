import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import WhyLayLong24 from '../components/WhyLayLong24';
import HowItWorks from '../components/HowItWorks';
import BrowseCategories from '../components/BrowseCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import ForMerchants from '../components/ForMerchants';
import Footer from '../components/Footer';
import SellerModal from '../components/SellerModal';
import ProductModal from '../components/ProductModal';
import CartDrawer from '../components/CartDrawer';
import { ShoppingBag } from 'lucide-react';

export default function LandingPage({ t, lang, setLang }) {
  const navigate = useNavigate();
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenSeller = () => {
    navigate('/register');
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-[#d4b878]/30 selection:text-[#1e3a5f]">
      
      {/* Floating Top-Right Navigation & Language Switcher Pill */}
      <div
        className={`fixed top-3 right-3 sm:top-5 sm:right-6 z-50 flex items-center gap-2 p-1.5 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f2744]/95 text-white border border-white/20 shadow-2xl backdrop-blur-xl scale-95 sm:scale-100'
            : 'bg-[#0f2744]/80 text-white border border-white/20 shadow-xl backdrop-blur-md'
        }`}
      >
        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm bg-[#8b6914] hover:bg-[#a67e1a] text-white active:scale-95 cursor-pointer"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === 'kh' ? 'កន្ត្រក' : 'Cart'}</span>
          {totalCartItems > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-[#8b6914] font-black text-[10px] flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </button>

        {/* Store Link */}
        <Link
          to="/shop"
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-white/90 hover:text-white hover:bg-white/10"
        >
          <span>{lang === 'kh' ? 'ផ្សារទំនិញ' : 'Browse Shop'}</span>
        </Link>

        {/* Language Selector */}
        <LanguageSelector
          lang={lang}
          setLang={setLang}
          buttonClassName="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all shadow-xs"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Hero t={t} onOpenSellerModal={handleOpenSeller} />
        <TrustedBy t={t} />
        <WhyLayLong24 t={t} />
        <HowItWorks t={t} />
        
        {/* 10 Category Grid */}
        <BrowseCategories t={t} />

        {/* Featured 20 Products Per Category Section */}
        <FeaturedProducts
          lang={lang}
          onQuickView={(p) => setActiveProduct(p)}
          onAddToCart={handleAddToCart}
        />

        <ForMerchants t={t} onOpenSellerModal={handleOpenSeller} />
      </main>

      {/* Footer */}
      <Footer t={t} />

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

      {/* Seller Modal */}
      <SellerModal
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        t={t}
        lang={lang}
      />
    </div>
  );
}
