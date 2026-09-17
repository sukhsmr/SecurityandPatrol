import { query } from '@/lib/db';

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

interface OfficeRow {
  anchor: string | null;
  name: string;
  license_number: string | null;
  office_type: string | null;
  address: string | null;
  phone: string | null;
  image_url: string | null;
  image_alt: string | null;
}

function toOffice(row: OfficeRow): Office {
  return {
    anchor: row.anchor,
    name: row.name,
    licenseNumber: row.license_number,
    officeType: row.office_type,
    address: row.address,
    phone: row.phone,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
  };
}

export async function getAllOffices(): Promise<Office[]> {
  const rows = await query<OfficeRow[]>(
    'SELECT anchor, name, license_number, office_type, address, phone, image_url, image_alt FROM offices ORDER BY sort_order ASC, id ASC'
  );
  return rows.map(toOffice);
}
