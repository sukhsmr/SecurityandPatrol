import fs from 'fs';
import path from 'path';

export interface Office {
  anchor: string | null;
  name: string;
  licenseNumber: string | null;
  officeType: string | null;
  address: string | null;
  phone: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
}

import officesDataRaw from '@/data/offices.json';

const officesData = officesDataRaw as Office[];

function getOfficesData(): Office[] {
  return officesData;
}

export async function getAllOffices(): Promise<Office[]> {
  return getOfficesData();
}

