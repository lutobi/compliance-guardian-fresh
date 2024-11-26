export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your security and compliance status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Assessments</h3>
          </div>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">+10% from last month</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Controls</h3>
          </div>
          <div className="text-2xl font-bold">145</div>
          <p className="text-xs text-muted-foreground">+5 new this week</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Compliance Score</h3>
          </div>
          <div className="text-2xl font-bold">92%</div>
          <p className="text-xs text-muted-foreground">+2% from last week</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Open Issues</h3>
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">-2 from last week</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">
                Your recent security and compliance activities
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">
                Common tasks and actions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
