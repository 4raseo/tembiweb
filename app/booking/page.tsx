"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { roomData } from '@/data/roomData';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { Calendar, User, Home, Eye, Check } from 'lucide-react';
import Link from 'next/link';

// --- KONFIGURASI HARGA TAMBAHAN ---
const ADDONS_PRICE = {
  breakfast: 250000, 
  extrabed: 350000   
};

// Fungsi format Rupiah
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- KOMPONEN STEPPER ---
const BookingStepper = () => (
  <div className="flex items-center justify-center w-full max-w-lg mx-auto mb-8 font-sans text-xs md:text-sm relative z-10">
    <div className="flex items-center text-green-700">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-700 text-white font-bold text-xs">1</div>
      <span className="ml-2 font-semibold">Booking Details</span>
    </div>
    <div className="w-12 border-t border-gray-300 mx-2"></div>
    <div className="flex items-center text-gray-400">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 font-bold text-xs">2</div>
      <span className="ml-2">Payment</span>
    </div>
    <div className="w-12 border-t border-gray-300 mx-2"></div>
    <div className="flex items-center text-gray-400">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 font-bold text-xs">3</div>
      <span className="ml-2">Confirmation</span>
    </div>
  </div>
);

export default function BookingPage() {
  const searchParams = useSearchParams();
  const initialRoomSlug = searchParams.get('room');

  // --- LOGIKA DATA STATIS ---
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
  
  const [specialRequests, setSpecialRequests] = useState('');
  const [addons, setAddons] = useState({
    breakfast: false,
    extrabed: false
  });

  useEffect(() => {
    if (initialRoomSlug) {
      const initialRoom = roomData.find(r => r.slug === initialRoomSlug);
      if (initialRoom) setSelectedRoomId(initialRoom.id);
    }
  }, [initialRoomSlug]);

  const selectedRoom = useMemo(() => roomData.find(room => room.id === selectedRoomId), [selectedRoomId]);
  
  const numberOfNights = useMemo(() => {
    if (checkIn && checkOut) {
      const start = parseISO(checkIn);
      const end = parseISO(checkOut);
      const nights = differenceInCalendarDays(end, start);
      return nights > 0 ? nights : 0;
    }
    return 0;
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    let total = 0;
    if (selectedRoom && numberOfNights > 0) {
      total += selectedRoom.price * numberOfNights;
    }
    if (addons.breakfast) total += ADDONS_PRICE.breakfast * (adults + children) * (numberOfNights || 1);
    if (addons.extrabed) total += ADDONS_PRICE.extrabed * (numberOfNights || 1);
    
    return total;
  }, [selectedRoom, numberOfNights, addons, adults, children]);

  const toggleAddon = (key: 'breakfast' | 'extrabed') => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isFormValid = Boolean(selectedRoom && checkIn && checkOut && numberOfNights > 0);
  
  return (
    <main className="min-h-screen bg-[#EFF1F0] font-sans text-gray-800 pb-20">
      
      {/* === HERO SECTION === */}
      <div 
        className="relative w-full h-[500px] flex flex-col items-center justify-center text-center px-4 bg-cover bg-center mb-10"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=2000&auto=format&fit=crop')" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A4D39]/90 via-[#3A4D39]/60 to-[#EFF1F0]"></div>
        
        <div className="relative z-10 max-w-4xl mt-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            Book Your Stay at <br/> Tembi Cultural House
          </h1>
          <p className="text-gray-100 text-base md:text-xl max-w-2xl mx-auto font-light drop-shadow-md leading-relaxed">
            Experience authentic Indonesian culture in comfort and tradition. 
            Immerse yourself in Javanese heritage while enjoying modern amenities.
          </p>
        </div>
      </div>

      {/* === STEPPER SECTION === */}
      <div className="container mx-auto px-4">
         <BookingStepper />
      </div>

      {/* === MAIN CONTENT CONTAINER === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8 items-start">
        
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Calendar className="w-5 h-5 text-green-700" />
            <h3 className="text-xl font-bold font-serif text-gray-900">Booking Details</h3>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
             <label className="block text-sm font-semibold text-gray-700 mb-3">Select Your Dates</label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute top-2.5 left-3 text-green-700 text-xs font-bold flex items-center gap-1">
                    →] Check-in
                  </span>
                  <input 
                    type="date" 
                    value={checkIn} 
                    onChange={(e) => setCheckIn(e.target.value)} 
                    className="w-full pt-8 pb-2 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-600 text-sm font-medium transition-colors"
                  />
                </div>
                <div className="relative">
                  <span className="absolute top-2.5 left-3 text-green-700 text-xs font-bold flex items-center gap-1">
                    [← Check-out
                  </span>
                  <input 
                    type="date" 
                    value={checkOut} 
                    onChange={(e) => setCheckOut(e.target.value)} 
                    className="w-full pt-8 pb-2 px-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-600 text-sm font-medium transition-colors"
                  />
                </div>
             </div>
          </div>

          {/* Guest Selection */}
          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Guest Information</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 flex flex-col">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1"><User size={12}/> Adults</label>
                <select 
                  value={adults} 
                  onChange={(e) => setAdults(Number(e.target.value))} 
                  className="bg-transparent w-full text-sm font-medium focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 flex flex-col">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1"><User size={12}/> Children</label>
                <select 
                  value={children} 
                  onChange={(e) => setChildren(Number(e.target.value))} 
                  className="bg-transparent w-full text-sm font-medium focus:outline-none cursor-pointer"
                >
                  {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Children</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Room List */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-4 h-4 text-green-700" />
              <h4 className="font-bold text-gray-800">Choose Your Cultural Room</h4>
            </div>
            <div className="space-y-4">
              {roomData.map((room) => (
                <div 
                  key={room.id} 
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`relative flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-xl border cursor-pointer transition-all duration-200 
                    ${selectedRoomId === room.id 
                      ? 'border-green-600 bg-green-50/30 shadow-sm ring-1 ring-green-600' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <div className="mb-2 md:mb-0">
                    <h5 className="font-bold text-gray-900 text-base">{room.name}</h5>
                    <p className="text-sm text-gray-500 mt-1">{room.tagline}</p>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto mt-2 md:mt-0 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end">
                    <div>
                        <p className="font-bold text-green-700 text-lg">{formatCurrency(room.price)}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider text-right hidden md:block">/night</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-700 text-xs">●</span>
              <h4 className="font-bold text-gray-800 text-sm">Special Requests</h4>
            </div>
            <textarea 
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Let us know about any special requirements, dietary restrictions, or cultural experiences you'd like to arrange..."
              className="w-full p-4 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 h-32 resize-none bg-gray-50 focus:bg-white transition-colors"
            ></textarea>
          </div>
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit sticky top-8">
            
            <div className="flex items-center gap-2 mb-6 text-green-800 border-b border-gray-100 pb-4">
                <Eye className="w-5 h-5" />
                <h3 className="text-lg font-serif font-bold">Room Preview</h3>
            </div>

            {/* --- PREVIEW BOX (UPDATED: Menampilkan Gambar) --- */}
            <div className="relative h-48 w-full bg-gray-50 rounded-xl mb-6 overflow-hidden shadow-sm border border-gray-100">
                {selectedRoom ? (
                    <>
                        <img 
                            // Gunakan imageUrl dari data, atau fallback ke placeholder jika tidak ada
                            src={selectedRoom.imageUrl || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop"} 
                            alt={selectedRoom.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Text di atas Gambar */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                            <p className="text-white font-bold text-lg leading-tight">{selectedRoom.name}</p>
                            <p className="text-gray-200 text-xs mt-1 opacity-90 line-clamp-1">{selectedRoom.tagline}</p>
                        </div>
                    </>
                ) : (
                    // Tampilan Placeholder jika belum ada kamar dipilih
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                        <Home className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-medium">Select a room to preview</span>
                    </div>
                )}
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Check-in</span>
                <span className="font-semibold text-gray-900">{checkIn || '-'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Check-out</span>
                <span className="font-semibold text-gray-900">{checkOut || '-'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Guests</span>
                <span className="font-semibold text-gray-900">{adults} Adult, {children} Child</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                <span>Nights</span>
                <span className="font-semibold text-gray-900">{numberOfNights} Night(s)</span>
                </div>
                <div className="flex justify-between py-1">
                <span>Room</span>
                <span className={`font-semibold text-right ${selectedRoom ? 'text-gray-900' : 'text-orange-500'}`}>
                    {selectedRoom?.name || 'Not selected'}
                </span>
                </div>
            </div>

            {/* Additional Add-ons */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h5 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">Additional Services</h5>
                <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <button 
                    onClick={() => toggleAddon('breakfast')}
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                        ${addons.breakfast ? 'bg-green-700 border-green-700 text-white' : 'bg-white border-gray-300'}`}
                    >
                    {addons.breakfast && <Check size={14} />}
                    </button>
                    <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-800">Breakfast</span>
                        <span className="text-xs font-semibold text-green-700">+{formatCurrency(ADDONS_PRICE.breakfast)}</span>
                    </div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <button 
                    onClick={() => toggleAddon('extrabed')}
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                        ${addons.extrabed ? 'bg-green-700 border-green-700 text-white' : 'bg-white border-gray-300'}`}
                    >
                    {addons.extrabed && <Check size={14} />}
                    </button>
                    <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-800">Extra Bed</span>
                        <span className="text-xs font-semibold text-green-700">+{formatCurrency(ADDONS_PRICE.extrabed)}</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="flex justify-between items-end mb-6">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Total Payment</p>
                    <p className="font-bold text-2xl text-green-800">{formatCurrency(totalPrice)}</p>
                </div>
            </div>

            {/* CTA Button */}
            <Link
                href={isFormValid ? {
                    pathname: '/payment',
                    query: { 
                        room: selectedRoom?.slug,
                        checkIn, checkOut, adults, children, 
                        total: totalPrice,
                        addons: JSON.stringify(addons),
                        specialRequests 
                    },
                } : '#'}
                aria-disabled={!isFormValid}
                className={`w-full block text-center py-4 rounded-xl font-bold text-white transition-all transform 
                ${isFormValid 
                    ? 'bg-[#8B8055] hover:bg-[#766c44] shadow-lg shadow-[#8B8055]/30 active:scale-95 cursor-pointer' 
                    : 'bg-gray-300 cursor-not-allowed pointer-events-none' 
                }`}
            >
                Check Availability
            </Link>

            </div>
        </div>

      </div>
    </main>
  );
}