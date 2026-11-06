import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { translations } from './translations';
import { ProductProvider } from './context/ProductContext';
import { StoreProvider } from './context/StoreContext';
import { OrderProvider } from './context/OrderContext';
import LandingPage from './pages/LandingPage';
import Storefront from './pages/Storefront';
import VendorRegister from './pages/VendorRegister';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import StoreProfilePage from './pages/StoreProfilePage';
import LoadingScreen from './components/LoadingScreen';
import AccessGate from './components/AccessGate';

const ACCESS_STORAGE_KEY = 'bigmall_access_granted_v1';
const CORRECT_ACCESS_CODE = '089222085';

export default function App() {
  const [lang, setLang] = useState('kh'); // Default Khmer
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return localStorage.getItem(ACCESS_STORAGE_KEY) === CORRECT_ACCESS_CODE;
    } catch {
      return false;
    }
  });
  const [initialLoading, setInitialLoading] = useState(false);

  const t = translations[lang] || translations.kh;

  useEffect(() => {
    document.documentElement.lang = lang === 'kh' ? 'km-KH' : 'en';
    document.title = lang === 'kh'
      ? 'BigMallCambodia.com - ផ្សារអនឡាញកម្ពុជា | ទិញផលិតផលក្នុងស្រុក លក់ទៅកាន់អតិថិជនរាប់លាននាក់'
      : "BigMallCambodia.com - Cambodia's Marketplace | Shop Local, Sell to Millions";
  }, [lang]);

  const handleLockSite = () => {
    try {
      localStorage.removeItem(ACCESS_STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setIsUnlocked(false);
  };

  return (
    <ProductProvider>
      <StoreProvider>
        <OrderProvider>
          {!isUnlocked ? (
            <AccessGate
              onUnlock={() => {
                setIsUnlocked(true);
                setInitialLoading(true);
              }}
              lang={lang}
              setLang={setLang}
            />
          ) : (
            <>
              {initialLoading && (
                <LoadingScreen
                  onComplete={() => setInitialLoading(false)}
                  lang={lang}
                  minDuration={1400}
                />
              )}

              <BrowserRouter>
              <Routes>
                {/* Dedicated Loading / Splash Screen Preview */}
                <Route
                  path="/loading"
                  element={<LoadingScreen lang={lang} isStandalone={true} />}
                />
                <Route
                  path="/splash"
                  element={<LoadingScreen lang={lang} isStandalone={true} />}
                />
                <Route
                  path="/lock"
                  element={
                    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white text-center">
                      <div className="space-y-4">
                        <p className="text-sm">Locked BigMallCambodia session</p>
                        <button
                          onClick={handleLockSite}
                          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl"
                        >
                          Lock Site Now
                        </button>
                      </div>
                    </div>
                  }
                />
            {/* Main Marketplace Landing Page */}
            <Route
              path="/"
              element={<LandingPage t={t} lang={lang} setLang={setLang} />}
            />

            {/* Khmer localized Landing Page */}
            <Route
              path="/kh"
              element={<LandingPage t={translations.kh} lang="kh" setLang={setLang} />}
            />

            {/* Full Marketplace Store Catalog (20 items per category) */}
            <Route
              path="/shop"
              element={<Storefront lang={lang} setLang={setLang} />}
            />
            <Route
              path="/products"
              element={<Storefront lang={lang} setLang={setLang} />}
            />

            {/* Merchant Store Profile Page */}
            <Route
              path="/store"
              element={<StoreProfilePage lang={lang} setLang={setLang} />}
            />
            <Route
              path="/store/profile"
              element={<StoreProfilePage lang={lang} setLang={setLang} />}
            />
            <Route
              path="/store/:storeSlug"
              element={<StoreProfilePage lang={lang} setLang={setLang} />}
            />

            {/* Vendor Registration Portal (matching vendor.bigmallcambodia.com/register) */}
            <Route
              path="/register"
              element={<VendorRegister lang={lang} setLang={setLang} />}
            />

            {/* Vendor Login Portal (matching vendor.bigmallcambodia.com/login) */}
            <Route
              path="/login"
              element={<VendorLogin lang={lang} setLang={setLang} />}
            />

            {/* Vendor Workspace Dashboard */}
            <Route
              path="/dashboard"
              element={<VendorDashboard lang={lang} setLang={setLang} />}
            />

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </>
      )}
      </OrderProvider>
    </StoreProvider>
  </ProductProvider>
  );
}
