// components/Navbar.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Dropdown from './Dropdown'; // Impor komponen Dropdown

// Komponen untuk ikon segitiga (chevron down)
const ChevronDownIcon = () => (
  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export default function Navbar() {
  const { user } = useAuth();
  const handleLogout = () => signOut(auth);

  return (
    <nav className="bg-vorbase-gray/80 backdrop-blur-md border-b border-vorbase-gray-light sticky top-0 z-40">
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
              // --- GUNAKAN DROPDOWN DI SINI ---
              <Dropdown
                trigger={
                  <button className="flex items-center text-gray-300 hover:text-white font-semibold py-2 px-4 transition-colors">
                    <span className="hidden sm:block">Hi, {user.email}</span>
                    <span className="sm:hidden">Akun</span>
                    <ChevronDownIcon />
                  </button>
                }
              >
                {/* Item Menu di dalam Dropdown */}
                <div className="px-4 py-2 text-xs text-gray-500">Dilogin sebagai</div>
                <div className="px-4 py-2 text-sm text-gray-300 truncate border-b border-vorbase-gray-light">{user.email}</div>
                
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-vorbase-gray-light hover:text-white">
                  👤 Profil Saya
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-vorbase-gray-light hover:text-red-300"
                >
                  🚪 Logout
                </button>
              </Dropdown>
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
