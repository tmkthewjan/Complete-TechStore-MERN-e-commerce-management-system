import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import SignInPrompt from "./components/SignInPrompt";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductOverview from "./pages/ProductOverview";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import UserProfilePage from "./pages/UserProfilePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function StoreLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <SignInPrompt />

      <Routes>
        {/* Store */}

        <Route
          path="/"
          element={
            <StoreLayout>
              <HomePage />
            </StoreLayout>
          }
        />

        <Route
          path="/products"
          element={
            <StoreLayout>
              <ProductPage />
            </StoreLayout>
          }
        />

        <Route
          path="/products/:productId"
          element={
            <StoreLayout>
              <ProductOverview />
            </StoreLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <StoreLayout>
              <CartPage />
            </StoreLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <StoreLayout>
              <CheckoutPage />
            </StoreLayout>
          }
        />

        <Route
          path="/order-confirmation/:orderId"
          element={
            <StoreLayout>
              <OrderConfirmationPage />
            </StoreLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <StoreLayout>
              <UserProfilePage />
            </StoreLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <StoreLayout>
              <ContactPage />
            </StoreLayout>
          }
        />

        <Route
          path="/about"
          element={
            <StoreLayout>
              <AboutPage />
            </StoreLayout>
          }
        />

        {/* Authentication */}

        <Route path="/signin" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Admin */}

        <Route path="/admin/*" element={<AdminPage />} />

        {/* 404 */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-7xl font-bold text-blue-600">404</h1>
                <p className="text-gray-600 mt-3">
                  Page Not Found
                </p>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;