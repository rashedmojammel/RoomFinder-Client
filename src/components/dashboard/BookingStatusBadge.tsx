import { Clock, CheckCircle2, XCircle, Ban } from "lucide-react";
import { BookingStatus } from "@/types/booking";

const config: Record<BookingStatus, { label: string; className: string; icon: typeof Clock }> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700", icon: Clock },
  approved: { label: "Approved", className: "bg-teal-50 text-teal-700", icon: CheckCircle2 },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-700", icon: XCircle },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-500", icon: Ban },
};

export default function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const { label, className, icon: Icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}