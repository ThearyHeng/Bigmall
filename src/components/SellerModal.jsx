import React, { useState } from 'react';
import { X, CheckCircle, Store, User, Building, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SellerModal({ isOpen, onClose, t, lang }) {
  if (!isOpen) return null;

  const sell = t.sell || {};
  const [step, setStep] = useState(1);
  const [sellerType, setSellerType] = useState('individual'); // 'individual' | 'company'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    storeName: '',
    mainCategory: '',
    province: 'Phnom Penh',
    address: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8b6914] text-white flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {sell.title || 'Start Selling on BigMallCambodia.com'}
              </h3>
              <p className="text-xs text-gray-500">
                {sell.subtitle || 'Cambodia Merchant Registration'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {sell.success?.title || 'Application Submitted!'}
              </h4>
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                {sell.success?.message || 'We will review your registration and contact you within'}{' '}
                <span className="font-bold text-[#8b6914]">
                  {sell.success?.days || '2 business days'}
                </span>{' '}
                {sell.success?.daysSuffix || 'to schedule your in-person merchant verification.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-3 bg-[#1e3a5f] hover:bg-[#142a45] text-white font-semibold rounded-lg transition-colors"
                >
                  {sell.success?.backBtn || 'Back to BigMallCambodia.com'}
                </button>
                <a
                  href="https://vendor.hang24.shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Open Official Vendor Portal
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNext}>
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8 px-2">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step === s
                          ? 'bg-[#8b6914] text-white ring-4 ring-[#8b6914]/20'
                          : step > s
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step > s ? '✓' : s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`w-12 sm:w-16 h-1 mx-1 rounded-full ${
                          step > s ? 'bg-emerald-600' : 'bg-gray-100'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Account Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 text-base mb-3">
                    {sell.step1?.title || 'Account Details'}
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      {sell.step1?.fullName || 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={sell.step1?.fullNamePlaceholder || 'e.g. Sokha Chan'}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      {sell.step1?.phone || 'Phone Number'} (ABA KHQR) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+855 12 345 678"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      {sell.step1?.email || 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="merchant@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Seller Type */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 text-base mb-3">
                    {sell.step2?.title || 'Choose Seller Type'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSellerType('individual')}
                      className={`p-5 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                        sellerType === 'individual'
                          ? 'border-[#8b6914] bg-[#8b6914]/5 ring-2 ring-[#8b6914]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <User className={`w-6 h-6 ${sellerType === 'individual' ? 'text-[#8b6914]' : 'text-gray-400'}`} />
                      <span className="font-bold text-gray-900 text-sm">
                        {sell.step2?.individual || 'Individual Merchant'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {sell.step2?.individualDesc || 'For local shop owners, creators, and independent sellers.'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSellerType('company')}
                      className={`p-5 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                        sellerType === 'company'
                          ? 'border-[#8b6914] bg-[#8b6914]/5 ring-2 ring-[#8b6914]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Building className={`w-6 h-6 ${sellerType === 'company' ? 'text-[#8b6914]' : 'text-gray-400'}`} />
                      <span className="font-bold text-gray-900 text-sm">
                        {sell.step2?.company || 'Registered Business'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {sell.step2?.companyDesc || 'For registered companies and commercial brands.'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Store Information */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 text-base mb-3">
                    {sell.step4?.title || 'Store Profile'}
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      {sell.step4?.storeName || 'Store Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      placeholder={sell.step4?.storeNamePlaceholder || 'Your brand or shop name'}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      {sell.step4?.mainCategory || 'Main Category'} *
                    </label>
                    <select
                      required
                      value={formData.mainCategory}
                      onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                    >
                      <option value="">{sell.step4?.mainCategoryPlaceholder || 'Select Main Category'}</option>
                      <option value="electronics">Electronics / Tech</option>
                      <option value="specialties">Cambodian Specialties</option>
                      <option value="household">Household Essentials</option>
                      <option value="kids">Baby / Kids</option>
                      <option value="fashion">Fashion & Beauty</option>
                      <option value="grocery">Grocery & Farm</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Location */}
              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 text-base mb-3">
                    {sell.step5?.pickupAddress || 'Pickup Location (Phnom Penh / Provinces)'}
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      {sell.step5?.province || 'Province / City'} *
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                    >
                      <option value="Phnom Penh">Phnom Penh (ភ្នំពេញ)</option>
                      <option value="Siem Reap">Siem Reap (សៀមរាប)</option>
                      <option value="Battambang">Battambang (បាត់ដំបង)</option>
                      <option value="Kandal">Kandal (កណ្តាល)</option>
                      <option value="Preah Sihanouk">Preah Sihanouk (ព្រះសីហនុ)</option>
                      <option value="Kampot">Kampot (កំពត)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      {sell.step5?.addr1 || 'Address (Street / House / Sangkat)'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={sell.step5?.addr1Placeholder || 'e.g. St. 51, BKK1, Phnom Penh'}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-sm transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all text-sm cursor-pointer"
                >
                  <span>{step === 4 ? 'Submit Application' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
