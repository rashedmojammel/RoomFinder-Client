import Image from "next/image";
import { User, Mail, Phone, BadgeCheck } from "lucide-react";
import { PublicUser } from "@/types/user";

interface OwnerCardProps {
  owner: PublicUser | null;
  isOwnListing: boolean;
}


export default function OwnerCard({ owner, isOwnListing }: OwnerCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
          {owner?.image ? (
            <Image src={owner.image} alt={owner.name} fill sizes="56px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-6 w-6 text-slate-400" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-slate-900">{owner?.name ?? "Unknown owner"}</h3>
            {isOwnListing && <BadgeCheck className="h-4 w-4 text-cyan-500" />}
          </div>
          <p className="text-sm text-slate-500">{isOwnListing ? "This is you" : "Room owner"}</p>
        </div>
      </div>

      {(owner?.email || owner?.phoneNumber) && (
        <div className="mt-5 space-y-2 border-t border-gray-100 pt-5 text-sm text-slate-600">
          {owner?.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              {owner.email}
            </div>
          )}
          {owner?.phoneNumber && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              {owner.phoneNumber}
            </div>
          )}
        </div>
      )}

      {owner?.email && !isOwnListing && (
        <a
          href={`mailto:${owner.email}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          <Mail className="h-4 w-4" />
          Message Owner
        </a>
      )}
    </div>
  );
}