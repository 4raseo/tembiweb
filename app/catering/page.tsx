// app/catering/page.tsx (atau pages/catering.tsx)

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaLeaf,
  FaHeart,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaUsers,
  FaUtensils,
  FaBoxOpen,
  FaTemperatureHigh,
  FaClipboardCheck,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

// --- Variabel Warna Sesuai Desain ---
// Anda bisa menyesuaikan ini atau memindahkannya ke tailwind.config.js
const colors = {
  primary: 'text-emerald-800', // Hijau tua untuk teks
  primaryBg: 'bg-emerald-700', // Hijau tua untuk background
  primaryBgLite: 'bg-emerald-50', // Hijau muda
  secondary: 'text-amber-800', // Cokelat/Gold untuk teks
  bgLight: 'bg-[#FAF8F5]', // Background krem
  bgWhite: 'bg-white',
};

// --- Komponen Kecil: Ikon Fitur (Halal, No MSG, dll) ---
interface FeatureIconProps {
  icon: React.ReactNode;
  label: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ icon, label }) => (
  <div className="flex flex-col items-center text-center">
    <div
      className={`flex items-center justify-center w-16 h-16 rounded-full ${colors.primaryBgLite} ${colors.primary}`}
    >
      {icon}
    </div>
    <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
  </div>
);

// --- Komponen Kecil: Kartu Layanan (Delivery, Waiter, dll) ---
interface ServicePackageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServicePackageCard: React.FC<ServicePackageCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div
    className={`${colors.bgWhite} p-6 rounded-lg shadow-md text-center items-center flex flex-col`}
  >
    <div className={`${colors.primary} text-4xl mb-4`}>{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// --- Komponen Kecil: Kartu Kontak (Phone, Message, dll) ---
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  href,
}) => (
  <div
    className={`${colors.bgWhite} p-8 rounded-lg shadow-lg text-center items-center flex flex-col border border-gray-100`}
  >
    <div className={`${colors.primary} text-4xl mb-5`}>{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <Link
      href={href}
      className={`inline-block px-6 py-3 rounded-full ${colors.primaryBg} text-white font-medium hover:bg-emerald-800 transition-colors`}
    >
      {buttonText}
    </Link>
  </div>
);

// --- Komponen Utama Halaman Catering ---
const CateringPage = () => {
  return (
    <div className="font-sans">
      {/* CATATAN: Navbar tidak termasuk di sini. 
        Asumsinya, ini adalah bagian dari file Layout.tsx utama Anda.
      */}

      {/* 1. Hero Section */}
      <section className="relative h-[450px] w-full flex items-center justify-center">
        {/* Gambar Latar */}
        <Image
          src="/images/catering-hero.jpg" // Ganti dengan path gambar Anda
          alt="Catering buffet"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        {/* Teks Overlay */}
        <div className="relative z-10 text-center">
          <h1 className={`text-5xl md:text-6xl font-bold text-white`}>
            Catering Package for 50 People
          </h1>
        </div>
      </section>

      {/* 2. Package Description Section */}
      <section className={`${colors.bgLight} py-20`}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Kolom Kiri: Deskripsi & Fitur */}
            <div className="md:col-span-2">
              <h2
                className={`text-3xl font-bold ${colors.secondary} mb-4`}
              >
                Package Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Enjoy a complete menu of traditional Javanese dishes prepared
                with authentic flavors. Our 50-person catering package is
                designed to bring the richness of Indonesian culinary heritage
                to your special event. We prioritize quality and taste,
                using only the freshest of ingredients coupled with healthy
                cooking methods.
              </p>
              {/* Ikon Fitur */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <FeatureIcon
                  icon={<FaCheckCircle size={28} />}
                  label="All Halal"
                />
                <FeatureIcon
                  icon={<FaTimesCircle size={28} />}
                  label="No MSG"
                />
                <FeatureIcon icon={<FaLeaf size={28} />} label="Fresh" />
                <FeatureIcon icon={<FaHeart size={28} />} label="Healthy" />
              </div>
            </div>

            {/* Kolom Kanan: Kotak Harga */}
            <div
              className={`${colors.bgWhite} p-8 rounded-lg shadow-xl border border-gray-100`}
            >
              <p className="text-3xl font-bold text-gray-800 mb-4">
                IDR 3,750,000
              </p>
              <p className="text-sm text-gray-600 mb-6">
                All package inclusions
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className={`${colors.primary} mr-3`} />
                  Main course
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className={`${colors.primary} mr-3`} />
                  Traditional menu
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className={`${colors.primary} mr-3`} />
                  Side dishes
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className={`${colors.primary} mr-3`} />
                  Stall menu
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className={`${colors.primary} mr-3`} />
                  Dessert
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Menu Selection Section */}
      <section className={`${colors.bgWhite} py-20`}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${colors.secondary} mb-4`}
            >
              Complete Menu Selection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You can choose your favorite menu from our authentic traditional
              recipes, all included as part of the package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Kolom 1: Main Dishes */}
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Main Dishes
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>Nasi Liwet</li>
                <li>Nasi Putih Pandan Wangi</li>
                <li>Nasi Goreng Seafood</li>
                <li>Ayam Bakar</li>
                <li>Sapi Lada Hitam</li>
              </ul>
            </div>
            {/* Kolom 2: Side Dishes */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                Side Dishes
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>Spice Crusted Tempeh</li>
                <li>Perkedel Kentang</li>
                <li>Tahu Bakso</li>
                <li>Orek Tempe Basah</li>
                <li>Sambal Goreng Kentang</li>
              </ul>
            </div>
            {/* Kolom 3: Traditional Drinks */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Traditional Drinks
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>Es Cendol</li>
                <li>Es Dawet</li>
                <li>Wedang Jahe</li>
                <li>Bajigur</li>
              </ul>
            </div>
            {/* Kolom 4: Traditional Snacks */}
            <div className="bg-pink-50 p-6 rounded-lg border border-pink-100">
              <h3 className="text-xl font-semibold text-pink-800 mb-4">
                Traditional Snacks
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>Klepon</li>
                <li>Putu Mayang</li>
                <li>Lapis Legit</li>
                <li>Onde-onde</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Service Package Section */}
      <section className={`${colors.bgLight} py-20`}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${colors.secondary} mb-4`}
            >
              Complete Service Package
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              An elegant presentation with professional service to support your
              event. We focus on every detail, while you focus on enjoying your
              time with your guests.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServicePackageCard
              icon={<FaTruck />}
              title="Delivery & Setup"
              description="On-time delivery and professional setup of the buffet display according to the event theme."
            />
            <ServicePackageCard
              icon={<FaUsers />}
              title="Waiter & Staff"
              description="Friendly and responsive staff on standby during the event to assist guests and ensure cleanliness."
            />
            <ServicePackageCard
              icon={<FaUtensils />}
              title="Complete Cutlery"
              description="Includes premium plates, glasses, spoons, forks, and napkins for all 50 guests."
            />
            <ServicePackageCard
              icon={<FaBoxOpen />}
              title="Traditional Container"
              description="Serving food in authentic traditional containers (e.g., clay pots, woven bamboo) for an elegant aesthetic."
            />
            <ServicePackageCard
              icon={<FaTemperatureHigh />}
              title="Temperature Control"
              description="Equipped with food warmers to ensure dishes remain hot and delicious throughout the event."
            />
            <ServicePackageCard
              icon={<FaClipboardCheck />}
              title="Food Coordinator"
              description="A dedicated person to coordinate all food and beverage needs, from setup to clean-up."
            />
          </div>
        </div>
      </section>

      {/* 5. Package Gallery Section */}
      <section className={`${colors.bgWhite} py-20`}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${colors.secondary} mb-4`}
            >
              Package Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we beautifully present our catering packages for various
              events and celebrations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Ganti src dengan path gambar Anda */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/gallery-1.jpg"
                alt="Gallery 1"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/gallery-2.jpg"
                alt="Gallery 2"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/gallery-3.jpg"
                alt="Gallery 3"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/gallery-4.jpg"
                alt="Gallery 4"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/gallery-5.jpg"
                alt="Gallery 5"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/gallery-6.jpg"
                alt="Gallery 6"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Need Help Section */}
      <section className={`${colors.bgLight} py-20`}>
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${colors.secondary} mb-4`}
            >
              Need Help or Have Questions?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team is ready to help you plan the perfect catering for
              your special event.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<FaPhone />}
              title="Talk to Sales"
              description="Speak directly with our team for immediate assistance."
              buttonText="Call Us Now"
              href="tel:+628123456789"
            />
            <ContactCard
              icon={<FaWhatsapp />}
              title="Message Us"
              description="Have a quick question? Chat with us directly on WhatsApp."
              buttonText="Start Chat"
              href="https://wa.me/628123456789"
            />
            <ContactCard
              icon={<FaEnvelope />}
              title="Email Us"
              description="Send us an email with your event details and we'll get back to you."
              buttonText="Send Email"
              href="mailto:info@colonial.com"
            />
          </div>
        </div>
      </section>

      {/* 7. Special Requests Section */}
      <section className={`${colors.bgWhite} py-20`}>
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2
            className={`text-3xl font-bold ${colors.secondary} mb-4`}
          >
            Special Requests or Custom Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Planning a different event or need a custom menu? We are happy
            to accommodate your needs. Lets discuss and create a package
            thats perfect for you.
          </p>
          <Link
            href="/contact"
            className={`inline-block px-10 py-4 rounded-full ${colors.primaryBg} text-white text-lg font-semibold hover:bg-emerald-800 transition-colors`}
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Kolom 1: Logo & Social */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Colonial</h3>
            <p className="text-sm mb-6">
              Authentic Javanese catering for your memorable events.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white">
                <FaTwitter size={20} />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/catering" className="hover:text-white">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhone className="mr-3" /> +62 812 3456 7890
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3" /> info@colonial.com
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1" />
                Jl. Merdeka No. 10, Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-800 pt-8">
          © {new Date().getFullYear()} Colonial Catering. All Rights
          Reserved.
        </div>
      </footer>
    </div>
  );
};

export default CateringPage;