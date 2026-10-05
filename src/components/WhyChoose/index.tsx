"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AboutExpandableData } from '@/lib/cms/sections/definitions';

export default function WhyChoose({ data }: { data: AboutExpandableData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <><section className="elementor-section elementor-top-section elementor-element elementor-element-e5066b8 elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle" data-id="e5066b8" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
    <div className="elementor-container elementor-column-gap-default">
      <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-2f6b6df" data-id="2f6b6df" data-element_type="column" data-e-type="column">
        <div className="elementor-widget-wrap elementor-element-populated">
          <div className="elementor-element elementor-element-c02854c elementor-widget elementor-widget-image" data-id="c02854c" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
            <div className="elementor-widget-container">
              <img src={data.image.src} decoding="async" title={data.image.alt} alt={data.image.alt ?? ''} loading="lazy" width={500} height={540} />
            </div>
          </div>
        </div>
      </div>
      <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-e50cc40 profile-cardabout" data-id="e50cc40" data-element_type="column" data-e-type="column">
        <div className="elementor-widget-wrap elementor-element-populated">
          <div className="elementor-element elementor-element-a990fdb elementor-widget elementor-widget-heading" data-id="a990fdb" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">
                {data.heading}</h2>
            </div>
          </div>
          {data.subheading && (
          <div className="elementor-element elementor-element-3da4d4d elementor-widget elementor-widget-heading" data-id="3da4d4d" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">
                {data.subheading}
              </h2>
            </div>
          </div>
          )}
          {data.tagline && (
          <div className="elementor-element elementor-element-55d5fb0 elementor-widget elementor-widget-text-editor" data-id="55d5fb0" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              <p>{data.tagline}</p>
            </div>
          </div>
          )}
          <div className="elementor-element elementor-element-19cb1e1 elementor-widget elementor-widget-text-editor" data-id="19cb1e1" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              {data.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="elementor-element elementor-element-83f22b9 details-areaabout e-flex e-con-boxed e-con e-parent u-overflow-hidden"
                data-id="83f22b9"
                data-element_type="container"
                data-e-type="container"
              >
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-aae0780 elementor-widget elementor-widget-text-editor" data-id="aae0780" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                    <div className="elementor-widget-container">
                      {data.highlights.length > 0 && (
                        <p className="u-text-gray-200 u-font-semibold u-tracking-wide">
                          {data.highlights.map((line, i) => (
                            <strong key={i}>{line}{i < data.highlights.length - 1 && <br />}</strong>
                          ))}
                        </p>
                      )}
                      <p className="u-text-justify u-text-gray-400 u-mb-5">
                        {data.moreText}<span className="text-primary cursor-pointer">&nbsp;</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!expanded ? (
            <div className="elementor-element elementor-element-ce5f1ba elementor-align-left show-moreabout elementor-widget elementor-widget-button" data-id="ce5f1ba" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a className="elementor-button elementor-button-link elementor-size-sm" href="#" onClick={(e) => { e.preventDefault(); setExpanded(true); }}>
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-text">{data.showMoreText}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="elementor-element elementor-element-b4fa1a5 elementor-align-left show-lessabout elementor-widget elementor-widget-button" data-id="b4fa1a5" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a className="elementor-button elementor-button-link elementor-size-sm" href="#" onClick={(e) => { e.preventDefault(); setExpanded(false); }}>
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-text">{data.showLessText}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </section></>
  );
}
