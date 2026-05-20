import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // تأكد إن ملف الـ CSS الخاص بالتيلواند موجود هنا
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);