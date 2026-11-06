import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function FeaturedProducts({ lang, onQuickView, onAddToCart }) {
  const { products, categories } = useProducts();
  const [selectedCatId, setSelectedCatId] = useState('all');

  const filteredProducts = selectedCatId === 'all'
    ? products.slice(0, 16) // top featured across categories
    : products.filter((p) => p.categoryId === selectedCatId);

  return (
    <section id="marketplace-products" className="py-16 md:py-24 bg-[#f8fafc] border-t border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#8b6914] uppercase tracking-wider mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'kh' ? 'ផ្សារទំនិញពេញនិយម' : 'Marketplace Catalog'}</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {lang === 'kh' ? 'ផលិតផលក្នុងស្រុក' : 'Featured Local Products'}
              <br />
              <span className="text-[#8b6914]">
                {lang === 'kh' ? 'ផ្ទៀងផ្ទាត់ និង ដឹកជញ្ជូនរហ័ស' : 'Verified & Same-Day Delivery'}
              </span>
            </h2>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-amber-50 border border-gray-200 hover:border-[#8b6914]/40 rounded-xl text-xs sm:text-sm font-bold text-[#1e3a5f] shadow-xs transition-all w-fit"
          >
            <span>{lang === 'kh' ? 'មើលផលិតផលទាំងអស់ (160+)' : 'View All 160+ Products'}</span>
            <ArrowRight className="w-4 h-4 text-[#8b6914] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCatId === 'all'
                ? 'bg-[#1e3a5f] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {lang === 'kh' ? `ទាំងអស់ (${products.length})` : `All Products (${products.length})`}
          </button>

          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCatId === cat.id
                    ? 'bg-[#8b6914] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{lang === 'kh' ? cat.nameKh : cat.nameEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCatId === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
