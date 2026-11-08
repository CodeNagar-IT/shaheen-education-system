"use client";

import { useState } from "react";
import { submitAdmission, trackAdmission } from "@/app/actions/admissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationBadge } from "@/components/dashboard/status-badge";
import { formatDate } from "@/lib/utils";

type Branch = { id: string; name: string };

export function AdmissionForm({ branches }: { branches: Branch[] }) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [trackCode, setTrackCode] = useState("");
  const [tracked, setTracked] = useState<{
    trackingCode: string;
    applicantName: string;
    classApplied: string;
    status: string;
    createdAt: Date;
    branch: { name: string };
  } | null>(null);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    setMessage(null);
    const result = await submitAdmission(formData);
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMessage(`Application received. Save your tracking code: ${result.trackingCode}`);
  }

  async function onTrack(e: React.FormEvent) {
    e.preventDefault();
    const rec = await trackAdmission(trackCode);
    if (!rec) {
      setTracked(null);
      setError("No application found for that code.");
      return;
    }
    setError(null);
    setTracked(rec);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form action={onSubmit} className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl text-navy">Online admission application</h2>
          <p className="text-sm text-slate-600">Upload B-Form/CNIC copy or last school result. You will receive a tracking code instantly.</p>
        </div>
        <div>
          <Label htmlFor="applicantName">Student name</Label>
          <Input id="applicantName" name="applicantName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="fatherName">Father / guardian name</Label>
          <Input id="fatherName" name="fatherName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="motherName">Mother name</Label>
          <Input id="motherName" name="motherName" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <select id="gender" name="gender" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="classApplied">Class applied for</Label>
          <select id="classApplied" name="classApplied" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm">
            {["Playgroup", "Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "F.Sc Pre-Medical", "F.Sc Pre-Engineering", "ICS"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="branchId">Preferred campus</Label>
          <select id="branchId" name="branchId" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm">
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="previousSchool">Previous school</Label>
          <Input id="previousSchool" name="previousSchool" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone">Mobile</Label>
          <Input id="phone" name="phone" required className="mt-1" placeholder="03xx-xxxxxxx" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="cnic">B-Form / CNIC</Label>
          <Input id="cnic" name="cnic" className="mt-1" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Residential address</Label>
          <Textarea id="address" name="address" required className="mt-1" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="document">Supporting document (PDF/JPG)</Label>
          <Input id="document" name="document" type="file" accept=".pdf,.jpg,.jpeg,.png" className="mt-1" />
        </div>
        {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}
        {message && <p className="md:col-span-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
        <div className="md:col-span-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Submitting…" : "Submit application"}
          </Button>
        </div>
      </form>

      <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-navy">Track status</h2>
        <p className="mt-1 text-sm text-slate-600">Enter the code issued after you applied. Demo code: SES-26-DEMO01</p>
        <form onSubmit={onTrack} className="mt-4 space-y-3">
          <Input value={trackCode} onChange={(e) => setTrackCode(e.target.value)} placeholder="SES-26-XXXX" />
          <Button type="submit" className="w-full">
            Look up
          </Button>
        </form>
        {tracked && (
          <div className="mt-5 space-y-2 rounded-lg bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-navy">{tracked.applicantName}</p>
            <p>{tracked.classApplied}</p>
            <p>{tracked.branch.name}</p>
            <p>Submitted {formatDate(tracked.createdAt)}</p>
            <ApplicationBadge status={tracked.status} />
          </div>
        )}
      </aside>
    </div>
  );
}
