import React from 'react';
import { Link } from 'react-router-dom';

export default function BrowseCategories({ t }) {
  const { browseCategories } = t;

  const categories = [
    { id: 'electronics', name: browseCategories.cat1, icon: '/categories/electronics.png' },
    { id: 'specialties', name: browseCategories.cat2, icon: '/categories/specialties.png' },
    { id: 'household', name: browseCategories.cat3, icon: '/categories/household.png' },
    { id: 'kids', name: browseCategories.cat4, icon: '/categories/kids.png' },
    { id: 'fashion', name: browseCategories.cat5, icon: '/categories/fashion.png' },
    { id: 'grocery', name: browseCategories.cat6, icon: '/categories/grocery.png' },
    { id: 'specialties', name: browseCategories.cat7, icon: '/categories/new-releases.png' },
    { id: 'stationery', name: browseCategories.cat8, icon: '/categories/souvenirs.png' },
    { id: 'specialties', name: browseCategories.cat9, icon: '/categories/brand.png' },
    { id: 'sports', name: browseCategories.cat10, icon: '/categories/sports.png' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs sm:text-sm leading-relaxed text-[#8b6914] uppercase tracking-wider font-bold mb-3 inline-block">
              {browseCategories.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {browseCategories.headline1}
              <br />
              <span className="text-[#8b6914]">{browseCategories.headline2}</span>
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#1e3a5f] hover:text-[#8b6914] flex items-center gap-1 underline"
          >
            Explore all categories (20 products each) →
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link
              to="/shop"
              key={idx}
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-[#d4b878] hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1 text-center"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center p-2 bg-white shadow-xs group-hover:scale-110 transition-transform">
                <img
                  alt={cat.name}
                  loading="lazy"
                  width="48"
                  height="48"
                  className="object-contain w-10 h-10"
                  src={cat.icon}
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#1e3a5f] transition-colors leading-snug">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#8b6914] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                20 Products →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
