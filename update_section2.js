const fs = require('fs');

let content = fs.readFileSync('src/components/sections/Section2.tsx', 'utf8');

content = content.replace(
  /import React, \{ useState \} from 'react';\n\nconst Section2 = \(\) => \{\n  const \[showMore1, setShowMore1\] = useState\(false\);\n  const \[showMore2, setShowMore2\] = useState\(false\);/,
  `import React from 'react';\nimport AnimatedShowMore from '../ui/AnimatedShowMore';\n\nconst Section2 = () => {`
);

const firstBlockStart = content.indexOf('<div className={`elementor-element elementor-element-c9e7336 details-area ${showMore1 ? \\'\\' : \\'content-hide\\'} e-flex e-con-boxed e-con e-parent`}');
const firstBlockEnd = content.indexOf('</div></div></div></div></div><div className="elementor-column elementor-col-50', firstBlockStart);

if (firstBlockStart !== -1 && firstBlockEnd !== -1) {
  const firstBlockReplacement = `
<AnimatedShowMore buttonAlignment="center">
  <div className="elementor-element elementor-element-c9e7336 details-area e-flex e-con-boxed e-con e-parent" data-id="c9e7336" data-element_type="container" data-e-type="container"><div className="e-con-inner"><div className="elementor-element elementor-element-ad20cfb elementor-widget elementor-widget-text-editor" data-id="ad20cfb" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default"><div className="elementor-widget-container"><p className="font-semibold text-xl text-white" style={{ "textAlign": "center" }}><strong>We use GuardOne to:</strong></p><ul className="list-disc list-outside px-4 text-gray-100 text-lg leading-9 text-[19px] pl-8 md:pl-0"><li>Create incident reports/activity reports and more</li><li>Create and publish security guard’s schedules</li><li>We track security guard activities</li><li>GuardOne is GPS activated</li><li>Officers activities/reports are available real time</li><li>Officers can contact ADS management directly from GuardOne</li><li>PDF reports are sent automatically to the clients</li></ul></div></div></div></div>
</AnimatedShowMore>
</div></div></div><div className="elementor-column elementor-col-50`.trim();

  content = content.slice(0, firstBlockStart) + firstBlockReplacement + content.slice(firstBlockEnd);
}

const secondBlockStart = content.indexOf('<div className={`elementor-element elementor-element-a2aaf12 details-area ${showMore2 ? \\'\\' : \\'content-hide\\'} e-flex e-con-boxed e-con e-parent`}');
const secondBlockEnd = content.indexOf('</div></div></div></div></div></div></section>', secondBlockStart);

if (secondBlockStart !== -1 && secondBlockEnd !== -1) {
  const secondBlockReplacement = `
<AnimatedShowMore buttonAlignment="center">
<div className="elementor-element elementor-element-a2aaf12 details-area e-flex e-con-boxed e-con e-parent" data-id="a2aaf12" data-element_type="container" data-e-type="container"><div className="e-con-inner"><div className="elementor-element elementor-element-4a0b848 elementor-widget elementor-widget-text-editor" data-id="4a0b848" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default"><div className="elementor-widget-container"><p style={{ "textAlign": "center" }}><strong>Friendly and reliable dispatch services:</strong></p><ul className="list-disc list-outside px-4 text-gray-100 text-lg leading-9 text-[19px] pl-8 md:pl-0"><li>All dispatch is control from our 24/7 central office</li><li>Live operators are available to solve problems</li><li>Dispatcher monitor security guard activities</li><li>Prompt and reliable communication with clients and guard</li><li>Officers activities/reports are available real time</li><li>Prompt response to emergency situation(s)</li></ul></div></div></div></div>
</AnimatedShowMore>
</div></div></div></div></section>`.trim();

  content = content.slice(0, secondBlockStart) + secondBlockReplacement + content.slice(secondBlockEnd);
}

fs.writeFileSync('src/components/sections/Section2.tsx', content);
