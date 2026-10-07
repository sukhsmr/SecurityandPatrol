import React from 'react';
import ElementorRawView from '@/components/ElementorRawView';
import Hero from '@/components/Hero';
import Offices from '@/components/Offices';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';
import Testimonials from '@/components/Testimonials';
import Tracking from '@/components/Tracking';
import WhyChoose from '@/components/WhyChoose';
import { CareerForm, CareerHero, SectionHeading } from '@/components/CareerContent';
import { backgroundCssForFields } from '@/lib/cms/backgrounds';
import { getSectionDefinition } from '@/lib/cms/sections/definitions';
import type * as S from '@/lib/cms/sections/definitions';
import { getOffices } from '@/lib/cms/services/content';
import type { Section } from '@/lib/cms/types';
import { BlogBanner, BlogIntro, BlogList } from './BlogSections';
import { ContactFormSection, ContactHeroSection, ContactIntroSection, ContactLocationsSection } from './ContactSections';
import ServicesGridSection from './ServicesGridSection';
import WhyChooseUsSection from './WhyChooseUsSection';

async function OfficesSection({ data }: { data: S.OfficesSectionData }) {
  const offices = await getOffices();
  return <Offices offices={offices} title={data.title} />;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type SectionComponent = React.ComponentType<{ data: any }>;

/** Maps each section type to the component that renders it. */
const SECTION_COMPONENTS: Record<string, SectionComponent> = {
  hero: Hero,
  'feature-cards': Tracking,
  'about-expandable': WhyChoose,
  'services-grid': ServicesGridSection,
  'why-choose-us': WhyChooseUsSection,
  offices: OfficesSection,
  testimonials: Testimonials,
  'blog-banner': BlogBanner,
  'blog-intro': BlogIntro,
  'blog-list': BlogList,
  'career-hero': CareerHero,
  'section-heading': SectionHeading,
  'career-form': CareerForm,
  'legal-content': PrivacyPolicyContent,
  'contact-hero': ContactHeroSection,
  'contact-intro': ContactIntroSection,
  'contact-locations': ContactLocationsSection,
  'contact-form': ContactFormSection,
  html: ({ data }: { data: S.HtmlSectionData }) => <ElementorRawView contentHtml={data.html} />,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface SectionRendererProps {
  section: Section;
  /** Elementor wrapper id of the page the section is rendered on. */
  pageScope?: number;
}

export default function SectionRenderer({ section, pageScope }: SectionRendererProps) {
  const Component = SECTION_COMPONENTS[section.type];
  if (!Component) {
    console.error(`[cms] No component registered for section type "${section.type}" (section ${section.id}).`);
    return null;
  }

  const definition = getSectionDefinition(section.type);
  // Background images changed in the admin override the design CSS.
  const backgroundCss = definition ? backgroundCssForFields(definition.fields, section.data) : '';
  const rendered = backgroundCss ? (
    <>
      <style data-cms-backgrounds="">{backgroundCss}</style>
      <Component data={section.data} />
    </>
  ) : (
    <Component data={section.data} />
  );
  const scope = definition?.scope;
  // Sections keep their original Elementor CSS scope when placed on another page.
  if (scope && scope !== pageScope) {
    return <div className={`elementor elementor-${scope}`}>{rendered}</div>;
  }
  return rendered;
}
