import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getSessionFromCookie } from '@/lib/session';
import LogoutButton from '@/components/LogoutButton';

export const metadata = {
  title: 'ShopLite',
  description: 'Browse freely and login when needed',
};

async function Navbar() {
  const cookieStore = cookies();
  const session = await getSessionFromCookie(cookieStore);

  return (
    <header className="site-header">
      <div className="container">
        <div className="navbar">
          <Link href="/" className="brand" aria-label="ShopLite home">
            <span className="brand-badge" />
            <span>ShopLite</span>
          </Link>

          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/#products">Products</Link>
            <Link href="/checkout">Checkout</Link>
            {!session ? (
              <Link className="nav-cta" href="/login">
                Login
              </Link>
            ) : (
              <>
                <span className="small">Hi, {session.name || session.email}</span>
                <LogoutButton />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
