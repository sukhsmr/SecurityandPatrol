import React from 'react';
import { notFound } from 'next/navigation';
import ConnectedHeader from '@/components/Header/Connected';
import Footer from '@/components/Footer';
import ElementorRawView from '@/components/ElementorRawView';
import BlogPostView from '@/components/BlogPostView';
import { getAllServices, getServiceBySlug } from '@/lib/data/services';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/data/blog';

export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const [services, posts] = await Promise.all([getAllServices(), getAllBlogPosts()]);
  return [
    ...services.map((service) => ({ slug: service.id })),
    ...posts.map((post) => ({ slug: post.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (service) {
    return {
      title: service.seo?.title || service.title,
      description: service.seo?.description,
    };
  }
  const post = await getBlogPostBySlug(slug);
  if (post) {
    return {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
    };
  }
  return {};
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const post = !service ? await getBlogPostBySlug(slug) : undefined;

  if (!service && !post) {
    notFound();
  }

  return (
    <>
      <div id="wrapper" className="site wp-site-blocks">
        <a className="skip-link screen-reader-text scroll-ignore" href="#main">Skip to content</a>
        <ConnectedHeader />
        <div id="content" className="site-content">
          <main id="inner-wrap" className="wrap kt-clear" role="main">
            <div id="primary" className="content-area">
              <div className="content-container site-container">
                <div id="main" className="site-main">
                  <div className="content-wrap">
                    {service ? (
                      <article className="entry content-bg single-entry page type-page status-publish has-post-thumbnail hentry">
                        <div className="entry-content-wrap">
                          <div className="entry-content single-content">
                            <ElementorRawView contentHtml={service.contentHtml} />
                          </div>
                        </div>
                      </article>
                    ) : (
                      <BlogPostView post={post!} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
