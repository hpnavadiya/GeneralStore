const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a Brand"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Please add a Color"],
      default: "As seen",
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please ass a name"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    reguklarPrice: {
      type: Number,
      trim: true,
    },
    Price: {
      type: Number,
      required: [true, "Please add a Price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a Description"],
      trim: true,
    },
    image: {
      type: [String],
    },
    ratings: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
