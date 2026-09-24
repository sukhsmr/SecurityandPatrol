import React from 'react';
import ConnectedHeader from '@/components/Header/Connected';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getAllBlogPosts } from '@/lib/data/blog';

export const metadata = {
  title: 'Security Tips | Safety Advice | Licensed Security Guards & Patrols',
  description:
    'Explore expert insights and updates from the Security and Patrol blog on security guard services, mobile patrols, and property protection.',
};

export default async function AdsBlogPage() {
  const blogData = await getAllBlogPosts();
  const posts = [...blogData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <div id="wrapper" className="site wp-site-blocks">
        <a className="skip-link screen-reader-text scroll-ignore" href="#main">Skip to content</a>
        <ConnectedHeader />
        <div id="content" className="site-content" style={{ padding: 0 }}>
          <main id="inner-wrap" className="wrap kt-clear" role="main" style={{ padding: 0, width: '100%', maxWidth: '100%' }}>
            
            {/* Banner Section */}
            <div style={{
              backgroundImage: 'url(/wp-content/uploads/2023/03/blogimage.png)',
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
                <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 'bold', margin: '0 0 5px 0', textTransform: 'uppercase', color: '#fff' }}>OUR</h1>
                <h2 style={{ color: '#ee8e09', fontSize: 'clamp(48px, 10vw, 72px)', fontWeight: 'bold', margin: '0 0 20px 0', lineHeight: '1' }}>BLOGS</h2>
                <p style={{ fontSize: 'clamp(15px, 3vw, 18px)', marginBottom: '30px', maxWidth: '500px' }}>New product features, the latest in technology and updates.</p>
                <form style={{ display: 'flex', flexDirection: 'row', gap: '8px', maxWidth: '400px', width: '100%' }}>
                  <input type="email" placeholder="Enter your email" style={{ padding: '12px 16px', borderRadius: '4px', border: 'none', flex: '1', minWidth: 0, color: '#000', outline: 'none' }} required />
                  <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#ee8e09', color: '#fff', border: 'none', borderRadius: '4px', flexShrink: 0, cursor: 'pointer', fontWeight: 'bold' }}>Subscribe</button>
                </form>
              </div>
            </div>

            {/* Welcome Bar Section */}
            <div style={{ backgroundColor: '#1a1a1a', padding: '60px 20px', textAlign: 'center' }}>
              <p style={{ color: '#555', fontSize: '14px', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}>
                Our blogs
              </p>
              <h2 style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: '#fff' }}>
                Welcome to the American Discount Security (A.D.S.) Security Blog
              </h2>
            </div>

            {/* Blog List Section */}
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

          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
