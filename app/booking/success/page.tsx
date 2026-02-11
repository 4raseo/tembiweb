// app/booking/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Calendar, User, Mail, Phone, Home, Bed, Users, CreditCard, Download } from 'lucide-react';
import { format } from 'date-fns';

// Format currency helper
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface BookingDetails {
  id: string;
  roomName: string;
  totalPrice: number;
  basePrice: number;
  serviceFee: number;
  tourismTax: number;
  checkInDate: string;
  checkOutDate: string;
  duration: number;
  adults: number;
  children: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('booking_id');

  const [booking, setBooking] = useState<BookingDetails | null>(null);
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
      // 1. Ambil respons mentah
      const response = await fetch(`/api/payment?bookingId=${bookingId}`);
      
      // 2. Baca sebagai text dulu (JANGAN langsung .json())
      const text = await response.text();
      console.log("Debug Response Server:", text); // Cek Console browser Anda!

      // 3. Cek apakah kosong
      if (!text) {
        throw new Error("Server returned empty response");
      }

      // 4. Coba parse JSON manual
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Jika gagal parse, berarti server mengembalikan HTML Error (misal 500/404 page)
        console.error("Gagal parse JSON. Response bukan JSON:", text);
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) throw new Error(data.message || 'Failed to fetch booking details');
      
      setBooking(data.booking);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8CA873]"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#F9F9F9]">
        <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4 mx-auto w-fit">⚠️</div>
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-2">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'Unable to retrieve booking information'}</p>
          <button onClick={() => router.push('/')} className="bg-[#8CA873] text-white px-6 py-2 rounded-lg hover:bg-[#7A9462]">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFCFA] pb-20 font-sans">
      
      {/* --- TOP SECTION (Green Background) --- */}
      <div className="bg-[#93A576] pt-12 pb-24 px-4 text-center text-white relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#2ed16f] rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
        </div>
        <h1 className="text-4xl font-serif font-bold mb-2 tracking-wide">Payment Successful!</h1>
        <p className="text-green-50 text-lg font-light">Your stay at Tembi Cultural House is confirmed</p>
        
        <div className="mt-8 inline-block bg-[#A3B488] bg-opacity-40 px-6 py-3 rounded-lg border border-[#B5C49D] text-sm text-green-50">
          Thank you for choosing our traditional Indonesian heritage experience
        </div>
      </div>

      {/* --- STEPS INDICATOR (Visual Only) --- */}
      <div className="bg-white border-b border-gray-100 py-4 shadow-sm relative z-0">
        <div className="container mx-auto max-w-3xl px-4 flex justify-center items-center text-xs sm:text-sm text-gray-400 font-medium tracking-wider">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#93A576] flex items-center justify-center text-white text-[10px]">✓</div>
                <span>Booking Details</span>
            </div>
            <div className="w-12 h-[1px] bg-[#93A576] mx-4"></div>
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#93A576] flex items-center justify-center text-white text-[10px]">✓</div>
                <span>Payment</span>
            </div>
            <div className="w-12 h-[1px] bg-[#93A576] mx-4"></div>
            <div className="flex items-center gap-2 text-[#93A576] font-bold">
                <div className="w-5 h-5 rounded-full bg-[#93A576] text-white flex items-center justify-center text-[10px]">3</div>
                <span>Confirmation</span>
            </div>
        </div>
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="container mx-auto max-w-[900px] px-4 -mt-16 relative z-10">
        
        {/* === BOOKING CONFIRMED CARD === */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          {/* Card Header */}
          <div className="bg-[#9BAF7D] p-5 flex justify-between items-center text-white">
            <div>
                <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                    Booking Confirmed
                </h2>
                <p className="text-green-50 text-sm opacity-90 mt-1">Your traditional Indonesian experience awaits</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8 grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Left Column: Guest & Room Info */}
            <div className="space-y-8">
                {/* Guest Name */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F3F6EC] flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#8CA873]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Guest Name</p>
                        <p className="text-lg font-bold text-gray-800">{booking.customerName}</p>
                    </div>
                </div>

                {/* Accommodation */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F3F6EC] flex items-center justify-center flex-shrink-0">
                        <Bed className="w-5 h-5 text-[#8CA873]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Accommodation</p>
                        <p className="text-lg font-bold text-gray-800 leading-tight">{booking.roomName}</p>
                        <p className="text-xs text-gray-500 mt-1">Authentic wooden architecture</p>
                    </div>
                </div>

                {/* Guests Count */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F3F6EC] flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-[#8CA873]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Guests</p>
                        <p className="text-lg font-bold text-gray-800">
                            {booking.adults} Adults {booking.children > 0 && `, ${booking.children} Children`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Stay Details (Beige Box) */}
            <div className="bg-[#F7F7F5] rounded-xl p-6 border border-gray-100 h-full flex flex-col justify-between">
                <div>
                    <h3 className="font-serif font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                        Stay Details
                        <Calendar className="w-4 h-4 text-gray-400" />
                    </h3>
                    
                    <div className="flex justify-between mb-6 relative">
                        {/* Vertical line connector */}
                        <div className="absolute left-[50%] top-2 bottom-2 w-[1px] bg-gray-200 -translate-x-1/2"></div>

                        <div className="text-left pr-4">
                            <p className="text-xs text-gray-500 mb-1">Check-in</p>
                            <p className="font-bold text-gray-800 text-sm">{format(new Date(booking.checkInDate), 'EEE, MMM dd')}</p>
                            <p className="font-serif text-gray-800 text-lg">{format(new Date(booking.checkInDate), 'yyyy')}</p>
                            <p className="text-[10px] text-gray-400 mt-1">After 2:00 PM</p>
                        </div>

                        <div className="text-right pl-4">
                            <p className="text-xs text-gray-500 mb-1">Check-out</p>
                            <p className="font-bold text-gray-800 text-sm">{format(new Date(booking.checkOutDate), 'EEE, MMM dd')}</p>
                            <p className="font-serif text-gray-800 text-lg">{format(new Date(booking.checkOutDate), 'yyyy')}</p>
                            <p className="text-[10px] text-gray-400 mt-1">Before 12:00 PM</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
                        <span className="text-sm text-gray-500">Duration</span>
                        <span className="font-bold text-gray-800">{booking.duration} Nights</span>
                    </div>
                </div>

                {/* Booking Reference Box */}
                <div className="bg-white p-4 rounded-lg border border-dashed border-gray-300 text-center shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Booking Reference</p>
                    <p className="font-serif font-bold text-xl text-[#7A9462] tracking-wider select-all">
                        {booking.id.toUpperCase().slice(0, 12)}...
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">Please keep this for your records</p>
                </div>
            </div>

          </div>
        </div>

        {/* === PAYMENT SUMMARY SECTION === */}
        <div className="text-center mb-6">
            <h2 className="font-serif text-3xl font-bold text-gray-800">Payment Summary</h2>
            <p className="text-gray-500 text-sm mt-1">Complete breakdown of your booking charges</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-50">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Accommodation Charges List */}
                <div className="space-y-4">
                    <h3 className="font-serif font-bold text-xl text-gray-800 mb-4">Accommodation Charges</h3>
                    
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-gray-800">{booking.roomName}</p>
                            <p className="text-xs text-gray-500">{formatCurrency(booking.basePrice / booking.duration)} × {booking.duration} nights</p>
                        </div>
                        <span className="font-medium text-gray-700">{formatCurrency(booking.basePrice)}</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-gray-800">Cultural Experience Package</p>
                            <p className="text-xs text-gray-500">Traditional activities included</p>
                        </div>
                        <span className="font-medium text-gray-700">Included</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <p className="font-medium text-gray-600">Service Fee</p>
                        <span className="font-medium text-gray-700">{formatCurrency(booking.serviceFee)}</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <p className="font-medium text-gray-600">Taxes & Fees</p>
                        <span className="font-medium text-gray-700">{formatCurrency(booking.tourismTax)}</span>
                    </div>
                </div>

                {/* Payment Totals Right Side */}
                <div className="bg-[#FAFAFA] rounded-xl p-6 flex flex-col justify-center">
                    <h3 className="font-serif font-bold text-xl text-gray-800 mb-4">Payment Details</h3>
                    
                    <div className="space-y-3 pb-4 border-b border-gray-200">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-bold text-gray-800">{formatCurrency(booking.basePrice + booking.serviceFee + booking.tourismTax)}</span>
                        </div>
                        {/* Placeholder for discount if logic exists */}
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Early Bird Discount</span>
                            <span className="font-bold text-green-600">-Rp 0</span>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center mb-6">
                        <span className="font-bold text-lg text-gray-800">Total Paid</span>
                        <span className="font-serif font-bold text-3xl text-[#7A9462]">{formatCurrency(booking.totalPrice)}</span>
                    </div>

                    {/* Payment Method Card */}
                    <div className="bg-[#ECFdf5] border border-[#D1FAE5] rounded-lg p-3 flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <div>
                            <p className="text-xs text-green-800 font-bold uppercase">Payment Method</p>
                            <p className="text-xs text-green-700">Online Payment via Xendit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
            <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#8CA873] text-[#8CA873] font-bold rounded-lg hover:bg-green-50 transition-colors">
                <Download className="w-4 h-4" />
                Print Confirmation
            </button>
            <button onClick={() => router.push('/')} className="px-8 py-3 bg-[#8CA873] text-white font-bold rounded-lg hover:bg-[#7A9462] transition-colors shadow-lg shadow-green-100">
                Back to Home
            </button>
        </div>

      </div>
    </main>
  );
}
