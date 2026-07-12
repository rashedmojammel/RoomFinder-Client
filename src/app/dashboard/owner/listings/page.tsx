import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getOwnerListings } from "@/lib/api/listing";
import ListingStatusBadge from "@/components/dashboard/ListingStatusBadge";
import AvailabilityToggle from "@/components/dashboard/owner/AvailabilityToggle";
import DeleteListingButton from "@/components/dashboard/owner/DeleteListingButton";
import EditListingModal from "@/components/dashboard/owner/EditListingModal";
import AddListingModal from "@/components/dashboard/owner/AddListingModal";

export default async function OwnerListingsPage() {
  const user = await getUserSession();
  if (!user) redirect("/sign-in");

  const listings = await getOwnerListings(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Listings</h2>
          <p className="mt-1 text-sm text-slate-500">New listings and edits are reviewed by an admin before going live.</p>
        </div>
        <AddListingModal />
      </div>

      {listings.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
          <p className="text-slate-500">You haven&apos;t posted any rooms yet.</p>
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
                  {listing.city} · ৳{listing.rentPerMonth.toLocaleString()}/month
                </p>
                {listing.approvalStatus === "rejected" && listing.rejectionReason && (
                  <p className="mt-1 text-xs text-red-500">Reason: {listing.rejectionReason}</p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <AvailabilityToggle listingId={listing._id} initialValue={listing.isAvailable} />
                  <span className="text-xs text-slate-400">{listing.isAvailable ? "Available" : "Unavailable"}</span>
                </div>

                <ListingStatusBadge status={listing.approvalStatus} />

                <EditListingModal listing={listing} />

                <DeleteListingButton listingId={listing._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}