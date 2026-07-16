import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../utils/api";
import { getCart, removeFromCart, addToCart } from "../utils/cart";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      setLoading(true);
      const cart = getCart();

      if (cart.length === 0) {
        setCartItems([]);
        return;
      }

      const results = await Promise.all(
        cart.map(async (item) => {
          try {
            const res = await api.get(`/products/${item.productId}`);
            return { product: res.data, qty: item.qty };
          } catch {
            return null;
          }
        })
      );

      setCartItems(results.filter(Boolean));
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  function handleQtyChange(productId, newQty) {
    if (newQty < 1) return;

    const cart = getCart();
    const item = cart.find((i) => i.productId === productId);
    if (item) {
      const diff = newQty - item.qty;
      addToCart(productId, diff);
    }

    setCartItems((prev) =>
      prev.map((ci) =>
        ci.product.productId === productId ? { ...ci, qty: newQty } : ci
      )
    );
  }

  function handleRemove(productId, name) {
    removeFromCart(productId);
    setCartItems((prev) => prev.filter((ci) => ci.product.productId !== productId));
    toast.success(`Removed ${name} from cart`);
  }

  const subtotal = cartItems.reduce(
    (sum, ci) => sum + ci.product.price * ci.qty,
    0
  );
  const savings = cartItems.reduce((sum, ci) => {
    const diff = (ci.product.labelledPrice || ci.product.price) - ci.product.price;
    return sum + Math.max(0, diff) * ci.qty;
  }, 0);

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 gap-3">
            <FiShoppingBag size={40} className="text-gray-200" />
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <Link to="/products" className="text-blue-600 font-medium text-sm hover:underline">
              Browse products →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map(({ product, qty }) => (
                <div
                  key={product.productId}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
                >
                  <img
                    src={product.images?.[0] || "/default-product.png"}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                  />

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${product.productId}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-400 mt-0.5">${product.price} each</p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleQtyChange(product.productId, qty - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-sm font-medium">{qty}</span>
                        <button
                          onClick={() => handleQtyChange(product.productId, qty + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(product.productId, product.name)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1.5"
                        title="Remove"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${(product.price * qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[320px] flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600 mb-2">
                    <span>You save</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-100 my-4" />

                <div className="flex justify-between font-bold text-gray-900 text-lg mb-6">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center text-sm text-gray-500 hover:text-blue-600 mt-4 transition-colors"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}