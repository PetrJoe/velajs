"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function UserForm() {
  return (
    <form className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1 text-sm">
        Name
        <Input name="name" placeholder="Ada Lovelace" />
      </label>
      <label className="grid gap-1 text-sm">
        Email
        <Input name="email" type="email" placeholder="ada@example.com" />
      </label>
      <div className="sm:col-span-2">
        <Button type="submit">Create user</Button>
      </div>
    </form>
  );
}
