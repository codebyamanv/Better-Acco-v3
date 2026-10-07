import { errorResponse } from "../utils/apiResponse.js";

export function errorHandler(err, req, res, _next) {
  console.error("Unhandled error:", err);

  // Prisma unique constraint violation
  if (err.code === "P2002") {
    const field = err.meta?.target?.[0] || "field";
    return errorResponse(res, `A record with this ${field} already exists.`, 409);
  }

  // Prisma record not found
  if (err.code === "P2025") {
    return errorResponse(res, "The requested record was not found.", 404);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return errorResponse(res, message, statusCode);
}

export function notFoundHandler(req, res) {
  return errorResponse(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
}
