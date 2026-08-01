import "../styles/Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveSession } from "../services/session";
import Eye_Closed from "../assets/Eye_Closed.png";
import Eye from "../assets/Eye.png"

// Validates data and sends users to the main page.
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ mode: "onBlur" });

  const submitLogin = async (data) => {
    setSubmitError("");

    try {
      const response = await axios.post("http://localhost:5067/api/auth/login", data);
      saveSession(response.data);
      navigate(location.state?.from || "/home", { replace: true });
    } catch (error) {
      setSubmitError(error.response?.data?.message || "Unable to log in. Please try again.");
    }
  };

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

        <form className="login-card" onSubmit={handleSubmit(submitLogin)} noValidate>
          {location.state?.message && (
            <p className="form-message success" role="status">{location.state.message}</p>
          )}

          <div className="field-group">
            <label htmlFor="email">Email Address</label>
            <div className={`input-wrap${errors.email ? " error" : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                <path d="m4.5 7 7.5 5.5L19.5 7" />
              </svg>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" }
                })}
              />
            </div>
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          <div className="field-group password-group">
            <label htmlFor="password">Password</label>
            <div className={`input-wrap${errors.password ? " error" : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="5.5" y="10.5" width="13" height="10" rx="1.5" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img src={showPassword ? Eye_Closed : Eye} alt="" />
              </button>
            </div>
            {errors.password && <p className="field-error">{errors.password.message}</p>}
          </div>

          {submitError && <p className="form-message error" role="alert">{submitError}</p>}

          <button className="login-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="signup-copy">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
