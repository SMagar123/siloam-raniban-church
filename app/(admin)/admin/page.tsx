export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-foreground">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Total Posts
          </p>
          <p className="text-3xl font-bold text-foreground">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Draft Posts
          </p>
          <p className="text-3xl font-bold text-foreground">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Total Events
          </p>
          <p className="text-3xl font-bold text-foreground">0</p>
        </div>
      </div>
    </div>
  )
}
