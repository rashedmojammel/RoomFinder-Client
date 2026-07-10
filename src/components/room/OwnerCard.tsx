import Image from "next/image";
import { BadgeCheck, Clock, MessageCircle, Phone } from "lucide-react";
import { Owner } from "@/types/room";

interface OwnerCardProps {
  owner: Owner;
}

export default function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-cyan-100">
          <Image src={owner.avatar} alt={owner.name} fill sizes="56px" className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-slate-900">{owner.name}</h3>
            {owner.verified && <BadgeCheck className="h-4 w-4 text-cyan-500" />}
          </div>
          <p className="text-sm text-slate-500">Host since {owner.memberSince}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-5 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Response rate</span>
          <span className="font-semibold text-slate-900">{owner.responseRate}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>Responds {owner.responseTime}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        <a
          href={`tel:${owner.phone}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          <Phone className="h-4 w-4" />
          Call Owner
        </a>
        <a
          href={`mailto:${owner.email}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-50"
        >
          <MessageCircle className="h-4 w-4" />
          Message
        </a>
      </div>
    </div>
  );
}