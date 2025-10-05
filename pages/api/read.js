// pages/api/read.js
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { db, password, key } = req.body;
  const path = `${db}.json`;

  try {
    // 1. Ambil file menggunakan GitHub REST API (sama seperti di api/add.js)
    const { data: file } = await octokit.rest.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
    });

    // 2. Dekode konten file dari base64
    const content = Buffer.from(file.content, 'base64').toString('utf-8');
    const dbContent = JSON.parse(content);

    // 3. Verifikasi password database
    if (dbContent.meta.password !== password) {
      return res.status(401).json({ message: 'Invalid database password' });
    }

    // 4. Kembalikan data yang diminta
    if (key) {
      const keys = key.split('.');
      let result = dbContent.data;
      for (const k of keys) {
        result = result?.[k];
      }
      res.status(200).json({ data: result });
    } else {
      res.status(200).json({ data: dbContent.data });
    }
  } catch (error) {
    console.error(error);
    // Tangani error spesifik dari GitHub
    if (error.status === 404) {
      res.status(404).json({ message: 'Database not found' });
    } else {
      res.status(500).json({ message: 'Failed to read data' });
    }
  }
}
