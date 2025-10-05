export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { db, password, key } = req.body;
  const url = `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/main/${db}.json`;

  try {
    const fetchRes = await fetch(url);
    if (!fetchRes.ok) {
      return res.status(404).json({ message: 'Database not found' });
    }

    const dbContent = await fetchRes.json();

    // Verify password
    if (dbContent.meta.password !== password) {
      return res.status(401).json({ message: 'Invalid database password' });
    }

    // Return data
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
    res.status(500).json({ message: 'Failed to read data' });
  }
}
