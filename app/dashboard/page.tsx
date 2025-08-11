import { Shell } from "@/components/shell"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Dashboard
 * NOTE: This page does not require Clerk and will render without auth,
 *       ensuring stable builds on Vercel. Plug in auth later if desired.
 */
export default async function DashboardPage() {
  // Example static stats; replace with real data when available.
  const stats = [
    { label: "Total Revenue", value: "$45,231.89", delta: "+20.1%", icon: Icons.revenue },
    { label: "Subscriptions", value: "+2,350", delta: "+180.1%", icon: Icons.subscription },
    { label: "Sales", value: "+12,234", delta: "+19%", icon: Icons.sales },
    { label: "Active Now", value: "+573", delta: "+201", icon: Icons.active },
  ]

  return (
    <Shell>
      <div className="flex items-center gap-3 mb-6">
        <img src="/logo.png" alt="VitaMend Logo" className="h-10 w-10" />
        <div>
          <h1 className="text-3xl font-bold text-[#1a472a]">Welcome back!</h1>
          <p className="text-muted-foreground">Here's your impact dashboard</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                <p className="text-xs text-muted-foreground">{s.delta} from last month</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Shell>
  )
}
