import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <section className="not-found-card">
        <p className="not-found-kicker">KHANG Portfolio — 404 / Route missed</p>
        <h1>Page not found.</h1>
        <p className="not-found-copy">
          This route does not exist, but the portfolio is still running.
          <br />
          Đường dẫn này không tồn tại, quay lại trang chủ nhé.
        </p>

        <div className="not-found-actions">
          <Link className="button-primary" href="/">
            Back home
          </Link>
          <Link className="button-secondary" href="/work">
            View work
          </Link>
        </div>
      </section>
    </main>
  );
}
