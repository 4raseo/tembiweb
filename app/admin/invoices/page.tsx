'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ Import useRouter

// Tipe data ringkas untuk list
interface BookingListItem {
  id: string;
  roomName: string;
  customerName: string;
  customerEmail: string;
  status: string;
  totalPrice: number;
  checkInDate: string;
  createdAt: string;
}

export default function AdminInvoicesPage() {
  const router = useRouter(); // ✅ Inisialisasi router
  const [bookings, setBookings] = useState<BookingListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch('/api/admin/invoices');
        const json = await res.json();
        if (json.success) setBookings(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  // ✅ Fungsi Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login'); // Redirect ke login
      router.refresh(); // Refresh untuk update middleware state
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const formatRupiah = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const formatDate = (dateStr: string) => 
    new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return <div className="p-8 pt-24">Loading data...</div>;

  return (
    <div className="p-8 pt-24"> {/* pt-24 agar tidak tertutup Header utama */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Transaksi</h1>
        
        {/* ✅ Tombol Logout Ditambahkan di Sini */}
        <button 
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Logout
        </button>
      </div>
      
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID / Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{booking.id.substring(0, 8)}...</div>
                  <div className="text-xs text-gray-500">{formatDate(booking.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                  <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.roomName}
                  <div className="text-xs">Check-in: {formatDate(booking.checkInDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {formatRupiah(booking.totalPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'PAID' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    href={`/admin/invoices/${booking.id}`} 
                    className="text-blue-600 hover:text-blue-900 border border-blue-200 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
