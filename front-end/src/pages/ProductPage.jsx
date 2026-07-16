import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Keep category in sync if the URL changes (e.g. clicking a category link while already on this page)
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "All";
    setCategory(urlCategory);
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [products, search, category]);

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await api.get("/products");

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function filterProducts() {
    let list = [...products];

    if (category !== "All") {
      list = list.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(list);
  }

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);

    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
  }

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background:
          "linear-gradient(135deg,#eef4ff 0%,#f8fbff 45%,#edf5ff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Header */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-extrabold text-gray-900">
            {category === "All" ? "Our Products" : category}
          </h1>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore premium laptops, gaming PCs, keyboards,
            monitors, accessories and much more.
          </p>

          <div className="mt-7 inline-flex bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold">
            {filteredProducts.length} Products Available
          </div>

        </div>

        {/* Search + Filter */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border border-gray-200 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">

            <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>

            <h2 className="mt-8 text-2xl font-bold text-gray-700">
              Loading Products...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait while we load the latest products.
            </p>

          </div>
        ) : filteredProducts.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg py-24 text-center">

            <div className="text-7xl">
              📦
            </div>

            <h2 className="text-3xl font-bold mt-5">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your search or category.
            </p>

          </div>

        ) : (

          <>
            {/* Products */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {filteredProducts.map((product) => (
                <div
                  key={product.productId}
                  className="transition duration-300 hover:-translate-y-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}

            </div>

            {/* Bottom Banner */}

            <div className="mt-20">

              <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl text-white text-center px-10 py-16 shadow-xl">

                <h2 className="text-4xl font-bold">
                  Upgrade Your Setup Today
                </h2>

                <p className="mt-5 text-blue-100 max-w-3xl mx-auto text-lg">
                  Discover premium computer hardware, gaming accessories,
                  office equipment and exclusive weekly discounts only at
                  <span className="font-bold"> TechStore.</span>
                </p>

              </div>

            </div>

          </>

        )}

      </div>
    </div>
  );
}