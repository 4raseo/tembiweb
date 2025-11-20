'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  // Data Social Media
  const socialMedia = [
    { name: "Facebook", icon: "/images/icons/facebook.png", link: "#" },
    { name: "Instagram", icon: "/images/icons/instagram.png", link: "#" },
    { name: "Twitter", icon: "/images/icons/twitter.png", link: "#" },
    { name: "YouTube", icon: "/images/icons/youtube.png", link: "#" },
  ];

  return (
    <footer className="bg-[#0F1623] text-gray-300 pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Social */}
        <div>
          <h4 className="text-xl font-serif font-bold text-tembi mb-6">
            Tembi Historical Home
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-8">
            A sanctuary where Javanese heritage meets luxury hospitality, 
            creating unforgettable cultural experiences.
          </p>
          {/* Social Icons (LOCAL IMAGES) */}
          <div className="flex space-x-5">
            {socialMedia.map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                className="opacity-100 hover:opacity-70 transition-opacity duration-300"
              >
                <div className="relative w-5 h-5">
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    fill 
                    className="object-contain invert" 
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-tembi transition-colors">Accommodation</a></li>
            <li><a href="#" className="hover:text-tembi transition-colors">Restaurant</a></li>
            <li><a href="#" className="hover:text-tembi transition-colors">Events</a></li>
            <li><a href="#" className="hover:text-tembi transition-colors">Collection</a></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-tembi transition-colors">Wedding Planning</a></li>
            <li><a href="#" className="hover:text-tembi transition-colors">Cultural Tours</a></li>
            <li><a href="#" className="hover:text-tembi transition-colors">Spa Services</a></li>
            <li><a href="#" className="hover:text-tembi transition-colors">Airport Transfer</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start">
              <MapPin size={18} className="mr-3 mt-0.5 flex-shrink-0 text-white" />
              <span className="leading-relaxed">Jl. Parangtritis KM 8.5<br/>Yogyakarta 55188, Indonesia</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-3 text-white" />
              <span>+62 274 367 475</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-3 text-white" />
              <span>info@tembirumahbudaya.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500">
        <p>
          &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Tembi Rumah Budaya. All rights reserved.
          <span className="mx-2">|</span> 
          <a href="#" className="hover:text-gray-300">Privacy Policy</a> 
          <span className="mx-2">|</span> 
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}