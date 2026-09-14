import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Construction Site Security Services - ADS Guards',
  description: 'Protecting Your Construction Site 24/7.',
};

const data: ServicePageData = {
  slug: 'construction-site-security',
  heroTitle: 'Construction Site',
  heroSubtitle: 'Security Services',
  heroTagline: 'Protecting Your Construction Site 24/7.',
  heroBgImage: '/wp-content/uploads/2023/03/Contruction1-1.jpg',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Contruction1-2.jpg',
  mainHeading: 'CONSTRUCTION SITE SECURITY SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Construction_Security.jpeg',
  contentRightHeading: `CONSTRUCTION SITE SECURITY IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'Our well-trained onsite security professionals will monitor the site 24 hours a day. Construction sites face unique security challenges including theft of equipment and materials, vandalism, and unauthorized access. American Discount Security (A.D.S.) provides specialized construction site security services to protect your investment and ensure worker safety.',
  benefitsHeading: 'Benefits of Construction Site Security',
  benefits: [
    { title: "1. 24/7 Monitoring", content: "Our security guards monitor your construction site around the clock, ensuring that any unauthorized access or suspicious activity is detected and addressed immediately." },
    { title: "2. Theft Prevention", content: "Construction sites are prime targets for theft of tools, equipment, and materials. Our security presence acts as a strong deterrent to potential thieves." },
    { title: "3. Vandalism Prevention", content: "Vandalism can cause costly delays to your construction project. Our security guards help prevent vandalism by maintaining a visible presence on site." },
    { title: "4. Fire Watch", content: "We provide fire watch services during times when the fire suppression system is offline or during high-risk periods of construction." },
    { title: "5. Access Control", content: "We manage access to your construction site, ensuring that only authorized personnel are allowed to enter the premises." },
  ],
  whyHeading: 'Why Choose Construction Site Security by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) has extensive experience providing construction site security services. Our security professionals are trained to handle the unique challenges of construction environments.',
  whyItems: [
    { title: "Specialized Training", content: "Our construction site security guards receive specialized training in construction site safety, access control, and emergency response." },
    { title: "Flexible Scheduling", content: "We provide security coverage that fits your construction schedule, including nights, weekends, and holidays." },
    { title: "Comprehensive Security Assessment", content: "We conduct a thorough assessment of your construction site to identify potential security vulnerabilities and develop a customized security plan." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'CONSTRUCTION SITE SECURITY IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional construction site security services in Portland. Our security guards protect your construction site from theft, vandalism, and unauthorized access.'}, {'city': 'SEATTLE', 'heading': 'CONSTRUCTION SITE SECURITY IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers comprehensive construction site security services to protect your project from potential security threats.'}, {'city': 'VANCOUVER', 'heading': 'CONSTRUCTION SITE SECURITY IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides reliable construction site security services in Vancouver, helping construction companies protect their investments and ensure project continuity.'}, {'city': 'HOUSTON', 'heading': 'CONSTRUCTION SITE SECURITY IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'In Houston, American Discount Security (A.D.S.) offers professional construction site security to protect your project from theft, vandalism, and unauthorized access.'}, {'city': 'SAN ANTONIO', 'heading': 'CONSTRUCTION SITE SECURITY IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides comprehensive construction site security services in San Antonio, ensuring that your construction project is protected at all times.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
