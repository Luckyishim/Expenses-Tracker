import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        reuired: true
    },
    type: {
        type: String,
        enum: ["expenses", "income"],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
})

export const budget = mongoose.budget("ExpenseTracker", expenseSchema)

