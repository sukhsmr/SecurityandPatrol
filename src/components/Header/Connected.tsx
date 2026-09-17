import Header from './index';
import { getAllServices } from '@/lib/data/services';
import { getAllOffices } from '@/lib/data/offices';

export default async function ConnectedHeader() {
  const [services, offices] = await Promise.all([getAllServices(), getAllOffices()]);
  return <Header services={services} offices={offices} />;
}
