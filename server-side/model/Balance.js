import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["expenses", "income"],
        required: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0.01, "Amount must be greater than zero"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
        index: true
    },
    notes: {
        type: String,
        trim: true
    },
}, {
    timestamps: true,
})

export default mongoose.model("Balance", expenseSchema)

