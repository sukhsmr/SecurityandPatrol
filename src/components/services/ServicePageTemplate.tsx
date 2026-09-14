'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export interface AccordionItem {
  title: string;
  content: string;
}

export interface CitySection {
  city: string;
  heading: string;
  intro: string;
  subSections?: { title: string; content: string }[];
  closing?: string;
}

export interface ServicePageData {
  slug: string;
  heroTitle: string;           // e.g. "Unarmed Security"
  heroSubtitle: string;        // e.g. "guard Services"
  heroTagline: string;         // e.g. "Protecting People and Their Property Is Our Specialty."
  heroBgImage: string;         // local or remote URL
  heroRightImage: string;      // right column bg image
  mainHeading: string;         // big h2 at the top of content section
  contentImage: string;        // left image in 2-col section
  contentRightHeading: string; // h3 of right content col
  contentRightBody: string;    // main description paragraph
  benefitsHeading: string;     // accordion section 1 heading
  benefits: AccordionItem[];
  whyHeading: string;          // accordion section 2 heading  
  whyIntro: string;
  whyItems: AccordionItem[];
  cities: CitySection[];
}

interface Props {
  data: ServicePageData;
}

function Accordion({ items, idPrefix }: { items: AccordionItem[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="elementor-accordion">
      {items.map((item, i) => (
        <div key={i} className="elementor-accordion-item" style={{ borderBottom: '1px solid #ddd' }}>
          <div
            className={`elementor-tab-title ${open === i ? 'elementor-active' : ''}`}
            role="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              cursor: 'pointer',
              backgroundColor: open === i ? '#f5f5f5' : '#fff',
              fontFamily: '"Plus Jakarta Sans", Sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              color: '#1a1a1a',
              userSelect: 'none',
            }}
          >
            <a className="elementor-accordion-title" tabIndex={0} style={{ color: 'inherit', textDecoration: 'none', flex: 1 }}>
              {item.title}
            </a>
            <span className="elementor-accordion-icon elementor-accordion-icon-right" aria-hidden="true" style={{ marginLeft: 8 }}>
              {open === i
                ? <i className="fas fa-chevron-up" style={{ color: '#EE8E09' }} />
                : <i className="fas fa-chevron-down" style={{ color: '#666' }} />
              }
            </span>
          </div>
          {open === i && (
            <div
              className="elementor-tab-content elementor-clearfix"
              style={{
                padding: '16px 20px',
                fontFamily: '"Plus Jakarta Sans", Sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#374151',
                lineHeight: 1.7,
                backgroundColor: '#fff',
              }}
            >
              <p style={{ margin: 0 }}>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ServicePageTemplate({ data }: Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ===== SERVICE PAGE SHARED CSS (elementor-379 pattern) ===== */

        /* Hero Section */
        .svc-hero {
          position: relative;
          overflow: hidden;
          background-color: #161616;
          background-image: url(${data.heroBgImage});
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          padding: 0;
        }
        .svc-hero .elementor-background-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0,0,0,0.45);
          z-index: 1;
        }
        .svc-hero .elementor-container {
          position: relative;
          z-index: 2;
          display: flex;
          max-width: 1140px;
          margin: 0 auto;
          width: 100%;
        }

        /* Left column of hero */
        .svc-hero-left {
          width: 47.823%;
          padding: 80px 20px 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
        .svc-hero-left .elementor-heading-title {
          font-family: "Bebas Neue", Sans-serif;
          font-size: 72px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: var(--e-global-color-primary, #EE8E09);
          line-height: 1;
          margin: 0;
        }
        .svc-hero-left .elementor-heading-title span {
          display: block;
          color: #fff;
          font-size: 60px;
        }
        .svc-hero-left .svc-divider {
          width: 82%;
          height: 5px;
          background-color: #fff;
          margin: 14px 0;
        }
        .svc-hero-left .svc-tagline {
          font-family: "Roboto", Sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #D1D5DB;
          margin: 0 0 15px 0;
          padding-right: 61px;
        }
        .svc-hero-left .elementor-button {
          background-color: #EE8E09;
          font-family: "Roboto", Sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 0;
          display: inline-block;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .svc-hero-left .elementor-button:hover {
          opacity: 0.9;
        }
        /* Right column of hero - image background */
        .svc-hero-right {
          width: 52.177%;
          min-height: 420px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        /* Content Section 1 - Main intro */
        .svc-section-intro {
          background-image: url(https://www.adsguards.com/wp-content/uploads/2023/02/Backgorund-Pattern.png);
          background-color: #1a1a1a;
          padding: 50px 0 60px 0;
        }
        .svc-section-intro .elementor-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .svc-section-intro .svc-main-h2 {
          font-family: "Bebas Neue", Sans-serif;
          font-size: 60px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: #FFF;
          margin: 0 0 30px 0;
          line-height: 1.1;
        }
        .svc-intro-cols {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }
        .svc-intro-img-col {
          width: 50%;
          flex-shrink: 0;
        }
        .svc-intro-img-col img {
          width: 100%;
          height: auto;
          display: block;
        }
        .svc-intro-text-col {
          width: 50%;
        }
        .svc-intro-text-col h3 {
          font-family: "Bebas Neue", Sans-serif;
          font-size: 28px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: #FFF;
          margin: 0 0 16px 0;
          line-height: 1.3;
        }
        .svc-intro-text-col p {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #D1D5DB;
          line-height: 1.7;
          margin: 0;
        }

        /* Benefits Section */
        .svc-section-benefits {
          background-color: #1a1a1a;
          padding: 50px 0;
        }
        .svc-section-benefits .elementor-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .svc-section-benefits h2 {
          font-family: "Bebas Neue", Sans-serif;
          font-size: 32px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: #FFF;
          margin: 0 0 20px 0;
          text-align: center;
        }

        /* Why Section */
        .svc-section-why {
          background-image: url(https://www.adsguards.com/wp-content/uploads/2023/02/Backgorund-Pattern.png);
          background-color: #1a1a1a;
          padding: 50px 0;
        }
        .svc-section-why .elementor-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .svc-section-why h2 {
          font-family: "Bebas Neue", Sans-serif;
          font-size: 32px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: #FFF;
          margin: 0 0 12px 0;
          text-align: center;
        }
        .svc-section-why .svc-why-intro {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #D1D5DB;
          line-height: 1.7;
          margin: 0 0 20px 0;
          text-align: center;
        }

        /* City Sections */
        .svc-city-section {
          background-color: #1a1a1a;
          padding: 50px 0;
          border-top: 1px solid #2a2a2a;
        }
        .svc-city-section .elementor-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .svc-city-section h2 {
          font-family: "Bebas Neue", Sans-serif;
          font-size: 35px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: #FFF;
          margin: 0 0 16px 0;
          line-height: 1.2;
        }
        .svc-city-section h3 {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #EE8E09;
          margin: 20px 0 8px 0;
        }
        .svc-city-section p {
          font-family: "Plus Jakarta Sans", Sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #D1D5DB;
          line-height: 1.7;
          margin: 0 0 14px 0;
        }
        .svc-city-section .svc-city-name {
          color: #EE8E09;
          font-weight: 600;
        }

        /* Accordion styling */
        .elementor-accordion {
          background-color: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }
        .elementor-accordion-item:first-child .elementor-tab-title {
          border-top: none;
        }
        .elementor-accordion-item .elementor-tab-title {
          border-top: 1px solid #e5e7eb;
        }

        @media (max-width: 768px) {
          .svc-hero-left {
            width: 100%;
            padding: 60px 20px 40px 20px;
          }
          .svc-hero-right {
            display: none;
          }
          .svc-hero-left .elementor-heading-title {
            font-size: 51px;
          }
          .svc-hero-left .elementor-heading-title span {
            font-size: 40px;
          }
          .svc-intro-cols {
            flex-direction: column;
          }
          .svc-intro-img-col,
          .svc-intro-text-col {
            width: 100%;
          }
          .svc-section-intro .svc-main-h2 {
            font-size: 35px;
          }
          .svc-city-section .elementor-container {
            padding: 0 20px;
          }
        }

        @media (max-width: 480px) {
          .svc-hero-left .elementor-heading-title {
            font-size: 35px;
          }
          .svc-hero-left .elementor-heading-title span {
            font-size: 28px;
          }
          .svc-hero-left {
            padding: 50px 15px 30px 15px;
          }
        }
      `}} />

      {/* ====== HERO SECTION ====== */}
      <section className="svc-hero elementor-section elementor-top-section elementor-section-stretched elementor-section-content-top elementor-section-boxed">
        <div className="elementor-background-overlay"></div>
        <div className="elementor-container">
          <div className="svc-hero-left elementor-column elementor-col-50 elementor-top-column">
            <div className="elementor-widget-wrap elementor-element-populated">
              {/* Title */}
              <div className="elementor-element elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h1 className="elementor-heading-title elementor-size-default">
                    {data.heroTitle}
                    <br />
                    <span>{data.heroSubtitle}</span>
                  </h1>
                </div>
              </div>
              {/* Divider */}
              <div className="svc-divider"></div>
              {/* Tagline */}
              {data.heroTagline && (
                <div className="elementor-element elementor-widget elementor-widget-text-editor elementor-hidden-mobile">
                  <div className="elementor-widget-container">
                    <p className="svc-tagline">{data.heroTagline}</p>
                  </div>
                </div>
              )}
              {/* CTA Button */}
              <div className="elementor-element elementor-widget elementor-widget-button">
                <div className="elementor-widget-container">
                  <div className="elementor-button-wrapper">
                    <Link className="elementor-button elementor-button-link elementor-size-md" href="/contact-us">
                      <span className="elementor-button-content-wrapper">
                        <span className="elementor-button-text">GET A QUOTE</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - hero image */}
          <div
            className="svc-hero-right elementor-column elementor-col-50 elementor-top-column"
            style={{
              backgroundImage: `url(${data.heroRightImage})`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          ></div>
        </div>
      </section>

      {/* ====== MAIN INTRO SECTION ====== */}
      <section className="svc-section-intro elementor-section elementor-top-section elementor-section-boxed">
        <div className="elementor-container">
          {/* Big heading */}
          <h2 className="svc-main-h2">{data.mainHeading}</h2>

          {/* Two columns: image + text */}
          <div className="svc-intro-cols">
            <div className="svc-intro-img-col">
              <img src={data.contentImage} alt={data.heroTitle} loading="lazy" />
            </div>
            <div className="svc-intro-text-col">
              <h3 dangerouslySetInnerHTML={{ __html: data.contentRightHeading }} />
              <p>{data.contentRightBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BENEFITS SECTION (Accordion 1) ====== */}
      <section className="svc-section-benefits">
        <div className="elementor-container">
          <h2>{data.benefitsHeading}</h2>
          <Accordion items={data.benefits} idPrefix={`${data.slug}-benefits`} />
        </div>
      </section>

      {/* ====== WHY CHOOSE US SECTION (Accordion 2) ====== */}
      <section className="svc-section-why">
        <div className="elementor-container">
          <h2>{data.whyHeading}</h2>
          {data.whyIntro && <p className="svc-why-intro">{data.whyIntro}</p>}
          <Accordion items={data.whyItems} idPrefix={`${data.slug}-why`} />
        </div>
      </section>

      {/* ====== CITY SECTIONS ====== */}
      {data.cities.map((city, i) => (
        <section key={i} className="svc-city-section">
          <div className="elementor-container">
            <h2>
              {city.heading.split(city.city).map((part, j, arr) =>
                j < arr.length - 1
                  ? <React.Fragment key={j}>{part}<span className="svc-city-name">{city.city} </span></React.Fragment>
                  : <React.Fragment key={j}>{part}</React.Fragment>
              )}
            </h2>
            <p>{city.intro}</p>
            {city.subSections?.map((sub, k) => (
              <div key={k}>
                <h3>{sub.title}</h3>
                <p>{sub.content}</p>
              </div>
            ))}
            {city.closing && <p>{city.closing}</p>}
          </div>
        </section>
      ))}
    </>
  );
}
