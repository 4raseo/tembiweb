import React from 'react';
import Image from 'next/image';

// --- Tipe Data untuk Fasilitas (8 Kotak Kecil) ---
interface FeatureItem {
  title: string;
  desc: string;
  iconSrc: string; // Path ke icon lokal
}

// --- Tipe Data untuk Ruangan Utama (3 Kotak Besar) ---
interface SpaceItem {
  title: string;
  desc: string;
  imageSrc: string; // Path ke foto ruangan
}

const SpacesSection: React.FC = () => {
  
  // 1. DATA FASILITAS (8 Kotak Atas)
  const features: FeatureItem[] = [
    {
      title: "Lodging",
      desc: "Traditional rooms with modern amenities",
      iconSrc: "/images/icons/bedw.png", // Pastikan file ada
    },
    {
      title: "Restaurant",
      desc: "Authentic Javanese cuisine",
      iconSrc: "/images/icons/foodw.png",
    },
    {
      title: "Gallery",
      desc: "Cultural art exhibitions",
      iconSrc: "/images/icons/galleryw.png",
    },
    {
      title: "Amphitheater",
      desc: "Performance and dance studio",
      iconSrc: "/images/icons/maskw.png",
    },
    {
      title: "Library",
      desc: "Cultural literature collection",
      iconSrc: "/images/icons/bookw.png",
    },
    {
      title: "Meeting Room",
      desc: "Business and cultural events",
      iconSrc: "/images/icons/handshakew.png",
    },
    {
      title: "Swimming Pool",
      desc: "Relaxation and wellness",
      iconSrc: "/images/icons/poolw.png",
    },
    {
      title: "Wedding Venue",
      desc: "Traditional ceremony spaces",
      iconSrc: "/images/icons/ringw.png",
    },
  ];

  // 2. DATA SPACE UTAMA (3 Kotak Bawah)
  const mainSpaces: SpaceItem[] = [
    {
      title: "Heritage Accommodation",
      desc: "Experience authentic Javanese hospitality in rooms decorated with traditional crafts and modern comfort.",
      imageSrc: "/images/sejarah/sejarah8.svg",
    },
    {
      title: "Cultural Venues",
      desc: "Our amphitheater and studios host regular performances, workshops, and cultural celebrations.",
      imageSrc: "/images/sejarah/sejarah9.svg",
    },
    {
      title: "Special Events",
      desc: "Create memorable moments with traditional Javanese ceremonies and modern event facilities.",
      imageSrc: "/images/sejarah/sejarah10.svg",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-screen-xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-sm font-bold tracking-widest text-[#9CA389] uppercase mb-4">
            Our Spaces
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3B2A] mb-6">
            Where Culture Meets Comfort
          </h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed">
            Every space at Tembi is thoughtfully designed to honor our heritage while offering comfort and practicality.
          </p>
        </div>

        {/* --- GRID 1: 8 FITUR KECIL --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#F8F6F1] rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Lingkaran Icon Hijau */}
              <div className="w-16 h-16 bg-[#8da372] rounded-full flex items-center justify-center mb-6 shadow-sm">
                <div className="relative w-8 h-8">
                  <Image 
                    src={item.iconSrc} 
                    alt={item.title} 
                    fill 
                    // brightness-0 invert: Mengubah icon hitam menjadi putih
                    className="object-contain brightness-0 invert" 
                  />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#4A3B2A] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- GRID 2: 3 KOTAK BESAR (FOTO) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainSpaces.map((space, index) => (
            <div 
              key={index} 
              className="group bg-[#F8F6F1] rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Bagian Gambar */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image 
                  src={space.imageSrc} 
                  alt={space.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Bagian Teks */}
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-[#4A3B2A] mb-4">
                  {space.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-sm">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpacesSection;