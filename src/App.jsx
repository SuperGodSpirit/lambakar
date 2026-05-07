import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CartProvider } from './context/CartContext';
import { CourseAuthProvider } from './context/CourseAuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CourseDashboard from './pages/CourseDashboard';
import Auth from './pages/Auth';
import Legal from './pages/Legal';

export default function App() {
  return (
    <CourseAuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/course" element={<CourseDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/terms" element={<Legal />} />
              <Route path="/privacy" element={<Legal />} />
              <Route path="/refund" element={<Legal />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </CartProvider>
    </CourseAuthProvider>
  );
}
