import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12"
            />

            <div>
              <h2 className="text-2xl font-bold text-white">
                TechStore
              </h2>

              <p className="text-sm text-gray-400">
                Computer Shop
              </p>
            </div>
          </div>

          <p className="leading-7 text-gray-400">
            TechStore provides premium laptops, gaming PCs,
            monitors, keyboards, mice and accessories from
            trusted brands with fast delivery and secure shopping.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">

            <Link
              to="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="hover:text-blue-400 transition"
            >
              Products
            </Link>

            <Link
              to="/about"
              className="hover:text-blue-400 transition"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="hover:text-blue-400 transition"
            >
              Contact Us
            </Link>

            <Link
              to="/cart"
              className="hover:text-blue-400 transition"
            >
              Shopping Cart
            </Link>

          </div>
        </div>

        {/* Categories */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Categories
          </h3>

          <div className="flex flex-col gap-3">

            <p className="hover:text-blue-400 transition cursor-pointer">
              Laptops
            </p>

            <p className="hover:text-blue-400 transition cursor-pointer">
              Gaming PCs
            </p>

            <p className="hover:text-blue-400 transition cursor-pointer">
              Monitors
            </p>

            <p className="hover:text-blue-400 transition cursor-pointer">
              Keyboards
            </p>

            <p className="hover:text-blue-400 transition cursor-pointer">
              Mouse
            </p>

            <p className="hover:text-blue-400 transition cursor-pointer">
              Accessories
            </p>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">

              <FiMapPin
                className="text-blue-500 mt-1"
                size={18}
              />

              <p>
                TechStore Computer Shop
                <br />
                Colombo, Sri Lanka
              </p>

            </div>

            <div className="flex gap-3">

              <FiPhone
                className="text-blue-500 mt-1"
                size={18}
              />

              <p>
                +94 77 123 4567
              </p>

            </div>

            <div className="flex gap-3">

              <FiMail
                className="text-blue-500 mt-1"
                size={18}
              />

              <p>
                support@techstore.com
              </p>

            </div>

          </div>

          {/* Social Icons */}

          <div className="flex gap-4 mt-8">

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 transition flex items-center justify-center"
            >
              <FiFacebook />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 transition flex items-center justify-center"
            >
              <FiInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-sky-500 transition flex items-center justify-center"
            >
              <FiTwitter />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TechStore Computer Shop.
            All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}