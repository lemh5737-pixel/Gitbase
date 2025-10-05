import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const usersFilePath = path.join(process.cwd(), 'users.json');
  let users = {};

  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    users = JSON.parse(data);
  } catch (error) {
    // File doesn't exist, it's okay
  }

  if (users[email]) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { email, password: hashedPassword };

  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'User registered successfully' });
}
