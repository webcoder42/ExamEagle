// Temporary in-memory store for pending registrations
export const pendingRegistrations: {
  [email: string]: { hashedPassword: string; code: string; expires: number };
} = {}; 