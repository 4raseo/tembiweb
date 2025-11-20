// app/booking/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Calendar, User, Mail, Phone, Download, Home } from 'lucide-react';
import { format } from 'date-fns';

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

interface BookingDetails {
  id: string;
  roomName: string;
  roomSlug: string;
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
  status: string;
  createdAt: string;
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
      const response = await fetch(`/api/payment?bookingId=${bookingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch booking details');
      }

      setBooking(data.booking);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'Unable to retrieve booking information'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600">
            Your booking has been confirmed. We\'ve sent a confirmation email to <strong>{booking.customerEmail}</strong>
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          
          {/* Header */}
          <div className="bg-green-800 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">Booking Confirmation</h2>
                <p className="text-green-100">Booking ID: {booking.id}</p>
              </div>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                CONFIRMED
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            
            {/* Room Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Home size={20} className="text-green-700" />
                Accommodation Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xl font-bold text-gray-800">{booking.roomName}</p>
                <p className="text-sm text-gray-600 mt-1">Tembi Cultural House</p>
              </div>
            </div>

            {/* Stay Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar size={20} className="text-green-700" />
                Stay Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Check-in</p>
                  <p className="font-bold text-gray-800">
                    {format(new Date(booking.checkInDate), 'EEE, MMM dd, yyyy')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">After 2:00 PM</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Check-out</p>
                  <p className="font-bold text-gray-800">
                    {format(new Date(booking.checkOutDate), 'EEE, MMM dd, yyyy')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Before 12:00 PM</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{booking.duration} nights</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-semibold">
                    {booking.adults} Adults{booking.children > 0 ? `, ${booking.children} Children` : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <User size={20} className="text-green-700" />
                Guest Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <span className="text-gray-800">{booking.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  <span className="text-gray-800">{booking.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  <span className="text-gray-800">{booking.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room price ({booking.duration} nights)</span>
                  <span className="text-gray-800">{formatCurrency(booking.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-gray-800">{formatCurrency(booking.serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tourism tax</span>
                  <span className="text-gray-800">{formatCurrency(booking.tourismTax)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total Paid</span>
                    <span className="font-bold text-xl text-green-800">
                      {formatCurrency(booking.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-white border-2 border-green-800 text-green-800 py-3 rounded-lg font-semibold hover:bg-green-50 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Print Confirmation
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-green-800 text-white py-3 rounded-lg font-semibold hover:bg-green-900"
          >
            Return to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-bold text-blue-900 mb-2">Important Information</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• A confirmation email has been sent to your email address</li>
            <li>• Please bring a valid ID for check-in</li>
            <li>• Check-in time: 2:00 PM | Check-out time: 12:00 PM</li>
            <li>• For any changes or inquiries, contact us at info@tembiculturalhouse.com</li>
            <li>• Free cancellation up to 48 hours before check-in</li>
          </ul>
        </div>

        {/* Contact Card */}
        <div className="mt-6 text-center text-gray-600">
          <p className="mb-2">Need help? Contact us:</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
            <a href="mailto:info@tembiculturalhouse.com" className="text-green-700 hover:underline">
              📧 info@tembiculturalhouse.com
            </a>
            <a href="tel:+62274896602" className="text-green-700 hover:underline">
              📞 +62 274 896 602
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
