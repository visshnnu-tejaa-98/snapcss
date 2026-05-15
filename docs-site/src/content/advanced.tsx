import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

export function ThemeConfig() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Advanced</p>
      <h1>Theme Configuration</h1>
      <p>
        snapcss ships with a full default theme covering colors, spacing, typography, shadows, and more.
        You can extend or override any part of it by passing a <code>theme</code> object to <code>init()</code>.
      </p>

      <h2>Basic override</h2>
      <CodeBlock
        code={`import { init } from 'snapcss'

init({
  theme: {
    colors: {
      brand: {
        50:  '#f5f3ff',
        100: '#ede9fe',
        500: '#7c6cf2',
        600: '#6d5ce0',
        900: '#2e1a6e',
      }
    }
  }
})`}
        lang="typescript"
        title="main.ts"
      />
      <p>
        After this, <code>bg-brand-500</code>, <code>text-brand-600</code>, and all other
        brand color utilities become available alongside the default palette.
      </p>

      <h2>Extending spacing</h2>
      <CodeBlock
        code={`init({
  theme: {
    spacing: {
      18: '72px',
      22: '88px',
      72: '288px',
      96: '384px',
    }
  }
})`}
        lang="typescript"
        title="main.ts"
      />
      <p>
        This adds <code>p-18</code>, <code>m-72</code>, <code>gap-96</code>, and any
        other spacing utility at these token values.
      </p>

      <h2>Full theme shape</h2>
      <ClassTable
        headers={['Theme key', 'Affects', 'Example']}
        rows={[
          { cls: 'colors',      css: 'bg, text, border, outline colors',   note: '{ brand: { 500: "#7c6cf2" } }' },
          { cls: 'spacing',     css: 'p, m, gap, inset, translate',        note: '{ 18: "72px" }' },
          { cls: 'fontSizes',   css: 'text-{size}',                   note: '{ "2xs": "0.625rem" }' },
          { cls: 'fontWeights', css: 'font-{weight}',                 note: '{ display: "900" }' },
          { cls: 'lineHeights', css: 'leading-{n}',                   note: '{ loose: "2.2" }' },
          { cls: 'borderRadius',css: 'rounded-{size}',                note: '{ "4xl": "2rem" }' },
          { cls: 'shadows',     css: 'shadow-{size}',                 note: '{ glow: "0 0 20px #7c6cf2" }' },
          { cls: 'breakpoints', css: 'sm/md/lg/xl/2xl:',              note: '{ "3xl": 1920 }' },
        ]}
      />

      <h2>Configure API (alternative)</h2>
      <CodeBlock
        code={`import { configure, init } from 'snapcss'

// Call configure() before init() to set up the theme
configure({
  theme: {
    colors: {
      brand: { 500: '#ff5733' }
    }
  }
})

// Then call init() as usual
init()`}
        lang="typescript"
        title="main.ts"
      />

      <div className="callout callout-info">
        <span className="callout-icon">ℹ️</span>
        <span>
          Theme overrides are <strong>deep-merged</strong> with the default theme, not replaced.
          You only need to specify values you want to add or change.
        </span>
      </div>
    </div>
  )
}

export function DynamicDom() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Advanced</p>
      <h1>Dynamic DOM</h1>
      <p>
        snapcss uses a <code>MutationObserver</code> to watch for DOM changes after <code>init()</code>.
        Elements added dynamically — from fetch, framework renders, or vanilla JS — are styled automatically.
      </p>

      <h2>Automatically handled cases</h2>
      <ul>
        <li>Elements inserted by <code>innerHTML</code>, <code>appendChild</code>, or <code>insertAdjacentHTML</code></li>
        <li>Elements rendered by JavaScript frameworks (React portals, Vue teleport, Alpine.js)</li>
        <li>Class attribute changes on existing elements (e.g. adding a new snap class via <code>classList.add</code>)</li>
        <li>Attribute changes triggering <code>disabled:</code> re-evaluation</li>
      </ul>

      <h2>Vanilla JS example</h2>
      <CodeBlock
        code={`// These elements are styled immediately, no re-init needed

const card = document.createElement('div')
card.className = 'bg-white rounded-xl shadow-lg p-6'
document.body.appendChild(card)

// Adding a class dynamically also works
card.classList.add('hover:shadow-2xl')

// Toggling disabled
const btn = document.querySelector('button')
btn.disabled = true  // disabled:* applies immediately`}
        lang="javascript"
        title="app.js"
      />

      <h2>Observer configuration</h2>
      <CodeBlock
        code={`// snapcss observes with these MutationObserver options:
{
  childList: true,   // newly inserted/removed nodes
  subtree: true,     // entire DOM tree, not just direct children
  attributes: true,  // attribute changes (class, disabled, etc.)
  attributeFilter: ['class', 'disabled']
}`}
        lang="javascript"
      />

      <h2>Manual re-init</h2>
      <p>
        If you unmount and remount large subtrees (e.g., route transitions in a SPA), you can call
        <code>init()</code> again. It is safe to call multiple times — it won't double-apply styles.
      </p>
      <CodeBlock
        code={`import { init } from 'snapcss'

// Safe to call after route changes or major DOM updates
router.afterEach(() => init())`}
        lang="typescript"
        title="router.ts"
      />

      <div className="callout callout-tip">
        <span className="callout-icon">💡</span>
        <span>
          For React, Vue, or other component-based frameworks, the MutationObserver covers most cases.
          You rarely need to call <code>init()</code> more than once at app startup.
        </span>
      </div>
    </div>
  )
}

export function Performance() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Advanced</p>
      <h1>Performance</h1>
      <p>
        snapcss is designed for speed. A 1000-node DOM scan and style application completes in under
        50ms on modern hardware. Here's how the engine stays fast.
      </p>

      <h2>Style cache</h2>
      <p>
        Every resolved class is stored in a <code>Map&lt;string, CSSProperties&gt;</code>.
        The full class string is the key — <code>"pt-[150px]"</code>, <code>"rounded-tl-lg"</code> —
        so identical classes across thousands of elements parse exactly once.
      </p>
      <CodeBlock
        code={`// First encounter: parse → resolve → cache
// "px-4" → { paddingLeft: "16px", paddingRight: "16px" }

// All subsequent elements with px-4:
// Cache hit → Object.assign(el.style, cachedStyles)  ← zero parsing cost`}
        lang="javascript"
      />

      <h2>Lazy evaluation</h2>
      <ul>
        <li><strong>Responsive</strong> styles are stored, not applied, until the first resize check.</li>
        <li><strong>Dark mode</strong> styles are applied only when <code>prefers-color-scheme: dark</code> is active.</li>
        <li><strong>State modifiers</strong> (hover, focus, active) are registered as listeners and only applied on events.</li>
      </ul>

      <h2>Debounced resize</h2>
      <p>
        The resize listener is debounced at <strong>150ms</strong>. Rapid window resizing does not
        trigger repeated DOM updates — only one pass fires at the end of the resize event burst.
      </p>

      <h2>Recommendations</h2>
      <ClassTable
        headers={['Tip', 'Why']}
        rows={[
          { cls: 'Reuse the same class strings',       css: 'Maximises cache hits — avoid dynamic class generation with unique values' },
          { cls: 'Prefer scale values over arbitrary', css: 'Same cache benefit; arbitrary values still work, just fewer reuse opportunities' },
          { cls: 'Call init() once at app start',      css: 'MutationObserver handles all subsequent DOM changes automatically' },
          { cls: 'Use transition sparingly',      css: 'Transition on all properties (transition-all) forces the browser to track every style change' },
        ]}
      />

      <h2>Benchmarks</h2>
      <ClassTable
        headers={['Scenario', 'Typical time']}
        rows={[
          { cls: 'Initial scan, 100 elements, 5 classes each',   css: '< 5ms' },
          { cls: 'Initial scan, 1000 elements, 5 classes each',  css: '< 50ms' },
          { cls: 'Cache-warm re-application (same classes)',      css: '< 2ms per 100 elements' },
          { cls: 'MutationObserver callback, 1 new element',      css: '< 1ms' },
          { cls: 'Responsive recalculation, 200 elements',        css: '< 10ms' },
        ]}
      />

      <div className="callout callout-info">
        <span className="callout-icon">ℹ️</span>
        <span>
          Benchmarks measured on a mid-2023 MacBook Pro (M2). Performance on mobile hardware will vary,
          but the cache architecture ensures each class is resolved at most once per session.
        </span>
      </div>
    </div>
  )
}
