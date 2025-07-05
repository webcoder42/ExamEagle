// app/api/users/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { pendingRegistrations } from '@/lib/pendingRegistrations';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email or password missing' }, { status: 400 });
    }

    // Check if a user already exists in the DB
    const User = (await import('@/model/UserModel')).default;
    const { connectDB } = await import('@/lib/Mongoose');
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });
    }

    // Generate code and hash password
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
    pendingRegistrations[email] = { hashedPassword, code, expires };

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Welcome!</p><p>Your verification code is:</p><h2>${code}</h2>`,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to email',
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
