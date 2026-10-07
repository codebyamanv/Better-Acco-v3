import { Router } from "express";
import { toggleShortlist, getMyShortlists } from "../controllers/shortlist.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getMyShortlists);
router.post("/:propertyId", authenticate, toggleShortlist);

export default router;
