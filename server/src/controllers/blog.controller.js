import prisma from "../config/db.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export async function getBlogs(req, res, next) {
  try {
    const { category, page = 1, limit = 6 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const take = Math.max(1, parseInt(limit, 10) || 6);
    const skip = (pageNum - 1) * take;

    const where = category ? { category } : {};

    const [total, blogs] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip,
        take,
      }),
    ]);

    return successResponse(
      res,
      {
        blogs,
        pagination: {
          total,
          page: pageNum,
          totalPages: Math.ceil(total / take),
        },
      },
      "Blogs retrieved"
    );
  } catch (error) {
    next(error);
  }
}

export async function getBlogBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blog) {
      return errorResponse(res, "Blog article not found", 404);
    }

    return successResponse(res, blog, "Blog article retrieved");
  } catch (error) {
    next(error);
  }
}
