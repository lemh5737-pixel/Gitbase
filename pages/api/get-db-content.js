// pages/api/get-db-content.js
import { Octokit } from '@octokit/rest';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { db, password } = req.body;
  const path = `${db}.json`;
  try {
    const { data: file } = await octokit.rest.repos.getContent({
      owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO, path,
    });
    const dbContent = JSON.parse(Buffer.from(file.content, 'base64').toString('utf-8'));
    if (dbContent.meta.password !== password) return res.status(401).json({ message: 'Password database salah' });
    
    // Kirim juga metadata file
    res.status(200).json({ 
      data: dbContent.data, 
      meta: {
        size: file.size, // Ukuran file dalam bytes
        sha: file.sha,
        lastModified: new Date().toISOString() // Waktu akses terakhir
      }
    });
  } catch (error) {
    console.error(error);
    if (error.status === 404) res.status(404).json({ message: 'Database tidak ditemukan' });
    else res.status(500).json({ message: 'Gagal membaca data' });
  }
}
