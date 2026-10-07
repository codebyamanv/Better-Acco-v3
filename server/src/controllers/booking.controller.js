import { z } from "zod";
import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createBookingSchema = z.object({
  roomTypeId: z.string(),
  roomVariantId: z.string().optional(),
  propertyId: z.string().optional(),
  duration: z.string(),
  moveInDate: z.string(),
  pricePerWeek: z.number(),
  totalAmount: z.number().optional(),
  depositAmount: z.number().optional(),
});

export async function createBooking(req, res, next) {
  try {
    const {
      roomTypeId,
      roomVariantId,
      propertyId,
      duration,
      moveInDate,
      pricePerWeek,
      totalAmount,
      depositAmount,
    } = req.body;

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        propertyId,
        roomTypeId,
        roomVariantId,
        duration,
        moveInDate,
        pricePerWeek,
        totalAmount: totalAmount || pricePerWeek * 51,
        depositAmount: depositAmount || 200,
        status: "PENDING",
      },
      include: {
        roomType: true,
      },
    });

    return successResponse(res, booking, "Booking request submitted successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function getMyBookings(req, res, next) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: {
        roomType: {
          include: {
            property: {
              include: { images: { take: 1 } },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(res, bookings, "Bookings retrieved");
  } catch (error) {
    next(error);
  }
}
