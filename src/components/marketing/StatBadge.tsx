import { LucideIcon } from "lucide-react";

interface StatBadgeProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function StatBadge({ icon: Icon, value, label }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-md">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}