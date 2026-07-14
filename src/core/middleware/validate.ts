import type { ZodSchema, ZodError } from "zod";
import type { NextRequest } from "next/server";

type ValidationTarget = "body" | "query" | "params" | "headers";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ReturnType<ZodError["flatten"]> };

/**
 * Validate a request against a Zod schema.
 * Returns the parsed data on success, or an error object on failure.
 *
 * @example
 * ```ts
 * const result = await validate(createUserSchema, request);
 * if (!result.success) {
 *   return Response.json({ error: { code: "VALIDATION_ERROR", ... } }, { status: 422 });
 * }
 * // result.data is typed
 * ```
 */
export async function validate<T>(
  schema: ZodSchema<T>,
  request: Request,
  target: ValidationTarget = "body"
): Promise<ValidationResult<T>> {
  try {
    let input: unknown;

    switch (target) {
      case "body": {
        input = await request.json();
        break;
      }
      case "query": {
        const url = new URL(request.url);
        input = Object.fromEntries(url.searchParams.entries());
        break;
      }
      case "headers": {
        input = Object.fromEntries(request.headers.entries());
        break;
      }
      default:
        input = {};
    }

    const data = schema.parse(input);
    return { success: true, data };
  } catch (error) {
    const zodError = error as ZodError;
    return { success: false, error: zodError.flatten() };
  }
}

/**
 * Middleware-style validation for Next.js API routes.
 * Returns the parsed body or sends an error response.
 *
 * @example
 * ```ts
 * const body = await validateOrError(createUserSchema, request);
 * if (body instanceof Response) return body;
 * // body is typed CreateUserInput
 * ```
 */
export async function validateOrError<T>(
  schema: ZodSchema<T>,
  request: Request,
  target: ValidationTarget = "body"
): Promise<T | Response> {
  const result = await validate(schema, request, target);
  if (!result.success) {
    return Response.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request payload",
          details: result.error,
        },
      },
      { status: 422 }
    );
  }
  return result.data;
}
