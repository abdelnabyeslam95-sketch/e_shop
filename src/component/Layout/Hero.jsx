import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-green-500 h-[500px] flex items-center justify-center text-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6">أهلاً بك في متجرنا</h1>
        <p className="text-xl md:text-2xl font-light mb-8 opacity-90">اكتشف أحدث صيحات الأحذية الطبية والرياضية بلمسة احترافية</p>
        <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all active:scale-95">
          تسوق الآن
        </button>
      </motion.div>
      {/* شكل ديكوري في الخلفية */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.1,72.6,41.4C63.8,53.7,51.8,63.7,38.5,71.1C25.2,78.5,10.6,83.2,-3.5,89.3C-17.6,95.4,-31.2,102.8,-43.3,99.1C-55.4,95.4,-65.9,80.5,-73.9,66.3C-81.9,52.1,-87.3,38.5,-89.9,24.6C-92.4,10.7,-92.1,-3.5,-88.4,-16.9C-84.7,-30.3,-77.6,-42.8,-67.6,-53C-57.5,-63.1,-44.6,-70.9,-31.4,-78.6C-18.1,-86.3,-4.5,-93.8,10.1,-111.4C24.7,-129,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;