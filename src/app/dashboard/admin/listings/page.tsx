import Image from "next/image";
import Link from "next/link";
import { getAllListingsAdmin } from "@/lib/api/listing";
import ListingStatusBadge from "@/components/dashboard/ListingStatusBadge";
import ListingApprovalActions from "@/components/dashboard/admin/ListingApprovalActions";
import { ListingApprovalStatus } from "@/types/listing";

interface AdminListingsPageProps {
  searchParams: Promise<{ status?: string }>;
}

const tabs: { label: string; value: ListingApprovalStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default async function AdminListingsPage({ searchParams }: AdminListingsPageProps) {
  const { status } = await searchParams;
  const activeStatus = status as ListingApprovalStatus | undefined;

  const listings = await getAllListingsAdmin(activeStatus);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Manage Listings</h2>
        <p className="mt-1 text-sm text-slate-500">Review, approve, or reject listings across the platform.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value === "all" ? "/dashboard/admin/listings" : `/dashboard/admin/listings?status=${tab.value}`}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
              (activeStatus ?? "all") === tab.value
                ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 text-white shadow-md"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {listings.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
          <p className="text-slate-500">No listings found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing._id} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md sm:flex-row sm:items-center">
              <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {listing.images[0] && (
                  <Image src={listing.images[0]} alt={listing.title} fill sizes="112px" className="object-cover" />
                )}
              </div>

              <div className="flex-1">
                <Link href={`/find-room/${listing._id}`} className="font-semibold text-slate-900 hover:text-cyan-600">
                  {listing.title}
                </Link>
                <p className="mt-1 text-sm text-slate-500">
                  {listing.city} · ৳{listing.rentPerMonth.toLocaleString()}/month · owner: {listing.ownerId}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ListingStatusBadge status={listing.approvalStatus} />
                {listing.approvalStatus === "pending" && <ListingApprovalActions listingId={listing._id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}