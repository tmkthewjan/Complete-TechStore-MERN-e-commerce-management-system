import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.name}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6">

        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
          {category.name}
        </h2>

        <p className="text-gray-500 mt-2">
          Browse premium {category.name.toLowerCase()} collection.
        </p>

        <button
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Shop Now
        </button>

      </div>
    </Link>
  );
}