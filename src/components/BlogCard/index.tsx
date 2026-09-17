import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/components/BlogPostView';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="post-item ekit-col-4">
      <div className="elementskit-blog-block-post">
        {post.featuredImage?.url && (
          <Link href={`/${post.slug}`} className="elementskit-entry-thumb" style={{ display: 'block', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              decoding="async"
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }}
            />
          </Link>
        )}
        <div className="elementskit-post-body" style={{ padding: '20px' }}>
          {post.categories && post.categories.length > 0 && (
            <div className="cat-links">
              {post.categories.map((cat) => (
                <span key={cat} className="cat-link" style={{ marginRight: '10px' }}>{cat}</span>
              ))}
            </div>
          )}
          <div className="elementskit-entry-header">
            <h2 className="entry-title">
              <Link href={`/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title }} />
            </h2>
          </div>
          <div className="entry-meta">
            <span className="posted-on">
              <time className="entry-date published" dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </div>
          {post.excerpt && (
            <div className="elementskit-post-footer">
              <p>{post.excerpt}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
