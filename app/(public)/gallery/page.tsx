import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Camera, Image as ImageIcon, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Gallery — Shaheen Education System",
  description: "Explore our state-of-the-art facilities, campus events, sports days, and student achievements.",
};

const defaultGallery = [
  {
    id: "g1",
    title: "Annual Sports Gala & Athletics",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    caption: "Students participating in annual track events and team sports at Upper Chattar grounds.",
  },
  {
    id: "g2",
    title: "High-Tech STEM & Science Laboratory",
    category: "Facilities",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    caption: "Modern physics and chemistry apparatus fostering hands-on discovery and research.",
  },
  {
    id: "g3",
    title: "Academic Excellence & Awards Ceremony",
    category: "Academic",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    caption: "Honoring top achievers in BISE matriculation and internal assessments.",
  },
  {
    id: "g4",
    title: "Interactive Smart Classrooms",
    category: "Facilities",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    caption: "Spacious, multimedia-equipped learning environments supporting collaborative pedagogy.",
  },
  {
    id: "g5",
    title: "Cultural Day & Speech Competition",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    caption: "Fostering leadership, bilingual eloquence, and character development in every child.",
  },
  {
    id: "g6",
    title: "Montessori Early Years Activity Center",
    category: "Academic",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    caption: "Sensorial play, phonetics, and motor-skill enhancement under certified facilitators.",
  },
];

interface GalleryDoc {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

export default async function GalleryPage() {
  let dbItems: GalleryDoc[] = [];
  try {
    dbItems = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    dbItems = [];
  }

  const items = dbItems.length > 0 ? dbItems : defaultGallery;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-navy py-16 text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <Camera className="h-3.5 w-3.5" />
            Visual Tour
          </p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Campus Life & Facilities
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Take a visual tour through our learning spaces, modern laboratories, competitive sports arenas, and vibrant co-curricular celebrations across all campuses.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-royal" />
              Featured Moments
            </h2>
            <p className="text-sm text-slate-500">Capturing the Shaheen spirit across academic sessions</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-navy border border-gold/30">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Continuous Digital Archive
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-md bg-navy/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-gold border border-white/10">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-navy group-hover:text-royal transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
