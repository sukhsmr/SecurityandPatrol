import ElementorRawView from '@/components/ElementorRawView';
import type {
  ContactFormData,
  ContactHeroData,
  ContactIntroData,
  ContactLocationsData,
} from '@/lib/cms/sections/definitions';
import { button, esc, heading, idAt, img, widget } from './elementor/html';

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

function selectField(group: string, label: string, options: string[]): string {
  const opts = options.map((option) => `<option value="${esc(option)}">${esc(option)}</option>`).join('');
  return (
    `<div class="elementor-field-type-select elementor-field-group elementor-column elementor-field-group-${group} elementor-col-100"><label for="form-field-${group}" class="elementor-field-label"> ${esc(label)} </label>` +
    `<div class="elementor-field elementor-select-wrapper remove-before "><div class="select-caret-down-wrapper"><i aria-hidden="true" class="eicon-caret-down"></i></div>` +
    `<select name="form_fields[${group}]" id="form-field-${group}" class="elementor-field-textual elementor-size-sm">${opts}</select></div></div>`
  );
}

export function ContactFormSection({ data: d }: { data: ContactFormData }) {
  const form =
    `<form class="elementor-form" method="post" name="New Form" aria-label="New Form"><input type="hidden" name="post_id" value="9"/><input type="hidden" name="form_id" value="623f6a0"/><input type="hidden" name="referer_title" value="Rayven Security Protection | Trained Security Guards for Any Need" /><input type="hidden" name="queried_id" value="9"/>` +
    `<div class="elementor-form-fields-wrapper elementor-labels-above">` +
    `<div class="elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-50"><label for="form-field-name" class="elementor-field-label"> ${esc(d.firstNameLabel)} </label><input size="1" type="text" name="form_fields[name]" id="form-field-name" class="elementor-field elementor-size-sm elementor-field-textual" placeholder="${esc(d.firstNamePlaceholder)}"></div>` +
    `<div class="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-field_986fac2 elementor-col-50"><label for="form-field-field_986fac2" class="elementor-field-label"> ${esc(d.emailLabel)} </label><input size="1" type="email" name="form_fields[field_986fac2]" id="form-field-field_986fac2" class="elementor-field elementor-size-sm elementor-field-textual" placeholder="${esc(d.emailPlaceholder)}"></div>` +
    selectField('field_944ce13', d.serviceLabel, d.services) +
    selectField('field_df9ab1a', d.locationLabel, d.locations) +
    `<div class="elementor-field-type-number elementor-field-group elementor-column elementor-field-group-field_0362869 elementor-col-100"><label for="form-field-field_0362869" class="elementor-field-label"> ${esc(d.phoneLabel)} </label><input type="number" name="form_fields[field_0362869]" id="form-field-field_0362869" class="elementor-field elementor-size-sm elementor-field-textual" min="" max="" ></div>` +
    `<div class="elementor-field-type-textarea elementor-field-group elementor-column elementor-field-group-message elementor-col-100"><label for="form-field-message" class="elementor-field-label"> ${esc(d.messageLabel)} </label><textarea class="elementor-field-textual elementor-field elementor-size-sm" name="form_fields[message]" id="form-field-message" rows="4" placeholder="${esc(d.messagePlaceholder)}"></textarea></div>` +
    `<div class="elementor-field-type-acceptance elementor-field-group elementor-column elementor-field-group-field_e1d8d27 elementor-col-100"><div class="elementor-field-subgroup"><span class="elementor-field-option"><input type="checkbox" name="form_fields[field_e1d8d27]" id="form-field-field_e1d8d27" class="elementor-field elementor-size-sm elementor-acceptance-field"> <label for="form-field-field_e1d8d27">${esc(d.acceptanceText)}</label></span></div></div>` +
    `<div class="elementor-field-type-recaptcha elementor-field-group elementor-column elementor-field-group-field_44a1ea6 elementor-col-100"><div class="elementor-field" id="form-field-field_44a1ea6"><div class="elementor-g-recaptcha" data-sitekey="${esc(d.recaptchaSiteKey)}" data-type="v2_checkbox" data-theme="light" data-size="normal"></div></div></div>` +
    `<div class="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons"><button class="elementor-button elementor-size-sm" type="submit"><span class="elementor-button-content-wrapper"><span class="elementor-button-text">${esc(d.submitText)}</span></span></button></div>` +
    `</div></form>`;

  const formColumn =
    heading('4d9e06f', esc(d.heading)) +
    heading('2da045a', esc(d.subheading)) +
    `<div class="elementor-element elementor-element-623f6a0 elementor-button-align-stretch elementor-widget elementor-widget-form" data-id="623f6a0" data-element_type="widget" data-e-type="widget" data-settings="{&quot;step_next_label&quot;:&quot;Next&quot;,&quot;step_previous_label&quot;:&quot;Previous&quot;,&quot;button_width&quot;:&quot;100&quot;,&quot;step_type&quot;:&quot;number_text&quot;,&quot;step_icon_shape&quot;:&quot;circle&quot;}" data-widget_type="form.default"><div class="elementor-widget-container">${form}</div></div>` +
    widget('6e07928', 'text-editor', `<p>${esc(d.disclaimer)}</p>`);

  const imageColumn = d.image.src
    ? widget(
        'bf7bb11',
        'image',
        img(d.image, 'decoding="async" width="510" height="697" class="attachment-large size-large wp-image-1210"').replace(
          ' />',
          ' sizes="(max-width: 510px) 100vw, 510px" />',
        ),
      )
    : '';

  const html = topSection(
    '081e0e0',
    'elementor-section-full_width elementor-section-stretched elementor-section-height-default elementor-section-height-default',
    STRETCH_BG,
    `<div class="elementor-container elementor-column-gap-default">` +
      col('47e0795', '16', '') +
      col(
        'bf52a29',
        '66',
        `<section class="elementor-section elementor-inner-section elementor-element elementor-element-86e3616 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="86e3616" data-element_type="section" data-e-type="section" data-settings="${BG}"><div class="elementor-container elementor-column-gap-default">` +
          col('b69f831', '50', formColumn, 'inner') +
          col('57659e3', '50', imageColumn, 'inner') +
          `</div></section>`,
      ) +
      col('6ba205d', '16', '') +
      `</div>`,
  );
  return <ElementorRawView contentHtml={html} />;
}
