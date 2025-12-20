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
    homepage:
    {
      hero: {
        title: 
        [
          'Where Historical',
          'Culture Is Divine'
        ],
        explore: 'Explore Our House',
        gallery: 'View Gallery',
      },
      intro: {
        title: 'Experience Javanese Historical Culture',
        p1: 'A place that brings calm and comfort so your mind feels lighter. The sound of nature welcomes you as soon as you step in. Fresh air helps your body relax. A well arranged space protects your rest so nothing interrupts your peace.',
        p2: 'Morning comes with a warm breakfast so the day feels kinder. Sitting on the terrace or taking a slow walk in the garden is enough to ease your heart. Energy returns slowly. A quiet peace appears on its own. Rest here is more than sleep, You have space to recover.',
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
      pavillion: {
          title: ['All Pavilions', 'Include'],
          icon: ["/images/icons/wifi-green.svg", "/images/icons/cup-green.svg", "/images/icons/music-green.svg"],
          desc: ['Wi-Fi', 'Special Welcome Drink', 'Traditional Course' ],
          button: 'View All House'
      },
      living:{
        head: ['Living', 'Experience'],
        title: {item1: 'Historical Culture', item2: 'Natural Harmony', item3: 'Meaningful Moments'},
        desc: {item1: 'Authentic Javanese architecture and traditions', item2: 'Surrounded by lush tropical gardens and rice fields', item3: 'Rest that feels valuable and memorable'},
      },
      food:{
        head: ['Food &', 'Drink'],
        desc: "Enjoy a culinary experience that highlights the richness of Indonesian flavors. Traditional recipes are preserved and refined with modern techniques so each dish feels familiar yet exciting. The calm atmosphere adds comfort to every meal. Culture becomes part of the dining moment through flavors that feel warm and full of character.",
        item: {item1: 'Fresh ingredients from local organic farms', item2: 'Traditional recipes with modern presentation', item3: 'Friendly service that makes you feel at home'},
        button: 'View Packages'
      },
      venue:{
        head: 'EVENT & CELEBRATION',
        title: 'Sacred Spaces for Special Moments',
        desc: 'Create unforgettable memories in our culturally rich venues, where traditional Javanese architecture provides the perfect backdrop for weddings, corporate retreats, and cultural celebrations.',
        firstCard: 
        {
          title: 'Wedding Ceremony',
          desc: 'Celebrate your special moment in our quiet pendopo, surrounded by fresh greenery and a peaceful atmosphere. Our team will help take care of the details so your ceremony feels personal and meaningful.',
          item1: 'Capacity: Up to 150 guests',
          item2: 'Garden ceremony options',
          item3: 'Traditional gamelan accompaniment',
          button: 'Plan Your Wedding'
        },
        secondCard:
        {
          title: 'Corporate Retreat',
          desc: 'Spark new ideas and strengthen teamwork in a calm and inspiring setting.Our meeting spaces combine traditional charm with modern facilities, creating a comfortable place for focused work and meaningful collaboration.',
          item1: 'Multiple room configurations',
          item2: 'High-speed internet & AV equipment',
          item3: 'Traditional refreshment service',
          button: 'Book Corporate Event'
        },
      },
      collection:{
        title: 'Historical Collection',
        desc: 'Discover our carefully curated collection of Javanese cultural artifacts that tell the story of Indonesias rich heritage and artistic traditions',
        cardTitle: {item1: 'Cundrik Collection', item2: 'Cundrik Collection', item3: 'Keris Collection', item4: 'Keris Collection'},
        cardDesc: 
        {
          item1: 'A small cundrik once carried as a personal weapon.', 
          item2: 'A longer cundrik forged with sanak patterns. ', 
          item3: 'A keris from the Surakarta tradition with a straight blade.', 
          item4: 'A keris with five curves and a strong pamor pattern along the blade. '
        },
        button: 'Explore Full Collection'
      },
      location:{
        title: 'Location & Access',
        subtitle: 'Easy to reach from Yogyakarta city center and airport',
        cardTitle: {item1: 'Address', item2: 'From Airport', item3: 'From City Center'},
        cardDesc:{
          item1: 'Jl. Parangtritis KM 8.4, Timbulharjo, Sewon, Bantul, Yogyakarta 55186, Indonesia',
          item2: '25 minutes drive from Yogyakarta International Airport',
          item3: '15 minutes drive from Malioboro Street and city center'
        },
        transport: 
        {
          title: "Transportation Options",
          item1: "Taxi and ride-sharing services available",
          item2: "Public bus route 1A stops nearby",
          item3: "Free on-site parking for 50+ vehicles"
        }
      }
    } 
  },
  id: {
    nav: {
      home: 'Tembi',
      house: 'Rumah',
      foods: 'Makanan',
      venue: 'Venue',
      history: 'Sejarah',
      collections: 'Koleksi',
      book: 'Pesan Sekarang',
    },
    homepage:{
      hero: {
        title:
        [
          'Tempat Budaya Sejarah',
          'Menjadi Sakral'
        ],
        subtitle: 'Warisan budaya yang hadir dengan kenyamanan modern',
        explore: 'Lihat Pilihan Kamar',
        gallery: 'Lihat Galeri',
      },
      intro: {
        title: 'Rasakan budaya sejarah Jawa',
        p1: 'Sebuah tempat yang memberikan ketenangan dan kenyamanan sehingga dapat membuat pikiran menjadi lebih ringan. Suara alam menenangkan sejak melangkah masuk lalu udara segar ikut membantu tubuh lebih rileks. Ruang yang tertata rapi membuat waktu istirahat terasa utuh karena tidak ada yang mengganggu.',
        p2: 'Pagi datang dengan sarapan hangat sehingga hari terasa lebih bersahabat. Setelah itu duduk sebentar di teras atau berjalan pelan di taman sudah cukup untuk membuat hati lebih tenang. Perlahan energi kembali dan rasa damai muncul tanpa perlu dicari. Di sini istirahat bukan hanya tidur. Ada ruang untuk merasa pulih.',
        stats: { founded: 'Didirikan', artifacts: 'Artefak', house: 'Rumah' }
      },
      accommodation: {
        label: 'Akomodasi',
        title: 'Rumah Yang Menyimpan Sejarah',
        desc: 'Setiap rumah menjadi tempat nyaman yang menjaga cerita budaya tetap terasa. Desainnya mengalir natural sehingga keanggunan masa lalu dan kenyamanan hari ini saling melengkapi. Ruang hangat dan detail terjaga membuat waktu menginap terasa tenang dan berarti.',
        btn: 'Pesan',
        rec: 'Rekomendasi',
        facilities: { bed: 'King Bed', view: 'Pemandangan Sawah' }
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
      pavillion: {
        title: ['Fasilitas Di Setiap', 'Rumah'],
        icon: ["/images/icons/wifi-green.svg", "/images/icons/cup-green.svg", "/images/icons/music-green.svg"],
        desc: ['Wi-Fi', 'Minuman Sambutan Khusus', 'Hidangan Tradisional'],
        button: 'Lihat Semua Rumah'
      },
      living:{
        head: ['Pengalaman Tinggal', 'Bernuansa Budaya'],
        title: {item1: 'Warisan Budaya', item2: 'Harmoni Alam', item3: 'Momen Bermakna'},
        desc: {item1: 'Arsitektur dan tradisi yang tetap hidup', item2: 'Dikelilingi taman tropis dan hamparan sawah', item3: 'Waktu beristirahat yang terasa lebih berharga'},
      },
      food:{
        head: ['Makanan &', 'Minuman'],
        desc: "Nikmati perjalanan rasa yang menonjolkan kekayaan masakan Indonesia. Resep turun temurun tetap dipertahankan lalu diolah dengan cara yang lebih segar sehingga hidangan terasa akrab dan tetap menarik. Suasana yang tenang membuat waktu makan terasa nyaman. Setiap sajian memberi kesempatan untuk merasakan budaya dari cita rasa yang hangat dan penuh karakter.",
        item: {item1: 'Bahan segar dari pertanian organik lokal', item2: 'Resep tradisional dengan tampilan modern', item3: 'Pelayanan ramah yang terasa seperti di rumah'},
        button: 'Lihat Paket'
      },
      venue:{
        head: 'ACARA & PERAYAAN',
        title: 'Tempat Sakral Untuk Momen Spesial',
        desc: 'Buat kenangan berharga di ruang penuh budaya. Arsitektur Jawa yang khas memberi latar sempurna untuk pernikahan, acara perusahaan, dan perayaan budaya.',
        firstCard: 
        {
          title: 'Upacara Pernikahan',
          desc: 'Rayakan momen spesial Anda di pendopo yang tenang, dikelilingi taman yang hijau dan suasana yang damai. Tim kami akan membantu mengatur setiap detail agar acara terasa pribadi dan penuh makna.',
          item1: 'Kapasitas hingga 150 tamu',
          item2: 'Pilihan upacara di taman',
          item3: 'Pilihan iringan gamelan',
          button: 'Rencanakan Pernikahan Anda'
        },
        secondCard:
        {
          title: 'Acara Perusahaan',
          desc: 'Tingkatkan kreativitas dan kebersamaan tim di lingkungan yang tenang dan menyegarkan.Ruang pertemuan kami memadukan desain tradisional dan fasilitas modern, menjadi tempat yang nyaman untuk sesi yang produktif dan hubungan yang lebih solid.',
          item1: 'Beragam pilihan tata ruang',
          item2: 'Internet cepat dan peralatan presentasi',
          item3: 'Pilihan hidangan tradisional',
          button: 'Pesan Acara Perusahaan'
        },
      },
      collection:{
        title: 'Koleksi Bersejarah',
        desc: 'Jelajahi koleksi artefak budaya yang dipilih dengan hati-hati, menampilkan kisah, karya, dan warisan seni dari masa ke masa. Setiap benda mengajak Anda untuk berhenti sejenak, melihat lebih dekat, dan merasakan hubungan dengan sejarah.',
        cardTitle: {item1: 'Koleksi Cundrik', item2: 'Koleksi Cundrik', item3: 'Koleksi Keris', item4: 'Koleksi Keris'},
        cardDesc: 
        {
          item1: 'Sebuah cundrik kecil yang dahulu dibawa sebagai Senjata pribadi.', 
          item2: 'Cundrik berukuran panjang dengan pola sanak.', 
          item3: 'Keris tradisi Surakarta dengan bilah lurus', 
          item4: 'Keris berluk lima dengan pola pamor tegas di sepanjang bilah'
        },
        button: 'Lihat Koleksi Lengkap'
      },
      location:{
        title: 'Akses & Lokasi',
        subtitle: 'Dekat dari pusat Kota Yogyakarta dan bandara',
        cardTitle: {item1: 'Alamat', item2: 'Jarak Dari Bandara', item3: 'Dekat Dari Pusat Kota'},
        cardDesc:{
          item1: 'Jl. Parangtritis No.Km 8.4, Tembi, Timbulharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55186',
          item2: '25 menit dari Bandara Internasional Yogyakarta.',
          item3: '15 menit dari Malioboro dan pusat kota.'
        },
        transport: 
        {
          title: "Pilihan Transportasi",
          item1: "Layanan taksi dan berbagi tumpangan tersedia.",
          item2: "Bus umum jalur 1A berhenti di dekat sini.",
          item3: "Parkir gratis di lokasi untuk 50+ kendaraan."
        }
      }
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