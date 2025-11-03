// app/payment/page.tsx
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { roomData } from '@/data/roomData';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import Image from 'next/image';
import { CheckCircle, XCircle, ShieldCheck, Loader2 } from 'lucide-react';

// Fungsi untuk format mata uang Rupiah
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Komponen Stepper dengan langkah ke-2 aktif
const PaymentStepper = () => (
  <div className="flex items-center justify-center w-full max-w-2xl mx-auto my-8">
    <div className="flex items-center text-gray-500">
      <ShieldCheck className="w-8 h-8 text-green-700" />
      <span className="ml-2">Booking Details</span>
    </div>
    <div className="flex-auto border-t-2 border-green-700 mx-4"></div>
    <div className="flex items-center text-green-700">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-700 text-white font-bold">2</div>
      <span className="ml-2 font-semibold">Payment</span>
    </div>
    <div className="flex-auto border-t-2 border-gray-300 mx-4"></div>
    <div className="flex items-center text-gray-500">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 font-bold">3</div>
      <span className="ml-2">Confirmation</span>
    </div>
  </div>
);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // State untuk billing information
  // const [billingInfo, setBillingInfo] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   city: '',
  //   postalCode: '',
  // });

  const [billingInfo, setBillingInfo] = useState({
    name: 'John Doe (Test)',
    email: 'test@example.com',
    phone: '+6281234567890',
    address: '123 Test Street',
    city: 'Jakarta',
    postalCode: '12345',
  });

  // State untuk loading dan error
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookingData = useMemo(() => {
    const roomSlug = searchParams.get('room');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = Number(searchParams.get('adults') || 1);
    const children = Number(searchParams.get('children') || 0);

    const room = roomData.find(r => r.slug === roomSlug);
    
    console.log('Booking Data Debug:', {
      roomSlug,
      foundRoom: room,
      allRooms: roomData.map(r => r.slug)
    });

    if (!room || !checkIn || !checkOut) {
      console.error('Invalid booking data:', { room, checkIn, checkOut });
      return null;
    }

    const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
    const basePrice = room.price * nights;
    const serviceFee = Math.round(basePrice * 0.05); // 5% service fee
    const tourismTax = 30000 * nights; // Pajak per malam
    const total = basePrice + serviceFee + tourismTax;

    return { 
      room, 
      roomSlug,
      checkIn, 
      checkOut, 
      adults, 
      children,
      nights, 
      basePrice, 
      serviceFee, 
      tourismTax, 
      total 
    };
  }, [searchParams]);

  // Handler untuk perubahan input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk submit payment
  const handlePayment = async () => {
    // Validasi billing info
    if (!billingInfo.name || !billingInfo.email || !billingInfo.phone) {
      setError('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billingInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validasi phone format (Indonesia)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(billingInfo.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid Indonesian phone number (e.g., +62812345678 or 0812345678)');
      return;
    }

    if (!bookingData) {
      setError('Invalid booking data');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log('Sending payment request with:', {
        roomSlug: bookingData.roomSlug,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        booker: billingInfo,
      });

      // Kirim request ke API payment
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomSlug: bookingData.roomSlug,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          adults: bookingData.adults,
          children: bookingData.children,
          booker: {
            name: billingInfo.name,
            email: billingInfo.email,
            phone: billingInfo.phone,
            address: billingInfo.address,
            city: billingInfo.city,
            postalCode: billingInfo.postalCode,
          },
        }),
      });

      const data = await response.json();
      
      console.log('Payment API response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Payment processing failed');
      }

      // Redirect ke Xendit payment page
      if (data.invoiceUrl) {
        console.log('Redirecting to:', data.invoiceUrl);
        window.location.href = data.invoiceUrl;
      } else {
        throw new Error('Payment URL not received');
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Invalid Booking Data</h2>
        <p className="mt-4 text-gray-600">Please return to the booking page and try again.</p>
        <button 
          onClick={() => router.push('/booking')}
          className="mt-6 bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900"
        >
          Back to Booking
        </button>
      </div>
    );
  }

  const { room, checkIn, checkOut, adults, children, nights, basePrice, serviceFee, tourismTax, total } = bookingData;

  const cardStyle = "bg-white p-6 rounded-lg shadow-md border";

  return (
    <main className="bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Complete Your Payment</h1>
          <p className="mt-2 text-gray-600">Secure your stay with us at Tembi Cultural House and experience authentic Javanese hospitality.</p>
        </div>
        <PaymentStepper />
        
        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-8 mt-10">
          
          {/* Section 1: Grid untuk detail dan pembayaran */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* === Kolom Kiri === */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              
              {/* Card 1: Booking Summary & Price Details */}
              <div className={cardStyle}>
                <div className="flex justify-between items-center pb-4 border-b">
                  <h2 className="text-xl font-bold">Booking Summary</h2>
                  <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">Confirmed</span>
                </div>
                <div className="mt-4">
                  {room.imageUrl && (
                    <Image src={room.imageUrl} alt={room.name} width={400} height={250} className="rounded-lg object-cover" />
                  )}
                  <h3 className="text-lg font-bold mt-4">{room.name}</h3>
                  <p className="text-sm text-gray-500">{room.tagline}</p>
                </div>
                <div className="space-y-3 mt-6 text-sm">
                  <div className="flex justify-between"><span>Check-in</span><span className="font-semibold">{format(parseISO(checkIn), 'EEE, MMM dd, yyyy')}</span></div>
                  <div className="flex justify-between"><span>Check-out</span><span className="font-semibold">{format(parseISO(checkOut), 'EEE, MMM dd, yyyy')}</span></div>
                  <div className="flex justify-between"><span>Guests</span><span className="font-semibold">{adults} Adults{children > 0 ? `, ${children} Children` : ''}</span></div>
                  <div className="flex justify-between"><span>Duration</span><span className="font-semibold">{nights} Nights</span></div>
                </div>
                <div className="border-t my-4"></div>
                <h4 className="font-semibold mb-2 text-sm">Price Details</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>{formatCurrency(room.price)} x {nights} nights</span>
                      <span>{formatCurrency(basePrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service fee (5%)</span>
                      <span>{formatCurrency(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tourism tax</span>
                      <span>{formatCurrency(tourismTax)}</span>
                    </div>
                </div>
              </div>
              
              {/* Card 2: Cancellation Policy */}
              <div className={cardStyle}>
                  <h4 className="font-bold mb-4 text-xl">Cancellation Policy</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0"/> 
                        Free cancellation until 48 hours before check-in.
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0"/> 
                        50% refund for cancellations within 48 hours.
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-4 h-4 mr-2 mt-0.5 text-red-600 flex-shrink-0"/> 
                        No refund for no-shows.
                      </li>
                  </ul>
              </div>
            </div>

            {/* === Kolom Kanan === */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Card: Billing Information */}
              <div className={cardStyle}>
                <h2 className="text-xl font-bold mb-4">Billing Information</h2>
                <p className="text-sm text-gray-600 mb-4">Please enter your contact details for booking confirmation.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Full Name *" 
                    value={billingInfo.name}
                    onChange={handleInputChange}
                    className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address *" 
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number * (e.g., +62812345678 or 0812345678)" 
                    value={billingInfo.phone}
                    onChange={handleInputChange}
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                  />
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Address (Optional)" 
                    value={billingInfo.address}
                    onChange={handleInputChange}
                    className="col-span-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <input 
                    type="text" 
                    name="city"
                    placeholder="City (Optional)" 
                    value={billingInfo.city}
                    onChange={handleInputChange}
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <input 
                    type="text" 
                    name="postalCode"
                    placeholder="Postal Code (Optional)" 
                    value={billingInfo.postalCode}
                    onChange={handleInputChange}
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-4">* Required fields</p>
              </div>

              {/* Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Payment Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You will be redirected to Xendit payment gateway</li>
                  <li>• Multiple payment methods available (Credit Card, Bank Transfer, E-Wallet)</li>
                  <li>• Secure payment processing with 256-bit SSL encryption</li>
                  <li>• Payment confirmation will be sent to your email</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Total Amount & Payment Button */}
          <div className={cardStyle}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                      <p className="font-semibold text-gray-700">Total Amount</p>
                      <p className="text-3xl font-bold text-green-800">{formatCurrency(total)}</p>
                      <p className="text-xs text-gray-500 mt-1">Includes all taxes and fees</p>
                  </div>
                  <div className="w-full md:w-auto">
                      <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full md:w-auto bg-green-800 text-white font-bold py-4 px-12 rounded-lg hover:bg-green-900 transition-colors flex items-center justify-center gap-2 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                          </>
                        ) : (
                          'Proceed to Payment'
                        )}
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">You won't be charged until payment confirmation</p>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </main>
  );
}
