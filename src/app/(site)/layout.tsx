import type { Metadata } from 'next';
import '../globals.css';
import '../wordpress-inline.css';
import '../services-inline.css';
import SiteDocument from '@/components/site/SiteDocument';
import { getSettings } from '@/lib/cms/services/content';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.defaultSeo.title,
    description: settings.defaultSeo.description,
    ...(settings.siteUrl ? { metadataBase: new URL(settings.siteUrl) } : {}),
    ...(settings.favicon ? { icons: { icon: settings.favicon } } : {}),
  };
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteDocument>{children}</SiteDocument>;
}
