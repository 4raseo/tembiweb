'use client';

import React from 'react';
import Image from 'next/image';

const BuffetBooking = () => {

  // Data Alur Pemesanan
  const steps = [
    {
      num: "1",
      title: "Choose Package",
      desc: "Select your preferred buffet package or request a custom quote for your specific needs."
    },
    {
      num: "2",
      title: "Book & Confirm",
      desc: "Contact us with your event details. We'll confirm availability and finalize your booking."
    },
    {
      num: "3",
      title: "Menu Planning",
      desc: "Our team will work with you to customize the menu and discuss any special requirements."
    },
    {
      num: "4",
      title: "Enjoy Your Event",
      desc: "Sit back and enjoy your event while we handle all the food service and cleanup."
    }
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =========================================
            PART 1: BOOKING PROCESS
           ========================================= */}
        <div className="mb-24 text-center">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
            How It Works
          </span>
          <h2 className="mb-16 font-serif text-4xl font-bold text-[#4A3B32] lg:text-5xl">
            Simple Booking Process
          </h2>

          <div className="relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="absolute left-0 top-8 hidden w-full -translate-y-1/2 border-t-2 border-[#96A66D]/30 px-12 md:block lg:px-24" />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B9D61] text-2xl font-bold text-white shadow-md ring-8 ring-white">
                    {step.num}
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-[#4A3B32]">
                    {step.title}
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-gray-500">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            PART 2: BOOK YOUR EVENT CTA (Icons Updated)
           ========================================= */}
        <div className="overflow-hidden rounded-3xl bg-[#F9F7F2]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Column: Text & Contacts */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="mb-6 font-serif text-3xl font-bold text-[#4A3B32] md:text-4xl">
                Book Your Event Today
              </h2>
              
              <p className="mb-8 text-gray-600 leading-relaxed">
                Ready to bring authentic Javanese flavors to your next event? 
                Our booking calendar fills up quickly, especially during peak seasons. 
                Contact us today to secure your preferred date.
              </p>

              {/* Contact List (Gunakan Icon berwarna HIJAU/GELAP di sini) */}
              <div className="mb-10 space-y-6">
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 relative w-5 h-5">
                    <Image 
                      src="/images/icons/phone-green.svg" // Ganti dengan path icon telepon hijau Anda
                      alt="Phone"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A3B32]">Call us directly</p>
                    <p className="text-gray-600">+62 274 368 000</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 relative w-5 h-5">
                    <Image 
                      src="/images/icons/whatsapp-green.svg" // Ganti dengan path icon WA hijau Anda
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A3B32]">WhatsApp</p>
                    <p className="text-gray-600">+62 822 2514 2729</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 relative w-5 h-5">
                    <Image 
                      src="/images/icons/mail-green.svg" // Ganti dengan path icon email hijau Anda
                      alt="Email"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A3B32]">Email us</p>
                    <p className="text-gray-600">catering@tembihistoricalhome.com</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Tombol WA (Gunakan Icon berwarna PUTIH karena background tombol hijau) */}
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B9D61] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#768652]">
                  <Image 
                    src="/images/icons/whatsapp-white.svg" // Pastikan icon ini berwarna PUTIH
                    alt="WA"
                    width={20}
                    height={20}
                  />
                  WhatsApp Now
                </button>

                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8B9D61] bg-transparent px-8 py-3 font-semibold text-[#8B9D61] transition-colors hover:bg-[#8B9D61] hover:text-white group">
                   {/* Tombol Call (Icon Hijau, bisa berubah putih saat hover lewat CSS group-hover jika pakai SVG/filter, 
                       tapi untuk Image PNG statis, gunakan warna hijau saja) */}
                   Call Now
                </button>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-sm">
                <Image 
                  src="/images/foods/buffetcontent5.png" 
                  alt="Traditional Javanese Buffet Spread"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BuffetBooking;