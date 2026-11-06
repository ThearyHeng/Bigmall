import React, { useState } from 'react';
import {
  X, Store, Save, CheckCircle2, Upload, MapPin, Phone, Send,
  CreditCard, ShieldCheck, Clock, Image as ImageIcon, Sparkles, Building
} from 'lucide-react';
import { cambodiaProvinces } from '../data/cambodiaLocations';

// Preset banner options for quick customization
const bannerPresets = [
  { label: 'Artisan Workshop', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Pepper Plantation', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Cambodia Silk Weaving', url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Coffee Highland', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Modern Phnom Penh', url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop&q=80' },
];

const logoPresets = [
  { label: 'Handcrafted Vase', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80' },
  { label: 'Organic Botanics', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80' },
  { label: 'Royal Gold Emblem', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80' },
  { label: 'Coffee Roaster', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop&q=80' },
];

export default function EditStoreProfileModal({ isOpen, onClose, storeProfile, onSave, lang }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    nameEn: storeProfile.nameEn || '',
    nameKh: storeProfile.nameKh || '',
    taglineEn: storeProfile.taglineEn || '',
    taglineKh: storeProfile.taglineKh || '',
    bioEn: storeProfile.bioEn || '',
    bioKh: storeProfile.bioKh || '',
    province: storeProfile.province || 'Phnom Penh',
    district: storeProfile.district || 'Chamkar Mon',
    commune: storeProfile.commune || 'Tonle Bassac',
    address: storeProfile.address || '',
    phone: storeProfile.phone || '',
    telegram: storeProfile.telegram || '',
    email: storeProfile.email || '',
    facebook: storeProfile.facebook || '',
    abaAccountName: storeProfile.abaAccountName || '',
    abaAccountNumber: storeProfile.abaAccountNumber || '',
    openingHours: storeProfile.openingHours || '8:00 AM - 8:00 PM',
    shippingPolicy: storeProfile.shippingPolicy || '',
    returnPolicy: storeProfile.returnPolicy || '',
    banner: storeProfile.banner || bannerPresets[0].url,
    logo: storeProfile.logo || logoPresets[0].url,
  });

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'contact' | 'branding' | 'policy'
  const [isSaved, setIsSaved] = useState(false);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, banner: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden border border-gray-100 flex flex-col relative">
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-[#f8fafc] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8b6914] text-white flex items-center justify-center shadow-sm">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {lang === 'kh' ? 'កែសម្រួលព័ត៌មានហាង' : 'Edit Merchant Store Profile'}
              </h2>
              <p className="text-xs text-gray-500">
                {lang === 'kh' ? 'ព័ត៌មាននេះនឹងបង្ហាញលើទំព័រហាងសាធារណៈរបស់អ្នក' : 'This information appears on your public marketplace profile'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-6 gap-2 sm:gap-6 overflow-x-auto no-scrollbar shrink-0 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 border-b-2 cursor-pointer transition-all ${
              activeTab === 'general' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {lang === 'kh' ? 'ព័ត៌មានទូទៅ' : 'Basic Info'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`py-3 border-b-2 cursor-pointer transition-all ${
              activeTab === 'branding' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {lang === 'kh' ? 'រូបភាព & ស្លាកសញ្ញា' : 'Logo & Banner'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`py-3 border-b-2 cursor-pointer transition-all ${
              activeTab === 'contact' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {lang === 'kh' ? 'ទំនាក់ទំនង & ABA KHQR' : 'Contact & ABA'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('policy')}
            className={`py-3 border-b-2 cursor-pointer transition-all ${
              activeTab === 'policy' ? 'border-[#8b6914] text-[#8b6914]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {lang === 'kh' ? 'គោលការណ៍ដឹកជញ្ជូន' : 'Shipping & Policy'}
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: General Info */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Store Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                    placeholder="e.g. Phnom Penh Artisan Store"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Store Name (Khmer)
                  </label>
                  <input
                    type="text"
                    value={formData.nameKh}
                    onChange={(e) => setFormData({ ...formData, nameKh: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                    placeholder="ឧ. ហាងសិប្បកម្មភ្នំពេញ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Store Tagline (Short Slogan)
                </label>
                <input
                  type="text"
                  value={formData.taglineEn}
                  onChange={(e) => setFormData({ ...formData, taglineEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                  placeholder="e.g. Authentic Cambodian Handicrafts & Organic Kampot Pepper"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Store Story & Bio (English)
                </label>
                <textarea
                  rows={3}
                  value={formData.bioEn}
                  onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                  placeholder="Share your artisan background, heritage, craftsmanship and team..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Province / City
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-[#8b6914]"
                  >
                    {cambodiaProvinces.map((p) => (
                      <option key={p.id} value={p.nameEn}>
                        {p.nameEn} ({p.nameKh})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    District / Khan
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                    placeholder="e.g. Chamkar Mon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Detailed Physical Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                  placeholder="#48 Street 308, Tonle Bassac, Phnom Penh"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Logo & Banner */}
          {activeTab === 'branding' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Cover Banner */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                  Store Cover Banner (Wide 1200x400px)
                </label>
                <div className="h-36 rounded-2xl overflow-hidden border border-gray-200 relative mb-3 bg-gray-100">
                  <img src={formData.banner} alt="banner preview" className="w-full h-full object-cover" />
                  <label className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 hover:bg-black/85 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer backdrop-blur-sm transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner</span>
                    <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                  </label>
                </div>

                <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Or choose a preset banner:</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {bannerPresets.map((b, i) => (
                    <div
                      key={i}
                      onClick={() => setFormData({ ...formData, banner: b.url })}
                      className={`cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${
                        formData.banner === b.url ? 'border-[#8b6914] shadow-md scale-95' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={b.url} alt={b.label} className="w-full h-12 object-cover" />
                      <span className="text-[9px] font-semibold text-gray-600 block p-1 truncate text-center bg-gray-50">
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Store Logo */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                  Store Avatar / Logo (Square 1:1)
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={formData.logo}
                    alt="logo"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#8b6914] shadow-md"
                  />
                  <div>
                    <label className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Custom Logo</span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                    <p className="text-[11px] text-gray-400 mt-1">Recommended: 400x400 JPG, PNG or WebP</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Or select a sample logo:</span>
                <div className="flex gap-2">
                  {logoPresets.map((l, i) => (
                    <div
                      key={i}
                      onClick={() => setFormData({ ...formData, logo: l.url })}
                      className={`cursor-pointer rounded-xl border-2 p-1 transition-all ${
                        formData.logo === l.url ? 'border-[#8b6914] bg-[#8b6914]/10' : 'border-gray-200'
                      }`}
                    >
                      <img src={l.url} alt={l.label} className="w-12 h-12 rounded-lg object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Contact & ABA */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Phone Number (Customer Support) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                    placeholder="+855 12 984 219"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Telegram Username / Link
                  </label>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                    placeholder="@phnompenhartisan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                    placeholder="contact@phnompenhartisan.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Facebook Page
                  </label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                    placeholder="facebook.com/phnompenhartisan"
                  />
                </div>
              </div>

              {/* ABA Bank Details */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-700" />
                  <span className="text-xs font-bold text-blue-900 uppercase">Direct ABA KHQR Settlement Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      ABA Account Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.abaAccountName}
                      onChange={(e) => setFormData({ ...formData, abaAccountName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold bg-white"
                      placeholder="PHNOM PENH ARTISAN CO LTD"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      ABA Account Number (USD/KHR) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.abaAccountNumber}
                      onChange={(e) => setFormData({ ...formData, abaAccountNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono font-bold bg-white"
                      placeholder="001 892 419"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Policy & Hours */}
          {activeTab === 'policy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Operating & Support Hours
                </label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                  placeholder="8:00 AM - 8:00 PM (Monday - Sunday)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Shipping & Delivery Promise
                </label>
                <textarea
                  rows={2}
                  value={formData.shippingPolicy}
                  onChange={(e) => setFormData({ ...formData, shippingPolicy: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                  placeholder="e.g. Same-day express delivery within Phnom Penh (1-3 hours). Nationwide delivery 24-48 hours."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Return & Warranty Guarantee
                </label>
                <textarea
                  rows={2}
                  value={formData.returnPolicy}
                  onChange={(e) => setFormData({ ...formData, returnPolicy: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#8b6914]"
                  placeholder="e.g. 7-day money-back guarantee for damaged or defective items with video proof."
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaved}
              className="px-6 py-2.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Store Profile</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
