import React, { useState } from 'react';
import {
  X, Upload, Image as ImageIcon, Sparkles, Check, DollarSign,
  Package, Tag, MapPin, Store, Truck, Eye, AlertCircle, CheckCircle2
} from 'lucide-react';
import { sampleCategories } from '../data/sampleProducts';
import { cambodiaProvinces } from '../data/cambodiaLocations';

// Curated high-res image presets for quick testing
const imagePresets = [
  { label: 'Kampot Pepper', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80' },
  { label: 'Mondulkiri Coffee', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80' },
  { label: 'Khmer Silk Krama', url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80' },
  { label: 'Jasmine Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80' },
  { label: 'Wild Forest Honey', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80' },
  { label: 'Wireless Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80' },
  { label: 'Coconut Shell Bowls', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80' },
  { label: 'Natural Skincare', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
];

export default function AddProductModal({ isOpen, onClose, onAddProduct, lang }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    titleEn: '',
    titleKh: '',
    categoryId: 'specialties',
    priceUsd: '',
    discount: 0,
    stock: 25,
    merchant: 'Phnom Penh Artisan Store',
    originProvince: 'Phnom Penh',
    image: imagePresets[0].url,
    descriptionEn: '',
    descriptionKh: '',
    fastDelivery: true,
  });

  const [imageTab, setImageTab] = useState('preset'); // 'preset' | 'upload' | 'url'
  const [customUrl, setCustomUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);

  const priceNum = parseFloat(formData.priceUsd) || 0;
  const khrPrice = Math.round(priceNum * 4000);
  const discountNum = parseFloat(formData.discount) || 0;
  const originalPriceUsd = discountNum > 0 ? +(priceNum / (1 - discountNum / 100)).toFixed(2) : null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (customUrl.trim()) {
      setFormData((prev) => ({ ...prev, image: customUrl.trim() }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titleEn || !formData.priceUsd) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const added = onAddProduct(formData);
      setCreatedProduct(added);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleCloseAndReset = () => {
    setIsSuccess(false);
    setCreatedProduct(null);
    onClose();
  };

  const selectedCategoryObj = sampleCategories.find((c) => c.id === formData.categoryId) || sampleCategories[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-gray-100 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#f8fafc] sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8b6914] text-white flex items-center justify-center shadow-sm">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {lang === 'kh' ? 'បន្ថែមផលិតផលថ្មីទៅកាន់ BigMallCambodia.com' : 'Add New Product to BigMallCambodia.com'}
              </h2>
              <p className="text-xs text-gray-500">
                {lang === 'kh' ? 'ផលិតផលនឹងបង្ហាញភ្លាមៗនៅលើទំព័រផ្សារទំនិញ' : 'Instant publish to storefront & merchant inventory'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="w-9 h-9 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            /* Success Feedback */
            <div className="text-center py-8 animate-in zoom-in-95 duration-200 max-w-md mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {lang === 'kh' ? 'ផលិតផលត្រូវបានបោះពុម្ពផ្សាយជោគជ័យ!' : 'Product Published Successfully!'}
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {lang === 'kh'
                  ? `"${formData.titleEn}" ត្រូវបានបន្ថែមទៅក្នុងកាតាឡុកទំនិញ BigMallCambodia.com ហើយអតិថិជនអាចបញ្ជាទិញបានភ្លាមៗ។`
                  : `"${formData.titleEn}" is now live on the marketplace. Buyers can view, purchase, and pay directly via ABA KHQR.`}
              </p>

              {/* Product Preview Card */}
              <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-4 mb-6 text-left flex gap-4 items-center">
                <img
                  src={formData.image}
                  alt={formData.titleEn}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200 bg-white shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-[#8b6914] uppercase block truncate">
                    {selectedCategoryObj.nameEn}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 truncate">
                    {formData.titleEn}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-black text-[#1e3a5f]">${priceNum.toFixed(2)}</span>
                    <span className="text-xs text-gray-500 font-semibold">{khrPrice.toLocaleString()} ៛</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      titleEn: '',
                      titleKh: '',
                      categoryId: 'specialties',
                      priceUsd: '',
                      discount: 0,
                      stock: 25,
                      merchant: 'Phnom Penh Artisan Store',
                      originProvince: 'Phnom Penh',
                      image: imagePresets[0].url,
                      descriptionEn: '',
                      descriptionKh: '',
                      fastDelivery: true,
                    });
                  }}
                  className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-xs sm:text-sm cursor-pointer"
                >
                  + Add Another Product
                </button>
                <button
                  onClick={handleCloseAndReset}
                  className="px-6 py-2.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Product Input Form with Live Preview */
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form Inputs (Left 7 Cols) */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Title EN & KH */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {lang === 'kh' ? 'ឈ្មោះផលិតផល (ភាសាអង់គ្លេស)' : 'PRODUCT TITLE (ENGLISH)'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="e.g. Organic Kampot Red Pepper 150g"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {lang === 'kh' ? 'ឈ្មោះផលិតផល (ភាសាខ្មែរ)' : 'PRODUCT TITLE (KHMER)'}
                    </label>
                    <input
                      type="text"
                      value={formData.titleKh}
                      onChange={(e) => setFormData({ ...formData, titleKh: e.target.value })}
                      placeholder="ឧ. ម្រេចក្រហមកំពតសរីរាង្គ ១៥០ក្រាម"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                    />
                  </div>

                  {/* Category & Origin Province */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        {lang === 'kh' ? 'ប្រភេទផលិតផល' : 'CATEGORY'} *
                      </label>
                      <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                      >
                        {sampleCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.icon} {c.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        {lang === 'kh' ? 'ខេត្តប្រភពផលិតផល' : 'ORIGIN PROVINCE'}
                      </label>
                      <select
                        value={formData.originProvince}
                        onChange={(e) => setFormData({ ...formData, originProvince: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b6914] focus:border-transparent text-sm bg-white"
                      >
                        {cambodiaProvinces.map((p) => (
                          <option key={p.id} value={p.nameEn}>
                            {p.nameEn} ({p.nameKh})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pricing & Stock Grid */}
                  <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-4.5 space-y-4">
                    <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Pricing & Inventory Details
                    </span>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                          Price in USD ($) *
                        </label>
                        <div className="relative">
                          <DollarSign className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
                          <input
                            type="number"
                            step="0.01"
                            min="0.1"
                            required
                            value={formData.priceUsd}
                            onChange={(e) => setFormData({ ...formData, priceUsd: e.target.value })}
                            placeholder="8.50"
                            className="w-full pl-7 pr-2.5 py-2 rounded-xl border border-gray-300 text-sm font-bold text-[#1e3a5f] bg-white focus:ring-2 focus:ring-[#8b6914]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="90"
                          value={formData.discount}
                          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold bg-white focus:ring-2 focus:ring-[#8b6914]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                          Stock Units *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          placeholder="25"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold bg-white focus:ring-2 focus:ring-[#8b6914]"
                        />
                      </div>
                    </div>

                    {/* Automatic KHR Calculation Display */}
                    <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-gray-200">
                      <span className="text-gray-500 font-medium">Automatic KHR Rate (1 USD = 4,000 ៛):</span>
                      <span className="font-extrabold text-[#8b6914] text-sm">
                        {khrPrice.toLocaleString()} ៛
                      </span>
                    </div>
                  </div>

                  {/* Image Chooser */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Product Image *
                    </label>

                    {/* Image Source Tabs */}
                    <div className="flex gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setImageTab('preset')}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          imageTab === 'preset'
                            ? 'bg-[#1e3a5f] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Preset Photos
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageTab('upload')}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          imageTab === 'upload'
                            ? 'bg-[#1e3a5f] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageTab('url')}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          imageTab === 'url'
                            ? 'bg-[#1e3a5f] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Image URL
                      </button>
                    </div>

                    {/* Presets Grid */}
                    {imageTab === 'preset' && (
                      <div className="grid grid-cols-4 gap-2">
                        {imagePresets.map((preset, i) => (
                          <div
                            key={i}
                            onClick={() => setFormData({ ...formData, image: preset.url })}
                            className={`p-1.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-1 ${
                              formData.image === preset.url
                                ? 'border-[#8b6914] bg-[#8b6914]/10 shadow-xs'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-12 rounded-lg object-cover" />
                            <span className="text-[10px] font-semibold text-gray-700 truncate w-full text-center">
                              {preset.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload File */}
                    {imageTab === 'upload' && (
                      <label className="border-2 border-dashed border-gray-300 hover:border-[#8b6914] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-gray-50 transition-colors">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs font-bold text-gray-700">Click to upload from device</span>
                        <span className="text-[10px] text-gray-400">PNG, JPG, WebP up to 5MB</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    )}

                    {/* Custom URL */}
                    {imageTab === 'url' && (
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#8b6914]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyUrl}
                          className="px-4 py-2 bg-[#1e3a5f] text-white rounded-xl text-xs font-bold"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.descriptionEn}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      placeholder="Provide details on features, flavor, size, material, or usage..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#8b6914]"
                    />
                  </div>

                  {/* Fast Delivery Checkbox */}
                  <div>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fastDelivery}
                        onChange={(e) => setFormData({ ...formData, fastDelivery: e.target.checked })}
                        className="w-4 h-4 text-[#8b6914] rounded border-gray-300 focus:ring-[#8b6914]"
                      />
                      <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Enable Phnom Penh Same-Day Express Delivery</span>
                      </span>
                    </label>
                  </div>

                </div>

                {/* Live Marketplace Preview Card (Right 5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-8 pt-6 lg:pt-0">
                  <div>
                    <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <Eye className="w-4 h-4 text-[#8b6914]" />
                      <span>Live Marketplace Preview</span>
                    </div>

                    {/* Preview Card */}
                    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-md overflow-hidden max-w-xs mx-auto">
                      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={formData.image}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        {discountNum > 0 && (
                          <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                            -{discountNum}%
                          </div>
                        )}
                        <div className="absolute top-2.5 right-2.5 bg-[#0f2744]/80 text-[#d4b878] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          ✓ Verified
                        </div>
                      </div>

                      <div className="p-4">
                        <span className="text-[10px] font-bold text-[#8b6914] block mb-1">
                          {selectedCategoryObj.icon} {selectedCategoryObj.nameEn}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-2">
                          {formData.titleEn || 'Product Name (English)'}
                        </h4>

                        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-3">
                          <span>★ 5.0</span>
                          <span className="text-gray-400 font-normal">(1 review)</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-emerald-600 text-[10px] font-semibold">1-Day PP</span>
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-extrabold text-[#1e3a5f]">
                                ${priceNum > 0 ? priceNum.toFixed(2) : '0.00'}
                              </span>
                              {originalPriceUsd && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  ${originalPriceUsd.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 block">
                              {khrPrice.toLocaleString()} ៛
                            </span>
                          </div>

                          <div className="w-8 h-8 rounded-lg bg-[#8b6914] text-white flex items-center justify-center text-xs font-bold">
                            +
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-400 text-center mt-3">
                      This product will be instantly indexed into the live store catalog.
                    </p>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleCloseAndReset}
                      className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.titleEn || !formData.priceUsd}
                      className="flex-1 py-3 bg-[#8b6914] hover:bg-[#a67e1a] active:scale-95 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Publishing...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Publish to Marketplace</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
