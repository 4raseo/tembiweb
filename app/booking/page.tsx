// app/booking/page.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { roomData } from '@/data/roomData';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { Calendar, User, Users, Bed, Check, Home } from 'lucide-react';
import Link from 'next/link';

// Fungsi untuk format mata uang Rupiah
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Komponen Stepper/Progress Bar
const BookingStepper = () => (
  <div className="flex items-center justify-center w-full max-w-2xl mx-auto my-8">
    <div className="flex items-center text-green-700">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-700 text-white font-bold">1</div>
      <span className="ml-2 font-semibold">Booking Details</span>
    </div>
    <div className="flex-auto border-t-2 border-gray-300 mx-4"></div>
    <div className="flex items-center text-gray-500">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 font-bold">2</div>
      <span className="ml-2">Payment</span>
    </div>
    <div className="flex-auto border-t-2 border-gray-300 mx-4"></div>
    <div className="flex items-center text-gray-500">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 font-bold">3</div>
      <span className="ml-2">Confirmation</span>
    </div>
  </div>
);

export default function BookingPage() {
  const searchParams = useSearchParams();
  const initialRoomSlug = searchParams.get('room');

  const STATIC_CHECK_IN = '2025-11-20';
  const STATIC_CHECK_OUT = '2025-11-22';
  const STATIC_ADULTS = 2;
  const STATIC_CHILDREN = 1;
  const STATIC_ROOM_ID = 1;

  // State management
  const [checkIn, setCheckIn] = useState(STATIC_CHECK_IN);
  const [checkOut, setCheckOut] = useState(STATIC_CHECK_OUT);
  const [adults, setAdults] = useState(STATIC_ADULTS);
  const [children, setChildren] = useState(STATIC_CHILDREN);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(STATIC_ROOM_ID);

  // Set kamar awal jika datang dari halaman detail
  useEffect(() => {
    if (initialRoomSlug) {
      const initialRoom = roomData.find(r => r.slug === initialRoomSlug);
      if (initialRoom) {
        setSelectedRoomId(initialRoom.id);
      }
    }
  }, [initialRoomSlug]);

  // Kalkulasi data turunan
  const selectedRoom = useMemo(() => roomData.find(room => room.id === selectedRoomId), [selectedRoomId]);

  const numberOfNights = useMemo(() => {
    if (checkIn && checkOut) {
      const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
      return nights > 0 ? nights : 0;
    }
    return 0;
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    if (selectedRoom && numberOfNights > 0) {
      return selectedRoom.price * numberOfNights;
    }
    return 0;
  }, [selectedRoom, numberOfNights]);

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('')" }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold">Book Your Stay at Tembi Cultural House</h1>
          <p className="mt-2 max-w-2xl">Experience authentic Indonesian culture in comfort and tradition. Immerse yourself in Javanese heritage while enjoying modern amenities.</p>
        </div>
      </div>

      <BookingStepper />

      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Reserve Your Cultural Experience</h2>
          <p className="mt-2 text-gray-600">Choose from our authentic Javanese accommodations, each designed to immerse you in Indonesian heritage.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Booking */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md">
                  {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md">
                  {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Children</option>)}
                </select>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-4 mt-8">Choose Your Cultural Room</h4>
            <div className="space-y-4">
              {roomData.map((room) => (
                <div key={room.id} onClick={() => setSelectedRoomId(room.id)}
                  className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedRoomId === room.id ? 'border-green-700 bg-green-50 shadow-sm' : 'border-gray-300'}`}>
                  <div>
                    <h5 className="font-bold">{room.name}</h5>
                    <p className="text-sm text-gray-600">{room.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-800">{formatCurrency(room.price)}</p>
                    <p className="text-sm text-gray-500">/night</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ringkasan */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3 flex items-center gap-2"><Home size={20}/> Room Preview</h3>
              {!selectedRoom ? (
                <div className="text-center py-10 text-gray-500">
                  <p>Select a room type to see preview.</p>
                </div>
              ) : (
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{selectedRoom.name}</h4>
                  {/* <Image src={selectedRoom.imageUrl} alt={selectedRoom.name} width={400} height={250} className="rounded-md object-cover my-4" /> */}
                  <h5 className="font-semibold mt-6 mb-2">Booking Summary</h5>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between"><span className="font-medium">Check-in:</span><span>{checkIn ? checkIn : 'Not selected'}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Check-out:</span><span>{checkOut ? checkOut : 'Not selected'}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Guests:</span><span>{adults} Adults, {children} Children</span></div>
                    <div className="flex justify-between"><span className="font-medium">Nights:</span><span>{numberOfNights}</span></div>
                  </div>
                  <div className="border-t my-4"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              )}
              <Link
                href={{
                  pathname: '/payment',
                  query: {
                  room: selectedRoom?.slug,
                  checkIn: checkIn,
                  checkOut: checkOut,
                  adults: adults,
                  children: children,
                      total: totalPrice
                },
              }}

              className={`block w-full text-center bg-green-800 text-white font-bold py-3 mt-6 rounded-lg hover:bg-green-900 transition-colors ${(!selectedRoom || numberOfNights <= 0) ? 'bg-gray-400 pointer-events-none' : ''}`}
              >
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
