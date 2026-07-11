import { redirect } from "next/navigation";
// import { getUserSession } from "@/lib/session";
import { getSavedRooms } from "@/lib/api/savedRooms";
import RoomCard from "@/components/room/RoomCard";
import { getUserSession } from "@/lib/core/session";

export default async function SavedRoomsPage() {
  const user = await getUserSession();
  if (!user) redirect("/sign-in");

  const listings = await getSavedRooms(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Saved Rooms</h2>
        <p className="mt-1 text-sm text-slate-500">Rooms you&apos;ve bookmarked for later.</p>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
          <p className="text-slate-500">You haven&apos;t saved any rooms yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <RoomCard key={listing._id} listing={listing} tenantId={user.id} isSaved />
          ))}
        </div>
      )}
    </div>
  );
}