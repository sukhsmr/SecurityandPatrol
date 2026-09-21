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
    <div style={{ backgroundColor: '#fff', padding: '60px 0' }}>
      <article
        id={`post-${post.id}`}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', width: '100%' }}
      >
        <div style={{ width: '100%' }}>
          
          {/* Featured Image */}
          {post.featuredImage?.url && (
            <div style={{ marginBottom: '30px', width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          {/* Header (Title and Meta) */}
          <header style={{ marginBottom: '40px' }}>
            <h1 
              style={{ fontSize: '36px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '20px', color: '#111' }} 
              dangerouslySetInnerHTML={{ __html: post.title }} 
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#666', fontSize: '14px', flexWrap: 'wrap' }}>
              {/* Avatar placeholder */}
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {post.author || 'Author'} <span style={{ fontWeight: 'normal', color: '#888' }}>- Writer</span>
                </div>
                <div style={{ display: 'flex', gap: '15px', marginTop: '4px' }}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>0 Comments</span>
                </div>
              </div>
            </div>
          </header>

          {post.audioUrl && <AudioPlayer src={post.audioUrl} />}

          {/* Main Content */}
          <div 
            ref={contentRef} 
            className="single-content" 
            style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', width: '100%', overflowWrap: 'break-word' }} 
            dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
          />
        </div>
      </article>
    </div>
  );
}
