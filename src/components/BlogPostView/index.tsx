'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  modified?: string;
  contentHtml: string;
  excerpt?: string;
  featuredImage?: { url: string; alt?: string };
  author?: string;
  categories?: string[];
  seo?: { title?: string; description?: string };
  audioUrl?: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.pause();
    else el.play();
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Number(e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: '#f7f8fa',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '16px 20px',
        margin: '24px 0',
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onRateChange={(e) => setRate(e.currentTarget.playbackRate)}
      />
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause' : 'Play'}
        style={{
          flexShrink: 0,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#1a202c',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
        }}
      >
        {playing ? '❚❚' : '►'}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, marginBottom: '2px' }}>Listen to this article</div>
        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Narrated audio &middot; {rate}x speed</div>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={seek}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default function BlogPostView({ post }: { post: BlogPost }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Browsers never execute <script> tags injected via innerHTML, so any
    // interactive widgets embedded in the original post content (e.g. a
    // PDF-download modal) need to be re-created as real script elements
    // to actually run, once per mount.
    const container = contentRef.current;
    if (!container) return;
    const scripts = Array.from(container.querySelectorAll('script'));
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  }, [post.contentHtml]);

  return (
    <article
      id={`post-${post.id}`}
      className={`entry content-bg single-entry post-${post.id} post type-post status-publish format-standard hentry${
        post.featuredImage ? ' has-post-thumbnail' : ''
      }`}
      style={{ maxWidth: '750px', margin: '0 auto', padding: '0 20px' }}
    >
      <div className="entry-content-wrap">
        {post.featuredImage?.url ? (
          <div style={{ position: 'relative', margin: '30px 0 60px' }}>
            <div className="post-thumbnail" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                className="attachment-full size-full wp-post-image"
                style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4 / 3', objectFit: 'cover' }}
              />
            </div>
            <header
              className="entry-header"
              style={{
                position: 'absolute',
                left: '20px',
                right: '20px',
                bottom: '-40px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                padding: '24px',
              }}
            >
              {post.categories && post.categories.length > 0 && (
                <div className="cat-links">
                  {post.categories.map((cat) => (
                    <span key={cat} className="cat-link" style={{ marginRight: '10px', color: '#2b6cb0', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase' }}>{cat}</span>
                  ))}
                </div>
              )}
              <h1 className="entry-title" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: post.title }} />
              <div className="entry-meta">
                <span className="posted-on">
                  <time className="entry-date published" dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                {post.author && (
                  <span className="byline">
                    {' '}by <span className="author vcard">{post.author}</span>
                  </span>
                )}
              </div>
            </header>
          </div>
        ) : (
          <header className="entry-header" style={{ margin: '30px 0' }}>
            {post.categories && post.categories.length > 0 && (
              <div className="cat-links">
                {post.categories.map((cat) => (
                  <span key={cat} className="cat-link" style={{ marginRight: '10px' }}>{cat}</span>
                ))}
              </div>
            )}
            <h1 className="entry-title" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: post.title }} />
            <div className="entry-meta">
              <span className="posted-on">
                <time className="entry-date published" dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              {post.author && (
                <span className="byline">
                  {' '}by <span className="author vcard">{post.author}</span>
                </span>
              )}
            </div>
          </header>
        )}

        {post.audioUrl && <AudioPlayer src={post.audioUrl} />}

        <div ref={contentRef} className="entry-content single-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
    </article>
  );
}
