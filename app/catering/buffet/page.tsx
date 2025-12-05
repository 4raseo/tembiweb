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
      minPax: "35 Pax",
      description: "Perfect for corporate events",
      theme: "standard",
      iconSrc: "/images/icons/food-white.svg", 
      items: [
        "1 Traditional Soup (Sup Ayam Jagung or Lodeh)",
        "2 Main Dishes (Ayam Goreng Kalasan + Telur Balado)",
        "2 Side Dishes (Tumis Tempe + Oseng Terong)",
        "1 Traditional Dessert (Es Dawet)",
        "2 Beverages (Es Teh + Es Jeruk)",
        "Basic table setup & serving equipment"
      ]
    },
    {
      name: "Buffet Premium",
      minPax: "50 Pax", // Sesuai gambar English version
      description: "Ideal for weddings & celebrations",
      theme: "premium",
      isPopular: true,
      iconSrc: "/images/icons/crown-white.svg", 
      items: [
        "2 Traditional Soups (Choice of 3 options)",
        "3 Premium Main Dishes including Ayam Lada Hitam",
        "3 Side Dishes with Kembung Cabe Ijo",
        "2 Traditional Desserts + Fruit platter",
        "3 Beverages including Wedang Jahe",
        "Enhanced table setup with traditional decorations",
        "Professional serving staff included"
      ]
    },
    {
      name: "Buffet Exclusive",
      minPax: "100 Pax", // Sesuai gambar English version
      description: "Ultimate traditional experience",
      theme: "exclusive",
      iconSrc: "/images/icons/diamond-white.svg", 
      items: [
        "Full traditional buffet setup with banana leaves",
        "3 Traditional Soups in clay serving pots",
        "5 Premium Main Dishes + Gulai Telur special",
        "4 Traditional Side Dishes",
        "Complete dessert station with 4 varieties",
        "Traditional beverage station with live preparation",
        "Full decorative service with gamelan music",
        "Dedicated event coordinator & serving team"
      ]
    }
];


export default function BuffetPage() {
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
                  src="/images/icons/food-white.svg" 
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
                  <Image src="/images/icons/group-green.svg" alt="Pax Icon" fill className="object-contain" />
                </div>
                <span className="font-medium">Minimum 35 Pax</span>
              </div>

              <div className="flex items-center gap-3 rounded-full bg-white/20 px-5 py-2.5 text-white backdrop-blur-md border border-white/10 transition hover:bg-white/30">
                <div className="relative h-5 w-5">
                  <Image src="/images/icons/clock-green.svg" alt="Time Icon" fill className="object-contain" />
                </div>
                <span className="font-medium">4-6 Hours Service</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group flex items-center gap-3 rounded-full bg-[#96A66D] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#849260] hover:shadow-lg hover:-translate-y-0.5">
              View Packages
              <div className="relative h-4 w-4 transition-transform group-hover:translate-y-1">
                <Image src="/images/icons/down-arrow-white.svg" alt="Arrow" fill className="object-contain brightness-0 invert" />
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="relative h-8 w-8 opacity-80">
            <Image src="/images/icons/arrow-down-white.svg" alt="Scroll Down" fill className="object-contain brightness-0 invert" />
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
              Each buffet package is carefully crafted with a perfect balance of Javanese flavors — from savory mains that warm the soul to refreshing drinks and sweet desserts that complete the experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Soup */}
            <MenuCard 
              icon="/images/icons/circle-white.svg" 
              title="Soup" 
              subtitle="Pilih Kuah & Sayur"
              items={[
                'Sup Sayur Bening', 'Sup Bakso Sosis', 'Sup Rolade',
                'Sup Ayam Jagung', 'Sup Timlo', 'Jangan Lodeh',
                'Jangan Asem', 'Jangan Bobor Gandol', 'Oblok Godhong Telo',
                'Gulai Nangka Muda'
              ]}
            />

            {/* Card 2: Main Course */}
            <MenuCard 
              icon="/images/icons/chicken-white.svg" 
              title="Main Course" 
              subtitle="Tumis & Lauk"
              items={[
                'Tumis Tempe Kacang Panjang', 'Tumis Tahu Tomat Ijo', 
                'Oseng Tempe Lombok Ijo', 'Oseng Janggel Sosis', 
                'Oseng Terong Balado', 'Oseng Labu Siam', "Ca' Buncis Tahu", 
                "Ca' Kembang Kol Bakso", "Ca' Brokoli Jamur Kuping", 'Sapo Tahu'
              ]}
            />

            {/* Card 3: Desserts */}
            <MenuCard 
              icon="/images/icons/ice-cream-white.svg" 
              title="Desserts" 
              subtitle="Traditional Sweets"
              items={[
                'Es Dawet Tradisional', 'Klepon Gula Jawa', 
                'Onde-onde Wijen', 'Lupis Ketan'
              ]}
            />

            {/* Card 4: Beverages */}
            <MenuCard 
              icon="/images/icons/drink-white.svg" 
              title="Beverages" 
              subtitle="Refreshing Drinks"
              items={[
                'Es Degan', 'Es Teh Manis', 'Es Jeruk', 'Es Setup',
                'Es Dawet', 'Es Serut Melon', 'Es Buah', 'Es Cincau',
                'Es Cocktail', 'Es Infuse Water'
              ]}
            />

            {/* Card 5: Chicken */}
            <MenuCard 
              icon="/images/icons/circle-white.svg" 
              title="Chicken" 
              subtitle="Pilihan Ayam"
              items={[
                'Ayam Goreng Kalasan', 'Ayam Goreng Kremes', 'Ayam Lada Hitam',
                'Ayam Daun Temuru', 'Ayam Fillet Goreng', 'Ayam Saus Mentega',
                'Ayam Semur', "Ayam Ca' Jamur", 'Ayam Cabe Ijo', 'Chicken Katsu'
              ]}
            />

            {/* Card 6: Egg */}
            <MenuCard 
              icon="/images/icons/chicken-white.svg" 
              title="Egg" 
              subtitle="Pilihan Telur"
              items={[
                'Telur Semur', 'Telur Balado', 'Telur Dadar Padang',
                'Telur Asin', 'Telur Rebus', 'Telur Crispy',
                'Telur Ceplok Bumbu Bali', 'Telur Goreng Cabe Ijo',
                'Gulai Telur', 'Fuyung Hai'
              ]}
            />

            {/* Card 7: Fish */}
            <MenuCard 
              icon="/images/icons/circle-white.svg" 
              title="Fish" 
              subtitle="Pilihan Ikan"
              items={[
                'Lele Goreng Kremes', 'Mangut Lele', 'Nila Sambal Matah',
                'Nila Goreng/Bakar', 'Kembung Cabe Ijo', 'Kembung Balado',
                'Ikan Fillet Asam Manis', 'Ikan Fillet Sambal Matah',
                'Ikan Fillet Dabu-Dabu', 'Ikan Katsu'
              ]}
            />

            {/* Card 8: Side Dish */}
            <MenuCard 
              icon="/images/icons/chicken-white.svg" 
              title="Side Dish" 
              subtitle="Pilihan Menu Pendamping"
              items={[
                'Mendoan', 'Tahu/Tempe Goreng', 'Tahu/Tempe Bacem',
                'Perkedel Tahu', 'Tahu Susu', 'Tahu Crispy',
                'Bakwan Sayur', 'Bakwan Jagung', 'Perkedel Kentang',
                'Jamur Crispy'
              ]}
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