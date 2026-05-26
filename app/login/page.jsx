'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const form = new FormData(event.currentTarget);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      router.replace(nextUrl);
      router.refresh();
    } catch {
      setError('Something went wrong. Check the server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="form-shell">
        <h1>Login</h1>
        <p>Sign in to continue to checkout or other protected actions.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? <div className="error">{error}</div> : null}

          <div className="form-row">
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <Link className="button button-secondary" href="/forgot-password">
              Forgot password?
            </Link>

            <Link className="button button-secondary" href="/register">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}