import React from 'react';
import type { HeroData } from '@/lib/cms/sections/definitions';
import { canonicalHref } from '@/lib/content-html';

export default function Hero({ data }: { data: HeroData }) {
  return (
    <><section className="elementor-section elementor-top-section elementor-element elementor-element-3a160be elementor-section-stretched elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3a160be" data-element_type="section" data-e-type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}">
    <div className="elementor-background-overlay" />
    <div className="elementor-container elementor-column-gap-default">
      <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-48ddf75" data-id="48ddf75" data-element_type="column" data-e-type="column">
        <div className="elementor-widget-wrap elementor-element-populated">
          <div className="elementor-element elementor-element-f397304 elementor-widget elementor-widget-heading" data-id="f397304" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
            <div className="elementor-widget-container">
              <h1 className="elementor-heading-title elementor-size-default">
                {data.highlight && <span style={{color: '#ee8e09'}}>{data.highlight}</span>}
                {data.title}</h1>
            </div>
          </div>
          {data.subtitle && (
          <div className="elementor-element elementor-element-b17eb01 elementor-widget elementor-widget-text-editor" data-id="b17eb01" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              <p>{data.subtitle}</p>
            </div>
          </div>
          )}
          {data.badgeImage.src && (
          <div className="elementor-element elementor-element-e024ede elementor-hidden-desktop elementor-widget elementor-widget-image" data-id="e024ede" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
            <div className="elementor-widget-container">
              <img decoding="sync" width={300} height={280} src={data.badgeImage.src} className="attachment-large size-large wp-image-2764" alt={data.badgeImage.alt ?? ''} fetchPriority="high" />
            </div>
          </div>
          )}
          {data.buttonText && (
          <div className="elementor-element elementor-element-06f0688 elementor-widget elementor-widget-button" data-id="06f0688" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <a className="elementor-button elementor-button-link elementor-size-sm" href={canonicalHref(data.buttonUrl || '#')}>
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-text">{data.buttonText}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-ec5f5b8" data-id="ec5f5b8" data-element_type="column" data-e-type="column">
        <div className="elementor-widget-wrap elementor-element-populated">
          {data.sideImage.src && (
          <div className="elementor-element elementor-element-49973bf elementor-absolute elementor-widget__width-initial elementor-widget-mobile__width-initial elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-image" data-id="49973bf" data-element_type="widget" data-e-type="widget" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}" data-widget_type="image.default">
            <div className="elementor-widget-container">
              <img src={data.sideImage.src} decoding="async" width={500} height={500} className="attachment-large size-large wp-image-4921" alt={data.sideImage.alt ?? ''} srcSet={data.sideImage.srcSet || undefined} sizes={data.sideImage.srcSet ? '(max-width: 500px) 100vw, 500px' : undefined} />
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  </section></>

  );
}
