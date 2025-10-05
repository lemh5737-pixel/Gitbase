import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8 items-center">
            <Link href="/" className="text-xl font-bold text-gitbase-blue">
              GitBase
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gitbase-blue">Home</Link>
            {session && <Link href="/dashboard" className="text-gray-700 hover:text-gitbase-blue">Dashboard</Link>}
            <Link href="/docs" className="text-gray-700 hover:text-gitbase-blue">Docs</Link>
          </div>
          <div className="flex items-center">
            {status === 'loading' && <p>Loading...</p>}
            {session ? (
              <>
                <span className="mr-4 text-gray-700">Hi, {session.user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
    }
