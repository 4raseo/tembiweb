import Image from "next/image";
import { BedDouble, Users, Star } from "lucide-react";
import type { Room } from "@/data/roomData";
import Link from "next/link"; // <-- Import Link

interface StandardRoomCardProps {
  room: Room;
}

export function StandardRoomCard({ room }: StandardRoomCardProps) {
  return (
    <Link href={`/rooms/${room.slug}`} className="block group"> {/* <-- Tambahkan Link dan class */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        {/* ... sisa kode tidak berubah, kecuali button ... */}
        <div className="relative">
          <Image
            src={room.imageUrl}
            alt={`View of ${room.name}`}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          {room.rating && (
            <div className="absolute top-3 right-3 bg-white/90 text-gray-800 px-3 py-1 rounded-full flex items-center text-sm font-semibold">
              <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
              <span>{room.rating}</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>
          <p className="text-gray-600 text-sm mb-4 h-20">{room.description}</p>
          <div className="flex items-center space-x-4 text-gray-600 mb-6 text-sm">
            <span className="flex items-center"><BedDouble className="w-4 h-4 mr-2" />{room.details.bed}</span>
            <span className="flex items-center"><Users className="w-4 h-4 mr-2" />{room.details.guests} Guests</span>
          </div>
          <div className="w-full bg-green-800 text-white font-semibold py-2 px-4 rounded-md group-hover:bg-green-900 transition-colors text-center">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}