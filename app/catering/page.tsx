import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Kita tidak perlu import dari lucide-react lagi untuk ikon gambar

export default function FoodPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      
      {/* SECTION 1: HERO SECTION (UPDATED) */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <Image 
              src="/images/foods/foodcover.png" // Ganti dengan gambar background Anda
              alt="Javanese Cuisine Spread" 
              fill
              className="object-cover"
              priority
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24">
    
          {/* Content Wrapper (Max Width dibatasi agar tidak terlalu lebar ke kanan) */}
          <div className="max-w-3xl flex flex-col items-start text-left">

            {/* Pill Label */}
            <div className="inline-flex items-center gap-3 border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-8">
              <Image 
                src="/icons/utensils.png" 
                alt="Utensils"
                width={16}
                height={16}
                className="w-4 h-4 object-contain invert" 
              />
              <span className="text-sm font-medium tracking-wide text-white">Authentic Javanese Cuisine</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-6xl font-bold text-white leading-none drop-shadow-lg">
              Food & Drink
            </h1>

            {/* Secondary Heading (Green/Gold) */}
            <h2 className="font-serif text-6xl font-bold text-[#A3B18A] mb-6 drop-shadow-lg">
              Packages
            </h2>

            {/* Subheading */}
            <p className="font-serif italic text-lg text-gray-200 mb-6 tracking-wide">
              Authentic Javanese taste for every occasion
            </p>

            {/* Description */}
            <p className="text-base text-gray-300 leading-relaxed max-w-xl">
              Enjoy the warmth of Javanese hospitality through our food. From classic buffet 
              spreads to snack and meal boxes, every dish is prepared with cultural care and local 
              flavor, bringing you the authentic taste of Central Javas culinary heritage.
            </p>
          </div>

          {/* Scroll Indicator (Tetap di tengah bawah layar) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <Image 
              src="/icons/chevron-down.png" // Pastikan punya icon ini atau ganti dengan SVG
              alt="Scroll Down"
              width={32}
              height={32}
              className="w-8 h-8 opacity-80 invert"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
    
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center">

            {/* Tag / Label */}
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/icons/leaf.png" // Pastikan file leaf.png ada di public/icons/
                alt="Leaf Icon"
                width={24}
                height={24}
                className="w-5 h-5 object-contain opacity-80"
              />
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-800">
                Cultural Heritage
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl  font-bold text-gray-900 leading-[1.15] mb-8">
              Preserving Tradition Through <br className="hidden lg:block" />
              <span className="text-[#8F9E75]">Authentic Flavors</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              At Tembi Historical Home, we believe that food is the heart of cultural 
              preservation. Our catering services bring together generations of 
              Javanese culinary wisdom, using traditional recipes passed down 
              through families and prepared with locally-sourced ingredients.
            </p>

            {/* Feature List */}
            <div className="space-y-8">
              <FeatureItem 
                title="Traditional Recipes" 
                desc="Authentic Javanese dishes prepared using time-honored methods" 
              />
              <FeatureItem 
                title="Local Ingredients" 
                desc="Fresh, locally-sourced ingredients from Yogyakarta region" 
              />
              <FeatureItem 
                title="Cultural Presentation" 
                desc="Served on traditional banana leaves and wooden plates" 
              />
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full aspect-square lg:aspect-[4/3]">
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden">
              <Image 
                src="/images/foods/foods1.png" // Ganti dengan gambar dapur/gerabah Anda
                alt="Traditional Javanese Kitchenware" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PACKAGES --- */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto">
    
          {/* 1. Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Image 
                src="/icons/package-icon.png" // Icon kotak/paket
                alt="icon"
                width={16} height={16}
                className="w-4 h-4 opacity-70"
              />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Catering Packages
              </span>
            </div>
      
            {/* Title */}
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Perfect <span className="text-[#8F9E75]">Package</span>
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Each package is carefully curated to deliver an authentic Javanese dining experience, 
              perfect for various occasions and group sizes.
            </p>
          </div>

          {/* 2. Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

            {/* Card 1: Buffet */}
            <PackageCard 
              image="/images/buffet.jpg"
              badge="≥35 pax"
              title="Buffet Package"
              subtitle="Perfect for Large Gatherings"
              desc="Ideal for gatherings, meetings, and cultural events. A complete spread featuring rice, soup, main dishes."
              features={[
                "Complete meal spread",
                "Traditional serving style",
                "Multiple dish options",
                "Dessert & beverages included"
              ]}
              linkUrl="/menu/buffet" // Link tujuan
              buttonText="View Buffet Menu"
            />

            {/* Card 2: Snack Box */}
            <PackageCard 
              image="/images/snackbox.jpg"
              badge="≥35 pax"
              title="Snack Box Package"
              subtitle="Delightful Traditional Treats"
              desc="A delightful assortment of traditional snacks and sweets perfect for light events, meetings, or afternoon tea."
              features={[
                "Traditional snacks variety",
                "Individual packaging",
                "Sweet & savory options",
                "Traditional tea included"
              ]}
              linkUrl="/menu/snack-box" // Link tujuan
              buttonText="View Snack Box Menu"
            />

            {/* Card 3: Rice Box */}
            <PackageCard 
              image="/images/ricebox.jpg"
              badge="≥35 pax"
              title="Rice Box Package"
              subtitle="Complete Individual Meals"
              desc="A complete individual meal packed with authentic Javanese dishes. Perfect for business meetings or seminars."
              features={[
                "Complete balanced meal",
                "Individual box packaging",
                "Traditional main dishes",
                "Authentic sambal included"
              ]}
              linkUrl="/menu/rice-box" // Link tujuan
              buttonText="View Rice Box Menu"
            />
          </div>

          {/* 3. Info Footer Box (White Box at Bottom) */}
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
              
              <InfoItem 
                icon="/icons/users.png"
                title="Minimum 35 Guests"
                desc="All packages available for groups of 35 people or more"
              />
              <InfoItem 
                icon="/icons/clock.png"
                title="24-Hour Notice"
                desc="Please place orders at least 24 hours in advance"
              />
              <InfoItem 
                icon="/icons/truck.png"
                title="Delivery Available"
                desc="Free delivery within Yogyakarta city area"
              />

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

// Definisi tipe data untuk props PackageCard
interface PackageCardProps {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[]; // Array of strings
  linkUrl: string;
  buttonText: string;
}

// Definisi tipe data untuk props InfoItem
interface InfoItemProps {
  icon: string;
  title: string;
  desc: string;
}

// Komponen Item List dengan ICON GAMBAR LOCAL
function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 mt-1">
        {/* Lingkaran Background */}
        <div className="w-6 h-6 rounded-full bg-[#829168] flex items-center justify-center overflow-hidden relative">
           {/* Icon Centang (Gambar Local) */}
           <Image 
             src="/icons/check.png" // Icon Centang
             alt="Check"
             width={12}
             height={12}
             className="object-contain brightness-0 invert" // brightness-0 invert = membuatnya jadi putih
           />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 text-base">{title}</h4>
        <p className="text-gray-500 text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}

/* 1. Komponen Kartu Paket (Updated Type) */
function PackageCard({ 
  image, 
  badge, 
  title, 
  subtitle, 
  desc, 
  features, 
  linkUrl, 
  buttonText 
}: PackageCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
      {/* Image Header */}
      <div className="relative h-56 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
        {/* Badge Pax */}
        <div className="absolute top-4 right-4 bg-[#8F9E75] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm font-medium text-gray-500 mb-4">{subtitle}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>

        {/* Features List */}
        <div className="space-y-3 mb-8 flex-grow">
          {features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center mt-0.5 shrink-0">
                 {/* Icon Centang Putih Kecil */}
                 <Image src="/icons/check.png" alt="check" width={8} height={8} className="brightness-0 invert" />
              </div>
              {/* Tidak perlu manual type :string disini karena TS sudah tahu features adalah string[] */}
              <span className="text-sm text-gray-700">{feat}</span>
            </div>
          ))}
        </div>

        {/* Button Link */}
        <Link 
          href={linkUrl}
          className="w-full text-center bg-[#8F9E75] hover:bg-[#7A8B60] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Image src="/icons/eye.png" alt="view" width={16} height={16} className="invert opacity-90" />
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

/* 2. Komponen Info Bawah (Updated Type) */
function InfoItem({ icon, title, desc }: InfoItemProps) {
  return (
    <div className="flex flex-col items-center px-4 pt-4 md:pt-0">
      <div className="mb-4">
         <Image src={icon} alt={title} width={32} height={32} className="w-8 h-8 opacity-80" />
      </div>
      <h4 className="font-serif text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-500 max-w-xs mx-auto">{desc}</p>
    </div>
  );
}