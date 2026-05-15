# Running snapcss Locally

## Prerequisites

```bash
npm install
```

## Running Tests

```bash
# Single run (all 104 tests)
npm test

# Watch mode (re-runs on file changes)
npm run test:watch
```

Tests live in `tests/` and cover: parser, resolver (spacing, margin, border), cache, scanner, and integration.

## Building

```bash
npm run build
```

Outputs to `dist/`: `index.js` (CJS), `index.mjs` (ESM), `index.d.ts` (types).

## Running the Playground

The playground requires a build first:

```bash
npm run build
node playground/server.js
# → open http://localhost:3000
```

Or with the npm script:

```bash
npm run build && npm run playground
```

The playground (`playground/index.html`) demos every utility class — padding, margin, borders, grid, flexbox, typography, transitions, transforms, hover/focus states, dark mode, responsive breakpoints, group-hover, disabled, first/last/odd/even, and the MutationObserver dynamic DOM test.

## Dev Workflow (watch mode)

Open two terminals:

```bash
# Terminal 1 — rebuild on source changes
npm run dev

# Terminal 2 — serve playground
npm run playground
```

Then edit any file in `packages/` and refresh `http://localhost:3000` to see changes.
