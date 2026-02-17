import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AISizeAssistant from './pages/AISizeAssistant';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import OrderManagement from './pages/orders/OrderManagement';
import TrackOrder from './pages/TrackOrder';
import Profile from './pages/Profile';
import ShoppingCart from './pages/ShoppingCart';
import Wishlist from './pages/Wishlist';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { SizeProvider } from './context/SizeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { UserProvider } from './context/UserContext';

const AppRoutes = () => {
  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <SizeProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:category/:id" element={<ProductDetail />} />
                <Route path="/ai-size" element={<AISizeAssistant />} />
                <Route path="/auth-login" element={<Auth />} />
                <Route path="/auth-register" element={<Auth />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<OrderManagement />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                {/* Redirect unknown routes to / */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </SizeProvider>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default AppRoutes;

