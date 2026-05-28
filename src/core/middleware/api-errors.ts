import { ZodError } from "zod";

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
    return Response.json(
      { error: { code: "VALIDATION_ERROR", message: "Invalid request payload", details: error.flatten() } },
      { status: 422 }
    );
  }

  if (error instanceof ApiError) {
    return Response.json({ error: { code: error.code, message: error.message, details: error.details } }, { status: error.status });
  }

  return Response.json({ error: { code: "INTERNAL_ERROR", message: "Unexpected server error" } }, { status: 500 });
}
