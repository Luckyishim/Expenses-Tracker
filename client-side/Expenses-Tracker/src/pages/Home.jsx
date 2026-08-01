import { useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const [transactionType, setTransactionType] = useState("expense");
  const isIncome = transactionType === "income";

  return (
    <div>
      <Navbar activePage="home" />
      <section className="dashboard" aria-label="Financial overview">


        <div className="summary-cards">
          <article className="summary-card expenses"><span>Expenses</span><strong>
            $2,450.00
          </strong></article>
          <article className="summary-card income"><span>Income</span><strong>
            $5,200.00
          </strong></article>
          <article className="summary-card balance"><span>Balance</span><strong>
            $2,750.00
          </strong></article>
        </div>

        <div className="entry-switch" aria-label="Transaction type">
          <button className={!isIncome ? "selected" : ""} type="button" onClick={() => setTransactionType("expense")}>Expense</button>
          <button className={isIncome ? "selected is-income" : ""} type="button" onClick={() => setTransactionType("income")}>Income</button>
        </div>

        <div className="dashboard-content">
          <section className={`expense-panel ${isIncome ? "income-panel" : ""}`}>
            <h1><span>{isIncome ? "+" : "−"}</span> Add {isIncome ? "Income" : "Expense"}</h1>
            <form>
              <label>Amount<div className="amount-input"><b>$</b><input type="text" placeholder="0.00" /></div></label>
              <label>Category<input type="text" value={isIncome ? "Salary & Wages" : "Housing & Rent"} readOnly /></label>
              <label>
                Date
                <div className="date-input">
                  <input type="text" placeholder="mm/dd/yyyy" />
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="6" width="14" height="13" rx="1" /><path d="M8 4v4M16 4v4M5 10h14" /></svg>
                </div>
              </label>
              <label>Note (Optional)<textarea placeholder="Add a description..." /></label>
              <button className="add-transaction" type="button">Add {isIncome ? "Income" : "Expense"}</button>
            </form>
          </section>

          <section className="history-panel">
            <div className="history-heading"><h2>Recent History</h2><a href="/transactions">View All</a></div>
            <div className="empty-history" aria-live="polite">No recent transactions</div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
