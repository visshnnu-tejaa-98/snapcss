import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

const installNpm = `npm install snapcss`

const installCDN = `<!-- Via CDN (ESM) -->
<script type="module">
  import { init } from 'https://cdn.jsdelivr.net/npm/snapcss/dist/index.mjs'
  init()
</script>

<!-- Via CDN (UMD, auto-init on DOMContentLoaded) -->
<script src="https://cdn.jsdelivr.net/npm/snapcss/dist/index.js"></script>`

const installImport = `import { init } from 'snapcss'

// Call init() once — typically in your app entry point
init()

// Or with custom theme overrides
init({
  theme: {
    colors: { brand: { 500: '#7c6cf2' } }
  }
})`

const quickHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My App</title>
  <!-- Step 1: Load snapcss (auto-inits on DOMContentLoaded) -->
  <script src="https://cdn.jsdelivr.net/npm/snapcss/dist/index.js"></script>
</head>
<body>

  <!-- Step 2: Use utility classes directly on your elements -->
  <div class="flex items-center justify-center min-h-screen bg-gray-950">
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-sm">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">
        Hello, snapcss!
      </h1>
      <p class="text-gray-500 mb-4">
        Styles applied automatically — no CSS file needed.
      </p>
      <button class="bg-violet-500 text-white font-medium
                     px-5 py-2.5 rounded-lg cursor-pointer
                     transition duration-200
                     hover:bg-violet-600 hover:shadow-lg">
        Get Started
      </button>
    </div>
  </div>

</body>
</html>`

export function Introduction() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Getting Started</p>
      <h1>Introduction</h1>
      <p>
        <strong>snapcss</strong> is a lightweight, utility-first runtime CSS engine for the browser.
        It scans your DOM for utility classes, parses them, resolves them into
        CSS style objects, and applies them as inline styles — all at runtime, without any build step.
      </p>
      <p>
        Think of it as a mini TailwindCSS that runs entirely in the browser. You get the same
        ergonomic utility-class syntax without needing a PostCSS pipeline, a config file, or
        a build process.
      </p>

      <h2>How it works</h2>
      <p>
        snapcss follows a five-stage pipeline every time a class is encountered:
      </p>
      <div className="flow-diagram">
        <span className="flow-step">DOM</span>
        <span className="flow-arrow">→</span>
        <span className="flow-step">Scanner</span>
        <span className="flow-arrow">→</span>
        <span className="flow-step">Parser</span>
        <span className="flow-arrow">→</span>
        <span className="flow-step">Resolver</span>
        <span className="flow-arrow">→</span>
        <span className="flow-step">Style Applier</span>
      </div>
      <ol>
        <li><strong>Scanner</strong> — walks the DOM and collects all class names from every element.</li>
        <li><strong>Parser</strong> — tokenizes each class string, extracts modifiers and arbitrary values.</li>
        <li><strong>Resolver</strong> — maps utility tokens to CSS property/value pairs.</li>
        <li><strong>Cache</strong> — stores resolved styles so identical classes are never parsed twice.</li>
        <li><strong>Style Applier</strong> — calls <code>Object.assign(el.style, styles)</code>.</li>
      </ol>

      <h2>When to use snapcss</h2>
      <p>snapcss is ideal for:</p>
      <ul>
        <li>Rapid prototyping without a build setup</li>
        <li>HTML email templates and landing pages</li>
        <li>Adding styles to server-rendered HTML</li>
        <li>Projects where TailwindCSS feels like overkill</li>
        <li>Browser-based code editors and playgrounds</li>
      </ul>

      <div className="callout callout-info">
        <span className="callout-icon">ℹ️</span>
        <span>
          snapcss applies styles as <em>inline styles</em>, not CSS classes. This means styles are
          always specific and scoped to the element, but cannot be overridden by external stylesheets
          without <code>!important</code>.
        </span>
      </div>
    </div>
  )
}

export function Installation() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Getting Started</p>
      <h1>Installation</h1>
      <p>snapcss can be used via npm or a CDN script tag — whichever fits your workflow.</p>

      <h2>Via npm</h2>
      <CodeBlock code={installNpm} lang="bash" title="Terminal" />
      <CodeBlock code={installImport} lang="typescript" title="app.ts" />

      <h2>Via CDN</h2>
      <p>
        For plain HTML projects or when you want zero tooling, load snapcss from a CDN.
        The UMD build auto-calls <code>init()</code> on <code>DOMContentLoaded</code>.
      </p>
      <CodeBlock code={installCDN} lang="html" title="index.html" />

      <h2>Package exports</h2>
      <ClassTable
        headers={['Export', 'Format', 'Use case']}
        rows={[
          { cls: 'dist/index.js',   css: 'CJS (CommonJS)', note: 'Node.js / bundlers' },
          { cls: 'dist/index.mjs',  css: 'ESM',            note: 'Modern bundlers, CDN import()' },
          { cls: 'dist/index.d.ts', css: 'TypeScript types', note: 'Full type safety' },
        ]}
      />
    </div>
  )
}

export function QuickStart() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Getting Started</p>
      <h1>Quick Start</h1>
      <p>
        Build a styled card in under a minute — no CSS file, no config, just HTML.
      </p>
      <CodeBlock code={quickHtml} lang="html" title="index.html" />
      <div className="callout callout-tip">
        <span className="callout-icon">✅</span>
        <span>
          Open this file in any browser and you'll see a centered, styled card with a hover effect —
          zero CSS written.
        </span>
      </div>

      <h2>With npm + bundler</h2>
      <CodeBlock
        code={`import { init } from 'snapcss'

// In your app entry point (e.g. main.ts)
init()

// Optionally, extend the default theme
init({
  theme: {
    colors: {
      brand: { 500: '#7c6cf2', 600: '#6d5ce0' }
    }
  }
})`}
        lang="typescript"
        title="main.ts"
      />
    </div>
  )
}

export function Compatibility() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Getting Started</p>
      <h1>Compatibility</h1>
      <p>
        snapcss targets modern browsers. It relies on <code>MutationObserver</code>,
        <code>window.matchMedia</code>, <code>querySelectorAll</code>, and CSS Transforms Level 2
        individual properties (<code>scale</code>, <code>rotate</code>, <code>translate</code>).
      </p>

      <h2>Browser support</h2>
      <div className="compat-grid">
        {[
          { icon: '🌐', name: 'Chrome', version: '≥ 88' },
          { icon: '🦊', name: 'Firefox', version: '≥ 90' },
          { icon: '🧭', name: 'Safari', version: '≥ 15' },
          { icon: '🔷', name: 'Edge', version: '≥ 88' },
          { icon: '📱', name: 'iOS Safari', version: '≥ 15.4' },
          { icon: '🤖', name: 'Android Chrome', version: '≥ 88' },
        ].map((b) => (
          <div key={b.name} className="compat-card">
            <div className="compat-card-icon">{b.icon}</div>
            <div className="compat-card-name">{b.name}</div>
            <div className="compat-card-version">{b.version}</div>
          </div>
        ))}
      </div>

      <h2>Feature requirements</h2>
      <ClassTable
        headers={['Feature', 'Used for', 'Coverage']}
        rows={[
          { cls: 'MutationObserver',      css: 'Dynamic DOM updates',        note: '~98% global' },
          { cls: 'window.matchMedia',     css: 'Dark mode detection',        note: '~98% global' },
          { cls: 'CSS scale/rotate/translate', css: 'Individual transforms', note: '~95% global' },
          { cls: ':focus-visible',        css: 'focus-visible modifier',     note: '~96% global' },
          { cls: 'CSS aspect-ratio',      css: 'aspect-*',              note: '~96% global' },
          { cls: '-webkit-line-clamp',    css: 'line-clamp-*',          note: '~97% global' },
        ]}
      />

      <div className="callout callout-warn">
        <span className="callout-icon">⚠️</span>
        <span>
          snapcss is a <strong>browser-only</strong> library. It requires <code>document</code> and
          <code>window</code> globals and will not work in Node.js, Deno, or server-side rendering
          environments without a DOM shim.
        </span>
      </div>
    </div>
  )
}
