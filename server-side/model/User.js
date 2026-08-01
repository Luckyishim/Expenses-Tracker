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
        unique: true, 
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"], 
        minlength: [8, "Password must be at least 8 characters"] 
    },
}, {
    timestamps: true,
})

export default mongoose.model("User", userSchema)