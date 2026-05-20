import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem('registeredUser'));
      if (savedUser && savedUser.email === email && savedUser.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(savedUser));
        savedUser.role === 'admin' ? navigate('/admin-dashboard') : navigate('/user-dashboard');
      } else {
        alert("خطأ في البيانات! تأكد من البريد وكلمة المرور");
      }
    } else {
      const newUser = { email, password, role };
      localStorage.setItem('registeredUser', JSON.stringify(newUser));
      alert("تم إنشاء حسابك في متجر الأحذية بنجاح!");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" dir="rtl">
      <div className="bg-white p-10 rounded-[2rem] shadow-2xl w-full max-w-md border-t-8 border-blue-600">
        <h2 className="text-3xl font-black text-gray-800 mb-2 text-center">
          {isLogin ? 'مرحباً بعودتك 👟' : 'انضم لعملائنا 👟'}
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm">أفضل الأحذية الطبية والرياضية في مكان واحد</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="email" placeholder="البريد الإلكتروني" required className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="كلمة المرور" required className="w-full p-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setPassword(e.target.value)} />

          {!isLogin && (
            <div className="bg-blue-50 p-4 rounded-2xl">
              <label className="block mb-2 font-bold text-blue-800 text-xs">نوع الحساب</label>
              <select className="w-full bg-transparent outline-none font-bold text-gray-700" onChange={(e) => setRole(e.target.value)}>
                <option value="user">مشتري (أبحث عن أحذية)</option>
                <option value="admin">مدير المتجر (إضافة مخزون)</option>
              </select>
            </div>
          )}

          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02]">
            {isLogin ? 'دخول للمتجر' : 'تأكيد التسجيل'}
          </button>
        </form>
        
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-blue-600 font-bold text-sm">
          {isLogin ? 'ليس لديك حساب؟ اشترك الآن' : 'لديك حساب؟ سجل دخولك'}
        </button>
      </div>
    </div>
  );
};

export default Auth;