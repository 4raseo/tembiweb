export interface Room {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription:string[];
  imageUrl: string;
  galleryImages: string[];
  price: number; 
  details: {
    bed: string;
    guests: number;
    size: string;
  };
  amenities: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string[];
  };
  houseRules: {
    smoking: boolean;
    pets: boolean;
    quietHours: string;
  };  
  rating?: number;
  layoutType: 'featured' | 'standard';
}

export const roomData: Room[] = [
  {
    id: 1,
    slug: "ngadirojo-house",
    name: "Ngadirojo House",
    tagline: "A Javanese Limasan with Pool and Rice Field Views",
    price: 845000,
    description: "Experience the pinnacle of Javanese luxury in our Nandini suite, offering expansive garden views and a private terrace.",
    longDescription:[ 
      "Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten, Central Java, to Tembi in 2007. Combining Javanese architecture with natural tranquility, it is an ideal choice for guests seeking peace and culture.",
      "With 43.2 square meters, the house includes free Wi-Fi, air conditioning, a minibar, and a private bathroom. Its highlight is the view: the front terrace overlooks a lush garden, while the back terrace opens directly to the swimming pool and expansive rice fields.",
      "The name “Ngadirojo” comes from a region in Wonogiri, Central Java, where Mr. F. W. Santopratiknya lived between 1944 and 1946. The house symbolizes the harmony of comfort, natural beauty, and family history."
    ],
    imageUrl: "/images/rooms/ngadirojo/ngadirojo1.png",
    galleryImages: [
      "/images/rooms/ngadirojo/ngadirojo2.png",
      "/images/rooms/ngadirojo/ngadirojo3.png",
      "/images/rooms/ngadirojo/ngadirojo4.png",
      "/images/rooms/ngadirojo/ngadirojo.png",
      "/images/rooms/ngadirojo/ngadirojo5.png",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "43,2 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { 
        checkIn: "03:00 PM", 
        checkOut: "12:00 PM", 
        cancellation: ["Free cancellation 48h before", "50% refund 24h before", "No refund same day"] 
    },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'featured'
  },
  {
    id: 2,
    slug: "polaman-house",
    name: "Polaman House",
    tagline: "A Spacious Javanese Limasan with Pool and Rice Field Views",
    price: 979500,
    description: "Polaman House is a traditional Javanese limasan built in 1948 and relocated from Bawak Village, Cawas, Klaten, to Tembi in 2007. It combines the warmth of Javanese architecture with natural landscapes, making it perfect for an authentic and peaceful stay.",
    longDescription:[ 
      "Polaman House is a traditional Javanese limasan built in 1948 and relocated from Bawak Village, Cawas, Klaten, to Tembi in 2007. It combines the warmth of Javanese architecture with natural landscapes, making it perfect for an authentic and peaceful stay.",
      "With 63.13 square meters, the house provides free Wi-Fi, air conditioning, a minibar, a private bathroom, and a cozy terrace. The front terrace faces a shaded garden, while the back terrace overlooks the swimming pool and rice fields, offering a calming natural retreat.",
      "The name “Polaman” comes from an area in Sedayu, Bantul, where Mr. F. W. Santopratiknya lived between 1929 and 1931. The house embodies family history, blending cultural heritage with modern comfort.",
    ],
    imageUrl: "/images/rooms/polaman/polaman1.png",
    galleryImages: [
      "/images/rooms/polaman/polaman2.png",
      "/images/rooms/polaman/polaman.png",
      "/images/rooms/polaman/polaman3.png",
      "/images/rooms/polaman/polaman4.png",
      "/images/rooms/polaman/polaman5.png",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "63,13 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'featured'
  },

  {
    id: 3,
    slug: "adikarto-house",
    name: "Adikarto House",
    tagline: "The Serenity of a Classic Javanese Limasan Home",
    price: 500000,
    description: "Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul Regency, it was relocated to Tembi in 2007 as part of cultural preservation efforts.",
    longDescription:[ 
      "Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul Regency, it was relocated to Tembi in 2007 as part of cultural preservation efforts.",
      "With 51.6 square meters of space, the house is equipped with free Wi-Fi, air conditioning, a minibar, a private bathroom, and a personal terrace facing the garden. The peaceful surroundings make it the perfect choice for guests seeking tranquility with a touch of tradition.",
      "The name “Adikarto” comes from an area in Kulon Progo Regency, better known as Wates, where Mr. F. W. Santopratiknya lived between 1931–1942 and 1949–1955. This house not only offers comfort but also preserves family history and cultural heritage.",
    ],
    imageUrl: "/images/rooms/adikarto/adikarto1.png",
    galleryImages: [
      "/images/rooms/adikarto/adikarto2.png",
      "/images/rooms/adikarto/adikarto.png",
      "/images/rooms/adikarto/adikarto3.png",
      "/images/rooms/adikarto/adikarto4.png",
      "/images/rooms/adikarto/adikarto5.png",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "51,6 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'featured'
  },
 {
    id: 4,
    slug: "ganjuran-house",
    name: "Ganjuran House",
    tagline: "Harmony of Javanese Tradition and Nature",
    price: 889500,
    description: "Ganjuran House is a traditional limasan built in 1939 and relocated from Jepitu Hamlet, Tepus, Gunung Kidul, to Tembi in 2007. With its authentic Javanese architecture, it offers a serene stay deeply connected to cultural heritage.",
    longDescription:[ 
      "Ganjuran House is a traditional limasan built in 1939 and relocated from Jepitu Hamlet, Tepus, Gunung Kidul, to Tembi in 2007. With its authentic Javanese architecture, it offers a serene stay deeply connected to cultural heritage.",
      "Spanning 68.15 square meters, the house is equipped with free Wi-Fi, air conditioning, a minibar, a private bathroom, and a personal terrace overlooking the garden. The balance of modern comfort and natural atmosphere makes it ideal for relaxation or spending quality time with loved ones.",
      "The name “Ganjuran” is taken from an area in Bantul Regency, where Mr. F. W. Santopratiknya lived around 1929. Beyond comfort, the house carries historical and emotional connections to family heritage.",
    ],
    imageUrl: "/images/rooms/ganjuran/ganjuran1.png",
    galleryImages: [
      "/images/rooms/ganjuran/ganjuran2.png",
      "/images/rooms/ganjuran/ganjuran3.png",
      "/images/rooms/ganjuran/ganjuran4.png",
      "/images/rooms/ganjuran/ganjuran5.png",
      "/images/rooms/ganjuran/ganjuran6.png",
    ],
    details: { bed: "King Size Bed", guests: 3, size: "68,15 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 5,
    slug: "badegan-house",
    name: "Badegan House",
    tagline: "A Touch of Sundanese Tradition in Yogyakarta’s Nature",
    price: 450000,
    description: "Staying at Badegan House is more than just resting—it is about experiencing the warmth of a traditional Sundanese wooden house rich in meaning. Built in 1954 in Sumedang, West Java, this stilt house was relocated to Tembi in 2006.",
    longDescription:[ 
      "Staying at Badegan House is more than just resting—it is about experiencing the warmth of a traditional Sundanese wooden house rich in meaning. Built in 1954 in Sumedang, West Java, this stilt house was relocated to Tembi in 2006.",
      "Covering 46 square meters, Badegan House offers modern comforts such as free Wi-Fi, air conditioning, a minibar, and a private bathroom. Guests can also enjoy relaxing moments on the terrace overlooking a lush garden, a tranquil setting perfect for unwinding in harmony with nature.",
      "The name “Badegan” comes from a village in Bantul Regency, where Mr. F. W. Santopratiknya—the father of Mr. P. Swantoro—resided from 1958. Every corner of this house carries stories and cultural values, making it more than just a place to stay.",
    ],
    imageUrl: "/images/rooms/badegan/badegan1.png",
    galleryImages: [
      "/images/rooms/badegan/badegan2.png",
      "/images/rooms/badegan/badegan3.png",
      "/images/rooms/badegan/badegan4.png",
      "/images/rooms/badegan/badegan5.png",
      "/images/rooms/badegan/badegan6.png",
    ],
    details: { bed: "King Size Bed", guests: 4, size: "46 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 6,
    slug: "wuryantoro-house",
    name: "Wuryantoro House",
    tagline: "A Javanese Limasan Home Amidst Nature’s Calm",
    price: 650000,
    description: "Wuryantoro House is a traditional Javanese limasan home that blends heritage with modern comfort. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul, it was relocated to Tembi in 2007.",
    longDescription:[ 
      "Wuryantoro House is a traditional Javanese limasan home that blends heritage with modern comfort. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul, it was relocated to Tembi in 2007.",
      "With 40.5 square meters, the house features free Wi-Fi, air conditioning, a minibar, a private bathroom, and a terrace facing the garden. Its peaceful surroundings and greenery create the perfect setting for relaxation while embracing local culture.",
      "The name “Wuryantoro” comes from a region in Wonogiri, Central Java, where Mr. F. W. Santopratiknya lived between 1946 and 1948. Every element of this house reflects history and cultural roots, making it more than just accommodation.",
    ],
    imageUrl: "/images/rooms/wuryantoro/wuryantoro1.png",
    galleryImages: [
      "/images/rooms/wuryantoro/wuryantoro2.png",
      "/images/rooms/wuryantoro/wuryantoro3.png",
      "/images/rooms/wuryantoro/wuryantoro4.png",
      "/images/rooms/wuryantoro/wuryantoro5.png",
      "/images/rooms/wuryantoro/wuryantoro6.png",
    ],
    details: { bed: "King Size Bed", guests: 3, size: "40,5 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 7,
    slug: "morangan-house",
    name: "Morangan House",
    tagline: "Three Levels of Comfort in Traditional Architecture",
    price: 1330000,
    description: "Morangan House is a unique three-story accommodation created from three traditional Javanese houses originating from Tambak, Klaten (1936), Jepitu, Gunung Kidul (1939), and Majasto, Sukoharjo (1952). They were relocated and unified in Tembi in 2007, combining heritage with modern living.",
    longDescription:[ 
      "Morangan House is a unique three-story accommodation created from three traditional Javanese houses originating from Tambak, Klaten (1936), Jepitu, Gunung Kidul (1939), and Majasto, Sukoharjo (1952). They were relocated and unified in Tembi in 2007, combining heritage with modern living.",
      "With 70.7 square meters, Morangan House has two bedrooms, each with a private bathroom. The first floor includes a spacious living area and a bathtub for relaxation, while the rooftop offers open-air views. The house faces a garden at the front, rice fields at the back, and a swimming pool on the side—providing a refreshing atmosphere from every angle. Both front and back terraces enhance the experience of connecting with nature.",
      "The name “Morangan” comes from a village in Sleman, Yogyakarta, where Mr. F. W. Santopratiknya lived between 1942 and 1944. This house symbolizes family heritage brought to life in a modern stay with traditional soul.",
    ],
    imageUrl: "/images/rooms/morangan/morangan1.png",
    galleryImages: [
      "/images/rooms/morangan/morangan2.png",
      "/images/rooms/morangan/morangan3.png",
      "/images/rooms/morangan/morangan4.png",
      "/images/rooms/morangan/morangan5.png",
      "/images/rooms/morangan/morangan6.png",
    ],
    details: { bed: "King Size Bed", guests: 4, size: "70,7 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
];
