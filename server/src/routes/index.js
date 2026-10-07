import { Router } from "express";
import authRoutes from "./auth.routes.js";
import propertyRoutes from "./property.routes.js";
import leadRoutes from "./lead.routes.js";
import bookingRoutes from "./booking.routes.js";
import shortlistRoutes from "./shortlist.routes.js";
import blogRoutes from "./blog.routes.js";
import metaRoutes from "./meta.routes.js";
import { successResponse } from "../utils/apiResponse.js";

const apiRouter = Router();

// Health Check
apiRouter.get("/health", (req, res) => {
  return successResponse(res, { status: "healthy", timestamp: new Date().toISOString() }, "API is active");
});

apiRouter.use("/auth", authRoutes);
apiRouter.use("/properties", propertyRoutes);
apiRouter.use("/leads", leadRoutes);
apiRouter.use("/bookings", bookingRoutes);
apiRouter.use("/shortlists", shortlistRoutes);
apiRouter.use("/blogs", blogRoutes);
apiRouter.use("/meta", metaRoutes);

export default apiRouter;
