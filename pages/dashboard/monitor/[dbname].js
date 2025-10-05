// pages/dashboard/monitor/[dbname].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import ReactJson from 'react18-json-view';

// Komponen untuk menampilkan status
const StatusCard = ({ title, value, unit }) => (
  <div className="bg-vorbase-gray/50 p-4 rounded-lg border border-vorbase-gray-light">
    <p className="text-xs text-gray-400 uppercase tracking-wider">{title}</p>
    <p className="text-2xl font-bold text-vorbase-violet-400">{value} <span className="text-sm font-normal text-gray-400">{unit}</span></p>
  </div>
);

export default function MonitorPage() {
  const router = useRouter();
  const { dbname } = router.query;
  const [password, setPassword] = useState('');
  const [dbData, setDbData] = useState(null);
  const [dbMeta, setDbMeta] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFetchData = async (e) => {
    e.preventDefault();
    setIsLoading(true); setError('');
    const res = await fetch('/api/get-db-content', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ db: dbname, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setDbData(data.data);
      setDbMeta(data.meta);
      setIsAuthenticated(true);
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };
  
  if (!dbname) return <p>Loading...</p>;

  return (
    <>
      <Head><title>Monitor {dbname} | VorBase</title></Head>
      <div className="min-h-screen bg-vorbase-dark text-gray-200">
        <Navbar />
        <main className="max-w-7xl mx-auto py-8 px-4">
          {!isAuthenticated ? (
            <div className="max-w-lg mx-auto mt-20">
              <div className="bg-vorbase-gray p-8 rounded-xl shadow-2xl border border-vorbase-gray-light">
                <h2 className="text-2xl font-semibold mb-6 text-white text-center">Masukkan Password Database</h2>
                <form onSubmit={handleFetchData} className="space-y-6">
                  <input
                    type="password" placeholder="Password Database" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-vorbase-dark border border-vorbase-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-vorbase-violet-500"
                    required
                  />
                  <button type="submit" disabled={isLoading} className="w-full bg-vorbase-violet-600 hover:bg-vorbase-violet-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-colors">
                    {isLoading ? 'Memuat...' : 'Buka Database'}
                  </button>
                  {error && <p className="text-red-400 text-center">{error}</p>}
                </form>
              </div>
            </div>
          ) : (
            <div>
              {/* Header & Status Penggunaan */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-white">Monitor: <span className="text-vorbase-violet-400">{dbname}</span></h1>
                  <p className="text-gray-400 text-sm mt-1">Terakhir diperbarui: {new Date(dbMeta?.lastModified).toLocaleString()}</p>
                </div>
                <button onClick={() => { setIsAuthenticated(false); setDbData(null); setPassword(''); }} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Ganti Database
                </button>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatusCard title="Ukuran Database" value={(dbMeta?.size / 1024).toFixed(2)} unit="KB" />
                <StatusCard title="Jumlah Key Utama" value={dbData ? Object.keys(dbData).length : 0} unit="items" />
                <StatusCard title="Tipe Data" value="JSON" unit="" />
                <StatusCard title="Status" value="Aktif" unit="✅" />
              </div>

              {/* JSON Viewer */}
              <div className="bg-vorbase-gray p-6 rounded-xl shadow-2xl border border-vorbase-gray-light">
                <h2 className="text-xl font-semibold mb-4 text-white">Isi Database</h2>
                {dbData ? (
                  <div style={{ overflow: 'auto' }} className="bg-vorbase-dark p-4 rounded-lg">
                    <ReactJson src={dbData} theme="rjv-default" collapsed={false} />
                  </div>
                ) : (
                  <p className="text-gray-500">Database ini kosong.</p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
  }
