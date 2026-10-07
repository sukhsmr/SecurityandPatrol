// Server build: render on request from the JSON content, so admin edits
// (including pages created after the build) show immediately and nothing is
// written into .next (which may be read-only on the host).
export const dynamic = 'force-dynamic';

export { default, generateMetadata } from '@/components/site/SlugRoute';
