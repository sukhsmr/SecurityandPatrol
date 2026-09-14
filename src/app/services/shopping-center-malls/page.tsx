import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Shopping Center Malls & Warehouses - ADS Guards',
  description: 'Licensed Shopping center security guards and mall security services for retail plazas, commercial shopping centers, and malls.',
};

const data: ServicePageData = {
  slug: 'shopping-center-malls',
  heroTitle: 'Shopping Center,',
  heroSubtitle: 'Malls & Warehouses',
  heroTagline: 'Licensed Shopping center security guards and mall security services for retail plazas, commercial shopping centers, and malls.',
  heroBgImage: '/wp-content/uploads/2023/02/Backgorund-Pattern.png',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/02/Backgorund-Pattern.png',
  mainHeading: 'SHOPPING CENTER & MALL SECURITY SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2026/08/with-out-background.png',
  contentRightHeading: `SHOPPING CENTER SECURITY IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'Licensed Shopping center security guards and mall security services for retail plazas, commercial shopping centers, and malls. American Discount Security (A.D.S.) provides comprehensive security services to shopping centers, malls, and retail establishments. Our security guards are trained to handle all aspects of retail security, from loss prevention to crowd management and emergency response.',
  benefitsHeading: 'Benefits of Shopping Center Security',
  benefits: [
    { title: "1. Loss Prevention", content: "Our shopping center security guards are trained in loss prevention techniques to help reduce theft and shoplifting at your retail establishment." },
    { title: "2. Crowd Management", content: "During busy shopping periods, our security guards help manage crowds and ensure the orderly flow of shoppers throughout your mall or shopping center." },
    { title: "3. Customer Safety", content: "The presence of professional security guards creates a safe and welcoming environment for shoppers, encouraging them to spend more time at your shopping center." },
    { title: "4. Parking Lot Security", content: "We provide security coverage for your parking lots and garages, deterring auto theft and ensuring the safety of shoppers as they enter and exit." },
    { title: "5. Emergency Response", content: "Our security guards are trained to respond quickly to emergencies, including medical incidents, fires, and security threats." },
  ],
  whyHeading: 'Why Choose Shopping Center Security by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) has extensive experience providing security services for shopping centers, malls, and retail establishments across California.',
  whyItems: [
    { title: "Retail Security Expertise", content: "Our security guards have specialized training in retail security, including loss prevention, crowd management, and customer service." },
    { title: "Customized Security Plans", content: "We develop a customized security plan for each shopping center, taking into account its specific layout, tenant mix, and security needs." },
    { title: "Visible and Professional Presence", content: "Our uniformed security guards provide a visible and professional presence that deters crime and creates a safe shopping environment." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'SHOPPING CENTER SECURITY IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional shopping center security services in Portland, helping retail establishments protect their assets and ensure a safe shopping environment.'}, {'city': 'SEATTLE', 'heading': 'SHOPPING CENTER SECURITY IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers comprehensive shopping center security services tailored to the unique needs of retail establishments in the area.'}, {'city': 'VANCOUVER', 'heading': 'SHOPPING CENTER SECURITY IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides reliable shopping center security services in Vancouver, helping retail establishments create a safe and welcoming shopping environment.'}, {'city': 'HOUSTON', 'heading': 'SHOPPING CENTER SECURITY IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'In Houston, American Discount Security (A.D.S.) provides professional shopping center security services to protect your retail establishment and ensure the safety of your shoppers.'}, {'city': 'SAN ANTONIO', 'heading': 'SHOPPING CENTER SECURITY IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides comprehensive shopping center security services in San Antonio, ensuring that your retail establishment is safe and secure.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
