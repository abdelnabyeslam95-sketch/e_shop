import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
        
        {/* معلومات المتجر */}
        <div>
          <h3 className="text-2xl font-black mb-6 text-blue-400">
            E-STORE<span className="text-green-400">.</span>
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            نحن نقدم أفضل تشكيلة من الأحذية العصرية والطبية التي تجمع بين الراحة والأناقة في آن واحد. جودتنا هي سر تميزنا.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/" className="hover:text-green-400 transition-colors">الرئيسية</Link></li>
            <li><Link to="/products" className="hover:text-green-400 transition-colors">كل المنتجات</Link></li>
            <li><Link to="/about" className="hover:text-green-400 transition-colors">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-green-400 transition-colors">اتصل بنا</Link></li>
          </ul>
        </div>

        {/* الاشتراك في النشرة البريدية */}
        <div>
          <h4 className="text-lg font-bold mb-6">اشترك معنا</h4>
          <p className="text-gray-400 mb-4 text-sm">كن أول من يعرف عن العروض والخصومات الجديدة.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني" 
              className="bg-gray-800 text-white px-4 py-3 rounded-r-xl focus:outline-none w-full border-none"
            />
            <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-l-xl font-bold transition-all">
              إرسال
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لمتجرك الاحترافي.</p>
        <div className="flex gap-6">
          <span>فيسبوك</span>
          <span>تويتر</span>
          <span>إنستجرام</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;