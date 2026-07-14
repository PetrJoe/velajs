import { UserRepository } from "@/apps/users/repositories/user-repository";
import {
  createUserSchema,
  loginSchema,
  type CreateUserInput,
  type LoginInput,
} from "@/apps/users/validators/user-validator";
import { hashPassword, verifyPassword } from "@/core/auth/password";
import { createSessionToken } from "@/core/auth/session";
import { ApiError } from "@/core/middleware/api-errors";

export class UserService {
  constructor(private readonly users = new UserRepository()) {}

  async create(input: CreateUserInput) {
    const payload = createUserSchema.parse(input);
    const existing = await this.users.findByEmail(payload.email);
    if (existing) {
      throw new ApiError("Email already in use", 409, "EMAIL_CONFLICT");
    }

    const password_hash = await hashPassword(payload.password);

    // Don't return the password hash
    const { password_hash: _, ...user } = await this.users.create({
      ...payload,
      password_hash,
    });

    const token = createSessionToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async login(input: LoginInput) {
    const payload = loginSchema.parse(input);
    const user = await this.users.findByEmail(payload.email);

    if (!user || !user.password_hash) {
      throw new ApiError("Invalid email or password", 401, "INVALID_CREDENTIALS");
    }

    const valid = await verifyPassword(payload.password, user.password_hash);
    if (!valid) {
      throw new ApiError("Invalid email or password", 401, "INVALID_CREDENTIALS");
    }

    const token = createSessionToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  async get(id: string) {
    const user = await this.users.findById(id);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
