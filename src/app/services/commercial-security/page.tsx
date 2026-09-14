import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Commercial Security Services - ADS Guards',
  description: 'We customized our commercial property security services for corporations, apartment buildings and more.',
};

const data: ServicePageData = {
  slug: 'commercial-security',
  heroTitle: 'Commercial Security',
  heroSubtitle: 'Services',
  heroTagline: 'We customized our commercial property security services for corporations, apartment buildings and more.',
  heroBgImage: '/wp-content/uploads/2023/03/IMG_4193-1-1-1.jpg',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Comercial-Security-2.jpg',
  mainHeading: 'COMMERCIAL SECURITY SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Comercial-Security-2.jpg',
  contentRightHeading: `COMMERCIAL SECURITY IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'We customized our commercial property security services for corporations, apartment buildings, retail centers, and more. Our commercial security guards are trained to protect your business, employees, and customers from theft, vandalism, and other security threats. We work with each client to develop a tailored security plan that meets their specific needs.',
  benefitsHeading: 'Benefits of Commercial Security Services',
  benefits: [
    { title: "1. Business Protection", content: "Our commercial security guards protect your business from theft, vandalism, and unauthorized access, helping to ensure the continuity of your operations." },
    { title: "2. Employee Safety", content: "A safe workplace is essential for employee productivity and morale. Our security guards help create a safe working environment for your employees." },
    { title: "3. Customer Confidence", content: "The presence of professional security guards instills confidence in your customers, making them feel safe and welcome at your business." },
    { title: "4. Access Control", content: "We manage access to your commercial property, ensuring that only authorized personnel are allowed to enter the premises." },
    { title: "5. Incident Response", content: "Our security guards are trained to respond quickly and effectively to any security incidents, minimizing the impact on your business operations." },
  ],
  whyHeading: 'Why Choose Commercial Security by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) provides professional commercial security services tailored to the unique needs of businesses across California.',
  whyItems: [
    { title: "Industry Experience", content: "We have extensive experience providing commercial security services for a wide range of industries, including retail, hospitality, healthcare, and finance." },
    { title: "Customized Security Solutions", content: "We develop a customized security plan for each client, taking into account their specific security needs, budget, and business operations." },
    { title: "Professional and Uniformed Guards", content: "Our commercial security guards are professional, uniformed, and committed to providing excellent service to your business and its customers." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'COMMERCIAL SECURITY IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional commercial security services in Portland, helping businesses protect their assets and ensure a safe environment for employees and customers.'}, {'city': 'SEATTLE', 'heading': 'COMMERCIAL SECURITY IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers comprehensive commercial security services tailored to the unique needs of businesses in the area.'}, {'city': 'VANCOUVER', 'heading': 'COMMERCIAL SECURITY IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides reliable commercial security services in Vancouver, helping businesses of all sizes protect their assets and ensure the safety of their premises.'}, {'city': 'HOUSTON', 'heading': 'COMMERCIAL SECURITY IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'In Houston, American Discount Security (A.D.S.) offers professional commercial security services to protect your business from theft, vandalism, and unauthorized access.'}, {'city': 'SAN ANTONIO', 'heading': 'COMMERCIAL SECURITY IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides comprehensive commercial security services in San Antonio, ensuring that your business is protected at all times.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
