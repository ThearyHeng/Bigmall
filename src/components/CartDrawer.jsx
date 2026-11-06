import React, { useState } from 'react';
import {
  X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft,
  CheckCircle2, QrCode, CreditCard, MapPin, Phone, User, Truck,
  ExternalLink, Sparkles, AlertCircle, Check
} from 'lucide-react';
import GoogleMapPicker from './GoogleMapPicker';
import { useOrders } from '../context/OrderContext';

export default function CartDrawer({ isOpen, onClose, cart, setCart, lang }) {
  if (!isOpen) return null;

  const { addOrder } = useOrders();

  // 'cart' | 'location' | 'khqr' | 'success'
  const [checkoutStep, setCheckoutStep] = useState('cart');

  // Customer Delivery Info State
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Sokha Chan',
    phone: '012 889 201',
    paymentMethod: 'khqr', // 'khqr' | 'cod'
    location: {
      province: 'Phnom Penh',
      district: 'Chamkar Mon',
      commune: 'Tonle Bassac',
      addressDetails: '#42B, Street 308, near Bassac Lane',
      lat: 11.5492,
      lng: 104.9315,
      landmark: 'Near Bassac Lane / Aeon Mall 1',
      notes: 'Brown gate, please call when arrived'
    }
  });

  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  // Cart financial calculations
  const subtotalUsd = cart.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);
  const isFreeDelivery = subtotalUsd >= 25 || cart.length === 0;
  const deliveryFeeUsd = isFreeDelivery ? 0 : 1.50;
  const totalUsd = subtotalUsd + deliveryFeeUsd;
  const totalKhr = Math.round(totalUsd * 4000);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Proceed to location step
  const handleProceedToLocation = () => {
    if (cart.length === 0) return;
    setCheckoutStep('location');
  };

  // Validate and submit order with chosen payment method
  const handleProceedPayment = (method) => {
    if (!customerInfo.name.trim()) {
      alert(lang === 'kh' ? 'សូមបញ្ចូលឈ្មោះអតិថិជន' : 'Please enter customer name');
      return;
    }
    if (!customerInfo.phone.trim()) {
      setPhoneError(lang === 'kh' ? 'សូមបញ្ចូលលេខទូរស័ព្ទ' : 'Please enter phone number');
      return;
    }

    setCustomerInfo((prev) => ({ ...prev, paymentMethod: method }));

    if (method === 'khqr') {
      setCheckoutStep('khqr');
    } else {
      // Cash on delivery directly places order
      finalizeOrder(method);
    }
  };

  // Finalize order helper
  const finalizeOrder = (method) => {
    const itemsSummary = cart.map((i) => `${i.quantity}x ${i.titleEn}`).join(', ');
    const newOrder = addOrder({
      buyer: customerInfo.name,
      phone: customerInfo.phone.startsWith('+855') ? customerInfo.phone : `+855 ${customerInfo.phone.replace(/^0/, '')}`,
      itemsSummary: itemsSummary,
      itemsCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      itemsList: cart,
      totalUsd: totalUsd,
      totalKhr: totalKhr,
      paymentMethod: method,
      customerLocation: customerInfo.location
    });

    setLastPlacedOrder(newOrder);
    setCheckoutStep('success');
    setCart([]);
  };

  const handleCloseAndReset = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className={`w-screen ${checkoutStep === 'location' ? 'max-w-xl' : 'max-w-md'} bg-white shadow-2xl flex flex-col justify-between transition-all duration-300 font-sans`}>
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#f8fafc] sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              {checkoutStep !== 'cart' && checkoutStep !== 'success' && (
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer mr-0.5"
                  title="Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}

              <div className="w-8 h-8 rounded-lg bg-[#8b6914] text-white flex items-center justify-center shadow-xs">
                {checkoutStep === 'location' ? <MapPin className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight">
                  {checkoutStep === 'cart' && (lang === 'kh' ? 'កន្ត្រកទំនិញ' : 'Shopping Cart')}
                  {checkoutStep === 'location' && (lang === 'kh' ? 'ទីតាំងលើ Google Map & ព័ត៌មាន' : 'Customer Location & Checkout')}
                  {checkoutStep === 'khqr' && (lang === 'kh' ? 'ទូទាត់តាម ABA KHQR' : 'Direct ABA KHQR Payment')}
                  {checkoutStep === 'success' && (lang === 'kh' ? 'បញ្ជាទិញជោគជ័យ' : 'Order Placed!')}
                </h3>
                <span className="text-[11px] text-gray-400 block">
                  {checkoutStep === 'location' && (lang === 'kh' ? 'ជំហានទី ២៖ ដៅទីតាំងទទួលទំនិញ' : 'Step 2: Pin Delivery Location on Map')}
                  {checkoutStep === 'cart' && `${cart.reduce((sum, i) => sum + i.quantity, 0)} ${lang === 'kh' ? 'មុខទំនិញ' : 'items in cart'}`}
                  {checkoutStep === 'khqr' && (lang === 'kh' ? 'ស្កេនទូទាត់ជាមួយកម្មវិធីធនាគារ' : 'Scan with ABA or any Banking App')}
                  {checkoutStep === 'success' && (lang === 'kh' ? 'អ្នកដឹកជញ្ជូននឹងធ្វើដំណើរទៅទីតាំងរបស់អ្នក' : 'Rider dispatched to your Google Map pin')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="w-8 h-8 rounded-full hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6">
            
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === 'cart' && (
              <div>
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30 text-gray-400" />
                    <p className="font-semibold text-gray-700 mb-1">
                      {lang === 'kh' ? 'កន្ត្រកទំនិញរបស់អ្នកទទេ' : 'Your cart is empty'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {lang === 'kh' ? 'សូមជ្រើសរើសផលិតផលដែលអ្នកពេញចិត្ត' : 'Browse products and add them to your cart.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-xs items-center justify-between hover:border-gray-200 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.titleEn}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100 border border-gray-200"
                        />

                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {lang === 'kh' ? item.titleKh : item.titleEn}
                          </h4>
                          <span className="text-[11px] text-gray-400 block mb-1">
                            {item.merchant}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-extrabold text-[#1e3a5f]">
                              ${(item.priceUsd * item.quantity).toFixed(2)}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              ({(item.priceKhr * item.quantity).toLocaleString()} ៛)
                            </span>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg p-1 shrink-0 bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-gray-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-800 px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-gray-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: CUSTOMER LOCATION ON GOOGLE MAP & CHECKOUT INFO */}
            {checkoutStep === 'location' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* Customer Contact Details */}
                <div className="p-4 bg-[#f8fafc] border border-gray-200/80 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
                    <User className="w-4 h-4 text-[#8b6914]" />
                    <span>{lang === 'kh' ? 'ព័ត៌មានអ្នកទទួលទំនិញ' : 'Customer Contact Details'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        {lang === 'kh' ? 'ឈ្មោះអ្នកទទួល' : 'Customer Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        placeholder="e.g. Sokha Chan"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        {lang === 'kh' ? 'លេខទូរស័ព្ទ (សម្រាប់អ្នកដឹក)' : 'Phone Number (For Rider)'} *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={customerInfo.phone}
                          onChange={(e) => {
                            setCustomerInfo({ ...customerInfo, phone: e.target.value });
                            setPhoneError('');
                          }}
                          placeholder="012 889 201"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#8b6914] focus:outline-none"
                        />
                      </div>
                      {phoneError && <span className="text-[10px] text-red-600 mt-0.5 block">{phoneError}</span>}
                    </div>
                  </div>
                </div>

                {/* Google Map Delivery Location Component */}
                <GoogleMapPicker
                  location={customerInfo.location}
                  onChange={(newLoc) => setCustomerInfo({ ...customerInfo, location: newLoc })}
                  lang={lang}
                />

                {/* Delivery Options & Dispatch Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-[#d4b878]/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#8b6914] text-white flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#8b6914]">Phnom Penh Express (Same-Day)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                        {isFreeDelivery ? 'FREE SHIPPING' : '$1.50'}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-0.5">
                      {lang === 'kh'
                        ? 'អ្នកដឹកជញ្ជូន (Grab / Local Rider) នឹងប្រើប្រាស់ទីតាំង Google Map ដែលអ្នកបានដៅខាងលើដើម្បីដឹកជញ្ជូនរហ័សដល់មាត់ទ្វារ។'
                        : 'Delivery rider will navigate directly to your pinned Google Map coordinates for seamless door-to-door arrival.'}
                    </p>
                  </div>
                </div>

                {/* Payment Selection Banner */}
                <div className="space-y-2 pt-1">
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {lang === 'kh' ? 'ជ្រើសរើសវិធីសាស្ត្រទូទាត់' : 'Select Payment Method to Complete:'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleProceedPayment('khqr')}
                      className="p-3.5 rounded-2xl border-2 border-red-500 bg-red-50/50 hover:bg-red-50 text-left transition-all active:scale-98 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 bg-red-600 text-white font-black text-[9px] rounded">KHQR</span>
                          <span className="font-bold text-xs text-gray-900">ABA / Bakong KHQR</span>
                        </div>
                        <span className="text-[10px] text-gray-500 block mt-0.5">Instant Direct Mobile Pay</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-red-600" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleProceedPayment('cod')}
                      className="p-3.5 rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-left transition-all active:scale-98 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">Cash on Delivery (COD)</span>
                        <span className="text-[10px] text-gray-500 block mt-0.5">Pay in Cash to Driver</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 3: ABA KHQR MODAL WITH CUSTOMER LOCATION PREVIEW */}
            {checkoutStep === 'khqr' && (
              <div className="text-center py-2 animate-in zoom-in-95 duration-200">
                <div className="px-3 py-1 bg-red-600 text-white rounded-lg font-black text-xs inline-block tracking-wider uppercase mb-2">
                  KHQR DIRECT SETTLEMENT
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-0.5">
                  Scan to Pay with Any Bank App
                </h4>
                <p className="text-xs text-gray-500 mb-4">ABA Bank, ACLEDA, Bakong, Wing, Canadia</p>

                {/* QR Code Graphic with Bakong Brand */}
                <div className="w-56 h-56 mx-auto bg-white border-2 border-red-500 rounded-2xl p-4 shadow-xl flex flex-col items-center justify-center mb-4 relative">
                  <div className="w-full h-full bg-gray-900 p-2 rounded-xl flex items-center justify-center text-white relative">
                    <QrCode className="w-36 h-36 text-white" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-red-600 font-extrabold text-[10px]">KHQR</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order & Location Summary Card */}
                <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-3.5 max-w-sm mx-auto mb-5 text-left text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold text-sm">
                    <span className="text-gray-600">Total Payable (USD):</span>
                    <span className="text-lg text-[#1e3a5f]">${totalUsd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-[#8b6914]">
                    <span>Total Riel (KHR):</span>
                    <span>{totalKhr.toLocaleString()} ៛</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-600">
                    <div className="flex items-center gap-1 font-semibold text-gray-900 mb-0.5">
                      <MapPin className="w-3 h-3 text-red-600" />
                      <span>Delivery Target (Google Map):</span>
                    </div>
                    <p className="text-gray-500 truncate">{customerInfo.location.addressDetails}, {customerInfo.location.district}</p>
                    <span className="font-mono text-[10px] text-gray-400">
                      Coordinates: {customerInfo.location.lat.toFixed(6)}, {customerInfo.location.lng.toFixed(6)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 justify-center max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('location')}
                    className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => finalizeOrder('khqr')}
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Paid</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER SUCCESS WITH GOOGLE MAP PIN LINK & SUMMARY */}
            {checkoutStep === 'success' && (
              <div className="text-center py-6 animate-in zoom-in-95 duration-200 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {lang === 'kh' ? 'ការបញ្ជាទិញទទួលបានជោគជ័យ!' : 'Order Confirmed!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {lang === 'kh'
                      ? 'អរគុណសម្រាប់ការទិញទំនិញលើ BigMallCambodia.com។ ព័ត៌មានទីតាំង Google Map ត្រូវបានបញ្ជូនទៅអ្នកលក់ និងអ្នកដឹកជញ្ជូនរួចរាល់។'
                      : 'Thank you for shopping local on BigMallCambodia.com! Your Google Map pin has been dispatched to the merchant and driver.'}
                  </p>
                </div>

                {/* Confirmed Order Card */}
                {lastPlacedOrder && (
                  <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-4 text-left text-xs space-y-3 max-w-sm mx-auto shadow-xs">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="font-mono font-bold text-sm text-[#1e3a5f]">{lastPlacedOrder.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {lastPlacedOrder.payment}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Customer & Contact:</span>
                      <strong className="text-gray-900">{lastPlacedOrder.buyer}</strong> · <span>{lastPlacedOrder.phone}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Delivery Address:</span>
                      <p className="text-gray-800 font-medium">{lastPlacedOrder.customerLocation.addressDetails}, {lastPlacedOrder.customerLocation.district}, {lastPlacedOrder.customerLocation.province}</p>
                    </div>

                    {/* Google Map Link Card */}
                    <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-red-900 text-[11px] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-600" />
                          <span>Google Map GPS Pin:</span>
                        </span>
                        <span className="font-mono text-[10px] text-red-700">
                          {lastPlacedOrder.customerLocation.lat.toFixed(5)}, {lastPlacedOrder.customerLocation.lng.toFixed(5)}
                        </span>
                      </div>

                      <a
                        href={lastPlacedOrder.customerLocation.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Delivery Pin on Google Maps</span>
                      </a>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-gray-500 font-bold">Total Paid:</span>
                      <span className="text-base font-black text-[#1e3a5f]">{lastPlacedOrder.total}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCloseAndReset}
                    className="px-6 py-2.5 bg-[#8b6914] hover:bg-[#a67e1a] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Subtotal & Checkout Button (Only for Cart Step) */}
          {cart.length > 0 && checkoutStep === 'cart' && (
            <div className="p-5 border-t border-gray-100 bg-[#f8fafc] space-y-3 sticky bottom-0 z-20">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">${subtotalUsd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#8b6914]" />
                    <span>Phnom Penh Delivery:</span>
                  </span>
                  <span className={isFreeDelivery ? 'text-emerald-600 font-bold' : 'text-gray-900 font-bold'}>
                    {isFreeDelivery ? 'FREE (Orders > $25)' : `$${deliveryFeeUsd.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500 font-semibold block uppercase">Total Amount:</span>
                  <span className="text-xl font-black text-[#1e3a5f]">${totalUsd.toFixed(2)}</span>
                </div>
                <span className="text-xs font-bold text-[#8b6914]">
                  {totalKhr.toLocaleString()} ៛ (KHQR)
                </span>
              </div>

              <button
                onClick={handleProceedToLocation}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>{lang === 'kh' ? 'ជ្រើសរើសទីតាំងលើ Map & បញ្ជាទិញ' : 'Set Google Map Pin & Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
