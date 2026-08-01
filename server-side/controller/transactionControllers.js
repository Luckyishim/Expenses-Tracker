import Balance from "../model/Balance.js";

// Calculates totals for either one user's transactions or all transactions when no user is supplied.
export const getBalance = async (req, res) => {
    try {
        const match = req.query.user ? { user: req.query.user } : {};
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
