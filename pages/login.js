// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { auth } from '../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head><title>Login | VorBase</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-vorbase-dark via-vorbase-gray to-vorbase-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Masuk ke Akun Anda</h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Atau{' '}
              <Link href="/register" className="font-medium text-vorbase-violet-400 hover:text-vorbase-violet-300">
                buat akun baru
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-vorbase-gray p-8 rounded-xl shadow-2xl border border-vorbase-gray-light">
              {error && <p className="text-red-400 text-center mb-4">{error}</p>}
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-4 py-3 bg-vorbase-dark border border-vorbase-gray-light placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vorbase-violet-500 focus:border-transparent sm:text-sm"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-4 py-3 bg-vorbase-dark border border-vorbase-gray-light placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vorbase-violet-500 focus:border-transparent sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-vorbase-violet-600 hover:bg-vorbase-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vorbase-violet-500 disabled:opacity-50 transition-all"
                >
                  {isLoading ? 'Memuat...' : 'Masuk'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
                      }
