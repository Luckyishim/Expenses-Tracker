import "../styles/Navbar.css";

function Navbar({ activePage }) {
  return <header className="site-navbar"><a className="site-brand" href="/home">Money Tracker</a><nav className="site-nav-links" aria-label="Main navigation"><a className={activePage === "home" ? "active" : ""} href="/home">Home</a><a className={activePage === "transactions" ? "active" : ""} href="/transactions">Transactions</a><a className={activePage === "summary" ? "active" : ""} href="/summary">Summary</a></nav><div className="site-nav-actions"><a href="/profile" aria-label="Profile"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="9" r="2.2" /><path d="M8.2 16c.8-1.7 2.1-2.6 3.8-2.6s3 .9 3.8 2.6" /></svg></a><a href="/login" aria-label="Log out"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H6.5v14H10M14 8l4 4-4 4M18 12H9" /></svg></a></div></header>;
}

export default Navbar;
