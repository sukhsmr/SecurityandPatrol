import type { Metadata } from 'next';
import './globals.css';
import './wordpress-inline.css';
import './services-inline.css';
import NotFoundContent from '@/components/site/NotFoundContent';
import SiteDocument from '@/components/site/SiteDocument';
import SiteShell from '@/components/site/SiteShell';
import { getSettings } from '@/lib/cms/services/content';

// Unmatched URLs. The app has two root layouts (site and admin), so the
// global 404 renders the site document itself.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return { title: settings.defaultSeo.title, description: settings.defaultSeo.description };
}

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <SiteShell>
        <NotFoundContent />
      </SiteShell>
    </SiteDocument>
  );
}
