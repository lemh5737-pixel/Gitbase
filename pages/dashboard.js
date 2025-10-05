import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [databases, setDatabases] = useState([]);
  const [dbName, setDbName] = useState('');
  const [dbPassword, setDbPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
    } else {
      fetchDatabases();
    }
  }, [user, loading, router]);

  const fetchDatabases = async () => {
    const res = await fetch('/api/list-databases');
    if (res.ok) {
      const data = await res.json();
      setDatabases(data);
    }
  };

  const handleCreateDb = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dbName, dbPassword, ownerEmail: user.email }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      setDbName('');
      setDbPassword('');
      fetchDatabases();
    }
    setIsLoading(false);
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Kelola semua database Anda di sini.</p>
        
        {/* Create Database Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Buat Database Baru</h2>
          <form onSubmit={handleCreateDb} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Nama Database"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password Database"
              value={dbPassword}
              onChange={(e) => setDbPassword(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
              required
            />
            <button type="submit" disabled={isLoading} className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded disabled:opacity-50">
              {isLoading ? 'Membuat...' : 'Buat'}
            </button>
          </form>
          {message && <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </div>

        {/* Database List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Database Anda</h2>
          {databases.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
              Anda belum memiliki database. Buat satu untuk memulai!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {databases.map((db) => (
                <div key={db.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{db.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{db.name}.json</p>
                  <div className="flex flex-col space-y-2">
                    <Link href={`/dashboard/monitor/${db.name}`}>
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm">
                        📊 Monitor
                      </button>
                    </Link>
                    <Link href={`/docs/${db.name}`}>
                      <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded text-sm">
                        📖 Lihat Docs
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
      }
