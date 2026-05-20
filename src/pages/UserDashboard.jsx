import React from 'react';
import { useCart } from '../Context/CartContext'; // ربط السلة
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { cartItems, removeFromCart } = useCart();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="p-8 max-w-7xl mx-auto text-right" dir="rtl">
      <h1 className="text-3xl font-black mb-8 text-blue-900">حسابي الشخصي 👟</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* قسم السلة الحالية */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            🛒 سلة مشترياتك الحالية ({cartItems.length})
          </h3>
          
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-xl bg-white" />
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-blue-600 font-black">{item.price} ج.م</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold text-sm">حذف</button>
                </div>
              ))}
              <Link to="/cart" className="block text-center bg-blue-600 text-white py-3 rounded-2xl font-bold mt-4">إتمام الشراء</Link>
            </div>
          ) : (
            <p className="text-gray-400 py-10 text-center">سلتك فاضية.. مفيش نية لشراء حذاء جديد؟ 😉</p>
          )}
        </div>

        {/* قسم الوصول السريع */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-[2.5rem] text-white shadow-lg">
            <h3 className="text-xl font-bold mb-2">اكتشف جديدنا</h3>
            <p className="text-sm opacity-90 mb-4">وصلت تشكيلة الأحذية الطبية الجديدة 2026</p>
            <Link to="/" className="bg-white text-green-600 px-6 py-2 rounded-xl font-black text-sm inline-block">تسوق الآن</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;