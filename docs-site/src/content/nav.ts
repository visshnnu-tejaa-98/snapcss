export interface NavItem {
  title: string
  slug: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'Installation', slug: 'installation' },
      { title: 'Quick Start', slug: 'quick-start' },
      { title: 'Compatibility', slug: 'compatibility' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Class Syntax', slug: 'class-syntax' },
      { title: 'Arbitrary Values', slug: 'arbitrary-values' },
      { title: 'Modifiers Overview', slug: 'modifiers-overview' },
    ],
  },
  {
    title: 'Spacing',
    items: [
      { title: 'Padding', slug: 'padding' },
      { title: 'Margin', slug: 'margin' },
      { title: 'Space Between', slug: 'space-between' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { title: 'Display', slug: 'display' },
      { title: 'Position', slug: 'position' },
      { title: 'Overflow', slug: 'overflow' },
      { title: 'Visibility & Z-Index', slug: 'visibility' },
    ],
  },
  {
    title: 'Flexbox',
    items: [
      { title: 'Flex Basics', slug: 'flex-basics' },
      { title: 'Flex Extras', slug: 'flex-extras' },
    ],
  },
  {
    title: 'Grid',
    items: [
      { title: 'Grid Layout', slug: 'grid' },
    ],
  },
  {
    title: 'Sizing',
    items: [
      { title: 'Width & Height', slug: 'sizing' },
      { title: 'Inset', slug: 'inset' },
    ],
  },
  {
    title: 'Typography',
    items: [
      { title: 'Font & Text', slug: 'typography' },
    ],
  },
  {
    title: 'Colors',
    items: [
      { title: 'Color Palette', slug: 'color-palette' },
    ],
  },
  {
    title: 'Backgrounds & Colors',
    items: [
      { title: 'Background Color', slug: 'background-color' },
      { title: 'Background Extras', slug: 'background-extras' },
      { title: 'Text Color', slug: 'text-color' },
    ],
  },
  {
    title: 'Borders',
    items: [
      { title: 'Border Width', slug: 'border-width' },
      { title: 'Border Radius', slug: 'border-radius' },
      { title: 'Border Style & Color', slug: 'border-style' },
      { title: 'Outline', slug: 'outline' },
    ],
  },
  {
    title: 'Effects',
    items: [
      { title: 'Shadows', slug: 'shadows' },
      { title: 'Opacity', slug: 'opacity' },
      { title: 'Transitions', slug: 'transitions' },
      { title: 'Transforms', slug: 'transforms' },
    ],
  },
  {
    title: 'Interactivity',
    items: [
      { title: 'Cursor', slug: 'cursor' },
      { title: 'Pointer Events & Select', slug: 'pointer-events' },
      { title: 'Aspect Ratio', slug: 'aspect-ratio' },
      { title: 'Object Fit', slug: 'object-fit' },
    ],
  },
  {
    title: 'Modifiers',
    items: [
      { title: 'Hover / Focus / Active', slug: 'hover-focus-active' },
      { title: 'Focus Visible', slug: 'focus-visible' },
      { title: 'Responsive', slug: 'responsive' },
      { title: 'Dark Mode', slug: 'dark-mode' },
      { title: 'Disabled', slug: 'disabled' },
      { title: 'First / Last', slug: 'first-last' },
      { title: 'Odd / Even', slug: 'odd-even' },
      { title: 'Group Hover', slug: 'group-hover' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Theme Configuration', slug: 'theme-config' },
      { title: 'Dynamic DOM', slug: 'dynamic-dom' },
      { title: 'Performance', slug: 'performance' },
    ],
  },
]

export const allItems = navGroups.flatMap((g) => g.items)
