import { Link, Route, Routes } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import { GrGift } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

import AdminProductPage from "./admin/AdminProductPage";
import AdminAddProductForm from "./admin/AdminAddProductForm";
import AdminEditProductForm from "./admin/AdminEditProductForm";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import AdminUsersPage from "./admin/AdminUsersPage";
import AdminMessagesPage from "./admin/AdminMessagesPage";

export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-gray-50 flex">

      {/* Sidebar */}

      <div className="w-[280px] bg-white shadow-xl border-r border-gray-100 flex flex-col">

        {/* Logo */}

        <div className="h-[90px] border-b flex items-center justify-center">

          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-16 object-contain"
          />

        </div>

        {/* Title */}

        <div className="px-6 py-5">

          <h2 className="text-2xl font-bold text-gray-800">
            Admin Panel
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            TechStore Dashboard
          </p>

        </div>

        {/* Navigation */}

        <nav className="flex-1 px-3 space-y-2">

          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <IoIosCart size={22} />
            <span className="font-medium">Orders</span>
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <GrGift size={20} />
            <span className="font-medium">Products</span>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <FaUser size={20} />
            <span className="font-medium">Users</span>
          </Link>

          <Link
            to="/admin/messages"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <FiMail size={20} />
            <span className="font-medium">Messages</span>
          </Link>

        </nav>

        {/* Footer */}

        <div className="border-t p-5">

          <p className="text-center text-xs text-gray-400">
            © 2026 TechStore Admin
          </p>

        </div>

      </div>

      {/* Main Content */}

      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">

        <Routes>

          <Route path="/" element={<AdminOrdersPage />} />
          <Route path="/products" element={<AdminProductPage />} />
          <Route path="/add-product" element={<AdminAddProductForm />} />
          <Route path="/edit-product/:productId" element={<AdminEditProductForm />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/messages" element={<AdminMessagesPage />} />

        </Routes>

      </div>

    </div>
  );
}