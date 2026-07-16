import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiLogOut,
  FiShoppingBag,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../utils/api";
import { isLoggedIn, logout } from "../utils/auth";

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function UserProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/signin");
      return;
    }

    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      const [userRes, ordersRes, messagesRes] = await Promise.all([
        api.get("/users/me"),
        api.get("/orders/my-orders"),
        api.get("/contact/my-messages"),
      ]);

      setUser(userRes.data);
      setOrders(ordersRes.data);
      setMessages(messagesRes.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    toast.success("Logged Out");
    navigate("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome Banner */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-8">

          <div className="flex flex-col md:flex-row justify-between items-center">

            <div className="flex items-center gap-5">

              <div className="w-24 h-24 rounded-full bg-white/20 flex justify-center items-center">
                <FiUser size={45} />
              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  Welcome, {user?.firstName}
                </h1>

                <p className="mt-2 text-blue-100">
                  Manage your account and orders.
                </p>

                <p className="text-sm text-blue-200 mt-1">
                  {user?.email}
                </p>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="mt-6 md:mt-0 px-6 py-3 rounded-xl bg-white text-red-600 font-semibold hover:scale-105 transition"
            >
              <div className="flex items-center gap-2">
                <FiLogOut />
                Log Out
              </div>
            </button>

          </div>

        </div>

        {/* Account Cards */}

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-4">

              <FiUser className="text-blue-600" size={25} />

              <h2 className="font-bold text-xl">
                Account Details
              </h2>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-gray-400 text-sm">
                  Full Name
                </p>

                <p className="font-semibold text-lg">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Email
                </p>

                <p className="font-semibold flex items-center gap-2">
                  <FiMail />
                  {user?.email}
                </p>

              </div>

              <div>

                <p className="text-gray-400 text-sm">
                  Email Verified
                </p>

                <p className="font-semibold">
                  {user?.isEmailVerified ? "Yes ✅" : "No ❌"}
                </p>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="font-bold text-xl mb-5">
              Account Statistics
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-blue-50 rounded-xl p-5 text-center">

                <FiShoppingBag
                  size={28}
                  className="mx-auto text-blue-600"
                />

                <h3 className="mt-3 text-2xl font-bold">
                  {orders.length}
                </h3>

                <p className="text-gray-500 text-sm">
                  Orders
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5 text-center">

                <FiPackage
                  size={28}
                  className="mx-auto text-green-600"
                />

                <h3 className="mt-3 text-2xl font-bold">
                  Active
                </h3>

                <p className="text-gray-500 text-sm">
                  Account
                </p>

              </div>

            </div>

          </div>

        </div>

        <h2 className="text-3xl font-bold mb-6">
          Order History
        </h2>

        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-12 text-center mb-10">

            <FiPackage
              size={70}
              className="mx-auto text-blue-600 mb-6"
            />

            <h2 className="text-3xl font-bold">
              Welcome to TechStore 🎉
            </h2>

            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Your account has been created successfully.
              Browse our premium computer components,
              laptops, gaming accessories and place your first order.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Start Shopping
            </button>

          </div>

        ) : (

          <div className="space-y-5 mb-10">

            {orders.map((order) => (

              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center flex-wrap gap-4"
              >

                <div>

                  <h3 className="font-bold text-lg">
                    #{order.orderId}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-gray-400">
                    {order.products.length} Products
                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-2xl font-bold text-blue-600">
                    ${order.total.toFixed(2)}
                  </h2>

                  <span
                    className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold capitalize ${STATUS_STYLES[order.status]}`}
                  >
                    {order.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* Messages */}

        <h2 className="text-3xl font-bold mb-6">
          My Messages
        </h2>

        {messages.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">

            <FiMessageCircle
              size={60}
              className="mx-auto text-blue-600 mb-5"
            />

            <h2 className="text-2xl font-bold">
              No messages yet
            </h2>

            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Have a question? Reach out through our Contact page and we'll get back to you here.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Contact Us
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {messages.map((msg) => (

              <div
                key={msg._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <div className="flex justify-between items-start flex-wrap gap-3">

                  <div>
                    <h3 className="font-bold text-lg text-blue-600">
                      {msg.subject}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      msg.replied
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {msg.replied ? "Replied" : "Pending"}
                  </span>

                </div>

                <p className="mt-4 text-gray-600 whitespace-pre-line">
                  {msg.message}
                </p>

                {msg.reply && (
                  <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                      <FiMessageCircle />
                      Store Reply
                    </h4>
                    <p className="text-gray-700">{msg.reply}</p>
                  </div>
                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}