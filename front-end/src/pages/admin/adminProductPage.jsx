import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit2, FiSearch, FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function AdminProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId, name) {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;

    try {
      await api.delete(`/products/${productId}`);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p.productId !== productId));
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product");
    }
  }

  function goToEdit(productId) {
    navigate(`/admin/edit-product/${productId}`);
  }

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.productId?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full h-full relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {products.length} {products.length === 1 ? "product" : "products"} in your catalog
          </p>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-[260px] h-[40px] pl-9 pr-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="w-full flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-sm">Loading products...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-24 text-gray-400 gap-3 bg-white rounded-2xl border border-gray-100">
          <FiPackage size={40} className="text-gray-200" />
          {products.length === 0 ? (
            <>
              <span className="text-gray-500 font-medium">No products yet</span>
              <Link
                to="/admin/add-product"
                className="text-blue-600 font-medium text-sm hover:underline"
              >
                Add your first product →
              </Link>
            </>
          ) : (
            <span className="text-gray-500 font-medium">No products match "{search}"</span>
          )}
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">Product</th>
                  <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">Price</th>
                  <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">Brand / Model</th>
                  <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">Category</th>
                  <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">Stock</th>
                  <th className="text-left py-3.5 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">Status</th>
                  <th className="text-right py-3.5 px-5 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr
                    key={p.productId}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors group"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <FiPackage className="text-gray-300" size={18} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.productId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-gray-900">${p.price}</span>
                        {p.labelledPrice > p.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ${p.labelledPrice}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-gray-600">
                      <p>{p.brand || "-"}</p>
                      {p.model && <p className="text-xs text-gray-400">{p.model}</p>}
                    </td>

                    <td className="py-3.5 px-5">
                      {p.category ? (
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                          {p.category}
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>

                    <td className="py-3.5 px-5 text-gray-700 font-medium">{p.stock}</td>

                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                          p.isAvailable
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.isAvailable ? "bg-green-500" : "bg-red-400"
                          }`}
                        />
                        {p.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => goToEdit(p.productId)}
                          className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit product"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.productId, p.name)}
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete product"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Link
        to="/admin/add-product"
        className="w-[56px] h-[56px] rounded-full bg-blue-600 text-white text-2xl flex justify-center items-center fixed bottom-8 right-8 shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-transform"
        title="Add Product"
      >
        <FiPlus />
      </Link>
    </div>
  );
}