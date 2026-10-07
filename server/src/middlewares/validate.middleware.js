import { errorResponse } from "../utils/apiResponse.js";

export function validate(schema) {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err.errors) {
        const formattedErrors = err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return errorResponse(res, "Validation failed", 400, formattedErrors);
      }
      return errorResponse(res, err.message, 400);
    }
  };
}
