import "../styles/Profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  return (
    <main className="profile-page">
      <Navbar />
      <section className="profile-content">
        <section className="profile-card">
          <div className="profile-intro">
            <div className="profile-avatar">A</div>
            <div>
              <h1>Alex Morgan</h1>
              <p>alex.morgan@email.com</p>
            </div>
          </div>
          <div className="profile-details">
            <h2>Profile Details</h2>
            <label>
              Full Name
              <input type="text" value="Alex Morgan" readOnly />
            </label>
            <label>
              Email Address
              <input type="email" value="alex.morgan@email.com" readOnly />
            </label>
            <label>
              Monthly Budget
              <input type="text" value="$5,000.00" readOnly />
            </label>
            <button type="button" className="save-button">Save Changes</button>
          </div>
        </section>
        <aside className="account-card">
          <h2>Account</h2>
          <a href="/transactions">
            Transaction History <span>›</span>
          </a>
          <a href="/summary">
            Monthly Summary <span>›</span>
          </a>
          <a className="sign-out" href="/login">
            Sign Out <span>›</span>
          </a>
        </aside>
      </section>
      <Footer />
    </main>
  );
}
export default Profile;
