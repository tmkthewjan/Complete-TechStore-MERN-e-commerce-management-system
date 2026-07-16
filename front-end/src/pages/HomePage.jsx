import { Link } from "react-router-dom";

const CATEGORIES = [
  { label: "💻 Laptops", value: "Laptops" },
  { label: "🖥 Gaming PCs", value: "Gaming PCs" },
  { label: "⌨ Keyboards", value: "Keyboards" },
  { label: "🖱 Mouse", value: "Mouse" },
  { label: "🖥 Monitors", value: "Monitors" },
  { label: "🎧 Accessories", value: "Accessories" },
];

export default function HomePage() {
  return (
    <div
      className="w-full min-h-[calc(100vh-80px)]"
      style={{
        background:
          "linear-gradient(135deg,#eef4ff 0%,#f8fbff 45%,#e5efff 100%)",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mb-6">
              #1 Computer Store
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Build Your
              <span className="block text-blue-600">
                Dream PC
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl">
              Shop the newest laptops, gaming PCs, graphics cards,
              monitors, keyboards, accessories and premium computer
              hardware from the world's leading brands.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl transition duration-300 hover:scale-105"
              >
                Shop Now
              </Link>

              <Link
                to="/about"
                className="bg-white border border-gray-200 hover:border-blue-500 text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-md transition duration-300"
              >
                Learn More
              </Link>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  500+
                </h2>
                <p className="text-gray-500 mt-2">
                  Products
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  10K+
                </h2>
                <p className="text-gray-500 mt-2">
                  Customers
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">
                  24/7
                </h2>
                <p className="text-gray-500 mt-2">
                  Support
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="absolute -top-10 -left-10 w-52 h-52 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

            <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-300 rounded-full blur-3xl opacity-30"></div>

            <img
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80"
              alt="Gaming Setup"
              className="relative rounded-3xl shadow-2xl w-full object-cover"
            />

          </div>

        </div>

      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Shop By Category
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

          {CATEGORIES.map((category) => (
            <Link
              key={category.value}
              to={`/products?category=${encodeURIComponent(category.value)}`}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer block"
            >
              <h3 className="font-bold text-gray-800 text-lg">
                {category.label}
              </h3>
            </Link>
          ))}

        </div>

      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-50 rounded-3xl p-10 text-center shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-5">🚚</div>
              <h3 className="text-xl font-bold mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-500">
                Island-wide delivery with secure packaging.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-10 text-center shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-5">🛡</div>
              <h3 className="text-xl font-bold mb-3">
                Warranty
              </h3>
              <p className="text-gray-500">
                Genuine products with manufacturer warranty.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-10 text-center shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-5">💳</div>
              <h3 className="text-xl font-bold mb-3">
                Secure Payment
              </h3>
              <p className="text-gray-500">
                Safe and encrypted payment methods.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Brands */}
      <div className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Top Brands
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {[
              "ASUS",
              "MSI",
              "Dell",
              "HP",
              "Lenovo",
              "Apple",
            ].map((brand) => (
              <div
                key={brand}
                className="bg-white rounded-2xl shadow-md p-8 text-center font-bold text-xl hover:shadow-xl hover:text-blue-600 transition"
              >
                {brand}
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Newsletter */}
      <div className="bg-blue-600 py-20">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold text-white">
            Stay Updated
          </h2>

          <p className="text-blue-100 mt-4 text-lg">
            Get notified about the latest computer hardware and exclusive offers.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-10 justify-center">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 rounded-xl w-full md:w-[420px] outline-none"
            />

            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
              Subscribe
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}