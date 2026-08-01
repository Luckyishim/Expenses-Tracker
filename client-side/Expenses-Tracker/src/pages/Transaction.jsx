import "../styles/Transaction.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CategoryIcon = ({ type }) => {
  if (type === "food")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M16 3v18M13 3v6h6V3" />
      </svg>
    );
  if (type === "transport")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h11l3 4v6H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
        <path d="M15 7v5h4M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM16 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 9h.1M18 15h.1" />
    </svg>
  );
};

function Transaction() {
  const transactions = [
    [
      "Food & Dining",
      "Weekly groceries",
      "Nov 24, 2024",
      "-$142.50",
      "food",
      "expense",
    ],
    [
      "Transportation",
      "Gas refill",
      "Nov 22, 2024",
      "-$65.00",
      "transport",
      "expense",
    ],
    [
      "Salary",
      "Monthly paycheck",
      "Nov 20, 2024",
      "+$3,200.00",
      "salary",
      "income",
    ],
  ];

  return (
    <main className="transactions-page">
      <Navbar activePage="transactions" />

      <section className="transactions-content" aria-label="Transactions">
        <div className="transaction-switch">
          <button className="selected" type="button">
            Expenses
          </button>
          <button type="button">Income</button>
        </div>
        <form className="transaction-filters">
          <label>
            Category
            <div className="select-field">
              All Categories <span>⌄</span>
            </div>
          </label>
          <label>
            From
            <input type="text" placeholder="mm/dd/yyyy" />
          </label>
          <label>
            To
            <input type="text" placeholder="mm/dd/yyyy" />
          </label>
          <button type="button" className="apply-filter">
            Apply
          </button>
          <button type="button" className="clear-filter">
            Clear Filters
          </button>
        </form>

        <div className="transactions-table-wrap">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Note</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(
                ([category, note, date, amount, type, status]) => (
                  <tr key={category}>
                    <td>
                      <span className="category-icon">
                        <CategoryIcon type={type} />
                      </span>
                      {category}
                    </td>
                    <td>{note}</td>
                    <td>{date}</td>
                    <td className={status}>{amount}</td>
                    <td>
                      <button
                        type="button"
                        aria-label={`Edit ${category}`}
                        className="row-action"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="m4 16.5-.5 4 4-.5L18 9.5 14.5 6 4 16.5Z" />
                          <path d="m13.5 7 3.5 3.5" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${category}`}
                        className="row-action"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Transaction;
