import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';

export default function LanguageSelector({ lang, setLang }) {
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
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'kh', label: 'ភាសាខ្មែរ (Khmer)', short: 'ខ្មែរ' },
  ];

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 backdrop-blur-md border rounded-lg text-sm font-medium transition-all shadow-sm bg-white/15 border-white/25 text-white hover:bg-white/25 active:scale-95"
          aria-label="Select Language"
        >
          <Globe className="w-3.5 h-3.5 opacity-80" />
          <span>{lang === 'en' ? 'EN' : 'ខ្មែរ'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0f2744]/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left transition-colors ${
                  lang === l.code
                    ? 'text-[#d4b878] font-semibold bg-white/10'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{l.label}</span>
                {lang === l.code && <Check className="w-4 h-4 text-[#d4b878]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
