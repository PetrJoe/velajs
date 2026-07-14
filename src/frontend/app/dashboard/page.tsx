import { Card } from "@/shared/ui/card";

const stats = [
  { label: "Total Users", value: "—" },
  { label: "Active Projects", value: "—" },
  { label: "API Requests", value: "—" },
  { label: "Uptime", value: "—" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-600">Welcome back. Here is an overview of your project.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-semibold text-slate-950">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-slate-950">Recent activity</h2>
          <p className="mt-3 text-sm text-slate-500">No recent activity to display. Start by creating your first project.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-slate-950">Quick actions</h2>
          <div className="mt-4 space-y-3">
            <a
              href="/docs/getting-started"
              className="block rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Read the getting started guide
            </a>
            <a
              href="/docs/cli"
              className="block rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Explore CLI commands
            </a>
            <a
              href="/docs/architecture"
              className="block rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              View architecture docs
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
