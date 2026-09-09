const fs = require('fs');

function processSection2() {
  let content = fs.readFileSync('src/components/sections/Section2.tsx', 'utf8');

  // Add import and remove state
  content = content.replace(
    /import React, \{ useState \} from 'react';\r?\n\r?\nconst Section2 = \(\) => \{\r?\n  const \[showMore1, setShowMore1\] = useState\(false\);\r?\n  const \[showMore2, setShowMore2\] = useState\(false\);/g,
    `import React from 'react';\nimport AnimatedShowMore from '../ui/AnimatedShowMore';\n\nconst Section2 = () => {`
  );

  // First block replacement
  content = content.replace(
    /<div className=\{\`elementor-element elementor-element-c9e7336 details-area \$\{showMore1 \? '' : 'content-hide'\} e-flex e-con-boxed e-con e-parent\`\} data-id="c9e7336" data-element_type="container" data-e-type="container">[\s\S]*?<div className=\{\`elementor-element elementor-element-59a4c60 elementor-align-center show-less \$\{showMore1 \? '' : 'content-hide'\} elementor-widget elementor-widget-button\`\} data-id="59a4c60" data-element_type="widget" data-e-type="widget" data-widget_type="button\.default"><div className="elementor-widget-container"><div className="elementor-button-wrapper">\s*<a className="elementor-button elementor-button-link elementor-size-sm" href="#" onClick=\{\(e\) => \{ e\.preventDefault\(\); setShowMore1\(false\); \}\}>\s*<span className="elementor-button-content-wrapper">\s*<span className="elementor-button-text">Show Less<\/span>\s*<\/span>\s*<\/a><\/div><\/div><\/div>/g,
    `<AnimatedShowMore buttonAlignment="center">
      <div className="elementor-element elementor-element-c9e7336 details-area e-flex e-con-boxed e-con e-parent" data-id="c9e7336" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-ad20cfb elementor-widget elementor-widget-text-editor" data-id="ad20cfb" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              <p className="font-semibold text-xl text-white" style={{ "textAlign": "center" }}><strong>We use GuardOne to:</strong></p>
              <ul className="list-disc list-outside px-4 text-gray-100 text-lg leading-9 text-[19px] pl-8 md:pl-0">
                <li>Create incident reports/activity reports and more</li>
                <li>Create and publish security guard’s schedules</li>
                <li>We track security guard activities</li>
                <li>GuardOne is GPS activated</li>
                <li>Officers activities/reports are available real time</li>
                <li>Officers can contact ADS management directly from GuardOne</li>
                <li>PDF reports are sent automatically to the clients</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedShowMore>`
  );

  // Second block replacement
  content = content.replace(
    /<div className=\{\`elementor-element elementor-element-a2aaf12 details-area \$\{showMore2 \? '' : 'content-hide'\} e-flex e-con-boxed e-con e-parent\`\} data-id="a2aaf12" data-element_type="container" data-e-type="container">[\s\S]*?<div className=\{\`elementor-element elementor-element-4f7cf3e elementor-align-center show-less \$\{showMore2 \? '' : 'content-hide'\} elementor-widget elementor-widget-button\`\} data-id="4f7cf3e" data-element_type="widget" data-e-type="widget" data-widget_type="button\.default"><div className="elementor-widget-container"><div className="elementor-button-wrapper">\s*<a className="elementor-button elementor-button-link elementor-size-sm" href="#" onClick=\{\(e\) => \{ e\.preventDefault\(\); setShowMore2\(false\); \}\}>\s*<span className="elementor-button-content-wrapper">\s*<span className="elementor-button-text">Show Less<\/span>\s*<\/span>\s*<\/a><\/div><\/div><\/div>/g,
    `<AnimatedShowMore buttonAlignment="center">
      <div className="elementor-element elementor-element-a2aaf12 details-area e-flex e-con-boxed e-con e-parent" data-id="a2aaf12" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-4a0b848 elementor-widget elementor-widget-text-editor" data-id="4a0b848" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              <p style={{ "textAlign": "center" }}><strong>Friendly and reliable dispatch services:</strong></p>
              <ul className="list-disc list-outside px-4 text-gray-100 text-lg leading-9 text-[19px] pl-8 md:pl-0">
                <li>All dispatch is control from our 24/7 central office</li>
                <li>Live operators are available to solve problems</li>
                <li>Dispatcher monitor security guard activities</li>
                <li>Prompt and reliable communication with clients and guard</li>
                <li>Officers activities/reports are available real time</li>
                <li>Prompt response to emergency situation(s)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedShowMore>`
  );

  fs.writeFileSync('src/components/sections/Section2.tsx', content);
  console.log('Section2 updated');
}

function processContactSection6() {
  let content = fs.readFileSync('src/components/sections/ContactSection_6.tsx', 'utf8');

  // Add import
  content = content.replace(
    /import React from 'react';/,
    `import React from 'react';\nimport AnimatedShowMore from '../ui/AnimatedShowMore';`
  );

  content = content.replace(
    /<div className="elementor-element elementor-element-4bfd621 details-areachoose content-hidechoose e-flex e-con-boxed e-con e-parent" data-id="4bfd621" data-element_type="container" data-e-type="container">[\s\S]*?<div className="elementor-element elementor-element-5b30c24 elementor-align-left show-lesschoose content-hidechoose elementor-widget elementor-widget-button" data-id="5b30c24" data-element_type="widget" data-e-type="widget" data-widget_type="button\.default"><div className="elementor-widget-container"><div className="elementor-button-wrapper">\s*<a className="elementor-button elementor-button-link elementor-size-sm" href="#">\s*<span className="elementor-button-content-wrapper">\s*<span className="elementor-button-text">Show Less<\/span>\s*<\/span>\s*<\/a><\/div><\/div><\/div>/g,
    `<AnimatedShowMore buttonAlignment="left">
      <div className="elementor-element elementor-element-4bfd621 details-areachoose e-flex e-con-boxed e-con e-parent" data-id="4bfd621" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-9fef12a elementor-widget elementor-widget-text-editor" data-id="9fef12a" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              <p>We provide guard monitoring&nbsp;and have radios and vehicles with GPS capability. Our Security Guards submit electronic daily reports and clients can access the reports real-time on our online GuardOne portal or receive daily PDF reports via email.</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedShowMore>`
  );

  fs.writeFileSync('src/components/sections/ContactSection_6.tsx', content);
  console.log('ContactSection_6 updated');
}

processSection2();
processContactSection6();
