import ElementorRawView from '@/components/ElementorRawView';
import type {
  ContactFormData,
  ContactHeroData,
  ContactIntroData,
  ContactLocationsData,
} from '@/lib/cms/sections/definitions';
import { button, esc, heading, idAt, img } from './elementor/html';

/** Contact page sections, rendered from the original Elementor markup (page id 9). */

function topSection(id: string, classes: string, settings: string, inner: string, overlay = false): string {
  return (
    `<section class="elementor-section elementor-top-section elementor-element elementor-element-${id} ${classes}" data-id="${id}" data-element_type="section" data-e-type="section" data-settings="${settings}">` +
    (overlay ? '<div class="elementor-background-overlay"></div>' : '') +
    inner +
    `</section>`
  );
}

function col(id: string, size: string, inner: string, kind: 'top' | 'inner' = 'top', settings = ''): string {
  const populated = inner ? ' elementor-element-populated' : '';
  const attr = settings ? ` data-settings="${settings}"` : '';
  return `<div class="elementor-column elementor-col-${size} elementor-${kind}-column elementor-element elementor-element-${id}" data-id="${id}" data-element_type="column" data-e-type="column"${attr}><div class="elementor-widget-wrap${populated}">${inner}</div></div>`;
}

const BG = '{&quot;background_background&quot;:&quot;classic&quot;}';
const STRETCH_BG = '{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}';

function linked(text: string, url: string): string {
  return url ? `<a href="${esc(url)}">${esc(text)}</a>` : esc(text);
}

export function ContactHeroSection({ data }: { data: ContactHeroData }) {
  const html = topSection(
    '899c573',
    'elementor-section-stretched elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default',
    STRETCH_BG,
    `<div class="elementor-container elementor-column-gap-default">` +
      col(
        '53c13bf',
        '50',
        heading('02a511b', `<br> ${esc(data.lineOne)}<br><span style="color:#ee8e09;font-size:72px">${esc(data.highlight)}</span>`) +
          `<section class="elementor-section elementor-inner-section elementor-element elementor-element-e33f82b elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="e33f82b" data-element_type="section" data-e-type="section" data-settings="${BG}"><div class="elementor-container elementor-column-gap-no">` +
          col('94b4b3e', '50', button('4cab460', data.buttonText, data.buttonUrl), 'inner', BG) +
          col('948a1d6', '50', heading('3da1c7a', ` ${esc(data.phone)} `), 'inner', BG) +
          `</div></section>`,
      ) +
      col('b8c1eaf', '50', '') +
      `</div>`,
    true,
  );
  return <ElementorRawView contentHtml={html} />;
}

export function ContactIntroSection({ data }: { data: ContactIntroData }) {
  const html = topSection(
    '5eab911',
    'elementor-section-boxed elementor-section-height-default elementor-section-height-default',
    BG,
    `<div class="elementor-container elementor-column-gap-default">` +
      col(
        '74dd1a6',
        '100',
        heading('a3821b0', linked(data.eyebrow, data.eyebrowUrl)) +
          heading('29ad81b', esc(data.heading)) +
          heading('d3b96ab', linked(data.subheading, data.subheadingUrl)),
      ) +
      `</div>`,
  );
  return <ElementorRawView contentHtml={html} />;
}

// [column id, title id, line ids…] by position.
const COLUMN_IDS: ReadonlyArray<readonly string[]> = [
  ['db932be', 'b6a159f', '6d7c40b'],
  ['487ded0', 'f8ca158', 'ceeea24', '74c27b8'],
  ['12a0a98', 'fe89075', 'a76bd09', '26d5a1c'],
];

function hotspotSettings(data: ContactLocationsData): string {
  const settings = {
    hotspot: data.hotspots.map((spot) => ({
      _id: spot.id,
      hotspot_tooltip_content: spot.contentHtml,
      hotspot_offset_x: { unit: '%', size: spot.x, sizes: [] },
      hotspot_offset_y: { unit: '%', size: spot.y, sizes: [] },
      hotspot_horizontal: 'left',
      hotspot_vertical: 'top',
      hotspot_tooltip_position: 'no',
    })),
    tooltip_position: 'bottom',
    tooltip_trigger: 'mouseenter',
    hotspot_sequenced_animation: 'no',
    tooltip_animation: 'e-hotspot--fade-in-out',
  };
  return esc(JSON.stringify(settings));
}

export function ContactLocationsSection({ data }: { data: ContactLocationsData }) {
  const hotspots = data.hotspots
    .map(
      (spot) =>
        `<div class="e-hotspot elementor-repeater-item-${esc(spot.id)} e-hotspot--position-left e-hotspot--position-top e-hotspot--circle" style="left:${spot.x}%;--hotspot-translate-x:${spot.x}%;top:${spot.y}%;--hotspot-translate-y:${spot.y}%">` +
        `<div class="e-hotspot__button e-hotspot--expand"><div class="e-hotspot__outer-circle"></div><div class="e-hotspot__inner-circle"></div></div>` +
        `<div class="e-hotspot__tooltip e-hotspot--tooltip-position e-hotspot--fade-in-out " >${spot.contentHtml}</div></div>`,
    )
    .join('');

  const map =
    `<div class="elementor-element elementor-element-18a7a61 elementor-widget elementor-widget-hotspot" data-id="18a7a61" data-element_type="widget" data-e-type="widget" data-settings="${hotspotSettings(data)}" data-widget_type="hotspot.default"><div class="elementor-widget-container">` +
    img(data.map, 'fetchpriority="high" decoding="async" width="1024" height="483" class="attachment-large size-large wp-image-1340"').replace(
      ' />',
      ' sizes="(max-width: 1024px) 100vw, 1024px" />',
    ) +
    hotspots +
    `</div></div>`;

  const columns = data.columns
    .map((column, c) => {
      const ids = COLUMN_IDS[Math.min(c, COLUMN_IDS.length - 1)];
      const lineIds = ids.slice(1);
      const inner = [column.title, ...column.lines].map((text, i) => heading(idAt(lineIds, i), esc(text))).join('');
      return col(ids[0], '33', inner, 'inner');
    })
    .join('');

  const html = topSection(
    '847061f',
    'elementor-section-height-min-height elementor-section-boxed elementor-section-height-default elementor-section-items-middle',
    BG,
    `<div class="elementor-container elementor-column-gap-no">` +
      col(
        '207e3a09',
        '100',
        map +
          `<section class="elementor-section elementor-inner-section elementor-element elementor-element-fc6aae1 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="fc6aae1" data-element_type="section" data-e-type="section" data-settings="${BG}"><div class="elementor-container elementor-column-gap-default">` +
          columns +
          `</div></section>`,
      ) +
      `</div>`,
    true,
  );
  return <ElementorRawView contentHtml={html} />;
}

import ContactForm from './ContactForm';

export function ContactFormSection({ data: d }: { data: ContactFormData }) {
  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-081e0e0 elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default"
      data-id="081e0e0"
      data-element_type="section"
      data-e-type="section"
      data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}"
    >
      <div className="elementor-container elementor-column-gap-default">
        <div className="elementor-column elementor-col-16 elementor-top-column elementor-element elementor-element-47e0795" data-id="47e0795" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap" />
        </div>
        <div className="elementor-column elementor-col-66 elementor-top-column elementor-element elementor-element-bf52a29" data-id="bf52a29" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <section
              className="elementor-section elementor-inner-section elementor-element elementor-element-86e3616 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="86e3616"
              data-element_type="section"
              data-e-type="section"
              data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"
            >
              <div className="elementor-container elementor-column-gap-default">
                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-b69f831" data-id="b69f831" data-element_type="column" data-e-type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    {/* Heading */}
                    <div className="elementor-element elementor-element-4d9e06f elementor-widget elementor-widget-heading" data-id="4d9e06f" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">{d.heading}</h2>
                      </div>
                    </div>
                    {/* Subheading */}
                    <div className="elementor-element elementor-element-2da045a elementor-widget elementor-widget-heading" data-id="2da045a" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h4 className="elementor-heading-title elementor-size-default">{d.subheading}</h4>
                      </div>
                    </div>
                    {/* Interactive Contact Form */}
                    <ContactForm data={d} />
                    {/* Disclaimer */}
                    {d.disclaimer && (
                      <div className="elementor-element elementor-element-6e07928 elementor-widget elementor-widget-text-editor" data-id="6e07928" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <p>{d.disclaimer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-57659e3" data-id="57659e3" data-element_type="column" data-e-type="column">
                  <div className="elementor-widget-wrap elementor-element-populated">
                    {d.image?.src && (
                      <div className="elementor-element elementor-element-bf7bb11 elementor-widget elementor-widget-image" data-id="bf7bb11" data-element_type="widget" data-e-type="widget" data-widget_type="image.default">
                        <div className="elementor-widget-container">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            decoding="async"
                            width="510"
                            height="697"
                            src={d.image.src}
                            className="attachment-large size-large wp-image-1210"
                            alt={d.image.alt || ''}
                            srcSet={d.image.srcSet}
                            sizes="(max-width: 510px) 100vw, 510px"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="elementor-column elementor-col-16 elementor-top-column elementor-element elementor-element-6ba205d" data-id="6ba205d" data-element_type="column" data-e-type="column">
          <div className="elementor-widget-wrap" />
        </div>
      </div>
    </section>
  );
}
