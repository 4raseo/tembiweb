// app/page.tsx
'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

// Data dummy
const houses = [
  {
    name: 'Ngadirojo',
    desc: 'Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten, Central Java, to Tembi in 2007. Combining Javanese architecture with natural tranquility, it is an ideal choice for guests seeking peace and culture.',
    image: '/images/rooms/ngadirojo/ngadirojo.png',
    features: ['King Bed', 'Pool View'],
    path: '/rooms/ngadirojo-house',
  },
  {
    name: 'Polaman',
    desc: 'Polaman House is a traditional Javanese limasan built in 1948 and relocated from Bawak Village, Cawas, Klaten, to Tembi in 2007. It combines the warmth of Javanese architecture with natural landscapes, making it perfect for an authentic and peaceful stay.',
    image: '/images/rooms/polaman/polaman.png',
    features: ['King Bed', 'Pool View'],
    path: '/rooms/polaman-house',
  },
  {
    name: 'Adikarto',
    desc: 'Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul Regency, it was relocated to Tembi in 2007 as part of cultural preservation efforts.',
    image: '/images/rooms/adikarto/adikarto.png',
    features: ['King Bed', 'Garden View'],
    path: '/rooms/adikarto-house',
  },
];

const heroImages = [
  '/images/homepage/homepage-hero1.svg', // Gambar pertama
  '/images/venue/venue-hero.svg', // Ganti dengan path gambar kedua Anda
  '/images/foods/foods-hero.svg', // Ganti dengan path gambar ketiga Anda
  // Tambahkan lebih banyak gambar jika diinginkan
];

const icons = [
  { icon: "/images/icons/wifi-green.svg", text: "Complimentary Wi-Fi" },
  { icon: "/images/icons/cup-green.svg", text: "Welcome Tea Ceremony" },
  { icon: "/images/icons/flower-green.svg", text: "Traditional Amenities" },
  { icon: "/images/icons/bell-green.svg", text: "Cultural Concierge" },
  { icon: "/images/icons/bike-green.svg", text: "Bicycle Access" },
  { icon: "/images/icons/music-green.svg", text: "Gamelan Course" },
];

const heritageFeatures = [
  {
    title: "Historical Culture",
    desc: "Authentic Javanese architecture and traditions",
    icon: "/images/icons/museum-green.svg" // Icon bangunan/museum
  },
  {
    title: "Natural Harmony",
    desc: "Surrounded by lush tropical gardens and rice fields",
    icon: "/images/icons/leaf-green.svg" // Icon daun
  },
  {
    title: "Meaningful Moments",
    desc: "Rest that feels valuable and memorable",
    icon: "/images/icons/diamond-green.svg" // Icon diamond/mewah
  }
];

const foodPoints = [
  { text: "Fresh ingredients from local organic farms", icon: "/images/icons/leaf-green.svg" },
  { text: "Traditional recipes with modern presentation", icon: "/images/icons/food-green.svg" },
  { text: "Friendly service that makes you feel at home", icon: "/images/icons/glass-green.svg" },
];

const eventPackages = [
  {
    title: "Wedding Ceremonies",
    description: "Celebrate your special moment in our quiet pendopo, surrounded by fresh greenery and a peaceful atmosphere. Our team will help take care of the details so your ceremony feels personal and meaningful.",
    image: "/images/homepage/content2.png", // Ganti dengan foto pernikahan
    buttonText: "Plan Your Wedding",
    features: [
      { text: "Capacity: Up to 150 guests", icon: "/images/icons/group-green.svg" }, // Icon orang banyak
      { text: "Garden ceremony options", icon: "/images/icons/leaf-green.svg" }, // Icon daun
      { text: "Traditional gamelan accompaniment", icon: "/images/icons/music-green.svg" }, // Icon nada musik
    ]
  },
  {
    title: "Corporate Retreats",
    description: "Spark new ideas and strengthen teamwork in a calm and inspiring setting.Our meeting spaces combine traditional charm with modern facilities, creating a comfortable place for focused work and meaningful collaboration.",
    image: "/images/homepage/content3.png", // Ganti dengan foto rapat
    buttonText: "Book Corporate Event",
    features: [
      { text: "Multiple room configurations", icon: "/images/icons/group-green.svg" }, // Icon denah/layout
      { text: "High-speed internet & AV equipment", icon: "/images/icons/wifi-green.svg" }, // Icon wifi
      { text: "Traditional refreshment service", icon: "/images/icons/cup-green.svg" }, // Icon kopi/cangkir
    ]
  }
];

const collections = [
  {
    title: "Cundrik Collection",
    desc: "A small Javanese cundrik carried as a personal talisman.",
    image: "/images/collection/GPT0541.svg" 
  },
  {
    title: "Cundrik Collection",
    desc: "A longer cundrik forged with sanak patterns. Its flowing lines reflect Majapahit era.",
    image: "/images/collection/GPT0540.svg"
  },
  {
    title: "Sken Collection",
    desc: "A small traditional Javanese dagger with a wooden handle and sheath.",
    image: "/images/collection/GPT0519.svg"
  },
  {
    title: "Sken Collection",
    desc: "A long, leaf-shaped traditional blade with a wooden hilt and sheath.",
    image: "/images/collection/GPT0521.svg"
  },
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
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              Where Historical Culture <br /> is Divine
            </h2>
            
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
              <h3 className="text-6xl font-serif font-thin mb-10">Experience Javanese Historical Culture</h3>
              <p className="text-gray-600 mb-6">
                A place that brings calm and comfort so your mind feels lighter. The sound of nature welcomes you as soon as you step in. Fresh air helps your body relax. A well arranged space protects your rest so nothing interrupts your peace.
              </p>
              <p className="text-gray-600 mb-10">
                Morning comes with a warm breakfast so the day feels kinder. Sitting on the terrace or taking a slow walk in the garden is enough to ease your heart. Energy returns slowly. A quiet peace appears on its own. Rest here is more than sleep, You have space to recover.
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
                  Historical Home
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Each house offers comfort and keeps cultural stories alive. The design flows naturally so the grace of the past and the ease of the present stay together. Warm spaces and thoughtful details create a peaceful and meaningful stay.
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
                          <Image src="/images/icons/bed-gray.svg" alt="Bed" fill className="object-contain" />
                        </div>
                        <span>King Bed</span>
                      </div>

                      {/* Icon */}
                      <div className="flex items-center gap-2">
                        <div className="relative w-3 h-3">
                          <Image src="/images/icons/mount-gray.svg" alt="View" fill className="object-contain" />
                        </div>
                        <span>{house.features[1]}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <Link 
                      href={house.path}
                      className="w-28 bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-6 rounded-sm transition-colors mx-auto flex items-center justify-center" 
                    >
                      Book Now
                    </Link>
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
                <Link 
                  href="/rooms"
                  className="w-40 bg-tembi hover:bg-darktembi text-white py-3 px-8 rounded-sm text-sm font-medium transition-colors" 
                >
                  View All House
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Living Heritage Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">

            {/* A SANCTUARY OF HERITAGE */}
            <div className="text-center max-w-4xl mx-auto mb-32">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-24">
                Living Experience
              </h2>
              {/* <p className="text-gray-600 leading-relaxed mb-16 px-4 md:px-12 text-lg"> */}
                {/* Nestled in the heart of Yogyakarta, Tembi Historical Home is more than a resort, its a living collection where centuries old Javanese traditions harmoniously blend with contemporary luxury. Our carefully preserved cultural spaces and authentic architecture create an immersive experience that celebrates Indonesias rich heritage while providing the ultimate in comfort and tranquility. */}
              {/* </p> */}

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
                  Food and Drink
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed pr-16 text-lg">
                  Enjoy a culinary experience that highlights the richness of Indonesian flavors. Traditional recipes are preserved and refined with modern techniques so each dish feels familiar yet exciting. The calm atmosphere adds comfort to every meal. Culture becomes part of the dining moment through flavors that feel warm and full of character.
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
                <Link 
                  href="/catering"
                  className="bg-tembi hover:bg-darktembi text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md" 
                >
                  View Packages
                </Link>
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
                      <Link 
                        href="/venue"
                        className="bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-8 rounded-sm transition-colors w-full md:w-auto" 
                      >
                        {evt.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              
          </div>


        </section>
        
        {/* Collections Section */}
        <section className="py-20 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6 md:px-12">

            {/* --- HEADER --- */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Historical Collection
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                Discover our carefully curated collection of Javanese cultural artifacts that tell 
                the story of Indonesias rich heritage and artistic traditions
              </p>
            </div>

            {/* --- MAIN CONTENT: 2 Column Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

              {/* === LEFT COLUMN: 4 Product Cards (Grid 2x2) === */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {collections.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col"
                  >
                    {/* Image Container - Background Abu-abu */}
                    <div className="relative w-full aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="p-5 flex-grow border-t border-gray-50">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      {/* Warna tulisan diubah jadi hitam/abu (sesuai request) */}
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* === RIGHT COLUMN: Gallery Layout (1 Big Top, 2 Small Bottom) === */}
              <div className="flex flex-col gap-6 h-full min-h-[500px]">

                {/* Top Image (Large) */}
                <div className="relative w-full h-3/5 min-h-[300px] rounded-xl overflow-hidden shadow-sm">
                  <Image 
                    src="/images/homepage/content4.png" // Ganti gambar Hall Besar
                    alt="Main Hall"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Bottom Images (2 Columns) */}
                <div className="grid grid-cols-2 gap-6 h-2/5 min-h-[200px]">
                   <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
                      <Image 
                        src="/images/homepage/content5.png" // Ganti gambar Gamelan/Piano
                        alt="Instruments"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                   </div>
                   <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
                      <Image 
                        src="/images/homepage/content6.png" // Ganti gambar Etalase Kaca
                        alt="Artifact Display"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                   </div>
                </div>
              </div>
            </div>
            {/* --- FOOTER BUTTON --- */}
            <div className="flex justify-center mt-12">
              <Link 
                href="/collections"
                className="bg-tembi hover:bg-darktembi text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 shadow-md" 
              >
                Explore Full Collection
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
                Location & Access
              </h2>
              <p className="text-[#5C5C5C]">
                Easy to reach from Yogyakarta city center and airport
              </p>
            </div>
        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* --- LEFT COLUMN: INFO WITH LOCAL ICONS --- */}
              <div className="space-y-6">
                
                {/* 1. Address Block */}
                <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    {/* Icon Address */}
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image src="/images/icons/gps-green.svg" alt="Address" fill className="object-contain" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#2C2420]">Address</h3>
                  </div>
                  <p className="text-[#5C5C5C] leading-relaxed pl-9"> {/* pl-9 agar rata dengan teks judul */}
                    Jl. Parangtritis KM 8.4, Timbulharjo, Sewon, Bantul, Yogyakarta 55186, Indonesia
                  </p>
                </div>
        
                {/* Grid for Airport & City Center */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* 2. From Airport */}
                  <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Icon Airport */}
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Image src="/images/icons/plane-green.svg" alt="Airport" fill className="object-contain" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#2C2420]">From Airport</h3>
                    </div>
                    <p className="text-[#5C5C5C] text-sm leading-relaxed">
                      25 minutes drive from Yogyakarta International Airport
                    </p>
                  </div>
        
                  {/* 3. From City Center */}
                  <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Icon City */}
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Image src="/images/icons/city-green.svg" alt="City" fill className="object-contain" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#2C2420]">From City Center</h3>
                    </div>
                    <p className="text-[#5C5C5C] text-sm leading-relaxed">
                      15 minutes drive from Malioboro Street and city center
                    </p>
                  </div>
                </div>
        
                {/* 4. Transportation Options Block */}
                <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    {/* Header Icon Car */}
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image src="/images/icons/car-green.svg" alt="Transport" fill className="object-contain" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#2C2420]">Transportation Options</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {/* List Item 1: Taxi */}
                    <li className="flex items-start gap-3">
                      <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                        <Image src="/images/icons/taxi-green.svg" alt="Taxi" fill className="object-contain" />
                      </div>
                      <span className="text-[#5C5C5C]">Taxi and ride-sharing services available</span>
                    </li>
        
                    {/* List Item 2: Bus */}
                    <li className="flex items-start gap-3">
                      <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                        <Image src="/images/icons/bus-green.svg" alt="Bus" fill className="object-contain" />
                      </div>
                      <span className="text-[#5C5C5C]">Public bus route 1A stops nearby</span>
                    </li>
        
                    {/* List Item 3: Parking */}
                    <li className="flex items-start gap-3">
                      <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                        <Image src="/images/icons/parking-green.svg" alt="Parking" fill className="object-contain" />
                      </div>
                      <span className="text-[#5C5C5C]">Free on-site parking for 50+ vehicles</span>
                    </li>
                  </ul>
                </div>
        
              </div>
        
        
              {/* --- RIGHT COLUMN: DYNAMIC IMAGE --- */}
              <div className="relative h-[500px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2385536997226!2d110.35363067455535!3d-7.870087878251126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a560cf1551d0b%3A0x1db36094db031949!2sTembi%20-%20Historical%20Home!5e0!3m2!1sid!2sid!4v1764903906866!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
  
                {/* Optional: Overlay agar map tidak 'menelan' scroll mouse saat user hanya ingin scroll halaman */}
                <div className="absolute top-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-b from-black/10 to-transparent" />
              </div>
        
            </div>
          </div>
        </section>

        {/* --- FLOATING WHATSAPP BUTTON --- */}
        
      </main>
    </div>
  );
}