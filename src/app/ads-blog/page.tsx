import React from 'react';
import BlogSection from "@/components/sections/BlogSection";

export const metadata = {
  title: 'Blog | ADS Guards',
  description: 'New product features, the latest in technology and updates.',
};

export default function AdsBlogPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/blog.css" />
      <BlogSection />
      <script src="/js/blog.js"></script>
    </>
  );
}
