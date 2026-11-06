import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function ForMerchants({ t, onOpenSellerModal }) {
  const { forSellers } = t;

  return (
    <section id="for-sellers" className="py-20 md:py-28 relative overflow-hidden text-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d] via-[#234876] to-[#3d6b9c]"></div>
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#d4b878]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <div>
          <p className="text-[#d4b878] tracking-widest text-sm md:text-base font-bold uppercase mb-4">
            {forSellers.badge}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
            {forSellers.headline1}
          </h2>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#d4b878] mb-6 leading-tight">
            {forSellers.headline2}
          </h2>
          <p className="text-white/85 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {forSellers.description}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <button
              onClick={onOpenSellerModal}
              className="group inline-flex items-center gap-2 px-9 py-4 bg-[#8b6914] hover:bg-[#a67e1a] active:scale-95 text-white font-bold text-base md:text-lg rounded-xl transition-all shadow-xl hover:shadow-2xl hover:shadow-[#8b6914]/50 cursor-pointer"
            >
              <span>{forSellers.ctaStore}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* 3 Benefits Checkmarks */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-10">
            {[forSellers.benefit1, forSellers.benefit2, forSellers.benefit3].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-white/95 font-medium text-sm md:text-base">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
