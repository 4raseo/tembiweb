import { notFound } from 'next/navigation';
import { roomData } from '@/data/roomData';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BedDouble, Users, Square, Wifi, Wind, Bath, Tv, Star,
  Clock, Calendar, CheckCircle, XCircle, Ban, Dog, PartyPopper 
} from 'lucide-react';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default async function RoomDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> // params sekarang Promise
}) {
  const { slug } = await params; // await params dulu
  const room = roomData.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  
  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
        ))}
      </div>
    );
  };

  return (
    <main className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={room.imageUrl} alt={room.name} layout="fill" objectFit="cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8">
          <div className="container mx-auto px-4">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-md max-w-max mb-2">
                <div className="flex items-center">
                    <RatingStars rating={room.rating || 0} />
                    <span className="text-sm font-semibold text-gray-800 ml-2">Excellent ({room.rating}/5)</span>
                </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white shadow-text">{room.name}</h1>
            <p className="text-lg text-white/95 shadow-text mt-1">{room.tagline}</p>
          </div>
        </div>
      </div>

      {/* Konten*/}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8">

          {/* Detail & Deskripsi Ruangan */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{room.name}</h2>
                <div className="flex items-center space-x-4 text-gray-600 mt-2">
                  <span className="flex items-center"><BedDouble className="w-5 h-5 mr-2 text-green-700"/>{room.details.bed}</span>
                  <span className="flex items-center"><Users className="w-5 h-5 mr-2 text-green-700"/>{room.details.guests} Guests</span>
                  <span className="flex items-center"><Square className="w-5 h-5 mr-2 text-green-700"/>{room.details.size}</span>
                </div>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0">
                <p className="text-2xl font-bold text-green-800">{formatCurrency(room.price)}</p>
                <p className="text-gray-500">per night</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{room.longDescription}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cultural Amenities & Facilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
              {room.amenities.map(amenity => (
                <span key={amenity} className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-green-600"/>{amenity}</span>
              ))}
            </div>
          </div>
          
          {/* Room Gallery */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Room Gallery</h3>
                <Link href="#" className="text-sm font-semibold text-green-800 hover:underline">View All Photos</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {room.galleryImages.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
                        <Image src={img} alt={`${room.name} gallery image ${index+1}`} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" />
                    </div>
                ))}
            </div>
          </div>
          {/* Policies & Information */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Room Policies & Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Check-in & Check-out */}
              <div>
                <h4 className="font-semibold mb-2">Check-in & Check-out</h4>
                <p className="flex items-center text-gray-600 mb-1"><Clock className="w-4 h-4 mr-2"/>Check-in: {room.policies.checkIn}</p>
                <p className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2"/>Check-out: {room.policies.checkOut}</p>
                <p className="flex items-center text-gray-600 mt-1"><CheckCircle className="w-4 h-4 mr-2 text-green-600"/>Valid ID required</p>
              </div>
              {/* Cancellation Policy */}
              <div>
                <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                {room.policies.cancellation.map((policy, index) => (
                      <p key={index} className="flex items-start text-gray-600 mb-1"><CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 flex-shrink-0"/>{policy}</p>
                ))}
              </div>
              {/* House Rules */}
              <div>
                <h4 className="font-semibold mb-2">House Rules</h4>
                <div className="flex flex-col gap-1 text-gray-600">
                    <span className="flex items-center"><Ban className="w-4 h-4 mr-2 text-red-600"/>No Smoking</span>
                    <span className="flex items-center"><Ban className="w-4 h-4 mr-2 text-red-600"/>Pets not allowed</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2"/>Quiet hours 10 PM</span>
                </div>
              </div>
            </div>
          </div>

            {/* Booking */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                      <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="text-right">
                        <p className="text-xl font-bold text-green-800">{formatCurrency(room.price)}</p>
                        <p className="text-gray-500 text-sm">per night</p>
                    </div>
                    <Link 
                        href='/booking'
                        className="w-full md:w-auto bg-green-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-900 transition-colors text-center"
                    >
                        Booking Now
                    </Link>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}
