// components/Navbar.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8 items-center">
            <Link href="/" className="text-xl font-bold text-gitbase-blue">
              GitBase
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gitbase-blue">Home</Link>
            {user && <Link href="/dashboard" className="text-gray-700 hover:text-gitbase-blue">Dashboard</Link>}
            <Link href="/docs" className="text-gray-700 hover:text-gitbase-blue">Docs</Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <span className="mr-4 text-gray-700">Hi, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              // --- PERUBAHAN DIMULAI DI SINI ---
              // Menampilkan dua tombol: Login dan Register
              <div className="space-x-2">
                <Link href="/login">
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Register
                  </button>
                </Link>
              </div>
              // --- PERUBAHAN BERAKHIR DI SINI ---
            )}
          </div>
        </div>
      </div>
    </nav>
  );
    }
