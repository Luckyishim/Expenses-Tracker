import "../styles/Summary.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Summary() {
  const categories = [
    ["Housing", "$1,800.00 (42%)", "42"],
    ["Food & Dining", "$850.00 (20%)", "20"],
    ["Transportation", "$420.00 (10%)", "10"],
    ["Entertainment", "$310.00 (7%)", "7"],
  ];
  return (
    <main className="summary-page">
     <Navbar activePage="summary" />
      <section className="summary-content">
        <div className="summary-options">
          <div className="summary-toggle">
            <button className="selected" type="button">
              Expenses
            </button>
            <button type="button">Income</button>
          </div>
          <div className="summary-toggle period-toggle">
            <button className="selected" type="button">
              This Month
            </button>
            <button type="button">Last Month</button>
          </div>
        </div>
        <div className="summary-grid">
          <section className="breakdown-card">
            <p className="total-label">Total Spent</p>
            <strong className="total-spent">$4,280.50</strong>
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
            <strong>$12,450.80</strong>
          </aside>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
export default Summary;
