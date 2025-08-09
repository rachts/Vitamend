import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { SessionProvider } from "@/components/session-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VitaMend - Medicine Donation Platform",
  description: "Connect unused medicines with those in need",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a472a" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ErrorBoundary>
              <div className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">{children}</main>
                <footer className="border-t py-6 md:py-0">
                  <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                    <div className="flex items-center gap-2">
                      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITAMEND_LOGO-jA8kBgjI4bZz2vKy9CqKJ3QPbqly4B.png" alt="VitaMend Logo" className="h-5 w-5" />
                      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} VitaMend. Developed by Rachit.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <a href="/legal/terms" className="text-sm text-muted-foreground hover:underline">
                        Terms
                      </a>
                      <a href="/legal/privacy" className="text-sm text-muted-foreground hover:underline">
                        Privacy
                      </a>
                      <a href="/transparency" className="text-sm text-muted-foreground hover:underline">
                        Transparency
                      </a>
                    </div>
                  </div>
                </footer>
              </div>
            </ErrorBoundary>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
