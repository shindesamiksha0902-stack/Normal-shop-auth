import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    desc: 'Comfortable, clean sound, and made for long sessions.',
    price: '₹2,499',
  },
  {
    id: 2,
    name: 'Gaming Controller',
    desc: 'Smooth controls for casual and competitive play.',
    price: '₹1,899',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    desc: 'Tactile typing that makes every click feel expensive.',
    price: '₹3,299',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-card">
            <span className="kicker">Browse first. Login only when needed.</span>
            <h1>Normal shopping site with protected actions.</h1>
            <p>
              Users can explore products without logging in. The moment they try to order or
              access checkout, the app sends them to the login page first. Once signed in, the
              site works normally and sends them back where they were headed.
            </p>

            <div className="hero-actions">
              <Link href="#products" className="button button-primary">
                Browse Products
              </Link>
              <Link href="/login" className="button button-secondary">
                Go to Login
              </Link>
            </div>
          </div>

          <div className="stat-grid">
            <div className="stat">
              <strong>Public</strong>
              <span className="small">Browse freely without login</span>
            </div>
            <div className="stat">
              <strong>Protected</strong>
              <span className="small">Checkout redirects to login</span>
            </div>
            <div className="stat">
              <strong>Simple</strong>
              <span className="small">No heavy setup nonsense</span>
            </div>
            <div className="stat">
              <strong>Clean</strong>
              <span className="small">Normal site layout and nav</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <h2>Featured Products</h2>
          <p className="lead">
            These are visible to everyone. Clicking order will check login status first.
          </p>

          <div className="product-grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-image" />
                <div className="product-body">
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <div className="product-meta">
                    <span className="price">{product.price}</span>
                    <span className="small">In stock</span>
                  </div>
                  <div className="card-actions">
                    <Link href="/checkout" className="button button-primary">
                      Order Now
                    </Link>
                    <Link href="/login" className="button button-secondary">
                      Login
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="hero-card">
            <h2 style={{ marginTop: 0 }}>How it behaves</h2>
            <p className="lead" style={{ marginBottom: 0 }}>
              If the user is not logged in, protected pages send them to <code>/login</code>.
              After login, they are sent back to the page they tried to open.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">Built for a clean public-browsing + protected-order flow.</div>
      </footer>
    </>
  );
}
