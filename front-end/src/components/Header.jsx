import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { getCartCount } from "../utils/cart";
import { isLoggedIn } from "../utils/auth";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    updateCount();
    updateAuth();

    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);
    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);

  function updateCount() {
    setCartCount(getCartCount());
  }

  function updateAuth() {
    setLoggedIn(isLoggedIn());
  }

  const navLink = (path, title) => (
    <Link
      to={path}
      className={`relative font-semibold transition duration-300
      ${
        location.pathname === path
          ? "text-blue-600"
          : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {title}

      {location.pathname === path && (
        <span className="absolute left-0 -bottom-2 h-[3px] w-full rounded bg-blue-600"></span>
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            className="h-11"
            alt="Logo"
          />

          <div>

            <h2 className="font-bold text-xl text-gray-900">
              TechStore
            </h2>

            <p className="text-xs text-gray-500">
              Computer Shop
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-10">

          {navLink("/", "Home")}
          {navLink("/products", "Products")}
          {navLink("/contact", "Contact")}
          {navLink("/about", "About")}

        </nav>

        {/* Right */}

        <div className="flex items-center gap-5">

          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-blue-50 transition"
          >
            <FiShoppingCart
              size={24}
              className="text-gray-700"
            />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {loggedIn ? (
            <Link
              to="/profile"
              className="p-2 rounded-full hover:bg-blue-50 transition"
            >
              <FiUser
                size={24}
                className="text-gray-700"
              />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition"
            >
              Sign In
            </Link>
          )}

        </div>

      </div>

    </header>
  );
}