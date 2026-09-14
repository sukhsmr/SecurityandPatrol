import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Mobile Patrol Security Services - ADS Guards',
  description: 'Our Security Guards will patrol your property at random times yet systematically with visibility.',
};

const data: ServicePageData = {
  slug: 'mobile-patrol-security',
  heroTitle: 'Mobile Patrol',
  heroSubtitle: 'Security Services',
  heroTagline: 'Our Security Guards will patrol your property at random times yet systematically with visibility.',
  heroBgImage: '/wp-content/uploads/2023/03/MOBILE_PATROL1-1.jpg',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/MOBILE_PATROL-e1753305772866.jpg',
  mainHeading: 'MOBILE PATROL SECURITY SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-8-2026-08_05_41-PM-1-764x1024.png',
  contentRightHeading: `MOBILE PATROL SECURITY IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'Our mobile patrol security services provide a cost-effective alternative to stationary security guards. Mobile patrol guards conduct regular patrols of your property, checking for any signs of intrusion, vandalism, or other security threats. This approach provides broad coverage of large properties and deters criminal activity through unpredictable patrol patterns.',
  benefitsHeading: 'Benefits of Mobile Patrol Security',
  benefits: [
    { title: "1. Cost-Effective Coverage", content: "Mobile patrol security provides comprehensive coverage of large areas at a fraction of the cost of stationary guards, making it an economical choice for businesses." },
    { title: "2. Unpredictable Deterrence", content: "Random patrol patterns make it difficult for criminals to predict when a guard will be present, providing a strong deterrent to criminal activity." },
    { title: "3. Wide Area Coverage", content: "Mobile patrol guards can cover multiple properties or large areas in a single shift, maximizing the effectiveness of your security investment." },
    { title: "4. Rapid Response", content: "Mobile patrol guards can respond quickly to alarms, disturbances, or other security incidents anywhere on your property." },
    { title: "5. Detailed Reporting", content: "Our mobile patrol guards provide detailed reports of their patrols, documenting any incidents or concerns for your review." },
  ],
  whyHeading: 'Why Choose Mobile Patrol Security by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) provides professional mobile patrol security services across California. Our mobile patrol guards are trained, experienced, and equipped with the latest technology.',
  whyItems: [
    { title: "GPS-Tracked Patrols", content: "All our mobile patrol vehicles are GPS-tracked, providing real-time visibility into patrol activities and ensuring accountability." },
    { title: "Customized Patrol Schedules", content: "We work with each client to develop a patrol schedule that meets their specific security needs and budget." },
    { title: "24/7 Dispatch Support", content: "Our mobile patrol guards are backed by 24/7 dispatch support, ensuring a rapid response to any security incidents." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'MOBILE PATROL SECURITY IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional mobile patrol security services in Portland, offering cost-effective coverage for businesses and properties of all sizes.'}, {'city': 'SEATTLE', 'heading': 'MOBILE PATROL SECURITY IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers mobile patrol security services that provide broad coverage of your property, deterring crime and ensuring a rapid response to any security incidents.'}, {'city': 'VANCOUVER', 'heading': 'MOBILE PATROL SECURITY IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) is a trusted provider of mobile patrol security services in Vancouver, offering customized patrol schedules and comprehensive reporting.'}, {'city': 'HOUSTON', 'heading': 'MOBILE PATROL SECURITY IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'In Houston, American Discount Security (A.D.S.) provides mobile patrol security services to protect your property from theft, vandalism, and unauthorized access.'}, {'city': 'SAN ANTONIO', 'heading': 'MOBILE PATROL SECURITY IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides comprehensive mobile patrol security services in San Antonio, ensuring that your property is protected around the clock.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
