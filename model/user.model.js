const {mongoose} = require("mongoose")
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "name is required"],
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: [true, "this email is already used"],
        trim: true,
    },
    password:{
        type: String,
        required: [true, "password is required"],
        select: false,
        min: [8, "password mustbe minimun 8 characters"],
        max: [20, "password mustbe under 20 word"],
    },
    phone:{
        type: String,
        trim: true,
    },
    otp:{
        type: String,
    },
    otpexpire:{
        type: Date,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    address:{
        type: String,
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
        trim: true,
    }
},{
    versionKey: false,
})

module.exports = mongoose.model("User", userSchema)