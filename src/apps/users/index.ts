export const usersApp = {
  name: "users",
  label: "Users",
  permissions: ["users.read", "users.write"]
} as const;

export * from "./services/user-service";
export * from "./repositories/user-repository";
export * from "./validators/user-validator";
