import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle className="h-10 w-10 animate-spin text-cyan-500" />

        <h2 className="text-lg font-semibold text-slate-800">
          Loading...
        </h2>

        <p className="text-sm text-slate-500">
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}