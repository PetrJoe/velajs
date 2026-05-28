import { usersApp } from "@/apps/users";

export const registeredApps = [usersApp];

export type RegisteredApp = (typeof registeredApps)[number];
