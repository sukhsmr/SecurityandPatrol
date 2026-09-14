import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Office Buildings High Rise, Parking lots - ADS Guards',
  description: 'Professional security services for office buildings, high rises, and parking facilities.',
};

const data: ServicePageData = {
  slug: 'office-buildings',
  heroTitle: 'Office Buildings,',
  heroSubtitle: 'High Rise, Parking lots',
  heroTagline: 'Professional security services for office buildings, high rises, and parking facilities.',
  heroBgImage: '/wp-content/uploads/2023/03/High_Rise_New-1-e1753430267250.jpg',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/High_Rise_OR.jpeg',
  mainHeading: 'OFFICE BUILDING SECURITY SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/High_Rise_OR.jpeg',
  contentRightHeading: `OFFICE BUILDING SECURITY IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'American Discount Security (A.D.S.) provides professional security services for office buildings, high-rise buildings, and parking facilities. Our security guards are trained to manage access control, monitor CCTV systems, respond to emergencies, and provide a visible deterrent to crime.',
  benefitsHeading: 'Benefits of Office Building Security',
  benefits: [
    { title: "1. Access Control", content: "Our security guards manage access to your office building, ensuring that only authorized personnel and visitors are allowed to enter." },
    { title: "2. Lobby Security", content: "We provide security coverage for your lobby, greeting visitors, checking credentials, and directing them to the appropriate areas of your building." },
    { title: "3. CCTV Monitoring", content: "Our security guards monitor your CCTV systems to detect and respond to any security threats in real time." },
    { title: "4. Emergency Response", content: "Our security guards are trained to respond quickly to emergencies, including medical incidents, fires, and security threats in your office building." },
    { title: "5. Parking Lot Security", content: "We provide security coverage for your parking lots and garages, deterring crime and ensuring the safety of your employees and visitors." },
  ],
  whyHeading: 'Why Choose Office Building Security by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) provides professional office building security services tailored to the unique needs of office buildings, high-rises, and parking facilities.',
  whyItems: [
    { title: "Corporate Security Experience", content: "Our security guards have experience working in corporate environments, providing professional and discreet security services." },
    { title: "Customized Security Solutions", content: "We develop a customized security plan for each office building, taking into account its specific layout, tenant mix, and security needs." },
    { title: "Advanced Technology Integration", content: "We integrate with your existing security technology, including CCTV systems, access control systems, and alarm systems." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'OFFICE BUILDING SECURITY IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional office building security services in Portland, helping businesses protect their assets and ensure a safe working environment.'}, {'city': 'SEATTLE', 'heading': 'OFFICE BUILDING SECURITY IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers comprehensive office building security services tailored to the unique needs of businesses in the area.'}, {'city': 'VANCOUVER', 'heading': 'OFFICE BUILDING SECURITY IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) is a trusted provider of office building security services in Vancouver, helping businesses create a safe and secure working environment.'}, {'city': 'HOUSTON', 'heading': 'OFFICE BUILDING SECURITY IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'In Houston, American Discount Security (A.D.S.) provides professional office building security services to protect your business and ensure the safety of your employees and visitors.'}, {'city': 'SAN ANTONIO', 'heading': 'OFFICE BUILDING SECURITY IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides comprehensive office building security services in San Antonio, ensuring that your business is protected at all times.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
