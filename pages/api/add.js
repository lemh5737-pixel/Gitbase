import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Helper function to set nested property
const setNestedProperty = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const lastObj = keys.reduce((obj, key) => obj[key] = obj[key] || {}, obj);
  lastObj[lastKey] = value;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { db, password, key, value } = req.body;
  const path = `${db}.json`;

  try {
    // 1. Get the current file
    const { data: file } = await octokit.rest.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
    });

    const currentContent = JSON.parse(Buffer.from(file.content, 'base64').toString('utf-8'));

    // 2. Verify password
    if (currentContent.meta.password !== password) {
      return res.status(401).json({ message: 'Invalid database password' });
    }

    // 3. Update data
    setNestedProperty(currentContent.data, key, value);
    const newContent = Buffer.from(JSON.stringify(currentContent, null, 2)).toString('base64');

    // 4. Push back to GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
      message: `Add data to ${db}`,
      content: newContent,
      sha: file.sha,
    });

    res.status(200).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add data' });
  }
}
