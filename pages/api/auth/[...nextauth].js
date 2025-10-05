import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Email dan password harus diisi');
        }

        const usersFilePath = path.join(process.cwd(), 'users.json');
        const usersData = await fs.readFile(usersFilePath, 'utf-8');
        const users = JSON.parse(usersData);

        const user = users[email];

        if (!user) {
          throw new Error('User tidak ditemukan');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Password salah');
        }

        return { email: user.email };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
