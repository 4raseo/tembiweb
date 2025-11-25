import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react'; // Pastikan install lucide-react: npm i lucide-react
import BuffetPricing, { PackageItem } from '@/components/BuffetPricing';
import BuffetFeatures from '@/components/BuffetFeatures';
import BuffetBooking from '@/components/BuffetBooking';

const myPackages: PackageItem[] = [
    {
      name: "Buffet Standard",
      price: "85,000",
      minPax: "35 Pax",
      description: "Perfect for corporate events",
      theme: "standard",
      // Ganti dengan path icon lokal Anda
      iconSrc: "/images/icons/foodw.png", 
      items: ["Sup Ayam", "Ayam Goreng", "Es Teh"]
    },
    {
      name: "Buffet Premium",
      price: "125,000",
      minPax: "50 Pax",
      description: "Ideal for weddings & celebrations",
      theme: "premium",
      isPopular: true,
      // Icon berbeda (misal icon mahkota)
      iconSrc: "/images/icons/crownw.png", 
      items: ["Sup Kimlo", "Sapi Lada Hitam", "Es Buah"]
    },
    {
      name: "Buffet Exclusive",
      price: "185,000",
      minPax: "100 Pax",
      description: "Ultimate traditional experience",
      theme: "exclusive",
      // Icon berbeda (misal icon diamond)
      iconSrc: "/images/icons/diamondw.png", 
      items: ["Full Buffet", "Live Music", "Gamelan"]
    }
];


export default function SnackBoxPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      
      {/* ==================================================================
          1. HERO SECTION
          ================================================================== */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/foods/buffet-bg.png" // Pastikan path ini benar di folder public
            alt="Buffet Catering Background"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#96A66D] px-4 py-1.5 text-sm font-medium text-white shadow-sm">
              <div className="relative h-4 w-4">
                <Image 
                  src="/images/icons/foodw.png" 
                  alt="Service Icon"
                  fill
                  className="object-contain brightness-0 invert" 
                />
              </div>
              <span>Premium Catering Service</span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-5xl font-bold text-white md:text-7xl drop-shadow-sm mb-6 leading-tight">
              Buffet Catering Packages
            </h1>

            {/* Description */}
            <p className="mb-8 text-lg text-white/90 md:text-xl leading-relaxed max-w-2xl">
              Authentic Javanese dishes for gatherings and celebrations, carefully crafted with traditional recipes passed down through generations.
            </p>

            {/* Info Pills */}
            <div className="mb-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-full bg-white/20 px-5 py-2.5 text-white backdrop-blur-md border border-white/10 transition hover:bg-white/30">
                <div className="relative h-5 w-5">
                  <Image src="/images/icons/group.png" alt="Pax Icon" fill className="object-contain" />
                </div>
                <span className="font-medium">Minimum 35 Pax</span>
              </div>

              <div className="flex items-center gap-3 rounded-full bg-white/20 px-5 py-2.5 text-white backdrop-blur-md border border-white/10 transition hover:bg-white/30">
                <div className="relative h-5 w-5">
                  <Image src="/images/icons/clock.png" alt="Time Icon" fill className="object-contain" />
                </div>
                <span className="font-medium">4-6 Hours Service</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group flex items-center gap-3 rounded-full bg-[#96A66D] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#849260] hover:shadow-lg hover:-translate-y-0.5">
              View Packages
              <div className="relative h-4 w-4 transition-transform group-hover:translate-y-1">
                <Image src="/images/icons/downarroww.png" alt="Arrow" fill className="object-contain brightness-0 invert" />
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="relative h-8 w-8 opacity-80">
            <Image src="/images/icons/down.png" alt="Scroll Down" fill className="object-contain brightness-0 invert" />
          </div>
        </div>
      </section>


      {/* ==================================================================
          2. HERITAGE SECTION (Content)
          ================================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left: Text */}
          <div>
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
              Our Heritage
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-[#4A3B32] lg:text-5xl">
              A Culinary Journey Through Javanese Tradition
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              For over three decades, Tembi Historical Home has been preserving the
              authentic flavors of Javanese cuisine. Our buffet catering service brings
              the warmth of traditional hospitality to your special occasions.
            </p>

            <div className="flex gap-16">
              <div>
                <h3 className="font-serif text-4xl font-bold text-[#96A66D]">25+</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">Years of Experience</p>
              </div>
              <div>
                <h3 className="font-serif text-4xl font-bold text-[#96A66D]">100+</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">Events Catered</p>
              </div>
            </div>
          </div>

          {/* Right: Gallery Grid */}
          <div className="relative">
            {/* Dekorasi Bulatan */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#E8E6D9]/50" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#E8E6D9]/50" />

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent1.png" alt="Chef" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative mt-8 h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent2.png" alt="Interior" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent3.png" alt="Spices" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative mt-8 h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent4.png" alt="Dining" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          3. MENU SECTION (Cards)
          ================================================================== */}
      <section className="bg-[#F9F8F3] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
              Our Menu
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold text-[#4A3B32] lg:text-5xl">
              Authentic Javanese Flavors
            </h2>
            <p className="text-lg text-gray-600">
              Each buffet package is carefully crafted with a perfect balance of Javanese flavors — from savory mains to refreshing drinks.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <MenuCard 
              icon="/images/icons/warningw.png" title="Main Courses" subtitle="Pilih Kuah & Sayur"
              items={['Sup Ayam Jagung', 'Jangan Asem', 'Lodeh Tradisional', 'Gulai Nangka Muda']}
            />
            <MenuCard 
              icon="/images/icons/chickenw.png" title="Side Dishes" subtitle="Tumis & Lauk"
              items={['Tumis Tempe Kacang', 'Oseng Terong Balado', 'Ayam Goreng Kalasan', 'Mangut Lele', 'Telur Balado']}
            />
            <MenuCard 
              icon="/images/icons/icecreamw.png" title="Desserts" subtitle="Traditional Sweets"
              items={['Es Dawet Tradisional', 'Klepon Gula Jawa', 'Onde-onde Wijen', 'Lupis Ketan']}
            />
            <MenuCard 
              icon="/images/icons/glassw.png" title="Beverages" subtitle="Refreshing Drinks"
              items={['Es Jeruk Segar', 'Es Teh Manis', 'Es Setrup', 'Wedang Jahe']}
            />
          </div>
        </div>
      </section>
    
        
      <BuffetPricing 
        whatsappNumber="62812345678"
        packages={myPackages}
       />

       <BuffetFeatures />

       <BuffetBooking />

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

// ==================================================================
// HELPER COMPONENT (Untuk Menu Card agar kode lebih rapi)
// ==================================================================
type MenuCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  items: string[];
};

const MenuCard = ({ icon, title, subtitle, items }: MenuCardProps) => {
  return (
    <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A66D]">
        <div className="relative h-8 w-8">
           <Image 
              src={icon} 
              alt={title} 
              fill 
              sizes="32px"
              className="object-contain brightness-0 invert" 
           />
        </div>
      </div>
      <div className="mb-6 text-center">
        <h3 className="mb-1 font-serif text-2xl font-bold text-[#4A3B32]">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#96A66D]" strokeWidth={3} />
            <span className="text-sm font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};