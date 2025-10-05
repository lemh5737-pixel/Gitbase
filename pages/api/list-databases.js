import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: '',
    });

    const files = data.filter(item => item.type === 'file' && item.name.endsWith('.json'));
    const dbList = files.map(file => ({ name: file.name.replace('.json', '') }));

    res.status(200).json(dbList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch databases from GitHub' });
  }
}
