import Image from "next/image";
import { BedDouble, Users} from "lucide-react";
import type { Room } from "@/data/roomData";

interface StandardRoomCardProps {
  room: Room;
}

export function StandardRoomCard({ room }: StandardRoomCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Image
          src={room.imageUrl}
          alt={`View of ${room.name}`}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>
        <p className="text-gray-600 text-sm mb-4 h-20">{room.description}</p>

        <div className="flex items-center space-x-4 text-gray-600 mb-6 text-sm">
          <span className="flex items-center"><BedDouble className="w-4 h-4 mr-2" />{room.features[0]}</span>
          <span className="flex items-center"><Users className="w-4 h-4 mr-2" />{room.features[1]}</span>
        </div>

        <button className="w-full bg-green-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-900 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}