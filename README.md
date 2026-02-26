# Tembiweb

Tembiweb adalah aplikasi web modern yang dibangun dengan **Next.js 15**, **TypeScript**, dan **Tailwind CSS**. Proyek ini dilengkapi dengan sistem manajemen database menggunakan **Prisma** dan integrasi pembayaran melalui **Xendit**.

## 🚀 Fitur Utama

* **Next.js 15 (App Router):** Menggunakan fitur terbaru Next.js dengan dukungan Turbopack untuk performa pengembangan yang lebih cepat.
* **Integrasi Database:** Menggunakan **Prisma ORM** dengan adapter PostgreSQL (`pg`) untuk pengelolaan data yang aman dan efisien.
* **Sistem Pembayaran:** Integrasi dengan **Xendit SDK** (`xendit-node`) untuk menangani transaksi pembayaran.
* **Ekspor PDF:** Kemampuan untuk membuat dokumen PDF secara dinamis menggunakan `jspdf` dan `jspdf-autotable`.
* **UI & Styling:** Dibangun dengan **Tailwind CSS** dan ikon dari **Lucide React** serta **React Icons**.
* **Manajemen Tanggal:** Pengolahan waktu dan tanggal yang presisi menggunakan `date-fns` dan `react-day-picker`.

## 🛠️ Tech Stack

### Framework & Library Inti

* **Framework:** Next.js 15.5.3
* **Language:** TypeScript
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **Database:** Prisma (PostgreSQL)

### Dependensi Utama

* `xendit-node`: Integrasi Payment Gateway.
* `jspdf` & `jspdf-autotable`: Pembuatan laporan PDF.
* `lucide-react` & `react-icons`: Library ikon.
* `date-fns`: Utilitas manipulasi tanggal.

## 🏁 Memulai Pengembangan

### 1. Clone Repository

```bash
git clone https://github.com/username/tembiweb.git
cd tembiweb

```

### 2. Instalasi Dependensi

Gunakan npm atau yarn untuk menginstal library yang diperlukan:

```bash
npm install

```

### 3. Konfigurasi Database (Prisma)

Pastikan kamu sudah mengatur file `.env` untuk koneksi database, lalu jalankan:

```bash
npx prisma generate

```

### 4. Menjalankan Server Pengembangan

Proyek ini menggunakan **Turbopack** untuk pengalaman development yang lebih responsif:

```bash
npm run dev

```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda.

## 📜 Script Tersedia

* `npm run dev`: Menjalankan aplikasi dalam mode pengembangan dengan Turbopack.
* `npm run build`: Membuat build produksi aplikasi.
* `npm run start`: Menjalankan aplikasi hasil build produksi.
* `npm run lint`: Menjalankan ESLint untuk mengecek kualitas kode.
