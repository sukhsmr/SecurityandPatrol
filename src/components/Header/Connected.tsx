import Header from './index';
import { getHeader, getOffices, getServiceMenu } from '@/lib/cms/services/content';

export default async function ConnectedHeader() {
  const [content, services, offices] = await Promise.all([getHeader(), getServiceMenu(), getOffices()]);
  return <Header content={content} services={services} offices={offices} />;
}
