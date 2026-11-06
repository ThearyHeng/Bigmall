import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Check, Store, ArrowLeft } from 'lucide-react';

export default function VendorHeader({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isRegister = location.pathname.includes('register');

  return (
    <header className="bg-[#0f2744] border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-gray-50 transition-colors flex items-center">
              <img
                alt="BigMallCambodia.com"
                src="/bigmall-logo.png"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
          </Link>

          <div className="h-5 w-px bg-white/20 hidden xs:block"></div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#8b6914]/20 border border-[#d4b878]/30 text-[#d4b878] text-xs font-semibold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vendor Workspace</span>
            <span className="sm:hidden">Vendor</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Main Website Link */}
          <Link
            to="/"
            className="text-xs sm:text-sm text-white/75 hover:text-white flex items-center gap-1 transition-colors mr-1 sm:mr-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Main Marketplace</span>
          </Link>

          {/* Auth Toggle */}
          {isRegister ? (
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              {lang === 'kh' ? 'ចូលគណនី' : 'Sign In'}
            </Link>
          ) : (
            <Link
              to="/register"
              className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg bg-[#8b6914] text-white hover:bg-[#a67e1a] transition-all shadow-sm"
            >
              {lang === 'kh' ? 'ចុះឈ្មោះ' : 'Register'}
            </Link>
          )}

          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-md border rounded-lg text-xs sm:text-sm font-medium transition-all bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Globe className="w-3.5 h-3.5 opacity-80" />
              <span>{lang === 'en' ? 'EN' : 'ខ្មែរ'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#0f2744] border border-white/20 shadow-2xl overflow-hidden py-1 z-50">
                <button
                  onClick={() => { setLang('en'); setIsOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm text-left ${lang === 'en' ? 'text-[#d4b878] font-semibold bg-white/10' : 'text-white/80 hover:bg-white/10'}`}
                >
                  <span>English (EN)</span>
                  {lang === 'en' && <Check className="w-4 h-4 text-[#d4b878]" />}
                </button>
                <button
                  onClick={() => { setLang('kh'); setIsOpen(false); }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm text-left ${lang === 'kh' ? 'text-[#d4b878] font-semibold bg-white/10' : 'text-white/80 hover:bg-white/10'}`}
                >
                  <span>ភាសាខ្មែរ (KH)</span>
                  {lang === 'kh' && <Check className="w-4 h-4 text-[#d4b878]" />}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
