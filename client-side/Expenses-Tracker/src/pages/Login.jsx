import "../styles/Login.css";

function Login() {
  return (
    <main className="login-page">
      <section className="login-content" aria-label="Money Tracker login">
        <header className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v9.5A2.5 2.5 0 0 1 15.5 19H8.2A3.2 3.2 0 0 1 5 15.8V7.5A3 3 0 0 1 8 4.5Z" />
              <path d="M9 8.5h6v7H9zM12 11h4" />
            </svg>
          </div>
          <h1>Money Tracker</h1>
          <p>Tactile Finance Management</p>
        </header>

        <div className="login-card">
          <div className="field-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrap">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                <path d="m4.5 7 7.5 5.5L19.5 7" />
              </svg>
              <input id="email" type="email" placeholder="Enter your email" />
            </div>
          </div>

          <div className="field-group password-group">
              <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="5.5" y="10.5" width="13" height="10" rx="1.5" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
              </svg>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button className="login-button" type="button">
            Log In <span>→</span>
          </button>
        </div>

        <p className="signup-copy">
          Don't have an account? <a href="/create-account">Sign up</a>
        </p>
      </section>
    </main>
  );
}

export default Login;
