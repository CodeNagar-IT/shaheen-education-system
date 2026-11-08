"use client";

import { createStudent } from "@/app/actions/students";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Branch {
  id: string;
  name: string;
}

interface Props {
  branches: Branch[];
  defaultBranchId?: string | null;
  isSuperAdmin: boolean;
}

export default function NewStudentForm({ branches, defaultBranchId, isSuperAdmin }: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await createStudent(fd);
    setLoading(false);
    if (result?.ok) {
      router.push("/students");
    } else {
      setError(result?.error ?? "Something went wrong.");
    }
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Personal Details */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-navy">Personal Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First Name *" name="firstName" required />
          <Field label="Last Name *" name="lastName" required />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Gender *</label>
            <select
              name="gender"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <Field label="Date of Birth *" name="dateOfBirth" type="date" required />
          <Field label="Blood Group" name="bloodGroup" placeholder="e.g. B+" />
        </div>
      </section>

      {/* Academic Details */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-navy">Academic Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Roll Number *" name="rollNumber" required placeholder="e.g. 2024-001" />
          <Field label="Class *" name="className" required placeholder="e.g. Class 5" />
          <Field label="Section" name="section" defaultValue="A" required />
          {isSuperAdmin ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Branch *</label>
              <select
                name="branchId"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal"
              >
                <option value="">Select branch…</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input type="hidden" name="branchId" value={defaultBranchId ?? ""} />
          )}
        </div>
      </section>

      {/* Guardian Details */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-navy">Guardian Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Guardian Name *" name="guardianName" required />
          <Field label="Guardian Phone *" name="guardianPhone" required placeholder="+92-300-…" />
          <Field label="Guardian Email" name="guardianEmail" type="email" />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Relation</label>
            <select
              name="relation"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Address *</label>
            <textarea
              name="address"
              required
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal"
              placeholder="Full residential address"
            />
          </div>
        </div>
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-navy px-6 py-2 text-sm font-medium text-white hover:bg-navy/90 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Add Student"}
        </button>
        <a
          href="/students"
          className="rounded-lg border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal"
      />
    </div>
  );
}
