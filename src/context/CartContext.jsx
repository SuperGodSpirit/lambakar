import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('lambakar_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('lambakar_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('lambakar_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('lambakar_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('lambakar_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (item) => {
    setCartItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    if (upperCode === 'AMAN50') {
      setAppliedCoupon({ code: 'AMAN50', finalPrice: 249, saved: 250, label: '50% OFF!' });
      return { success: true };
    } else if (upperCode === 'SHWETA100') {
      setAppliedCoupon({ code: 'SHWETA100', finalPrice: 0, saved: 499, label: '100% OFF!' });
      return { success: true };
    }
    return { success: false, error: 'Invalid coupon code.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};
