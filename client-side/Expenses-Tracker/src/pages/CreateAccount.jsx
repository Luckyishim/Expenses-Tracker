import { Link } from "react-router-dom";
function CreateAccount() {
    return (
    <div className="create-account-page">
        <div>
            <h1>Money Tracker</h1>
        </div>
        <div className="create-account-form">
            <label>Full Name</label>
            <div>
                <input type="text" placeholder="Enter your name" />
            </div>
            <label>Email Address</label>
            <div>
                <input type="email" placeholder="Email" />
            </div>
            <label>Password</label>
            <div>
                <input type="password" placeholder="Password" />
            </div>
             <label>Confirm Password</label>
            <div>
                <input type="password" placeholder="Confirm Password"/>
            </div> 
            <div className="remember">
                <input type="checkbox" />
                    <span>I agree to the Terms and Conditions</span>
            </div>
            <div>
                <button type="submit">Create Account</button>
            </div>
        </div>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
    );
};
export default CreateAccount;