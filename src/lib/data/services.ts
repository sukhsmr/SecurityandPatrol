import fs from 'fs';
import path from 'path';

export interface Service {
  id: string;
  wpId: number | null;
  title: string;
  summary: string | null;
  seo?: { title?: string; description?: string };
  contentHtml: string;
}

import servicesDataRaw from '@/data/services.json';

const servicesData = servicesDataRaw as Service[];

function getServicesData(): Service[] {
  return servicesData;
}

export async function getAllServices(): Promise<Service[]> {
  return getServicesData();
}

export async function getServicesBySlugs(slugs: string[]): Promise<Service[]> {
  if (slugs.length === 0) return [];
  const services = getServicesData();
  const bySlug = new Map(services.map((s) => [s.id, s]));
  return slugs.map((slug) => bySlug.get(slug)).filter((s): s is Service => Boolean(s));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = getServicesData();
  return services.find((s) => s.id === slug) || null;
}
