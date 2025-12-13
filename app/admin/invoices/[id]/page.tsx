'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // ✅ Tambahkan useParams
import Link from 'next/link';

interface BookingDetail {
  id: string;
  roomId: string;
  roomSlug: string;
  roomName: string;
  roomPrice: number;
  basePrice: number;
  serviceFee: number;
  tourismTax: number;
  totalPrice: number;
  checkInDate: string;
  checkOutDate: string;
  duration: number;
  adults: number;
  children: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string | null;
  customerCity: string | null;
  customerPostalCode: string | null;
  specialRequest: string | null;
  status: string;
  paymentMethod: string | null;
  xenditInvoiceId: string | null;
  xenditInvoiceUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// Hapus props { params } karena kita akan pakai hooks
export default function DetailInvoicePage() {
  const router = useRouter();
  const params = useParams(); // ✅ Gunakan hook useParams
  // Ambil ID dari params (pastikan tipe datanya string)
  const id = params?.id as string;

  const [data, setData] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Helper format
  const formatRupiah = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  
  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return '';
    return new Date(isoDate).toISOString().split('T')[0];
  };

  useEffect(() => {
    // Pastikan ID sudah ada sebelum fetch
    if (!id) return;

    async function fetchDetail() {
      try {
        const res = await fetch(`/api/admin/invoices/${id}`); // Gunakan ID dari hook
        const json = await res.json();
        if (json.success) setData(json.data);
        else alert(json.message);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !id) return;
    setSaving(true);
    
    try {
      const payload = {
        status: data.status,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress,
        customerCity: data.customerCity,
        customerPostalCode: data.customerPostalCode,
        specialRequest: data.specialRequest,
      };

      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) alert('Data berhasil disimpan!');
      else alert('Gagal menyimpan perubahan');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof BookingDetail, value: any) => {
    if (data) setData({ ...data, [field]: value });
  };

  if (loading || !data) return <div className="p-8 pt-24">Loading detail...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24"> 
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Detail Invoice</h1>
          <p className="text-sm text-gray-500">ID: {data.id}</p>
          <p className="text-xs text-gray-400">Dibuat: {new Date(data.createdAt).toLocaleString('id-ID')}</p>
        </div>
        <div className="flex gap-3">
          <button 
             type="button"
             onClick={() => router.back()} 
             className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded shadow-sm hover:bg-gray-50"
          >
            Kembali
          </button>
          
          {data.xenditInvoiceUrl && (
            <Link 
              href={data.xenditInvoiceUrl} 
              target="_blank" 
              className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 flex items-center gap-2"
            >
              <span>📄 Lihat Invoice Xendit</span>
            </Link>
          )}
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        
        {/* Section 1: Status & Pembayaran */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Status & Pembayaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Booking</label>
              <select 
                value={data.status} 
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
              <input 
                type="text" 
                value={data.paymentMethod || '-'} 
                readOnly 
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xendit ID</label>
              <input 
                type="text" 
                value={data.xenditInvoiceId || '-'} 
                readOnly 
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-xs text-gray-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Informasi Kamar & Tanggal (Read Only) */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 opacity-90">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 flex justify-between">
            <span>Detail Reservasi</span>
            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">Read-Only</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Kamar</label>
                <input type="text" value={data.roomName} readOnly className="w-full bg-gray-50 border border-gray-200 rounded p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Check-In</label>
                  <input type="date" value={formatDateForInput(data.checkInDate)} readOnly className="w-full bg-gray-50 border border-gray-200 rounded p-2" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Check-Out</label>
                  <input type="date" value={formatDateForInput(data.checkOutDate)} readOnly className="w-full bg-gray-50 border border-gray-200 rounded p-2" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Durasi</label>
                  <input type="text" value={`${data.duration} Malam`} readOnly className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-center" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Dewasa</label>
                  <input type="number" value={data.adults} readOnly className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-center" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Anak</label>
                  <input type="number" value={data.children} readOnly className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-center" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Rincian Biaya (Read Only) */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
           <h2 className="text-lg font-semibold mb-4 border-b pb-2">Rincian Keuangan</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga Kamar / Malam:</span>
                  <span className="font-medium">{formatRupiah(data.roomPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Harga Dasar:</span>
                  <span className="font-medium">{formatRupiah(data.basePrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee (5%):</span>
                  <span className="font-medium">{formatRupiah(data.serviceFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pajak Pariwisata:</span>
                  <span className="font-medium">{formatRupiah(data.tourismTax)}</span>
                </div>
              </div>
              <div className="flex items-center justify-end bg-blue-50 p-4 rounded-lg">
                <div className="text-right">
                  <p className="text-sm text-blue-600 font-bold uppercase">Total Pembayaran</p>
                  <p className="text-3xl font-extrabold text-blue-800">{formatRupiah(data.totalPrice)}</p>
                </div>
              </div>
           </div>
        </div>

        {/* Section 4: Data Tamu (Editable) */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Informasi Tamu (Editable)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                value={data.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                value={data.customerEmail}
                onChange={(e) => handleChange('customerEmail', e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">No. Telepon</label>
              <input 
                type="text" 
                value={data.customerPhone}
                onChange={(e) => handleChange('customerPhone', e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
               <label className="block text-sm font-medium mb-1">Special Request</label>
               <textarea 
                  value={data.specialRequest || ''} 
                  onChange={(e) => handleChange('specialRequest', e.target.value)}
                  rows={1}
                  className="w-full border border-gray-300 rounded p-2"
               />
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
                <label className="block text-xs text-gray-500 mb-1">Alamat</label>
                <input 
                   type="text" 
                   value={data.customerAddress || ''} 
                   onChange={(e) => handleChange('customerAddress', e.target.value)}
                   className="w-full border border-gray-300 rounded p-2 text-sm" 
                />
             </div>
             <div>
                <label className="block text-xs text-gray-500 mb-1">Kota</label>
                <input 
                   type="text" 
                   value={data.customerCity || ''} 
                   onChange={(e) => handleChange('customerCity', e.target.value)}
                   className="w-full border border-gray-300 rounded p-2 text-sm" 
                />
             </div>
             <div>
                <label className="block text-xs text-gray-500 mb-1">Kode Pos</label>
                <input 
                   type="text" 
                   value={data.customerPostalCode || ''} 
                   onChange={(e) => handleChange('customerPostalCode', e.target.value)}
                   className="w-full border border-gray-300 rounded p-2 text-sm" 
                />
             </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>

      </form>
    </div>
  );
}
