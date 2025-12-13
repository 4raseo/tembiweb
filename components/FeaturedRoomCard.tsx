import Image from "next/image";
import type { Room } from "@/data/roomData";
import Link from "next/link";

interface FeaturedRoomCardProps {
  room: Room;
}

export function FeaturedRoomCard({ room }: FeaturedRoomCardProps) {
  return (
    <Link href={`/rooms/${room.slug}`} className="block group">
      <div className="flex flex-col md:flex-row bg-[#EAF0E5] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{room.name}</h2>
            <p className="text-gray-600 mb-6">{room.description}</p>
            
            {/* BAGIAN YANG DIPERBAIKI */}
            <div className="flex items-center space-x-6 mb-8 text-gray-700">
              <span>Up to {room.details.guests} guests</span>
              <span>{room.amenities[5]}</span> {/* Menampilkan 'Terrace' dari data */}
            </div>

            <div className="bg-green-800 text-white font-semibold py-2 px-6 rounded-md w-fit group-hover:bg-green-900 transition-colors">
              View Details
            </div>
        </div>
        <div className="md:w-1/2 h-64 md:h-auto">
            <Image
            src={room.imageUrl}
            alt={`View of ${room.name}`}
            width={600}
            height={400}
            className="w-full h-full object-cover"
            />
        </div>
      </div>
    </Link>
  );
}