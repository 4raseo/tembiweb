// app/booking/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Calendar, User, Bed, Users, CreditCard, Download, Coffee } from 'lucide-react';
import { format } from 'date-fns';

const formatCurrency = (amount: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const ADDONS_PRICE = { breakfast: 50000, extrabed: 150000 };

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('booking_id');

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError('No booking ID provided');
      setLoading(false);
      return;
    }
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/payment?bookingId=${bookingId}`);
      const text = await response.text();
      
      if (!response.ok) throw new Error('Failed to fetch details');
      
      const data = JSON.parse(text);
      setBooking(data.booking);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8CA873]"></div>
    </div>
  );

  if (error || !booking) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
      <div className="text-center p-8 bg-white rounded-xl shadow">
         <h1 className="text-xl font-bold mb-2">Booking Not Found</h1>
         <button onClick={() => router.push('/')} className="bg-tembi text-white px-4 py-2 rounded">Home</button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FCFCFA] pb-20 font-sans pt-28">
      {/* Top Banner */}
      <div className="bg-[#93A576] pt-12 pb-24 px-4 text-center text-white">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#2ed16f] rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
        </div>
        <h1 className="text-4xl font-serif font-bold mb-2">Payment Successful!</h1>
        <p className="text-green-50">Booking ID: <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">{booking.id}</span></p>
      </div>

      <div className="container mx-auto max-w-[900px] px-4 -mt-16 relative z-10">
        
        {/* Card Utama */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="bg-[#9BAF7D] p-5 flex justify-between items-center text-white">
            <h2 className="text-2xl font-serif font-bold">Booking Confirmed</h2>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-8">
            {/* Kiri: Info Tamu */}
            <div className="space-y-6">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Guest Name</p>
                    <p className="text-lg font-bold text-gray-800">{booking.customerName}</p>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Room</p>
                    <p className="text-lg font-bold text-gray-800">{booking.roomName}</p>
                </div>
            </div>

            {/* Kanan: Detail Waktu */}
            <div className="bg-[#F7F7F5] rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Check-in</p>
                        <p className="font-bold text-gray-800">{format(new Date(booking.checkInDate), 'dd MMM yyyy')}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Check-out</p>
                        <p className="font-bold text-gray-800">{format(new Date(booking.checkOutDate), 'dd MMM yyyy')}</p>
                    </div>
                </div>
                <div className="text-center pt-4 border-t border-gray-200">
                    <span className="font-bold text-tembi">{booking.duration} Nights</span>
                </div>
            </div>
          </div>
        </div>

        {/* Summary Biaya */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-50">
            <h3 className="font-serif font-bold text-xl text-gray-800 mb-4 border-b pb-2">Payment Details</h3>
            
            <div className="space-y-3">
                {/* Kamar */}
                <div className="flex justify-between font-medium">
                    <span>{booking.roomName} (x{booking.duration} nights)</span>
                    <span>{formatCurrency(booking.roomPrice * booking.duration)}</span>
                </div>

                {/* --- ADDED: Breakfast (Jika Ada) --- */}
                {booking.breakfast > 0 && (
                    <div className="flex justify-between text-gray-600 bg-orange-50 p-2 rounded">
                        <span className="flex items-center gap-2"><Coffee size={14}/> Extra Breakfast ({booking.breakfast} pax)</span>
                        <span>{formatCurrency(booking.breakfast * ADDONS_PRICE.breakfast * booking.duration)}</span>
                    </div>
                )}

                {/* --- ADDED: Extra Bed (Jika Ada) --- */}
                {booking.extraBed > 0 && (
                    <div className="flex justify-between text-gray-600 bg-green-50 p-2 rounded">
                        <span className="flex items-center gap-2"><Bed size={14}/> Extra Bed ({booking.extraBed} units)</span>
                        <span>{formatCurrency(booking.extraBed * ADDONS_PRICE.extrabed * booking.duration)}</span>
                    </div>
                )}

                <div className="flex justify-between text-gray-500 text-sm pt-2">
                    <span>Service Fee & Tax</span>
                    <span>{formatCurrency(booking.serviceFee + booking.tourismTax)}</span>
                </div>

                <div className="flex justify-between font-bold text-xl text-tembi pt-4 border-t">
                    <span>Total Paid</span>
                    <span>{formatCurrency(booking.totalPrice)}</span>
                </div>
            </div>
        </div>

        <div className="flex justify-center gap-4">
            <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 border-2 border-tembi text-tembi font-bold rounded-lg hover:bg-green-50">
                <Download size={18} /> Print
            </button>
            <button onClick={() => router.push('/')} className="px-8 py-3 bg-tembi text-white font-bold rounded-lg hover:bg-darktembi">
                Back Home
            </button>
        </div>

      </div>
    </main>
  );
}
