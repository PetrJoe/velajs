import { BaseRepository } from "@/core/db/repository";
import type { User } from "@/apps/users/types/user";
import type { CreateUserInput } from "@/apps/users/validators/user-validator";

type UserRecord = {
  id: string;
  email: string;
  name: string;
  role: User["role"];
  created_at: Date;
  updated_at: Date;
};

function toUser(record: UserRecord): User {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    role: record.role,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  };
}

export class UserRepository extends BaseRepository<UserRecord> {
  constructor() {
    super("users");
  }

  async findById(id: string) {
    const record = await this.table().where({ id }).first();
    return record ? toUser(record) : null;
  }

  async create(input: CreateUserInput) {
    const [record] = await this.table()
      .insert({
        id: crypto.randomUUID(),
        email: input.email,
        name: input.name,
        role: input.role,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning("*");

    return toUser(record);
  }
}
