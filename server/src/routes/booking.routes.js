import { Router } from "express";
import {
  createBooking,
  getMyBookings,
  createBookingSchema,
} from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/", authenticate, validate(createBookingSchema), createBooking);
router.get("/my-bookings", authenticate, getMyBookings);

export default router;
