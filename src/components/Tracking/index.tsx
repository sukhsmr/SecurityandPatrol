"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FeatureCard, FeatureCardsData } from '@/lib/cms/sections/definitions';

const GUARDONE_LIST_STYLE = `
.guardone-heading { font-weight: 600; font-size: 1.25rem; line-height: 1.75rem; color: #fff; }
.guardone-list { list-style-type: disc; list-style-position: outside; padding-left: 2rem; color: #f3f4f6; font-size: 19px; line-height: 2.25rem; }
`;

// Original Elementor element ids per card position; extra cards alternate these styles.
const CARD_IDS = [
  { column: 'f98bd95', logo: 'a7bf670', heading: 'd4ab36d', details: 'c9e7336', text: 'ad20cfb', more: '042d98e', less: '59a4c60', listHeadingClass: 'guardone-heading' },
  { column: '604aa78', logo: 'a7bf670', heading: 'af8692a', details: 'a2aaf12', text: '4a0b848', more: 'f0fda03', less: '4f7cf3e', listHeadingClass: undefined },
];

function ToggleButton({ id, kind, text, onClick }: { id: string; kind: 'show-more' | 'show-less'; text: string; onClick: () => void }) {
  return (
    <div className={`elementor-element elementor-element-${id} elementor-align-center ${kind} elementor-widget elementor-widget-button u-mt-4`} data-id={id} data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
      <div className="elementor-widget-container">
        <div className="elementor-button-wrapper">
          <a className="elementor-button elementor-button-link elementor-size-sm" href="#" onClick={(e) => { e.preventDefault(); onClick(); }}>
            <span className="elementor-button-content-wrapper">
              <span className="elementor-button-text">{text}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Card({ card, index, showMoreText, showLessText }: { card: FeatureCard; index: number; showMoreText: string; showLessText: string }) {
  const [expanded, setExpanded] = useState(false);
  const ids = CARD_IDS[index % CARD_IDS.length];

  return (
    <div className={`elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-${ids.column} profile-card`} data-id={ids.column} data-element_type="column" data-e-type="column">
      <motion.div
        className="elementor-widget-wrap elementor-element-populated u-overflow-hidden"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="elementor-background-overlay" />
        {card.logo.src && (
          <div className={`elementor-element elementor-element-${ids.logo} elementor-widget elementor-widget-image`} data-id={ids.logo} data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
            <div className="elementor-widget-container">
              <img src={card.logo.src} loading="lazy" decoding="async" width={73} height={73} className="attachment-large size-large wp-image-122" alt={card.logo.alt ?? ''} />
            </div>
          </div>
        )}
        <div className={`elementor-element elementor-element-${ids.heading} elementor-widget elementor-widget-heading`} data-id={ids.heading} data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
          <div className="elementor-widget-container">
            <h2 className="elementor-heading-title elementor-size-default">
              {card.title}
            </h2>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`elementor-element elementor-element-${ids.details} details-area e-flex e-con-boxed e-con e-parent u-overflow-hidden`}
              data-id={ids.details}
              data-element_type="container"
              data-e-type="container"
            >
              <div className="e-con-inner">
                <div className={`elementor-element elementor-element-${ids.text} elementor-widget elementor-widget-text-editor`} data-id={ids.text} data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                  <div className="elementor-widget-container">
                    {card.listHeading && (
                      <p className={ids.listHeadingClass} style={{textAlign: 'center'}}><strong>{card.listHeading}</strong></p>
                    )}
                    <ul className="guardone-list">
                      {card.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded ? (
          <ToggleButton id={ids.more} kind="show-more" text={showMoreText} onClick={() => setExpanded(true)} />
        ) : (
          <ToggleButton id={ids.less} kind="show-less" text={showLessText} onClick={() => setExpanded(false)} />
        )}
      </motion.div>
    </div>
  );
}

export default function Tracking({ data }: { data: FeatureCardsData }) {
  return (
    <><section className="elementor-section elementor-top-section elementor-element elementor-element-1f6bb37 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default" data-id="1f6bb37" data-element_type="section" data-e-type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}">
    <style dangerouslySetInnerHTML={{ __html: GUARDONE_LIST_STYLE }} />
    <div className="elementor-container elementor-column-gap-default">
      {data.cards.map((card, index) => (
        <Card key={index} card={card} index={index} showMoreText={data.showMoreText} showLessText={data.showLessText} />
      ))}
    </div>
  </section></>
  );
}
