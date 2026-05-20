import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  // 1. جلب المنتجات والطلبات من الـ LocalStorage لضمان الواقعية
  const [products, setProducts] = useState([
  
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

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // للتبديل بين المنتجات والطلبات

  // تحميل الطلبات عند فتح الصفحة
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  // حالات التحكم في الفورم (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, title: '', price: '', stock: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  // --- وظائف التحكم ---

  const handleDeleteProduct = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
    } else {
      const newProduct = { ...currentProduct, id: Date.now(), image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format" };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  const deleteOrder = (orderId) => {
    if (window.confirm("هل تريد مسح هذا الطلب؟")) {
      const updatedOrders = orders.filter(o => o.orderId !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* الهيدر والتبديل */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-blue-900">لوحة الإدارة ⚙️</h1>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => setActiveTab('products')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 border border-blue-100'}`}
              >
                إدارة المنتجات
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'orders' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-green-600 border border-green-100'}`}
              >
                الطلبات الواردة ({orders.length})
              </button>
            </div>
          </div>
          
          {activeTab === 'products' && (
            <button 
              onClick={() => { setCurrentProduct({ id: null, title: '', price: '', stock: '' }); setIsEditing(false); setIsModalOpen(true); }}
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:scale-105 transition-all"
            >
              + إضافة حذاء جديد
            </button>
          )}
        </div>

        {/* محتوى المنتجات */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100 animate-fade-in">
            <table className="w-full text-center">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-gray-600 font-bold">
                  <th className="p-6">الصورة</th>
                  <th className="p-6">اسم الحذاء</th>
                  <th className="p-6">السعر</th>
                  <th className="p-6">المخزون</th>
                  <th className="p-6">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-blue-50/20 transition-all">
                    <td className="p-6"><img src={product.image} alt="" className="w-12 h-12 object-cover rounded-xl mx-auto shadow-sm" /></td>
                    <td className="p-6 font-bold text-gray-800">{product.title}</td>
                    <td className="p-6 font-black text-blue-600">{product.price} ج.م</td>
                    <td className="p-6">
                      <span className={`px-4 py-1 rounded-full text-xs font-bold ${product.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {product.stock} زوج
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => { setCurrentProduct(product); setIsEditing(true); setIsModalOpen(true); }} className="text-blue-500 hover:bg-blue-100 px-3 py-1 rounded-lg transition-all">تعديل</button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:bg-red-100 px-3 py-1 rounded-lg transition-all">حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* محتوى الطلبات (نظام الشراء الحقيقي) */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            {orders.length === 0 ? (
              <div className="text-center p-20 bg-white rounded-[2.5rem] text-gray-400 font-bold">لا توجد طلبات جديدة حالياً</div>
            ) : (
              orders.map((order) => (
                <div key={order.orderId} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-900 text-white px-3 py-1 rounded-lg text-sm font-black">طلب رقم #{order.orderId}</span>
                      <span className="text-gray-400 text-sm">{order.date}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">العميل: {order.customer.name}</h3>
                    <p className="text-gray-600 font-bold">📍 {order.customer.address} | 📞 {order.customer.phone}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="bg-gray-100 px-3 py-1 rounded-md text-xs font-bold text-gray-600">
                          {item.title} (x{item.quantity})
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-2xl font-black text-green-600">{order.total} ج.م</div>
                    <button 
                      onClick={() => deleteOrder(order.orderId)}
                      className="text-red-400 hover:text-red-600 font-bold text-sm underline"
                    >
                      مسح من السجل
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal الإضافة والتعديل */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
              <h2 className="text-2xl font-black mb-6 text-gray-800">{isEditing ? 'تعديل بيانات الحذاء' : 'إضافة حذاء جديد'}</h2>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <input 
                  type="text" placeholder="اسم المنتج" 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400"
                  value={currentProduct.title}
                  onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" placeholder="السعر" 
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                    required
                  />
                  <input 
                    type="number" placeholder="المخزون" 
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">حفظ</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-black">إلغاء</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;