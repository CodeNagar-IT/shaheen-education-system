"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createStudent } from "@/app/actions/students";
import { ArrowLeft } from "lucide-react";

const classes = [
  "Playgroup", "Nursery", "Kindergarten",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8",
  "Class 9", "Class 10",
  "F.Sc Pre-Medical", "F.Sc Pre-Engineering", "ICS", "I.Com", "F.A",
];

export default function NewStudentPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await createStudent(fd);
    setPending(false);
    if (!result.ok) {
      setError(result.error ?? "Failed to create student.");
    } else {
      router.push("/students");
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/students" className="rounded-md border border-slate-200 p-2 hover:bg-slate-50">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-navy">Enrol New Student</h1>
          <p className="mt-0.5 text-sm text-slate-500">Complete all required fields to register the student.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        {/* Personal Info */}
        <section>
          <h2 className="mb-4 font-semibold text-navy border-b border-slate-100 pb-2">Personal Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">First Name *</label>
              <input name="firstName" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Last Name *</label>
              <input name="lastName" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Gender *</label>
              <select name="gender" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Date of Birth *</label>
              <input name="dateOfBirth" type="date" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Blood Group</label>
              <select name="bloodGroup" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal">
                <option value="">Select</option>
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Academic Info */}
        <section>
          <h2 className="mb-4 font-semibold text-navy border-b border-slate-100 pb-2">Academic Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Class *</label>
              <select name="className" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal">
                <option value="">Select class</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Section *</label>
              <select name="section" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal">
                {["A","B","C","D"].map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Roll Number *</label>
              <input name="rollNumber" required placeholder="e.g. 01" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Branch / Campus *</label>
              <input name="branchId" placeholder="Branch ID (auto-filled for branch admins)" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
              <p className="mt-1 text-xs text-slate-400">Leave blank to use your assigned campus.</p>
            </div>
          </div>
        </section>

        {/* Guardian Info */}
        <section>
          <h2 className="mb-4 font-semibold text-navy border-b border-slate-100 pb-2">Guardian Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Guardian Name *</label>
              <input name="guardianName" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Mobile / WhatsApp *</label>
              <input name="guardianPhone" required placeholder="+92-3xx-xxxxxxx" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Guardian Email</label>
              <input name="guardianEmail" type="email" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Relation</label>
              <select name="relation" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal">
                <option>Father</option>
                <option>Mother</option>
                <option>Guardian</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Address *</label>
              <input name="address" required className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-royal" />
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-navy px-6 py-2 text-sm font-semibold text-white hover:bg-navy/90 disabled:opacity-50"
          >
            {pending ? "Enrolling…" : "Enrol Student"}
          </button>
          <Link href="/students" className="rounded-md border border-slate-300 px-6 py-2 text-sm font-medium hover:bg-slate-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
