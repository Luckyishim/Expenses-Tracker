import express, { application } from "express";
import Balance from "../model/Balance.js";
import { getBalance } from "../controller/transactionControllers.js";

const router = express.Router();



// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Balance.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching transactions' });
    }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Balance.findById(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid transaction ID format" });
        }
        res.status(500).json({ error: 'Server error while fetching transaction' });
    }
});

// Update transaction
router.put('/:id', async (req, res) => {
    try {
        const updated = await Balance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(updated);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid transaction format' });
        }
        res.status(500).json({ error: 'Server error while updating transactions' });
    }
});

// Create transaction
router.post('/', async (req, res) => {
    try {
        const { category, amount, type, notes } = req.body;
        if (!category?.trim() || amount === undefined || amount === null || !type?.trim() || !notes?.trim()) {
            return res.status(400).json({ error: 'The fields are required to be filled' });
        }
        const newBalance = await Balance.create(req.body);
        res.status(201).json(newBalance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while creating new balance' });
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Balance.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Transaction not found" });
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: 'Invalid transaction ID format' });
        }
        res.status(500).json({ error: "Server error while deleting transactions" });
    }
});


//Balancing expenses and income
router.get("/balance", getBalance)

export default router;