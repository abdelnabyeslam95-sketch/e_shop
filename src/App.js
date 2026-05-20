import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Checkout from './pages/Checkout'; // 1. لازم نستورد صفحة الـ Checkout هنا

import { CartProvider } from './Context/CartContext'; 


const ProtectedRoute = ({ children, allowedRole }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          
      
          <Route path="/checkout" element={<Checkout />} />

      
          <Route 
            path="/user-dashboard" 
            element={
              <ProtectedRoute allowedRole="user">
                <UserDashboard />
              </ProtectedRoute>
            } 
          />

          {/* لوحة تحكم الأدمن */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* إعادة توجيه لأي لينك غلط - ده اللي كان بيرجعك للرئيسية */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;