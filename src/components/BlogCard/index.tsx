import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/components/BlogPostView';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="post-item" style={{ width: '100%' }}>
      <div className="elementskit-blog-block-post">
        {post.featuredImage?.url && (
          <Link href={`/${post.slug}`} style={{ display: 'block', overflow: 'hidden', borderRadius: '8px', marginBottom: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              decoding="async"
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Link>
        )}
        <div className="elementskit-post-body" style={{ padding: '0 10px' }}>
          <div className="elementskit-entry-header">
            <h2 className="entry-title" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.3' }}>
              <Link href={`/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title }} style={{ color: '#000', textDecoration: 'none' }} />
            </h2>
          </div>
          {post.excerpt && (
            <div className="elementskit-post-footer" style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
              <p>{post.excerpt}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
