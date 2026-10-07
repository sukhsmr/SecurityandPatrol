// Server build: render on request from the JSON content, so admin edits show
// immediately and nothing is written into .next (which may be read-only).
export const dynamic = 'force-dynamic';

export { default, generateMetadata } from './page.export';
