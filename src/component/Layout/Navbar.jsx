import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // جلب بيانات المستخدم المسجل حالياً
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* اليسار: السلة والحساب */}
        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* زرار الحساب / تسجيل الدخول */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link 
                to={currentUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-100 transition-all"
              >
                لوحة التحكم
              </Link>
              <button 
                onClick={handleLogout}
                className="text-red-500 font-bold text-xs hover:underline"
              >
                خروج
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>

        {/* المنتصف: الروابط */}
        <div className="hidden md:flex gap-8 font-bold text-gray-700 text-right" dir="rtl">
          <Link to="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
          <Link to="/products" className="hover:text-blue-600 transition-colors">المنتجات</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">عن المتجر</Link>
        </div>

        {/* اليمين: اللوجو */}
        <Link to="/" className="text-2xl font-black text-blue-900 uppercase tracking-tighter">
          E-STORE<span className="text-green-500">.</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;