import axios from 'axios';

// طلبنا 12 منتج مباشرة من الـ API باستخدام limit=12
const BASE_URL = 'https://dummyjson.com/products/category/mens-shoes?limit=12'; 

export const getAllProducts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        const shoes = response.data.products;

        // مصفوفة أسماء عربية شاملة لـ 12 منتج وأكثر
        const arabicNames = [
            "حذاء نايك إير جوردان 1",
            "أديداس ألترا بوست الأسود",
            "نايك إير ماكس 270",
            "أديداس أوريجينال كلاسيك",
            "حذاء نايك رانر للمشي",
            "أديداس كاجوال جلد",
            "نايك زووم الرياضي",
            "حذاء بوما ستريت لاين",
            "نايك وافل ديبورتيفو",
            "أديداس تيريكس جبلي",
            "ريبوك كلاسيك هيريتيج",
            "حذاء فانس أولد سكول"
        ];

        // معالجة البيانات لضمان ظهور 12 منتج بأسماء عربية وصور صحيحة
        return shoes.map((item, index) => ({
            id: item.id,
            // لو الفهرس أكبر من المصفوفة، هيحط اسم افتراضي شيك
            title: arabicNames[index] || `حذاء رياضي عصري موديل ${index + 1}`, 
            price: Math.round(item.price * 50), // تحويل تقريبي للجنيه
            image: item.thumbnail, 
            category: "أحذية رجالي",
            rating: item.rating
        }));
        
    } catch (error) {
        console.error("خطأ في جلب الأحذية:", error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const product = response.data;
        
        // تأمين جلب تفاصيل المنتج بالعربي برضه لو احتجنا
        return {
            ...product,
            title_ar: `تفاصيل المنتج رقم ${id}`
        };
    } catch (error) {
        return null;
    }
};