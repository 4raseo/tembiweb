import Image from "next/image";
import React from "react";

export function AmenitiesSection() {
  // Data untuk Grid Utama (4 Kolom)
  const mainAmenities = [
    {
      title: "Room Comfort",
      icon: "/images/icons/bed.png", // Ganti dengan path icon Anda
      items: [
        "Air conditioning",
        "Traditional furnishing",
        "Premium bedding",
        "Private bathroom",
        "Complimentary toiletries",
      ],
    },
    {
      title: "Technology",
      icon: "/images/icons/wifi.png",
      items: [
        "Free high-speed WiFi",
        "Smart TV",
        "USB charging ports",
        "International channels",
        "Bluetooth speakers",
      ],
    },
    {
      title: "Cultural Services",
      icon: "/images/icons/paint.png",
      items: [
        "Cultural concierge",
        "Traditional performances",
        "Art workshops",
        "Local guide services",
        "Cultural library",
      ],
    },
    {
      title: "Dining & Wellness",
      icon: "/images/icons/food.png",
      items: [
        "Traditional cuisine",
        "Room service",
        "Spa treatments",
        "Yoga sessions",
        "Herbal tea service",
      ],
    },
  ];

  // Data untuk Box Bawah (Additional)
  const resortAmenities = [
    { name: "Swimming Pool", icon: "/images/icons/pool.png" },
    { name: "Spa & Wellness", icon: "/images/icons/flower.png"},
    { name: "Fitness Center", icon: "/images/icons/gym.png" },
    { name: "Garden Tours", icon: "/images/icons/tree.png" },
    { name: "Airport Transfer", icon: "/images/icons/car.png" },
    { name: "24/7 Concierge", icon: "/images/icons/bell.png" },
  ];

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#1A2B1E] mb-4">
            Amenities & Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Every room comes equipped with modern amenities while maintaining authentic
            Indonesian cultural elements and providing exceptional hospitality services.
          </p>
        </div>

        {/* --- MAIN GRID (4 Kolom) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {mainAmenities.map((category, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-[#EAF0E5] rounded-full flex items-center justify-center mb-6">
                <div className="relative w-8 h-8 opacity-80">
                  <Image 
                    src={category.icon} 
                    alt={category.title} 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Category Title */}
              <h3 className="text-xl font-serif font-bold mb-6 text-[#1A2B1E]">
                {category.title}
              </h3>

              {/* List Items */}
              <ul className="space-y-3 text-gray-600">
                {category.items.map((item, idx) => (
                  <li key={idx} className="text-sm md:text-base font-light">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- ADDITIONAL RESORT AMENITIES BOX --- */}
        <div className="bg-[#F8F9F7] rounded-[2rem] p-10 md:p-16">
          <h3 className="text-2xl font-serif font-bold text-center text-[#1A2B1E] mb-12">
            Additional Resort Amenities
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {resortAmenities.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center gap-4 group">
                 {/* Icon Wrapper */}
                 <div className="relative w-10 h-10 opacity-100 transition-opacity">
                    <Image 
                        src={amenity.icon} 
                        alt={amenity.name} 
                        fill 
                        className="object-contain"
                    />
                 </div>
                 <span className="text-sm font-bold text-gray-700">
                    {amenity.name}
                 </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}