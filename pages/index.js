// pages/index.js
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          VorBase: Vortex Database 
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Platform database NoSQL. Simpan data Anda sebagai file JSON dengan mudah dan aman.
        </p>
        
        {/* --- PERUBAHAN DIMULAI DI SINI --- */}
        {/* Menampilkan dua tombol: Register dan Login */}
        <div className="space-x-4">
          <Link href="/register">
            <button className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg">
              Register
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-transparent border-2 border-gitbase-blue text-gitbase-blue hover:bg-blue-50 font-bold py-3 px-8 rounded-lg text-lg">
              Login
            </button>
          </Link>
        </div>
        {/* --- PERUBAHAN BERAKHIR DI SINI --- */}
        
      </main>
    </div>
  );
}
