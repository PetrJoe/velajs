export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "member";
  createdAt: Date;
  updatedAt: Date;
};
