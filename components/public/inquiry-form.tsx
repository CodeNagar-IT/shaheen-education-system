"use client";

import { useState } from "react";
import { submitInquiry } from "@/app/actions/inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

type Branch = { id: string; name: string; whatsapp: string };

export function InquiryForm({ branches }: { branches: Branch[] }) {
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const defaultWa = branches[0]?.whatsapp ?? "923005512345";

  async function action(formData: FormData) {
    const result = await submitInquiry(formData);
    if (!result.ok) {
      setError(result.error ?? "Unable to send.");
      setOk(false);
      return;
    }
    setError(null);
    setOk(true);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-2xl text-navy">Public inquiry</h2>
      <p className="mt-1 text-sm text-slate-600">Routed to the selected campus administrator. Typical reply within one working day.</p>
      <form action={action} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone">Mobile / WhatsApp</Label>
          <Input id="phone" name="phone" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="childAge">Child&apos;s age</Label>
          <Input id="childAge" name="childAge" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="classInterest">Class of interest</Label>
          <Input id="classInterest" name="classInterest" className="mt-1" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="branchId">Campus</Label>
          <select id="branchId" name="branchId" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm">
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" required className="mt-1" />
        </div>
        {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
        {ok && <p className="sm:col-span-2 text-sm text-emerald-700">Thank you. A campus officer will contact you shortly.</p>}
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <Button type="submit">Send inquiry</Button>
          <a
            href={whatsappLink(defaultWa, "Assalam-o-Alaikum Shaheen Education System, I would like admission information.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Quick-Connect
          </a>
        </div>
      </form>
    </div>
  );
}
