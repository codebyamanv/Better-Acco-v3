import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export async function toggleShortlist(req, res, next) {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    // Find property by id or slug
    const property = await prisma.property.findFirst({
      where: { OR: [{ id: propertyId }, { slug: propertyId }] },
    });

    if (!property) {
      return errorResponse(res, "Property not found", 404);
    }

    const existing = await prisma.shortlist.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId: property.id,
        },
      },
    });

    if (existing) {
      await prisma.shortlist.delete({
        where: { id: existing.id },
      });
      return successResponse(res, { isShortlisted: false }, "Removed from shortlists");
    }

    await prisma.shortlist.create({
      data: {
        userId,
        propertyId: property.id,
      },
    });

    return successResponse(res, { isShortlisted: true }, "Added to shortlists");
  } catch (error) {
    next(error);
  }
}

export async function getMyShortlists(req, res, next) {
  try {
    const shortlists = await prisma.shortlist.findMany({
      where: { userId: req.user.id },
      include: {
        property: {
          include: {
            images: { take: 1 },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(
      res,
      shortlists.map((s) => s.property),
      "Shortlisted properties retrieved"
    );
  } catch (error) {
    next(error);
  }
}
