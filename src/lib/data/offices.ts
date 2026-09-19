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

export async function getAllOffices(): Promise<Office[]> {
  return [
    {
      anchor: 'California',
      name: 'California (Bay Area)',
      licenseNumber: 'PPO14579',
      officeType: 'Headquarter',
      address: '33446 Western AVE, Union City, CA 94587',
      phone: '510-742-8000',
      imageUrl: null,
      imageAlt: null,
    },
    {
      anchor: 'portland',
      name: 'Portland Oregon',
      licenseNumber: '105G258C2',
      officeType: 'Branch Office',
      address: '650 NE Holladay St Suite 1600, Portland, OR 97232',
      phone: '503-925-4600',
      imageUrl: null,
      imageAlt: null,
    },
    {
      anchor: 'seattle',
      name: 'Seattle Washington',
      licenseNumber: '1206',
      officeType: 'Branch Office',
      address: '600 Stewart St Suite 400, Seattle, WA 98101',
      phone: '206-620-2260',
      imageUrl: null,
      imageAlt: null,
    },
    {
      anchor: 'vanc',
      name: 'Vancouver Washington',
      licenseNumber: '1206',
      officeType: 'Branch Office',
      address: '2910 E Evergreen BLVD, Vancouver, WA 98661',
      phone: '360-719-4991',
      imageUrl: null,
      imageAlt: null,
    },
    {
      anchor: 'Texas',
      name: 'Houston Texas',
      licenseNumber: 'B07283801',
      officeType: 'Branch Office',
      address: null,
      phone: '832-917-6994',
      imageUrl: null,
      imageAlt: null,
    },
    {
      anchor: 'san',
      name: 'San Antonio Texas',
      licenseNumber: 'B07283801',
      officeType: 'Branch Office',
      address: '14215 S. US Highway 181, San Antonio, TX 78223',
      phone: '210-714-3030',
      imageUrl: null,
      imageAlt: null,
    }
  ];
}

