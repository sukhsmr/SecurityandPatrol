import React from 'react';
import type { Office } from '@/lib/data/offices';

export type OfficesListAnchorIds = {
  california?: string;
  portland?: string;
  houston?: string;
  sanAntonio?: string;
  seattle?: string;
  vancouver?: string;
};

const ANCHOR_BY_KEY: Record<keyof OfficesListAnchorIds, string> = {
  california: 'California',
  portland: 'portland',
  houston: 'Texas',
  sanAntonio: 'san',
  seattle: 'seattle',
  vancouver: 'vanc',
};

function resolveAnchorId(office: Office, ids?: OfficesListAnchorIds): string | undefined {
  if (!ids || !office.anchor) return undefined;
  const key = (Object.keys(ANCHOR_BY_KEY) as Array<keyof OfficesListAnchorIds>).find(
    (k) => ANCHOR_BY_KEY[k] === office.anchor
  );
  return key ? ids[key] : undefined;
}

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

export default function OfficesList({ offices, ids }: { offices: Office[]; ids?: OfficesListAnchorIds }) {
  const columns = chunk(offices, Math.ceil(offices.length / 3) || 1);

  return (
    <section className="elementor-section elementor-top-section elementor-element elementor-element-bff1acc elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="bff1acc" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-container elementor-column-gap-default">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="elementor-column elementor-col-33 elementor-top-column elementor-element" data-element_type="column" data-e-type="column">
            <div className="elementor-widget-wrap elementor-element-populated">
              {column.map((office) => {
                const anchorId = resolveAnchorId(office, ids);
                return (
                  <React.Fragment key={office.name}>
                    {anchorId && (
                      <div className="elementor-element elementor-widget elementor-widget-menu-anchor" data-widget_type="menu-anchor.default">
                        <div className="elementor-widget-container">
                          <div className="elementor-menu-anchor" id={anchorId} />
                        </div>
                      </div>
                    )}
                    {office.imageUrl && (
                      <div className="elementor-element elementor-widget elementor-widget-image" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                        <div className="elementor-widget-container">
                          <img src={office.imageUrl} loading="lazy" decoding="async" width={300} height={201} className="attachment-large size-large" alt={office.imageAlt || office.name} />
                        </div>
                      </div>
                    )}
                    <div className="elementor-element elementor-widget elementor-widget-heading" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">{office.name}</h2>
                      </div>
                    </div>
                    {office.licenseNumber && (
                      <div className="elementor-element elementor-widget elementor-widget-heading" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">{office.licenseNumber}</h2>
                        </div>
                      </div>
                    )}
                    <div className="elementor-element elementor-widget elementor-widget-text-editor" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                      <div className="elementor-widget-container">
                        <p>
                          {office.officeType && <>{office.officeType}<br /></>}
                          {office.address && <>{office.address}<br /></>}
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
  );
}
