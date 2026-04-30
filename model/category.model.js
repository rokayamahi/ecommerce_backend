const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "image is required"],
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      unique: [true, "slug must be unique"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name must be unique"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subcategory: [{ type: mongoose. Schema.Types.ObjectId, ref: "SubCategory" }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("category", categorySchema);
