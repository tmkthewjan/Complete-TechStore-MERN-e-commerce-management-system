import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import api from "../../utils/api";

export default function AdminProductFrom() {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [labelledPrice, setLabelledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadMedia(file);
        uploadedUrls.push(url);
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
      toast.success("Image(s) uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!productId || !name || !price || !labelledPrice || !description) {
      toast.error("Product ID, name, price, labelled price, and description are required");
      return;
    }

    const newProduct = {
      productId,
      name,
      altNames: altNames
        ? altNames.split(",").map((n) => n.trim()).filter(Boolean)
        : [],
      labelledPrice: Number(labelledPrice),
      price: Number(price),
      description,
      images: images.length > 0 ? images : undefined,
      isAvailable,
      category,
      stock: Number(stock) || 0,
      brand,
      model,
    };

    try {
      setSaving(true);
      await api.post("/products", newProduct);
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="w-full bg-white shadow-sm rounded-xl flex p-4 items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Add New Product</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-center font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="w-full bg-white rounded-xl shadow-sm p-6 flex flex-wrap gap-6">
        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Product ID</label>
          <input
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            placeholder="Enter product ID"
          />
        </div>

        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            placeholder="Enter product name"
          />
        </div>

        <div className="w-[48%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Alternative Names</label>
          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            placeholder="e.g. vga, graphic card (comma separated)"
          />
        </div>

        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Labelled Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={labelledPrice}
              onChange={(e) => setLabelledPrice(e.target.value)}
              className="w-full h-[42px] border border-gray-300 rounded-lg pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              placeholder="0.00"
            />
          </div>
          <span className="text-xs text-gray-400">Original / MRP price</span>
        </div>

        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-[42px] border border-gray-300 rounded-lg pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              placeholder="0.00"
            />
          </div>
          <span className="text-xs text-gray-400">Selling price</span>
        </div>

        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Stock</label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            placeholder="Quantity"
          />
        </div>

        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
          >
            <option value="">Select category</option>
            <option value="Laptops">Laptops</option>
            <option value="Gaming PCs">Gaming PCs</option>
            <option value="Keyboards">Keyboards</option>
            <option value="Mouse">Mouse</option>
            <option value="Monitors">Monitors</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Brand</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            placeholder="Brand name"
          />
        </div>

        <div className="w-[23%] flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Model</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full h-[42px] border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            placeholder="Model number"
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="font-semibold text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[100px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none"
            placeholder="Enter product description"
          />
        </div>

        {/* Images */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-sm text-gray-600">Images</label>

          <div className="flex flex-wrap gap-3">
            {images.map((url, index) => (
              <div key={index} className="relative w-[100px] h-[100px] rounded-lg overflow-hidden border border-gray-200">
                <img src={url} alt={`Product ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}

            <label className="w-[100px] h-[100px] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition-colors text-gray-400 text-sm">
              {uploading ? (
                <span className="text-xs">Uploading...</span>
              ) : (
                <>
                  <span className="text-2xl leading-none">+</span>
                  <span className="text-xs mt-1">Add</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Available */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg w-fit">
          <span className="font-semibold text-sm text-gray-600">Available</span>
          <button
            type="button"
            onClick={() => setIsAvailable((prev) => !prev)}
            className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
              isAvailable ? "bg-green-600 justify-end" : "bg-gray-300 justify-start"
            }`}
          >
            <span className="w-5 h-5 bg-white rounded-full shadow-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}