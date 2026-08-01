import { useEffect, useState } from "react"
import { api } from "../services/api";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState({ income: 0, expenses: 0, balance: 0 })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    //For getting transactions
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await api.getTransactions();
            setTransactions(data);
            return data;
        } catch (error) {
            setError(error.message)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    //For getting balance
    const fetchBalance = async () => {
        try {
            const data = await api.getBalance()
            setBalance(data)
            return data
        } catch (error) {
            setError(error.message)
            throw error
        }
    }

    //CRUD Operations
    //Creating new transactions
    const addTransaction = async (transactionsData) => {
        setLoading(true);
        setError(null);
        try {
            const newTransactions = await api.createTransaction(transactionsData);
            setTransactions(prev => [newTransactions, ...prev])
            await fetchBalance();
            return newTransactions
        } catch (error) {
            setError(error.message)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    //Updating transactions
    const updateTransaction = async (id, transactionsData) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await api.updateTransaction(id, transactionsData);
            setTransactions(prev => prev.map(t => t._id === id ? updated : t))
            await fetchBalance();
            return updated
        } catch (error) {
            setError(error.message)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    //Deleting transactions
    const deleteTransaction = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await api.deleteTransaction(id);
            setTransactions(prev => prev.filter(t => t._id !== id))
            await fetchBalance();
        } catch (error) {
            setError(error.message)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const [transactions, balance] = await Promise.all([
                    api.getTransactions(),
                    api.getBalance(),
                ]);

                setTransactions(transactions);
                setBalance(balance);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);
    //This is now every component will get
    return {
        transactions,
        balance,
        loading,
        error,
        fetchTransactions,
        fetchBalance,
        addTransaction,
        updateTransaction,
        deleteTransaction
    }

}
