import "../styles/CreateAccount.css";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import Eye_Closed from "../assets/Eye_Closed.png";
import Eye from "../assets/Eye.png"

//Collects data to create new accounts
function CreateAccount() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ mode: "onBlur" });



  const password = useWatch({ control, name: "password" });

  const submitCall = async (data) => {
    setSubmitError("");

    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);

      reset();
      navigate("/login", { state: { message: response.data.message } });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || "Unable to create your account. Please try again."
      );
    }
  };

  return (
    <main className="create-account-page">
      <header className="create-brand">
        <div className="brand-line">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v9.5A2.5 2.5 0 0 1 15.5 19H8.2A3.2 3.2 0 0 1 5 15.8V7.5A3 3 0 0 1 8 4.5Z" />
              <path d="M9 8.5h6v7H9zM12 11h4" />
            </svg>
          </div>
          <h1>Money Tracker</h1>
        </div>
        <p>Start your journey to financial serenity.</p>
      </header>

      <section className="create-account-card">
        <form onSubmit={handleSubmit(submitCall)} className="create-fields" noValidate>
          <div className="create-field">
            <label htmlFor="full-name">Full Name</label>
            <div className={`create-input${errors.fullName ? " error" : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3" />
                <path d="M5.5 19c.8-3 2.8-4.5 6.5-4.5s5.7 1.5 6.5 4.5" />
              </svg>
              <input
                id="full-name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                {...register("fullName", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Full Name must be at least 3 characters" }
                })}
              />
            </div>
            {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
          </div>

          <div className="create-field">
            <label htmlFor="create-email">Email Address</label>
            <div className={`create-input${errors.email ? " error" : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                <path d="m4.5 7 7.5 5.5L19.5 7" />
              </svg>
              <input
                id="create-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" }
                })}
              />
            </div>
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          <div className="create-field">
            <label htmlFor="create-password">Password</label>
            <div className={`create-input${errors.password ? " error" : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect x="5.5" y="10.5" width="13" height="10" rx="1.5" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
              </svg>
              <input
                id="create-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="new-password"
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

          <div className="create-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className={`create-input${errors.confirmPassword ? " error" : ""}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 3.5 18.5 6v5c0 4.2-2.7 7.7-6.5 9.5C8.2 18.7 5.5 15.2 5.5 11V6L12 3.5Z" />
              </svg>
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match"
                })}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <img src={showConfirmPassword ? Eye_Closed : Eye} alt="" />
              </button>
            </div>
            {errors.confirmPassword && <p className="field-error">{errors.confirmPassword.message}</p>}
          </div>

          {submitError && <p className="form-message error" role="alert">{submitError}</p>}

          <button className="create-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="login-copy">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </section>
    </main>
  );
}

export default CreateAccount;

