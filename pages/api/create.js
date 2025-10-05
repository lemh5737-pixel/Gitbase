import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { dbName, dbPassword, ownerEmail } = req.body;
  const path = `${dbName}.json`;
  const content = Buffer.from(
    JSON.stringify({
      meta: {
        owner: ownerEmail,
        created_at: new Date().toISOString(),
        password: dbPassword,
      },
      data: {},
    }, null, 2)
  ).toString('base64');

  try {
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
      message: `Create database ${dbName}`,
      content,
    });

    res.status(201).json({ message: `Database '${dbName}' created successfully!` });
  } catch (error) {
    console.error(error);
    if (error.status === 422) {
      res.status(409).json({ message: `Database '${dbName}' already exists.` });
    } else {
      res.status(500).json({ message: 'Failed to create database on GitHub' });
    }
  }
}
