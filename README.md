# snapcss

A lightweight utility-first runtime CSS engine. No build step required — works entirely in the browser, like TailwindCSS but at runtime.

## Features

- Zero build step — drop a script tag and go
- Utility-first class names (Tailwind-compatible syntax)
- Responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Dark mode support (`dark:`)
- State variants (`hover:`, `focus:`, `focus-visible:`, `active:`)
- Group hover (`group` / `group-hover:`)
- Structural modifiers (`disabled:`, `first:`, `last:`)
- Space between utilities (`space-x-*`, `space-y-*`)
- Dynamic DOM support via MutationObserver
- Themeable via design tokens

## Installation

### npm

```bash
npm install snapcss
```

```js
import { init } from 'snapcss';
init();
```

### CDN (browser)

```html
<script src="https://unpkg.com/snapcss/dist/index.js"></script>
```

The script auto-initialises on `DOMContentLoaded` — no extra code needed.

## Usage

Add utility classes to any element:

```html
<div class="snap p-8 bg-cyan-500 text-white rounded-xl hover:bg-violet-500">
  Hello snapcss
</div>
```

All elements with the `snap` class are processed automatically.

## Custom Theme

```js
import { init } from 'snapcss';

init({
  theme: {
    colors: {
      brand: { 500: '#22d3ee' },
    },
  },
});
```

## Development

```bash
npm install
npm run build        # compile npm package to dist/
npm run test         # run test suite
npm run playground   # local playground server
```

## License

MIT © Visshnnu Tejaa
