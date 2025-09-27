import { FeaturedRoomCard } from "@/components/FeaturedRoomCard";
import { StandardRoomCard } from "@/components/StandardRoomCard";
import { roomData } from "@/data/roomData";

export default function Catalog() {
  const featuredRooms = roomData.filter((room) => room.layoutType === 'featured');
  const standardRooms = roomData.filter((room) => room.layoutType === 'standard');

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Accommodation Collection
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600">
            Discover our prestigious collection of luxury villas and suites, blending authentic
            Indonesian culture and traditional luxury structures.
          </p>
        </div>

        {/* Featured Rooms */}
        <div className="space-y-8 mb-12">
          {featuredRooms.map((room) => (
            <FeaturedRoomCard key={room.id} room={room} />
          ))}
        </div>
        
        {/* Standard Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standardRooms.map((room) => (
            <StandardRoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </main>
  );
}