// pages/dashboard.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
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
    if (loading) return; // Tunggu hingga status loading selesai
    if (!user) {
      router.push('/login');
    } else {
      fetchDatabases();
    }
  }, [user, loading, router]);

  // ... (sisanya kode sama seperti sebelumnya)
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
    // ... (return JSX-nya sama persis seperti sebelumnya)
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Database</h2>
          <form onSubmit={handleCreateDb} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Database Name"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Database Password"
              value={dbPassword}
              onChange={(e) => setDbPassword(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
              required
            />
            <button type="submit" disabled={isLoading} className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded disabled:opacity-50">
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </form>
          {message && <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Databases</h2>
          {databases.length === 0 ? (
            <p className="text-gray-500">You haven't created any databases yet.</p>
          ) : (
            <ul className="space-y-3">
              {databases.map((db) => (
                <li key={db.name} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-100">
                  <span className="font-medium">{db.name}.json</span>
                  <Link href={`/docs/${db.name}`}>
                    <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-4 rounded text-sm">
                      View Docs
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
                                             }
