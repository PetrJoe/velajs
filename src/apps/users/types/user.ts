export type User = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: "admin" | "manager" | "member";
  createdAt: Date;
  updatedAt: Date;
};
