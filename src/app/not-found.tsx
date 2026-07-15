import Link from "next/link";
import { SearchX, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400">
          <SearchX className="h-8 w-8 text-white" />
        </div>

        <p className="mt-6 text-6xl font-black text-slate-200">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist, may have been moved, or the room
          you were viewing is no longer listed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/find-room"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Search className="h-4 w-4" />
            Find a Room
          </Link>
        </div>
      </div>
    </main>
  );
}