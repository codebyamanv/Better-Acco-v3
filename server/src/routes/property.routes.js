import { Router } from "express";
import {
  getProperties,
  getPropertyByIdOrSlug,
  compareProperties,
  createProperty,
} from "../controllers/property.controller.js";

const router = Router();

router.get("/", getProperties);
router.post("/", createProperty);
router.get("/compare", compareProperties);
router.get("/:idOrSlug", getPropertyByIdOrSlug);

export default router;

