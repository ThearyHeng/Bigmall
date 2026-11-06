import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Phone, Store, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import VendorHeader from '../components/vendor/VendorHeader';

export default function VendorLogin({ lang, setLang }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  const handleDemoLogin = () => {
    setIdentifier('merchant@bigmallcambodia.com');
    setPassword('DemoPass123!');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <VendorHeader lang={lang} setLang={setLang} />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl max-w-md w-full p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Logo / Icon */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
              <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 inline-block">
                <img
                  src="/bigmall-logo.png"
                  alt="BigMallCambodia.com"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {lang === 'kh' ? 'សូមស្វាគមន៍មកកាន់ BigMallCambodia.com' : 'Welcome back'}
            </h1>
            <p className="text-sm text-gray-500">
              {lang === 'kh' ? 'ចូលទៅកាន់ផ្ទាំងគ្រប់គ្រងអ្នកលក់របស់អ្នក' : 'Sign in to your seller workspace'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {lang === 'kh' ? 'លេខទូរស័ព្ទ ឬ អ៊ីមែល' : 'PHONE OR EMAIL'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="012 345 678 or merchant@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {lang === 'kh' ? 'ពាក្យសម្ងាត់' : 'PASSWORD'}
                </label>
                <a href="#forgot" className="text-xs text-[#8b6914] hover:underline font-semibold">
                  {lang === 'kh' ? 'ភ្លេចពាក្យសម្ងាត់?' : 'Forgot password?'}
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-[#8b6914] hover:bg-[#a67e1a] active:scale-95 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>{lang === 'kh' ? 'កំពុងចូល...' : 'Signing in...'}</span>
              ) : (
                <>
                  <span>{lang === 'kh' ? 'ចូលគណនី' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#8b6914]" />
              <span>{lang === 'kh' ? 'ចូលគណនីសាកល្បង (Demo Workspace)' : 'One-Click Demo Seller Workspace'}</span>
            </button>
          </div>

          {/* Bottom Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            {lang === 'kh' ? 'មិនទាន់មានគណនី?' : "Don't have an account?"}{' '}
            <Link to="/register" className="text-[#1e3a5f] font-bold hover:underline">
              {lang === 'kh' ? 'ចុះឈ្មោះអ្នកលក់ថ្មី' : 'Register now'}
            </Link>
          </p>

        </div>
      </main>
    </div>
  );
}
