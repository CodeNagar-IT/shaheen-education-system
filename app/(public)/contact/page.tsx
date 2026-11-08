import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { school } from "@/lib/school";
import { InquiryForm } from "@/components/public/inquiry-form";
import { MapPin, Phone, Mail, Clock, HelpCircle, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Campus Locations — Shaheen Education System",
  description:
    "Get in touch with admissions, branch administrative offices, or visit our flagship campus in Upper Chattar, Domail.",
};

const faqs = [
  {
    q: "What is the admissions criteria for Montessori and Primary grades?",
    a: "Montessori admissions are based on an informal child-parent interaction observing communication and motor readiness. Class 1 upwards undergo an age-appropriate aptitude evaluation in English, Mathematics, and Urdu.",
  },
  {
    q: "Can fee vouchers be paid online or through local bank branches?",
    a: "Yes. Fee vouchers generated through our system include 1Link and Bank Alfalah/Askari routing details, and can be paid via Mobile Banking apps, ATMs, or at the campus finance counter.",
  },
  {
    q: "How does the multi-branch transfer policy work?",
    a: "Students moving between Shaheen campuses (e.g. from Main Campus to upcoming sister campuses) retain their roll numbers and academic history without undergoing re-admission or duplicate registration charges.",
  },
  {
    q: "Are transport and laboratory facilities available for senior grades?",
    a: "Dedicated school vans operate on verified routes covering Upper Chattar, Domail, Shoukat Line, and surrounding sectors. Physics, Chemistry, Biology, and Computer Labs are fully equipped for BISE matriculation standards.",
  },
];

export default async function ContactPage() {
  const branches = await prisma.branch.findMany({
    orderBy: { isMain: "desc" },
    select: {
      id: true,
      name: true,
      code: true,
      address: true,
      city: true,
      phone: true,
      email: true,
      whatsapp: true,
      isMain: true,
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-navy py-16 text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <MessageSquare className="h-3.5 w-3.5" />
            Connect With Us
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Campus Directory & Admissions Inquiry
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Have questions about seat availability, curriculum frameworks, or schedule an in-person campus walkthrough? Reach our administrative team directly.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Main 2-column: Inquiry Form + Contact Details */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm branches={branches} />
          </div>

          {/* Contact Information & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                Flagship Campus
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {school.mainBranch.name}<br />
                {school.mainBranch.address}
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="h-4 w-4 text-royal flex-shrink-0" />
                  <a href={`tel:${school.mainBranch.phone}`} className="hover:text-royal font-medium">
                    {school.mainBranch.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="h-4 w-4 text-royal flex-shrink-0" />
                  <a href={`mailto:${school.mainBranch.email}`} className="hover:text-royal font-medium">
                    {school.mainBranch.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Clock className="h-4 w-4 text-royal flex-shrink-0" />
                  <span>Mon – Sat: 7:30 AM – 2:30 PM (Friday till 12:30 PM)</span>
                </div>
              </div>
            </div>

            {/* All Branches Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-navy mb-4">Campuses & Centers</h3>
              <div className="space-y-4">
                {branches.map((b) => (
                  <div key={b.id} className="border-l-2 border-royal/40 pl-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-navy text-sm">{b.name}</p>
                      <span className="text-[11px] font-mono font-medium text-slate-500 uppercase">{b.code}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{b.address}</p>
                    <p className="text-xs text-royal mt-1 font-medium">{b.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-bold text-navy flex items-center gap-2">
              <MapPin className="h-5 w-5 text-royal" />
              Interactive Location Map
            </h2>
            <p className="text-sm text-slate-500">Easily accessible in Madina Market, Shoukat Line, Upper Chattar</p>
          </div>
          <div className="relative w-full h-[380px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
            <iframe
              title="Shaheen Education System Location"
              src="https://maps.google.com/maps?q=Madina+Market+Shoukat+Line+Upper+Chattar+Domail&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-gold" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-500">Quick answers regarding enrollment and campus administration</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="font-semibold text-navy text-sm">{faq.q}</p>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
