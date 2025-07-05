// app/api/verify-code/route.ts
import { connectDB } from '@/lib/Mongoose';
import User from '@/model/UserModel';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { email, code } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ success: false, message: 'User already verified' }, { status: 400 });
    }

    if (user.verificationCode !== code) {
      return NextResponse.json({ success: false, message: 'Invalid verification code' }, { status: 400 });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
