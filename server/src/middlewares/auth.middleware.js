import { verifyToken } from "../utils/jwt.js";
import { errorResponse } from "../utils/apiResponse.js";
import prisma from "../config/db.js";

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Authentication required. Please provide a valid token.", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return errorResponse(res, "Invalid or expired session token.", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        university: true,
        city: true,
        country: true,
        phone: true,
      },
    });

    if (!user) {
      return errorResponse(res, "User not found or deactivated.", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, "Authentication failed.", 500, error.message);
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return errorResponse(res, "Access denied. Insufficient permissions.", 403);
    }
    next();
  };
}

export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (decoded && decoded.userId) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, role: true },
      });
      if (user) req.user = user;
    }
  }
  next();
}
