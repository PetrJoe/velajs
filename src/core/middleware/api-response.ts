import type { ApiSuccess, ApiFailure } from "@/shared/types/api";

/**
 * Standard success response.
 */
export function success<T>(data: T, status = 200) {
  const body: ApiSuccess<T> = { data };
  return Response.json(body, { status });
}

/**
 * Standard created response (201).
 */
export function created<T>(data: T) {
  return success(data, 201);
}

/**
 * Standard no-content response (204).
 */
export function noContent() {
  return new Response(null, { status: 204 });
}

/**
 * Standard error response using the ApiFailure type.
 */
export function failure(code: string, message: string, status = 400, details?: unknown) {
  const body: ApiFailure = { error: { code, message, details } };
  return Response.json(body, { status });
}

/**
 * Bad request (400).
 */
export function badRequest(message: string, details?: unknown) {
  return failure("BAD_REQUEST", message, 400, details);
}

/**
 * Unauthorized (401).
 */
export function unauthorized(message = "Authentication required") {
  return failure("UNAUTHORIZED", message, 401);
}

/**
 * Forbidden (403).
 */
export function forbidden(message = "Insufficient permissions") {
  return failure("FORBIDDEN", message, 403);
}

/**
 * Not found (404).
 */
export function notFound(message = "Resource not found") {
  return failure("NOT_FOUND", message, 404);
}

/**
 * Conflict (409).
 */
export function conflict(message: string) {
  return failure("CONFLICT", message, 409);
}

/**
 * Too many requests (429).
 */
export function tooManyRequests(message = "Rate limit exceeded") {
  return failure("RATE_LIMITED", message, 429);
}

/**
 * Internal server error (500).
 */
export function internalError(message = "Unexpected server error") {
  return failure("INTERNAL_ERROR", message, 500);
}
