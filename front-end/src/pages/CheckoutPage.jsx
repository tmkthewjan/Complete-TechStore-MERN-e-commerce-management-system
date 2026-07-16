import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { getCart, clearCart } from "../utils/cart";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      setLoading(true);
      const cart = getCart();

      if (cart.length === 0) {
        toast.error("Your cart is empty");
        navigate("/cart");
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

  const subtotal = cartItems.reduce((sum, ci) => sum + ci.product.price * ci.qty, 0);

  async function handlePlaceOrder(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      toast.error("Please fill in all required fields");
      return;
    }

    const orderPayload = {
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      phone,
      address,
      city,
      postalCode,
      notes,
      products: cartItems.map((ci) => ({
        productId: ci.product.productId,
        qty: ci.qty,
      })),
    };

    try {
      setPlacing(true);
      const res = await api.post("/orders", orderPayload);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${res.data.order.orderId}`);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <form onSubmit={handlePlaceOrder} className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Shipping Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="First name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="Last name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="+1 555 123 4567"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="Street address"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="City"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Postal Code</label>
                <input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder="Postal code"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Order Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-[80px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none"
                  placeholder="Delivery instructions, etc."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {placing ? "Placing Order..." : `Place Order — $${subtotal.toFixed(2)}`}
            </button>
          </form>

          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="flex flex-col gap-3 mb-4 max-h-[300px] overflow-y-auto">
                {cartItems.map(({ product, qty }) => (
                  <div key={product.productId} className="flex items-center gap-3">
                    <img
                      src={product.images?.[0] || "/default-product.png"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">Qty: {qty}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(product.price * qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Link
                to="/cart"
                className="block text-center text-sm text-gray-500 hover:text-blue-600 mt-4 transition-colors"
              >
                ← Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}