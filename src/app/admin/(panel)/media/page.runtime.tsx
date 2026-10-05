import type { Metadata } from 'next';
import MediaBrowser from '@/components/admin/media/MediaBrowser';
import { PageHeader } from '@/components/admin/ui/common';

export const metadata: Metadata = { title: 'Media' };

export default function MediaPage() {
  return (
    <>
      <PageHeader title="Media" description="All images in the site's public folder. Uploads are saved to /uploads/." />
      <div className="cms-card">
        <div className="cms-card-body">
          <MediaBrowser />
        </div>
      </div>
    </>
  );
}
