// pages/api/create.js
import { Octokit } from '@octokit/rest';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { dbName, dbPassword, dbType, ownerEmail } = req.body;
  const path = `${dbName}.json`;

  let initialData = {
    meta: { owner: ownerEmail, created_at: new Date().toISOString(), password: dbPassword },
    data: {}
  };

  // Jika tipe 'auth', gunakan struktur khusus
  if (dbType === 'auth') {
    initialData.data = {
      users: {},
      roles: {
        admin: [],
        editor: [],
        viewer: []
      },
      sessions: {}
    };
  }

  const content = Buffer.from(JSON.stringify(initialData, null, 2)).toString('base64');

  try {
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO, path,
      message: `Create ${dbType} database ${dbName}`, content,
    });
    res.status(201).json({ message: `Database '${dbName}' (${dbType}) created successfully!` });
  } catch (error) {
    console.error(error);
    if (error.status === 422) res.status(409).json({ message: `Database '${dbName}' already exists.` });
    else res.status(500).json({ message: 'Failed to create database on GitHub' });
  }
}
