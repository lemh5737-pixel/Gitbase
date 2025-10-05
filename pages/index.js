// pages/index.js
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>VorBase: Vortex Database</title>
        <meta name="description" content="Platform database NoSQL yang menggunakan repository GitHub sebagai backendnya." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-vorbase-dark via-vorbase-gray to-vorbase-dark">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-vorbase-violet-400 to-vorbase-violet-600 bg-clip-text text-transparent">
                VorBase
              </span>
              <br />
              <span className="text-4xl md:text-6xl text-gray-400">Vortex Database</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Platform database NoSQL yang revolusioner. Manajemen data Anda disimpan langsung di Database Vortex, memberikan kontrol, versi, dan aksesibilitas tanpa batas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="w-full sm:w-auto bg-vorbase-violet-600 hover:bg-vorbase-violet-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105">
                  Mulai Sekarang
                </button>
              </Link>
              <Link href="/docs">
                <button className="w-full sm:w-auto bg-transparent border-2 border-vorbase-violet-600 text-vorbase-violet-400 hover:bg-vorbase-violet-600 hover:text-white font-bold py-3 px-8 rounded-lg text-lg transition-all">
                  Baca Dokumentasi
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
    }
