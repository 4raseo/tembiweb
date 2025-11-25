'use client';

import React from 'react';
import Image from 'next/image';
import { Leaf, Heart, Wheat, Flame } from 'lucide-react'; 
// Note: Saya menggunakan Lucide untuk icon kecil di bagian Dietary agar lebih ringan. 
// Tapi untuk 6 Icon Fitur Utama, kita tetap pakai Local Image.

const BuffetFeatures = () => {

  // --- DATA FITUR (Bisa diedit di sini) ---
  const features = [
    {
      title: "Free Delivery & Setup",
      desc: "Complete delivery, setup, and breakdown service included with every package. Our team arrives 2 hours before your event.",
      iconSrc: "/images/icons/truckw.png" // Ganti dengan path icon lokal Anda
    },
    {
      title: "Professional Staff",
      desc: "Experienced serving staff in traditional attire to maintain the authentic atmosphere throughout your event.",
      iconSrc: "/images/icons/groupw.png"
    },
    {
      title: "Fresh Ingredients",
      desc: "All dishes prepared fresh on the day of your event using locally sourced, organic ingredients from our trusted suppliers.",
      iconSrc: "/images/icons/leafw.png"
    },
    {
      title: "Flexible Timing",
      desc: "Available for breakfast, lunch, or dinner events. Extended service hours available for special occasions.",
      iconSrc: "/images/icons/clockw.png"
    },
    {
      title: "Quality Guaranteed",
      desc: "100% satisfaction guarantee. If you're not completely satisfied, we'll work to make it right or provide a full refund.",
      iconSrc: "/images/icons/circlew.png"
    },
    {
      title: "Complete Equipment",
      desc: "All serving equipment, plates, utensils, and traditional serving ware included. Eco-friendly options available.",
      iconSrc: "/images/icons/foodw.png"
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

        {/* --- DIETARY REQUIREMENTS CARD (Bottom Section) --- */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-white shadow-sm lg:mt-24">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Content (Text) */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <h3 className="mb-6 font-serif text-3xl font-bold text-[#4A3B32]">
                Special Dietary Requirements
              </h3>
              <p className="mb-8 text-gray-600 leading-relaxed">
                We understand that every guest is unique. Our experienced chefs can accommodate various dietary needs while maintaining the authentic flavors of Javanese cuisine.
              </p>

              {/* List of Options */}
              <div className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-gray-700">
                   <Leaf className="h-5 w-5 text-[#96A66D]" />
                   <span className="text-sm font-medium">Vegetarian Options</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                   <Wheat className="h-5 w-5 text-[#96A66D]" />
                   <span className="text-sm font-medium">Gluten-Free Available</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                   <Flame className="h-5 w-5 text-[#96A66D]" />
                   <span className="text-sm font-medium">Spice Level Adjustment</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                   <Heart className="h-5 w-5 text-[#96A66D]" />
                   <span className="text-sm font-medium">Heart-Healthy Options</span>
                </div>
              </div>
            </div>

            {/* Right Content (Image) */}
            <div className="relative h-64 lg:h-auto min-h-[300px]">
              <Image 
                src="/images/foods/buffetcontent5.png" // Ganti path gambar dietary
                alt="Dietary Options Food"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-white/95 px-6 py-4 shadow-lg backdrop-blur-sm lg:left-8 lg:right-auto lg:max-w-xs">
                <p className="text-sm font-medium text-[#4A3B32]">
                  Custom menu consultation available
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BuffetFeatures;