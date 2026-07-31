export const getBalance = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "NRS. amount" }
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

        res.join({ income, expenses, balance })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}