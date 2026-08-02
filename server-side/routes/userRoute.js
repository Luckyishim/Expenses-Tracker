import express from "express";
import { getCurrentUser, loginUser, registerUser, updateCurrentUser } from "../controller/UserController.js";
import { requireAuth } from "../middleware/jwtMiddleware.js";

// Defines public registration/login endpoints and protected current-user endpoints.
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", requireAuth, getCurrentUser);
router.put("/me", requireAuth, updateCurrentUser);

export default router;
