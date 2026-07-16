import { useState } from "react";

export default function ProductImageSlideShow({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="w-full md:w-[450px] flex-shrink-0">

      {/* Main Image */}
      <div className="w-full h-[450px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex items-center justify-center">
        <img
          src={images[activeImageIndex]}
          className="w-full h-full object-contain hover:scale-105 transition-all duration-500"
          alt="Product"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="w-full mt-5 flex justify-center items-center gap-4 flex-wrap">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={
              "w-[80px] h-[80px] rounded-xl overflow-hidden cursor-pointer bg-white shadow-md border-2 transition-all duration-300 hover:scale-105 " +
              (activeImageIndex === index
                ? "border-blue-600 shadow-blue-300"
                : "border-gray-200 hover:border-blue-400")
            }
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain p-1"
            />
          </div>
        ))}
      </div>

    </div>
  );
}