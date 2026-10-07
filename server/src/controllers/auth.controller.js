import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "../config/db.js";
import { signToken } from "../utils/jwt.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional().nullable(),
  role: z
    .preprocess(
      (val) => (typeof val === "string" ? val.toUpperCase() : val),
      z.enum(["STUDENT", "PARTNER"])
    )
    .optional()
    .default("STUDENT"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const updateProfileSchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  university: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
});

export async function register(req, res, next) {
  try {
    const { fullName, email, password, phone, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return errorResponse(res, "An account with this email already exists.", 409);
    }

    const nameParts = (fullName || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || "";

    const baseUsername = email.toLowerCase().split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
    const username = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        username,
        phone: phone || null,
        role: role || "STUDENT",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        role: true,
        phone: true,
        university: true,
        city: true,
        country: true,
        avatar: true,
      },
    });

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    return successResponse(res, { user, token }, "Account created successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return errorResponse(res, "Invalid email or password.", 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return errorResponse(res, "Invalid email or password.", 401);
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      phone: user.phone,
      university: user.university,
      city: user.city,
      country: user.country,
      avatar: user.avatar,
    };

    return successResponse(res, { user: safeUser, token }, "Login successful");
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    return successResponse(res, req.user, "User profile retrieved");
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        role: true,
        phone: true,
        university: true,
        city: true,
        country: true,
        avatar: true,
      },
    });

    return successResponse(res, updated, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
}
