import type * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Shell - a simple constrained page wrapper
 * Use to provide consistent page gutters and max width.
 */
export function Shell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 py-6", className)}>{children}</div>
}

export default Shell
