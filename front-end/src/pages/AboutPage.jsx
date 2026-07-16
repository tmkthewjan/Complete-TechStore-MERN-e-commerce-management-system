import {
  FiCpu,
  FiMonitor,
  FiAward,
  FiUsers,
  FiTruck,
  FiShield,
} from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl md:text-6xl font-bold">
            About TechStore
          </h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto text-blue-100">
            Your trusted destination for laptops, gaming PCs,
            computer components, accessories and premium technology
            products at affordable prices.
          </p>

        </div>

      </section>

      {/* Story */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-14 items-center">

          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200"
            className="rounded-3xl shadow-2xl"
            alt=""
          />

          <div>

            <h2 className="text-4xl font-bold text-gray-900">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              TechStore is one of Sri Lanka's growing computer retailers.
              We provide premium laptops, gaming PCs, processors,
              graphic cards, SSDs, RAM, keyboards, monitors,
              networking equipment and accessories from trusted
              international brands.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              Our goal is to provide genuine products,
              competitive pricing and exceptional customer service.
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <FiAward
              size={50}
              className="mx-auto text-blue-600"
            />

            <h3 className="font-bold text-2xl mt-5">
              Genuine Products
            </h3>

            <p className="text-gray-500 mt-4">
              100% original products from trusted brands.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <FiTruck
              size={50}
              className="mx-auto text-blue-600"
            />

            <h3 className="font-bold text-2xl mt-5">
              Fast Delivery
            </h3>

            <p className="text-gray-500 mt-4">
              Island-wide delivery with secure packaging.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <FiShield
              size={50}
              className="mx-auto text-blue-600"
            />

            <h3 className="font-bold text-2xl mt-5">
              Warranty
            </h3>

            <p className="text-gray-500 mt-4">
              Manufacturer warranty and after-sales support.
            </p>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>

              <FiUsers
                size={45}
                className="mx-auto text-blue-600"
              />

              <h2 className="text-4xl font-bold mt-4">
                5000+
              </h2>

              <p className="text-gray-500">
                Happy Customers
              </p>

            </div>

            <div>

              <FiMonitor
                size={45}
                className="mx-auto text-blue-600"
              />

              <h2 className="text-4xl font-bold mt-4">
                2500+
              </h2>

              <p className="text-gray-500">
                Products
              </p>

            </div>

            <div>

              <FiCpu
                size={45}
                className="mx-auto text-blue-600"
              />

              <h2 className="text-4xl font-bold mt-4">
                80+
              </h2>

              <p className="text-gray-500">
                Brands
              </p>

            </div>

            <div>

              <FiAward
                size={45}
                className="mx-auto text-blue-600"
              />

              <h2 className="text-4xl font-bold mt-4">
                10+
              </h2>

              <p className="text-gray-500">
                Years Experience
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}