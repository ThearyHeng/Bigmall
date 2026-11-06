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

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'kh'
  const [initialLoading, setInitialLoading] = useState(true);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    document.documentElement.lang = lang === 'kh' ? 'km-KH' : 'en';
    document.title = lang === 'kh'
      ? 'BigMallCambodia.com - ផ្សារអនឡាញកម្ពុជា | ទិញផលិតផលក្នុងស្រុក លក់ទៅកាន់អតិថិជនរាប់លាននាក់'
      : "BigMallCambodia.com - Cambodia's Marketplace | Shop Local, Sell to Millions";
  }, [lang]);

  return (
    <ProductProvider>
      <StoreProvider>
        <OrderProvider>
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
      </OrderProvider>
    </StoreProvider>
  </ProductProvider>
  );
}
