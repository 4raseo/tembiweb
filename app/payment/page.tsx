// app/payment/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { roomData } from '@/data/roomData';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import Image from 'next/image';
import { CheckCircle, XCircle, ShieldCheck, CreditCard, Landmark, Wallet } from 'lucide-react';

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
  const [paymentMethod, setPaymentMethod] = useState('card');

  const bookingData = useMemo(() => {
    const roomSlug = searchParams.get('room');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = Number(searchParams.get('adults') || 1);

    const room = roomData.find(r => r.slug === roomSlug);
    if (!room || !checkIn || !checkOut) return null;

    const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
    const basePrice = room.price * nights;
    const serviceFee = basePrice * 0.05; // 5% service fee
    const tourismTax = 30000 * nights; // Pajak per malam
    const total = basePrice + serviceFee + tourismTax;

    return { room, checkIn, checkOut, adults, nights, basePrice, serviceFee, tourismTax, total };
  }, [searchParams]);

  if (!bookingData) {
    return <div className="text-center py-20">Data pemesanan tidak valid atau tidak lengkap.</div>;
  }

  const { room, checkIn, checkOut, adults, nights, basePrice, serviceFee, tourismTax, total } = bookingData;

  const cardStyle = "bg-white p-6 rounded-lg shadow-md border";

  return (
    <main className="bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Complete Your Payment</h1>
          <p className="mt-2 text-gray-600">Secure your stay with us at Tembi Cultural House and experience authentic Javanese hospitality.</p>
        </div>
        <PaymentStepper />
        
        {/* === STRUKTUR UTAMA DIUBAH MENJADI FLEX-COL UNTUK MEMISAHKAN KARTU TOTAL AMOUNT === */}
        <div className="flex flex-col gap-8 mt-10">
          
          {/* Section 1: Grid untuk detail dan pembayaran */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* === Kolom Kiri === */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              
              {/* Card 1: Booking Summary & Price Details (DIGABUNG) */}
              <div className={cardStyle}>
                <div className="flex justify-between items-center pb-4 border-b">
                  <h2 className="text-xl font-bold">Booking Summary</h2>
                  <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">Confirmed</span>
                </div>
                <div className="mt-4">
                  <Image src={room.imageUrl} alt={room.name} width={400} height={250} className="rounded-lg object-cover" />
                  <h3 className="text-lg font-bold mt-4">{room.name}</h3>
                  <p className="text-sm text-gray-500">{room.tagline}</p>
                </div>
                <div className="space-y-3 mt-6 text-sm">
                  <div className="flex justify-between"><span>Check-in</span><span className="font-semibold">{format(parseISO(checkIn), 'EEE, MMM dd, yyyy')}</span></div>
                  <div className="flex justify-between"><span>Check-out</span><span className="font-semibold">{format(parseISO(checkOut), 'EEE, MMM dd, yyyy')}</span></div>
                  <div className="flex justify-between"><span>Guests</span><span className="font-semibold">{adults} Adults</span></div>
                  <div className="flex justify-between"><span>Duration</span><span className="font-semibold">{nights} Nights</span></div>
                </div>
                <div className="border-t my-4"></div>
                <h4 className="font-semibold mb-2 text-sm">Price Details</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600"><span>{formatCurrency(room.price)} x {nights} nights</span><span>{formatCurrency(basePrice)}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Service fee</span><span>{formatCurrency(serviceFee)}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Tourism tax</span><span>{formatCurrency(tourismTax)}</span></div>
                </div>
              </div>
              
              {/* Card 2: Cancellation Policy */}
              <div className={cardStyle}>
                  <h4 className="font-bold mb-4 text-xl">Cancellation Policy</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0"/> Free cancellation until 48 hours before check-in.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0"/> 50% refund for cancellations within 48 hours.</li>
                      <li className="flex items-start"><XCircle className="w-4 h-4 mr-2 mt-0.5 text-red-600 flex-shrink-0"/> No refund for no-shows.</li>
                  </ul>
              </div>
            </div>

            {/* === Kolom Kanan === */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Card 3: Payment Method */}
              <div className={cardStyle}>
                <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* ... Opsi pembayaran tidak berubah ... */}
                  <div onClick={() => setPaymentMethod('card')} className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-green-700 bg-green-50' : ''}`}><CreditCard className="mb-2"/> <span className="font-semibold">Credit/Debit Card</span></div>
                  <div onClick={() => setPaymentMethod('transfer')} className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'transfer' ? 'border-green-700 bg-green-50' : ''}`}><Landmark className="mb-2"/> <span className="font-semibold">Bank Transfer</span></div>
                  <div onClick={() => setPaymentMethod('ewallet')} className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'ewallet' ? 'border-green-700 bg-green-50' : ''}`}><Wallet className="mb-2"/> <span className="font-semibold">E-Wallet</span></div>
                </div>
                {paymentMethod === 'card' && <div className="space-y-4"><input type="text" placeholder="Cardholder Name" className="w-full p-2 border rounded"/><input type="text" placeholder="Card Number" className="w-full p-2 border rounded"/><div className="grid grid-cols-2 gap-4"><input type="text" placeholder="Expiry Date (MM/YY)" className="p-2 border rounded"/><input type="text" placeholder="CVV" className="p-2 border rounded"/></div></div>}
                {paymentMethod === 'transfer' && <div className="text-center p-6 bg-gray-100 rounded-lg">Instruksi transfer bank akan ditampilkan di sini.</div>}
                {paymentMethod === 'ewallet' && <div className="text-center p-6 bg-gray-100 rounded-lg">Pilihan E-Wallet (GoPay, OVO, dll) akan ditampilkan di sini.</div>}
              </div>
              
              {/* Card 4: Billing Information */}
              <div className={cardStyle}>
                <h2 className="text-xl font-bold mb-4">Billing Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="col-span-2 p-2 border rounded"/>
                  <input type="email" placeholder="Email Address" className="p-2 border rounded"/>
                  <input type="tel" placeholder="Phone Number" className="p-2 border rounded"/>
                  <input type="text" placeholder="Address" className="col-span-2 p-2 border rounded"/>
                  <input type="text" placeholder="City" className="p-2 border rounded"/>
                  <input type="text" placeholder="Postal Code" className="p-2 border rounded"/>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Kartu Total Amount yang terpisah di paling bawah */}
          <div className={cardStyle}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                      <p className="font-semibold">Total Amount</p>
                      <p className="text-2xl font-bold text-green-800">{formatCurrency(total)}</p>
                      <p className="text-xs text-gray-500 mt-1">Includes all taxes and fees</p>
                  </div>
                  <div className="w-full md:w-auto">
                      <button className="w-full bg-green-800 text-white font-bold py-3 px-10 rounded-lg hover:bg-green-900">
                          Confirm & Pay
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">You wont be charged until confirmation</p>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </main>
  );
}
