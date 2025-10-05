// components/Navbar.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const { user } = useAuth();
  const handleLogout = () => signOut(auth);

  return (
    <nav className="bg-vorbase-gray/80 backdrop-blur-md border-b border-vorbase-gray-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-vorbase-violet-500">VOR</span>
              <span className="text-2xl font-light text-gray-400">BASE</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              {user && <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>}
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-400 hidden sm:block">Hi, {user.email}</span>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-gray-300 hover:text-white font-semibold py-2 px-4 transition-colors">Login</button>
                </Link>
                <Link href="/register">
                  <button className="bg-vorbase-violet-600 hover:bg-vorbase-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
                }
