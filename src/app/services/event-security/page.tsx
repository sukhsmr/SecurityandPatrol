import { Metadata } from 'next';
import ServicePageTemplate, { ServicePageData } from '@/components/services/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Event Security Services - ADS Guards',
  description: 'American Discount Security (A.D.S.) can deploy trained security professionals to prevent any security risks before it becomes a problem.',
};

const data: ServicePageData = {
  slug: 'event-security',
  heroTitle: 'Event Security',
  heroSubtitle: 'Services',
  heroTagline: 'American Discount Security (A.D.S.) can deploy trained security professionals to prevent any security risks before it becomes a problem.',
  heroBgImage: '/wp-content/uploads/2023/03/Event1-2-1.jpg',
  heroRightImage: 'https://www.adsguards.com/wp-content/uploads/2023/03/Event-Protection-1024x683-1-1.jpg',
  mainHeading: 'EVENT SECURITY SERVICES BY American Discount Security (A.D.S.)',
  contentImage: 'https://www.adsguards.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-8-2026-09_40_42-PM.png',
  contentRightHeading: `EVENT SECURITY IN <span style="color:#EE8E09;font-weight:600">CALIFORNIA</span> BY American Discount Security (A.D.S.)`,
  contentRightBody: 'American Discount Security (A.D.S.) can deploy trained security professionals to prevent any security risks before they become a problem. Our event security team is experienced in managing large crowds, VIP protection, access control, and emergency response at concerts, sporting events, corporate events, and private parties.',
  benefitsHeading: 'Benefits of Professional Event Security',
  benefits: [
    { title: "1. Crowd Management", content: "Our event security guards are trained in crowd management techniques to ensure the safety and orderly movement of attendees at your event." },
    { title: "2. Access Control", content: "We manage entry points to your event, checking credentials, preventing unauthorized access, and ensuring that only ticketed guests are admitted." },
    { title: "3. VIP Protection", content: "Our event security team is experienced in providing close protection services for VIPs, celebrities, and other high-profile individuals attending your event." },
    { title: "4. Emergency Response", content: "In the event of an emergency, our security guards are trained to respond quickly and coordinate with emergency services to ensure the safety of all attendees." },
    { title: "5. Conflict Resolution", content: "Our security guards are skilled in de-escalating conflicts and resolving disputes peacefully, ensuring a positive experience for all event attendees." },
  ],
  whyHeading: 'Why Choose Event Security by American Discount Security (A.D.S.)?',
  whyIntro: 'American Discount Security (A.D.S.) has extensive experience providing event security services for a wide range of events, from small private gatherings to large-scale public events.',
  whyItems: [
    { title: "Experienced Event Security Team", content: "Our event security guards have experience working at a wide range of events, including concerts, sporting events, corporate events, and private parties." },
    { title: "Customized Security Plans", content: "We develop a customized security plan for each event, taking into account the specific security needs and risks associated with your event." },
    { title: "Coordination with Authorities", content: "We work closely with local law enforcement and emergency services to ensure a coordinated response to any security incidents." },
  ],
  cities: [{'city': 'PORTLAND', 'heading': 'EVENT SECURITY IN PORTLAND BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides professional event security services in Portland, ensuring the safety of your guests and the smooth operation of your event.'}, {'city': 'SEATTLE', 'heading': 'EVENT SECURITY IN SEATTLE BY American Discount Security (A.D.S.)', 'intro': 'In Seattle, American Discount Security (A.D.S.) offers comprehensive event security services to protect your event from potential security threats.'}, {'city': 'VANCOUVER', 'heading': 'EVENT SECURITY IN VANCOUVER BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) is a trusted provider of event security services in Vancouver, helping event organizers ensure the safety and security of their events.'}, {'city': 'HOUSTON', 'heading': 'EVENT SECURITY IN HOUSTON BY American Discount Security (A.D.S.)', 'intro': 'In Houston, American Discount Security (A.D.S.) provides professional event security services to protect your guests and ensure a successful event.'}, {'city': 'SAN ANTONIO', 'heading': 'EVENT SECURITY IN SAN ANTONIO BY American Discount Security (A.D.S.)', 'intro': 'American Discount Security (A.D.S.) provides comprehensive event security services in San Antonio, ensuring that your event is safe, secure, and successful.'}],
};

export default function Page() {
  return <ServicePageTemplate data={data} />;
}
