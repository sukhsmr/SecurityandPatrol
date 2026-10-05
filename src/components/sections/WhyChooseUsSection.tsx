import ElementorRawView from '@/components/ElementorRawView';
import type { IconFeature, WhyChooseUsData } from '@/lib/cms/sections/definitions';
import { button, esc, heading, widget } from './elementor/html';

// The original widget's show/hide toggle script; ElementorRawView executes it.
// It uses the jQuery the site layout already loads, so the widget's own
// render-blocking copy from code.jquery.com was dropped (two jQuery instances
// each bound a click handler, so every click toggled the panel twice).
const TOGGLE_SCRIPT = `<script type="text/javascript">
var $ = jQuery;
    $(document).ready(function(){

    $('.show-morechoose').on('click', function(){
        event.preventDefault()
        $(this).toggleClass('content-hidechoose')
        $(this).closest('.profile-cardchoose').find('.show-lesschoose, .details-areachoose').toggleClass('content-hidechoose')
    })

    $('.show-lesschoose').on('click', function(){
        event.preventDefault()
        $(this).toggleClass('content-hidechoose')
        $(this).closest('.profile-cardchoose').find('.show-morechoose, .details-areachoose').toggleClass('content-hidechoose')
    })

    })
</script>
<style>
.content-hidechoose{
    display: none;
}
</style>`;

function iconBox(id: string, feature: IconFeature): string {
  return widget(
    id,
    'icon-box',
    `<div class="elementor-icon-box-wrapper"><div class="elementor-icon-box-icon"><span class="elementor-icon"><i aria-hidden="true" class="${esc(feature.iconClass)}"></i></span></div>` +
      `<div class="elementor-icon-box-content"><h3 class="elementor-icon-box-title"><span>${esc(feature.title)}</span></h3><p class="elementor-icon-box-description">${esc(feature.description)}</p></div></div>`,
    'elementor-view-default elementor-position-block-start elementor-mobile-position-block-start',
  );
}

function innerColumn(id: string, inner: string, extraClass = ''): string {
  return `<div class="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-${id}${extraClass}" data-id="${id}" data-element_type="column" data-e-type="column"><div class="elementor-widget-wrap elementor-element-populated">${inner}</div></div>`;
}

function render(d: WhyChooseUsData): string {
  const field = (cls: string, input: string) =>
    `<div class="elementor-field-type-${cls} elementor-field-group elementor-column ${input}`;

  const form =
    `<form class="elementor-form" method="post" name="New Form" aria-label="New Form">` +
    `<input type="hidden" name="post_id" value="7"/><input type="hidden" name="form_id" value="7b7465a"/>` +
    `<input type="hidden" name="referer_title" value="Licensed Security Guard Services in California - Rayven Security Protection" /><input type="hidden" name="queried_id" value="7"/>` +
    `<div class="elementor-form-fields-wrapper elementor-labels-above">` +
    field('text', 'elementor-field-group-name elementor-col-100">') +
    `<input size="1" type="text" name="form_fields[name]" id="form-field-name" class="elementor-field elementor-size-sm  elementor-field-textual" placeholder="${esc(d.namePlaceholder)}"></div>` +
    field('email', 'elementor-field-group-email elementor-col-100 elementor-field-required">') +
    `<input size="1" type="email" name="form_fields[email]" id="form-field-email" class="elementor-field elementor-size-sm  elementor-field-textual" placeholder="${esc(d.emailPlaceholder)}" required="required"></div>` +
    field('tel', 'elementor-field-group-field_561a8d5 elementor-col-100 elementor-field-required">') +
    `<input size="1" type="tel" name="form_fields[field_561a8d5]" id="form-field-field_561a8d5" class="elementor-field elementor-size-sm  elementor-field-textual" placeholder="${esc(d.phonePlaceholder)}" required="required" pattern="[0-9()#&amp;+*-=.]+" title="Only numbers and phone characters (#, -, *, etc) are accepted."></div>` +
    field('textarea', 'elementor-field-group-message elementor-col-100">') +
    `<textarea class="elementor-field-textual elementor-field  elementor-size-sm" name="form_fields[message]" id="form-field-message" rows="4" placeholder="${esc(d.messagePlaceholder)}"></textarea></div>` +
    field('recaptcha', 'elementor-field-group-field_8f42640 elementor-col-100">') +
    `<div class="elementor-field" id="form-field-field_8f42640"><div class="elementor-g-recaptcha" data-sitekey="${esc(d.recaptchaSiteKey)}" data-type="v2_checkbox" data-theme="dark" data-size="normal"></div></div></div>` +
    `<div class="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons"><button class="elementor-button elementor-size-sm" type="submit"><span class="elementor-button-content-wrapper"><span class="elementor-button-text">${esc(d.submitText)}</span></span></button></div>` +
    `</div></form>`;

  const details =
    `<div class="elementor-element elementor-element-4bfd621 details-areachoose content-hidechoose e-flex e-con-boxed e-con e-parent" data-id="4bfd621" data-element_type="container" data-e-type="container"><div class="e-con-inner">` +
    widget('9fef12a', 'text-editor', `<p>${esc(d.moreText)}</p>`) +
    `</div></div>`;

  return (
    `<section class="elementor-section elementor-top-section elementor-element elementor-element-407e43a elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="407e43a" data-element_type="section" data-e-type="section" id="why-choose-us">` +
    `<div class="elementor-container elementor-column-gap-default">` +
    `<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-3b17541" data-id="3b17541" data-element_type="column" data-e-type="column"><div class="elementor-widget-wrap elementor-element-populated">` +
    heading('1d354e7', esc(d.heading)) +
    widget('406f679', 'text-editor', `<p>${esc(d.intro)}</p>`) +
    `<section class="elementor-section elementor-inner-section elementor-element elementor-element-f216cee elementor-section-full_width elementor-section-height-default elementor-section-height-default" data-id="f216cee" data-element_type="section" data-e-type="section"><div class="elementor-container elementor-column-gap-default">` +
    innerColumn('2de6228', iconBox('848368e', d.primaryFeature)) +
    innerColumn(
      'd992f3e',
      iconBox('54d741f', d.secondaryFeature) +
        details +
        button('8de863d', d.showMoreText, '#', 'sm', 'elementor-align-left show-morechoose') +
        button('5b30c24', d.showLessText, '#', 'sm', 'elementor-align-left show-lesschoose content-hidechoose'),
      ' profile-cardchoose',
    ) +
    `</div></section></div></div>` +
    `<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-86498a3" data-id="86498a3" data-element_type="column" data-e-type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"><div class="elementor-widget-wrap elementor-element-populated">` +
    heading('63cd858', esc(d.formHeading)) +
    `<div class="elementor-element elementor-element-7b7465a elementor-button-align-stretch elementor-widget elementor-widget-form" data-id="7b7465a" data-element_type="widget" data-e-type="widget" data-settings="{&quot;step_next_label&quot;:&quot;Next&quot;,&quot;step_previous_label&quot;:&quot;Previous&quot;,&quot;button_width&quot;:&quot;100&quot;,&quot;step_type&quot;:&quot;number_text&quot;,&quot;step_icon_shape&quot;:&quot;circle&quot;}" data-widget_type="form.default"><div class="elementor-widget-container">${form}</div></div>` +
    `</div></div></div></section>` +
    `<div class="elementor-element elementor-element-d34b4ba e-flex e-con-boxed e-con e-parent" data-id="d34b4ba" data-element_type="container" data-e-type="container"><div class="e-con-inner">` +
    widget('ea1fc41', 'html', TOGGLE_SCRIPT) +
    `</div></div>`
  );
}

export default function WhyChooseUsSection({ data }: { data: WhyChooseUsData }) {
  return <ElementorRawView contentHtml={render(data)} />;
}
