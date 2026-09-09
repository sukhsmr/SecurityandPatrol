const fs = require('fs');

function processServicesSection3() {
  let content = fs.readFileSync('src/components/sections/ServicesSection_3.tsx', 'utf8');

  // Add import
  content = content.replace(
    /import React from 'react';/,
    `import React from 'react';\nimport AnimatedShowMore from '../ui/AnimatedShowMore';`
  );

  content = content.replace(
    /<div className="elementor-element elementor-element-83f22b9 details-areaabout content-hideabout e-flex e-con-boxed e-con e-parent" data-id="83f22b9" data-element_type="container" data-e-type="container">[\s\S]*?<div className="elementor-element elementor-element-b4fa1a5 elementor-align-left show-lessabout content-hideabout elementor-widget elementor-widget-button" data-id="b4fa1a5" data-element_type="widget" data-e-type="widget" data-widget_type="button\.default"><div className="elementor-widget-container"><div className="elementor-button-wrapper">\s*<a className="elementor-button elementor-button-link elementor-size-sm" href="#">\s*<span className="elementor-button-content-wrapper">\s*<span className="elementor-button-text">Show Less<\/span>\s*<\/span>\s*<\/a><\/div><\/div><\/div>/g,
    `<AnimatedShowMore buttonAlignment="left">
      <div className="elementor-element elementor-element-83f22b9 details-areaabout e-flex e-con-boxed e-con e-parent" data-id="83f22b9" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-aae0780 elementor-widget elementor-widget-text-editor" data-id="aae0780" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              <p className="text-gray-200 font-semibold tracking-wide"><strong>Theft<br /></strong><strong>Damage<br /></strong><strong>Property destruction</strong></p>
              <p className="text-justify text-gray-400 mb-5">At ADS Guards, we make it our mission to provide you with top class security guard services. Therefore, they add value to your company. Being safe enables you to focus on your mission. Certainly, together we can improve our community! Technology driven security at ADS Security Guards Service uses cutting edge mobile technology. Above all, it is updated, backed-up and fully reliant. As a result, it enables us to stay on top of all our systems. So, it helps as we receive daily reports – complete and thorough. Our reports provide a full insight. We look at duties completed by ADS trained security guards. That helps us assess their process. It manages their interaction with your employees and your environment. With the help of professional risk assessors, we fully optimize your security needs.<span className="text-primary cursor-pointer">&nbsp;</span></p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedShowMore>`
  );

  fs.writeFileSync('src/components/sections/ServicesSection_3.tsx', content);
  console.log('ServicesSection_3 updated');
}

processServicesSection3();
