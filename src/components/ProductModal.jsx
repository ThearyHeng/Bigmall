import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X, Star, ShieldCheck, Truck, ShoppingBag, QrCode, Heart, Share2,
  CheckCircle2, Store, CreditCard, ChevronRight, AlertCircle, ExternalLink
} from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose, lang, onAddToCart }) {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [showKhqrModal, setShowKhqrModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const title = lang === 'kh' ? product.titleKh : product.titleEn;
  const categoryName = lang === 'kh' ? product.categoryNameKh : product.categoryNameEn;
  const totalPriceUsd = (product.priceUsd * quantity).toFixed(2);
  const totalPriceKhr = (product.priceKhr * quantity).toLocaleString();

  const handleSimulatePayment = () => {
    setShowKhqrModal(true);
  };

  const handleConfirmKhqr = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setShowKhqrModal(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-gray-100 flex flex-col overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {showKhqrModal ? (
          /* Direct ABA KHQR Checkout Simulator */
          <div className="p-8 text-center animate-in zoom-in-95 duration-200">
            {paymentSuccess ? (
              <div className="py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === 'kh' ? 'ការទូទាត់ទទួលបានជោគជ័យ!' : 'Payment Successful!'}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {lang === 'kh'
                    ? 'ប្រាក់ត្រូវបានផ្ញើផ្ទាល់ទៅកាន់គណនី ABA របស់អ្នកលក់។ ការដឹកជញ្ជូននឹងមកដល់ក្នុងថ្ងៃនេះ។'
                    : 'Funds sent directly to the verified merchant ABA account. Phnom Penh same-day dispatch initiated.'}
                </p>
                <span className="font-mono text-xs font-bold text-[#1e3a5f] bg-gray-100 px-3 py-1 rounded">
                  TXN: #ABA-{Math.floor(10000000 + Math.random() * 90000000)}
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-red-600 text-white rounded-lg font-black text-xs tracking-wider uppercase">
                    KHQR
                  </div>
                  <span className="font-bold text-gray-800 text-sm">ABA Bank & Bakong Direct Pay</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Merchant: <span className="font-semibold text-[#8b6914]">{product.merchant}</span>
                </p>

                {/* Simulated QR Code */}
                <div className="w-56 h-56 mx-auto bg-white border-2 border-red-500 rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center mb-4 relative">
                  <div className="w-full h-full bg-gray-900 p-2 rounded-xl flex items-center justify-center text-white relative">
                    <QrCode className="w-36 h-36 text-white" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-red-600 font-extrabold text-[10px]">KHQR</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-3.5 max-w-sm mx-auto mb-6">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-500">Total USD:</span>
                    <span className="text-lg font-bold text-[#1e3a5f]">${totalPriceUsd}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-[#8b6914] mt-1">
                    <span>Total Riel (KHR):</span>
                    <span>{totalPriceKhr} ៛</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowKhqrModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmKhqr}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Scan & Pay</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Normal Product Details View */
          <div>
            {/* Top Media Hero */}
            <div className="relative h-64 sm:h-72 w-full bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#0f2744]/85 backdrop-blur-md text-[#d4b878] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Cambodian Merchant</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-bold text-[#8b6914] bg-[#8b6914]/10 px-2.5 py-0.5 rounded-md">
                    {categoryName}
                  </span>
                  <Link
                    to="/store/profile"
                    onClick={onClose}
                    className="flex items-center gap-1 text-gray-600 hover:text-[#8b6914] hover:underline font-semibold transition-colors"
                    title="View Store Profile"
                  >
                    <Store className="w-3.5 h-3.5 text-[#8b6914]" />
                    <span>{product.merchant}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                  </Link>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  {title}
                </h2>

                {/* Ratings & Delivery */}
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400 font-normal">({product.reviews} reviews)</span>
                  </div>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Phnom Penh Express (Same-Day)</span>
                  </span>
                  <span>•</span>
                  <span className="text-gray-500">In Stock: {product.stock} units</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-semibold block uppercase mb-0.5">
                    {lang === 'kh' ? 'តម្លៃទំនិញ' : 'Direct Merchant Price'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">
                      ${product.priceUsd.toFixed(2)}
                    </span>
                    {product.originalPriceUsd && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPriceUsd.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#8b6914]">
                    {product.priceKhr.toLocaleString()} ៛ (KHQR Direct Settlement)
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 hover:bg-gray-100 font-bold text-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-gray-900 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 hover:bg-gray-100 font-bold text-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-900 text-sm">
                  {lang === 'kh' ? 'ព័ត៌មានលម្អិតពីផលិតផល' : 'Product Highlights'}
                </h4>
                <p>
                  100% authentic product verified in person by BigMallCambodia.com team in Cambodia.
                  Direct payment to merchant with ABA Bank / KHQR. Zero middleman markup.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 pt-1">
                  <div>✓ Origin: Cambodia Local Certified</div>
                  <div>✓ Return Policy: 7 Days Guarantee</div>
                  <div>✓ Province Delivery: 2-4 Days</div>
                  <div>✓ Payment: ABA, Bakong, KHQR, Visa</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleSimulatePayment}
                  className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{lang === 'kh' ? `ទូទាត់រហ័ស KHQR ($${totalPriceUsd})` : `Direct KHQR Pay ($${totalPriceUsd})`}</span>
                </button>

                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 py-3.5 bg-[#8b6914] hover:bg-[#a67e1a] active:scale-95 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'kh' ? 'ដាក់ចូលកន្ត្រក' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
