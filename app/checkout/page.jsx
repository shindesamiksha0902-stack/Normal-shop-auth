export default function CheckoutPage() {
  return (
    <div className="container">
      <div className="hero-card" style={{ marginTop: '40px' }}>
        <span className="kicker">Protected page</span>
        <h1 style={{ marginTop: '14px' }}>Checkout</h1>
        <p>
          You can only reach this page if you are logged in. This is where your order form,
          address fields, payment summary, and final place-order button would go.
        </p>

        <div className="checkout-box">
          <strong>Order summary</strong>
          <p className="small" style={{ marginTop: '8px' }}>
            Login is verified by middleware before this page loads.
          </p>
        </div>
      </div>
    </div>
  );
}
