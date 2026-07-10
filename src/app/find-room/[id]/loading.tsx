export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 h-4 w-32 animate-pulse rounded bg-slate-200" />

        <div className="grid h-[420px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
          <div className="col-span-2 row-span-2 animate-pulse bg-slate-200" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-200" />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-56 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
}