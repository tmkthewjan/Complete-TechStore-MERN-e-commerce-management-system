import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import api from "../utils/api";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  async function fetchOrder() {
    try {
      setLoading(true);
      const res = await api.get(`/orders/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center text-gray-400">
        Order not found.
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-lg w-full text-center">
        <FiCheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">
          Thanks, {order.firstName}. We've received your order.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium text-gray-800">{order.orderId}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Items</span>
            <span className="font-medium text-gray-800">{order.products.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}