import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';

export default function LanguageSelector({ lang, setLang, className = '', buttonClassName = '' }) {
  const [isOpen, setIsOpen] = useState(false);
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

  const languages = [
    { code: 'kh', label: 'ភាសាខ្មែរ (Khmer)', short: 'ខ្មែរ' },
    { code: 'en', label: 'English (US)', short: 'EN' },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
          buttonClassName ||
          'bg-white/15 hover:bg-white/25 text-white border border-white/25 active:scale-95 shadow-xs'
        }`}
        aria-label="Select Language"
        type="button"
      >
        <Globe className="w-3.5 h-3.5 opacity-90 text-[#d4b878]" />
        <span className="font-bold">{lang === 'kh' ? 'ខ្មែរ' : 'EN'}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0f2744] border border-white/20 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#d4b878] border-b border-white/10 mb-1">
            ជ្រើសរើសភាសា / Language
          </div>
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                lang === l.code
                  ? 'text-[#d4b878] font-bold bg-white/15'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{l.code === 'kh' ? '🇰🇭' : '🇺🇸'}</span>
                <span>{l.label}</span>
              </div>
              {lang === l.code && <Check className="w-4 h-4 text-[#d4b878]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
