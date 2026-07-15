import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400">
          <ShieldAlert className="h-8 w-8 text-white" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">Access denied</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          You don&apos;t have permission to view this page. If you think this is a mistake, try
          signing in with a different account or contact support.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            Back to Home
          </Link>
          <Link
            href="/sign-in"
            className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Sign in as someone else
          </Link>
        </div>
      </div>
    </main>
  );
}