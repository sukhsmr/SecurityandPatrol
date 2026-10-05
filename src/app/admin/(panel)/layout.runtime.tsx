import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { getSession } from '@/lib/cms/auth/session';
import { getSettings } from '@/lib/cms/services/content';

/** Every admin screen except login is behind this session check. */
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  const settings = await getSettings();
  return (
    <AdminShell username={session.username} siteName={settings.siteName} logo={settings.logo}>
      {children}
    </AdminShell>
  );
}
