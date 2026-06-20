const fs = require('fs');
let content = fs.readFileSync('src/components/CollabAndExportSection.tsx', 'utf8');

// Replace custom class names with CSS variable ones
content = content.replace(/bg-warm-sand/g, 'bg-[var(--theme-bg)] transition-colors duration-700');
content = content.replace(/bg-soft-clay/g, 'bg-[var(--theme-panel)] transition-colors duration-700');
content = content.replace(/bg-dark-earth/g, 'bg-[var(--theme-bg)] transition-colors duration-700');
content = content.replace(/text-dark-text\/80/g, 'text-[var(--theme-text-muted)] transition-colors duration-700');
content = content.replace(/text-dark-text/g, 'text-[var(--theme-text)] transition-colors duration-700');
content = content.replace(/border-dark-text\/10/g, 'border-[var(--theme-border)] transition-colors duration-700');
content = content.replace(/text-light-text/g, 'text-[var(--theme-bg)] transition-colors duration-700');
content = content.replace(/bg-neutral-800/g, 'bg-[var(--theme-text)] transition-colors duration-700');

fs.writeFileSync('src/components/CollabAndExportSection.tsx', content);
