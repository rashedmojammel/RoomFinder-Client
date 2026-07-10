import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RoomGallery from "@/components/room/RoomGallery";
import RoomDetails from "@/components/room/RoomDetails";
import Amenities from "@/components/room/Amenities";
import OwnerCard from "@/components/room/OwnerCard";
import BookRoomButton from "@/components/room/BookRoomButton";
import RoomCard from "@/components/room/RoomCard";
import { getRoomBySlug, getRelatedRooms, rooms } from "@/data/rooms";

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.slug }));
}

export default async function RoomDetailsPage({ params }: RoomPageProps) {
  const { id } = await params;
  const room = getRoomBySlug(id);

  if (!room) {
    notFound();
  }

  const relatedRooms = getRelatedRooms(room.id, room.area);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/find-room"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all rooms
        </Link>

        <RoomGallery images={room.images} title={room.title} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <RoomDetails room={room} />
            <Amenities amenities={room.amenities} />
          </div>

          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold text-slate-900">
                  ৳{room.price.toLocaleString()}
                  <span className="text-sm font-medium text-slate-500"> /month</span>
                </p>
              </div>
              <div className="mt-4">
                <BookRoomButton room={room} />
              </div>
            </div>

            <OwnerCard owner={room.owner} />
          </div>
        </div>

        {relatedRooms.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Similar rooms nearby</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedRooms.map((related) => (
                <RoomCard key={related.id} room={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}