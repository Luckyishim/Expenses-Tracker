import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  // Keep the signing key outside source control so tokens cannot be forged from the codebase.
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return process.env.JWT_SECRET;
};

// Creates a standard, signed JWT for the authenticated user. It expires after one day.
export const createAuthToken = (userId) => jwt.sign(
  { sub: userId },
  getJwtSecret(),
  { expiresIn: "1d" },
);

// Verifies the Bearer JWT before allowing access to protected routes.
export const requireAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please log in to continue" });
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, getJwtSecret());

    // `sub` is the user id included when the token was created at login.
    if (typeof payload !== "object" || !payload.sub) {
      return res.status(401).json({ message: "Your session is invalid. Please log in again" });
    }

    req.user = { id: payload.sub };
    next();
  } catch (error) {
    const message = error.name === "TokenExpiredError"
      ? "Your session has expired. Please log in again"
      : "Your session is invalid. Please log in again";

    return res.status(401).json({ message });
  }
};
