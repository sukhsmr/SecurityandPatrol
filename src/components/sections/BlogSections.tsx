import React from 'react';
import BlogCard from '@/components/BlogCard';
import type { BlogBannerData, BlogIntroData } from '@/lib/cms/sections/definitions';
import { getPublishedPosts } from '@/lib/cms/services/content';

export function BlogBanner({ data }: { data: BlogBannerData }) {
  return (
    <div style={{
      backgroundImage: `url(${data.backgroundImage.src})`,
      backgroundColor: '#555', // Fallback
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '120px 20px',
      color: '#fff',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)'
      }}></div>
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 'bold', margin: '0 0 5px 0', textTransform: 'uppercase', color: '#fff' }}>{data.eyebrow}</h1>
        <h2 style={{ color: '#ee8e09', fontSize: 'clamp(48px, 10vw, 72px)', fontWeight: 'bold', margin: '0 0 20px 0', lineHeight: '1' }}>{data.title}</h2>
        <p style={{ fontSize: 'clamp(15px, 3vw, 18px)', marginBottom: '30px', maxWidth: '500px' }}>{data.text}</p>
        <form style={{ display: 'flex', flexDirection: 'row', gap: '8px', maxWidth: '400px', width: '100%' }}>
          <input type="email" placeholder={data.emailPlaceholder} style={{ padding: '12px 16px', borderRadius: '4px', border: 'none', flex: '1', minWidth: 0, color: '#000', outline: 'none' }} required />
          <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#ee8e09', color: '#fff', border: 'none', borderRadius: '4px', flexShrink: 0, cursor: 'pointer', fontWeight: 'bold' }}>{data.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export function BlogIntro({ data }: { data: BlogIntroData }) {
  return (
    <div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px', textAlign: 'center' }}>
      <p style={{ color: '#555', fontSize: '14px', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}>
        {data.eyebrow}
      </p>
      <h2 style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: '#fff' }}>
        {data.heading}
      </h2>
    </div>
  );
}

export async function BlogList() {
  const posts = await getPublishedPosts();
  return (
    <div style={{ backgroundColor: '#fff', padding: '60px 0' }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px'
      }}>
        {posts.map((post) => (
          <div key={post.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '60px' }}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
