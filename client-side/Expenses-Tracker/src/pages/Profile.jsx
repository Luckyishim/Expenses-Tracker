import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";
import { clearSession, getSession, saveSession } from "../services/session";

// Loads and updates the currently authenticated user's own profile details.
function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => getSession()?.user || { fullName: "", email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getProfile().then(setProfile).catch((requestError) => setError(requestError.message));
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await api.updateProfile(profile.fullName);
      setProfile(response.user);
      saveSession({ user: response.user, token: getSession().token });
      setMessage(response.message);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const signOut = () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;
    clearSession();
    navigate("/login");
  };

  return (
    <main className="profile-page">
      <Navbar />
      <section className="profile-content">
        <form className="profile-card" onSubmit={saveProfile}>
          <div className="profile-intro">
            <div className="profile-avatar">{profile.fullName?.charAt(0).toUpperCase() || "U"}</div>
            <div><h1>{profile.fullName || "Your Profile"}</h1><p>{profile.email}</p></div>
          </div>
          <div className="profile-details">
            <h2>Profile Details</h2>
            <label>Full Name
              <input type="text" value={profile.fullName || ""} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })} minLength="3" required />
            </label>
            <label>Email Address
              <input type="email" value={profile.email || ""} readOnly aria-readonly="true" />
            </label>
            {error && <p className="profile-message error" role="alert">{error}</p>}
            {message && <p className="profile-message success" role="status">{message}</p>}
            <button type="submit" className="save-button" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button>
          </div>
        </form>
        <aside className="account-card">
          <h2>Account</h2>
          <Link to="/transactions">Transaction History <span>›</span></Link>
          <Link to="/summary">Monthly Summary <span>›</span></Link>
          <button type="button" className="sign-out" onClick={signOut}>Sign Out <span>›</span></button>
        </aside>
      </section>
      <Footer />
    </main>
  );
}

export default Profile;
