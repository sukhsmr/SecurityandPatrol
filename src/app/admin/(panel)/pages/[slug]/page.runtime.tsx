import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageEditor from '@/components/admin/pages/PageEditor';
import { NotFoundError } from '@/lib/cms/errors';
import { getPage } from '@/lib/cms/services/admin';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function load(slug: string) {
  try {
    return await getPage(slug);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await load((await params).slug);
  return { title: page.title };
}

export default async function EditPagePage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const page = await load(slug);
  return <PageEditor key={page.slug} page={page} initialTab={query.tab === 'settings' ? 'settings' : 'sections'} />;
}
