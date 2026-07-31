import "../styles/CreateAccount.css";

function CreateAccount() {
  return (
    <main className="create-account-page">
      <section className="create-account-card" aria-label="Create a Money Tracker account">
        <header className="create-brand">
          <div className="brand-line">
            <svg aria-hidden="true" viewBox="0 0 30 30"><path d="M5 4.5h15.5a2.5 2.5 0 0 1 2.5 2.5v16a2.5 2.5 0 0 1-2.5 2.5H8a3 3 0 0 1-3-3V7.5A3 3 0 0 1 8 4.5Z" /><path d="M10 10h8v8h-8zM14 14h5" /></svg>
            <h1>Money Tracker</h1>
          </div>
          <p>Start your journey to financial serenity.</p>
        </header>

        <div className="create-fields">
          <div className="create-field">
            <label htmlFor="full-name">Full Name</label>
            <div className="create-input">
              <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" /><path d="M5.5 19c.8-3 2.8-4.5 6.5-4.5s5.7 1.5 6.5 4.5" /></svg>
              <input id="full-name" type="text" placeholder="Enter your name" />
            </div>
          </div>

          <div className="create-field">
            <label htmlFor="create-email">Email Address</label>
            <div className="create-input">
              <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="m4.5 7 7.5 5.5L19.5 7" /></svg>
              <input id="create-email" type="email" placeholder="email@example.com" />
            </div>
          </div>

          <div className="password-row">
            <div className="create-field">
              <label htmlFor="create-password">Password</label>
              <div className="create-input">
                <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5.5" y="10.5" width="13" height="10" rx="1.5" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" /></svg>
                <input id="create-password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="create-field">
              <label htmlFor="confirm-password">Confirm</label>
              <div className="create-input">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3.5 18.5 6v5c0 4.2-2.7 7.7-6.5 9.5C8.2 18.7 5.5 15.2 5.5 11V6L12 3.5Z" /></svg>
                <input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
            </div>
          </div>
        </div>

        <label className="terms"><input type="checkbox" /><span>I agree to the <a href="#terms">Terms of Service</a></span></label>
        <button className="create-button" type="button">Create Account <span>→</span></button>
        <p className="login-copy">Already have an account? <a href="/login">Log in</a></p>
      </section>
    </main>
  );
}

export default CreateAccount;
