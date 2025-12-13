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
                src="/images/icons/food-white.svg" 
                alt="Utensils"
                width={16}
                height={16}
                className="w-4 h-4 object-contain" 
              />
              <span className="text-sm font-medium tracking-wide text-white">Authentic Javanese Cuisine</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-6xl font-bold text-white leading-none drop-shadow-lg">
              Food & Drink
            </h1>

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
              src="/images/icons/arrow-down-white.svg" // Pastikan punya icon ini atau ganti dengan SVG
              alt="Scroll Down"
              width={32}
              height={16}
              className="w-8 h-4"
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
                src="/images/icons/leaf-black.svg" // Pastikan file leaf.png ada di public/icons/
                alt="Leaf Icon"
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
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
                src="/images/icons/package-black.svg" // Icon kotak/paket
                alt="icon"
                width={16} height={16}
                className="w-4 h-4"
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
              image="/images/foods/foods5.png"
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
              linkUrl="/catering/buffet" // Link tujuan
              buttonText="View Buffet Menu"
            />

            {/* Card 2: Snack Box */}
            <PackageCard 
              image="/images/foods/foods6.png"
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
              linkUrl="/catering/snack-box" // Link tujuan
              buttonText="View Snack Box Menu"
            />

            {/* Card 3: Rice Box */}
            <PackageCard 
              image="/images/foods/foods7.png"
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
              linkUrl="/catering/rice-box" // Link tujuan
              buttonText="View Rice Box Menu"
            />
          </div>

          {/* 3. Info Footer Box (White Box at Bottom) */}
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100">
            {/* Ganti grid menjadi flex */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
              <InfoItem 
                icon="/images/icons/group-black.svg"
                title="Minimum 35 Guests"
                desc="All packages available for groups of 35 people or more"
              />
              <InfoItem 
                icon="/images/icons/clock-black.svg"
                title="24-Hour Notice"
                desc="Please place orders at least 24 hours in advance"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: SAMPLE MENUS --- */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
        <div className="max-w-7xl mx-auto">
    
          {/* 1. Main Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image 
                src="/images/icons/food-black.svg" 
                alt="icon" 
                width={14} height={14} 
                className="w-3.5 h-3.5" 
              />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Sample Menus
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Taste the <span className="text-[#8F9E75]">Authentic Flavors</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Experience the rich culinary heritage of Java through our carefully selected traditional 
              dishes, each prepared with love and authentic recipes.
            </p>
          </div>

          {/* --- CATEGORY 1: BUFFET (5 Columns) --- */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Buffet Package Highlights</h3>
              <p className="text-gray-500 text-sm">A complete spread of traditional Javanese dishes</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {buffetMenu.map((item, idx) => (
                <MenuCard key={idx} {...item} />
              ))}
            </div>
          </div>

          {/* --- CATEGORY 2: SNACK BOX (4 Columns) --- */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Snack Box Delights</h3>
              <p className="text-gray-500 text-sm">Traditional sweets and savory treats</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {snackMenu.map((item, idx) => (
                <MenuCard key={idx} {...item} />
              ))}
            </div>
          </div>

          {/* --- CATEGORY 3: RICE BOX (5 Columns) --- */}
          <div>
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Rice Box Complete Meal</h3>
              <p className="text-gray-500 text-sm">Balanced individual portions of authentic dishes</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {riceBoxMenu.map((item, idx) => (
                <MenuCard key={idx} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: HERITAGE (Story) --- */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      
            {/* LEFT COLUMN: Image with Floating Card */}
            <div className="relative pl-4 sm:pl-0">

              {/* Main Image */}
              <div className="relative w-full aspect-[4/5] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-lg">
                <Image 
                  src="/images/foods/foods8.png" // Foto Ibu-ibu memasak
                  alt="Generations cooking" 
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating White Card (Desktop Only effect) */}
              {/* Posisi: absolute, digeser ke kiri (-left) dan bawah (bottom) */}
              <div className="hidden md:block absolute bottom-10 -left-10 w-80 bg-white p-6 rounded-2xl shadow-2xl shadow-gray-200/50">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon Bulat Hijau */}
                  <div className="w-12 h-12 rounded-full bg-[#8F9E75] flex items-center justify-center flex-shrink-0">
                    <Image src="/images/icons/heart-white.svg" alt="heart" width={20} height={20} className="brightness-0 invert" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-gray-900">3 Generations</h4>
                    <p className="text-xs text-gray-500">Of culinary tradition</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                <p className="text-sm text-gray-600 italic leading-relaxed">
                  Every dish tells a story of our ancestors and their love for authentic flavors.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Text Content */}
            <div>

              {/* Top Label */}
              <div className="flex items-center gap-2 mb-6">
                <Image src="/images/icons/star-black.svg" alt="star" width={16} height={16} className="w-4 h-4 opacity-80" />
                <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  Our Heritage
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Three Generations of <br />
                <span className="text-[#8F9E75]">Culinary Excellence</span>
              </h2>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                Our recipes have been carefully preserved and passed down through 
                three generations of the Tembi family. Each dish represents not just a 
                meal, but a piece of Javanese cultural heritage that were proud to share 
                with every guest.
              </p>

              {/* Feature List */}
              <div className="space-y-8">
                <HeritageItem 
                  icon="/images/icons/book-black.svg"
                  title="Traditional Recipes"
                  desc="Authentic recipes dating back to the early 1900s, carefully documented and preserved by our family matriarchs."
                />
                <HeritageItem 
                  icon="/images/icons/plant-black.svg"
                  title="Farm-to-Table Philosophy"
                  desc="We source ingredients from local farmers and our own heritage garden, ensuring freshness and supporting the community."
                />
                <HeritageItem 
                  icon="/images/icons/hand-black.svg"
                  title="Handcrafted with Love"
                  desc="Every dish is prepared by hand using traditional methods, ensuring authentic taste and cultural integrity."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- SECTION 6: CELEBRATE (Occasions & Stats) --- */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
        <div className="max-w-7xl mx-auto">
    
          {/* 1. Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image 
                src="/images/icons/calendar-black.svg" // Icon Kalender
                alt="icon" 
                width={16} height={16} 
                className="w-4 h-4 opacity-80" 
              />
              <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Perfect Occasions
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Celebrate Every <span className="text-[#8F9E75]">Moment</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              From intimate gatherings to grand celebrations, our catering packages are designed to 
              make every occasion memorable with authentic Javanese hospitality.
            </p>
          </div>

          {/* 2. Occasions Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-24">
      
            {/* Card 1: Corporate */}
            <OccasionItem 
              image="/images/foods/foods9.png"
              title="Corporate Events"
              subtitle="Professional meetings with cultural flair"
              features={[
                "Business meetings & seminars",
                "Corporate retreats",
                "Team building events"
              ]}
            />

            {/* Card 2: Cultural */}
            <OccasionItem 
              image="/images/foods/foods10.png"
              title="Cultural Celebrations"
              subtitle="Weddings and traditional ceremonies"
              features={[
                "Traditional weddings",
                "Cultural festivals",
                "Religious ceremonies"
              ]}
            />

            {/* Card 3: Family */}
            <OccasionItem 
              image="/images/foods/foods11.png"
              title="Family Gatherings"
              subtitle="Intimate celebrations with loved ones"
              features={[
                "Birthday celebrations",
                "Family reunions",
                "Holiday gatherings"
              ]}
            />
          </div>

          {/* 3. Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-16">
            <StatItem 
              icon="/images/icons/star-white.svg" // Icon Bintang (Putih)
              number="100+" 
              label="Events Catered" 
            />
            <StatItem 
              icon="/images/icons/group-white.svg" // Icon User/Group (Putih)
              number="1,000+" 
              label="Guests Served" 
            />
            <StatItem 
              icon="/images/icons/heart-white.svg" // Icon Hati (Putih)
              number="98%" 
              label="Satisfaction Rate" 
            />
            <StatItem 
              icon="/images/icons/calendar-white.svg" // Icon Kalender (Putih)
              number="15+" 
              label="Years Experience" 
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 8: HELP & CONTACT --- */}
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
                  src="/images/icons/phone-white.svg" 
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
                  src="/images/icons/whatsapp-white.svg" 
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
                  src="/images/icons/mail-white.svg" 
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
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden relative">
           {/* Icon Centang (Gambar Local) */}
           <Image 
             src="/images/icons/check-green.svg" // Icon Centang
             alt="Check"
             fill
             className="object-contain" // brightness-0 invert = membuatnya jadi putih
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
              <div className="w-4 h-4 flex items-center justify-center overflow-hidden relative">
                 <Image src="/images/icons/check-black.svg" alt="check" fill className="" />
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
          <Image src="/images/icons/view-white.svg" alt="view" width={18} height={16} className="" />
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

// --- INTERFACE ---
interface MenuCardProps {
  image: string;
  title: string;
  desc: string;
}

// --- DATA MENUS ---
const buffetMenu: MenuCardProps[] = [
  { image: "/images/foods/nasi-liwet.png", title: "Nasi Liwet", desc: "Aromatic coconut rice cooked in banana leaves with traditional spices" },
  { image: "/images/foods/ayam-kremes.png", title: "Ayam Goreng Kremes", desc: "Crispy fried chicken with traditional peanut coating" },
  { image: "/images/foods/sayur-asem.png", title: "Sayur Asem", desc: "Traditional tamarind soup with mixed vegetables" },
  { image: "/images/foods/sambal.png", title: "Sambal Bajak", desc: "Spicy traditional chili paste with peanuts and spices" },
  { image: "/images/foods/es-dawet.png", title: "Es Dawet", desc: "Refreshing coconut milk drink with rice flour jelly" },
];

const snackMenu: MenuCardProps[] = [
  { image: "/images/foods/klepon.png", title: "Klepon", desc: "Green rice balls filled with palm sugar and rolled in coconut" },
  { image: "/images/foods/kue-lumpur.png", title: "Kue Lumpur", desc: "Soft traditional cake with coconut milk and raisins" },
  { image: "/images/foods/pastel.png", title: "Pastel", desc: "Crispy fried pastry with seasoned vegetable and meat filling" },
  { image: "/images/foods/teh.png", title: "Teh Hangat", desc: "Warm traditional herbal tea with aromatic spices" },
];

const riceBoxMenu: MenuCardProps[] = [
  { image: "/images/foods/nasi-putih.png", title: "Nasi Putih", desc: "Perfectly steamed jasmine rice as the foundation" },
  { image: "/images/foods/ayam-kalasan.png", title: "Ayam Kalasan", desc: "Traditional grilled chicken with sweet soy sauce marinade" },
  { image: "/images/foods/tempe.png", title: "Tempe Bacem", desc: "Braised tempeh with palm sugar and traditional spices" },
  { image: "/images/foods/urap.png", title: "Urap", desc: "Mixed vegetable salad with seasoned grated coconut" },
  { image: "/images/foods/sambal-fresh.png", title: "Sambal", desc: "Fresh homemade chili paste with authentic spice blend" },
];

// --- COMPONENT HELPER ---
function MenuCard({ image, title, desc }: MenuCardProps) {
  return (
    <div className="bg-[#F9F5F0] rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300 pb-4">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      
      {/* Text Content */}
      <div className="p-5">
        <h4 className="font-serif font-bold text-gray-900 text-lg mb-2">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// Interface untuk Props HeritageItem
interface HeritageItemProps {
  icon: string;
  title: string;
  desc: string;
}

// Komponen Helper untuk List Item Heritage
function HeritageItem({ icon, title, desc }: HeritageItemProps) {
  return (
    <div className="flex gap-5 items-start">
      {/* Icon Wrapper (Tanpa lingkaran background, hanya icon hitam kecil sesuai gambar) */}
      <div className="flex-shrink-0 mt-1">
        <Image 
          src={icon} 
          alt={title} 
          width={20} 
          height={20} 
          className="w-5 h-5 object-contain opacity-90" 
        />
      </div>
      <div>
        <h4 className="font-serif text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// --- INTERFACE & HELPER FOR OCCASION CARD ---
interface OccasionItemProps {
  image: string;
  title: string;
  subtitle: string;
  features: string[];
}

function OccasionItem({ image, title, subtitle, features }: OccasionItemProps) {
  return (
    <div className="group">
      {/* Image Card with Overlay */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 shadow-md">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Text Overlay (Title on Image) */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="font-serif text-2xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-300 text-sm font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Features List Below Image */}
      <div className="space-y-3 px-2">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-4 h-4 flex items-center justify-center overflow-hidden relative">
              <Image src="/images/icons/check-black.svg" alt="check" fill className="" />
            </div>
            <span className="text-gray-600 text-sm">{feat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- INTERFACE & HELPER FOR STATS ---
interface StatItemProps {
  icon: string;
  number: string;
  label: string;
}

function StatItem({ icon, number, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Green Circle Icon */}
      <div className="w-16 h-16 rounded-full bg-[#8F9E75] flex items-center justify-center mb-4 shadow-lg shadow-[#8F9E75]/30">
        <Image 
          src={icon} 
          alt={label} 
          width={28} height={28} 
          className="object-contain" // Icon sudah putih dari sumbernya atau gunakan invert jika hitam
        />
      </div>
      {/* Number */}
      <div className="font-serif text-3xl font-bold text-gray-900 mb-1">{number}</div>
      {/* Label */}
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}

// --- INTERFACE ---
interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  minGuests: string;
  features: string[];
  buttonText: string;
  waMessage: string;
  isPopular: boolean;
}

// --- COMPONENT ---
function PricingCard({ 
  title, 
  subtitle, 
  price, 
  minGuests, 
  features, 
  buttonText, 
  waMessage, 
  isPopular 
}: PricingCardProps) {
  
  // Ganti nomor ini dengan nomor WhatsApp bisnis Anda (format internasional tanpa '+')
  const phoneNumber = "6281234567890"; 
  
  // Membuat link WhatsApp
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className={`relative rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full ${
      isPopular 
        ? "bg-[#8F9E75] text-white shadow-xl scale-105 z-10" // Style jika Popular (Hijau)
        : "bg-[#F9F5F0] text-gray-900 shadow-sm border border-transparent hover:border-[#8F9E75]/30" // Style Standard (Cream)
    }`}>
      
      {/* Badge 'Most Popular' (Hanya muncul jika isPopular = true) */}
      {isPopular && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      {/* Header Card */}
      <div className="text-center mb-8 mt-4">
        <h3 className="font-serif text-2xl font-bold mb-2">{title}</h3>
        <p className={`text-sm ${isPopular ? "text-gray-100" : "text-gray-500"}`}>
          {subtitle}
        </p>
      </div>

      {/* Price */}
      <div className="text-center mb-8 pb-8 border-b border-current/10">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-lg font-semibold">Rp</span>
          <span className="font-serif text-5xl font-bold">{price}</span>
          <span className={`text-sm ${isPopular ? "text-gray-200" : "text-gray-500"}`}>/person</span>
        </div>
        <p className={`text-xs mt-2 ${isPopular ? "text-gray-200" : "text-gray-500"}`}>
          Minimum {minGuests} guests
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-4 mb-10 flex-grow px-2">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {/* Icon Check: Warnanya berubah otomatis */}
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              isPopular ? "bg-white text-[#8F9E75]" : "bg-black text-white"
            }`}>
               {/* Menggunakan Image/Icon centang */}
               <Image 
                 src="/images/icons/check2.png" 
                 alt="check" 
                 width={10} height={10} 
                 // Jika card hijau (Popular), icon centangnya warnanya asli (atau diatur via CSS filter jika perlu)
                 // Jika card cream (Standard), icon centangnya jadi putih (invert)
                 className={isPopular ? "" : "brightness-0 invert"} 
               />
            </div>
            <span className={`text-sm ${isPopular ? "text-gray-100" : "text-gray-700"}`}>
              {feat}
            </span>
          </div>
        ))}
      </div>

      {/* Button WhatsApp */}
      <Link 
        href={waLink}
        target="_blank" // Membuka di tab baru
        rel="noopener noreferrer"
        className={`w-full block text-center py-4 rounded-lg font-semibold transition-all duration-300 ${
          isPopular
            ? "bg-white text-[#8F9E75] hover:bg-gray-100 shadow-lg" // Tombol Putih (utk Card Hijau)
            : "bg-[#8F9E75] text-white hover:bg-[#7A8B60] shadow-md" // Tombol Hijau (utk Card Cream)
        }`}
      >
        {buttonText}
      </Link>

    </div>
  );
}

// --- HELPER UNTUK INCLUDED ITEM ---
function IncludedItem({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center px-2">
      {/* Circle Icon Wrapper */}
      <div className="w-16 h-16 rounded-full bg-[#8F9E75] flex items-center justify-center mb-6 shadow-sm">
        <Image 
          src={icon} 
          alt={title} 
          width={24} height={24} 
          // Menggunakan invert agar icon hitam berubah jadi putih
          className="brightness-0 invert object-contain" 
        />
      </div>
      
      {/* Text */}
      <h4 className="font-serif text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed max-w-[150px] mx-auto">
        {desc}
      </p>
    </div>
  );
}