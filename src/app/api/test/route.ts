// src/app/api/test/route.ts


import { connectDB } from '@/lib/Mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB(); // ✅ MongoDB se connection
    return NextResponse.json({ success: true, message: 'MongoDB Connected Successfully ✅' });
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return NextResponse.json({ success: false, message: 'Connection Failed ❌' });
  }
}
