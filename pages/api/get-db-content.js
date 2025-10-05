// pages/api/update-db.js
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { db, password, newData } = req.body;
  const path = `${db}.json`;

  try {
    // 1. Ambil file yang ada untuk mendapatkan SHA dan verifikasi password
    const { data: file } = await octokit.rest.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
    });

    const currentContent = JSON.parse(Buffer.from(file.content, 'base64').toString('utf-8'));

    if (currentContent.meta.password !== password) {
      return res.status(401).json({ message: 'Invalid database password' });
    }

    // 2. Gabungkan meta lama dengan data baru
    const updatedContent = {
      meta: currentContent.meta,
      data: newData,
    };

    // 3. Siapkan konten untuk di-upload
    const contentToUpload = Buffer.from(JSON.stringify(updatedContent, null, 2)).toString('base64');

    // 4. Update file di GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
      message: `Update database ${db}`,
      content: contentToUpload,
      sha: file.sha, // SHA diperlukan untuk update
    });

    res.status(200).json({ message: 'Database updated successfully' });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      res.status(404).json({ message: 'Database not found' });
    } else {
      res.status(500).json({ message: 'Failed to update database' });
    }
  }
}
