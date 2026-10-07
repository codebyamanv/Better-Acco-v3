import { Router } from "express";
import { createLead, getLeads, createLeadSchema } from "../controllers/lead.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/", validate(createLeadSchema), createLead);
router.get("/", getLeads);

export default router;
