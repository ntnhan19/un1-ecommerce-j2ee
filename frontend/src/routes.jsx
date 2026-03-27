import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AISizeAssistant from './pages/AISizeAssistant';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderManagement from './pages/orders/OrderManagement';
import TrackOrder from './pages/TrackOrder';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ShoppingCart from './pages/ShoppingCart';
import Wishlist from './pages/Wishlist';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import { SizeProvider } from './context/SizeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <SizeProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/products/:category" element={<Products />} />
                  <Route path="/product/:category/:id" element={<ProductDetail />} />
                  <Route path="/ai-size" element={<AISizeAssistant />} />
                  <Route path="/auth-login" element={<Auth />} />
                  <Route path="/auth-register" element={<Auth />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  
                  {/* Private Routes */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                  </Route>

                  <Route path="/track-order" element={<TrackOrder />} />
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
    </AuthProvider>
  );
};

export default AppRoutes;

