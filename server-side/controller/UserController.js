import User from "../model/User.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        const normalizedName = fullName?.trim();
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedName || !normalizedEmail || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email" });
        }
        const user = new User({ fullname: normalizedName, email: normalizedEmail, password });
        await user.save();
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
};

//Checking registered users names
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().select("fullname email createdAt").sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to retrieve users" });
    }
};

// Verifies the credentials submitted by the login form.
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, fullName: user.fullname, email: user.email },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to log in" });
    }
};
