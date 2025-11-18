// app/page.tsx
'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react'; // Anda perlu install: npm i lucide-react
import Link from 'next/link';

// Data dummy
const accommodations = [
  {
    name: 'Javanese Villa',
    description: '1 bedroom villa with pool',
    image: '/placeholder-600x400.svg',
  },
  {
    name: 'Gladak House',
    description: '1 bedroom gladak with garden',
    image: '/placeholder-600x400.svg',
  },
  {
    name: 'Heritage Villa',
    description: '2 bedroom villa with pool',
    image: '/placeholder-600x400.svg',
  },
  {
    name: 'Limasan Resort',
    description: '1 bedroom resort with pool',
    image: '/placeholder-600x400.svg',
  },
  {
    name: 'Royal Suite',
    description: '1 bedroom suite with balcony',
    image: '/placeholder-600x400.svg',
  },
  {
    name: 'Prambanan Hideaway',
    description: 'Exclusive hideaway near temple',
    image: '/placeholder-600x400.svg',
  },
];

// const historicalCollections = [
//   { name: 'Gamelan', image: '/placeholder-400x400.svg' },
//   { name: 'Batik Tulis', image: '/placeholder-400x400.svg' },
//   { name: 'Keris Pusaka', image: '/placeholder-400x400.svg' },
//   { name: 'Wayang Kulit', image: '/placeholder-400x400.svg' },
//   { name: 'Topeng Panji', image: '/placeholder-400x400.svg' },
//   { name: 'Gerabah Kasongan', image: '/placeholder-400x400.svg' },
//   { name: 'Relief Kuno', image: '/placeholder-400x400.svg' },
//   { name: 'Arca Perunggu', image: '/placeholder-400x400.svg' },
// ];

const heroImages = [
  '/images/cover1.png', // Gambar pertama
  '/images/cover2.png', // Ganti dengan path gambar kedua Anda
  '/images/cover3.png', // Ganti dengan path gambar ketiga Anda
  // Tambahkan lebih banyak gambar jika diinginkan
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Ganti gambar setiap 5 detik
    return () => clearInterval(interval); // Cleanup interval saat komponen di-unmount
  }, []);
  return (
    <div className="bg-white text-gray-800">
      <main>
        {/* Cover Section */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex
                    ? 'opacity-100 translate-x-0'
                    : index < currentImageIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <Image
                  src={image}
                  alt="Beautiful resort view"
                  layout="fill"
                  objectFit="cover"
                  className="z-0"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
              Where Culture <br /> Meets Serenity
            </h2>
            <p className="text-xl md:text-xl max-w-2xl mb-8 font-light tracking-wide">
              Experience authentic Javanese heritage in luxurious comfort
            </p>
            <div className="flex space-x-4">
              <Link
                href="/rooms"
                className="bg-tembi hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg"
              >
                Explore Our Rooms
              </Link>
              <Link
                href="/rooms"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300 shadow-lg"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-stone-50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-serif font-bold mb-4">A Living Museum of Javanese Culture</h3>
              <p className="text-gray-600 mb-6">
                Tembi Rumah Budaya stands as a testament to Indonesias rich cultural tapestry, where traditional Javanese architecture harmoniously blends with contemporary luxury.
              </p>
              <p className="text-gray-600 mb-6">
                Nestled amidst lush tropical gardens, our cultural resort offers an immersive journey through time, celebrating the artistry, spirituality, and wisdom of ancient Java.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Type:</strong> Heritage Resort</p>
                <p><strong>Location:</strong> Yogyakarta, Indonesia</p>
                <p><strong>Architect:</strong> Anies Walsh</p>
                <p><strong>Year:</strong> 1996</p>
              </div>
            </div>
            <div>
              <Image
                src="/images/homepage/content1.png"
                alt="Living museum architecture"
                width={600}
                height={450}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-serif font-bold mb-2">Elegant Accommodations</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Indulge in our beautifully appointed rooms, suites, and villas, each offering a unique blend of traditional Javanese elegance and modern comfort.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {accommodations.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden group">
                  <div className="overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-left">
                    <h4 className="text-xl font-bold font-serif mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <a href="#" className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-md transition-colors text-sm">
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Sanctuary Section */}
        <section className="py-20 bg-stone-50">
            <div className="container mx-auto px-6 text-center max-w-4xl">
                <h3 className="text-4xl font-serif font-bold mb-4">A Sanctuary of Heritage</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    This resort is a true sanctuary of heritage, offering a serene escape that is deeply rooted in Javanese traditions. We invite you to experience a peaceful retreat while absorbing the beauty of our cultural expressions and historical artifacts.
                </p>
                <div className="flex justify-center space-x-8 text-primary font-semibold mb-8">
                    <span>Art & Culture</span>
                    <span>Wellness</span>
                    <span>Local Experience</span>
                </div>
                <a href="#" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-md transition-colors">
                  Learn More
                </a>
            </div>
        </section>

        {/* Restaurant Section*/}
        
        
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1*/}
            <div>
                <h4 className="text-lg font-semibold text-white mb-4">Tembok Resort</h4>
                <p className="text-sm text-gray-400">Where culture meets serenity. A living museum of Javanese heritage.</p>
            </div>
            
            {/* Column 2*/}
            <div>
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Home</a></li>
                    <li><a href="#" className="hover:text-white">Accommodations</a></li>
                    <li><a href="#" className="hover:text-white">Facilities</a></li>
                    <li><a href="#" className="hover:text-white">Gallery</a></li>
                </ul>
            </div>

            {/* Column 3*/}
            <div>
                <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                        <MapPin size={16} className="mr-3 mt-1 flex-shrink-0" />
                        <span>Jl. Warisan Budaya No. 123, Yogyakarta, Indonesia</span>
                    </li>
                    <li className="flex items-center">
                        <Mail size={16} className="mr-3" />
                        <span>info@tembiresort.com</span>
                    </li>
                    <li className="flex items-center">
                        <Phone size={16} className="mr-3" />
                        <span>+62 123 4567 890</span>
                    </li>
                </ul>
            </div>

            {/* Column 4: Social Media */}
             <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                    {/* Social Icons would go here */}
                    <a href="#" className="hover:text-white">FB</a>
                    <a href="#" className="hover:text-white">IG</a>
                    <a href="#" className="hover:text-white">TW</a>
                </div>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tembok Resort. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}