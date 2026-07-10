export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-9 w-72 animate-pulse rounded-lg bg-slate-100" />
          <div className="mt-3 h-4 w-96 animate-pulse rounded-lg bg-slate-100" />
          <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-slate-100" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md"
            >
              <div className="h-56 w-full animate-pulse bg-slate-100" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                <div className="flex items-center justify-between pt-3">
                  <div className="h-5 w-20 animate-pulse rounded bg-slate-100" />
                  <div className="h-6 w-16 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}