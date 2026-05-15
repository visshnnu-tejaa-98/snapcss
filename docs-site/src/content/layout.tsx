import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

/* ── shared ──────────────────────────────────────────────────────────────── */

const accentBox = (label: string, extra?: React.CSSProperties): React.CSSProperties => ({
  background: 'var(--demo-accent-dim)',
  border: '1px solid var(--demo-accent-mid)',
  borderRadius: 4,
  padding: '4px 10px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  color: 'var(--accent-light)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...extra,
})

/* ══════════════════════════════════════════════════════════════════════════
   DISPLAY
══════════════════════════════════════════════════════════════════════════ */

export function Display() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Layout</p>
      <h1>Display</h1>
      <p>Utilities for controlling the CSS <code>display</code>, <code>float</code>, <code>clear</code>, and <code>box-sizing</code> properties.</p>
      <CodeBlock
        code={`<div class="block">Block</div>
<span class="inline-block">Inline block</span>
<div class="flex gap-4">Flex container</div>
<div class="grid grid-cols-3">Grid container</div>
<div class="hidden">Hidden (display: none)</div>`}
        lang="html"
      />

      <h2>Display values</h2>
      <ClassTable
        rows={[
          { cls: 'block',        css: 'display: block' },
          { cls: 'inline',       css: 'display: inline' },
          { cls: 'inline-block', css: 'display: inline-block' },
          { cls: 'flex',         css: 'display: flex' },
          { cls: 'inline-flex',  css: 'display: inline-flex' },
          { cls: 'grid',         css: 'display: grid' },
          { cls: 'inline-grid',  css: 'display: inline-grid' },
          { cls: 'table',        css: 'display: table' },
          { cls: 'table-row',    css: 'display: table-row' },
          { cls: 'table-cell',   css: 'display: table-cell' },
          { cls: 'flow-root',    css: 'display: flow-root' },
          { cls: 'contents',     css: 'display: contents' },
          { cls: 'hidden',       css: 'display: none' },
        ]}
      />

      {/* ── Float ── */}
      <h2>Float</h2>
      <p>Remove an element from normal flow and push it to one side. Text and inline content wrap around it.</p>
      <CodeBlock
        code={`<!-- Image floated left, text wraps right -->
<img class="float-left mr-4" src="photo.jpg" />
<p>Text wraps around the floated image...</p>

<!-- Clear floats below -->
<div class="clear-both">Back to normal flow</div>`}
        lang="html"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, margin: '1rem 0 1.5rem' }}>
        {[
          { cls: 'float-left',  float: 'left'  as const },
          { cls: 'float-right', float: 'right' as const },
          { cls: 'float-none',  float: 'none'  as const },
        ].map(({ cls, float }) => (
          <div key={cls} style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: 12, overflow: 'hidden', minHeight: 72 }}>
            <div style={{ float, width: 52, height: 44, ...accentBox(cls), margin: float === 'left' ? '0 8px 4px 0' : float === 'right' ? '0 0 4px 8px' : undefined }}>
              {float === 'none' ? 'none' : float}
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {float === 'none' ? 'No float, stays in flow' : `Text wraps ${float === 'left' ? 'right' : 'left'}`}
            </p>
          </div>
        ))}
      </div>

      <ClassTable
        rows={[
          { cls: 'float-left',  css: 'float: left' },
          { cls: 'float-right', css: 'float: right' },
          { cls: 'float-none',  css: 'float: none' },
        ]}
      />

      {/* ── Clear ── */}
      <h2>Clear</h2>
      <p>Force an element to move below floated elements — stops content from wrapping alongside a float.</p>
      <CodeBlock
        code={`<div class="float-left w-20 h-16">Float</div>
<div class="float-right w-20 h-16">Float</div>

<!-- These clear different sides -->
<div class="clear-left">Clears left floats only</div>
<div class="clear-right">Clears right floats only</div>
<div class="clear-both">Clears all floats</div>`}
        lang="html"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, margin: '1rem 0 1.5rem' }}>
        {[
          { cls: 'clear-left',  clear: 'left',  desc: 'below left floats' },
          { cls: 'clear-right', clear: 'right', desc: 'below right floats' },
          { cls: 'clear-both',  clear: 'both',  desc: 'below all floats' },
          { cls: 'clear-none',  clear: 'none',  desc: 'no clearing' },
        ].map(({ cls, clear, desc }) => (
          <div key={cls} style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: 12, overflow: 'hidden' }}>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ float: 'left', width: 28, height: 20, ...accentBox(''), margin: '0 4px 4px 0', fontSize: '0.6rem' }}>L</div>
              <div style={{ float: 'right', width: 28, height: 20, ...accentBox(''), margin: '0 0 4px 4px', fontSize: '0.6rem' }}>R</div>
            </div>
            <div style={{ clear: clear as React.CSSProperties['clear'], background: 'var(--demo-green-dim)', border: '1px solid var(--demo-green-mid)', borderRadius: 4, padding: '3px 6px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--demo-green-text)' }}>
              {cls}
            </div>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>{desc}</span>
          </div>
        ))}
      </div>

      <ClassTable
        rows={[
          { cls: 'clear-left',  css: 'clear: left' },
          { cls: 'clear-right', css: 'clear: right' },
          { cls: 'clear-both',  css: 'clear: both' },
          { cls: 'clear-none',  css: 'clear: none' },
        ]}
      />

      {/* ── Box Sizing ── */}
      <h2>Box Sizing</h2>
      <p>
        Controls whether <code>padding</code> and <code>border</code> are included in an element's declared <code>width</code>/<code>height</code>.
        <code>border-box</code> is strongly recommended and is the browser default when snapcss base styles are applied.
      </p>
      <CodeBlock
        code={`<!-- Both declared w-32 (128px), but total rendered sizes differ -->
<div class="box-border w-32 p-4 border-4">
  border-box: 128px total
</div>
<div class="box-content w-32 p-4 border-4">
  content-box: 128px + 32px padding + 8px border = 168px total
</div>`}
        lang="html"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, margin: '1rem 0 1.5rem' }}>
        {[
          {
            cls: 'box-border',
            sizing: 'border-box' as const,
            color: 'rgba(124,108,242,0.45)',
            bg: 'rgba(124,108,242,0.1)',
            desc: 'padding + border counted inside declared width',
          },
          {
            cls: 'box-content',
            sizing: 'content-box' as const,
            color: 'rgba(251,146,60,0.6)',
            bg: 'rgba(251,146,60,0.1)',
            desc: 'padding + border added on top of declared width',
          },
        ].map(({ cls, sizing, color, bg, desc }) => (
          <div key={cls} style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: 16 }}>
            <div style={{
              boxSizing: sizing,
              width: 160,
              height: 60,
              border: `8px solid ${color}`,
              padding: 8,
              background: bg,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--accent-light)',
              marginBottom: 10,
            }}>
              {cls}
            </div>
            <code style={{ fontSize: '0.72rem', color: 'var(--accent-light)', fontFamily: 'var(--font-mono)' }}>{cls}</code>
            <p style={{ margin: '4px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{desc}</p>
          </div>
        ))}
      </div>

      <ClassTable
        rows={[
          { cls: 'box-border',  css: 'box-sizing: border-box',  note: 'recommended default' },
          { cls: 'box-content', css: 'box-sizing: content-box' },
        ]}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   POSITION
══════════════════════════════════════════════════════════════════════════ */

export function Position() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Layout</p>
      <h1>Position</h1>
      <p>Utilities for controlling how an element is positioned in the document.</p>
      <CodeBlock
        code={`<!-- Positioned parent -->
<div class="relative h-32">
  <div class="absolute top-4 right-4 bg-blue-500 p-2">
    Absolute top-right
  </div>
</div>

<!-- Fixed header -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-white">
  Sticky nav
</nav>

<!-- Sticky sidebar -->
<aside class="sticky top-16">Stays visible on scroll</aside>`}
        lang="html"
      />
      <ClassTable
        rows={[
          { cls: 'static',   css: 'position: static' },
          { cls: 'relative', css: 'position: relative' },
          { cls: 'absolute', css: 'position: absolute' },
          { cls: 'fixed',    css: 'position: fixed' },
          { cls: 'sticky',   css: 'position: sticky' },
        ]}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   OVERFLOW
══════════════════════════════════════════════════════════════════════════ */

export function Overflow() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Layout</p>
      <h1>Overflow</h1>
      <p>Utilities for controlling how overflowing content is handled.</p>
      <CodeBlock
        code={`<div class="overflow-hidden h-32">Clips content</div>
<div class="overflow-auto h-32">Scrolls when needed</div>
<div class="overflow-x-auto overflow-y-hidden">Horizontal scroll only</div>
<div class="overflow-x-clip overflow-y-visible">X clipped, Y visible</div>`}
        lang="html"
      />

      <h2>All axes</h2>
      <ClassTable
        rows={[
          { cls: 'overflow-auto',    css: 'overflow: auto' },
          { cls: 'overflow-hidden',  css: 'overflow: hidden' },
          { cls: 'overflow-visible', css: 'overflow: visible' },
          { cls: 'overflow-scroll',  css: 'overflow: scroll' },
          { cls: 'overflow-clip',    css: 'overflow: clip' },
        ]}
      />

      <h2>X-axis</h2>
      <ClassTable
        rows={[
          { cls: 'overflow-x-auto',    css: 'overflow-x: auto' },
          { cls: 'overflow-x-hidden',  css: 'overflow-x: hidden' },
          { cls: 'overflow-x-visible', css: 'overflow-x: visible' },
          { cls: 'overflow-x-scroll',  css: 'overflow-x: scroll' },
          { cls: 'overflow-x-clip',    css: 'overflow-x: clip' },
        ]}
      />

      <h2>Y-axis</h2>
      <ClassTable
        rows={[
          { cls: 'overflow-y-auto',    css: 'overflow-y: auto' },
          { cls: 'overflow-y-hidden',  css: 'overflow-y: hidden' },
          { cls: 'overflow-y-visible', css: 'overflow-y: visible' },
          { cls: 'overflow-y-scroll',  css: 'overflow-y: scroll' },
          { cls: 'overflow-y-clip',    css: 'overflow-y: clip' },
        ]}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   VISIBILITY & Z-INDEX
══════════════════════════════════════════════════════════════════════════ */

export function Visibility() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Layout</p>
      <h1>Visibility & Z-Index</h1>
      <p>
        Control element visibility and stacking order. <code>invisible</code> hides the element
        visually but keeps its space in the layout, unlike <code>hidden</code>.
      </p>
      <ClassTable
        rows={[
          { cls: 'visible',    css: 'visibility: visible' },
          { cls: 'invisible',  css: 'visibility: hidden',  note: 'keeps layout space' },
          { cls: 'z-0',        css: 'z-index: 0' },
          { cls: 'z-10',       css: 'z-index: 10' },
          { cls: 'z-20',       css: 'z-index: 20' },
          { cls: 'z-30',       css: 'z-index: 30' },
          { cls: 'z-40',       css: 'z-index: 40' },
          { cls: 'z-50',       css: 'z-index: 50' },
          { cls: 'z-auto',     css: 'z-index: auto' },
          { cls: 'z-[100]',    css: 'z-index: 100',       note: 'arbitrary' },
        ]}
      />
    </div>
  )
}
