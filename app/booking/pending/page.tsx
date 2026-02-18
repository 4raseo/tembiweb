"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, ExternalLink, RefreshCw, Copy, Check, AlertTriangle, Info, Calendar, User, Bed, Coffee } from 'lucide-react';
import { format } from 'date-fns';

// Helper format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const ADDONS_PRICE = {
  breakfast: 50000, 
  extrabed: 150000   
};

export default function BookingPendingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('booking_id');

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [copied, setCopied] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/payment?bookingId=${bookingId}`);
      const data = await res.json();
      
      if (data.booking) {
        setBooking(data.booking);
        
        // Auto Redirect jika status berubah
        if (data.booking.status === 'PAID') {
            router.push(`/booking/success?booking_id=${bookingId}`);
        } else if (['EXPIRED', 'CANCELLED'].includes(data.booking.status)) {
            router.push(`/booking/failed?booking_id=${bookingId}`);
        }
        // Jika PENDING, tetap di sini dan tampilkan detail
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) checkStatus();
  }, [bookingId]);

  const handleCancel = async () => {
    if (!confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) return;
    setCancelling(true);
    try {
        const res = await fetch('/api/payment/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId })
        });
        if (res.ok) router.push(`/booking/failed?booking_id=${bookingId}`);
    } catch (e) {
        alert("Terjadi kesalahan sistem");
    } finally {
        setCancelling(false);
    }
  };

  const copyToClipboard = () => {
    if (booking) {
      navigator.clipboard.writeText(booking.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!bookingId) return null;

  return (
    <main className="min-h-screen bg-[#EFF1F0] pt-32 pb-20 px-4 font-sans flex items-start justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* KOLOM KIRI: Status & Aksi Pembayaran */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 order-2 lg:order-1 h-fit sticky top-32">
            
            {/* Status Header */}
            <div className="bg-yellow-50 p-8 text-center border-b border-yellow-100">
                <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full animate-pulse"></div>
                    <Loader2 className="w-14 h-14 text-yellow-600 animate-spin relative z-10 mx-auto" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-yellow-800">Menunggu Pembayaran</h1>
                <p className="text-sm text-yellow-700 mt-2 leading-relaxed px-4">
                  Selesaikan transaksi Anda pada tab pembayaran yang baru saja dibuka.
                </p>
            </div>

            <div className="p-8 space-y-6">
                {/* Booking ID Box */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                        <Info size={40} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Kode Booking Anda</p>
                    <div className="flex items-center justify-center gap-3">
                        <p className="font-mono font-bold text-3xl text-gray-800 tracking-wider">
                            {booking ? booking.id : "Loading..."}
                        </p>
                        <button 
                            onClick={copyToClipboard} 
                            className={`p-2.5 rounded-xl transition-all active:scale-90 shadow-sm border ${
                                copied ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-400 border-gray-200 hover:text-tembi'
                            }`}
                            title="Copy ID"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                {/* Reminder Box */}
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3 animate-in slide-in-from-bottom-2">
                    <AlertTriangle className="text-orange-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-orange-800 leading-relaxed">
                        <p className="font-bold mb-1">Penting: Simpan Kode Booking Anda!</p>
                        <p>Harap catat atau ambil <span className="underline">tangkapan layar (screenshot)</span> halaman ini. Anda memerlukan kode di atas untuk mengecek status pesanan jika tab tertutup.</p>
                    </div>
                </div>

                {/* Action Buttons */}
                {booking && (
                    <div className="space-y-3 pt-2">
                        <a href={booking.xenditInvoiceUrl} target="_blank" rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
                            <ExternalLink size={18} /> Buka Halaman Pembayaran
                        </a>
                        <button onClick={checkStatus} disabled={loading}
                            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-colors active:scale-[0.98]">
                            <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> 
                            {loading ? "Mengecek..." : "Cek Status Pembayaran"}
                        </button>
                        
                        <div className="text-center">
                            <button onClick={handleCancel} disabled={cancelling}
                                className="text-red-500 text-xs font-semibold hover:underline transition-colors mt-4">
                                {cancelling ? "Membatalkan..." : "Batalkan Pesanan Ini"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* KOLOM KANAN: Detail Pesanan (Preview) */}
        {booking && (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden order-1 lg:order-2">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="font-serif font-bold text-xl text-gray-900">Rincian Pesanan</h2>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Info Kamar */}
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Room Type</p>
                        <h3 className="text-xl font-bold text-tembi">{booking.roomName}</h3>
                    </div>

                    {/* Info Tamu */}
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Guest Detail</p>
                        <p className="font-semibold text-gray-800">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                        <p className="text-sm text-gray-500">{booking.customerPhone}</p>
                    </div>

                    {/* Jadwal */}
                    <div className="bg-gray-50 rounded-xl p-4 flex gap-4 border border-gray-100">
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">Check-in</p>
                            <p className="font-bold text-gray-800 text-sm">{format(new Date(booking.checkInDate), 'dd MMM yyyy')}</p>
                        </div>
                        <div className="w-[1px] bg-gray-200"></div>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 mb-1">Check-out</p>
                            <p className="font-bold text-gray-800 text-sm">{format(new Date(booking.checkOutDate), 'dd MMM yyyy')}</p>
                        </div>
                    </div>

                    {/* Rincian Harga Simple */}
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Duration</span>
                            <span className="font-medium">{booking.duration} Nights</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Guests</span>
                            <span className="font-medium">{booking.adults} Adults, {booking.children} Child</span>
                        </div>
                        
                        {/* Addons */}
                        {booking.breakfast > 0 && (
                            <div className="flex justify-between text-sm text-orange-600 bg-orange-50 p-2 rounded">
                                <span className="flex items-center gap-2"><Coffee size={14}/> Breakfast ({booking.breakfast}x)</span>
                                <span className="font-medium">Included</span>
                            </div>
                        )}
                        {booking.extraBed > 0 && (
                            <div className="flex justify-between text-sm text-green-600 bg-green-50 p-2 rounded">
                                <span className="flex items-center gap-2"><Bed size={14}/> Extra Bed ({booking.extraBed}x)</span>
                                <span className="font-medium">Included</span>
                            </div>
                        )}

                        <div className="border-t border-dashed border-gray-200 my-2 pt-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-700">Total</span>
                            <span className="font-bold text-xl text-tembi">{formatCurrency(booking.totalPrice)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </main>
  );
}
