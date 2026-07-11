import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// import { getUserSession } from "@/lib/session";
import { getPendingListings } from "@/lib/api/listing";
import ListingApprovalActions from "@/components/dashboard/admin/ListingApprovalActions";
import { getUserSession } from "@/lib/core/session";

export default async function AdminListingsPage() {
  const user = await getUserSession();
  if (!user) redirect("/sign-in");
  if (user.userRole !== "admin") redirect("/dashboard");

  const listings = await getPendingListings();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Pending Listings</h2>
        <p className="mt-1 text-sm text-slate-500">Review new room listings before they go live.</p>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
          <p className="text-slate-500">No listings waiting for review.</p>
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

              <ListingApprovalActions listingId={listing._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}