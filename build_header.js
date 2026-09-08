const fs = require('fs');
let html = fs.readFileSync('src/components/layout/header_jsx.txt', 'utf8');

let component = `
'use client';
import React, { useState } from 'react';

const Header = () => {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  return (
    <>
      ${html}
    </>
  );
};

export default Header;
`;

component = component.replace(
  '<button className="elementskit-menu-hamburger elementskit-menu-toggler"  type="button" aria-label="hamburger-icon">',
  '<button className="elementskit-menu-hamburger elementskit-menu-toggler" type="button" aria-label="hamburger-icon" onClick={() => setMainMenuOpen(!mainMenuOpen)}>'
);

component = component.replace(
  '<div id="ekit-megamenu-primary-menu" className="elementskit-menu-container elementskit-menu-offcanvas-elements elementskit-navbar-nav-default ekit-nav-menu-one-page-no ekit-nav-dropdown-hover">',
  '<div id="ekit-megamenu-primary-menu" className={`elementskit-menu-container elementskit-menu-offcanvas-elements elementskit-navbar-nav-default ekit-nav-menu-one-page-no ekit-nav-dropdown-hover ${mainMenuOpen ? "active" : ""}`}>'
);

component = component.replace(
  '<div className="elementor-menu-toggle" role="button" tabIndex={0} aria-label="Menu Toggle" aria-expanded="false">',
  '<div className="elementor-menu-toggle" role="button" tabIndex={0} aria-label="Menu Toggle" aria-expanded={mobileDropdown ? "true" : "false"} onClick={() => setMobileDropdown(!mobileDropdown)}>'
);

component = component.replace(
  '<nav className="elementor-nav-menu--dropdown elementor-nav-menu__container" aria-hidden="true">',
  '<nav className="elementor-nav-menu--dropdown elementor-nav-menu__container" aria-hidden="true" style={{ display: mobileDropdown ? "block" : "none" }}>'
);

component = component.replace(/href="([^"h#][^"]*)"/g, 'href="/$1"');
component = component.replace(/href="\/\/([^"]*)"/g, 'href="https://$1"');
component = component.replace(/data-src=/g, 'src=');
component = component.replace(/data-vertical-menu=([0-9a-zA-Z]+)/g, 'data-vertical-menu="$1"');

component = component.replace(/https:\/\/www\.adsguards\.com\/wp-content\/uploads\/2023\/02\/GuardOne-Logowhite\.png/g, '/rayven-logo.png');
component = component.replace(/https:\/\/www\.adsguards\.com\/wp-content\/uploads\/2023\/02\/ADS-Logo-Yellow-2-1-1-1\.png/g, '/rayven-logo.png');

fs.writeFileSync('src/components/layout/Header.tsx', component);
