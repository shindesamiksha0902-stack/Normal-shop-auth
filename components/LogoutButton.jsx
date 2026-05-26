'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.refresh();
    router.push('/');
  }

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
