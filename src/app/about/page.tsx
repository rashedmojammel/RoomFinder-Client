import Link from "next/link";
import { Search, MessageCircle, KeyRound, ShieldCheck, Users, Building2, MapPin } from "lucide-react";
import { getListings } from "@/lib/api/listing";
import StatBadge from "@/components/marketing/StatBadge";

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Filter by city, bedrooms, and budget to find rooms that actually fit your life.",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    description: "Send a booking request directly to the owner with your details — no middleman.",
  },
  {
    icon: KeyRound,
    title: "Move in",
    description: "Once approved, coordinate move-in directly with your new landlord.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Verified listings",
    description: "Every room is reviewed by our team before it goes live, so what you see is real.",
  },
  {
    icon: Users,
    title: "Direct owner contact",
    description: "No brokers, no hidden fees — you talk to the person who actually owns the room.",
  },
  {
    icon: Building2,
    title: "Built for renters",
    description: "Save favorites, track requests, and manage everything from one dashboard.",
  },
];

export default async function AboutPage() {
  const listings = await getListings();
  const cities = [...new Set(listings.map((l) => l.city))];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Finding a room shouldn&apos;t be this hard.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            RoomFinder connects tenants directly with room and apartment owners — no brokers, no
            guesswork, just verified listings and a straightforward booking process.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatBadge icon={Building2} value={String(listings.length)} label="Active listings" />
          <StatBadge icon={MapPin} value={String(cities.length)} label="Cities covered" />
          <StatBadge icon={ShieldCheck} value="100%" label="Owner-reviewed listings" />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">How it works</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-cyan-600">
                Step {index + 1}
              </p>
              <h3 className="mt-1 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">Why RoomFinder</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-cyan-600">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-white">Ready to find your next room?</h2>
          <p className="mt-2 text-white/90">Or list your own property and start receiving requests today.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/find-room"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-md transition-transform duration-300 hover:scale-[1.02]"
            >
              Find a room
            </Link>
            <Link
              href="/sign-up"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              List your property
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}