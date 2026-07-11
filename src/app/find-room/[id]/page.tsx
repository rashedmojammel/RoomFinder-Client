import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RoomGallery from "@/components/room/RoomGallery";
import RoomDetails from "@/components/room/RoomDetails";
import Amenities from "@/components/room/Amenities";
import OwnerCard from "@/components/room/OwnerCard";
import BookRoomButton from "@/components/room/BookRoomButton";
import SaveRoomButton from "@/components/room/SaveRoomButton";
import RoomCard from "@/components/room/RoomCard";
import { getListingById, getListings } from "@/lib/api/listing";
// import { getUserById } from "@/lib/api/users";
// import { getUserSession } from "@/lib/session";
import { getTenantBookings } from "@/lib/api/bookings";
import { getSavedRooms } from "@/lib/api/savedRooms";
import { getUserSession } from "@/lib/core/session";
import { getUserById } from "@/lib/api/user";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailsPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const viewer = await getUserSession();

  const [owner, nearbyAll, myBookings, mySaved] = await Promise.all([
    getUserById(listing.ownerId),
    getListings({ city: listing.city }),
    viewer ? getTenantBookings(viewer.id) : Promise.resolve([]),
    viewer ? getSavedRooms(viewer.id) : Promise.resolve([]),
  ]);

  const isOwnListing = viewer?.id === listing.ownerId;
  const nearby = nearbyAll.filter((l) => l._id !== listing._id).slice(0, 3);
  const existingBooking = myBookings.find((b) => b.listingId === listing._id);
  const isSaved = mySaved.some((l) => l._id === listing._id);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/find-room" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600">
          <ArrowLeft className="h-4 w-4" />
          Back to all rooms
        </Link>

        <RoomGallery images={listing.images} title={listing.title} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <RoomDetails listing={listing} />
            <Amenities amenities={listing.amenities} />
          </div>

          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
              <div className="flex items-start justify-between">
                <p className="text-2xl font-bold text-slate-900">
                  ৳{listing.rentPerMonth.toLocaleString()}
                  <span className="text-sm font-medium text-slate-500"> /month</span>
                </p>
                {viewer && !isOwnListing && <SaveRoomButton tenantId={viewer.id} listingId={listing._id} initialSaved={isSaved} />}
              </div>
              <div className="mt-4">
                <BookRoomButton listing={listing} initialStatus={existingBooking?.status ?? null} />
              </div>
            </div>

            <OwnerCard owner={owner} isOwnListing={isOwnListing} />
          </div>
        </div>

        {nearby.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-5 text-xl font-bold text-slate-900">More rooms in {listing.city}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((item) => (
                <RoomCard key={item._id} listing={item} tenantId={viewer?.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}