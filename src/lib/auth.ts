// lib/auth/getUser.ts
"use server"

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('_token')?.value;

  if (!token) return null;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return user;
  } catch {
    return null;
  }
}
