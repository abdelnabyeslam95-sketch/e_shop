import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // ضفنا useNavigate هنا
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate(); // تعريف الـ Navigate

  // حساب إجمالي السعر باستخدام الدالة الجاهزة من الـ Context
  const totalPrice = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">سلة التسوق فارغة حالياً 😅</h2>
        <p className="text-gray-500 mb-8">شكلك لسه منقيتش أحذية تليق بيك، ارجع للمتجر وشوف التشكيلة الجديدة.</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          العودة للمتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-right" dir="rtl">
      <h1 className="text-3xl font-black text-gray-800 mb-10 border-r-8 border-green-500 pr-4">سلة المشتريات</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* قائمة المنتجات */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain bg-gray-50 rounded-xl p-2" />
                <div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <p className="text-blue-600 font-bold">{item.price} ج.م</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* التحكم في الكمية */}
                <div className="flex items-center bg-gray-100 rounded-lg px-2">
                  <button onClick={() => addToCart(item)} className="p-2 text-blue-600 font-bold">+</button>
                  <span className="px-4 font-bold">{item.quantity}</span>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 font-bold">-</button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id, true)} 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
          
          <button onClick={clearCart} className="text-red-500 text-sm font-bold mt-4 hover:underline">
            مسح السلة بالكامل
          </button>
        </div>

        {/* ملخص الحساب */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl h-fit">
          <h3 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>إجمالي المنتجات:</span>
              <span>{totalPrice} ج.م</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>مصاريف الشحن:</span>
              <span className="text-green-600 font-bold">مجاناً</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-800 border-t pt-4">
              <span>الإجمالي العام:</span>
              <span>{totalPrice} ج.م</span>
            </div>
          </div>
          
          {/* تم ربط الزرار بصفحة الـ checkout */}
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            الإنتقال لإتمام الشراء ←
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;