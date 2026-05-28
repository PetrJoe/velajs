import { UserService } from "@/apps/users/services/user-service";
import { errorResponse } from "@/core/middleware/api-errors";

const service = new UserService();

export async function createUserController(request: Request) {
  try {
    const payload = await request.json();
    return Response.json({ data: await service.create(payload) }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
