import type { NumberedItem, ServicesGridData } from '@/lib/cms/sections/definitions';
import { esc, idAt } from './elementor/html';
import { DESKTOP_GRID_STYLES, MOBILE_GRID_STYLES } from './elementor/servicesGridStyles';

// Original Elementor widget ids, by position, so the per-id CSS keeps matching.
const INTRO_IDS = ['c88d7ec', 'a20a332'];
const DESKTOP_LEFT_IDS = ['73a7792', '1ca8dfa', '69c6eb8'];
const DESKTOP_RIGHT_IDS = ['64eb824', '1f7b3cb', 'b24c17e'];
const MOBILE_LEFT_IDS = ['f9bfa80', '375abb9', 'c09d681'];
const MOBILE_RIGHT_IDS = ['217a9ff', '6241954', 'a1cd59c'];

function numbered(index: number): string {
  return String(index + 1).padStart(2, '0');
}

function itemHtml(id: string, item: NumberedItem, number: string, titleTag: 'h3' | 'p', style?: string, extraClass = ''): string {
  const classes = ['elementor-element', `elementor-element-${id}`, extraClass, 'elementor-widget', 'elementor-widget-html'].filter(Boolean).join(' ');
  return (
    `<div class="${classes}" data-e-type="widget" data-element_type="widget" data-id="${id}" data-widget_type="html.default"><div class="elementor-widget-container">` +
    `<fieldset class="border border-solid border-gray-300 p-4 md:-mb-4 md:border-b-0 md:border-r-0"><legend class="px-3 text-2xl">${number}</legend>` +
    `<div class="px-4 pb-3"><${titleTag} class="text-xl tracking-wider text-white font-light">${esc(item.title)}</${titleTag}><p class="text-gray-400 mt-4 font-light">${esc(item.description)}</p></div></fieldset>` +
    (style !== undefined ? `<style>${style}</style>` : '') +
    `</div></div>`
  );
}

function column(id: string, colClass: string, animation: string, inner: string, hidden = ''): string {
  return (
    `<div class="elementor-column ${colClass} elementor-top-column elementor-element elementor-element-${id}${hidden} " data-e-type="column" data-element_type="column" data-id="${id}" data-settings='{"animation":"${animation}"}'>` +
    `<div class="elementor-widget-wrap elementor-element-populated">${inner}</div></div>`
  );
}

function desktopHtml(data: ServicesGridData): string {
  const intro = data.introParagraphs
    .map(
      (text, i) =>
        `<div class="elementor-element elementor-element-${idAt(INTRO_IDS, i)} elementor-widget elementor-widget-text-editor" data-e-type="widget" data-element_type="widget" data-id="${idAt(INTRO_IDS, i)}" data-widget_type="text-editor.default"><div class="elementor-widget-container">${esc(text)}</div></div>`,
    )
    .join('');

  // Odd numbers (01, 03, 05…) sit in the left column, even numbers in the right.
  const left = data.desktopItems.filter((_, i) => i % 2 === 0);
  const right = data.desktopItems.filter((_, i) => i % 2 === 1);
  const leftHtml = left.map((item, i) => itemHtml(idAt(DESKTOP_LEFT_IDS, i), item, numbered(i * 2), 'h3', DESKTOP_GRID_STYLES[i])).join('');
  const rightHtml = right.map((item, i) => itemHtml(idAt(DESKTOP_RIGHT_IDS, i), item, numbered(i * 2 + 1), 'h3')).join('');

  return (
    `<section class="elementor-section elementor-top-section elementor-element elementor-element-16c05f7 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="16c05f7" data-settings='{"background_background":"classic","animation":"none"}'>` +
    `<div class="elementor-container elementor-column-gap-default">` +
    `<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-0506024" data-e-type="column" data-element_type="column" data-id="0506024"><div class="elementor-widget-wrap elementor-element-populated">` +
    `<div class="elementor-element elementor-element-562ee9a elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="562ee9a" data-widget_type="heading.default"><div class="elementor-widget-container"><h2 class="elementor-heading-title elementor-size-default">${esc(data.heading)}</h2></div></div>` +
    intro +
    `</div></div>` +
    column('d805a18', 'elementor-col-33', 'slideInLeft', leftHtml, ' elementor-hidden-tablet elementor-hidden-mobile') +
    column('101b0c2', 'elementor-col-33', 'slideInRight', rightHtml, ' elementor-hidden-tablet elementor-hidden-mobile') +
    `</div></section>`
  );
}

function mobileHtml(data: ServicesGridData): string {
  // The first half fills the left column, the rest the right column.
  const half = Math.ceil(data.mobileItems.length / 2);
  const left = data.mobileItems.slice(0, half);
  const right = data.mobileItems.slice(half);
  const leftHtml = left
    .map((item, i) =>
      itemHtml(idAt(MOBILE_LEFT_IDS, i), item, numbered(i), 'p', MOBILE_GRID_STYLES[i], i === 0 ? 'elementor-widget-mobile__width-inherit' : ''),
    )
    .join('');
  const rightHtml = right.map((item, i) => itemHtml(idAt(MOBILE_RIGHT_IDS, i), item, numbered(half + i), 'p')).join('');

  return (
    `<section class="elementor-section elementor-top-section elementor-element elementor-element-d8a61f1 elementor-hidden-desktop elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-e-type="section" data-element_type="section" data-id="d8a61f1" data-settings='{"background_background":"classic"}'>` +
    `<div class="elementor-container elementor-column-gap-no">` +
    column('065e8c7', 'elementor-col-50', 'slideInLeft', leftHtml) +
    column('e069192', 'elementor-col-50', 'slideInRight', rightHtml) +
    `</div></section>`
  );
}

export default function ServicesGridSection({ data }: { data: ServicesGridData }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: desktopHtml(data) }} />
      <div dangerouslySetInnerHTML={{ __html: mobileHtml(data) }} />
    </>
  );
}
