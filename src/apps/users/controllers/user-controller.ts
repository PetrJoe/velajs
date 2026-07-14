import { UserService } from "@/apps/users/services/user-service";
import { errorResponse } from "@/core/middleware/api-errors";
import { success, created } from "@/core/middleware/api-response";

const service = new UserService();

export async function createUserController(request: Request) {
  try {
    const payload = await request.json();
    const result = await service.create(payload);
    return created(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function loginController(request: Request) {
  try {
    const payload = await request.json();
    const result = await service.login(payload);
    return success(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function getUserController(request: Request, userId: string) {
  try {
    const user = await service.get(userId);
    if (!user) {
      return success(null);
    }
    return success(user);
  } catch (error) {
    return errorResponse(error);
  }
}
