const fs = require('fs');
let header = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

// Add 'use client' and imports
header = header.replace('const Header = () => {', 
`'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDropdown = (menuName) => {
    if (activeDropdown === menuName) setActiveDropdown(null);
    else setActiveDropdown(menuName);
  };
`);

// Fix mobile menu icon classes
header = header.replace('className="elementor-menu-toggle"', 
  'className={`elementor-menu-toggle ${mobileMenuOpen ? "elementor-active" : ""}`} onClick={toggleMobileMenu}');

// Fix the actual nav menu container
header = header.replace('className="elementor-nav-menu--dropdown elementor-nav-menu__container"', 
  'className={`elementor-nav-menu--dropdown elementor-nav-menu__container ${mobileMenuOpen ? "elementor-active" : ""}`} style={{ display: mobileMenuOpen ? "block" : "none" }}');

// Fix Services dropdown
header = header.replace(
  '<li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-405">',
  '<li className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-405 ${activeDropdown === "services" ? "elementor-active" : ""}`} onMouseEnter={() => setActiveDropdown("services")} onMouseLeave={() => setActiveDropdown(null)} onClick={() => toggleDropdown("services")}>'
);
header = header.replace(
  /<ul className="sub-menu elementor-nav-menu--dropdown">/,
  '<ul className="sub-menu elementor-nav-menu--dropdown" style={{ display: activeDropdown === "services" ? "block" : "" }}>' 
);

// Fix Our Offices dropdown
header = header.replace(
  '<li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-412">',
  '<li className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-412 ${activeDropdown === "offices" ? "elementor-active" : ""}`} onMouseEnter={() => setActiveDropdown("offices")} onMouseLeave={() => setActiveDropdown(null)} onClick={() => toggleDropdown("offices")}>'
);

header = header.replace(
  /<ul className="sub-menu elementor-nav-menu--dropdown">/, // The first one was already replaced, so this replaces the second one
  '<ul className="sub-menu elementor-nav-menu--dropdown" style={{ display: activeDropdown === "offices" ? "block" : "" }}>'
);

fs.writeFileSync('src/components/layout/Header.tsx', header);
