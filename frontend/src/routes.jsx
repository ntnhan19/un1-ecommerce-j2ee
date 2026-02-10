import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AISizeAssistant from './pages/AISizeAssistant';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import OrderManagement from './pages/orders/OrderManagement';
import ShoppingCart from './pages/ShoppingCart';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { SizeProvider } from './context/SizeContext';
import { CartProvider } from './context/CartContext';

const AppRoutes = () => {
  return (
    <CartProvider>
      <SizeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:category/:id" element={<ProductDetail />} />
          <Route path="/ai-size" element={<AISizeAssistant />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* Redirect unknown routes to / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SizeProvider>
    </CartProvider>
  );
};

export default AppRoutes;
