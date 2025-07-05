// app/api/users/verify/route.ts
import { NextResponse } from 'next/server';
import { pendingRegistrations } from '../register/route';
import User from '@/model/UserModel';
import { connectDB } from '@/lib/Mongoose';

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { email, code } = body;
    if (!email || !code) {
      return NextResponse.json({ success: false, message: 'Email or code missing' }, { status: 400 });
    }
    const pending = pendingRegistrations[email];
    if (!pending) {
      return NextResponse.json({ success: false, message: 'No pending registration found for this email.' }, { status: 404 });
    }
    if (pending.code !== code) {
      return NextResponse.json({ success: false, message: 'Invalid verification code.' }, { status: 400 });
    }
    if (pending.expires < Date.now()) {
      delete pendingRegistrations[email];
      return NextResponse.json({ success: false, message: 'Verification code expired.' }, { status: 400 });
    }
    // Create the user
    const newUser = await User.create({
      email,
      password: pending.hashedPassword,
      isVerified: true,
    });
    delete pendingRegistrations[email];
    return NextResponse.json({ success: true, message: 'Email verified and account created successfully.' });
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
} 