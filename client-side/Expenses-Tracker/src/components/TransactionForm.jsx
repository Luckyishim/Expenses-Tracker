import { useState } from 'react';


const TransactionForm = ({ 
  type = 'expenses',  
  onAddTransaction, 
}) => {

  const transactionType = type || 'expenses';
  const isIncome = transactionType === 'income';


  const categories = {
    income: ['Salary & Wages', 'Freelance', 'Investment', 'Business', 'Other'],
    expenses: ['Housing & Rent', 'Food & Dining', 'Transportation', 'Utilities', 'Healthcare', 'Entertainment', 'Shopping', 'Other']
  };


  const getCategories = () => {
  
    if (!transactionType || !categories[transactionType]) {
      return categories.expenses;
    }
    return categories[transactionType];
  };

  const [formData, setFormData] = useState({
    amount: '',
    category: isIncome ? 'Salary & Wages' : 'Housing & Rent',
    date: '',
    notes: '',
    type: transactionType,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await onAddTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        type: transactionType,
      });
      
      setFormData({
        amount: '',
        category: isIncome ? 'Salary & Wages' : 'Housing & Rent',
        date: '',
        notes: '',
        type: transactionType,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={`expense-panel ${isIncome ? "income-panel" : ""}`}>
      <h1>
        <span>{isIncome ? "+" : "−"}</span> 
        Add {isIncome ? "Income" : "Expense"}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <label>
          Amount
          <div className="amount-input">
            <b>NPR</b>
            <input 
              type="number" 
              name="amount"
              placeholder="0.00" 
              step="0.01"
              min="0.01"
              required
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </label>

        <label>
          Category
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {getCategories().map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          Date
          <div className="date-input">
            <input 
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </label>

        <label>
          Note (Optional)
          <textarea 
            name="notes"
            placeholder="Add a description..."
            value={formData.notes}
            onChange={handleChange}
          />
        </label>

        <button className="add-transaction" type="submit">
          Add {isIncome ? "Income" : "Expense"}
        </button>
      </form>
    </section>
  );
};

export default TransactionForm;
