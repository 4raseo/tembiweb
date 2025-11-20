import Image from "next/image";
import type { Room } from "@/data/roomData";
import Link from "next/link";

interface FeaturedRoomCardProps {
  room: Room;
}

export function FeaturedRoomCard({ room }: FeaturedRoomCardProps) {
  return (
    <Link href={`/rooms/${room.slug}`} className="block group">
      <div className="flex flex-col md:flex-row bg-tembi rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        
        {/* Bagian Kiri: Konten Teks */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center text-white">
            
            {/* Badge Recommendation */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-yellow-100 border border-white/10">
                {/* Icon Crown Lokal */}
                <div className="relative w-4 h-4"> {/* Wrapper untuk Image icon */}
                  <Image 
                    src="/images/icons/crown.png" // Ganti path sesuai lokasi icon Anda
                    alt="Crown Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                Recommendation
              </span>
            </div>

            {/* Judul */}
            <h2 className="text-4xl font-serif font-bold mb-4 tracking-wide">
              {room.name}
            </h2>

            {/* Deskripsi */}
            <p className="text-gray-100/90 mb-8 text-sm leading-relaxed font-light opacity-90">
              {room.description}
            </p>
            
            {/* Info Detail (Icons Lokal) */}
            <div className="flex flex-wrap items-center gap-6 mb-10 text-sm font-medium text-gray-100">
              
              {/* Luas Ruangan */}
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-4 opacity-80"> {/* Wrapper untuk Image icon */}
                    <Image 
                        src="/images/icons/sizegray.png" // Ganti path sesuai lokasi icon Anda
                        alt="Size Icon"
                        fill
                        className="object-contain"
                    />
                </div>
                <span>{room.details.size || "45 m²"}</span> 
              </div>

              {/* Kapasitas Tamu */}
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-4 opacity-80"> {/* Wrapper untuk Image icon */}
                    <Image 
                        src="/images/icons/groupgray.png" // Ganti path sesuai lokasi icon Anda
                        alt="Guests Icon"
                        fill
                        className="object-contain"
                    />
                </div>
                <span>Up to {room.details.guests} guests</span>
              </div>

              {/* Pemandangan */}
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-4 opacity-80"> {/* Wrapper untuk Image icon */}
                    <Image 
                        src="/images/icons/leafgray.png" // Ganti path sesuai lokasi icon Anda
                        alt="View Icon"
                        fill
                        className="object-contain"
                    />
                </div>
                <span>Rice Field View</span>
              </div>

            </div>

            {/* Tombol */}
            <div className="bg-white text-tembi font-bold py-3 px-8 rounded hover:bg-gray-100 transition-colors w-fit text-sm tracking-wide">
              View Details
            </div>
        </div>

        {/* Bagian Kanan: Gambar Ruangan */}
        <div className="md:w-1/2 h-[350px] md:h-auto relative">
            <Image
              src={room.imageUrl}
              alt={`View of ${room.name}`}
              fill
              className="object-cover"
            />
        </div>
      </div>
    </Link>
  );
}