import { auth, clerkClient } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { Shell } from "@/components/shell"
import { Icons } from "@/components/icons"

const DashboardPage = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await clerkClient.users.getUser(userId)
  const subscription = false

  const name = user.firstName || "User"
  const email = user.emailAddresses[0].emailAddress

  return (
    <Shell>
      <div className="flex items-center gap-3 mb-6">
        <img src="/logo.png" alt="VitaMend Logo" className="h-10 w-10" />
        <div>
          <h1 className="text-3xl font-bold text-[#1a472a]">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Here's your impact dashboard</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Icons.revenue className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Icons.subsciption className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <Icons.sales className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Icons.active className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}

export default DashboardPage

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
