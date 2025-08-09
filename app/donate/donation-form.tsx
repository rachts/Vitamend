"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Package, AlertCircle, CheckCircle, X, Heart } from 'lucide-react'

type FormState = {
  medicineName: string
  brand: string
  expiryDate: string
  quantity: number
  conditionNotes: string
  pickupAddress: string
}

export default function DonationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    medicineName: "",
    brand: "",
    expiryDate: "",
    quantity: 1,
    conditionNotes: "",
    pickupAddress: "",
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === "quantity" ? Number(value) : value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      if (files.length > 5) {
        toast({ title: "Too many files", description: "Max 5 images", variant: "destructive" })
        return
      }
      setSelectedFiles(files)
    }
  }

  const removeFile = (index: number) => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))

  const validateForm = () => {
    const required = ["medicineName", "brand", "expiryDate", "quantity", "pickupAddress"]
    const missing = required.filter((field) => !(form as any)[field])
    if (missing.length > 0) {
      toast({ title: "Missing fields", description: `Fill: ${missing.join(", ")}`, variant: "destructive" })
      return false
    }
    if (selectedFiles.length === 0) {
      toast({ title: "Images required", description: "Upload at least one image", variant: "destructive" })
      return false
    }
    const expiryDate = new Date(form.expiryDate)
    const sixMonths = new Date()
    sixMonths.setMonth(sixMonths.getMonth() + 6)
    if (expiryDate < sixMonths) {
      toast({ title: "Invalid expiry", description: "Must be ≥ 6 months from now", variant: "destructive" })
      return false
    }
    return true
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)))
      selectedFiles.forEach((file, i) => fd.append(`image_${i}`, file))
      const res = await fetch("/api/donations", { method: "POST", body: fd })
      if (!res.ok) throw new Error((await res.json())?.message || "Failed to submit")
      toast({ title: "Donation submitted", description: "We’ll contact you for pickup." })
      setForm({ medicineName: "", brand: "", expiryDate: "", quantity: 1, conditionNotes: "", pickupAddress: "" })
      setSelectedFiles([])
      router.push("/dashboard")
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="shadow-lg max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Package className="h-6 w-6 text-green-600" />
          Medicine Donation Form
        </CardTitle>
        <CardDescription>Provide accurate details about the medicines you’d like to donate.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="medicineName">Medicine Name *</Label>
              <Input id="medicineName" name="medicineName" value={form.medicineName} onChange={onChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input id="brand" name="brand" value={form.brand} onChange={onChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input id="quantity" name="quantity" type="number" min={1} value={form.quantity} onChange={onChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input id="expiryDate" name="expiryDate" type="date" value={form.expiryDate} onChange={onChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditionNotes">Condition Notes</Label>
            <Textarea id="conditionNotes" name="conditionNotes" value={form.conditionNotes} onChange={onChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pickup Address *</Label>
            <Textarea id="pickupAddress" name="pickupAddress" value={form.pickupAddress} onChange={onChange} required />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Medicine Images *</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-4">Upload clear photos of packaging, labels, and expiry date.</p>
              <Input id="images" name="images" type="file" accept="image/*" multiple onChange={handleFileChange} />
            </div>
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected Images</p>
                <div className="space-y-2">
                  {selectedFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between rounded bg-emerald-50 p-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(i)} className="text-red-600">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription>
              By submitting, you confirm medicines are unexpired, stored properly, and legally yours to donate.
            </AlertDescription>
          </Alert>

          <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700">
            {loading ? "Submitting..." : (<span className="inline-flex items-center gap-2"><Heart className="h-4 w-4" />Submit Donation</span>)}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
