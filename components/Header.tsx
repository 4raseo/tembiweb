'use client'; // 'use client' HARUS dipindahkan ke sini

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Pastikan Anda mengekspor komponennya
export default function Header() { 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navLinks = [
    { name: 'Tembi Resort', href: '/' },
    { name: 'House', href: '/rooms' },
    { name: 'Foods', href: '/catering' },
    { name: 'Venue', href: '/venue' },
    { name: 'Sejarah Tembi', href: '#' },
    { name: 'Collections', href: '#' },
  ];

  return (
    <>
      {/* Navbar Utama */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white text-black">
        <div className="container mx-auto px-6 py-4 grid grid-cols-3 items-center">
          <div className="justify-self-start">
            <button onClick={() => setSidebarOpen(true)} className="p-2"><Menu size={24} /></button>
          </div>
          <div className="text-center bg-[url(/images/logotembi.png)] bg-contain bg-center bg-no-repeat h-10 w-32 mx-auto">
            <h1 className="text-xl font-bold font-serif opacity-0">Tembi</h1>
          </div>
          <div className="justify-self-end">
            <a href="" className="bg-tembi hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-md transition-colors">Book Now</a>
          </div>
        </div>
      </header>
      
      {/* Overlay & Sidebar */}
      <div onClick={() => setSidebarOpen(false)} className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white text-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-2"><X size={24} /></button>
        </div>
        <nav className="p-6">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}><a href={link.href} className="text-lg text-slate-800 hover:text-tembi transition-colors">{link.name}</a></li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};