import { useState } from "react";
import "../styles/Summary.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Summary() {
  const [view, setView] = useState("expense");
  const [timeframe, setTimeframe] = useState("this");

  const expenseCategories = [
    ["Housing", "$1,800.00 (42%)", "42"],
    ["Food & Dining", "$850.00 (20%)", "20"],
    ["Transportation", "$420.00 (10%)", "10"],
    ["Entertainment", "$310.00 (7%)", "7"],
  ];

  const incomeCategories = [
    ["Salary", "$4,500.00 (77%)", "77"],
    ["Freelance", "$800.00 (14%)", "14"],
    ["Investments", "$350.00 (6%)", "6"],
  ];

  const totals = {
    this: { expenses: 4280.5, income: 5650, balance: 1370 },
    last: { expenses: 3890.75, income: 5020, balance: 1129.25 },
  };

  const currentTotals = totals[timeframe];
  const categories = view === "expense" ? expenseCategories : incomeCategories;

  const formatCurrency = (n) =>
    `$${n.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  return (
    <main className="summary-page">
     <Navbar activePage="summary" />
      <section className="summary-content">
        <div className="summary-options">
          <div className="summary-toggle">
            <button
              type="button"
              className={view === "expense" ? "selected" : ""}
              onClick={() => setView("expense")}
            >
              Expenses
            </button>
            <button
              type="button"
              className={view === "income" ? "selected" : ""}
              onClick={() => setView("income")}
            >
              Income
            </button>
          </div>

          <div className="summary-toggle period-toggle">
            <button
              type="button"
              className={timeframe === "this" ? "selected" : ""}
              onClick={() => setTimeframe("this")}
            >
              This Month
            </button>
            <button
              type="button"
              className={timeframe === "last" ? "selected" : ""}
              onClick={() => setTimeframe("last")}
            >
              Last Month
            </button>
          </div>
        </div>

        <div className="summary-grid">
          <section className="breakdown-card">
            <p className="total-label">{view === "expense" ? "Total Spent" : "Total Income"}</p>
            <strong className="total-spent">
              {view === "expense" ? formatCurrency(currentTotals.expenses) : formatCurrency(currentTotals.income)}
            </strong>
            <h1>Category Breakdown</h1>
            <div className="category-list">
              {categories.map(([name, amount, percent]) => (
                <div className="category-row" key={name}>
                  <div>
                    <span>{name}</span>
                    <span>{amount}</span>
                  </div>
                  <div className="progress">
                    <i style={{ width: `${percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <aside className="balance-card">
            <span>Available Balance</span>
            <strong>{formatCurrency(currentTotals.balance)}</strong>
          </aside>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
export default Summary;
