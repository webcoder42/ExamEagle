// src/app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'ExamEagle',
  description: 'Online Exam Preparation App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
       

        <main className="min-h-screen p-6">{children}</main>

        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; 2025 ExamEagle. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
