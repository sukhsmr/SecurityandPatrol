import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Armed Security guard Services - ADS Guards',
  description: 'Protect a person, property, or business with Armed Guards.',
};

const data: ServicePageData = {
  slug: 'armed-security',
  heroTitle: 'Armed Security',
  heroSubtitle: 'guard Services',
  heroTagline: 'Protect a person, property, or business with Armed Guards.',
  heroBgImage: '/wp-content/uploads/2023/03/Orignal-2-1-scaled-1.jpg',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Armed-scaled.jpg',
  mainHeading: 'ARMED SECURITY GUARDS SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/IMG_1632-2-1-1-768x792.jpg',
  contentRightHeading: `ARMED SECURITY GUARD SERVICES IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'American Discount Security (A.D.S.) Armed Security Guards are trained to deal with complex and unique security needs. Our armed guards undergo rigorous training to ensure they are equipped to handle any security situation. Whether you need armed guards for executive protection, high-value asset security, or event security, we have the expertise to keep you and your assets safe.',
  benefitsHeading: 'Benefits of Armed Security Guards',
  benefits: [
    { title: "1. Deterrence of Crime", content: "The visible presence of armed security guards is one of the most effective deterrents to criminal activity. Armed guards provide a strong signal to potential criminals that the premises are protected." },
    { title: "2. Rapid Response", content: "Armed security guards are trained to respond quickly and effectively to security threats, ensuring that any potential incidents are dealt with swiftly and professionally." },
    { title: "3. Executive Protection", content: "Our armed security personnel are experienced in providing close protection services for executives, celebrities, and other high-profile individuals." },
    { title: "4. High-Value Asset Protection", content: "Armed guards are ideal for protecting high-value assets such as jewelry, cash, artwork, and other valuables during transport or storage." },
    { title: "5. Emergency Response", content: "In the event of an emergency, armed security guards are trained to take decisive action to protect lives and property, and to coordinate with law enforcement as needed." },
  ],
  whyHeading: 'Why Choose Armed Security Services by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) provides professional armed security services to businesses and individuals across California and beyond. Our armed guards are licensed, trained, and experienced in handling complex security situations.',
  whyItems: [
    { title: "Licensed and Trained", content: "All our armed security guards are fully licensed and have undergone extensive training to handle firearms safely and effectively." },
    { title: "24/7 Availability", content: "We provide round-the-clock armed security services to ensure your property and assets are protected at all times." },
    { title: "Customized Security Plans", content: "We work with each client to develop a tailored security plan that meets their specific needs and budget." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'ARMED SECURITY GUARD SERVICES IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional armed security services in Portland, helping businesses and individuals protect their assets and ensure a safe environment. Our armed guards are licensed, trained, and experienced.'}, {'city': 'SEATTLE', 'heading': 'ARMED SECURITY GUARD SERVICES IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers top-tier armed security services to meet the diverse needs of businesses and individuals. Our armed guards provide a strong deterrent to crime and are prepared to respond to any security threat.'}, {'city': 'VANCOUVER', 'heading': 'ARMED SECURITY GUARD SERVICES IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) is a trusted provider of armed security services in Vancouver. Our armed security personnel are highly trained and committed to providing exceptional security services.'}, {'city': 'HOUSTON', 'heading': 'ARMED SECURITY GUARD SERVICES IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) offers professional armed security services in Houston. Our armed guards are equipped to handle high-risk environments and provide protection for businesses, events, and individuals.'}, {'city': 'SAN ANTONIO', 'heading': 'ARMED SECURITY GUARD SERVICES IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'In San Antonio, American Discount Security (A.D.S.) provides armed security services tailored to the unique needs of businesses and individuals. Our armed guards deliver the highest level of protection and professionalism.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
