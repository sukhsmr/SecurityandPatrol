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

function getOfficesData(): Office[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'offices.json');
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading offices.json', error);
    return [];
  }
}

export async function getAllOffices(): Promise<Office[]> {
  return getOfficesData();
}

