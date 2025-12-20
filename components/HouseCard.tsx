"use client"; // Wajib: agar bisa pakai useState

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";// Opsi: pakai icon library atau SVG manual

// Definisikan tipe props jika menggunakan TypeScript
interface HouseProps {
  house: {
    name: string;
    images: string[]; // Array string gambar
    desc: string;
    path: string;
    features: string[];
    icons: string[];
  };
}

export default function HouseCard({ house }: HouseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi Geser Kiri
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? house.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Fungsi Geser Kanan
  const nextSlide = () => {
    const isLastSlide = currentIndex === house.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
      
      {/* --- AREA GAMBAR (SLIDER) --- */}
      <div className="relative h-80 overflow-hidden group/slider">
        
        {/* Gambar Utama */}
        <Image
          src={house.images[currentIndex]}
          alt={house.name}
          fill
          className="object-cover transition-transform duration-500"
          priority={false} // Lazy load untuk performa
        />

        {/* Label Recommendation (Opsional) */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 rounded-sm shadow-sm z-10">
          Recommendation
        </div>

        {/* --- TOMBOL KIRI --- */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-20 shadow-md cursor-pointer"
        >
          {/* SVG Chevron Left */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        {/* --- TOMBOL KANAN --- */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-20 shadow-md cursor-pointer"
        >
          {/* SVG Chevron Right */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        {/* --- DOTS INDICATOR (Opsional: Indikator posisi slide) --- */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {house.images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => setCurrentIndex(slideIndex)}
              className={`transition-all duration-300 h-1.5 rounded-full cursor-pointer shadow-sm ${
                currentIndex === slideIndex ? "bg-white w-6" : "bg-white/50 w-1.5 hover:bg-white/80"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* --- KONTEN KARTU (Sama seperti desain lama) --- */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">
          {house.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
          {house.desc}
        </p>

        {/* Facilities */}
        <div className="flex gap-5 text-xs text-gray-500 mb-8 border-t border-gray-100 pt-4">
          {/* Fasilitas 1 */}
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3">
              <Image src={house.icons[0]} alt="Icon" fill className="object-contain" />
            </div>
            <span>{house.features[0]}</span>
          </div>
          {/* Fasilitas 2 */}
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3">
              <Image src={house.icons[1]} alt="Icon" fill className="object-contain" />
            </div>
            <span>{house.features[1]}</span>
          </div>
        </div>

        <Link
          href={house.path}
          className="w-28 bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-6 rounded-sm transition-colors mx-auto flex items-center justify-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}