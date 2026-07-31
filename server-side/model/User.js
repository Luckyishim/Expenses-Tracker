import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Name is required to sign in"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },
    password: {
        type: password,
        required: [true, "Passowrd is requried"],
        minlength: [8, "Password must at least have 6 characters"]
    },

}, {
    timestamps: true,
})
export default mongoose.model("User", userSchema)