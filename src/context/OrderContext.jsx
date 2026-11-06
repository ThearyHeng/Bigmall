import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext(null);

const STORAGE_KEY = 'laylong24_orders_v1';

export const defaultOrders = [
  {
    id: 'ORD-LL24-9024',
    buyer: 'Chea Vichea',
    phone: '+855 12 889 201',
    items: '2x Organic Black Kampot Pepper',
    itemsCount: 2,
    totalUsd: 13.00,
    totalKhr: 52000,
    total: '$13.00',
    status: 'Delivering',
    payment: 'ABA KHQR (Paid)',
    paymentMethod: 'khqr',
    time: '12 mins ago',
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    customerLocation: {
      province: 'Phnom Penh',
      district: 'Chamkar Mon',
      commune: 'Tonle Bassac',
      addressDetails: '#42B, Street 308, near Bassac Lane',
      lat: 11.5492,
      lng: 104.9315,
      landmark: 'Near Bassac Lane / Aeon Mall 1',
      notes: 'Call before arriving, brown gate with plant pots',
      googleMapsUrl: 'https://www.google.com/maps?q=11.5492,104.9315'
    }
  },
  {
    id: 'ORD-LL24-9023',
    buyer: 'Sophea Kim',
    phone: '+855 98 442 190',
    items: '1x Phka Rumduol Jasmine Rice 5kg',
    itemsCount: 1,
    totalUsd: 8.50,
    totalKhr: 34000,
    total: '$8.50',
    status: 'Processing',
    payment: 'Bakong KHQR (Paid)',
    paymentMethod: 'khqr',
    time: '35 mins ago',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    customerLocation: {
      province: 'Phnom Penh',
      district: 'Boeng Keng Kang',
      commune: 'Boeng Keng Kang 1',
      addressDetails: 'Condo 240, 8th Floor, Room 804, St. 240',
      lat: 11.5541,
      lng: 104.9284,
      landmark: 'BKK1 / Brown Coffee Roastery',
      notes: 'Leave at lobby security if not answering',
      googleMapsUrl: 'https://www.google.com/maps?q=11.5541,104.9284'
    }
  },
  {
    id: 'ORD-LL24-9022',
    buyer: 'Alex Mercer',
    phone: '+855 77 651 882',
    items: '1x Wireless ANC Earbuds Pro',
    itemsCount: 1,
    totalUsd: 39.00,
    totalKhr: 156000,
    total: '$39.00',
    status: 'Completed',
    payment: 'Credit Card (Paid)',
    paymentMethod: 'card',
    time: '1 hour ago',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    customerLocation: {
      province: 'Phnom Penh',
      district: 'Doun Penh',
      commune: 'Phsar Thmei 1',
      addressDetails: '#18, Street 130, Riverside Area',
      lat: 11.5714,
      lng: 104.9298,
      landmark: 'Central Market / Riverside',
      notes: 'Please bring change for USD if any',
      googleMapsUrl: 'https://www.google.com/maps?q=11.5714,104.9298'
    }
  },
  {
    id: 'ORD-LL24-9021',
    buyer: 'Dara Sam',
    phone: '+855 10 392 018',
    items: '1x Handcrafted Silk Krama',
    itemsCount: 1,
    totalUsd: 18.00,
    totalKhr: 72000,
    total: '$18.00',
    status: 'Completed',
    payment: 'ABA KHQR (Paid)',
    paymentMethod: 'khqr',
    time: '3 hours ago',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    customerLocation: {
      province: 'Phnom Penh',
      district: 'Tuol Kouk',
      commune: 'Boeng Kak 1',
      addressDetails: '#112, Street 315, near TK Avenue',
      lat: 11.5833,
      lng: 104.8988,
      landmark: 'TK Avenue Tuol Kouk',
      notes: 'Deliver before 5 PM',
      googleMapsUrl: 'https://www.google.com/maps?q=11.5833,104.8988'
    }
  },
  {
    id: 'ORD-LL24-9020',
    buyer: 'Chanthy Meas',
    phone: '+855 85 918 203',
    items: '2x Mondulkiri Coffee 250g',
    itemsCount: 2,
    totalUsd: 15.00,
    totalKhr: 60000,
    total: '$15.00',
    status: 'Completed',
    payment: 'ABA KHQR (Paid)',
    paymentMethod: 'khqr',
    time: '5 hours ago',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    customerLocation: {
      province: 'Phnom Penh',
      district: 'Chamkar Mon',
      commune: 'Tuol Tumpung 1',
      addressDetails: '#55, Street 450, Russian Market',
      lat: 11.5408,
      lng: 104.9147,
      landmark: 'Russian Market (Toul Tom Poung)',
      notes: 'Hand directly to customer',
      googleMapsUrl: 'https://www.google.com/maps?q=11.5408,104.9147'
    }
  }
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
    return defaultOrders;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const addOrder = (orderData) => {
    const newId = `ORD-LL24-${Math.floor(1000 + Math.random() * 9000)}`;
    const lat = orderData.customerLocation?.lat || 11.5564;
    const lng = orderData.customerLocation?.lng || 104.9282;

    const newOrder = {
      id: newId,
      buyer: orderData.buyer || 'Guest Customer',
      phone: orderData.phone || '+855 12 345 678',
      items: orderData.itemsSummary || 'Marketplace Item(s)',
      itemsCount: orderData.itemsCount || 1,
      itemsList: orderData.itemsList || [],
      totalUsd: orderData.totalUsd || 0,
      totalKhr: orderData.totalKhr || 0,
      total: `$${(orderData.totalUsd || 0).toFixed(2)}`,
      status: 'Processing',
      payment: orderData.paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : 'ABA KHQR (Paid)',
      paymentMethod: orderData.paymentMethod || 'khqr',
      time: 'Just now',
      createdAt: new Date().toISOString(),
      customerLocation: {
        province: orderData.customerLocation?.province || 'Phnom Penh',
        district: orderData.customerLocation?.district || 'Chamkar Mon',
        commune: orderData.customerLocation?.commune || 'Tonle Bassac',
        addressDetails: orderData.customerLocation?.addressDetails || 'Phnom Penh, Cambodia',
        lat: lat,
        lng: lng,
        landmark: orderData.customerLocation?.landmark || '',
        notes: orderData.customerLocation?.notes || '',
        googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
      }
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const resetOrders = () => {
    setOrders(defaultOrders);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        resetOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
