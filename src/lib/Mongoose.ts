// src/lib/mongodb.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI in .env.local');
}

// Global caching to avoid multiple connections in dev
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'ExamEagle', // 👈 Fixed: Use correct case to match existing DB
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
