import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    altNames: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    labelledPrice: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      default: ["/default-product.png"],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      default: "",
    },

    brand: {
      type: String,
      default: "",
    },

    model: {
      type: String,
      default: "",
    },

    processor: {
      type: String,
      default: "",
    },

    graphics: {
      type: String,
      default: "",
    },

    ram: {
      type: String,
      default: "",
    },

    storage: {
      type: String,
      default: "",
    },

    display: {
      type: String,
      default: "",
    },

    operatingSystem: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    warranty: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 5,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    latest: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;