import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // التحقق إذا كان المنتج موجود بالفعل في السلة
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleCartAction = () => {
    if (isInCart) {
      // لو المنتج موجود أصلاً، الزرار يوديه لصفحة السلة
      navigate('/cart');
    } else {
      // لو مش موجود، يضيفه للسلة مع تأثير "تم الحفظ"
      setIsAdding(true);
      addToCart(product);
      
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white group rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full"
    >
      {/* قسم الصورة */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-2"
        />
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-brand-green text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase">جديد</span>
        )}
      </div>

      {/* تفاصيل المنتج */}
      <div className="flex flex-col flex-grow text-right">
        <p className="text-[10px] text-green-600 font-bold mb-1 uppercase tracking-wider">{product.category}</p>
        <h3 className="text-sm font-bold text-gray-800 h-10 overflow-hidden line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <p className="text-lg font-black text-blue-600 mb-4">
            {product.price} <span className="text-[10px] font-medium text-gray-400">ج.م</span>
          </p>

          {/* أزرار التحكم */}
          <div className="flex gap-2">
            <Link 
              to={`/product/${product.id}`}
              className="flex-1 text-center bg-gray-50 text-gray-600 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-colors text-xs border border-gray-100"
            >
              التفاصيل
            </Link>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleCartAction}
              className={`flex-[1.5] py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                isInCart 
                ? 'bg-green-600 text-white shadow-green-100' // لون أخضر لو في السلة
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.span
                    key="added"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    تم الحفظ ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="cart-btn"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    {isInCart ? (
                      <>
                        <span>عرض السلة</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>أضف للسلة</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;