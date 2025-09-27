import { BedDouble, Users } from 'lucide-react';

// Definisikan tipe data untuk setiap kamar
export interface Room {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  features: string[];
  rating?: number;
  layoutType: 'featured' | 'standard';
}

// Data Dummy
export const roomData: Room[] = [
  {
    id: 1,
    name: "Nandini",
    description: "Experience the pinnacle of Javanese luxury in our Nandini suite, offering expansive garden views and a private terrace for ultimate relaxation.",
    imageUrl: "",
    features: ["Up to 4 guests", "Private Terrace"],
    layoutType: 'featured',
  },
  {
    id: 2,
    name: "Padmini",
    description: "A blend of classic elegance and modern comfort, the Padmini suite features handcrafted furniture and serene, personalized natural surroundings.",
    imageUrl: "",
    features: ["Up to 2 guests", "Private Garden"],
    layoutType: 'featured',
  },
  {
    id: 3,
    name: "Tandaka",
    description: "A cozy room with traditional Javanese aesthetics, perfect for solo travelers or couples seeking an intimate and authentic experience.",
    imageUrl: "",
    features: ["1 King Bed", "2 Guests"],
    rating: 4.7,
    layoutType: 'standard',
  },
  {
    id: 4,
    name: "Padapa",
    description: "Features a spacious layout and modern amenities, making it ideal for families. It offers comfort without compromising on cultural style.",
    imageUrl: "",
    features: ["2 Queen Beds", "4 Guests"],
    rating: 4.8,
    layoutType: 'standard',
  },
  {
    id: 5,
    name: "Nayanatara",
    description: "An elegant suite that boasts stunning views and refined decor. The perfect retreat for those looking for a peaceful and luxurious stay.",
    imageUrl: "",
    features: ["1 King Bed", "2 Guests"],
    rating: 4.9,
    layoutType: 'standard',
  }
];