import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { clearSession } from "../services/session";


function Navbar({ activePage }) {
  const handleLogout = () => {
    clearSession();
  };

  return (
    <header className="site-navbar">
      <h1 className="site-brand">
        Money Tracker
      </h1>
      <nav className="site-nav-links" aria-label="Main navigation">
        <Link className={activePage === "home" ? "active" : ""} to="/home">
          Home
        </Link>
        <Link
          className={activePage === "transactions" ? "active" : ""}
          to="/transactions"
        >
          Transactions
        </Link>
        <Link className={activePage === "summary" ? "active" : ""} to="/summary">
          Summary
        </Link>
      </nav>
      <div className="site-nav-actions">
        <Link to="/profile" aria-label="Profile">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="9" r="2.2" />
            <path d="M8.2 16c.8-1.7 2.1-2.6 3.8-2.6s3 .9 3.8 2.6" />
          </svg>
        </Link>
        <Link to="/login" aria-label="Log out" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 5H6.5v14H10M14 8l4 4-4 4M18 12H9" />
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
