import type { LucideIcon } from "lucide-react"
import { Activity, DollarSign, ShoppingCart, Users } from "lucide-react"

/**
 * Central icon registry for the app.
 * Add new mappings here and import as:
 *   import { Icons } from "@/components/icons"
 *   <Icons.revenue className="h-4 w-4" />
 */
export const Icons: Record<string, LucideIcon> = {
  revenue: DollarSign,
  sales: ShoppingCart,
  active: Activity,
  subscription: Users,
  // keep legacy misspelling for compatibility
  subsciption: Users,
}
