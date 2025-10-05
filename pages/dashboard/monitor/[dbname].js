// pages/dashboard/monitor/[dbname].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import ReactJson from 'react18-json-view';

export default function MonitorPage() {
  const router = useRouter();
  const { dbname } = router.query;

  const [password, setPassword] = useState('');
  const [dbData, setDbData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFetchData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await fetch('/api/get-db-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ db: dbname, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setDbData(data.data);
      setIsAuthenticated(true);
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };

  if (!dbname) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Monitor Database: <span className="text-gitbase-blue">{dbname}</span></h1>
        
        {!isAuthenticated ? (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Masukkan Password Database</h2>
            <form onSubmit={handleFetchData} className="flex gap-4">
              <input
                type="password"
                placeholder="Password Database"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded"
                required
              />
              <button type="submit" disabled={isLoading} className="bg-gitbase-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded disabled:opacity-50">
                {isLoading ? 'Memuat...' : 'Buka'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Isi Database</h2>
              <button 
                onClick={() => { setIsAuthenticated(false); setDbData(null); setPassword(''); }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded text-sm"
              >
                Ganti Database
              </button>
            </div>
            {dbData ? (
              <div style={{ overflow: 'auto' }}>
                {/* 🔥 PERUBAHAN ADA DI BARIS INI */}
                <ReactJson src={dbData} theme="rjv-default" collapsed={false} />
              </div>
            ) : (
              <p className="text-gray-500">Database ini kosong.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
                  }
