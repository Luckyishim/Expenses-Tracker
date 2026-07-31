import express from "express"
import Balance from "../model/Balance.js";




const router = express.Router();

//Get all transactions
router.get('/', async (req, res)=>{
try {
    const transactions = await Balance.find();
    res.status(200).json(transactions)
} catch (error) {
    res.status(500).json({error: 'Server error while fetching transactions'})
}
})

//Get transactions by ID
router.get('/:id', async (req, res)=>{
try {
    const transaction = await Balance.findById(req.params.id)
    if(!transaction) return res.status(400).json({error: 'Transaction not found'})
        res.status(200).json(transaction)
} catch (error) {
    if(err.name === "CastError"){
        return res.status(400).json({error:"Invalid transacton ID fromat"})
    }
}
})


//Updating the transactions
router.put('/:id', async (req, res)=>{

})


//Posting the transaction
router.post('/', async (req, res)=>{

})

//Deleting the transaction
router.delete('/:id', async (req, res)=>{

})

export default router;