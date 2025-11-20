import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/data/roomData";

interface StandardRoomCardProps {
  room: Room;
}

export function StandardRoomCard({ room }: StandardRoomCardProps) {
  // Logika dummy untuk badge status
  const isPremium = room.price > 1000000; 
  const badgeText = isPremium ? "Premium" : "Best Value";
  const badgeColor = isPremium ? "bg-[#8B9D68]" : "bg-[#6B7B4D]"; 

  return (
    <Link href={`/rooms/${room.slug}`} className="block group h-full">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
        
        {/* 1. IMAGE SECTION */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={room.imageUrl}
            alt={`View of ${room.name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge Kiri Atas (Premium / Best Value) */}
          <div className={`absolute top-4 left-4 ${badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
            {badgeText}
          </div>

          {/* Badge Kiri Bawah (Photos Count) */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium">
            {/* Icon Camera Lokal */}
            <div className="relative w-3.5 h-3.5">
              <Image 
                src="/images/icons/camera.png" 
                alt="camera" 
                fill 
                className="object-contain invert brightness-0 filter" // Opsional: agar icon putih jika gambar aslinya hitam
                // Atau hapus className di atas jika gambar sumber sudah putih
              />
            </div>
            <span>{Math.floor(Math.random() * 5) + 4} photos</span>
          </div>
        </div>

        {/* 2. CONTENT SECTION */}
        <div className="p-6 flex flex-col flex-grow">
          
          {/* Title & Rating Row */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-serif font-bold text-gray-800 leading-tight group-hover:text-[#8B9D68] transition-colors">
              {room.name}
            </h3>
            
            {/* Rating */}
            {/* <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100"> */}
              {/* Icon Star Lokal */}
              {/* <div className="relative w-3.5 h-3.5"> */}
                 {/* <Image  */}
                    {/* src="/images/icons/star.png"  */}
                    {/* alt="rating"  */}
                    {/* fill  */}
                    {/* className="object-contain" */}
                 {/* /> */}
              {/* </div> */}
              {/* <span className="text-sm font-bold text-gray-700">4.8</span> */}
            {/* </div> */}
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
            {room.description}
          </p>

          {/* Details Grid (2 Columns) */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-8">
            
            {/* Size */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src="/images/icons/size.png" alt="size" fill className="object-contain" />
              </div>
              <span>{room.details.size || "45 m²"}</span>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src="/images/icons/group.png" alt="guests" fill className="object-contain" />
              </div>
              <span>{room.details.guests} guests</span>
            </div>

            {/* View */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src="/images/icons/leafsm.png" alt="view" fill className="object-contain" />
              </div>
              <span >Garden view</span>
            </div>

            {/* Wifi */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src="/images/icons/wifi.png" alt="wifi" fill className="object-contain" />
              </div>
              <span>Free WiFi</span>
            </div>

          </div>

          {/* 3. FOOTER BUTTON */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <button className="w-full bg-[#8B9D68] hover:bg-[#738354] text-white font-semibold py-2.5 px-4 rounded transition-colors duration-300 text-sm tracking-wide shadow-sm hover:shadow-md">
              View Details
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}