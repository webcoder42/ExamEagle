'use client';
import { useState } from 'react';
import Main from "@/Screens/Main";
import Register from "@/Screens/UserRegisterForm/Register";

export default function HomePage() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <Register onBack={() => setShowRegister(false)} />;
  }

  return <Main onRegisterClick={() => setShowRegister(true)} />;
}
