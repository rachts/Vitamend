"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const roleOptions = [
  "Medicine Verification",
  "Pickup & Delivery",
  "Community Outreach",
  "Administrative Support",
]

export default function VolunteerForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState<string[]>([])

  const toggleRole = (role: string) => {
    setRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      fullName: String(fd.get("fullName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      city: String(fd.get("city") || ""),
      roles,
      notes: String(fd.get("notes") || ""),
    }

    if (!payload.fullName || !payload.email || !payload.phone || !payload.city) {
      toast({ title: "Missing required fields", description: "Please fill all required fields.", variant: "destructive" })
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || "Failed to submit")

      toast({ title: "Application submitted", description: "Thank you for volunteering!" })
      ;(e.target as HTMLFormElement).reset()
      setRoles([])
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" placeholder="Jane Doe" required />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" placeholder="Mumbai" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="jane@example.com" required />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="+1 555 123 4567" required />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Preferred Roles</Label>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((r) => {
            const active = roles.includes(r)
            return (
              <button
                key={r}
                type="button"
                onClick={() => toggleRole(r)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  active ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300 text-slate-700"
                }`}
                aria-pressed={active}
              >
                {r}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-1">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" name="notes" placeholder="Availability or relevant experience..." />
      </div>

      <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}
