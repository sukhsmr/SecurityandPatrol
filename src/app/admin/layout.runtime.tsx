import type { Metadata } from 'next';
import '@/components/admin/admin.css';

/** Separate root layout so the admin never loads the public site's WordPress CSS. */
export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · Admin' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions (Grammarly, ColorZilla, …) add
    // attributes to <html>/<body> before React hydrates. Applies to these two
    // elements only, not their children.
    <html lang="en" suppressHydrationWarning>
      <body className="cms" suppressHydrationWarning>{children}</body>
    </html>
  );
}
