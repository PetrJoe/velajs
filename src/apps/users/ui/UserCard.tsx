import type { User } from "@/apps/users/types/user";
import { Card } from "@/shared/ui/card";

export function UserCard({ user }: { user: User }) {
  return (
    <Card className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink-900 dark:text-white">{user.name}</h3>
          <p className="text-sm text-ink-500 dark:text-slate-400">{user.email}</p>
        </div>
        <span className="rounded bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-200">{user.role}</span>
      </div>
    </Card>
  );
}
