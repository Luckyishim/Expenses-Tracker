import { createHmac, randomBytes, timingSafeEqual } from "crypto";

// Signs short-lived session tokens and verifies them before protected API requests.
const tokenSecret = process.env.AUTH_SECRET || randomBytes(32).toString("hex");
const tokenLifetimeSeconds = 60 * 60 * 24;

const sign = (value) => createHmac("sha256", tokenSecret).update(value).digest("base64url");

export const createAuthToken = (userId) => {
  const payload = Buffer.from(JSON.stringify({ sub: userId, exp: Math.floor(Date.now() / 1000) + tokenLifetimeSeconds })).toString("base64url");
  return `${payload}.${sign(payload)}`;
};

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return res.status(401).json({ message: "Please log in to continue" });
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return res.status(401).json({ message: "Your session is invalid. Please log in again" });
  }

  const expectedSignature = sign(payload);
  const signaturesMatch = signature.length === expectedSignature.length
    && timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

  if (!signaturesMatch) {
    return res.status(401).json({ message: "Your session is invalid. Please log in again" });
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session.sub || session.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: "Your session has expired. Please log in again" });
    }

    req.user = { id: session.sub };
    next();
  } catch {
    return res.status(401).json({ message: "Your session is invalid. Please log in again" });
  }
};
