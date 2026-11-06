import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, QrCode, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onComplete, minDuration = 1500, lang = 'en', isStandalone = false }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(
    lang === 'kh' ? 'កំពុងភ្ជាប់ទៅកាន់ផ្សារ BigMallCambodia...' : 'Connecting to BigMallCambodia.com...'
  );
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      
      setProgress(pct);

      if (pct < 30) {
        setStatusText(
          lang === 'kh'
            ? 'កំពុងភ្ជាប់ទៅកាន់អាជីវករក្នុងស្រុក...'
            : 'Connecting to verified Cambodian merchants...'
        );
      } else if (pct < 65) {
        setStatusText(
          lang === 'kh'
            ? 'កំពុងទាញយកទិន្នន័យផលិតផលគុណភាពខ្ពស់...'
            : 'Loading verified local products...'
        );
      } else if (pct < 90) {
        setStatusText(
          lang === 'kh'
            ? 'កំពុងរៀបចំប្រព័ន្ធទូទាត់ប្រាក់ ABA KHQR...'
            : 'Preparing ABA KHQR direct settlement...'
        );
      } else {
        setStatusText(
          lang === 'kh'
            ? 'រួចរាល់! សូមស្វាគមន៍មកកាន់ BigMallCambodia.com'
            : 'Ready! Welcome to BigMallCambodia.com'
        );
      }

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setProgress(100);
        if (!isStandalone) {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
        }
      }
    }, 35);

    return () => clearInterval(interval);
  }, [minDuration, onComplete, lang, isStandalone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 bg-gradient-to-b from-white via-[#f8fafc] to-[#eef2f6] text-gray-900 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Decorative Top Accent */}
      <div className="w-full flex justify-between items-center max-w-md pt-2 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
        <span>Phnom Penh</span>
        <span className="flex items-center gap-1 text-[#0c3382]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Live Marketplace
        </span>
        <span>Cambodia</span>
      </div>

      {/* Main Center Box */}
      <div className="flex flex-col items-center text-center max-w-md w-full my-auto py-8">
        
        {/* Animated Brand Emblem & Logo */}
        <div className="relative mb-6">
          {/* Subtle Glow Rings */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#0c3382]/10 via-[#d3152e]/10 to-[#8b6914]/15 rounded-3xl blur-xl animate-pulse"></div>
          
          <div className="relative bg-white p-5 sm:p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center">
            {/* Logo Image */}
            <img
              src="/bigmall-logo.png"
              alt="BigMallCambodia.com"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Brand Tagline */}
        <div className="space-y-1 mb-8">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-1.5">
            <span className="text-[#0c3382]">BigMall</span>
            <span className="text-[#d3152e]">Cambodia</span>
            <span className="text-xs bg-[#8b6914] text-white px-1.5 py-0.5 rounded font-mono">.com</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-600">
            {lang === 'kh'
              ? 'ផ្សារអនឡាញកម្ពុជា · ទិញផលិតផលក្នុងស្រុកពិតៗ'
              : "Cambodia's Trusted Marketplace · Shop Local"}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full max-w-xs space-y-2.5">
          <div className="h-2.5 w-full bg-gray-200/80 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0c3382] via-[#d3152e] to-[#8b6914] transition-all duration-150 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer sweep animation */}
              <div className="absolute inset-0 bg-white/30 animate-[shimmer_1.5s_infinite] -skew-x-12"></div>
            </div>
          </div>

          {/* Progress Percent & Live Status Text */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
            <span className="truncate max-w-[220px] text-left text-gray-600">{statusText}</span>
            <span className="font-mono font-bold text-[#0c3382]">{progress}%</span>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 mt-8 w-full max-w-sm pt-4 border-t border-gray-200/60 text-[11px] text-gray-600">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/80 border border-gray-100 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#0c3382]" />
            <span className="font-semibold">{lang === 'kh' ? 'ហាងពិតប្រាកដ' : 'Verified'}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/80 border border-gray-100 shadow-xs">
            <QrCode className="w-4 h-4 text-[#d3152e]" />
            <span className="font-semibold">{lang === 'kh' ? 'ABA KHQR' : 'Direct Pay'}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/80 border border-gray-100 shadow-xs">
            <Truck className="w-4 h-4 text-[#8b6914]" />
            <span className="font-semibold">{lang === 'kh' ? 'ដឹកជញ្ជូនរហ័ស' : 'Express'}</span>
          </div>
        </div>

        {/* Standalone replay button for testing */}
        {isStandalone && (
          <button
            onClick={() => {
              setProgress(0);
              setIsFadingOut(false);
            }}
            className="mt-6 px-4 py-2 bg-[#0c3382] text-white rounded-xl text-xs font-bold hover:bg-[#0a2763] transition-colors cursor-pointer"
          >
            Replay Loading Screen
          </button>
        )}

      </div>

      {/* Footer Branding Note */}
      <div className="text-center text-[11px] text-gray-400 pb-2">
        <p>© 2026 BigMallCambodia.com · Powered by SAK DIGITAL Solution</p>
      </div>
    </div>
  );
}
