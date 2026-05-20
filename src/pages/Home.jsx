import React from 'react';
import Layout from '../component/Layout/Layout'; 
import Hero from '../component/Layout/Hero';
import ProductsGrid from '../component/products/ProductsGrid';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-16 text-center">
          <h2 className="text-4xl font-black text-brand-black mb-4">أحدث المنتجات</h2>
          <p className="text-brand-gray italic">اكتشف تشكيلتنا الجديدة المختارة بعناية   </p>
        </div>
        {/* نأكد إن ProductsGrid معمول لها export default صح في ملفها */}
        <ProductsGrid />
      </div>
    </Layout>
  );
};

export default Home;