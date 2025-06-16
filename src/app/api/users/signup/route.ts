"use server"

import { NextRequest,NextResponse } from 'next/server';


import { createUser } from '@/controllers/userControllers';

export async function POST(req: NextRequest) {
  return createUser(req);
}