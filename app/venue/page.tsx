import React from 'react';
import Image from 'next/image';
import VenueCard from '@/components//VenueCard';
import { venueData } from '@/data/venueData';
import Link from 'next/link';


const VenuePage = () => {
  return (
    <main className="w-full min-h-screen">
      
      {/* ... [BAGIAN HERO SECTION TETAP SAMA] ... */}
      {/* ... (Kode Hero Section tidak saya tulis ulang agar ringkas) ... */}

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-[#F9F9F0]">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C2420]">
              Choose Your Perfect Venue
            </h2>
            <p className="text-[#5C5C5C] max-w-2xl mx-auto text-lg leading-relaxed">
              From traditional Pendopo to intimate garden spaces, each venue at Tembi Historical Home
              offers unique charm and complete facilities for your special occasion.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <FeatureCard 
              iconSrc="/icons/architecture.png" // Ganti dengan nama file gambar Anda
              title="Traditional Architecture"
              description="Authentic Javanese design with modern amenities"
            />

            {/* Card 2 */}
            <FeatureCard 
              iconSrc="/icons/capacity.png" // Ganti dengan nama file gambar Anda
              title="Flexible Capacity"
              description="From intimate 20-person to grand 150-person events"
            />

            {/* Card 3 */}
            <FeatureCard 
              iconSrc="/icons/nature.png" // Ganti dengan nama file gambar Anda
              title="Natural Setting"
              description="Beautiful gardens and open-air venues"
            />

          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FFFDF5]">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C2420] mb-4">
            Our Venue Collection
          </h2>
          <p className="text-[#5C5C5C] max-w-2xl mx-auto">
            Discover the perfect space for your event from our curated selection of
            traditional and elegant venues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {venueData.map((venue) => (
            // Bungkus Card dengan Link menuju slug masing-masing
            <Link key={venue.slug} href={`/venue/${venue.slug}`} className="group block h-full">
              <VenueCard 
                imageSrc={venue.heroImage}
                title={venue.title}
                description={venue.shortDescription}
                basePrice={venue.basePriceString}
                baseDuration="2 hours"
                extraPrice={venue.extraPriceString}
                extraDuration="Extra hour"
                capacity={venue.capacity}
                facilities={venue.facilities}
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
    </main>
  );
};

// --- Komponen FeatureCard Diperbarui ---
interface FeatureCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureCard = ({ iconSrc, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-[#FFFDF5] p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center border border-[#EBEBE0]">
      
      {/* Lingkaran Hijau Pembungkus Icon */}
      <div className="w-16 h-16 rounded-full bg-[#8FA876] flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
        
        {/* Container Gambar (Agar ukurannya proporsional di dalam lingkaran) */}
        <div className="relative w-8 h-8"> 
          <Image
            src={iconSrc}
            alt={title}
            fill
            className="object-contain" // Agar gambar tidak terpotong/gepeng
          />
        </div>

      </div>
      
      <h3 className="text-xl font-serif text-[#2C2420] mb-3 font-semibold">
        {title}
      </h3>
      <p className="text-[#6B6B6B] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default VenuePage;