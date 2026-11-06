import React from 'react';
import { ArrowRight, Send } from 'lucide-react';

export default function Hero({ t, onOpenSellerModal }) {
  const { hero } = t;

  return (
    <section className="relative overflow-hidden p-4 min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d] via-[#234876] to-[#3d6b9c]"></div>
      
      {/* Decorative Glow Orbs */}
      <div className="absolute top-20 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-20 w-64 h-64 rounded-full bg-[#d4b878]/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-40 w-48 h-48 rounded-full bg-white/15 blur-2xl"></div>
      </div>

      <div className="container mx-auto py-8 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between md:mx-12 lg:mx-20">
          
          {/* Left Content Column */}
          <div className="flex flex-col flex-1 max-w-2xl text-left">
            {/* Logo */}
            <a className="inline-flex items-center gap-2 mb-8 md:mb-10 w-fit group" href="/">
              <div className="bg-white px-4 py-2 rounded-2xl shadow-lg border border-white/20 group-hover:shadow-xl transition-all">
                <img
                  alt="BigMallCambodia.com"
                  loading="eager"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                  src="/bigmall-logo.png"
                />
              </div>
            </a>

            {/* Coming Soon Pill Badge */}
            <div className="inline-flex items-center gap-2 text-[#d4b878] mb-5">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
                {hero.badge}{' '}
                <span className="font-bold text-[#f5dfa8] brightness-125">
                  {hero.comingSoon}
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {hero.headline1}
              <br />
              <span className="text-[#d4b878] text-3xl sm:text-4xl lg:text-5xl font-extrabold drop-shadow-sm">
                {hero.headline2}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/85 mb-8 max-w-xl leading-relaxed">
              {hero.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-2">
              <button
                onClick={onOpenSellerModal}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#8b6914] hover:bg-[#a67e1a] active:scale-95 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:shadow-[#8b6914]/40 cursor-pointer"
              >
                <span>{hero.ctaMerchant}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/bigmallcambodia"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white hover:bg-white/15 active:scale-95 rounded-lg transition-all backdrop-blur-sm"
              >
                <Send className="w-4 h-4 text-white/80" />
                <span>{hero.ctaWaitlist}</span>
              </a>
            </div>
          </div>

          {/* Right Image Column (iPhone mockup) */}
          <div className="relative w-full lg:w-auto flex justify-center lg:justify-end flex-1 max-w-md lg:max-w-lg">
            <div className="relative animate-float-slow">
              <img
                alt="iphone15-mockup"
                width="600"
                height="700"
                className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] h-auto object-contain drop-shadow-2xl"
                src="/iphone15-mockup.png"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
