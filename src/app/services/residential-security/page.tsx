import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Residential Religious Facilities - ADS Guards',
  description: 'We understand that residential security is the number one concern of home-buyers and residents.',
};

const data: ServicePageData = {
  slug: 'residential-security',
  heroTitle: 'Residential &',
  heroSubtitle: 'Religious Facilities',
  heroTagline: 'We understand that residential security is the number one concern of home-buyers and residents.',
  heroBgImage: '/wp-content/uploads/2023/03/Residential2-1-1.jpg',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Residential-e1753360148140.jpg',
  mainHeading: 'RESIDENTIAL SECURITY SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Residential-e1753360148140.jpg',
  contentRightHeading: `RESIDENTIAL SECURITY IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'We understand that residential security is the number one concern of home-buyers and residents. American Discount Security (A.D.S.) provides comprehensive residential security services to protect your home, family, and property. Our residential security guards are trained to provide a visible deterrent to crime while maintaining a professional and courteous presence in your neighborhood.',
  benefitsHeading: 'Benefits of Residential Security Services',
  benefits: [
    { title: "1. Peace of Mind", content: "Knowing that a professional security guard is protecting your home and family provides invaluable peace of mind." },
    { title: "2. Crime Deterrence", content: "The visible presence of a security guard is one of the most effective deterrents to crime in residential communities." },
    { title: "3. Emergency Response", content: "Our residential security guards are trained to respond quickly to emergencies, including medical incidents, fires, and security breaches." },
    { title: "4. Visitor Management", content: "We manage visitor access to your residential community, ensuring that only authorized guests are admitted." },
    { title: "5. Patrol and Monitoring", content: "Our security guards conduct regular patrols of your residential property, monitoring for any signs of suspicious activity." },
  ],
  whyHeading: 'Why Choose Residential Security by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) provides professional residential security services tailored to the unique needs of homeowners, apartment complexes, and gated communities.',
  whyItems: [
    { title: "Community-Focused Approach", content: "Our residential security guards are trained to build positive relationships with residents while maintaining a safe and secure environment." },
    { title: "Flexible Security Solutions", content: "We provide residential security services that can be customized to meet the specific needs and budget of your community." },
    { title: "Experienced Security Personnel", content: "Our residential security guards have experience working in a variety of residential settings, from single-family homes to large apartment complexes." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'RESIDENTIAL SECURITY IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional residential security services in Portland, helping homeowners and residential communities create a safe and secure environment.'}, {'city': 'SEATTLE', 'heading': 'RESIDENTIAL SECURITY IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers comprehensive residential security services to protect your home and community from potential security threats.'}, {'city': 'VANCOUVER', 'heading': 'RESIDENTIAL SECURITY IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) is a trusted provider of residential security services in Vancouver, helping residents feel safe and secure in their homes.'}, {'city': 'HOUSTON', 'heading': 'RESIDENTIAL SECURITY IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'In Houston, American Discount Security (A.D.S.) provides professional residential security services to protect your home, family, and property.'}, {'city': 'SAN ANTONIO', 'heading': 'RESIDENTIAL SECURITY IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides comprehensive residential security services in San Antonio, ensuring the safety and security of your home and community.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
