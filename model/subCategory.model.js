const { Schema, default: mongoose } = require("mongoose");

const subCategorySchema = new Schema(
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
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("subCategory", subCategorySchema);
