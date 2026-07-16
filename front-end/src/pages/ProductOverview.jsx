import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { addToCart } from "../utils/cart";
import ProductImageSlideShow from "../components/ProductImageSlideShow";

export default function ProductOverview() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!productId) {
      navigate("/products");
      return;
    }
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    try {
      setLoading(true);
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    addToCart(product.productId, qty);
    toast.success(`Added ${qty} × ${product.name} to cart`);
  }

  function handleBuyNow() {
    addToCart(product.productId, qty);
    navigate("/cart");
  }

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center text-gray-400">
        Product not found.
      </div>
    );
  }

  const hasDiscount = product.labelledPrice && product.labelledPrice > product.price;

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
        <ProductImageSlideShow images={product.images?.length ? product.images : ["/default-product.png"]} />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-sm text-gray-400 mb-4">{product.productId}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">${product.labelledPrice}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-8">
            {product.brand && <span className="bg-gray-100 px-3 py-1 rounded-full">Brand: {product.brand}</span>}
            {product.model && <span className="bg-gray-100 px-3 py-1 rounded-full">Model: {product.model}</span>}
            {product.category && <span className="bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>}
          </div>

          {product.isAvailable && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-gray-600">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              {product.stock > 0 && (
                <span className="text-xs text-gray-400">{product.stock} in stock</span>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
            >
              {product.isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!product.isAvailable}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}