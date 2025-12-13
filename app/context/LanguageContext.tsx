// app/context/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definisikan Tipe Data
type Language = 'en' | 'id';

// 2. Kamus Kata (Dictionary)
const translations = {
  en: {
    nav: {
      home: 'Tembi',
      house: 'House',
      foods: 'Foods',
      venue: 'Venue',
      history: 'History',
      collections: 'Collections',
      book: 'Book Now',
    },
    hero: {
      title: 'Where Culture Meets Serenity',
      subtitle: 'Experience authentic Javanese heritage in luxurious comfort',
      explore: 'Explore Our Rooms',
      gallery: 'View Gallery',
    },
    intro: {
      title: 'A Living Javanese Heritage',
      p1: 'A place that brings calm and comfort so your mind feels lighter. The sound of nature welcomes you as soon as you step in.',
      p2: 'Morning comes with a warm breakfast so the day feels kinder. Sitting on the terrace or taking a slow walk in the garden is enough to ease your heart.',
      stats: { founded: 'Founded', artifacts: 'Artifacts', house: 'House' }
    },
    accommodation: {
        label: 'Accommodation',
        title: 'Historical Home',
        desc: 'Each house is a sanctuary of cultural heritage, thoughtfully designed to immerse you in the timeless elegance of Javanese architecture.',
        btn: 'Book Now',
        rec: 'Recommendation',
        facilities: { bed: 'King Bed', view: 'Rice Field View' }
    },
    // Data Dinamis untuk Houses (Ngadirojo, dll)
    houses: [
        {
            name: 'Ngadirojo',
            desc: 'Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten. Combining Javanese architecture with natural tranquility.',
            image: '/images/rooms/ngadirojo/ngadirojo.png',
        },
        {
            name: 'Polaman',
            desc: 'Polaman House is a traditional Javanese limasan built in 1948. It combines the warmth of Javanese architecture with natural landscapes.',
            image: '/images/rooms/polaman/polaman.png',
        },
        {
            name: 'Adikarto',
            desc: 'Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960.',
            image: '/images/rooms/adikarto/adikarto.png',
        },
    ],
    common: {
        viewAll: 'View All House',
        pavilionsInclude: 'All Pavilions Include',
        pavilionsDesc: 'Experience authentic Javanese hospitality with modern comfort and cultural immersion.'
    }
  },
  id: {
    nav: {
      home: 'Tembi',
      house: 'Penginapan',
      foods: 'Kuliner',
      venue: 'Acara',
      history: 'Sejarah',
      collections: 'Koleksi',
      book: 'Pesan Sekarang',
    },
    hero: {
      title: 'Dimana Budaya Bertemu Ketenangan',
      subtitle: 'Rasakan warisan budaya Jawa otentik dalam kenyamanan mewah',
      explore: 'Lihat Kamar',
      gallery: 'Lihat Galeri',
    },
    intro: {
      title: 'Warisan Jawa yang Hidup',
      p1: 'Sebuah tempat yang menghadirkan ketenangan dan kenyamanan agar pikiran Anda terasa lebih ringan. Suara alam menyambut Anda begitu melangkah masuk.',
      p2: 'Pagi datang dengan sarapan hangat agar hari terasa lebih ramah. Duduk di teras atau berjalan perlahan di taman sudah cukup untuk menenangkan hati.',
      stats: { founded: 'Didirikan', artifacts: 'Artefak', house: 'Rumah' }
    },
    accommodation: {
        label: 'Akomodasi',
        title: 'Rumah Bersejarah',
        desc: 'Setiap rumah adalah tempat perlindungan warisan budaya, dirancang dengan cermat untuk membenamkan Anda dalam keanggunan arsitektur Jawa yang tak lekang oleh waktu.',
        btn: 'Pesan',
        rec: 'Rekomendasi',
        facilities: { bed: 'Kasur King', view: 'Pemandangan Sawah' }
    },
    houses: [
        {
            name: 'Ngadirojo',
            desc: 'Rumah Ngadirojo adalah limasan tradisional Jawa yang dibangun tahun 1946 dan dipindahkan dari Desa Bawak, Klaten. Menggabungkan arsitektur Jawa dengan ketenangan alam.',
            image: '/images/rooms/ngadirojo/ngadirojo.png',
        },
        {
            name: 'Polaman',
            desc: 'Rumah Polaman adalah limasan tradisional Jawa yang dibangun tahun 1948. Menggabungkan kehangatan arsitektur Jawa dengan pemandangan alam.',
            image: '/images/rooms/polaman/polaman.png',
        },
        {
            name: 'Adikarto',
            desc: 'Rumah Adikarto adalah rumah limasan tradisional Jawa yang membawa kesejukan dan kenyamanan dalam suasana alami. Dibangun pada tahun 1960.',
            image: '/images/rooms/adikarto/adikarto.png',
        },
    ],
    common: {
        viewAll: 'Lihat Semua Rumah',
        pavilionsInclude: 'Fasilitas Paviliun',
        pavilionsDesc: 'Rasakan keramahan Jawa yang otentik dengan kenyamanan modern dan pendalaman budaya.'
    }
  },
};

// 3. Buat Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 4. Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 5. Custom Hook untuk mempermudah penggunaan
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}