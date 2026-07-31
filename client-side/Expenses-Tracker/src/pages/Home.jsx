import "../styles/Home.css";

const ArrowUp = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6" /></svg>;

function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <a className="home-logo" href="/">Money Tracker</a>
        <nav className="home-nav" aria-label="Main navigation">
          <a className="active" href="/">Home</a>
          <a href="/transactions">Transactions</a>
          <a href="/summary">Summary</a>
        </nav>
        <div className="header-actions">
          <button type="button" aria-label="Account"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="9" r="2.2" /><path d="M8.2 16c.8-1.7 2.1-2.6 3.8-2.6s3 .9 3.8 2.6" /></svg></button>
          <button type="button" aria-label="Log out"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H6.5v14H10M14 8l4 4-4 4M18 12H9" /></svg></button>
        </div>
      </header>

      <section className="dashboard" aria-label="Financial overview">
        <div className="summary-cards">
          <article className="summary-card expenses"><span>Expenses</span><strong>$2,450.00</strong><small><ArrowUp /> 8% from last month</small></article>
          <article className="summary-card income"><span>Income</span><strong>$5,200.00</strong><small><ArrowUp /> 2% from last month</small></article>
          <article className="summary-card balance"><span>Balance</span><strong>$2,750.00</strong><small><i /> On track with budget</small></article>
        </div>

        <div className="entry-switch" aria-label="Transaction type"><button className="selected" type="button">Expense</button><button type="button">Income</button></div>

        <div className="dashboard-content">
          <section className="expense-panel">
            <h1><span>−</span> Add Expense</h1>
            <form>
              <label>Amount<div className="amount-input"><b>$</b><input type="text" placeholder="0.00" /></div></label>
              <label>Category<input type="text" value="Housing & Rent" readOnly /></label>
              <label>Date<div className="date-input"><input type="text" placeholder="mm/dd/yyyy" /><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="6" width="14" height="13" rx="1" /><path d="M8 4v4M16 4v4M5 10h14" /></svg></div></label>
              <label>Note (Optional)<textarea placeholder="Add a description..." /></label>
              <button className="add-transaction" type="button">Add Transaction</button>
            </form>
          </section>

          <section className="history-panel">
            <div className="history-heading"><h2>Recent History</h2><a href="/transactions">View All</a></div>
            <div className="empty-history" aria-live="polite">No recent transactions</div>
          </section>
        </div>
      </section>

      <footer className="home-footer"><strong>Money Tracker</strong><span>© 2024 Money Tracker. Tactile Finance Management.</span></footer>
    </main>
  );
}

export default Home;
