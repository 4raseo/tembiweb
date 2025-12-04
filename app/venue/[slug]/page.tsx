import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { venueData } from '@/data/venueData';
import { Info } from 'lucide-react';
import Link from 'next/link';

// Generate Metadata (Optional)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const venue = venueData.find((v) => v.slug === params.slug);
  return {
    title: venue ? `${venue.title} - Tembi Historical Home` : 'Venue Not Found',
  };
}

export default function VenueDetailPage({ params }: { params: { slug: string } }) {
  const venue = venueData.find((v) => v.slug === params.slug);

  if (!venue) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full">
        <Image
          src={venue.heroImage}
          alt={venue.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-16 left-0 w-full p-6 md:p-12 text-white">
                <div className="container mx-auto">
                  <h1 className="text-4xl md:text-6xl font-serif mb-4">{venue.title}</h1>

                  {/* --- BAGIAN INI SUDAH DINAMIS --- */}
                  <div className="max-w-3xl mb-8">
                    {venue.heroDescription.map((paragraph, index) => (
                      <p 
                        key={index} 
                        className="text-gray-200 text-lg md:text-xl leading-relaxed mb-2 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {/* ------------------------------- */}

                  {/* Quick Stats (Local Icons) */}
                  <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-[#A4AC86]">
                    <div className="flex items-center gap-2">
                      {/* Icon Capacity */}
                      <div className="relative w-5 h-5">
                         <Image src="/icons/icon-capacity-white.png" alt="Capacity" fill className="object-contain" />
                      </div>
                      <span>{venue.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Icon Price */}
                      <div className="relative w-5 h-5">
                         <Image src="/icons/icon-price-white.png" alt="Price" fill className="object-contain" />
                      </div>
                      <span>From {venue.basePriceString}</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* GALERI FOTO (Kiri) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image src={venue.galleryImages[0] || venue.heroImage} alt="Detail 1" fill className="object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image src={venue.galleryImages[1] || venue.heroImage} alt="Detail 2" fill className="object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="relative h-64 col-span-2 rounded-xl overflow-hidden">
                <Image src={venue.galleryImages[2] || venue.heroImage} alt="Wide Detail" fill className="object-cover hover:scale-105 transition duration-500" />
              </div>
            </div>
          </div>

          {/* DESKRIPSI & INFO (Kanan) */}
          <div className="lg:col-span-7 space-y-10">
            
            <div>
              <h2 className="text-3xl font-serif text-[#2C2420] mb-6">About This Venue</h2>
              <div className="text-[#5C5C5C] space-y-4 leading-relaxed">
                {venue.longDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* --- KEY INFORMATION BOX (Updated Icons) --- */}
            <div className="bg-[#F9F9F0] p-8 rounded-xl border border-[#EBEBE0]">
              <h3 className="text-xl font-serif text-[#2C2420] mb-6 font-semibold">Key Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                
                {/* 1. Capacity */}
                <div className="flex gap-4">
                  <div className="mt-1 relative w-6 h-6 flex-shrink-0">
                    {/* Ganti '/icons/icon-capacity.png' dengan file icon Anda */}
                    <Image src="/icons/icon-capacity.png" alt="Capacity Icon" fill className="object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2C2420] text-sm">Capacity</p>
                    <p className="text-[#5C5C5C] text-sm">{venue.capacity}</p>
                  </div>
                </div>

                {/* 4. Best For */}
                <div className="flex gap-4">
                  <div className="mt-1 relative w-6 h-6 flex-shrink-0">
                    {/* Ganti '/icons/icon-heart.png' dengan file icon Anda */}
                    <Image src="/icons/icon-heart.png" alt="Heart Icon" fill className="object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2C2420] text-sm">Best For</p>
                    <p className="text-[#5C5C5C] text-sm">{venue.bestFor}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F9F9F0]"> {/* Background Cream */}
        <div className="container mx-auto px-6">
          
          {/* Header Facilities */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
              Facilities Included
            </h2>
            <p className="text-[#5C5C5C]">
              Everything you need for a memorable event
            </p>
          </div>

          {/* Grid Facilities (6 Items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            
            {/* Facility 1: Venue Space */}
            <FacilityCard 
              iconSrc="/icons/fac-venue.png"
              title="Venue Space"
              description="Traditional Javanese pavilion with authentic teak wood architecture"
            />

            {/* Facility 2: Free Chairs */}
            <FacilityCard 
              iconSrc="/icons/fac-chair.png"
              title="Free Chairs"
              description="Complimentary seating for up to 80 guests included"
            />

            {/* Facility 3: Sound System */}
            <FacilityCard 
              iconSrc="/icons/fac-sound.png"
              title="Sound System"
              description="Portable sound system for speeches and announcements"
            />

            {/* Facility 4: Toilet Facilities */}
            <FacilityCard 
              iconSrc="/icons/fac-toilet.png"
              title="Toilet Facilities"
              description="Clean and well-maintained restroom facilities"
            />

            {/* Facility 5: Cleaning Service */}
            <FacilityCard 
              iconSrc="/icons/fac-clean.png"
              title="Cleaning Service"
              description="Professional cleaning before and after your event"
            />

            {/* Facility 6: Parking Space */}
            <FacilityCard 
              iconSrc="/icons/fac-parking.png"
              title="Parking Space"
              description="Ample parking space for guests' vehicles"
            />

          </div>

          {/* Optional Add-ons Section */}
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-[#EBEBE0]">
            <h3 className="text-2xl font-serif text-[#2C2420] mb-8 font-semibold">
              Optional Add-ons
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Add-on 1 */}
              <AddOnItem 
                iconSrc="/icons/addon-projector.png" 
                label="Projector & Screen" 
              />
              
              {/* Add-on 2 */}
              <AddOnItem 
                iconSrc="/icons/addon-mic.png" 
                label="Enhanced Sound System" 
              />
              
              {/* Add-on 3 */}
              <AddOnItem 
                iconSrc="/icons/addon-catering.png" 
                label="Catering Services" 
              />
              
              {/* Add-on 4 */}
              <AddOnItem 
                iconSrc="/icons/addon-decor.png" 
                label="Decoration Setup" 
              />

            </div>
          </div>

        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          
          {/* Header Gallery */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
              Event Gallery
            </h2>
            <p className="text-[#5C5C5C]">
              See how beautiful events come to life at {venue.title}
            </p>
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venue.eventGalleryImages?.map((imageSrc, index) => (
              <div 
                key={index} 
                className="relative h-64 md:h-72 rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <Image
                  src={imageSrc}
                  alt={`Event at ${venue.title} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Optional: Overlay tipis saat hover agar lebih elegan */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-20 bg-[#F9F9F0]">
        <div className="container mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
              Additional Services & Equipment
            </h2>
            <p className="text-[#5C5C5C]">
              Enhance your event with our premium add-on services
            </p>
          </div>

          {/* Table Card Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#EBEBE0] overflow-hidden max-w-5xl mx-auto">
            
            {/* Table Header (Desktop Only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-white font-serif text-[#2C2420] font-bold">
              <div className="col-span-4">Service</div>
              <div className="col-span-5">Description</div>
              <div className="col-span-3 text-right">Price</div>
            </div>

            {/* Table Body - Mapping dari variable lokal 'additionalServices' */}
            <div className="divide-y divide-gray-100">
              {additionalServices.map((item, index) => (
                <div key={index} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                  
                  {/* Service Name */}
                  <div className="col-span-1 md:col-span-4">
                    <span className="font-semibold text-[#2C2420] block">{item.name}</span>
                  </div>

                  {/* Description */}
                  <div className="col-span-1 md:col-span-5">
                    <span className="text-sm text-[#5C5C5C]">{item.description}</span>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-3 md:text-right flex justify-between md:block mt-2 md:mt-0">
                    <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider">Price</span>
                    <span className="font-medium text-[#2C2420]">{item.price}</span>
                  </div>

                </div>
              ))}
            </div>

            {/* Important Notes Footer */}
            <div className="bg-[#F9F9F0] p-6 md:p-8 border-t border-[#EBEBE0]">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#8FA876] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[#5C5C5C] font-bold mb-2 text-sm">Important Notes:</h4>
                  <ul className="text-sm text-[#5C5C5C] space-y-1 list-disc list-inside marker:text-[#8FA876]">
                    <li>Catering and decoration services available upon request</li>
                    <li>Food from outside vendors may incur an additional charge</li>
                    <li>All prices are subject to change and do not include tax</li>
                    <li>Booking confirmation required 48 hours in advance</li>
                  </ul>
                </div>
              </div>
            </div>

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
                    <Image src="/icons/loc-pin.png" alt="Address" fill className="object-contain" />
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
                      <Image src="/icons/loc-plane.png" alt="Airport" fill className="object-contain" />
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
                      <Image src="/icons/loc-building.png" alt="City" fill className="object-contain" />
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
                    <Image src="/icons/loc-car.png" alt="Transport" fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#2C2420]">Transportation Options</h3>
                </div>
                
                <ul className="space-y-4">
                  {/* List Item 1: Taxi */}
                  <li className="flex items-start gap-3">
                    <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                      <Image src="/icons/loc-taxi.png" alt="Taxi" fill className="object-contain" />
                    </div>
                    <span className="text-[#5C5C5C]">Taxi and ride-sharing services available</span>
                  </li>

                  {/* List Item 2: Bus */}
                  <li className="flex items-start gap-3">
                    <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                      <Image src="/icons/loc-bus.png" alt="Bus" fill className="object-contain" />
                    </div>
                    <span className="text-[#5C5C5C]">Public bus route 1A stops nearby</span>
                  </li>

                  {/* List Item 3: Parking */}
                  <li className="flex items-start gap-3">
                    <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                      <Image src="/icons/loc-parking.png" alt="Parking" fill className="object-contain" />
                    </div>
                    <span className="text-[#5C5C5C]">Free on-site parking for 50+ vehicles</span>
                  </li>
                </ul>
              </div>

            </div>


            {/* --- RIGHT COLUMN: DYNAMIC IMAGE --- */}
            <div className="relative h-[500px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={venue.heroImage} 
                alt={`Location of ${venue.title}`}
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
              <div className="max-w-7xl mx-auto">
                {/* 1. Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Need Help or Have Questions?
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our team is here to help you plan the perfect catering experience for your 
                    special event.
                  </p>
                </div>
      
                {/* 2. Contact Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Card 1: Call Us */}
                  <div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
                    {/* Icon Wrapper */}
                    <div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
                      <Image 
                        src="/images/icons/phonew.png" 
                        alt="phone" 
                        width={24} height={24} 
                        className="brightness-0 invert" 
                      />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">Call Us</h3>
                    <p className="text-gray-500 mb-4 text-sm">Speak directly with our catering specialists</p>
      
                    <p className="text-gray-900 font-bold text-lg mb-2">+62 274 368 000</p>
                    <p className="text-gray-400 text-xs font-medium">Daily 8:00 AM - 8:00 PM</p>
                  </div>
      
                  {/* Card 2: WhatsApp */}
                  <div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
                       <Image 
                        src="/images/icons/waw.png" 
                        alt="wa" 
                        width={28} height={28} 
                        className="brightness-0 invert" 
                      />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">WhatsApp</h3>
                    <p className="text-gray-500 mb-4 text-sm">Quick response for urgent inquiries</p>
      
                    <p className="text-gray-900 font-bold text-lg mb-6">+62 822 2514 2729</p>
      
                    {/* Chat Now Button */}
                    <Link 
                      href="https://wa.me/6282225142729"
                      className="bg-[#8F9E75] text-white text-sm font-bold py-3 px-8 rounded-lg hover:bg-[#7A8B60] transition-colors shadow-sm"
                    >
                      Chat Now
                    </Link>
                  </div>
      
                  {/* Card 3: Email Us */}
                  <div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
                       <Image 
                        src="/images/icons/mailw.png" 
                        alt="email" 
                        width={24} height={24} 
                        className="brightness-0 invert" 
                      />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
                    <p className="text-gray-500 mb-4 text-sm">Detailed inquiries and custom requests</p>
      
                    {/* Email Link */}
                    <a href="mailto:catering@tembihistoricalhome.com" className="text-[#8F9E75] font-bold text-lg mb-2 hover:underline break-all">
                      catering@tembihistoricalhome.com
                    </a>
                    <p className="text-gray-400 text-xs font-medium">Response within 24 hours</p>
                  </div>
                </div>
                {/* 3. Special Requests Bottom Banner */}
                <div className="bg-[#F8F9F5] rounded-3xl p-12 text-center w-full">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Special Requests & Custom Packages
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                    Planning a unique event or need a custom menu? Our culinary team can create bespoke catering 
                    solutions tailored to your specific requirements, dietary needs, and cultural preferences.
                  </p>
                  <Link 
                      href="https://wa.me/6282225142729"
                      className="bg-[#8F9E75] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#7A8B60] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
                  >
                    Request Custom Quote
                  </Link>
                </div>
              </div>
      </section>
    </main>
  );
}

const FacilityCard = ({ iconSrc, title, description }: { iconSrc: string, title: string, description: string }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center border border-[#EBEBE0]">
      {/* Icon Wrapper (Lingkaran Hijau Pucat) */}
      <div className="w-16 h-16 rounded-full bg-[#F4F6E6] flex items-center justify-center mb-6">
        <div className="relative w-8 h-8">
          <Image src={iconSrc} alt={title} fill className="object-contain" />
        </div>
      </div>
      
      <h3 className="text-lg font-serif text-[#2C2420] font-bold mb-3">
        {title}
      </h3>
      <p className="text-[#5C5C5C] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

// 2. Component untuk Add-on Item
const AddOnItem = ({ iconSrc, label }: { iconSrc: string, label: string }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src={iconSrc} alt={label} fill className="object-contain" />
      </div>
      <span className="text-[#5C5C5C] font-medium text-sm md:text-base">
        {label}
      </span>
    </div>
  );
};

const additionalServices = [
    {
      name: "Sound System Non-Portable",
      description: "Professional grade fixed sound system with multiple microphones",
      price: "Rp 875.000"
    },
    {
      name: "Wedding Sound Package",
      description: "Complete audio setup for wedding ceremonies and receptions",
      price: "Rp 1.000.000 - 1.250.000"
    },
    {
      name: "Projector + Screen",
      description: "HD projector with large screen for presentations",
      price: "Rp 350.000 / day"
    },
    {
      name: "Additional Chair",
      description: "Extra seating beyond the included 80 chairs",
      price: "Rp 10.000 / pcs"
    },
    {
      name: "Lighting Enhancement",
      description: "Professional lighting setup for evening events",
      price: "Rp 500.000"
    },
    {
      name: "Photography Package",
      description: "Professional event photography services",
      price: "Starting from Rp 2.000.000"
    }
  ];