import React, { useState } from 'react';
import { useCart } from '../Context/CartContext'; // نأكد المسار صح
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  // حالة تخزين بيانات العميل
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // الدالة اللي بتنفذ الشراء
  const handleConfirmOrder = (e) => {
    e.preventDefault(); // بيمنع الصفحة إنها تعمل Refresh

    if (cartItems.length === 0) {
      alert("سلتك فارغة!");
      return;
    }

    // 1. تجهيز بيانات الطلب
    const newOrder = {
      orderId: Math.floor(Math.random() * 1000000),
      customer: formData,
      items: cartItems,
      total: getCartTotal(),
      date: new Date().toLocaleString('ar-EG'),
      status: 'قيد الانتظار'
    };

    // 2. الحفظ في الـ LocalStorage (عشان الأدمن يشوفه)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // 3. تنظيف السلة وتوجيه المستخدم
    alert("✅ تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.");
    clearCart(); 
    navigate('/'); // رجوعه للرئيسية
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-right" dir="rtl">
      <h2 className="text-3xl font-black mb-8 text-blue-900">بيانات الشحن 🚚</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* الفورم */}
        <form onSubmit={handleConfirmOrder} className="space-y-4">
          <input 
            type="text" placeholder="الاسم بالكامل" required 
            className="w-full p-4 bg-gray-50 rounded-2xl border focus:border-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="tel" placeholder="رقم الموبايل" required 
            className="w-full p-4 bg-gray-50 rounded-2xl border focus:border-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <textarea 
            placeholder="العنوان بالتفصيل" required 
            className="w-full p-4 bg-gray-50 rounded-2xl border focus:border-blue-500 outline-none h-32"
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          ></textarea>
          
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-green-700 transition-all shadow-lg"
          >
            تأكيد شراء (كاش عند الاستلام)
          </button>
        </form>

        {/* ملخص الطلب */}
        <div className="bg-blue-50 p-8 rounded-[2.5rem] h-fit">
          <h3 className="font-black text-xl mb-4 text-blue-900">ملخص الطلب</h3>
          <div className="space-y-3 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between font-bold text-gray-700">
                <span>{item.title} (x{item.quantity})</span>
                <span>{item.price * item.quantity} ج.م</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-blue-200 pt-4 flex justify-between text-2xl font-black text-blue-900">
            <span>الإجمالي:</span>
            <span>{getCartTotal()} ج.م</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;