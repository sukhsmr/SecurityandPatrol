import React from 'react';
import { chunk } from '@/lib/chunk';
import type { Office } from '@/lib/cms/types';

export default function Offices({ offices, title }: { offices: Office[]; title: string }) {
  const columns = chunk(offices, Math.ceil(offices.length / 3) || 1);

  return (
    <div className="elementor elementor-966">
      <section className="elementor-section elementor-top-section elementor-element elementor-element-cfb9aa5 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="cfb9aa5" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-ebd6a01" data-id="ebd6a01" data-element_type="column" data-e-type="column">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-9250e56 elementor-widget elementor-widget-heading" data-id="9250e56" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">{title}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="elementor-section elementor-top-section elementor-element elementor-element-bd5f66c elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="bd5f66c" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div className="elementor-container elementor-column-gap-default">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-7ae3e47" data-id="7ae3e47" data-element_type="column" data-e-type="column">
              <div className="elementor-widget-wrap elementor-element-populated">
                {column.map((office) => {
                  const anchorId = office.anchor;
                  return (
                    <React.Fragment key={office.name}>
                      {anchorId && (
                        <div className="elementor-element elementor-widget elementor-widget-menu-anchor" data-widget_type="menu-anchor.default">
                          <div className="elementor-widget-container">
                            <div className="elementor-menu-anchor" id={anchorId}></div>
                          </div>
                        </div>
                      )}
                      
                      {office.imageUrl && (
                        <div className="elementor-element elementor-element-a71e52c elementor-widget elementor-widget-image" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                          <div className="elementor-widget-container">
                            <img loading="lazy" decoding="async" width={471} height={316} src={office.imageUrl} className="attachment-large size-large wp-image-284" alt={office.imageAlt || office.name} sizes="(max-width: 471px) 100vw, 471px" />
                          </div>
                        </div>
                      )}

                      <div className="elementor-element elementor-element-6a38bb6 elementor-widget elementor-widget-heading" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">{office.name}</h2>
                        </div>
                      </div>

                      {office.licenseNumber && (
                        <div className="elementor-element elementor-element-91ba919 elementor-widget elementor-widget-heading" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                          <div className="elementor-widget-container">
                            <h2 className="elementor-heading-title elementor-size-default">
                              {office.licenseNumber.toLowerCase().startsWith('lic') ? office.licenseNumber : `LIC:${office.licenseNumber}`}
                            </h2>
                          </div>
                        </div>
                      )}

                      <div className="elementor-element elementor-element-53d8c13 elementor-widget elementor-widget-text-editor" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <p>
                            {office.officeType && <>{office.officeType}<br /></>}
                            {office.address && <>{office.address.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</>}
                            {office.phone && <>Call: {office.phone}</>}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
