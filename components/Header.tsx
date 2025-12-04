// app/Header.tsx
'use client';

import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext'; // Import hook

export default function Header() { 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Ambil state bahasa dan fungsi translate dari Context
  const { language, setLanguage, t } = useLanguage();

  // Gunakan data dari dictionary (t.nav)
  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.house, href: '/rooms' },
    { name: t.nav.foods, href: '/catering' },
    { name: t.nav.venue, href: '/venue' },
    { name: t.nav.history, href: '/sejarah' },
    { name: t.nav.collections, href: '/collections' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white text-black shadow-sm">
        <div className="container mx-auto px-6 py-4 grid grid-cols-3 items-center">
          
          {/* Kiri: Hamburger Menu */}
          <div className="justify-self-start flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2">
              <Menu size={24} />
            </button>
          </div>

          {/* Tengah: Logo */}
          <div className="text-center bg-[url(/images/logotembi.png)] bg-contain bg-center bg-no-repeat h-10 w-32 mx-auto">
            <h1 className="text-xl font-bold font-serif opacity-0">Tembi</h1>
          </div>

          {/* Kanan: Language Switcher & Button */}
          <div className="justify-self-end flex items-center gap-4">
            {/* Language Toggle Button */}
            <button 
                onClick={toggleLanguage} 
                className="flex items-center gap-2 text-sm font-medium hover:text-tembi transition-colors"
            >
                <Globe size={18} />
                <span className={language === 'en' ? 'font-bold' : 'font-normal'}>EN</span>
                <span className="text-gray-300">|</span>
                <span className={language === 'id' ? 'font-bold' : 'font-normal'}>ID</span>
            </button>

            <a href="" className="hidden md:inline-block bg-tembi hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-md transition-colors">
              {t.nav.book}
            </a>
          </div>
        </div>
      </header>
      
      {/* Sidebar logic sama seperti sebelumnya, tapi gunakan navLinks yang sudah diterjemahkan */}
      <div onClick={() => setSidebarOpen(false)} className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white text-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-2"><X size={24} /></button>
        </div>
        <nav className="p-6">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href} className="text-lg text-slate-800 hover:text-tembi transition-colors">{link.name}</a></li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};