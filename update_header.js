const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

// 1. Add QuoteModal import
code = code.replace(
  /import React, { useState, useEffect } from 'react';/,
  "import React, { useState, useEffect } from 'react';\nimport QuoteModal from './QuoteModal';"
);

// 2. Add state for modal
code = code.replace(
  /const Header = \(\) => {/,
  "const Header = () => {\n  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);"
);

// 3. Replace all Request a Quote popup action links with onClick
code = code.replace(
  /href="#elementor-action[^"]*"/g,
  'href="#" onClick={(e) => { e.preventDefault(); setIsQuoteModalOpen(true); }}'
);

// 4. Inject <QuoteModal /> at the end of the header
code = code.replace(
  /<\/header>/,
  "</header>\n      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />"
);

fs.writeFileSync('src/components/layout/Header.tsx', code);
console.log('Header.tsx updated successfully');
