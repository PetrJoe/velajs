import { UserRepository } from "@/apps/users/repositories/user-repository";
import { createUserSchema, type CreateUserInput } from "@/apps/users/validators/user-validator";

export class UserService {
  constructor(private readonly users = new UserRepository()) {}

  async create(input: CreateUserInput) {
    const payload = createUserSchema.parse(input);
    return this.users.create(payload);
  }

  async get(id: string) {
    return this.users.findById(id);
  }
}
