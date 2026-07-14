import { createUserController } from "@/apps/users/controllers/user-controller";

export async function POST(request: Request) {
  return createUserController(request);
}
