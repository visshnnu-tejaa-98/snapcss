export interface SearchEntry {
  slug: string
  title: string
  group: string
  keywords: string
}

export const searchIndex: SearchEntry[] = [
  // Getting Started
  { slug: 'introduction',      title: 'Introduction',            group: 'Getting Started',       keywords: 'overview pipeline scanner parser resolver applier DOM how it works' },
  { slug: 'installation',      title: 'Installation',            group: 'Getting Started',       keywords: 'npm cdn script tag import init setup install package' },
  { slug: 'quick-start',       title: 'Quick Start',             group: 'Getting Started',       keywords: 'quick start example html card button 30 seconds' },
  { slug: 'compatibility',     title: 'Compatibility',           group: 'Getting Started',       keywords: 'browser chrome firefox safari edge ios MutationObserver matchMedia support' },

  // Core Concepts
  { slug: 'class-syntax',      title: 'Class Syntax',            group: 'Core Concepts',         keywords: 'modifier utility value syntax format structure class names no prefix' },
  { slug: 'arbitrary-values',  title: 'Arbitrary Values',        group: 'Core Concepts',         keywords: 'bracket notation [150px] [#ff5733] [1fr_2fr] custom value arbitrary underscore space' },
  { slug: 'modifiers-overview',title: 'Modifiers Overview',      group: 'Core Concepts',         keywords: 'hover focus dark responsive disabled first last odd even group modifier overview' },

  // Spacing
  { slug: 'padding',           title: 'Padding',                 group: 'Spacing',               keywords: 'p pt pb pl pr px py padding top bottom left right horizontal vertical axis' },
  { slug: 'margin',            title: 'Margin',                  group: 'Spacing',               keywords: 'm mt mb ml mr mx my margin auto center block' },
  { slug: 'space-between',     title: 'Space Between',           group: 'Spacing',               keywords: 'space-x space-y space between children gap margin siblings' },

  // Layout
  { slug: 'display',           title: 'Display',                 group: 'Layout',                keywords: 'block flex grid hidden inline inline-block table display none' },
  { slug: 'position',          title: 'Position',                group: 'Layout',                keywords: 'relative absolute fixed sticky static position' },
  { slug: 'overflow',          title: 'Overflow',                group: 'Layout',                keywords: 'overflow overflow-x overflow-y auto hidden scroll visible clip' },
  { slug: 'visibility',        title: 'Visibility & Z-Index',    group: 'Layout',                keywords: 'visible invisible z z-index visibility hidden stack layer' },

  // Flexbox
  { slug: 'flex-basics',       title: 'Flex Basics',             group: 'Flexbox',               keywords: 'flex flex-row flex-col items-center justify-between gap direction align justify center' },
  { slug: 'flex-extras',       title: 'Flex Extras',             group: 'Flexbox',               keywords: 'grow shrink flex-1 flex-auto flex-none basis order self content wrap nowrap reverse' },

  // Grid
  { slug: 'grid',              title: 'Grid Layout',             group: 'Grid',                  keywords: 'grid grid-cols grid-rows col-span row-span gap gap-x gap-y grid template columns rows auto' },

  // Sizing
  { slug: 'sizing',            title: 'Width & Height',          group: 'Sizing',                keywords: 'w h max-w min-w max-h min-h width height full screen fit min max fraction 1/2 1/3' },
  { slug: 'inset',             title: 'Inset',                   group: 'Sizing',                keywords: 'top right bottom left inset inset-x inset-y position offset top right bottom left' },

  // Typography
  { slug: 'typography',        title: 'Font & Text',             group: 'Typography',            keywords: 'text font leading tracking uppercase lowercase capitalize italic truncate line-clamp font-sans font-serif font-mono size weight family line-height letter-spacing whitespace' },

  // Colors
  { slug: 'color-palette',     title: 'Color Palette',           group: 'Colors',                keywords: 'bg text color palette red blue green gray slate violet indigo 22 families shades 50 100 200 300 400 500 600 700 800 900 950 white black transparent hex rgb' },

  // Backgrounds & Colors
  { slug: 'background-color',  title: 'Background Color',        group: 'Backgrounds & Colors',  keywords: 'bg background-color red blue green gray slate violet indigo palette 50 100 500 900' },
  { slug: 'background-extras', title: 'Background Extras',       group: 'Backgrounds & Colors',  keywords: 'bg-cover bg-contain bg-center bg-fixed bg-no-repeat bg-top bg-bottom background size position repeat attachment image url' },
  { slug: 'text-color',        title: 'Text Color',              group: 'Backgrounds & Colors',  keywords: 'text color text red blue green gray palette shade' },

  // Borders
  { slug: 'border-width',      title: 'Border Width',            group: 'Borders',               keywords: 'border border-t border-b border-l border-r border-x border-y border width 1px 2px 4px' },
  { slug: 'border-radius',     title: 'Border Radius',           group: 'Borders',               keywords: 'rounded rounded-t rounded-b rounded-l rounded-r rounded-tl rounded-tr rounded-bl rounded-br rounded-full border radius corner round' },
  { slug: 'border-style',      title: 'Border Style & Color',    group: 'Borders',               keywords: 'border-solid border-dashed border-dotted border-double border-none border style color red blue gray' },
  { slug: 'outline',           title: 'Outline',                 group: 'Borders',               keywords: 'outline outline-none outline-2 outline-offset outline-blue outline focus ring accessible' },

  // Effects
  { slug: 'shadows',           title: 'Shadows',                 group: 'Effects',               keywords: 'shadow shadow-sm shadow-md shadow-lg shadow-xl shadow-2xl shadow-inner shadow-none box-shadow elevation depth' },
  { slug: 'opacity',           title: 'Opacity',                 group: 'Effects',               keywords: 'opacity transparency fade 0 25 50 75 100' },
  { slug: 'transitions',       title: 'Transitions',             group: 'Effects',               keywords: 'transition transition-all transition-colors duration ease ease-in ease-out delay animation timing smooth' },
  { slug: 'transforms',        title: 'Transforms',              group: 'Effects',               keywords: 'scale rotate translate-x translate-y skew origin transform scale rotate translate skew' },

  // Interactivity
  { slug: 'cursor',            title: 'Cursor',                  group: 'Interactivity',         keywords: 'cursor-pointer cursor-not-allowed cursor-wait cursor-grab cursor-text cursor-default cursor pointer' },
  { slug: 'pointer-events',    title: 'Pointer Events & Select', group: 'Interactivity',         keywords: 'pointer-events-none pointer-events-auto select-none select-all pointer events user select text' },
  { slug: 'aspect-ratio',      title: 'Aspect Ratio',            group: 'Interactivity',         keywords: 'aspect-square aspect-video aspect aspect ratio 16/9 1/1 4/3' },
  { slug: 'object-fit',        title: 'Object Fit',              group: 'Interactivity',         keywords: 'object-cover object-contain object-fill object-center object-top object fit position image img' },

  // Modifiers
  { slug: 'hover-focus-active',title: 'Hover / Focus / Active',  group: 'Modifiers',             keywords: 'hover focus active mouseenter mouseleave state event interactive' },
  { slug: 'focus-visible',     title: 'Focus Visible',           group: 'Modifiers',             keywords: 'focus-visible keyboard tab accessible a11y focus ring :focus-visible' },
  { slug: 'responsive',        title: 'Responsive',              group: 'Modifiers',             keywords: 'sm md lg xl 2xl responsive breakpoint mobile tablet desktop 640 768 1024 1280' },
  { slug: 'dark-mode',         title: 'Dark Mode',               group: 'Modifiers',             keywords: 'dark dark mode prefers-color-scheme light dark system theme' },
  { slug: 'disabled',          title: 'Disabled',                group: 'Modifiers',             keywords: 'disabled disabled attribute button input form opacity cursor-not-allowed' },
  { slug: 'first-last',        title: 'First / Last',            group: 'Modifiers',             keywords: 'first last first last child sibling list item border padding' },
  { slug: 'odd-even',          title: 'Odd / Even',              group: 'Modifiers',             keywords: 'odd even odd even alternating rows table striped zebra' },
  { slug: 'group-hover',       title: 'Group Hover',             group: 'Modifiers',             keywords: 'group group-hover group hover parent child nested card reveal' },

  // Advanced
  { slug: 'theme-config',      title: 'Theme Configuration',     group: 'Advanced',              keywords: 'configure theme colors spacing extend override custom brand token deep merge' },
  { slug: 'dynamic-dom',       title: 'Dynamic DOM',             group: 'Advanced',              keywords: 'MutationObserver dynamic dom appendChild innerHTML framework react vue SPA route' },
  { slug: 'performance',       title: 'Performance',             group: 'Advanced',              keywords: 'cache performance speed benchmark fast 1000 nodes map debounce lazy' },
]
