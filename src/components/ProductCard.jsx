import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Truck, ShoppingBag, Eye, Store } from 'lucide-react';

export default function ProductCard({ product, lang, onQuickView, onAddToCart }) {
  const title = lang === 'kh' ? product.titleKh : product.titleEn;
  const categoryName = lang === 'kh' ? product.categoryNameKh : product.categoryNameEn;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 hover:border-[#8b6914]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
          -{product.discount}%
        </div>
      )}

      {/* Verified Badge */}
      <div className="absolute top-3 right-3 z-10 bg-[#0f2744]/80 backdrop-blur-md text-[#d4b878] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white/10">
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        <span className="hidden sm:inline">Verified</span>
      </div>

      {/* Image Container with Zoom & Quick View Hover Overlay */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={product.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView(product)}
            className="px-3.5 py-2 bg-white/95 hover:bg-white text-gray-900 rounded-xl font-bold text-xs shadow-lg flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'kh' ? 'មើលលម្អិត' : 'Quick View'}</span>
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Merchant Link */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span className="font-semibold text-[#8b6914] truncate max-w-[120px]">
              {categoryName}
            </span>
            <Link
              to="/store/profile"
              className="truncate max-w-[110px] hover:text-[#8b6914] hover:underline transition-colors"
              title="View Store Profile"
            >
              {product.merchant}
            </Link>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-[#8b6914] transition-colors cursor-pointer mb-2"
          >
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
            <span className="text-gray-300 mx-1">•</span>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5">
              <Truck className="w-3 h-3" />
              <span>Phnom Penh 1-Day</span>
            </span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-[#1e3a5f]">
                ${product.priceUsd.toFixed(2)}
              </span>
              {product.originalPriceUsd && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPriceUsd.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold text-gray-500 block">
              {product.priceKhr.toLocaleString()} ៛ (KHQR)
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 rounded-xl bg-[#8b6914] hover:bg-[#a67e1a] active:scale-95 text-white flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
