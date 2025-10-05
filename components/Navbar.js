// components/Navbar.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Navbar() {
  // Mengambil status user dari context Firebase
  const { user } = useAuth();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Bagian Kiri: Logo dan Link Navigasi Utama */}
          <div className="flex space-x-8 items-center">
            <Link href="/" className="text-xl font-bold text-gitbase-blue">
              GitBase
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gitbase-blue transition-colors">
              Home
            </Link>
            
            {/* Link Dashboard hanya muncul jika user sudah login */}
            {user && (
              <Link href="/dashboard" className="text-gray-700 hover:text-gitbase-blue transition-colors">
                Dashboard
              </Link>
            )}
            
            <Link href="/docs" className="text-gray-700 hover:text-gitbase-blue transition-colors">
              Docs
            </Link>
          </div>

          {/* Bagian Kanan: Aksi User (Login/Register atau Logout) */}
          <div className="flex items-center">
            {user ? (
              // --- JIKA USER SUDAH LOGIN ---
              <>
                <span className="mr-4 text-gray-700">Hi, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              // --- JIKA USER BELUM LOGIN ---
              <div className="space-x-2">
                <Link href="/login">
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
              }
