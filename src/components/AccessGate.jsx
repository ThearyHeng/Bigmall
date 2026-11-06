import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, CheckCircle2, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';

const CORRECT_ACCESS_CODE = '089222085';

export default function AccessGate({ onUnlock, lang = 'kh', setLang }) {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanCode = code.trim();

    if (cleanCode === CORRECT_ACCESS_CODE) {
      setError(false);
      setIsSuccess(true);
      setTimeout(() => {
        try {
          localStorage.setItem('bigmall_access_granted_v1', '089222085');
        } catch (err) {
          console.warn('Storage not available', err);
        }
        if (onUnlock) onUnlock();
      }, 700);
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-br from-[#071527] via-[#0c223f] to-[#050e1a] text-white font-sans overflow-y-auto">
      
      {/* Top Header */}
      <div className="w-full max-w-md flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{lang === 'kh' ? 'ដំណាក់កាលអភិវឌ្ឍន៍' : 'Development Preview'}</span>
        </div>

        {setLang && (
          <button
            onClick={() => setLang(lang === 'kh' ? 'en' : 'kh')}
            className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors font-medium cursor-pointer"
          >
            {lang === 'kh' ? 'English' : 'ភាសាខ្មែរ'}
          </button>
        )}
      </div>

      {/* Main Gate Card */}
      <div className="w-full max-w-md my-auto py-6">
        <div
          className={`bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-200 ${
            isShaking ? 'translate-x-[-8px] ring-2 ring-red-500' : ''
          }`}
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-block bg-white px-4 py-2 rounded-2xl shadow-lg border border-white/20 mb-4">
              <img
                src="/bigmall-logo.png"
                alt="BigMallCambodia.com"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              <span>{lang === 'kh' ? 'ចូលប្រើប្រាស់ប្រព័ន្ធ' : 'Private Access Gate'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
              {lang === 'kh'
                ? 'កម្មវិធីកំពុងស្ថិតក្នុងដំណាក់កាលអភិវឌ្ឍន៍។ សូមបញ្ចូលលេខកូដសម្ងាត់ដើម្បីអាច Login ចូលទស្សនាបាន។'
                : 'Application is under active development. Please enter the private access code to proceed.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                {lang === 'kh' ? 'លេខកូដសម្ងាត់ (Access Code)' : 'Access Code'}
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <KeyRound className="w-5 h-5" />
                </div>

                <input
                  type={showCode ? 'text' : 'password'}
                  inputMode="numeric"
                  autoFocus
                  required
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder={lang === 'kh' ? 'វាយលេខកូដនៅទីនេះ...' : 'Enter access code...'}
                  className={`w-full pl-11 pr-11 py-3.5 rounded-2xl bg-black/40 border text-white text-base tracking-wider placeholder-white/40 focus:outline-none transition-all ${
                    error
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500 bg-red-950/20'
                      : isSuccess
                      ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500 bg-emerald-950/20'
                      : 'border-white/20 focus:border-[#d4b878] focus:ring-2 focus:ring-[#d4b878]/30'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  {lang === 'kh'
                    ? 'លេខកូដមិនត្រឹមត្រូវទេ! មិនអនុញ្ញាតិឱ្យចូលប្រើប្រាស់ឡើយ។'
                    : 'Incorrect code! Access is restricted.'}
                </span>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'kh'
                    ? 'ផ្ទៀងផ្ទាត់ជោគជ័យ! កំពុងបើកចូលគេហទំព័រ...'
                    : 'Access granted! Opening BigMallCambodia...'}
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSuccess}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#8b6914] via-[#a67e1a] to-[#d4b878] hover:from-[#a67e1a] hover:to-[#e2ca8d] text-gray-950 font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>{lang === 'kh' ? 'ផ្ទៀងផ្ទាត់ និងចូលប្រើប្រាស់' : 'Unlock & Enter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Badge */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-white/50 text-center">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>BigMallCambodia Private Access Gate</span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-white/40 pb-2">
        <p>© 2026 BigMallCambodia.com · Powered by SAK DIGITAL Solution</p>
      </div>

    </div>
  );
}
