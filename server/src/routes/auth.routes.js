import { Router } from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authenticate, getMe);
router.patch("/profile", authenticate, validate(updateProfileSchema), updateProfile);

export default router;
