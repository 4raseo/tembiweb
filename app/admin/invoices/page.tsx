// app/admin/invoices/page.tsx (Contoh sederhana)
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Definisikan tipe data Booking yang akan diambil
interface Booking {
  id: string;
  roomName: string;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  duration: number;
  xenditInvoiceUrl: string | null;
  createdAt: string;
}

export default function AdminInvoicesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const response = await fetch('/api/admin/invoices');
        const result = await response.json();

        if (result.success) {
          setBookings(result.data);
        } else {
          setError(result.message || 'Gagal mengambil data invoice.');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat koneksi ke server.');
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, []);

  if (loading) return <div className="p-8">Memuat data...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  
  // Catatan: Anda perlu mengganti format mata uang dan tanggal sesuai kebutuhan
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Daftar Invoice</h1>
      
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Booking</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kamar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Check-In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                  <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.roomName} ({booking.duration} malam)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(booking.checkInDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                  {formatRupiah(booking.totalPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'PAID' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`
                  }>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {booking.xenditInvoiceUrl ? (
                    <Link href={booking.xenditInvoiceUrl} target="_blank" className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Lihat Invoice
                    </Link>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                  {/* Tambahkan link ke halaman detail booking jika ada */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="mt-4 text-sm text-gray-600">
        Menampilkan {bookings.length} data.
      </p>
    </div>
  );
}
