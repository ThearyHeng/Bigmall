import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext(null);

const STORAGE_KEY = 'laylong24_store_profile_v1';

export const defaultStoreProfile = {
  id: 'merchant-h24-88392',
  slug: 'phnom-penh-artisan-store',
  nameEn: 'Phnom Penh Artisan Store',
  nameKh: 'ហាងសិប្បកម្មភ្នំពេញ',
  taglineEn: 'Authentic Cambodian Handicrafts, Organic Kampot Pepper & Silk Goods',
  taglineKh: 'សិប្បកម្មខ្មែរពិតៗ ម្រេចកំពតសរីរាង្គ និងផលិតផលសូត្រខ្មែរ',
  bioEn: 'We partner with 45+ local artisan families and rural farmers across Phnom Penh, Kampot, Battambang, and Siem Reap to bring top-tier authentic Cambodian products directly to buyers with verified quality and instant ABA KHQR payments.',
  bioKh: 'យើងសហការជាមួយគ្រួសារសិប្បករ និងកសិករជាង ៤៥ គ្រួសារនៅទូទាំងរាជធានីភ្នំពេញ កំពត បាត់ដំបង និងសៀមរាប ដើម្បីនាំយកផលិតផលខ្មែរពិតប្រាកដ ប្រកបដោយគុណភាពខ្ពស់ និងការទូទាត់រហ័សតាម ABA KHQR។',
  logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
  banner: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&auto=format&fit=crop&q=80',
  province: 'Phnom Penh',
  provinceKh: 'រាជធានីភ្នំពេញ',
  district: 'Chamkar Mon',
  commune: 'Tonle Bassac',
  address: '#48 Street 308, Tonle Bassac, Chamkar Mon, Phnom Penh',
  phone: '+855 12 984 219',
  telegram: '@phnompenhartisan',
  email: 'contact@phnompenhartisan.com',
  facebook: 'facebook.com/phnompenhartisan',
  abaAccountName: 'PHNOM PENH ARTISAN CO LTD',
  abaAccountNumber: '001 892 419 (USD / KHR)',
  rating: 4.9,
  reviewsCount: 482,
  followersCount: 1240,
  fulfillmentRate: '99.8%',
  responseTime: '< 15 mins',
  joinedDate: 'March 2024',
  verified: true,
  verifiedBadge: 'Official Verified Store',
  openingHours: '8:00 AM - 8:00 PM (Everyday)',
  shippingPolicy: 'Same-day express delivery within Phnom Penh (1-3 hours). Nationwide courier delivery within 24-48 hours.',
  returnPolicy: '7-day replacement or refund for defective or damaged goods with video unboxing proof.',
  businessType: 'Registered Local Enterprise',
  taxId: 'K009-902384918',
};

export function StoreProvider({ children }) {
  const [storeProfile, setStoreProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultStoreProfile, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load store profile', e);
    }
    return defaultStoreProfile;
  });

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storeProfile));
    } catch (e) {
      console.error('Failed to save store profile', e);
    }
  }, [storeProfile]);

  const updateStoreProfile = (updatedFields) => {
    setStoreProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
    setStoreProfile((prev) => ({
      ...prev,
      followersCount: isFollowing ? prev.followersCount - 1 : prev.followersCount + 1,
    }));
  };

  const resetStoreProfile = () => {
    setStoreProfile(defaultStoreProfile);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StoreContext.Provider
      value={{
        storeProfile,
        updateStoreProfile,
        resetStoreProfile,
        isFollowing,
        toggleFollow,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
