// lib/auth/getUser.ts
"use server"

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { IToken } from '@/context';

export async function getUser(): Promise<IToken> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('_token')?.value;

  if (!token) {
    return {
      username: null,
      userID: null,
      displayName: null,
      email: null,
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (
      decoded &&
      typeof decoded === 'object' &&
      'username' in decoded &&
      'userID' in decoded &&
      'displayName' in decoded &&
      'email' in decoded
    ) {
      return decoded as IToken;
    } else {
      return {
        username: null,
        userID: null,
        displayName: null,
        email: null,
      };
    }
  } catch {
    return {
      username: null,
      userID: null,
      displayName: null,
      email: null,
    };
  }
}
