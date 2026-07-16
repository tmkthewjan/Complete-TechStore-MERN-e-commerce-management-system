import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../utils/api";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-600",
  processing: "bg-blue-50 text-blue-600",
  shipped: "bg-purple-50 text-purple-600",
  delivered: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-500",
};

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      setUpdatingId(orderId);
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Order status updated");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  function toggleExpand(orderId) {
    setExpandedId((prev) => (prev === orderId ? null : orderId));
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {orders.length} {orders.length === 1 ? "order" : "orders"} total
          </p>
        </div>
      </div>

      {loading ? (
        <div className="w-full flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-sm">Loading orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-24 text-gray-400 gap-3 bg-white rounded-2xl border border-gray-100">
          <FiPackage size={40} className="text-gray-200" />
          <span className="text-gray-500 font-medium">No orders yet</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            const isExpanded = expandedId === order.orderId;

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(order.orderId)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50/60 transition-colors text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">{order.orderId}</p>
                      <p className="text-xs text-gray-400">
                        {order.firstName} {order.lastName} · {order.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-sm text-gray-400 hidden sm:block">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                    {isExpanded ? (
                      <FiChevronUp className="text-gray-400" />
                    ) : (
                      <FiChevronDown className="text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Shipping Details
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.firstName} {order.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.address}, {order.city}, {order.postalCode}
                        </p>
                        {order.notes && (
                          <p className="text-sm text-gray-500 mt-2 italic">"{order.notes}"</p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Update Status
                        </p>
                        <select
                          value={order.status}
                          disabled={updatingId === order.orderId}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className="w-full sm:w-[200px] h-[38px] border border-gray-300 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 capitalize"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status} className="capitalize">
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Items
                    </p>
                    <div className="flex flex-col gap-2">
                      {order.products.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 p-3"
                        >
                          <img
                            src={item.image || "/default-product.png"}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">
                              {item.productId} · Qty: {item.qty}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}