import { Link } from "react-router-dom";
function Login() {
    return (
    <div className="login-page">
        <div>
            <h1>Money Tracker</h1>
        </div>
        <div className="login-form">
            <label>Email Address</label>
            <div>
                <input type="email" placeholder="Email" />
            </div>
            <label>Password</label>
            <div>
                <input type="password" placeholder="Password" />
            </div>
            <div className="remember">
                <input type="checkbox" />
                    <span>Keep me logged in</span>
            </div>
            <div>
                <button type="submit">Log In</button>
            </div>
        </div>
        <p>Don't have an account? <Link to="/create-account">Sign up</Link></p>
    </div>
    );
};
export default Login;