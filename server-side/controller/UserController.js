import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import User from "../model/User.js";
import { createAuthToken } from "../middleware/jwtMiddleware.js";

const scrypt = promisify(scryptCallback);

// Hashes passwords with a per-user salt before they are stored in MongoDB.
const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
};

const passwordMatches = async (password, storedPassword) => {
  if (!storedPassword.includes(":")) {
    return password === storedPassword;
  }

  const [salt, storedHash] = storedPassword.split(":");
  const derivedKey = await scrypt(password, salt, 64);
  return timingSafeEqual(Buffer.from(storedHash, "hex"), derivedKey);
};

const userResponse = (user) => ({ id: user._id, fullName: user.fullname, email: user.email });

// Creates a user after validating and securely hashing their password.
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
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const user = await User.create({
      fullname: normalizedName,
      email: normalizedEmail,
      password: await hashPassword(password),
    });
    res.status(201).json({ message: "User registered successfully", user: userResponse(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to register user" });
  }
};

// Verifies credentials and returns the signed JWT used by protected requests.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await passwordMatches(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Converts accounts made before password hashing to the safer format after login.
    if (!user.password.includes(":")) {
      user.password = await hashPassword(password);
      await user.save();
    }

    res.status(200).json({
      message: "Login successful",
      token: createAuthToken(user._id.toString()),
      user: userResponse(user),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to log in" });
  }
};

// Returns the profile belonging to the authenticated session only.
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("fullname email createdAt");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(userResponse(user));
};

// Updates the signed-in user's display name without allowing access to another user.
export const updateCurrentUser = async (req, res) => {
  const fullName = req.body.fullName?.trim();
  if (!fullName || fullName.length < 3) {
    return res.status(400).json({ message: "Full name must be at least 3 characters" });
  }

  const user = await User.findByIdAndUpdate(req.user.id, { fullname: fullName }, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "Profile updated", user: userResponse(user) });
};
