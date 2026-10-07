import { z } from "zod";
import prisma from "../config/db.js";
import { successResponse } from "../utils/apiResponse.js";

export const createLeadSchema = z
  .object({
    name: z.string().optional(),
    fullName: z.string().optional(),
    email: z.string().email("Invalid email format"),
    countryCode: z.string().optional().default("UK +44"),
    phone: z.string().optional(),
    university: z.string().optional(),
    propertyId: z.string().optional(),
    sourcePage: z.string().optional().default("Website"),
    preferredTerm: z.string().optional(),
    preferredRoomType: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine((data) => data.name || data.fullName, {
    message: "Name is required",
    path: ["name"],
  });

export async function createLead(req, res, next) {
  try {
    const { email, countryCode, phone, university, propertyId, sourcePage, notes } = req.body;
    const name = req.body.name || req.body.fullName || "Student";

    const lead = await prisma.lead.create({
      data: {
        name,
        email: email.toLowerCase(),
        countryCode: countryCode || "UK +44",
        phone: phone || null,
        university: university || null,
        propertyId: propertyId || null,
        sourcePage: notes ? `${sourcePage || "Website"}: ${notes}` : (sourcePage || "Website"),
        status: "NEW",
      },
    });

    return successResponse(
      res,
      lead,
      "Consultation request submitted! Our specialist will reach out within 24 hours.",
      201
    );
  } catch (error) {
    next(error);
  }
}

export async function getLeads(req, res, next) {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse(res, leads, "Leads list retrieved");
  } catch (error) {
    next(error);
  }
}
