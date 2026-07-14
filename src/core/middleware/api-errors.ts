import { ZodError } from "zod";
import { failure } from "@/core/middleware/api-response";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status = 500,
    public readonly code = "INTERNAL_ERROR",
    public readonly details?: unknown
  ) {
    super(message);
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return failure("VALIDATION_ERROR", "Invalid request payload", 422, error.flatten());
  }

  if (error instanceof ApiError) {
    return failure(error.code, error.message, error.status, error.details);
  }

  return failure("INTERNAL_ERROR", "Unexpected server error", 500);
}
