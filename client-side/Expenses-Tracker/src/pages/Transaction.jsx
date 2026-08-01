import { useMemo, useState } from "react";
import "../styles/Transaction.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTransactions } from "../hooks/useTransaction";

const formatCurrency = (amount) => new Intl.NumberFormat("en-NP", {
  style: "currency",
  currency: "NPR",
}).format(amount);

// Shows, filters, and deletes only the signed-in user's transaction records.
function Transaction() {
  const [activeType, setActiveType] = useState("expenses");
  const [filters, setFilters] = useState({ category: "", from: "", to: "" });
  const { transactions, loading, error, deleteTransaction } = useTransactions();

  const categories = useMemo(
    () => [...new Set(transactions.filter((item) => item.type === activeType).map((item) => item.category))],
    [transactions, activeType],
  );

  const visibleTransactions = useMemo(() => transactions.filter((item) => {
    const date = item.date.slice(0, 10);
    return item.type === activeType
      && (!filters.category || item.category === filters.category)
      && (!filters.from || date >= filters.from)
      && (!filters.to || date <= filters.to);
  }), [transactions, activeType, filters]);

  const clearFilters = () => setFilters({ category: "", from: "", to: "" });

  const removeTransaction = async (transaction) => {
    if (window.confirm(`Delete ${transaction.category} for ${formatCurrency(transaction.amount)}?`)) {
      await deleteTransaction(transaction._id);
    }
  };

  return (
    <main className="transactions-page">
      <Navbar activePage="transactions" />
      <section className="transactions-content" aria-label="Transactions">
        <div className="transaction-switch">
          <button className={activeType === "expenses" ? "selected" : ""} type="button" onClick={() => setActiveType("expenses")}>
            Expenses
          </button>
          <button type="button" className={activeType === "income" ? "selected is-income" : "is-income"} onClick={() => setActiveType("income")}>
            Income
          </button>
        </div>

        <div className="transaction-filters">
          <label>Category
            <select className="select-field" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
              <option value="">All Categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label>From
            <input type="date" value={filters.from} onChange={(event) => setFilters({ ...filters, from: event.target.value })} />
          </label>
          <label>To
            <input type="date" value={filters.to} onChange={(event) => setFilters({ ...filters, to: event.target.value })} />
          </label>
          <button type="button" className="clear-filter" onClick={clearFilters}>Clear Filters</button>
        </div>

        {error && <p className="transaction-message error" role="alert">{error}</p>}
        {loading && <p className="transaction-message">Loading your transactions…</p>}

        <div className="transactions-table-wrap">
          <table className="transactions-table">
            <thead><tr><th>Category</th><th>Note</th><th>Date</th><th>Amount</th><th>Actions</th></tr></thead>
            <tbody>
              {!loading && visibleTransactions.length === 0 && (
                <tr><td className="no-transactions" colSpan="5">No {activeType} match these filters.</td></tr>
              )}
              {visibleTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td><span className="category-icon">{transaction.category.charAt(0)}</span>{transaction.category}</td>
                  <td>{transaction.notes || "—"}</td>
                  <td>{new Date(transaction.date).toLocaleDateString("en-NP", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td className={transaction.type}>{transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}</td>
                  <td><button type="button" aria-label={`Delete ${transaction.category}`} className="row-action delete-action" onClick={() => removeTransaction(transaction)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Transaction;
