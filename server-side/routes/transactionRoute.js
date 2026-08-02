import express from "express";
import Balance from "../model/Balance.js";
import { getBalance } from "../controller/transactionControllers.js";
import { requireAuth } from "../middleware/jwtMiddleware.js";

// Every transaction route requires a signed-in user and scopes records to that user.
const router = express.Router();
router.use(requireAuth);


router.get("/", async (req, res) => {
  try {
    const transactions = await Balance.find({ user: req.user.id }).sort({ date: -1, createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch transactions" });
  }
});

router.get("/balance", getBalance);


router.get("/:id", async (req, res) => {
  try {
    const transaction = await Balance.findOne({ _id: req.params.id, user: req.user.id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Invalid transaction ID" });
  }
});


router.post("/", async (req, res) => {
  try {
    const transaction = await Balance.create({ ...req.body, user: req.user.id });
    res.status(201).json(transaction);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Unable to create transaction" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const transaction = await Balance.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true },
    );
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Unable to update transaction" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Balance.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete transaction" });
  }
});

export default router;
