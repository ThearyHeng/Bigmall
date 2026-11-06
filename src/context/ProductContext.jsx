import React, { createContext, useContext, useState, useEffect } from 'react';
import { allSampleProducts, sampleCategories } from '../data/sampleProducts';

const ProductContext = createContext(null);

const STORAGE_KEY = 'laylong24_products_v1';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return allSampleProducts;
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Add new product
  const addProduct = (productData) => {
    const categoryObj = sampleCategories.find((c) => c.id === productData.categoryId) || sampleCategories[0];
    const priceUsdNum = parseFloat(productData.priceUsd) || 0;
    const discountNum = parseFloat(productData.discount) || 0;
    const stockNum = parseInt(productData.stock, 10) || 1;

    const newProduct = {
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      categoryId: productData.categoryId || categoryObj.id,
      categoryNameEn: categoryObj.nameEn,
      categoryNameKh: categoryObj.nameKh,
      titleEn: productData.titleEn.trim(),
      titleKh: (productData.titleKh || productData.titleEn).trim(),
      priceUsd: priceUsdNum,
      priceKhr: Math.round(priceUsdNum * 4000),
      discount: discountNum,
      originalPriceUsd: discountNum > 0 ? +(priceUsdNum / (1 - discountNum / 100)).toFixed(2) : null,
      originalPriceKhr: discountNum > 0 ? Math.round((priceUsdNum / (1 - discountNum / 100)) * 4000) : null,
      rating: 5.0,
      reviews: 1,
      merchant: productData.merchant || 'Phnom Penh Artisan Store',
      originProvince: productData.originProvince || 'Phnom Penh',
      descriptionEn: productData.descriptionEn || 'Authentic Cambodian quality product verified on BigMallCambodia.com.',
      descriptionKh: productData.descriptionKh || 'ផលិតផលកម្ពុជាពិតៗ ផ្ទៀងផ្ទាត់គុណភាពនៅលើ BigMallCambodia.com។',
      image: productData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      stock: stockNum,
      inStock: stockNum > 0,
      verifiedMerchant: true,
      fastDelivery: Boolean(productData.fastDelivery !== false),
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Update existing product
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const priceUsdNum = updatedFields.priceUsd !== undefined ? parseFloat(updatedFields.priceUsd) : p.priceUsd;
          const discountNum = updatedFields.discount !== undefined ? parseFloat(updatedFields.discount) : p.discount;
          const stockNum = updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : p.stock;

          return {
            ...p,
            ...updatedFields,
            priceUsd: priceUsdNum,
            priceKhr: Math.round(priceUsdNum * 4000),
            discount: discountNum,
            originalPriceUsd: discountNum > 0 ? +(priceUsdNum / (1 - discountNum / 100)).toFixed(2) : null,
            originalPriceKhr: discountNum > 0 ? Math.round((priceUsdNum / (1 - discountNum / 100)) * 4000) : null,
            stock: stockNum,
            inStock: stockNum > 0,
          };
        }
        return p;
      })
    );
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Reset to default
  const resetToDefaults = () => {
    setProducts(allSampleProducts);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
        categories: sampleCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
