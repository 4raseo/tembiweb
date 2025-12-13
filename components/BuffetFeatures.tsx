'use client';
import React from 'react';
import Image from 'next/image';
// Note: Saya menggunakan Lucide untuk icon kecil di bagian Dietary agar lebih ringan. 
// Tapi untuk 6 Icon Fitur Utama, kita tetap pakai Local Image.

const BuffetFeatures = () => {

  // --- DATA FITUR (Bisa diedit di sini) ---
  const features = [
    {
      title: "Free Delivery & Setup",
      desc: "Complete delivery, setup, and breakdown service included with every package. Our team arrives 2 hours before your event.",
      iconSrc: "/images/icons/truck-white.svg" // Ganti dengan path icon lokal Anda
    },
    {
      title: "Professional Staff",
      desc: "Experienced serving staff in traditional attire to maintain the authentic atmosphere throughout your event.",
      iconSrc: "/images/icons/group-white.svg"
    },
    {
      title: "Fresh Ingredients",
      desc: "All dishes prepared fresh on the day of your event using locally sourced, organic ingredients from our trusted suppliers.",
      iconSrc: "/images/icons/leaf-white.svg"
    },
    {
      title: "Flexible Timing",
      desc: "Available for breakfast, lunch, or dinner events. Extended service hours available for special occasions.",
      iconSrc: "/images/icons/clock-white.svg"
    },
    {
      title: "Quality Guaranteed",
      desc: "100% satisfaction guarantee. If you're not completely satisfied, we'll work to make it right or provide a full refund.",
      iconSrc: "/images/icons/curly-white.svg"
    },
    {
      title: "Complete Equipment",
      desc: "All serving equipment, plates, utensils, and traditional serving ware included. Eco-friendly options available.",
      iconSrc: "/images/icons/food-white.svg"
    }
  ];

  return (
    <section className="w-full bg-[#F9F8F3] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* --- HEADER SECTION --- */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
            Why Choose Us
          </span>
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#4A3B32] lg:text-5xl">
            Complete Catering Service
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            From menu planning to cleanup, we handle every detail so you can focus on
            enjoying your event with your guests.
          </p>
        </div>

        {/* --- FEATURES GRID (6 Cards) --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              {/* Icon Circle */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#8B9D61]">
                <div className="relative h-10 w-10">
                  <Image 
                    src={feature.iconSrc} 
                    alt={feature.title} 
                    fill 
                    sizes="40px"
                    className="object-contain brightness-0 invert" // Icon jadi putih
                  />
                </div>
              </div>
              
              {/* Text */}
              <h3 className="mb-4 font-serif text-xl font-bold text-[#4A3B32]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuffetFeatures;