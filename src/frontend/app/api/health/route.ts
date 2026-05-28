import { healthCheck } from "@/core/observability/health";
import { errorResponse } from "@/core/middleware/api-errors";

export async function GET() {
  try {
    return Response.json(await healthCheck());
  } catch (error) {
    return errorResponse(error);
  }
}
