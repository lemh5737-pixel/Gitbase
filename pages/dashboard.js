// pages/dashboard.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [databases, setDatabases] = useState([]);
  const [dbName, setDbName] = useState('');
  const [dbPassword, setDbPassword] = useState('');
  const [dbType, setDbType] = useState('blank'); // 'blank' atau 'auth'
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user) router.push('/login');
    else fetchDatabases();
  }, [user, loading, router]);

  const fetchDatabases = async () => {
    const res = await fetch('/api/list-databases');
    if (res.ok) setDatabases(await res.json());
  };

  const handleCreateDb = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dbName, dbPassword, dbType, ownerEmail: user.email }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      setDbName(''); setDbPassword(''); setDbType('blank');
      fetchDatabases();
    }
    setIsLoading(false);
  };
  
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Head><title>Dashboard | VorBase</title></Head>
      <div className="min-h-screen bg-vorbase-dark text-gray-200">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 mb-8">Kelola database Vortex Anda.</p>
          
          {/* Create Database Form */}
          <div className="bg-vorbase-gray p-6 rounded-xl shadow-2xl mb-8 border border-vorbase-gray-light">
            <h2 className="text-2xl font-semibold mb-4 text-white">Buat Database Baru</h2>
            <form onSubmit={handleCreateDb} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Nama Database" value={dbName} onChange={(e) => setDbName(e.target.value)} className="flex-grow p-3 bg-vorbase-dark border border-vorbase-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-vorbase-violet-500" required />
                <input type="password" placeholder="Password Database" value={dbPassword} onChange={(e) => setDbPassword(e.target.value)} className="flex-grow p-3 bg-vorbase-dark border border-vorbase-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-vorbase-violet-500" required />
              </div>
              
              {/* Template Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pilih Template</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${dbType === 'blank' ? 'border-vorbase-violet-500 bg-vorbase-violet-500/10' : 'border-vorbase-gray-light bg-vorbase-dark'}`}>
                    <input type="radio" name="dbType" value="blank" checked={dbType === 'blank'} onChange={(e) => setDbType(e.target.value)} className="sr-only" />
                    <div className="text-center">
                      <div className="text-2xl mb-1">📄</div>
                      <span className="font-semibold">Blank</span>
                      <p className="text-xs text-gray-400">Database kosong</p>
                    </div>
                  </label>
                  <label className={`relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${dbType === 'auth' ? 'border-vorbase-violet-500 bg-vorbase-violet-500/10' : 'border-vorbase-gray-light bg-vorbase-dark'}`}>
                    <input type="radio" name="dbType" value="auth" checked={dbType === 'auth'} onChange={(e) => setDbType(e.target.value)} className="sr-only" />
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔐</div>
                      <span className="font-semibold">Authentication</span>
                      <p className="text-xs text-gray-400">Struktur autentikasi siap pakai</p>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-vorbase-violet-600 hover:bg-vorbase-violet-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-colors">
                {isLoading ? 'Membuat...' : 'Buat Database'}
              </button>
            </form>
            {message && <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
          </div>

          {/* Database List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Database Anda</h2>
            {databases.length === 0 ? (
              <div className="bg-vorbase-gray p-6 rounded-xl text-center text-gray-500 border border-vorbase-gray-light">
                Anda belum memiliki database. Buat satu untuk memulai!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {databases.map((db) => (
                  <div key={db.name} className="bg-vorbase-gray p-6 rounded-xl shadow-xl border border-vorbase-gray-light hover:border-vorbase-violet-500/50 transition-all">
                    <h3 className="text-xl font-bold text-white mb-2">{db.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{db.name}.json</p>
                    <div className="flex flex-col space-y-2">
                      <Link href={`/dashboard/monitor/${db.name}`}>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">📊 Monitor</button>
                      </Link>
                      <Link href={`/docs/${db.name}`}>
                        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">📖 Lihat Docs</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
                }
