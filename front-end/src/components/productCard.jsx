import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { addToCart } from "../utils/cart";

export default function ProductCard({ product }) {

  function handleAddCart(e) {
    e.preventDefault();

    addToCart(product.productId, 1);

    toast.success("Added to Cart");
  }

  const discount =
    product.labelledPrice > product.price
      ? Math.round(
          ((product.labelledPrice - product.price) /
            product.labelledPrice) *
            100
        )
      : 0;

  return (
    <Link
      to={`/products/${product.productId}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image */}

      <div className="relative overflow-hidden bg-gray-100">

        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            -{discount}%
          </div>
        )}

        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex justify-center items-center">
            <span className="bg-white px-5 py-2 rounded-full font-bold">
              Out of Stock
            </span>
          </div>
        )}

      </div>

      {/* Details */}

      <div className="p-5">

        <p className="text-sm text-blue-600 font-semibold uppercase">
          {product.category || "Computer"}
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2 h-14">
          {product.name}
        </h2>

        <div className="flex items-center gap-2 mt-3">

          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>

          {product.labelledPrice > product.price && (
            <span className="line-through text-gray-400">
              ${product.labelledPrice}
            </span>
          )}

        </div>

        {/* Rating */}

        <div className="flex items-center mt-4">

          <span className="text-yellow-500 text-lg">
            ★★★★★
          </span>

          <span className="text-gray-500 text-sm ml-2">
            (4.9)
          </span>

        </div>

        {/* Stock */}

        <div className="mt-3">

          {product.stock > 0 ? (
            <span className="text-green-600 font-medium text-sm">
              {product.stock} Items Available
            </span>
          ) : (
            <span className="text-red-500 font-medium text-sm">
              Out of Stock
            </span>
          )}

        </div>

        {/* Button */}

        <button
          onClick={handleAddCart}
          disabled={!product.isAvailable}
          className={`w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
            product.isAvailable
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FiShoppingCart size={18} />

          {product.isAvailable ? "Add To Cart" : "Unavailable"}
        </button>

      </div>
    </Link>
  );
}