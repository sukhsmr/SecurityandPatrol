"use client";
import React from 'react';
import { motion } from 'framer-motion';
import type { Service } from '@/lib/data/services';

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

const CARD_STYLE_OVERRIDE = `
/* Legend Numbers */
.services-list-card .u-px-3 {
  background-color: #171717 !important;
  color: #ffffff !important;
  font-family: Plus Jakarta, sans-serif !important;
  font-size: 20px !important;
  font-weight: 300 !important;
}
/* Card Titles */
.services-list-card .u-text-xl {
  font-weight: 600 !important;
  font-family: Plus Jakarta, sans-serif !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}
/* Card Descriptions */
.services-list-card .u-text-gray-400 {
  font-family: Plus Jakarta, sans-serif !important;
  font-size: 15px !important;
  line-height: 1.6 !important;
  color: #a1a1aa !important;
}
/* Backgrounds and Borders */
.services-list-card fieldset {
  background-color: #171717 !important;
  border-color: #ffffff !important;
}
/* Ensure widget doesn't add extra margin */
.elementor-widget-wrap > .services-list-card.elementor-widget,
.services-list-card.elementor-widget {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
/* Responsive Layout */
@media (max-width: 767px) {
  /* Remove Elementor gap to stick cards together */
  .elementor-element-065e8c7 .elementor-widget-wrap,
  .elementor-element-e069192 .elementor-widget-wrap {
    gap: 0 !important;
    padding: 0 !important;
  }
  /* Remove gap between columns */
  .elementor-element-065e8c7 {
    margin-bottom: 0 !important;
  }
  /* 
   * Use minus margin to stick the cards together,
   * collapsing the borders perfectly without overlapping text.
   */
  .services-list-card fieldset {
    margin-top: -1px !important;
    margin-bottom: 0 !important;
  }
}
`;

export default function ServicesList({ services }: { services: Service[] }) {
  const [left, right] = chunk(services, Math.ceil(services.length / 2) || 1);

  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-d8a61f1 elementor-hidden-desktop elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="d8a61f1" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <style dangerouslySetInnerHTML={{ __html: CARD_STYLE_OVERRIDE }} />
      <div className="elementor-container elementor-column-gap-no u-overflow-hidden">
        <motion.div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-065e8c7"
          data-element_type="column"
          data-e-type="column"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            {left.map((service, i) => (
              <div key={service.id} className="elementor-element elementor-widget elementor-widget-html services-list-card" data-element_type="widget" data-e-type="widget" data-widget_type="html.default">
                <div className="elementor-widget-container">
                  <fieldset className="u-border u-card-grid u-p-4">
                    <legend className="u-px-3 u-text-2xl">{String(i + 1).padStart(2, '0')}</legend>
                    <div className="u-px-4 u-pb-3">
                      <p className="u-text-xl u-tracking-wider u-text-white u-font-light">{service.title}</p>
                      {service.summary && <p className="u-text-gray-400 u-mt-4 u-font-light">{service.summary}</p>}
                    </div>
                  </fieldset>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-e069192"
          data-element_type="column"
          data-e-type="column"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            {right.map((service, i) => (
              <div key={service.id} className="elementor-element elementor-widget elementor-widget-html services-list-card" data-element_type="widget" data-e-type="widget" data-widget_type="html.default">
                <div className="elementor-widget-container">
                  <fieldset className="u-border u-card-grid u-p-4">
                    <legend className="u-px-3 u-text-2xl">{String(left.length + i + 1).padStart(2, '0')}</legend>
                    <div className="u-px-4 u-pb-3">
                      <p className="u-text-xl u-tracking-wider u-text-white u-font-light">{service.title}</p>
                      {service.summary && <p className="u-text-gray-400 u-mt-4 u-font-light">{service.summary}</p>}
                    </div>
                  </fieldset>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
