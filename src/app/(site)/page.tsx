import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageView from '@/components/site/PageView';
import { pageMetadata } from '@/lib/cms/metadata';
import { HOME_SLUG } from '@/lib/cms/schema/documents';
import { getPublishedPage, getSettings } from '@/lib/cms/services/content';

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPublishedPage(HOME_SLUG), getSettings()]);
  return page ? pageMetadata(page, settings) : {};
}

export default async function Home() {
  const page = await getPublishedPage(HOME_SLUG);
  if (!page) notFound();
  return <PageView page={page} />;
}
