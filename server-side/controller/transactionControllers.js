import Balance from "../model/Balance.js";
import mongoose from "mongoose";

// Calculates totals for the authenticated user's transactions only.
export const getBalance = async (req, res) => {
    try {

        const match = { user: new mongoose.Types.ObjectId(req.user.id) };
        const result = await Balance.aggregate([
            { $match: match },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }
        ])

        let income = 0;
        let expenses = 0;

        result.forEach((item) => {
            if (item._id === "income") income = item.total;
            if (item._id === "expenses") expenses = item.total;
        })

        const balance = income - expenses;

        res.status(200).json({ income, expenses, balance });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
