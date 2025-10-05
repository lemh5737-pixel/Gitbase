import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          GitBase: Database Anda di GitHub
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Platform database NoSQL yang menggunakan repository GitHub sebagai backendnya. Simpan data Anda sebagai file JSON dengan mudah dan aman.
        </p>
        <Link href="/login">
          <button className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg">
            Get Started
          </button>
        </Link>
      </main>
    </div>
  );
}
