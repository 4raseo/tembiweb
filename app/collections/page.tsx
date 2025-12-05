import React from 'react';
import Image from 'next/image';
import CollectionCard, { CollectionItem } from '@/components/CollectionCard';

interface StatItem {
  id: number;
  iconUrl: string;
  alt: string;
  value: string;
  label: string;
}

// Data statistik
const statsData: StatItem[] = [
  {
    id: 1,
    iconUrl: '/images/icons/diamond-green.svg', 
    alt: 'Artifacts Icon',
    value: '250+',
    label: 'Artifacts',
  },
  {
    id: 2,
    iconUrl: '/images/icons/calendar-green.svg', 
    alt: 'Origins Icon',
    value: '15th',
    label: 'Century Origins',
  },
  {
    id: 3,
    iconUrl: '/images/icons/gps-green.svg', 
    alt: 'Regions Icon',
    value: '5',
    label: 'Regions',
  },
  {
    id: 4,
    iconUrl: '/images/icons/group-green.svg', 
    alt: 'Visitors Icon',
    value: '50K+',
    label: 'Annual Visitors',
  },
];

type CollectionCategory = {
  title: string;
  items: CollectionItem[];
};

const collectionsData: CollectionCategory[] = [
  {
    title: "Cundrik Collection",
    items: [
      {
        id: 1,
        imageUrl: "/images/collection/GPT0541.svg", // Pastikan gambar ada
        category: "Cundrik",
        title: "GPT0541",
        description: "A small Javanese cundrik carried as a personal talisman. It represents alertness and protection, shaped with the fine coastal character of Cirebon craftsmanship."
      },
      {
        id: 2,
        imageUrl: "/images/collection/GPT0540.svg",
        category: "Cundrik",
        title: "GPT0540",
        description: "A longer cundrik forged with sanak patterns. Its flowing lines reflect Majapahit era techniques and symbolize resilience and personal strength."
      },
      {
        id: 3,
        imageUrl: "/images/collection/GPT0539.svg",
        category: "Cundrik",
        title: "GPT0539",
        description: "A slender cundrik used in household traditions and ceremonies. Its light form and Segaluh forging style highlight practicality and cultural identity."
      },
      {
        id: 4,
        imageUrl: "/images/collection/GPT0538.svg", // Pastikan gambar ada
        category: "Cundrik",
        title: "GPT0538",
        description: ""
      },
      {
        id: 5,
        imageUrl: "/images/collection/GPT0537.svg",
        category: "Cundrik",
        title: "GPT0537",
        description: ""
      },
      {
        id: 6,
        imageUrl: "/images/collection/GPT0536.svg",
        category: "Cundrik",
        title: "GPT0536",
        description: ""
      }
    ]
  },
  {
    title: "Sword Collection",
    items: [
      {
        id: 7,
        imageUrl: "/images/collection/GPT0578.svg",
        category: "Sword",
        title: "GPT0578",
        description: "A short Javanese sword carried as a personal protective item. It reflects Cirebon craftsmanship and symbolizes readiness and self defense."
      },
      {
        id: 8,
        imageUrl: "/images/collection/GPT0576.svg",
        category: "Sword",
        title: "GPT0576",
        description: "A slender Javanese sword with a longer blade and visible forging patterns. It reflects Majapahit metalwork and represents firmness."
      },
      {
        id: 9,
        imageUrl: "/images/collection/GPT0575.svg",
        category: "Sword",
        title: "GPT0575",
        description: "A light Javanese sword with a narrow blade and a simple wooden hilt. It follows the segaluh forging style and symbolizes cultural identity."
      },
      {
        id: 10,
        imageUrl: "/images/collection/GPT0574.svg", // Pastikan gambar ada
        category: "Sword",
        title: "GPT0574",
        description: ""
      },
      {
        id: 11,
        imageUrl: "/images/collection/GPT0572.svg",
        category: "Sword",
        title: "GPT0572",
        description: ""
      },
      {
        id: 12,
        imageUrl: "/images/collection/GPT0571.svg",
        category: "Sword",
        title: "GPT0571",
        description: ""
      }
    ]
  },
  {
    title: "Sken Collection",
    items: [
      {
        id: 13,
        imageUrl: "/images/collection/GPT0518.svg",
        category: "Sken",
        title: "GPT0518",
        description: "A small traditional Javanese dagger with a wooden handle and sheath. The Cekel Bahuluk symbolizes protection and practicality, often carried as a personal tool during the Majapahit era."
      },
      {
        id: 14,
        imageUrl: "/images/collection/GPT0521.svg",
        category: "Sken",
        title: "GPT0521",
        description: "A long, leaf-shaped traditional blade with a wooden hilt and sheath. The Kujang Malang represents courage and authority, used in both ceremonial and martial contexts during the Mataram Amangkurat period."
      },
      {
        id: 15,
        imageUrl: "/images/collection/GPT0516.svg",
        category: "Sken",
        title: "GPT0516",
        description: "A ceremonial dagger with a broad, leaf shaped blade and finely carved wooden handle and sheath. The Godong Suruh, meaning “betel leaf,” symbolizes sincerity, purity, and harmony in Javanese culture."
      },
      {
        id: 16,
        imageUrl: "/images/collection/GPT0517.svg", 
        category: "Sken",
        title: "GPT0517",
        description: "" // Tidak ada deskripsi di gambar
      },
      {
        id: 17,
        imageUrl: "/images/collection/GPT0519.svg",
        category: "Sken",
        title: "GPT0519",
        description: "" // Tidak ada deskripsi di gambar
      },
      {
        id: 18,
        imageUrl: "/images/collection/GPT0520.svg",
        category: "Sken",
        title: "GPT0520",
        description: "" // Tidak ada deskripsi di gambar
      }
    ]
  },
];

export default function CollectionsPage() {

  return (
    <main className="w-full">
      
      {/* ================= HERO SECTION ================= */}
      {/* Class layout (h-screen, relative, dll) dipindahkan ke section ini */}
      <section className="relative h-screen w-full overflow-hidden">
        
        {/* --- Background Image --- */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/collection/koleksicover.png" 
            alt="Tembi Historical Background" 
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          {/* Overlay Hitam Transparan & Gradient */}
          <div className="absolute inset-0 bg-black/60 sm:bg-gradient-to-r sm:from-black/80 sm:to-black/40" />
        </div>

        {/* --- Hero Content Container --- */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center">
          
          {/* Badge / Tag */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-100 px-4 py-1.5 rounded-full w-fit mb-6">
            <div className="relative flex items-center justify-center">
               <Image 
                 src="/images/icons/museum-white.svg"
                 alt="Heritage Icon"
                 width={18} 
                 height={18}
                 className="w-[18px] h-[18px] object-contain"
               />
            </div>
            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">
              Cultural Heritage Collection
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
            Tembi Historical <br />
            Collections
          </h1>

          {/* Description Text */}
          <div className="max-w-2xl text-gray-200 text-base sm:text-lg leading-relaxed space-y-4 mb-10">
            <p>
              Preserving Indonesias cultural heritage through timeless artifacts. 
              Discover the rich tapestry of Javanese culture through our carefully 
              curated collection of traditional items.
            </p>
            <p className="hidden sm:block text-gray-300/90">
              Tembi Historical Home is home to a rich collection of traditional Javanese 
              artifacts, tools, and crafts that tell the story of Indonesias cultural journey. 
              Each item reflects the craftsmanship, philosophy, and artistry of the local 
              people across generations.
            </p>
          </div>

          {/* CTA Button */}
          <div>
            <button className="group flex items-center gap-3 bg-[#8F9F6A] hover:bg-[#7d8c5c] text-white px-6 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <div className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/images/icons/view-white.svg"
                  alt="Explore Icon"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold tracking-wide">Explore Collections</span>
            </button>
          </div>

        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-8">
            
            {statsData.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center text-center group">
                
                {/* Icon Circle Background */}
                <div className="mb-6 w-20 h-20 rounded-full bg-[#F4F5F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div className="relative w-8 h-8">
                    <Image 
                      src={stat.iconUrl}
                      alt={stat.alt}
                      width={32}
                      height={32}
                      className="object-contain w-full h-full opacity-60"
                    />
                  </div>
                </div>

                {/* Value (Angka) */}
                <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#433422] mb-2">
                  {stat.value}
                </h3>

                {/* Label (Keterangan) */}
                <p className="font-sans text-sm sm:text-base text-gray-500 tracking-wide font-medium">
                  {stat.label}
                </p>
                
              </div>
            ))}

          </div>
        </div>
      </section>

      <div className="w-full bg-[#FAFAFA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Loop per Kategori (Cundrik, Sword, dll) */}
          {collectionsData.map((category, index) => (
            <div key={index} className="mb-20 last:mb-0">
              
              {/* Category Title */}
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#433422] mb-4">
                  {category.title}
                </h2>
              </div>

              {/* Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item) => (
                  <CollectionCard key={item.id} item={item} />
                ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    

    </main>
  );
}