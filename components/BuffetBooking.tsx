'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MessageCircle } from 'lucide-react'; 
// Note: Icon WhatsApp spesifik biasanya tidak ada di Lucide standar (pakai MessageCircle sebagai pengganti)
// Atau bisa pakai icon SVG/Image sendiri jika ingin logo WA resmi.

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
            PART 1: BOOKING PROCESS (STEPS)
           ========================================= */}
        <div className="mb-24 text-center">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
            How It Works
          </span>
          <h2 className="mb-16 font-serif text-4xl font-bold text-[#4A3B32] lg:text-5xl">
            Simple Booking Process
          </h2>

          <div className="relative">
            {/* Connecting Line (Garis di belakang lingkaran) - Hanya muncul di Desktop */}
            <div className="absolute left-0 top-8 hidden w-full -translate-y-1/2 border-t-2 border-[#96A66D]/30 px-12 md:block lg:px-24" />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center">
                  {/* Number Circle */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B9D61] text-2xl font-bold text-white shadow-md ring-8 ring-white">
                    {step.num}
                  </div>
                  
                  {/* Text Content */}
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
            PART 2: CTA CARD (CONTACT)
           ========================================= */}
        <div className="overflow-hidden rounded-3xl bg-[#F9F8F3] shadow-sm">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Column: Contact Info */}
            <div className="flex flex-col justify-center p-8 lg:p-16">
              <h2 className="mb-4 font-serif text-3xl font-bold text-[#4A3B32] lg:text-4xl">
                Book Your Event Today
              </h2>
              <p className="mb-8 text-gray-600 leading-relaxed">
                Ready to bring authentic Javanese flavors to your next event? 
                Our booking calendar fills up quickly, especially during peak seasons. 
                Contact us today to secure your preferred date.
              </p>

              {/* Contact List */}
              <div className="mb-10 space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-[#8B9D61]" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Call us directly</p>
                    <p className="font-medium text-[#4A3B32]">+62 274 368 000</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <MessageCircle className="h-5 w-5 text-[#8B9D61]" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">WhatsApp</p>
                    <p className="font-medium text-[#4A3B32]">+62 822 2514 2729</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-[#8B9D61]" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Email us</p>
                    <p className="font-medium text-[#4A3B32]">catering@tembihistoricalhome.com</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 rounded-full bg-[#8B9D61] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#768652] hover:shadow-lg">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Now
                </button>
                <button className="flex items-center gap-2 rounded-full border-2 border-[#8B9D61] bg-transparent px-8 py-3.5 text-sm font-bold text-[#8B9D61] transition-colors hover:bg-[#8B9D61] hover:text-white">
                  Call Now
                </button>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative min-h-[400px] w-full lg:min-h-full">
              <Image 
                src="/images/foods/buffetcontent6.png" // Ganti path gambar Anda
                alt="Happy people dining"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Floating Badge (White Card) */}
              <div className="absolute right-6 top-6 rounded-lg bg-white p-4 shadow-lg md:right-8 md:top-8">
                <p className="text-sm font-bold text-[#4A3B32]">Available 7 Days</p>
                <p className="text-xs text-gray-500">Quick Response Guaranteed</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BuffetBooking;