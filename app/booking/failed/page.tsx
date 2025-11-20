// app/booking/failed/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, AlertTriangle, RefreshCw, Home, Phone, Mail } from 'lucide-react';

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
  totalPrice: number;
  checkInDate: string;
  checkOutDate: string;
  customerName: string;
  customerEmail: string;
  status: string;
  xenditInvoiceUrl: string | null;
}

export default function BookingFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('booking_id');

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/payment?bookingId=${bookingId}`);
      const data = await response.json();
      
      if (response.ok) {
        setBooking(data.booking);
      }
    } catch (err) {
      console.error('Failed to fetch booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryPayment = () => {
    if (booking?.xenditInvoiceUrl) {
      // Redirect ke invoice URL yang sama jika masih valid
      window.location.href = booking.xenditInvoiceUrl;
    } else {
      // Atau kembali ke halaman payment
      router.push('/payment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        
        {/* Failed Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Failed</h1>
          <p className="text-lg text-gray-600">
            Unfortunately, your payment could not be processed.
          </p>
        </div>

        {/* Error Information Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-red-600 text-white p-6">
            <h2 className="text-xl font-bold">Transaction Status</h2>
            <p className="text-red-100 mt-1">Payment was not completed</p>
          </div>

          <div className="p-6">
            {booking && (
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-mono text-sm">{booking.id}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Room</span>
                  <span className="font-semibold">{booking.roomName}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold text-lg">{formatCurrency(booking.totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    {booking.status}
                  </span>
                </div>
              </div>
            )}

            {/* Possible Reasons */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">Possible Reasons</h3>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Insufficient funds or credit limit exceeded</li>
                    <li>• Payment was cancelled by user</li>
                    <li>• Card details were incorrect</li>
                    <li>• Payment gateway timeout or connection issue</li>
                    <li>• Bank declined the transaction</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What to do next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What to do next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your payment method and try again</li>
                <li>• Ensure you have sufficient funds</li>
                <li>• Try a different payment method</li>
                <li>• Contact your bank if the issue persists</li>
                <li>• Reach out to our support team for assistance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {booking?.xenditInvoiceUrl && (
            <button
              onClick={handleRetryPayment}
              className="w-full bg-green-800 text-white py-4 rounded-lg font-semibold hover:bg-green-900 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw size={20} />
              Retry Payment
            </button>
          )}
          
          <button
            onClick={() => router.push('/booking')}
            className="w-full bg-white border-2 border-green-800 text-green-800 py-4 rounded-lg font-semibold hover:bg-green-50 flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw size={20} />
            Make New Booking
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={20} />
            Return to Home
          </button>
        </div>

        {/* Contact Support */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Our support team is here to assist you with your booking
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:support@tembiculturalhouse.com"
              className="inline-flex items-center justify-center gap-2 text-green-700 hover:text-green-900 font-medium"
            >
              <Mail size={18} />
              support@tembiculturalhouse.com
            </a>
            <a 
              href="tel:+62274896602"
              className="inline-flex items-center justify-center gap-2 text-green-700 hover:text-green-900 font-medium"
            >
              <Phone size={18} />
              +62 274 896 602
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Available Monday - Sunday, 9:00 AM - 9:00 PM WIB
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {booking 
              ? 'Your booking has been reserved for 24 hours. Please complete payment to confirm.' 
              : 'No charges were made to your account.'}
          </p>
        </div>
      </div>
    </main>
  );
}
