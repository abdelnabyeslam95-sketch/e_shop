import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. إنشاء الـ Context
const CartContext = createContext();

// 2. إنشاء الـ Provider
export const CartProvider = ({ children }) => {
  // تحميل السلة من الـ localStorage عند البداية لضمان عدم ضياع البيانات
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  // حفظ التغييرات في الـ localStorage تلقائياً
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- وظائف السلة البرمجية ---

  // إضافة منتج للسلة (أو زيادة الكمية لو موجود)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // حذف منتج أو تقليل الكمية
  const removeFromCart = (productId, forceRemoveComplete = false) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === productId);

      if (!itemInCart) return prevItems;

      if (forceRemoveComplete || itemInCart.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      }
      
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // مسح السلة بالكامل (بنستخدمها بعد إتمام عملية الشراء بنجاح)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // حساب إجمالي السعر (Helper Function)
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 3. توفير البيانات والوظائف لجميع مكونات التطبيق
  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 4. Custom Hook للاستخدام السريع في الصفحات
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};