import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';
import { getSession } from '@/lib/cms/auth/session';
import { getSettings } from '@/lib/cms/services/content';

export const metadata: Metadata = { title: 'Sign in' };

function safeNext(next: string | string[] | undefined): string {
  const value = Array.isArray(next) ? next[0] : next;
  // Only allow redirects back into the admin, never to another origin.
  return value && value.startsWith('/admin') && !value.startsWith('//') ? value : '/admin';
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const next = safeNext((await searchParams).next);
  if (await getSession()) redirect(next);
  const settings = await getSettings();
  return <LoginForm siteName={settings.siteName} logo={settings.logo} next={next} />;
}
