import { type NextRequest, NextResponse } from "next/server"

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(config: RateLimitConfig) {
  return async (req: NextRequest) => {
    const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown"
    const key = `${ip}:${req.nextUrl.pathname}`
    const now = Date.now()

    // Clean up expired entries
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k)
      }
    }

    const current = rateLimitStore.get(key)

    if (!current) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return null
    }

    if (current.resetTime < now) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return null
    }

    if (current.count >= config.maxRequests) {
      return NextResponse.json(
        { error: config.message || "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((current.resetTime - now) / 1000).toString(),
          },
        },
      )
    }

    current.count++
    return null
  }
}
