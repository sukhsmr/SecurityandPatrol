import React from 'react';
import type { FooterContent, FooterLinkColumn } from '@/lib/cms/types';
import { canonicalHref, canonicalizeHtmlLinks } from '@/lib/content-html';

// Original Elementor ids for the three link columns, by position.
const LINK_COLUMN_IDS = [
  { column: 'a6aff7d', heading: '1d3dc80', list: '5dc6a38', listClass: '' },
  { column: '38d21da', heading: '93ba32b', list: '2d9e962', listClass: ' elementor-align-start' },
  { column: '4039919', heading: '00744c4', list: 'f71447f', listClass: ' elementor-align-start' },
];

function LinkColumn({ column, index }: { column: FooterLinkColumn; index: number }) {
  const ids = LINK_COLUMN_IDS[Math.min(index, LINK_COLUMN_IDS.length - 1)];
  return (
    <div className={`elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-${ids.column}`} data-id={ids.column} data-element_type="column" data-e-type="column">
      <div className="elementor-widget-wrap elementor-element-populated">
        <div className={`elementor-element elementor-element-${ids.heading} elementor-widget elementor-widget-heading`} data-id={ids.heading} data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
          <div className="elementor-widget-container">
            <h2 className="elementor-heading-title elementor-size-default">{column.title}</h2>
          </div>
        </div>
        <div className={`elementor-element elementor-element-${ids.list}${ids.listClass} elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list`} data-id={ids.list} data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
          <div className="elementor-widget-container">
            <ul className="elementor-icon-list-items">
              {column.links.map((link, i) => (
                <li key={i} className="elementor-icon-list-item">
                  <a href={canonicalHref(link.url)}><span className="elementor-icon-list-icon">
                      <i aria-hidden="true" className="icon icon-right-arrow" /> </span>
                    <span className="elementor-icon-list-text">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer({ data }: { data: FooterContent }) {
  return (
    <><footer data-elementor-type="footer" data-elementor-id={4740} className="elementor elementor-4740 elementor-location-footer" data-elementor-post-type="elementor_library">
    <section className="elementor-section elementor-top-section elementor-element elementor-element-2396415 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default" data-id={2396415} data-element_type="section" data-e-type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-4c32545" data-id="4c32545" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-0fabd1b elementor-widget elementor-widget-heading" data-id="0fabd1b" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">{data.ctaHeading}</h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-9a12861 elementor-widget elementor-widget-text-editor" data-id="9a12861" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
              <div className="elementor-widget-container">
                <p>{data.ctaText}</p>
              </div>
            </div>
            <div className="elementor-element elementor-element-793da7b elementor-view-stacked elementor-widget__width-auto elementor-shape-circle elementor-position-block-start elementor-mobile-position-block-start  elementor-widget elementor-widget-icon-box" data-id="793da7b" data-element_type="widget" data-e-type="widget" data-settings="{&quot;_animation&quot;:&quot;flash&quot;}" data-widget_type="icon-box.default">
              <div className="elementor-widget-container">
                <div className="elementor-icon-box-wrapper">
                  <div className="elementor-icon-box-icon">
                    <a href={data.ctaPhoneHref} className="elementor-icon" tabIndex={-1} aria-label={data.ctaPhone}>
                      <i aria-hidden="true" className="icon icon-phone-call1" /> </a>
                  </div>
                  <div className="elementor-icon-box-content">
                    <h3 className="elementor-icon-box-title">
                      <a href={data.ctaPhoneHref}>
                        {`${data.ctaPhone} `}</a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="elementor-section elementor-top-section elementor-element elementor-element-d284126 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="d284126" data-element_type="section" data-e-type="section">
      <div className="elementor-container elementor-column-gap-default">
        {data.linkColumns.map((column, index) => (
          <LinkColumn key={index} column={column} index={index} />
        ))}
      </div>
    </section>
    <section className="elementor-section elementor-top-section elementor-element elementor-element-752fa8f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="752fa8f" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-wider">
        <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-169dd44" data-id="169dd44" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-228eac2 elementor-widget elementor-widget-heading" data-id="228eac2" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">{data.brandTitle}</h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-1c8d852 elementor-widget-divider--view-line elementor-widget elementor-widget-divider" data-id="1c8d852" data-element_type="widget" data-e-type="widget" data-widget_type="divider.default">
              <div className="elementor-widget-container">
                <div className="elementor-divider">
                  <span className="elementor-divider-separator">
                  </span>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-e882635 elementor-widget elementor-widget-image" data-id="e882635" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
              <div className="elementor-widget-container">
                <a href={canonicalHref(data.logo.url || '/')}>
                  <img src={data.logo.src} width={166} height={180} className="attachment-large size-large wp-image-4917" alt={data.logo.alt ?? ''} /> </a>
              </div>
            </div>
            <div className="elementor-element elementor-element-5bc861c elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="5bc861c" data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
              <div className="elementor-widget-container">
                <ul className="elementor-icon-list-items">
                  {data.brandItems.map((item, i) => (
                    <li key={i} className="elementor-icon-list-item">
                      <span className="elementor-icon-list-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-column elementor-col-25 elementor-top-column elementor-element elementor-element-fdcc965" data-id="fdcc965" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-b5bc887 elementor-widget elementor-widget-heading" data-id="b5bc887" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">{data.contactTitle}</h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-a456e57 elementor-widget-divider--view-line elementor-widget elementor-widget-divider" data-id="a456e57" data-element_type="widget" data-e-type="widget" data-widget_type="divider.default">
              <div className="elementor-widget-container">
                <div className="elementor-divider">
                  <span className="elementor-divider-separator">
                  </span>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-2c47175 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="2c47175" data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
              <div className="elementor-widget-container">
                <ul className="elementor-icon-list-items">
                  {data.contactLines.map((line, i) => (
                    <li key={i} className="elementor-icon-list-item">
                      <span className="elementor-icon-list-text">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="elementor-element elementor-element-470fef3 elementor-widget elementor-widget-heading" data-id="470fef3" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">{data.officesTitle}</h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-82ecd9e elementor-widget elementor-widget-text-editor" data-id="82ecd9e" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
              <div className="elementor-widget-container">
                <p dangerouslySetInnerHTML={{ __html: canonicalizeHtmlLinks(data.officesHtml) }} />
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-a69f8e0" data-id="a69f8e0" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-element elementor-element-36d4050 elementor-widget elementor-widget-heading" data-id="36d4050" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default" dangerouslySetInnerHTML={{ __html: data.newsletterHeadingHtml }} />
              </div>
            </div>
            <div className="elementor-element elementor-element-a80258b elementor-button-align-stretch elementor-widget elementor-widget-form" data-id="a80258b" data-element_type="widget" data-e-type="widget" data-settings="{&quot;button_width&quot;:&quot;25&quot;,&quot;step_next_label&quot;:&quot;Next&quot;,&quot;step_previous_label&quot;:&quot;Previous&quot;,&quot;step_type&quot;:&quot;number_text&quot;,&quot;step_icon_shape&quot;:&quot;circle&quot;}" data-widget_type="form.default">
              <div className="elementor-widget-container">
                <form className="elementor-form" method="post" name="New Form" aria-label="New Form">
                  <input type="hidden" name="post_id" defaultValue={4740} />
                  <input type="hidden" name="form_id" defaultValue="a80258b" />
                  <input type="hidden" name="referer_title" defaultValue="Licensed Security Guard Services in California - Rayven Security Protection" /><input type="hidden" name="queried_id" defaultValue={7} />
                  <div className="elementor-form-fields-wrapper elementor-labels-">
                    <div className="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-email elementor-col-50 elementor-field-required">
                      <input size={1} type="email" name="form_fields[email]" id="form-field-email" className="elementor-field elementor-size-sm  elementor-field-textual" placeholder={data.newsletterPlaceholder} required={true} />
                    </div>
                    <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-25 e-form__buttons">
                      <button className="elementor-button elementor-size-sm" type="submit">
                        <span className="elementor-button-content-wrapper">
                          <span className="elementor-button-text">{data.newsletterButtonText}</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {data.copyright && (
      <section className="elementor-section elementor-top-section elementor-section-boxed">
        <div className="elementor-container">
          <p style={{ width: '100%', textAlign: 'center', margin: '10px 0' }}>{data.copyright}</p>
        </div>
      </section>
    )}
  </footer></>

  );
}
