// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { auth, db } from '../lib/firebase';

export default function Register() {
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
      // 1. Buat user baru di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. (Opsional) Simpan data profil user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      // 3. Arahkan ke halaman login dengan pesan sukses
      router.push('/login?message=success');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | VorBase</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-vorbase-dark via-vorbase-gray to-vorbase-dark flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Navbar />
        
        {/* Header untuk Desktop dan Mobile */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Buat Akun Baru
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Atau{' '}
            <Link href="/login" className="font-medium text-vorbase-violet-400 hover:text-vorbase-violet-300">
              masuk ke akun yang ada
            </Link>
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-vorbase-gray py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-vorbase-gray-light">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Pesan Error */}
              {error && <p className="text-red-400 text-center text-sm">{error}</p>}
              
              {/* Input Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none block w-full px-3 py-2 bg-vorbase-dark border border-vorbase-gray-light placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vorbase-violet-500 focus:border-transparent"
                  placeholder="anda@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Input Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="mt-1 appearance-none block w-full px-3 py-2 bg-vorbase-dark border border-vorbase-gray-light placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vorbase-violet-500 focus:border-transparent"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Tombol Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-vorbase-violet-600 hover:bg-vorbase-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vorbase-violet-500 disabled:opacity-50 transition-all"
                >
                  {isLoading ? 'Mendaftar...' : 'Daftar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
    }
