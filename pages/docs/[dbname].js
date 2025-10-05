import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function DocsPage() {
  const router = useRouter();
  const { dbname } = router.query;
  const [apiKey, setApiKey] = useState(`{ "db": "${dbname}", "password": "YOUR_DB_PASSWORD" }`);

  if (!dbname) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">API Documentation for: <span className="text-gitbase-blue">{dbname}</span></h1>
        <p className="text-gray-600 mb-8">Use the following endpoints to interact with your database.</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add Data</h2>
          <p className="mb-4">Adds a new key-value pair to your database. If the key already exists, it will be overwritten.</p>
          <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">POST /api/add</p>
          </div>
          <h3 className="font-semibold mb-2">Request Body:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`{
  "db": "${dbname}",
  "password": "YOUR_DB_PASSWORD",
  "key": "users.001", // Can be nested with dots
  "value": { "name": "John Doe", "age": 30 }
}`}</code>
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Read Data</h2>
          <p className="mb-4">Reads a specific key or the entire database from your database.</p>
          <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">POST /api/read</p>
          </div>
          <h3 className="font-semibold mb-2">Request Body:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`// To read a specific key
{
  "db": "${dbname}",
  "password": "YOUR_DB_PASSWORD",
  "key": "users.001"
}

// To read the whole database
{
  "db": "${dbname}",
  "password": "YOUR_DB_PASSWORD"
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
