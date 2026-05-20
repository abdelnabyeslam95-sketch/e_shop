import React, { useState } from 'react';
import ProductCard from './ProductsCard';

const ProductsGrid = () => {
  const [products] = useState([
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
  ]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10 text-right">
         <h2 className="text-3xl font-black text-gray-800 border-r-8 border-brand-green pr-4">أحدث الأحذية الرياضية</h2>
         <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">11 منتج</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
              id: product.id,
              name: product.title,
              price: product.price,
              image: product.image,
              category: product.category
            }} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsGrid;