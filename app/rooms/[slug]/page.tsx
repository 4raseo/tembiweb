import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { roomData } from '@/data/roomData';
import { 
  Star, ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

// 1. Generate Static Params
export async function generateStaticParams() {
  return roomData.map((room) => ({
    slug: room.slug,
  }));
}

// 2. Helper Function Format Rupiah
const formatRupiah = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(price);
};

// 3. Helper Function Icon Amenities
const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();
  
  // Tentukan path default
  let iconPath = '/images/icons/star.svg'; // Pastikan file ini ada di public/icons/

  // Logika mapping icon
  if (lower.includes('wifi')) iconPath = '/images/icons/wifi-green.svg';
  else if (lower.includes('air') || lower.includes('snow')) iconPath = '/images/icons/snow-green.svg';
  else if (lower.includes('bath') || lower.includes('toilet')) iconPath = '/images/icons/bathub-green.svg';
  else if (lower.includes('rice') || lower.includes('garden')) iconPath = '/images/icons/leaf-green.svg';
  else if (lower.includes('bar') || lower.includes('mini')) iconPath = '/images/icons/minibar-green.svg';
  else if (lower.includes('terrace') || lower.includes('terace')) iconPath = '/images/icons/terrace-green.svg';
  else if (lower.includes('pool') || lower.includes('swim')) iconPath = '/images/icons/swim-green.svg';
  
  // Return komponen Image Next.js
  return (
    <Image 
      src={iconPath} 
      alt={amenity}
      width={20} 
      height={20}
      className="object-contain" // Menjaga proporsi gambar
    />
  );
};

interface RoomDetailProps {
  params: { slug: string };
}

export default function RoomDetail({ params }: RoomDetailProps) {
  const room = roomData.find((r) => r.slug === params.slug);

  if (!room) {
    return notFound();
  }

  // Fallback gallery logic
  // const galleryImages = room.galleryImages.length > 0 && room.galleryImages[0] !== "" 
  //   ? room.galleryImages 
  //   : [room.imageUrl, room.imageUrl, room.imageUrl, room.imageUrl];

  return (
    <main className="bg-[#F8F9FA] min-h-screen pb-20">
      
      {/* --- SECTION 1: HERO --- */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src={room.imageUrl}
          alt={room.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* Dark Overlay Gradient untuk teks putih */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Back Button */}
        <Link href="/rooms" className="absolute top-24 left-6 z-20 text-white hover:text-gray-200 flex items-center gap-2 transition-colors">
            <ArrowLeft size={24} /> <span className="font-medium">Back to Collection</span>
        </Link>

        {/* Hero Content (Judul Putih di Bawah Gambar) */}
        <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
          <div className="container mx-auto px-4 md:px-10">
            
            {/* Badge & Rating */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-[#8B9D68] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recommendation
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                 {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className={i < Math.floor(room.rating || 5) ? "text-yellow-400" : "text-gray-400"} />
                ))}
                <span className="text-gray-300 text-sm ml-2 font-medium">({room.rating || 4.9}/5)</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-md">
              {room.name}
            </h1>
            <p className="text-gray-300 text-lg font-light tracking-wide">
              {room.tagline}
            </p>

          </div>
        </div>
      </section>

      {/* --- CONTENT CONTAINER --- */}
      <div className="container mx-auto px-4 md:px-10 py-12 space-y-8">
        
        {/* === SECTION 2: INFO UTAMA === */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          
          {/* HEADER ROW DALAM CARD: Judul Hitam & Harga */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                {room.name}
              </h2>
              
              {/* Icons Specs */}
              <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
  
              {/* Bed Icon */}
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 opacity-80">
                  <Image 
                    src="/images/icons/bed-green.svg" 
                    alt="Bed Size"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{room.details.bed}</span>
              </div>

              {/* Guests Icon */}
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 opacity-80">
                  <Image 
                    src="/images/icons/group-green.svg" 
                    alt="Guests Capacity"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{room.details.guests} Guests</span>
              </div>

              {/* Size Icon */}
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 opacity-80">
                  <Image 
                    src="/images/icons/corner-green.svg" 
                    alt="Room Size"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{room.details.size}</span>
              </div>

            </div>
            </div>

            {/* Harga */}
            <div className="mt-6 md:mt-0 text-left md:text-right">
              <div className="text-3xl font-bold text-[#8B9D68]">
                {formatRupiah(room.price)}
              </div>
              <p className="text-gray-400 text-sm mt-1">per night</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-6 text-gray-600 leading-relaxed mb-10 text-justify md:text-left">
            {room.longDescription.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* SEPARATOR */}
          <hr className="border-gray-100 mb-10" />

          {/* AMENITIES GRID */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">
              Cultural Amenities & Facilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg">
                  <div className="text-[#8B9D68] opacity-80">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === SECTION 3: GALLERY === */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-bold text-gray-800 font-serif">Room Gallery</h3>
            <button className="text-[#8B9D68] font-semibold hover:underline cursor-pointer text-sm">
              View All Photos
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {room.galleryImages?.map((imageSrc, index) => {
             // Cek apakah ini gambar pertama
              const isFirst = index === 0;

              return (
                <div 
                  key={index} 
                  className={`relative rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300
                    ${isFirst ? 'sm:col-span-2 sm:row-span-2' : ''} 
                  `}
                >
                  <Image
                    src={imageSrc}
                    alt={`${room.name} room ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay tipis */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              );
            })}
          </div>
        </section>

        {/* === SECTION 4: ROOM POLICIES & INFORMATION === */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 font-serif">
            Room Policies & Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            
            {/* Column 1: Check-in & Check-out */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm">Check-in & Check-out</h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li className="flex items-center gap-3">
                   <div className="relative w-4 h-4 opacity-70">
                      <Image src="/images/icons/clock-green.svg" alt="-green" fill className="object-contain" />
                   </div>
                   <span>Check-in: {room.policies.checkIn}</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="relative w-4 h-4 opacity-70">
                      <Image src="/images/icons/clock-green.svg" alt="clock" fill className="object-contain" />
                   </div>
                   <span>Check-out: {room.policies.checkOut}</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="relative w-4 h-4 opacity-70">
                      <Image src="/images/icons/id-green.svg" alt="id" fill className="object-contain" />
                   </div>
                   <span>Valid ID required</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Cancellation Policy */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm">Cancellation Policy</h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li className="flex items-center gap-3">
                   <div className="relative w-4 h-4">
                      <Image src="/images/icons/check.svg" alt="check" fill className="object-contain" />
                   </div>
                   <span>Free cancellation 48h before</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="relative w-4 h-4">
                      <Image src="/images/icons/info.svg" alt="info" fill className="object-contain" />
                   </div>
                   <span>50% refund 24h before</span>
                </li>
                <li className="flex items-center gap-3">
                   <div className="relative w-4 h-4">
                      <Image src="/images/icons/warning.svg" alt="warning" fill className="object-contain" />
                   </div>
                   <span>No refund same day</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Separator */}
          <hr className="border-gray-100 mb-8" />

          {/* Bottom Row: House Rules */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm">House Rules</h4>
            <div className="flex flex-wrap gap-8 text-gray-600 text-sm">
              
              {/* Rule 1: Smoking */}
              <div className="flex items-center gap-3">
                 <div className="relative w-4 h-4 opacity-60">
                    <Image src="/images/icons/no-smoking.svg" alt="smoking" fill className="object-contain" />
                 </div>
                 <span>{room.houseRules.smoking ? "Smoking allowed" : "No smoking"}</span>
              </div>

              {/* Rule 2: Pets */}
              <div className="flex items-center gap-3">
                 <div className="relative w-4 h-4 opacity-60">
                    <Image src="/images/icons/pet-green.svg" alt="pets" fill className="object-contain" />
                 </div>
                 <span>{room.houseRules.pets ? "Pets allowed" : "No pets allowed"}</span>
              </div>

              {/* Rule 3: Quiet Hours */}
              <div className="flex items-center gap-3">
                 <div className="relative w-4 h-4 opacity-60">
                    <Image src="/images/icons/sound-green.svg" alt="quiet" fill className="object-contain" />
                 </div>
                 <span>Quiet hours {room.houseRules.quietHours}</span>
              </div>

            </div>
          </div>
        </section>

        {/* === SECTION 5: BOOKING ACTION === */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:px-10 md:py-8">
           <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif self-start md:self-auto">
                {room.name}
              </h3>
              <div className="mt-6 md:mt-0 text-left md:text-right">
                <div className="text-3xl font-bold text-[#8B9D68]">
                  {formatRupiah(room.price)}
                </div>
                <p className="text-gray-400 text-sm mt-1">per night</p>
              </div>
           </div>
           
           <Link 
             href="/booking" 
             className="block w-full bg-[#8B9D68] hover:bg-[#738354] text-white text-lg font-bold py-4 rounded-lg shadow-sm transition-all duration-300 text-center"
           >
             Booking Now
           </Link>
        </section>

      </div>
    </main>
  );
}
