import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // نفس المصفوفة عشان نجيب بيانات المنتج اللي ضغطنا عليه
  const products = [
    { id: 1, title: "نايك إير جوردان 1", price: 4500, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 2, title: "أديداس ألترا بوست", price: 3800, image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 3, title: "نايك إير ماكس 270", price: 4200, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 4, title: "أديداس كلاسيك الأبيض", price: 2900, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 5, title: "نايك زووم الرياضي", price: 3500, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 6, title: "بوما ستريت كاجوال", price: 2400, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 7, title: "ريبوك هيريتيج", price: 3100, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 8, title: "نايك وافل ديبورتيفو", price: 2800, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format", category: "أحذية رجالي" },           
    { id: 9, title: "فانس أولد سكول", price: 2200, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 10, title: "نيو بالانس 574", price: 3900, image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=500&auto=format", category: "أحذية رجالي" },
    { id: 11, title: "كونفرس تشاك تايلور", price: 1800, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=500&auto=format", category: "أحذية رجالي" }
  

  ];

  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="text-center py-20">المنتج غير موجود</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button onClick={() => navigate(-1)} className="mb-8 text-blue-600 font-bold">← العودة للمتجر</button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* قسم الصورة */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <img src={product.image} alt={product.title} className="w-full h-auto object-contain mix-blend-multiply" />
        </div>

        {/* قسم المعلومات */}
        <div className="text-right">
          <span className="text-green-600 font-bold">{product.category}</span>
          <h1 className="text-4xl font-black text-gray-800 mt-2 mb-4">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.desc || "هذا الحذاء مصمم خصيصاً ليناسب نمط حياتك العصري، يجمع بين الأناقة والراحة في آن واحد."}
          </p>
          
          <div className="flex items-center justify-between bg-blue-50 p-6 rounded-2xl mb-8">
            <span className="text-3xl font-black text-blue-600">{product.price} جنيه</span>
            <div className="flex gap-2">
                {/* هنا ممكن تضيف اختيار المقاس */}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            أضف إلى عربة التسوق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;