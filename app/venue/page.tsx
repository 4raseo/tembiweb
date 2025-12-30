import React from 'react';
import Image from 'next/image';
import VenueCard from '@/components//VenueCard';
import { venueData } from '@/data/venueData';
import VenueGallery from '@/components/VenueGallery';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';


const VenuePage = () => {
  return (
    <main className="w-full min-h-screen">
      
      {/* ... [BAGIAN HERO SECTION TETAP SAMA] ... */}
      <section className="relative h-screen w-full overflow-hidden">
  
      {/* --- Background Image --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/venue/venue-hero.svg" // Pastikan gambar background venue Anda ada di sini
          alt="Tembi Venue Background" 
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Overlay Hitam agar teks terbaca jelas */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* --- Hero Content Container --- */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center">
    
        {/* Main Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
          <span className="text-white">Venue Rental at </span>
          {/* Warna Hijau untuk 'Tembi Historical Home' */}
          <span className="text-[#96A66D]">Tembi</span> <br />
          <span className="text-[#96A66D]">Historical Home</span>
        </h1>

        {/* Subtitle Putih */}
        <p className="text-white text-xl sm:text-2xl mb-2 font-light tracking-wide">
          Elegant spaces for unforgettable moments
        </p>

        {/* Green Tagline */}
        <p className="text-[#96A66D] text-lg sm:text-xl mb-8 font-medium">
          Easy booking, smooth event, warm atmosphere
        </p>

        {/* Description Text */}
        <div className="max-w-3xl text-gray-200 text-base sm:text-lg leading-relaxed mb-10">
          <p>
            Tembi Historical Home offers a collection of traditional Javanese venues 
            designed for various events — from intimate gatherings to grand celebrations. 
            Enjoy a calm atmosphere, complete facilities, and the authentic warmth of 
            Javanese culture.
          </p>
        </div>

        {/* CTA Button: Book Now */}
        <div>
          {/* Anda bisa mengganti <button> dengan <Link href="/booking"> jika ingin navigasi */}
            <button className="flex items-center gap-3 bg-[#8F9F6A] hover:bg-[#7d8c5c] text-white px-8 py-3.5 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <div className="relative w-5 h-5">
              {/* Icon Calendar Local */}
              <Image 
                src="/images/icons/calendar-white.svg" // Pastikan Anda punya icon calendar putih
                alt="Calendar Icon"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold tracking-wide">Book Now</span>
          </button>
        </div>

      </div>
    </section>
      {/* ... (Kode Hero Section tidak saya tulis ulang agar ringkas) ... */}

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-[#F9F9F0]">
        <div className="container mx-auto px-6">
          
          <ScrollReveal animation="fadeUp" duration={800}>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-[#2C2420]">
                Choose Your Perfect Venue
              </h2>
              <p className="text-[#5C5C5C] max-w-2xl mx-auto text-lg leading-relaxed">
                From traditional Pendopo to intimate garden spaces, each venue at Tembi Historical Home
                offers unique charm and complete facilities for your special occasion.
              </p>
            </div>
          </ScrollReveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <ScrollReveal animation="fadeUp" delay={0} duration={800}>
              <FeatureCard 
                iconSrc="/images/icons/build-white.svg"
                title="Traditional Architecture"
                description="Authentic Javanese design with modern amenities"
              />
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal animation="fadeUp" delay={150} duration={800}>
              <FeatureCard 
                iconSrc="/images/icons/group-white.svg"
                title="Flexible Capacity"
                description="From intimate 20-person to grand 150-person events"
              />
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal animation="fadeUp" delay={300} duration={800}>
              <FeatureCard 
                iconSrc="/images/icons/leaf-white.svg"
                title="Natural Setting"
                description="Beautiful gardens and open-air venues"
              />
            </ScrollReveal>

          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FFFDF5]">
      <div className="container mx-auto px-6">
        
        <ScrollReveal animation="fadeUp" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C2420] mb-4">
              Our Venue Collection
            </h2>
            <p className="text-[#5C5C5C] max-w-2xl mx-auto">
              Discover the perfect space for your event from our curated selection of
              traditional and elegant venues.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {venueData.map((venue, idx) => (
            // Bungkus Card dengan Link menuju slug masing-masing
            <ScrollReveal key={venue.slug} animation="fadeUp" delay={idx * 150} duration={800}>
              <Link href={`/venue/${venue.slug}`} className="group block h-full">
                <VenueCard 
                  imageSrc={venue.heroImage}
                  title={venue.title}
                  description={venue.shortDescription}
                  capacity={venue.capacity}
                  facilities={venue.facilities}
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>

    <VenueGallery />
    
    <section className="w-full bg-[#8F9F6A] py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        
        {/* --- Heading & Description --- */}
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Siap mengadakan acara anda di Tembi <br className="hidden md:block" />
          Rumah Budaya?
        </h2>
        
        <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
          Kami bantu anda memilih venue terbaik untuk momen spesial Kamu. Tim berpengalaman kami 
          siap mendampingi agar acara Kamu berjalan lancar dan penuh kenangan di ruang tradisional 
          yang memikat.
        </p>

        {/* --- Button Hubungi Tim Kami --- */}
        <div className="mb-16">
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#8F9F6A] transition-colors duration-300 font-semibold"
          >
            <div className="relative w-5 h-5">
              {/* Gunakan icon telepon putih, akan terlihat kontras di bg hijau */}
              {/* Saat hover, idealnya icon berubah warna menjadi hijau, tapi untuk simplifikasi Image statis, tetap putih/neutral tidak masalah atau gunakan CSS filter */}
              <Image 
                src="/images/icons/phone-white.svg" 
                alt="Phone" 
                width={20} 
                height={20}
                className="object-contain"
              />
            </div>
            <span>Hubungi Tim Kami</span>
          </Link>
        </div>

        {/* --- Features Grid (3 Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Respons Cepat */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 flex flex-col items-center hover:bg-white/20 transition-colors">
            <div className="mb-4 relative w-10 h-10">
              <Image 
                src="/images/icons/clock-white.svg" // Icon Jam
                alt="Respons Cepat" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Respons Cepat</h3>
            <p className="text-white/80 text-sm">
              Respons cepat dalam 2 jam
            </p>
          </div>

          {/* Card 2: Personal Service */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 flex flex-col items-center hover:bg-white/20 transition-colors">
            <div className="mb-4 relative w-10 h-10">
               <Image 
                src="/images/icons/handshake-white.svg" // Icon Salaman/Kerjasama
                alt="Personal Service" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Personal Service</h3>
            <p className="text-white/80 text-sm">
              Pendampingan personal dari event coordinator
            </p>
          </div>

          {/* Card 3: Guaranteed Quality */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 flex flex-col items-center hover:bg-white/20 transition-colors">
            <div className="mb-4 relative w-10 h-10">
               <Image 
                src="/images/icons/star-white.svg" // Icon Bintang
                alt="Guaranteed Quality" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Guaranteed Quality</h3>
            <p className="text-white/80 text-sm">
              Kualitas layanan terjamin 100 persen
            </p>
          </div>

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