import DonationForm from "./donation-form"

export const dynamic = "force-dynamic"

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 flex items-center gap-3">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITAMEND_LOGO-jA8kBgjI4bZz2vKy9CqKJ3QPbqly4B.png"
            alt="VitaMend logo"
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Donate Medicines</h1>
            <p className="text-slate-600">Help reduce medical waste and improve access to care.</p>
          </div>
        </div>
        <DonationForm />
      </section>
    </main>
  )
}
