import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { users } from '@/lib/store';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  const { email, password } = await request.json();
  const normalizedEmail = String(email || '').toLowerCase().trim();

  if (!normalizedEmail || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const user = users.get(normalizedEmail);

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);

  if (!ok) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    name: user.name,
  });

  const res = NextResponse.json({ message: 'Login successful' });
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
