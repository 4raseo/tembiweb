// app/page.tsx
'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data dummy
const houses = [
  {
    name: 'Ngadirojo',
    desc: 'Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten, Central Java, to Tembi in 2007. Combining Javanese architecture with natural tranquility, it is an ideal choice for guests seeking peace and culture.',
    image: '/images/rooms/ngadirojo/ngadirojo.png',
    features: ['King Bed', 'Rice Field View'],
  },
  {
    name: 'Polaman',
    desc: 'Polaman House is a traditional Javanese limasan built in 1948 and relocated from Bawak Village, Cawas, Klaten, to Tembi in 2007. It combines the warmth of Javanese architecture with natural landscapes, making it perfect for an authentic and peaceful stay.',
    image: '/images/rooms/polaman/polaman.png',
    features: ['King Bed', 'Rice Field View'],
  },
  {
    name: 'Adikarto',
    desc: 'Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul Regency, it was relocated to Tembi in 2007 as part of cultural preservation efforts.',
    image: '/images/rooms/adikarto/adikarto.png',
    features: ['King Bed', 'Rice Field View'],
  },
];

const heroImages = [
  '/images/cover1.png', // Gambar pertama
  '/images/cover2.png', // Ganti dengan path gambar kedua Anda
  '/images/cover3.png', // Ganti dengan path gambar ketiga Anda
  // Tambahkan lebih banyak gambar jika diinginkan
];

const icons = [
  { icon: "/images/icons/wifi.png", text: "Complimentary Wi-Fi" },
  { icon: "/images/icons/cup.png", text: "Welcome Tea Ceremony" },
  { icon: "/images/icons/flower.png", text: "Traditional Amenities" },
  { icon: "/images/icons/bell.png", text: "Cultural Concierge" },
  { icon: "/images/icons/bicycle.png", text: "Bicycle Access" },
  { icon: "/images/icons/music.png", text: "Gamelan Course" },
];

const heritageFeatures = [
  {
    title: "Cultural Heritage",
    desc: "Authentic Javanese architecture and traditions",
    icon: "/images/icons/museum.png" // Icon bangunan/museum
  },
  {
    title: "Natural Harmony",
    desc: "Surrounded by lush tropical gardens and rice fields",
    icon: "/images/icons/leaf.png" // Icon daun
  },
  {
    title: "Luxury Experience",
    desc: "Modern amenities with traditional elegance",
    icon: "/images/icons/diamond.png" // Icon diamond/mewah
  }
];

const foodPoints = [
  { text: "Fresh ingredients from local organic farms", icon: "/images/icons/leafsm.png" },
  { text: "Traditional recipes with modern presentation", icon: "/images/icons/food.png" },
  { text: "Curated selection of Indonesian and international wines", icon: "/images/icons/glass.png" },
];

const eventPackages = [
  {
    title: "Wedding Ceremonies",
    description: "Exchange vows in our sacred pendopo pavilion, surrounded by the timeless beauty of Javanese architecture and lush tropical gardens. Our wedding specialists will ensure every detail honors your cultural traditions while creating a truly magical celebration.",
    image: "/images/homepage/wedding.png", // Ganti dengan foto pernikahan
    buttonText: "Plan Your Wedding",
    features: [
      { text: "Capacity: Up to 150 guests", icon: "/images/icons/group.png" }, // Icon orang banyak
      { text: "Garden ceremony options", icon: "/images/icons/leafsm.png" }, // Icon daun
      { text: "Traditional gamelan accompaniment", icon: "/images/icons/music.png" }, // Icon nada musik
    ]
  },
  {
    title: "Corporate Retreats",
    description: "Inspire creativity and team building in our serene cultural environment. Our meeting spaces blend traditional architecture with modern technology, providing the perfect setting for productive sessions and meaningful connections.",
    image: "/images/homepage/corporate.png", // Ganti dengan foto rapat
    buttonText: "Book Corporate Event",
    features: [
      { text: "Multiple room configurations", icon: "/images/icons/group.png" }, // Icon denah/layout
      { text: "High-speed internet & AV equipment", icon: "/images/icons/wifi.png" }, // Icon wifi
      { text: "Traditional refreshment service", icon: "/images/icons/cup.png" }, // Icon kopi/cangkir
    ]
  }
];

const collections = [
  {
    title: "Cundrik Collection",
    desc: "A small Javanese cundrik carried as a personal talisman.",
    image: "/images/collection/cundrik1.png" 
  },
  {
    title: "Cundrik Collection",
    desc: "A longer cundrik forged with sanak patterns. Its flowing lines reflect Majapahit era.",
    image: "/images/collection/cundrik2.png"
  },
  {
    title: "Sword Collection",
    desc: "A small Javanese sword carried as a personal protective item.",
    image: "/images/collection/sword1.png"
  },
  {
    title: "Sword Collection",
    desc: "A slender Javanese sword with a longer blade and visible forging patterns.",
    image: "/images/collection/sword2.png"
  },
  {
    title: "Sken Collection",
    desc: "A small traditional Javanese dagger with a wooden handle and sheath.",
    image: "/images/collection/sken1.png"
  },
  {
    title: "Sken Collection",
    desc: "A long, leaf-shaped traditional blade with a wooden hilt and sheath.",
    image: "/images/collection/sken2.png"
  },
  {
    title: "Spear Collection",
    desc: "A traditional Javanese dagger with a long, narrow blade and a simple wooden hilt.",
    image: "/images/collection/spear1.png"
  },
  {
    title: "Spear Collection",
    desc: "A traditional dagger featuring a distinctive patterned (pamor) blade and dark wooden handle.",
    image: "/images/collection/spear2.png"
  }
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Ganti gambar setiap 5 detik
    return () => clearInterval(interval); // Cleanup interval saat komponen di-unmount
  }, []);
  return (
    <div className="bg-white text-gray-800">
      <main>
        {/* Cover Section */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex
                    ? 'opacity-100 translate-x-0'
                    : index < currentImageIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <Image
                  src={image}
                  alt="Beautiful resort view"
                  layout="fill"
                  objectFit="cover"
                  className="z-0"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
              Where Culture <br /> Meets Serenity
            </h2>
            <p className="text-xl md:text-xl max-w-2xl mb-8 font-light tracking-wide">
              Experience authentic Javanese heritage in luxurious comfort
            </p>
            <div className="flex space-x-4">
              <Link
                href="/rooms"
                className="bg-tembi hover:bg-darktembi text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg"
              >
                Explore Our Rooms
              </Link>
              <Link
                href="/rooms"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300 shadow-lg"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-10 bg-stone-50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-6xl font-serif font-thin mb-10">A Living Museum of Javanese Heritage</h3>
              <p className="text-gray-600 mb-6">
                Tembi Rumah Budaya stands as a testament to Indonesias rich cultural tapestry, where traditional Javanese architecture harmoniously blends with contemporary luxury.
              </p>
              <p className="text-gray-600 mb-10">
                Nestled amidst lush tropical gardens, our cultural resort offers an immersive journey through time, celebrating the artistry, spirituality, and wisdom of ancient Java.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-3xl font-bold text-tembi">2000</h4>
                  <p className="text-gray-500 text-sm mt-1">Founded</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-tembi">500+</h4>
                  <p className="text-gray-500 text-sm mt-1">Artifacts</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-tembi">7</h4>
                  <p className="text-gray-500 text-sm mt-1">House</p>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/homepage/content1.png"
                alt="Living museum architecture"
                width={600}
                height={450}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* House Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-xs font-bold tracking-[0.2em] text-tembi uppercase mb-3">
                  Accommodation
              </h4>
              <h2 className="text-5xl font-serif text-gray-900 mb-6">
                  Cultural <span className="italic font-normal">House</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                  Each house is a sanctuary of cultural heritage, thoughtfully designed to immerse you in the timeless elegance of Javanese architecture while providing modern luxury.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20 mx-20 w-400">
              {houses.map((house, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      
                  {/* House Image */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={house.image}
                      alt={house.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 rounded-sm shadow-sm">
                      Recommendation
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">
                      {house.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
                      {house.desc}
                    </p>

                    {/* Facilities */}
                    <div className="flex gap-5 text-xs text-gray-500 mb-8 border-t border-gray-100 pt-4">
                      {/* Icon */}
                      <div className="flex items-center gap-2">
                        <div className="relative w-3 h-3">
                          <Image src="/images/icons/bedgray.png" alt="Bed" fill className="object-contain" />
                        </div>
                        <span>King Bed</span>
                      </div>

                      {/* Icon */}
                      <div className="flex items-center gap-2">
                        <div className="relative w-3 h-3">
                          <Image src="/images/icons/field.png" alt="View" fill className="object-contain" />
                        </div>
                        <span>Rice Field View</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="w-28 bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-6 rounded-sm transition-colors mx-auto">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Pavilions Include */}
          <div className="bg-stone-50 rounded-lg p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-12 items-center">
    
              {/* Icon */}
              <div>
                <h3 className="text-2xl font-serif font-bold mb-8 text-gray-900">
                  All Pavilions Include
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {icons.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                      <div className="relative w-5 h-5 flex-shrink-0"> 
                        <Image 
                          src={item.icon} 
                          alt={item.text}
                          fill
                          className="object-contain"
                          sizes="20px"
                        />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text & Button */}
              <div className="text-center md:text-right md:border-l md:border-gray-200 md:px-12 flex flex-col items-center md:items-end justify-center h-full">
                <p className="text-gray-600 mb-6 leading-relaxed text-center md:text-right md:pl-20">
                  Experience authentic Javanese hospitality with modern comfort and cultural immersion.
                </p>
                <button className="bg-[#8B9B6D] hover:bg-[#7a8a5e] text-white py-3 px-8 rounded-sm text-sm font-medium transition-colors">
                  View All House
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sanctuary Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">

            {/* A SANCTUARY OF HERITAGE */}
            <div className="text-center max-w-4xl mx-auto mb-32">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
                A Sanctuary of Heritage
              </h2>
              <p className="text-gray-600 leading-relaxed mb-16 px-4 md:px-12 text-lg">
                Nestled in the heart of Yogyakarta, Tembi Historical Home is more than a resort, 
                its a living collection where centuries old Javanese traditions harmoniously blend 
                with contemporary luxury. Our carefully preserved cultural spaces and authentic architecture 
                create an immersive experience that celebrates Indonesias rich heritage while providing 
                the ultimate in comfort and tranquility.
              </p>

              {/* 3 Kolom Fitur */}
              <div className="grid md:grid-cols-3 gap-12">
                {heritageFeatures.map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    {/* Icon Container */}
                    <div className="relative w-10 h-10 mb-4">
                      <Image 
                        src={feature.icon} 
                        alt={feature.title} 
                        fill 
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* --- BAGIAN 2: FOOD AND DRINK PACKAGES --- */}
            <div className="grid md:grid-cols-2 gap-16 items-center mx-20">

              {/* Sisi Kiri: Teks & List */}
              <div className=''>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-10 leading-tight">
                  Food And Drink <br/> Packages
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed pr-16 text-lg">
                  Embark on a culinary journey that celebrates the rich flavors of Indonesian cuisine. 
                  Our restaurant combines traditional recipes passed down through generations with 
                  contemporary culinary techniques, creating an unforgettable dining experience in an 
                  elegant setting that honors our cultural heritage.
                </p>

                {/* List Poin dengan Icon Kecil */}
                <div className="space-y-7 mb-10">
                  {foodPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="relative w-4 h-4 flex-shrink-0">
                        <Image 
                          src={point.icon} 
                          alt="icon" 
                          fill 
                          className="object-contain"
                        />
                      </div>
                      <span className="text-gray-600 text-sm font-medium">
                        {point.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button Pill Shape (Bulat Lonjong) */}
                <button className="bg-tembi hover:bg-darktembi text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md">
                  View Packages
                </button>
              </div>

              {/* Sisi Kanan: Galeri Grid Gambar */}
              <div className="grid grid-cols-2 gap-4">

                {/* Gambar Besar (Atas) - Mengambil 2 Kolom */}
                <div className="col-span-2 relative h-96 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/foods/food1.png" // Ganti gambar resto
                    alt="Restaurant Interior"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Gambar Kecil 1 (Bawah Kiri) */}
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/foods/food2.png" // Ganti gambar makanan 1
                    alt="Signature Dish"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Gambar Kecil 2 (Bawah Kanan) */}
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/foods/food3.png" // Ganti gambar makanan 2
                    alt="Dessert"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </section>
        
        {/* Event Section */}
        <section className="py-24 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6">

            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h4 className="text-xs font-bold tracking-[0.2em] text-[#8B9B6D] uppercase mb-3">
                Events & Celebrations
              </h4>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                Sacred Spaces for <span className="italic font-normal">Special Moments</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Create unforgettable memories in our culturally rich venues, where traditional Javanese architecture provides the perfect backdrop for weddings, corporate retreats, and cultural celebrations.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-10">
              {eventPackages.map((evt, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  
                  {/* Image Area */}
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                
                  {/* Content Area */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                      {evt.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                      {evt.description}
                    </p>

                    {/* Feature List dengan Icon Lokal */}
                    <div className="space-y-4 mb-8">
                      {evt.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {/* Icon Wrapper */}
                          <div className="relative w-4 h-4 flex-shrink-0 opacity-60">
                            <Image 
                              src={feature.icon} 
                              alt="icon" 
                              fill 
                              className="object-contain"
                            />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <div>
                      <button className="bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-8 rounded-sm transition-colors w-full md:w-auto">
                        {evt.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              
          </div>


        </section>
        
        {/* Collections Section */}
        <section className="py-24 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6">

            {/* --- HEADER --- */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Historical Collection
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Discover our carefully curated collection of Javanese cultural artifacts that tell 
                the story of Indonesias rich heritage and artistic traditions.
              </p>
            </div>

            {/* --- GRID COLLECTION (4 Kolom) --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 px-16">
              {collections.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group flex flex-col"
                >
                  {/* Image Container (4:3 ratio) */}
                  <div className="relative w-full bg-gray-50 aspect-video">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-fill group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 flex-grow">
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* --- BUTTON FOOTER --- */}
            <div className="text-center">
              <button className="bg-tembi hover:bg-darktembi text-white font-medium py-3 px-10 rounded-full transition-colors shadow-md hover:shadow-lg">
                Explore Full Collection
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}