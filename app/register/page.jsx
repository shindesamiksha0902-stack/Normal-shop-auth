'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
    };

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Registration failed');
      setLoading(false);
      return;
    }

    router.push('/login');
  }

  return (
    <div className="container">
      <div className="form-shell">
        <h1>Register</h1>
        <p>Create an account so you can order without trouble later.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="form-row">
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Register'}
            </button>
            <Link className="button button-secondary" href="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
