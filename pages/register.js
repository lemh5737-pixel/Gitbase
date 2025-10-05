// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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
      // 1. Buat user di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. (Opsional tapi direkomendasikan) Buat dokumen profil user di Firestore
      // Ini berguna jika Anda ingin menyimpan data tambahan tentang user
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      // 3. Arahkan user ke halaman login setelah registrasi berhasil
      router.push('/login?message=registration-success');
    } catch (err) {
      // Tangani error (misal: email sudah terdaftar, password terlalu lemah)
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Buat Akun Baru</h2>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password (minimal 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-6"
            required
            minLength={6}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-2 rounded disabled:opacity-50"
          >
            {isLoading ? 'Mendaftar...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
              }
