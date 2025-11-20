import { FeaturedRoomCard } from "@/components/FeaturedRoomCard";
import { StandardRoomCard } from "@/components/StandardRoomCard";
import { roomData } from "@/data/roomData";
import Image from 'next/image';
import { AmenitiesSection } from "@/components/AmenitiesSection";

export default function Catalog() {
  const featuredRooms = roomData.filter((room) => room.layoutType === 'featured');
  const standardRooms = roomData.filter((room) => room.layoutType === 'standard');

  return (
    <main className="bg-white">
      <div className="relative w-full">
        {/* 1. Hero Section Container */}
        <div className="relative h-[700px] w-full">

          {/* BACKGROUND IMAGE LOKAL */}
          {/* Menggunakan fill, object-cover, dan priority agar gambar dimuat cepat */}
          <Image
            src="/images/rooms/cover.png"  // Pastikan nama file sesuai dengan yang ada di folder public
            alt="Room Background"
            fill
            className="object-cover"
            priority 
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {/* Main Content (z-20 agar di atas overlay) */}
          <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center pb-20">

            {/* Breadcrumbs */}
            <div className="text-sm text-gray-200 mb-4 font-medium">
                Home &gt; Rooms & Accommodation
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Rooms <span className="font-light italic">&amp;</span> Accommodation
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-lg text-gray-100 mb-8 leading-relaxed">
                Immerse yourself in the rich cultural heritage of Java while enjoying
                modern comfort and traditional hospitality. Each room tells a story of
                Indonesian craftsmanship and timeless elegance.
            </p>

            {/* Button */}
            <div>
              <button className="bg-tembi hover:bg-darktembi text-white px-8 py-3 rounded transition-colors duration-300 flex items-center gap-3 font-medium">
              
                {/* --- BAGIAN ICON SEARCH DIGANTI DI SINI --- */}
                <div className="relative w-3 h-3"> 
                   <Image 
                      src="/images/icons/search.png" // Ganti dengan nama file icon lokal Anda di folder public
                      alt="Search Icon"
                      fill // Menggunakan fill agar responsif mengikuti w-5 h-5 parent-nya
                      className="object-contain" // Agar icon tidak gepeng/terpotong
                   />
                </div>
                {/* ------------------------------------------ */}
                Explore Rooms
              </button>
            </div>
          </div>

          {/* 2. Floating Stats Bar - Positioned Absolute */}
          <div className="absolute bottom-0 left-0 right-0 z-30 transform -translate-y-1/3">
            <div className="container mx-auto px-6">
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
                <div className="grid grid-cols-3 gap-8 text-center divide-x divide-gray-200">

                  {/* Stat 1 */}
                  <div className="flex flex-col items-center justify-center space-y-0">
                    <span className="text-2xl font-bold text-[#8B9D68]">7</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Room Categories</span>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex flex-col items-center justify-center space-y-0">
                    <span className="text-2xl font-bold text-[#8B9D68]">98%</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Guest Satisfaction</span>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex flex-col items-center justify-center space-y-0">
                    <span className="text-2xl font-bold text-[#8B9D68]">24/7</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Cultural Experience</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-16 bg-white"></div> 

        <div className="container mx-auto px-16 pb-20">
          {/* --- BAGIAN BARU: COLLECTION HEADER --- */}
          <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
                  Our Accommodation Collection
              </h2>
              <p className="text-gray-600">
                  Discover our carefully curated selection of rooms and suites, each designed to offer a unique blend of traditional Indonesian culture and modern luxury amenities.
              </p>
          </div>
          {/* -------------------------------------- */}

          {/* Featured Rooms */}
          <div className="space-y-12 mb-20">
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
      </div>
      <AmenitiesSection />
    </main>
  );
}