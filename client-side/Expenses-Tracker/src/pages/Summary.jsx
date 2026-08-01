import { useMemo, useState } from "react";
import "../styles/Summary.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTransactions } from "../hooks/useTransaction";

const formatCurrency = (amount) => new Intl.NumberFormat("en-NP", { style: "currency", currency: "NPR" }).format(amount);

const monthBounds = (offset) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + offset + 1, 1);
  return { start, end };
};

// Calculates each signed-in user's monthly totals and category breakdown from live records.
function Summary() {
  const [type, setType] = useState("expenses");
  const [period, setPeriod] = useState("this");
  const { transactions, loading, error } = useTransactions();

  const summary = useMemo(() => {
    const { start, end } = monthBounds(period === "this" ? 0 : -1);
    const records = transactions.filter((item) => {
      const date = new Date(item.date);
      return date >= start && date < end;
    });
    const income = records.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
    const expenses = records.filter((item) => item.type === "expenses").reduce((sum, item) => sum + item.amount, 0);
    const byCategory = records.filter((item) => item.type === type).reduce((groups, item) => {
      groups[item.category] = (groups[item.category] || 0) + item.amount;
      return groups;
    }, {});
    const total = type === "income" ? income : expenses;
    const categories = Object.entries(byCategory).sort(([, left], [, right]) => right - left);
    return { income, expenses, balance: income - expenses, total, categories };
  }, [transactions, type, period]);

  return (
    <main className="summary-page">
      <Navbar activePage="summary" />
      <section className="summary-content">
        <div className="summary-options">
          <div className="summary-toggle">
            <button type="button" className={type === "expenses" ? "selected is-expenses" : "is-expenses"} onClick={() => setType("expenses")}>Expenses</button>
            <button type="button" className={type === "income" ? "selected is-income" : "is-income"} onClick={() => setType("income")}>Income</button>
          </div>
          <div className="summary-toggle period-toggle">
            <button type="button" className={period === "this" ? "selected" : ""} onClick={() => setPeriod("this")}>This Month</button>
            <button type="button" className={period === "last" ? "selected" : ""} onClick={() => setPeriod("last")}>Last Month</button>
          </div>
        </div>

        {error && <p className="summary-message error" role="alert">{error}</p>}
        {loading && <p className="summary-message">Loading your summary…</p>}

        <div className="summary-grid">
          <section className={`breakdown-card ${type}`}>
            <p className="total-label">{type === "expenses" ? "Total Spent" : "Total Income"}</p>
            <strong className="total-spent">{formatCurrency(summary.total)}</strong>
            <h1>Category Breakdown</h1>
            <div className="category-list">
              {summary.categories.length === 0 && <p className="empty-summary">No {type} for this period.</p>}
              {summary.categories.map(([name, amount]) => {
                const percent = summary.total ? (amount / summary.total) * 100 : 0;
                return <div className="category-row" key={name}>
                  <div><span>{name}</span><span>{formatCurrency(amount)} ({percent.toFixed(0)}%)</span></div>
                  <div className="progress"><i style={{ width: `${percent}%` }} /></div>
                </div>;
              })}
            </div>
          </section>
          <aside className={`balance-card ${summary.balance < 0 ? "negative" : ""}`}><span>Available Balance</span><strong>{formatCurrency(summary.balance)}</strong></aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Summary;
