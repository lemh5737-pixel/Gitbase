// pages/profile.js
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-vorbase-dark flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Akan di-redirect oleh useEffect
  }

  return (
    <>
      <Head>
        <title>Profil | VorBase</title>
      </Head>
      <div className="min-h-screen bg-vorbase-dark text-gray-200">
        <Navbar />
        <main className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-vorbase-gray p-8 rounded-xl shadow-2xl border border-vorbase-gray-light">
            <h1 className="text-3xl font-bold text-white mb-6">Profil Pengguna</h1>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg font-semibold text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">ID Pengguna (UID)</p>
                <p className="text-lg font-mono text-vorbase-violet-400 break-all">{user.uid}</p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/dashboard">
                <button className="bg-vorbase-violet-600 hover:bg-vorbase-violet-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Kembali ke Dashboard
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
