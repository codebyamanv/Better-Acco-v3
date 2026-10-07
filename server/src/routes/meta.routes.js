import { Router } from "express";
import { getPopularCities, getUniversities, subscribeNewsletter } from "../controllers/meta.controller.js";

const router = Router();

router.get("/cities", getPopularCities);
router.get("/universities", getUniversities);
router.post("/newsletter", subscribeNewsletter);

export default router;

