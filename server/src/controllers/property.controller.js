import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export async function getProperties(req, res, next) {
  try {
    const {
      search,
      city,
      country,
      minPrice,
      maxPrice,
      minRating,
      roomType,
      leaseType,
      amenities,
      sortBy = "recommended",
      page = 1,
      limit = 10,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const take = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * take;

    const where = {};

    // Free text search
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { country: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }

    // Direct filters
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (country) where.country = { contains: country, mode: "insensitive" };
    if (roomType) {
      const types = roomType.split(",").map((t) => t.trim());
      where.roomType = { in: types };
    }
    if (leaseType) {
      const leases = leaseType.split(",").map((l) => l.trim());
      where.leaseType = { in: leases };
    }
    if (minRating) {
      where.rating = { gte: parseFloat(minRating) };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.pricePerWeek = {};
      if (minPrice) where.pricePerWeek.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerWeek.lte = parseFloat(maxPrice);
    }

    // Amenities filter
    if (amenities) {
      const amenityList = amenities.split(",").map((a) => a.trim());
      where.amenities = {
        some: {
          amenity: {
            name: { in: amenityList },
          },
        },
      };
    }

    // Sort order
    let orderBy = { createdAt: "desc" };
    if (sortBy === "price_asc") orderBy = { pricePerWeek: "asc" };
    else if (sortBy === "price_desc") orderBy = { pricePerWeek: "desc" };
    else if (sortBy === "rating") orderBy = { rating: "desc" };

    const [total, properties] = await Promise.all([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          amenities: { include: { amenity: true } },
          offers: true,
        },
      }),
    ]);

    // Format properties for frontend
    const formatted = properties.map((p) => ({
      id: p.slug || p.id,
      internalId: p.id,
      title: p.title,
      address: p.address,
      city: p.city,
      country: p.country,
      distanceFromCenter: p.distanceFromCenter,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      ratingText: p.ratingText,
      propertyType: p.propertyType,
      badge: p.badge,
      pricePerWeek: Number(p.pricePerWeek),
      currencySymbol: p.currencySymbol,
      beds: p.beds,
      baths: p.baths,
      roomType: p.roomType,
      leaseType: p.leaseType,
      tags: p.tags,
      images: p.images.map((img) => img.url),
      amenities: p.amenities.map((pa) => pa.amenity.name),
      offers: p.offers,
    }));

    return successResponse(
      res,
      {
        properties: formatted,
        pagination: {
          total,
          page: pageNum,
          limit: take,
          totalPages: Math.ceil(total / take),
        },
      },
      "Properties retrieved"
    );
  } catch (error) {
    next(error);
  }
}

export async function getPropertyByIdOrSlug(req, res, next) {
  try {
    const { idOrSlug } = req.params;

    const property = await prisma.property.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        amenities: { include: { amenity: true } },
        offers: true,
        roomTypes: {
          include: {
            variants: true,
          },
        },
        reviews: {
          include: {
            user: { select: { firstName: true, lastName: true, avatar: true } },
          },
        },
      },
    });

    if (!property) {
      return errorResponse(res, "Property not found", 404);
    }

    const formatted = {
      id: property.slug,
      internalId: property.id,
      title: property.title,
      address: property.address,
      city: property.city,
      country: property.country,
      distanceFromCenter: property.distanceFromCenter,
      rating: property.rating,
      reviewsCount: property.reviewsCount,
      ratingText: property.ratingText,
      propertyType: property.propertyType,
      badge: property.badge,
      pricePerWeek: Number(property.pricePerWeek),
      currencySymbol: property.currencySymbol,
      beds: property.beds,
      baths: property.baths,
      roomType: property.roomType,
      leaseType: property.leaseType,
      description: property.description,
      tags: property.tags,
      cancellationPolicies: property.cancellationPolicies,
      paymentPolicies: property.paymentPolicies,
      images: property.images.map((img) => img.url),
      amenities: property.amenities.map((pa) => pa.amenity.name),
      billsIncluded: [
        { name: "Electricity", included: true },
        { name: "Wifi", included: true },
        { name: "Gas", included: true },
        { name: "Water", included: true },
      ],
      offers: property.offers,
      roomTypes: property.roomTypes.map((rt) => ({
        id: rt.id,
        name: rt.name,
        priceRange: rt.priceRange,
        availableFrom: rt.availableFrom,
        specs: rt.specs,
        image: rt.image,
        variants: rt.variants.map((v) => ({
          id: v.id,
          duration: v.duration,
          moveIn: v.moveInDate,
          note: v.floorNote,
          price: Number(v.price),
          status: v.status.toLowerCase(),
        })),
      })),
      reviews: property.reviews.map((r) => ({
        id: r.id,
        author: `${r.user.firstName} ${r.user.lastName}`.trim(),
        avatar: r.user.avatar,
        rating: r.rating,
        date: "Recently",
        comment: r.comment,
      })),
    };

    return successResponse(res, formatted, "Property detail retrieved");
  } catch (error) {
    next(error);
  }
}

export async function compareProperties(req, res, next) {
  try {
    const { ids } = req.query;
    if (!ids) {
      return errorResponse(res, "Please specify ids query param, e.g. ?ids=slug1,slug2", 400);
    }

    const idList = ids.split(",").map((s) => s.trim());

    const properties = await prisma.property.findMany({
      where: {
        OR: [{ id: { in: idList } }, { slug: { in: idList } }],
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        amenities: { include: { amenity: true } },
      },
    });

    const formatted = properties.map((p) => ({
      id: p.slug,
      internalId: p.id,
      title: p.title,
      pricePerWeek: Number(p.pricePerWeek),
      currencySymbol: p.currencySymbol,
      propertyType: p.propertyType,
      address: p.address,
      city: p.city,
      country: p.country,
      beds: p.beds,
      baths: p.baths,
      images: p.images.map((img) => img.url),
      amenities: p.amenities.map((pa) => pa.amenity.name),
    }));

    return successResponse(res, formatted, "Properties comparison data retrieved");
  } catch (error) {
    next(error);
  }
}

export async function createProperty(req, res, next) {
  try {
    const {
      title,
      address,
      city,
      country = "United Kingdom",
      distanceFromCenter,
      propertyType = "Student Residence",
      pricePerWeek,
      currencySymbol = "£",
      beds = 1,
      baths = 1,
      roomType = "Studio",
      leaseType = "Full Year Stay 36-44 Weeks",
      description,
      amenities = [],
      images = [],
    } = req.body;

    if (!title || !address || !city || !pricePerWeek) {
      return errorResponse(res, "Missing required fields (title, address, city, pricePerWeek)", 400);
    }

    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const property = await prisma.property.create({
      data: {
        title,
        slug,
        address,
        city,
        country,
        distanceFromCenter: distanceFromCenter || "0.4 mi to Campus",
        propertyType,
        pricePerWeek: parseFloat(pricePerWeek),
        currencySymbol,
        beds: parseInt(beds, 10) || 1,
        baths: parseInt(baths, 10) || 1,
        roomType,
        leaseType,
        description: description || `${title} student accommodation in ${city}.`,
        images: {
          create: (images.length > 0 ? images : [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
          ]).map((url, idx) => ({ url, sortOrder: idx })),
        },
      },
      include: {
        images: true,
      },
    });

    return successResponse(res, property, "Property listed successfully", 201);
  } catch (error) {
    next(error);
  }
}

