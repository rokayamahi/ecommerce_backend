const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      trim: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: [true, "product category is required"],
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    stock: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      unique: [true, "product sku must be unique"],
    },
    slug: {
      type: String,
      unique: [true, "product slug must be unique"],
    },
    images: {
      type: [String],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    retailPrice: {
      type: Number,
    },
    variantType: {
      type: String,
      enum: ["singleVariant", "multiVariant"],
      required: [true, "product variant type is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("product", productSchema);
