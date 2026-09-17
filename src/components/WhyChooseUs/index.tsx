import React from 'react';
import ElementorRawView from '@/components/ElementorRawView';
import { getPageBySlug } from '@/lib/data/pages';

export default async function WhyChooseUs() {
  const page = await getPageBySlug('home-why-choose');
  if (!page) return null;
  return <ElementorRawView contentHtml={page.contentHtml} />;
}
