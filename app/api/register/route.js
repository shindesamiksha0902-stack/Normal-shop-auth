import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { users } from '@/lib/store';

export async function POST(request) {
  const { name, email, password } = await request.json();
  const normalizedEmail = String(email || '').toLowerCase().trim();

  if (!name || !normalizedEmail || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  if (users.has(normalizedEmail)) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  users.set(normalizedEmail, {
    id: crypto.randomUUID(),
    name,
    email: normalizedEmail,
    passwordHash,
  });

  return NextResponse.json({ message: 'Registered successfully' });
}
