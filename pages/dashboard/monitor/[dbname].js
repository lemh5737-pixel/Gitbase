// pages/dashboard/monitor/[dbname].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import ReactJson from 'react18-json-view';

// Komponen StatusCard (tidak berubah)
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

  // --- State untuk Fitur Edit & Copy ---
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('📋 Copy');
  const [isSaving, setIsSaving] = useState(false);

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

  // --- Fungsi untuk Fitur Copy ---
  const handleCopy = () => {
    const jsonString = JSON.stringify(dbData, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopyButtonText('✅ Copied!');
      setTimeout(() => setCopyButtonText('📋 Copy'), 2000);
    });
  };

  // --- Fungsi untuk Fitur Edit ---
  const handleEdit = () => {
    setEditContent(JSON.stringify(dbData, null, 2));
    setIsEditing(true);
    setError('');
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    setError('');
    try {
      const newData = JSON.parse(editContent); // Validasi JSON
      const res = await fetch('/api/update-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ db: dbname, password, newData }),
      });
      const result = await res.json();
      if (res.ok) {
        setDbData(newData);
        setIsEditing(false);
      } else {
        setError(result.message);
      }
    } catch (e) {
      setError('JSON tidak valid. Periksa kembali sintaks Anda. ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent('');
    setError('');
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
                  <input type="password" placeholder="Password Database" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-vorbase-dark border border-vorbase-gray-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-vorbase-violet-500" required />
                  <button type="submit" disabled={isLoading} className="w-full bg-vorbase-violet-600 hover:bg-vorbase-violet-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-colors">
                    {isLoading ? 'Memuat...' : 'Buka Database'}
                  </button>
                  {error && <p className="text-red-400 text-center">{error}</p>}
                </form>
              </div>
            </div>
          ) : (
            <div>
              {/* Header & Status Cards (tidak berubah) */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-white">Monitor: <span className="text-vorbase-violet-400">{dbname}</span></h1>
                  <p className="text-gray-400 text-sm mt-1">Terakhir diperbarui: {new Date(dbMeta?.lastModified).toLocaleString()}</p>
                </div>
                <button onClick={() => { setIsAuthenticated(false); setDbData(null); setPassword(''); }} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Ganti Database
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatusCard title="Ukuran Database" value={(dbMeta?.size / 1024).toFixed(2)} unit="KB" />
                <StatusCard title="Jumlah Key Utama" value={dbData ? Object.keys(dbData).length : 0} unit="items" />
                <StatusCard title="Tipe Data" value="JSON" unit="" />
                <StatusCard title="Status" value="Aktif" unit="✅" />
              </div>

              {/* --- TAMPILAN DATABASE (VIEW / EDIT MODE) --- */}
              <div className="bg-vorbase-gray p-6 rounded-xl shadow-2xl border border-vorbase-gray-light">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Isi Database</h2>
                  {/* Tombol Aksi */}
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">Batal</button>
                        <button onClick={handleSaveEdit} disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm disabled:opacity-50 transition-colors">
                          {isSaving ? 'Menyimpan...' : 'Simpan'}
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleCopy} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">{copyButtonText}</button>
                        <button onClick={handleEdit} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">✏️ Edit</button>
                      </>
                    )}
                  </div>
                </div>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                {/* Tampilan Berdasarkan Mode */}
                {isEditing ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 p-4 bg-vorbase-dark border border-vorbase-gray-light rounded-lg text-white font-mono text-sm focus:outline-none focus:border-vorbase-violet-500"
                  />
                ) : (
                  <div style={{ overflow: 'auto' }} className="bg-vorbase-dark p-4 rounded-lg">
                    {dbData ? <ReactJson src={dbData} theme="rjv-default" collapsed={false} /> : <p className="text-gray-500">Database ini kosong.</p>}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
            }
