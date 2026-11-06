import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Building2, Store, MapPin, Calendar, CheckCircle2, ArrowRight,
  ArrowLeft, Upload, ShieldCheck, Phone, Mail, Lock, Check, Send, Sparkles, Clock, AlertCircle
} from 'lucide-react';
import VendorHeader from '../components/vendor/VendorHeader';
import { cambodiaProvinces, productCategories } from '../data/cambodiaLocations';

export default function VendorRegister({ lang, setLang }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Account
    fullName: '',
    dateOfBirth: '',
    gender: 'male',
    phone: '',
    email: '',
    password: '',
    agreeTerms: true,

    // Step 2: OTP
    otpCode: ['', '', '', '', '', ''],

    // Step 3: Account Type
    accountType: 'individual', // 'individual' | 'business'

    // Step 4: Business Details (if business)
    companyName: '',
    businessType: 'Private Limited Company',
    taxNumber: '',
    companyPhone: '',
    companyEmail: '',

    // Step 5: Store Setup
    storeName: '',
    selectedCategories: [1, 2],
    storeDescription: '',
    storeLogo: null,
    storeLogoPreview: '',

    // Step 6: Location
    provinceId: 'phnom-penh',
    districtId: 'chamkar-mon',
    commune: 'Tonle Bassac',
    addressLine1: '',
    addressLine2: '',
    landmark: '',

    // Step 7: Onsite Visit
    visitDate: '2026-10-15',
    visitTimeSlot: '10:00 AM - 11:30 AM',
    visitLocationType: 'merchant_location', // 'merchant_location' | 'hang24_office'
  });

  const [otpTimer, setOtpTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  useEffect(() => {
    let interval;
    if (step === 2 && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const selectedProvince = cambodiaProvinces.find((p) => p.id === formData.provinceId) || cambodiaProvinces[0];
  const selectedDistrict = selectedProvince?.districts?.find((d) => d.id === formData.districtId) || selectedProvince?.districts?.[0];

  const handleCategoryToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.selectedCategories.includes(id);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter((c) => c !== id)
          : [...prev.selectedCategories, id],
      };
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        storeLogo: file,
        storeLogoPreview: url,
      }));
    }
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (step === 3 && formData.accountType === 'individual') {
      // Skip business details step if individual
      setStep(5);
    } else if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final submit
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setApplicationId(`LL24-${Math.floor(100000 + Math.random() * 900000)}`);
        setIsSuccess(true);
      }, 1200);
    }
  };

  const handleBack = () => {
    if (step === 5 && formData.accountType === 'individual') {
      setStep(3);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  // Step Name Labels
  const stepTitles = {
    en: [
      'Account Details',
      'Verification',
      'Account Type',
      'Business Info',
      'Store Setup',
      'Store Location',
      'Book Onsite Visit',
    ],
    kh: [
      'ព័ត៌មានគណនី',
      'ការផ្ទៀងផ្ទាត់',
      'ប្រភេទគណនី',
      'ព័ត៌មានអាជីវកម្ម',
      'រៀបចំហាង',
      'ទីតាំងហាង',
      'ណាត់ជួបផ្ទៀងផ្ទាត់',
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <VendorHeader lang={lang} setLang={setLang} />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          
          {isSuccess ? (
            /* Registration Success / Under Review Screen */
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl p-8 sm:p-12 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#8b6914] text-xs font-bold uppercase tracking-wider mb-3">
                {lang === 'kh' ? 'កំពុងត្រួតពិនិត្យ' : 'Under Review'}
              </span>

              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
                {lang === 'kh' ? 'ពាក្យសុំត្រូវបានដាក់ស្នើដោយជោគជ័យ!' : 'Application Submitted!'}
              </h1>

              <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
                {lang === 'kh'
                  ? 'ក្រុមការងារ BigMallCambodia.com នឹងពិនិត្យពាក្យសុំរបស់អ្នក ហើយទាក់ទងមកអ្នកក្នុងរយៈពេល 2-3 ថ្ងៃធ្វើការ ដើម្បីចុះទៅជួបផ្ទៀងផ្ទាត់ហាងរបស់អ្នកដោយផ្ទាល់។'
                  : 'Your merchant application has been submitted. A BigMallCambodia.com team member will review your details and contact you within 2-3 business days to coordinate your in-person verification.'}
              </p>

              {/* Reference Card */}
              <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 uppercase font-semibold">
                    {lang === 'kh' ? 'លេខយោងពាក្យសុំ' : 'Application Reference'}
                  </span>
                  <span className="text-sm font-mono font-bold text-[#1e3a5f] bg-white px-2.5 py-0.5 rounded border border-gray-200">
                    {applicationId}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">{lang === 'kh' ? 'ឈ្មោះហាង' : 'Store Name'}</span>
                  <span className="text-sm font-semibold text-gray-800">{formData.storeName || 'My Store'}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">{lang === 'kh' ? 'លេខទូរស័ព្ទ' : 'Phone'}</span>
                  <span className="text-sm font-semibold text-gray-800">{formData.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{lang === 'kh' ? 'កាលបរិច្ឆេទណាត់ជួប' : 'Visit Slot'}</span>
                  <span className="text-sm font-semibold text-[#8b6914]">{formData.visitDate} ({formData.visitTimeSlot})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="px-8 py-3.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span>{lang === 'kh' ? 'មើលផ្ទាំងគ្រប់គ្រងអ្នកលក់សាកល្បង' : 'Explore Vendor Dashboard'}</span>
                </Link>

                <a
                  href="https://t.me/hang24kh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-sky-600" />
                  <span>{lang === 'kh' ? 'ចូលរួម Telegram ផ្លូវការ' : 'Join Official Telegram'}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Multi-step Registration Card */
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden">
              
              {/* Card Header & Steps Bar */}
              <div className="bg-[#0f2744] text-white p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[#d4b878] text-xs font-bold uppercase tracking-widest">
                      {lang === 'kh' ? 'ការចុះឈ្មោះអ្នកលក់ BigMallCambodia.com' : 'BigMallCambodia.com Merchant Registration'}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold mt-1">
                      {stepTitles[lang][step - 1]}
                    </h1>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white/60 block">{lang === 'kh' ? 'ជំហាន' : 'Step'}</span>
                    <span className="text-xl font-bold text-[#d4b878]">{step} / {totalSteps}</span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        step === s
                          ? 'bg-[#d4b878]'
                          : step > s
                          ? 'bg-emerald-500'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-10">
                <form onSubmit={handleNext} className="space-y-6">
                  
                  {/* STEP 1: CREATE ACCOUNT */}
                  {step === 1 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {lang === 'kh' ? 'បង្កើតគណនីអ្នកលក់' : 'Create Account'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'kh' ? 'សូមបំពេញព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នកដើម្បីចាប់ផ្តើម' : 'Fill in your details to get started on BigMallCambodia.com'}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ឈ្មោះពេញ' : 'FULL NAME'} *
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder={lang === 'kh' ? 'ឧ. សុខា ចាន់' : 'e.g. Sokha Chan'}
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ថ្ងៃខែឆ្នាំកំណើត' : 'DATE OF BIRTH'} *
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ភេទ' : 'GENDER'} *
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {['male', 'female', 'other'].map((g) => (
                              <button
                                key={g}
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: g })}
                                className={`py-2.5 rounded-xl text-xs font-semibold uppercase border transition-all ${
                                  formData.gender === g
                                    ? 'bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-sm'
                                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {g === 'male' ? (lang === 'kh' ? 'ប្រុស' : 'Male') : g === 'female' ? (lang === 'kh' ? 'ស្រី' : 'Female') : (lang === 'kh' ? 'ផ្សេងៗ' : 'Other')}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'លេខទូរស័ព្ទ (ABA / KHQR)' : 'PHONE NUMBER'} *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="012 345 678"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'អ៊ីមែល' : 'EMAIL ADDRESS'} *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="merchant@example.com"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ពាក្យសម្ងាត់' : 'PASSWORD'} *
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                            <input
                              type="password"
                              required
                              minLength={6}
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              placeholder="••••••••"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                            required
                            className="mt-1 w-4 h-4 text-[#8b6914] rounded border-gray-300 focus:ring-[#8b6914]"
                          />
                          <span className="text-xs sm:text-sm text-gray-600">
                            {lang === 'kh'
                              ? 'ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌប្រើប្រាស់ និងគោលការណ៍ឯកជនភាពរបស់ BigMallCambodia.com'
                              : 'I agree to the BigMallCambodia.com Terms & Conditions and Privacy Policy'}
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: OTP VERIFICATION */}
                  {step === 2 && (
                    <div className="space-y-6 text-center max-w-md mx-auto py-4 animate-in fade-in duration-200">
                      <div className="w-16 h-16 rounded-full bg-amber-100 text-[#8b6914] flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-8 h-8" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {lang === 'kh' ? 'ផ្ទៀងផ្ទាត់លេខទូរស័ព្ទ' : 'Verify Phone Number'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'kh'
                            ? `យើងបានផ្ញើលេខកូដ OTP 6 ខ្ទង់ទៅកាន់ ${formData.phone || '012 345 678'}`
                            : `We sent a 6-digit verification code to ${formData.phone || '+855 12 345 678'}`}
                        </p>
                      </div>

                      {/* OTP Inputs */}
                      <div className="flex justify-center gap-2 sm:gap-3">
                        {[0, 1, 2, 3, 4, 5].map((idx) => (
                          <input
                            key={idx}
                            id={`otp-${idx}`}
                            type="text"
                            maxLength={1}
                            value={formData.otpCode[idx] || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              const next = [...formData.otpCode];
                              next[idx] = val;
                              setFormData({ ...formData, otpCode: next });
                              if (val && idx < 5) {
                                document.getElementById(`otp-${idx + 1}`)?.focus();
                              }
                            }}
                            className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 border-gray-300 focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/20 focus:outline-none bg-white"
                          />
                        ))}
                      </div>

                      <div className="text-xs text-gray-500">
                        {otpTimer > 0 ? (
                          <span className="flex items-center justify-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {lang === 'kh' ? `ផ្ញើកូដឡើងវិញក្នុងរយៈពេល ${otpTimer}s` : `Resend code in ${otpTimer}s`}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setOtpTimer(60)}
                            className="text-[#8b6914] font-bold hover:underline"
                          >
                            {lang === 'kh' ? 'ផ្ញើកូដឡើងវិញឥឡូវនេះ' : 'Resend Code Now'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: ACCOUNT TYPE */}
                  {step === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {lang === 'kh' ? 'ជ្រើសរើសប្រភេទអ្នកលក់' : 'Select Account Type'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'kh' ? 'ជ្រើសរើសប្រភេទគណនីដែលស័ក្តិសមជាមួយអាជីវកម្មរបស់អ្នក' : 'Choose how you intend to operate on BigMallCambodia.com marketplace'}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Individual */}
                        <div
                          onClick={() => setFormData({ ...formData, accountType: 'individual' })}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            formData.accountType === 'individual'
                              ? 'border-[#8b6914] bg-[#8b6914]/5 shadow-md ring-2 ring-[#8b6914]/20'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div>
                            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 text-[#8b6914] shadow-sm">
                              <User className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg mb-1">
                              {lang === 'kh' ? 'អ្នកលក់ផ្ទាល់ខ្លួន (Individual)' : 'Individual Seller'}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                              {lang === 'kh'
                                ? 'សម្រាប់ម្ចាស់ហាងតូចតាច អ្នកលក់តាមផ្ទះ ឬអ្នកលក់អនឡាញផ្ទាល់ខ្លួន។ មិនចាំបាច់មានឯកសារចុះបញ្ជីក្រុមហ៊ុនឡើយ។'
                                : 'Sell as an individual or local store owner. Fast verification with no complex company documents required.'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#8b6914]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{lang === 'kh' ? 'ផ្ទៀងផ្ទាត់រហ័ស ងាយស្រួល' : 'Quick & Instant Setup'}</span>
                          </div>
                        </div>

                        {/* Business */}
                        <div
                          onClick={() => setFormData({ ...formData, accountType: 'business' })}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            formData.accountType === 'business'
                              ? 'border-[#8b6914] bg-[#8b6914]/5 shadow-md ring-2 ring-[#8b6914]/20'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div>
                            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 text-[#1e3a5f] shadow-sm">
                              <Building2 className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg mb-1">
                              {lang === 'kh' ? 'ក្រុមហ៊ុន / អាជីវកម្មចុះបញ្ជី (Business)' : 'Registered Business'}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                              {lang === 'kh'
                                ? 'សម្រាប់ក្រុមហ៊ុនពាណិជ្ជកម្ម ម៉ាកយីហោផ្លូវការ ឬសហគ្រាសដែលមានចុះបញ្ជីពាណិជ្ជកម្មស្របច្បាប់។'
                                : 'Sell as a registered enterprise, commercial brand, or distributor with official invoice & multi-user support.'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#1e3a5f]">
                            <Building2 className="w-4 h-4" />
                            <span>{lang === 'kh' ? 'សម្រាប់ម៉ាកយីហោ និងក្រុមហ៊ុន' : 'Official Brand Badge'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: BUSINESS DETAILS (FOR BUSINESS TYPE) */}
                  {step === 4 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {lang === 'kh' ? 'ព័ត៌មានក្រុមហ៊ុនចុះបញ្ជី' : 'Business Details'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'kh' ? 'សូមបញ្ចូលព័ត៌មានផ្លូវការនៃក្រុមហ៊ុនរបស់អ្នក' : 'Please provide your registered company information'}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ឈ្មោះក្រុមហ៊ុនចុះបញ្ជី' : 'REGISTERED COMPANY NAME'} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="e.g. SAK DIGITAL Solution Co., Ltd"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ប្រភេទអាជីវកម្ម' : 'BUSINESS TYPE'} *
                          </label>
                          <select
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          >
                            <option value="Private Limited Company">Private Limited Company</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                            <option value="Partnership">Partnership</option>
                            <option value="NGO / Association">NGO / Association</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ (TIN / VATTIN)' : 'TAX REGISTRATION NO. (TIN)'}
                          </label>
                          <input
                            type="text"
                            value={formData.taxNumber}
                            onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                            placeholder="K001-902..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ទូរស័ព្ទក្រុមហ៊ុន' : 'COMPANY PHONE'} *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.companyPhone}
                            onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                            placeholder="+855 23 123 456"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: STORE SETUP */}
                  {step === 5 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {lang === 'kh' ? 'រៀបចំហាងរបស់អ្នក' : 'Set Up Your Store'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'kh' ? 'បង្កើតទម្រង់ហាងទាក់ទាញសម្រាប់អតិថិជនរាប់លាននាក់នៅកម្ពុជា' : 'Make a great first impression on your customers'}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Store Logo Upload */}
                        <div className="w-full sm:w-44 flex flex-col items-center">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 text-center">
                            {lang === 'kh' ? 'រូបសញ្ញាហាង (Logo)' : 'STORE LOGO'}
                          </label>
                          <label className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#8b6914] bg-[#f8fafc] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group">
                            {formData.storeLogoPreview ? (
                              <img src={formData.storeLogoPreview} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#8b6914] mb-1" />
                                <span className="text-xs text-gray-500 font-medium">Add Logo</span>
                              </>
                            )}
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                          </label>
                          <span className="text-[10px] text-gray-400 text-center mt-1.5">PNG, JPG up to 2MB</span>
                        </div>

                        {/* Store Info */}
                        <div className="flex-1 w-full space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                              {lang === 'kh' ? 'ឈ្មោះហាង' : 'STORE NAME'} *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.storeName}
                              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                              placeholder={lang === 'kh' ? 'ឧ. ហាងសម្លៀកបំពាក់ ភ្នំពេញ' : 'e.g. Phnom Penh Artisan Shop'}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                              {lang === 'kh' ? 'ការពណ៌នាពីហាង' : 'STORE DESCRIPTION'}
                            </label>
                            <textarea
                              rows={3}
                              value={formData.storeDescription}
                              onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
                              placeholder={lang === 'kh' ? 'អ្វីដែលធ្វើឱ្យហាងរបស់អ្នកពិសេស...' : 'What makes your store unique?'}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Categories Multi-select */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          {lang === 'kh' ? 'ប្រភេទផលិតផលដែលលក់ (ជ្រើសរើស)' : 'PRODUCT CATEGORIES (SELECT ALL THAT APPLY)'} *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                          {productCategories.map((cat) => {
                            const isSelected = formData.selectedCategories.includes(cat.id);
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryToggle(cat.id)}
                                className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                                  isSelected
                                    ? 'border-[#8b6914] bg-[#8b6914]/10 text-[#8b6914] font-bold shadow-xs'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <span>{cat.icon}</span>
                                <span className="truncate">{lang === 'kh' ? cat.nameKh : cat.nameEn}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: STORE LOCATION */}
                  {step === 6 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {lang === 'kh' ? 'ទីតាំងហាង និងកន្លែងទទួលទំនិញ' : 'Store Location & Pickup Address'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'kh' ? 'ប្រើសម្រាប់ការដឹកជញ្ជូន និងការគណនាថ្លៃសេវាដឹកក្នុងក្រុង' : 'Used for same-day delivery dispatch in Phnom Penh and province-wide logistics'}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ខេត្ត / ក្រុង' : 'PROVINCE / CITY'} *
                          </label>
                          <select
                            value={formData.provinceId}
                            onChange={(e) => {
                              const newProvId = e.target.value;
                              const prov = cambodiaProvinces.find((p) => p.id === newProvId);
                              setFormData({
                                ...formData,
                                provinceId: newProvId,
                                districtId: prov?.districts[0]?.id || '',
                                commune: prov?.districts[0]?.communes[0] || '',
                              });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          >
                            {cambodiaProvinces.map((p) => (
                              <option key={p.id} value={p.id}>
                                {lang === 'kh' ? p.nameKh : p.nameEn}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ស្រុក / ខណ្ឌ' : 'DISTRICT / KHAN'} *
                          </label>
                          <select
                            value={formData.districtId}
                            onChange={(e) => {
                              const newDistId = e.target.value;
                              const dist = selectedProvince?.districts?.find((d) => d.id === newDistId);
                              setFormData({
                                ...formData,
                                districtId: newDistId,
                                commune: dist?.communes[0] || '',
                              });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          >
                            {selectedProvince?.districts?.map((d) => (
                              <option key={d.id} value={d.id}>
                                {lang === 'kh' ? d.nameKh : d.nameEn}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ឃុំ / សង្កាត់' : 'COMMUNE / SANGKAT'} *
                          </label>
                          <select
                            value={formData.commune}
                            onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          >
                            {selectedDistrict?.communes?.map((c, i) => (
                              <option key={i} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'អាសយដ្ឋានបន្ទាត់ទី 1 (ផ្លូវ / លេខផ្ទះ)' : 'ADDRESS LINE 1 (STREET / HOUSE)'} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.addressLine1}
                            onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                            placeholder={lang === 'kh' ? 'ឧ. ផ្ទះលេខ 12 ផ្លូវ 302' : 'e.g. #12, Street 302'}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'អាសយដ្ឋានបន្ទាត់ទី 2 (ជាន់ / អាគារ)' : 'ADDRESS LINE 2 (OPTIONAL)'}
                          </label>
                          <input
                            type="text"
                            value={formData.addressLine2}
                            onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                            placeholder={lang === 'kh' ? 'ជាន់ទី 2 បន្ទប់ A' : 'Floor 2, Unit A'}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === 'kh' ? 'ចំណុចសំគាល់ / ការណែនាំសម្រាប់អ្នកដឹក' : 'LANDMARK / DRIVER INSTRUCTIONS'}
                        </label>
                        <input
                          type="text"
                          value={formData.landmark}
                          onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                          placeholder={lang === 'kh' ? 'ឧ. ទល់មុខហាងកាហ្វេ Brown ឬជិតស្តុប' : 'e.g. Near Brown Coffee, opposite blue gate'}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 7: BOOK ONSITE VISIT */}
                  {step === 7 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {lang === 'kh' ? 'ណាត់ជួបផ្ទៀងផ្ទាត់ដោយផ្ទាល់' : 'Book Onsite Visit & In-Person Verification'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'kh'
                            ? 'ក្រុមការងារ BigMallCambodia.com ផ្ទៀងផ្ទាត់អ្នកលក់គ្រប់រូបដោយផ្ទាល់ ដើម្បីធានាទំនុកចិត្តខ្ពស់បំផុត'
                            : 'Every BigMallCambodia.com merchant is verified in person. Select your preferred date and time.'}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'កាលបរិច្ឆេទណាត់ជួប' : 'SELECT DATE'} *
                          </label>
                          <input
                            type="date"
                            required
                            min="2026-10-10"
                            value={formData.visitDate}
                            onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'kh' ? 'ម៉ោងណាត់ជួប' : 'SELECT TIME SLOT'} *
                          </label>
                          <select
                            value={formData.visitTimeSlot}
                            onChange={(e) => setFormData({ ...formData, visitTimeSlot: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                          >
                            <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM (Morning)</option>
                            <option value="10:30 AM - 12:00 PM">10:30 AM - 12:00 PM (Morning)</option>
                            <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM (Afternoon)</option>
                            <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM (Evening)</option>
                          </select>
                        </div>
                      </div>

                      {/* Location mode */}
                      <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-5">
                        <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                          {lang === 'kh' ? 'ទីតាំងជួប' : 'MEETING LOCATION'}
                        </span>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 p-3 rounded-xl border bg-white cursor-pointer hover:border-amber-400">
                            <input
                              type="radio"
                              name="loc"
                              checked={formData.visitLocationType === 'merchant_location'}
                              onChange={() => setFormData({ ...formData, visitLocationType: 'merchant_location' })}
                              className="text-[#8b6914] focus:ring-[#8b6914]"
                            />
                            <div>
                              <span className="text-sm font-bold text-gray-800 block">
                                {lang === 'kh' ? 'នៅហាង / ទីតាំងអាជីវកម្មរបស់អ្នក' : 'At Your Store / Business Location'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formData.addressLine1 ? `${formData.addressLine1}, ${formData.commune}` : 'Phnom Penh, Cambodia'}
                              </span>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 p-3 rounded-xl border bg-white cursor-pointer hover:border-amber-400">
                            <input
                              type="radio"
                              name="loc"
                              checked={formData.visitLocationType === 'hang24_office'}
                              onChange={() => setFormData({ ...formData, visitLocationType: 'hang24_office' })}
                              className="text-[#8b6914] focus:ring-[#8b6914]"
                            />
                            <div>
                              <span className="text-sm font-bold text-gray-800 block">
                                {lang === 'kh' ? 'នៅការិយាល័យកណ្តាល BigMallCambodia.com ភ្នំពេញ' : 'At BigMallCambodia.com Headquarters (Phnom Penh)'}
                              </span>
                              <span className="text-xs text-gray-500">
                                SAK DIGITAL Solution Office, BKK1, Phnom Penh
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* FORM FOOTER CONTROLS */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{lang === 'kh' ? 'ត្រឡប់ក្រោយ' : 'Back'}</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#8b6914] hover:bg-[#a67e1a] active:scale-95 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{lang === 'kh' ? 'កំពុងដាក់ស្នើ...' : 'Submitting...'}</span>
                      ) : (
                        <>
                          <span>{step === totalSteps ? (lang === 'kh' ? 'ដាក់ពាក្យស្នើសុំ' : 'Submit Application') : (lang === 'kh' ? 'បន្តទៅមុខ' : 'Continue')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          )}

          {/* Bottom sign-in helper */}
          {!isSuccess && (
            <p className="text-center mt-6 text-sm text-gray-500">
              {lang === 'kh' ? 'មានគណនីរួចហើយ?' : 'Already registered as a seller?'}{' '}
              <Link to="/login" className="text-[#1e3a5f] font-bold hover:underline">
                {lang === 'kh' ? 'ចូលទីនេះ' : 'Sign In to Vendor Portal'}
              </Link>
            </p>
          )}

        </div>
      </main>
    </div>
  );
}
