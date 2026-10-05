import Link from 'next/link';

export default function NotFoundContent() {
  return (
    <article className="entry content-bg single-entry page type-page status-publish hentry">
      <div className="entry-content-wrap">
        <div
          className="entry-content single-content"
          style={{ textAlign: 'center', padding: '100px 20px' }}
        >
          <h1 style={{ fontSize: '96px', margin: 0, color: '#ee8e09' }}>404</h1>
          <h2 style={{ marginTop: '10px' }}>Page Not Found</h2>
          <p style={{ marginBottom: '30px' }}>
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="elementor-button elementor-button-link elementor-size-md"
            style={{ display: 'inline-block', padding: '15px 30px', background: '#ee8e09', color: '#fff', textDecoration: 'none' }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
}
