import React from 'react';
import type { LegalContentData } from '@/lib/cms/sections/definitions';
import { canonicalizeHtmlLinks } from '@/lib/content-html';

// Original [heading id, text id] pairs by position (Elementor page id 3).
const BLOCK_IDS: ReadonlyArray<readonly [string, string]> = [
  ['40dfc86', '8780766'],
  ['6ca5707', 'd5ff93f'],
  ['ab4d6be', 'abcc168'],
  ['269aa54', '00e7e48'],
  ['6896d11', 'c9b8bad'],
  ['43111c2', 'ff8b887'],
  ['6be17d6', '877b2c1'],
  ['684c1f2', '1d56f53'],
  ['67d1043', 'd39f1a5'],
];

export default function PrivacyPolicyContent({ data }: { data: LegalContentData }) {
  return (
    <>
      <div className="elementor-element elementor-element-9897ac2 e-flex e-con-boxed e-con e-parent" data-id="9897ac2" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-b84804d elementor-widget elementor-widget-spacer" data-id="b84804d" data-element_type="widget" data-e-type="widget" data-widget_type="spacer.default">
            <div className="elementor-widget-container">
              <div className="elementor-spacer">
                <div className="elementor-spacer-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="elementor-element elementor-element-44d2a5a5 e-flex e-con-boxed e-con e-parent" data-id="44d2a5a5" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          {data.items.map((item, index) => {
            const [headingId, textId] = BLOCK_IDS[Math.min(index, BLOCK_IDS.length - 1)];
            return (
              <React.Fragment key={index}>
                <div className={`elementor-element elementor-element-${headingId} elementor-widget elementor-widget-heading`} data-id={headingId} data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">{item.heading}</h2>
                  </div>
                </div>
                {item.body && (
                  <div className={`elementor-element elementor-element-${textId} elementor-widget elementor-widget-text-editor`} data-id={textId} data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                    <div className="elementor-widget-container" dangerouslySetInnerHTML={{ __html: canonicalizeHtmlLinks(item.body) }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
