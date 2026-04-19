const mongoose = require("mongoose");
const { Schema } = mongoose;

const bannerSchema = new Schema({
    image: {
        type: String,
        required: [true, "banner is required"]
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("Banner", bannerSchema);