'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const nextUrl = params.get('next') || '/checkout';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(event.currentTarget);
    const payload = {
      email: form.get('email'),
      password: form.get('password'),
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Login failed');
      setLoading(false);
      return;
    }

    router.replace(nextUrl);
    router.refresh();
  }

  return (
    <div className="container">
      <div className="form-shell">
        <h1>Login</h1>
        <p>Sign in to continue to checkout or other protected actions.</p>

        <form onSubmit={handleSubmit}>
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <Link className="button button-secondary" href="/register">
              Create account
            </Link>
            <Link className="button button-secondary" href="/">
              Back home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
