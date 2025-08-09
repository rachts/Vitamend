import Link from "next/link"

// Export both named and default to avoid import mismatches in Server Components.
export function Navigation() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* Use the provided Source URL for the logo */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITAMEND_LOGO-jA8kBgjI4bZz2vKy9CqKJ3QPbqly4B.png"
            alt="VitaMend logo"
            className="h-8 w-8"
            loading="eager"
          />
          <span className="font-semibold tracking-tight text-slate-800">VitaMend</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/donate" className="text-slate-700 hover:text-slate-900">Donate</Link>
          <Link href="/volunteer" className="text-slate-700 hover:text-slate-900">Volunteer</Link>
          <Link href="/transparency" className="text-slate-700 hover:text-slate-900">Transparency</Link>
          <Link
            href="/dashboard"
            className="rounded-md bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-700"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navigation
