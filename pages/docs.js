// pages/docs.js
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vorbase Documentation</h1>
          <p className="text-xl text-gray-600">
            Panduan lengkap untuk menggunakan platform Vorbase dan API-nya.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Apa itu Vorbase?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Vorbase adalah platform database NoSQL. Setiap database yang Anda buat disimpan sebagai file JSON tunggal di repository, memberikan Anda kontrol penuh, versi control, dan aksesibilitas publik yang mudah.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ini adalah solusi yang ideal untuk proyek-proyek kecil, prototipe, atau aplikasi yang membutuhkan database sederhana tanpa harus mengatur server database yang kompleks.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Cara Kerjanya</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>
              <strong>Registrasi & Login:</strong> Buat akun GitBase untuk mengakses dashboard pribadi Anda.
            </li>
            <li>
              <strong>Buat Database:</strong> Dari dashboard, buat database baru dengan nama dan password unik. Ini akan membuat file `.json` baru di repository GitHub Anda.
            </li>
            <li>
              <strong>Interaksi via API:</strong> Gunakan REST API kami untuk menambah, membaca, atau memperbarui data dalam database Anda secara langsung dari aplikasi Anda.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Referensi API</h2>
          <p className="text-gray-600 mb-6">
            Gunakan endpoint berikut untuk berinteraksi dengan database Anda. Semua request harus menggunakan metode <code className="bg-gray-200 px-2 py-1 rounded text-sm">POST</code> dan body dalam format JSON.
          </p>

          {/* Endpoint Create */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gitbase-blue mb-2">POST /api/create</h3>
            <p className="text-gray-600 mb-4">Membuat file database baru di repository GitHub Anda.</p>
            <h4 className="font-semibold mb-2">Request Body:</h4>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <code>{`{
  "dbName": "nama_database_anda",
  "dbPassword": "password_database_anda",
  "ownerEmail": "email_anda@example.com"
}`}</code>
            </pre>
            <h4 className="font-semibold mt-4 mb-2">Contoh Respons:</h4>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{`{
  "message": "Database 'nama_database_anda' created successfully!"
}`}</code>
            </pre>
          </div>

          {/* Endpoint Add */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gitbase-blue mb-2">POST /api/add</h3>
            <p className="text-gray-600 mb-4">Menambahkan atau memperbarui pasangan key-value dalam database Anda. Jika key sudah ada, nilainya akan ditimpa.</p>
            <h4 className="font-semibold mb-2">Request Body:</h4>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <code>{`{
  "db": "nama_database_anda",
  "password": "password_database_anda",
  "key": "users.001", // Bisa bersarang dengan titik
  "value": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}</code>
            </pre>
            <h4 className="font-semibold mt-4 mb-2">Contoh Respons:</h4>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{`{
  "message": "Data added successfully"
}`}</code>
            </pre>
          </div>

          {/* Endpoint Read */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gitbase-blue mb-2">POST /api/read</h3>
            <p className="text-gray-600 mb-4">Membaca data dari database Anda. Anda bisa membaca seluruh isi database atau hanya key tertentu.</p>
            <h4 className="font-semibold mb-2">Request Body (Membaca Key Tertentu):</h4>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <code>{`{
  "db": "nama_database_anda",
  "password": "password_database_anda",
  "key": "users.001"
}`}</code>
            </pre>
            <h4 className="font-semibold mb-2">Request Body (Membaca Semua Data):</h4>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <code>{`{
  "db": "nama_database_anda",
  "password": "password_database_anda"
}`}</code>
            </pre>
            <h4 className="font-semibold mt-4 mb-2">Contoh Respons:</h4>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{`{
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Siap untuk Memulai?</h2>
          <p className="text-gray-600 mb-6">Buat akun Anda sekarang dan mulai membangun dengan GitBase.</p>
          <Link href="/register">
            <button className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg">
              Daftar Sekarang
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
    }
