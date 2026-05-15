import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

// ─── Shared helpers ────────────────────────────────────────────────────────────

const accentRgba = (a: number): string => {
  if (a <= 0.3) return 'var(--demo-accent-dim)'
  if (a <= 0.6) return 'var(--demo-accent-mid)'
  return 'var(--demo-accent-strong)'
}

const boxBase: React.CSSProperties = {
  width: 64,
  height: 48,
  background: 'var(--bg-elevated)',
  borderRadius: 4,
  border: '1px solid rgba(255,255,255,0.05)',
}

const demoGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 14,
  marginBottom: '1.75rem',
}

function DemoCard({ boxStyle, label, sub }: {
  boxStyle: React.CSSProperties
  label: string
  sub?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ ...boxBase, ...boxStyle }} />
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-light)', textAlign: 'center', maxWidth: 120 }}>
        {label}
      </code>
      {sub && (
        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center' }}>{sub}</span>
      )}
    </div>
  )
}

// ─── Border Width ─────────────────────────────────────────────────────────────

function BorderWidthDemo() {
  return (
    <>
      {/* All sides */}
      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>All sides</p>
      <div style={demoGrid}>
        <DemoCard boxStyle={{ border: '1px solid ' + accentRgba(0.7) }} label="border" sub="1px" />
        <DemoCard boxStyle={{ border: '2px solid ' + accentRgba(0.7) }} label="border-2" sub="2px" />
        <DemoCard boxStyle={{ border: '4px solid ' + accentRgba(0.7) }} label="border-4" sub="4px" />
        <DemoCard boxStyle={{ border: '8px solid ' + accentRgba(0.7) }} label="border-8" sub="8px" />
        <DemoCard boxStyle={{ border: 'none' }} label="border-0" sub="0px" />
      </div>

      {/* Directional — scale values */}
      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Directional — scale values (4px)</p>
      <div style={demoGrid}>
        <DemoCard boxStyle={{ borderTop:    '4px solid ' + accentRgba(0.75) }} label="border-t-4" sub="top · 4px" />
        <DemoCard boxStyle={{ borderBottom: '4px solid ' + accentRgba(0.75) }} label="border-b-4" sub="bottom · 4px" />
        <DemoCard boxStyle={{ borderLeft:   '4px solid ' + accentRgba(0.75) }} label="border-l-4" sub="left · 4px" />
        <DemoCard boxStyle={{ borderRight:  '4px solid ' + accentRgba(0.75) }} label="border-r-4" sub="right · 4px" />
        <DemoCard boxStyle={{ borderLeft: '4px solid ' + accentRgba(0.75), borderRight: '4px solid ' + accentRgba(0.75) }} label="border-x-4" sub="x-axis · 4px" />
        <DemoCard boxStyle={{ borderTop: '4px solid ' + accentRgba(0.75), borderBottom: '4px solid ' + accentRgba(0.75) }} label="border-y-4" sub="y-axis · 4px" />
      </div>

      {/* Arbitrary — same 6 directions, custom px / rem */}
      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>
        Directional — arbitrary values (px &amp; rem)
      </p>
      <div style={demoGrid}>
        <DemoCard boxStyle={{ borderTop:    '3px solid ' + accentRgba(0.8) }} label="border-t-[3px]"      sub="top · 3px" />
        <DemoCard boxStyle={{ borderBottom: '5px solid ' + accentRgba(0.8) }} label="border-b-[5px]"      sub="bottom · 5px" />
        <DemoCard boxStyle={{ borderLeft:   '4px solid ' + accentRgba(0.8) }} label="border-l-[0.25rem]"  sub="left · 0.25rem" />
        <DemoCard boxStyle={{ borderRight:  '8px solid ' + accentRgba(0.8) }} label="border-r-[0.5rem]"   sub="right · 0.5rem" />
        <DemoCard boxStyle={{ borderLeft: '6px solid ' + accentRgba(0.8), borderRight: '6px solid ' + accentRgba(0.8) }} label="border-x-[0.375rem]" sub="x-axis · 0.375rem" />
        <DemoCard boxStyle={{ borderTop: '2px solid ' + accentRgba(0.8), borderBottom: '2px solid ' + accentRgba(0.8) }} label="border-y-[1.5px]" sub="y-axis · 1.5px" />
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '-0.75rem 0 1.5rem' }}>
        Any valid CSS length works inside <code>[…]</code> — px, rem, em, etc.
      </p>
    </>
  )
}

export function BorderWidth() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Borders</p>
      <h1>Border Width</h1>
      <p>Control border width on all sides, individual sides, or axes. Supports the built-in scale and any arbitrary px / rem value.</p>

      <CodeBlock
        code={`<!-- All sides -->
<div class="border-2 border-solid border-gray-300">2px border</div>

<!-- Top only -->
<div class="border-t-4 border-solid border-blue-500">Top 4px</div>

<!-- Horizontal axis (left + right) -->
<div class="border-x-2 border-solid border-red-300">Left + right 2px</div>

<!-- Arbitrary px -->
<div class="border-t-[3px] border-solid border-violet-400">Top 3px</div>

<!-- Arbitrary rem -->
<div class="border-l-[0.25rem] border-solid border-emerald-500">Left 0.25rem</div>`}
        lang="html"
      />

      <BorderWidthDemo />

      <h2>All sides</h2>
      <ClassTable
        rows={[
          { cls: 'border',   css: 'border-width: 1px',  note: 'default' },
          { cls: 'border-0', css: 'border-width: 0px' },
          { cls: 'border-2', css: 'border-width: 2px' },
          { cls: 'border-4', css: 'border-width: 4px' },
          { cls: 'border-8', css: 'border-width: 8px' },
        ]}
      />

      <h2>Top (border-t)</h2>
      <ClassTable
        rows={[
          { cls: 'border-t',   css: 'border-top-width: 1px',  note: 'default' },
          { cls: 'border-t-0', css: 'border-top-width: 0px' },
          { cls: 'border-t-2', css: 'border-top-width: 2px' },
          { cls: 'border-t-4', css: 'border-top-width: 4px' },
          { cls: 'border-t-8', css: 'border-top-width: 8px' },
        ]}
      />
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '-0.5rem 0 1rem' }}>
        Replace <code>t</code> with <code>b</code> (bottom), <code>l</code> (left), or <code>r</code> (right) — same scale applies.
      </p>

      <h2>Axes (x / y)</h2>
      <ClassTable
        rows={[
          { cls: 'border-x',   css: 'border-left-width: 1px; border-right-width: 1px',   note: 'default' },
          { cls: 'border-x-0', css: 'border-left-width: 0px; border-right-width: 0px' },
          { cls: 'border-x-2', css: 'border-left-width: 2px; border-right-width: 2px' },
          { cls: 'border-x-4', css: 'border-left-width: 4px; border-right-width: 4px' },
          { cls: 'border-x-8', css: 'border-left-width: 8px; border-right-width: 8px' },
          { cls: 'border-y',   css: 'border-top-width: 1px; border-bottom-width: 1px',   note: 'default' },
          { cls: 'border-y-0', css: 'border-top-width: 0px; border-bottom-width: 0px' },
          { cls: 'border-y-2', css: 'border-top-width: 2px; border-bottom-width: 2px' },
          { cls: 'border-y-4', css: 'border-top-width: 4px; border-bottom-width: 4px' },
          { cls: 'border-y-8', css: 'border-top-width: 8px; border-bottom-width: 8px' },
        ]}
      />

      <h2>Arbitrary values</h2>
      <ClassTable
        rows={[
          { cls: 'border-[3px]',        css: 'border-width: 3px',            note: 'arbitrary px' },
          { cls: 'border-t-[3px]',      css: 'border-top-width: 3px',        note: 'arbitrary px' },
          { cls: 'border-b-[5px]',      css: 'border-bottom-width: 5px',     note: 'arbitrary px' },
          { cls: 'border-l-[0.25rem]',  css: 'border-left-width: 0.25rem',   note: 'arbitrary rem' },
          { cls: 'border-r-[0.5rem]',   css: 'border-right-width: 0.5rem',   note: 'arbitrary rem' },
          { cls: 'border-x-[0.375rem]', css: 'border-left-width: 0.375rem; border-right-width: 0.375rem', note: 'arbitrary rem' },
          { cls: 'border-y-[1.5px]',    css: 'border-top-width: 1.5px; border-bottom-width: 1.5px',       note: 'arbitrary px' },
        ]}
      />
    </div>
  )
}

// ─── Border Radius ────────────────────────────────────────────────────────────

function BorderRadiusDemo() {
  const scale = [
    { cls: 'rounded-none', r: 0,    sub: '0px' },
    { cls: 'rounded-sm',   r: 2,    sub: '2px' },
    { cls: 'rounded',      r: 4,    sub: '4px (default)' },
    { cls: 'rounded-md',   r: 6,    sub: '6px' },
    { cls: 'rounded-lg',   r: 8,    sub: '8px' },
    { cls: 'rounded-xl',   r: 12,   sub: '12px' },
    { cls: 'rounded-2xl',  r: 16,   sub: '16px' },
    { cls: 'rounded-3xl',  r: 24,   sub: '24px' },
    { cls: 'rounded-full', r: 9999, sub: '9999px' },
  ]

  return (
    <>
      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Scale</p>
      <div style={demoGrid}>
        {scale.map(({ cls, r, sub }) => (
          <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 56,
              height: 56,
              background: accentRgba(0.12),
              border: '1.5px solid ' + accentRgba(0.45),
              borderRadius: r,
            }} />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--accent-light)', textAlign: 'center' }}>{cls}</code>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sub}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Directional corners</p>
      <div style={demoGrid}>
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.45), background: accentRgba(0.08), borderRadius: '12px 12px 0 0' }}  label="rounded-t-xl"  sub="top" />
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.45), background: accentRgba(0.08), borderRadius: '0 0 12px 12px' }}  label="rounded-b-xl"  sub="bottom" />
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.45), background: accentRgba(0.08), borderRadius: '12px 0 0 12px' }}  label="rounded-l-xl"  sub="left" />
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.45), background: accentRgba(0.08), borderRadius: '0 12px 12px 0' }}  label="rounded-r-xl"  sub="right" />
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.45), background: accentRgba(0.08), borderRadius: '12px 0 12px 0' }}  label="rounded-tl-xl rounded-br-xl"  sub="diagonal" />
      </div>

      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Arbitrary radius</p>
      <div style={demoGrid}>
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.5),   background: accentRgba(0.08),   borderRadius: 6          }} label="rounded-[6px]"      sub="all corners · px" />
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.5),   background: accentRgba(0.08),   borderRadius: '0.75rem'  }} label="rounded-[0.75rem]"  sub="all corners · rem" />
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.5),  background: accentRgba(0.08),  borderTopLeftRadius: 16  }} label="rounded-tl-[1rem]"  sub="tl corner · rem" />
        <DemoCard boxStyle={{ ...boxBase, border: '1.5px solid ' + accentRgba(0.5),  background: accentRgba(0.08),  borderBottomRightRadius: 12 }} label="rounded-br-[12px]" sub="br corner · px" />
      </div>
    </>
  )
}

export function BorderRadius() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Borders</p>
      <h1>Border Radius</h1>
      <p>Round corners on all sides, individual sides, or per-corner. Supports the built-in scale and arbitrary values.</p>

      <CodeBlock
        code={`<div class="rounded">Default (4px)</div>
<div class="rounded-md">Medium (6px)</div>
<div class="rounded-lg">Large (8px)</div>
<div class="rounded-full">Fully rounded (pill / circle)</div>

<!-- Directional -->
<div class="rounded-t-xl">Top corners only (12px)</div>
<div class="rounded-tl-lg rounded-br-lg">Diagonal corners (8px)</div>

<!-- Arbitrary -->
<div class="rounded-[6px]">6px all corners</div>
<div class="rounded-tl-[1rem]">Single corner — 1rem</div>`}
        lang="html"
      />

      <BorderRadiusDemo />

      <h2>Scale</h2>
      <ClassTable
        rows={[
          { cls: 'rounded-none', css: 'border-radius: 0px' },
          { cls: 'rounded-sm',   css: 'border-radius: 2px' },
          { cls: 'rounded',      css: 'border-radius: 4px',    note: 'default' },
          { cls: 'rounded-md',   css: 'border-radius: 6px' },
          { cls: 'rounded-lg',   css: 'border-radius: 8px' },
          { cls: 'rounded-xl',   css: 'border-radius: 12px' },
          { cls: 'rounded-2xl',  css: 'border-radius: 16px' },
          { cls: 'rounded-3xl',  css: 'border-radius: 24px' },
          { cls: 'rounded-full', css: 'border-radius: 9999px' },
        ]}
      />

      <h2>Directional (sides)</h2>
      <ClassTable
        rows={[
          { cls: 'rounded-t-{s}', css: 'border-top-left-radius + border-top-right-radius',       note: 'e.g. rounded-t-lg' },
          { cls: 'rounded-b-{s}', css: 'border-bottom-left-radius + border-bottom-right-radius', note: 'e.g. rounded-b-xl' },
          { cls: 'rounded-l-{s}', css: 'border-top-left-radius + border-bottom-left-radius',     note: 'e.g. rounded-l-md' },
          { cls: 'rounded-r-{s}', css: 'border-top-right-radius + border-bottom-right-radius',   note: 'e.g. rounded-r-sm' },
        ]}
      />

      <h2>Per-corner</h2>
      <ClassTable
        rows={[
          { cls: 'rounded-tl-{s}', css: 'border-top-left-radius: {value}',     note: 'e.g. rounded-tl-lg → 8px' },
          { cls: 'rounded-tr-{s}', css: 'border-top-right-radius: {value}',    note: 'e.g. rounded-tr-xl → 12px' },
          { cls: 'rounded-bl-{s}', css: 'border-bottom-left-radius: {value}',  note: 'e.g. rounded-bl-md → 6px' },
          { cls: 'rounded-br-{s}', css: 'border-bottom-right-radius: {value}', note: 'e.g. rounded-br-sm → 2px' },
        ]}
      />

      <h2>Arbitrary values</h2>
      <ClassTable
        rows={[
          { cls: 'rounded-[6px]',       css: 'border-radius: 6px',                    note: 'arbitrary px' },
          { cls: 'rounded-[0.75rem]',    css: 'border-radius: 0.75rem',                note: 'arbitrary rem' },
          { cls: 'rounded-tl-[1rem]',   css: 'border-top-left-radius: 1rem',          note: 'corner + rem' },
          { cls: 'rounded-br-[12px]',   css: 'border-bottom-right-radius: 12px',      note: 'corner + px' },
          { cls: 'rounded-t-[0.5rem]',  css: 'border-top-left/right-radius: 0.5rem',  note: 'side + rem' },
        ]}
      />
    </div>
  )
}

// ─── Border Style & Color ─────────────────────────────────────────────────────

function BorderStyleDemo() {
  const styles: { cls: string; borderStyle?: string; isNone?: boolean; isHidden?: boolean }[] = [
    { cls: 'border-solid',  borderStyle: 'solid' },
    { cls: 'border-dashed', borderStyle: 'dashed' },
    { cls: 'border-dotted', borderStyle: 'dotted' },
    { cls: 'border-double', borderStyle: 'double' },
    { cls: 'border-hidden', isHidden: true },
    { cls: 'border-none',   isNone: true },
  ]

  const colorPreviews = [
    { color: '#3b82f6', cls: 'border-blue-500',   label: 'blue-500' },
    { color: '#f87171', cls: 'border-red-400',    label: 'red-400' },
    { color: '#22c55e', cls: 'border-green-500',  label: 'green-500' },
    { color: '#8b5cf6', cls: 'border-violet-500', label: 'violet-500' },
    { color: '#f59e0b', cls: 'border-amber-500',  label: 'amber-500' },
    { color: '#ec4899', cls: 'border-pink-500',   label: 'pink-500' },
  ]

  return (
    <>
      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Style variants</p>
      <div style={demoGrid}>
        {styles.map(({ cls, borderStyle, isNone, isHidden }) => (
          <div
            key={cls}
            style={{
              padding: '12px 10px',
              background: 'var(--bg-surface)',
              borderRadius: 8,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 72,
                height: 38,
                borderRadius: 4,
                border: isNone ? 'none' : isHidden ? '3px hidden ' + accentRgba(0.7) : `3px ${borderStyle} ` + accentRgba(0.75),
                background: 'var(--bg-elevated)',
                position: 'relative',
              }}
            >
              {(isNone || isHidden) && (
                <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                  {isHidden ? 'hidden' : 'none'}
                </span>
              )}
            </div>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-light)' }}>{cls}</code>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Color preview</p>
      <div style={demoGrid}>
        {colorPreviews.map(({ color, cls }) => (
          <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 76,
              height: 40,
              borderRadius: 6,
              border: `2.5px solid ${color}`,
              background: 'var(--bg-elevated)',
            }} />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-light)' }}>{cls}</code>
          </div>
        ))}
      </div>
    </>
  )
}

export function BorderStyle() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Borders</p>
      <h1>Border Style & Color</h1>
      <p>Control the style and color of borders. All 6 CSS border-style values are supported, plus the full 22-family color palette.</p>

      <CodeBlock
        code={`<!-- Width + style + color combo -->
<div class="border-2 border-solid border-gray-300 rounded-lg p-4">
  Card with border
</div>

<!-- Dashed separator -->
<hr class="border-dashed border-gray-200" />

<!-- Colored directional border -->
<div class="border-b-2 border-solid border-blue-500">
  Blue bottom border
</div>

<!-- Arbitrary color -->
<div class="border-2 border-solid border-[#7c6cf2]">
  Custom hex border
</div>

<!-- Double style -->
<div class="border-4 border-double border-violet-500">
  Double border
</div>`}
        lang="html"
      />

      <BorderStyleDemo />

      <h2>Style</h2>
      <ClassTable
        rows={[
          { cls: 'border-solid',  css: 'border-style: solid' },
          { cls: 'border-dashed', css: 'border-style: dashed' },
          { cls: 'border-dotted', css: 'border-style: dotted' },
          { cls: 'border-double', css: 'border-style: double' },
          { cls: 'border-hidden', css: 'border-style: hidden' },
          { cls: 'border-none',   css: 'border-style: none' },
        ]}
      />

      <h2>Color — all sides</h2>
      <ClassTable
        rows={[
          { cls: 'border-{color}-{shade}', css: 'border-color: {hex}', note: 'e.g. border-blue-500' },
          { cls: 'border-white',           css: 'border-color: #ffffff' },
          { cls: 'border-black',           css: 'border-color: #000000' },
          { cls: 'border-transparent',     css: 'border-color: transparent' },
          { cls: 'border-[#7c6cf2]',       css: 'border-color: #7c6cf2', note: 'arbitrary hex' },
          { cls: 'border-[rgb(0,0,0)]',    css: 'border-color: rgb(0,0,0)', note: 'arbitrary rgb' },
        ]}
      />

      <h2>Color — directional</h2>
      <ClassTable
        rows={[
          { cls: 'border-t-{color}-{shade}', css: 'border-top-color: {hex}',    note: 'e.g. border-t-blue-500' },
          { cls: 'border-b-{color}-{shade}', css: 'border-bottom-color: {hex}', note: 'e.g. border-b-red-400' },
          { cls: 'border-l-{color}-{shade}', css: 'border-left-color: {hex}',   note: 'e.g. border-l-green-500' },
          { cls: 'border-r-{color}-{shade}', css: 'border-right-color: {hex}',  note: 'e.g. border-r-violet-600' },
          { cls: 'border-t-[#ddd]',          css: 'border-top-color: #ddd',     note: 'arbitrary' },
        ]}
      />
    </div>
  )
}

// ─── Outline ──────────────────────────────────────────────────────────────────

function OutlineDemo() {
  const widths = [
    { cls: 'outline-0', w: 0,  sub: '0px' },
    { cls: 'outline-1', w: 1,  sub: '1px' },
    { cls: 'outline-2', w: 2,  sub: '2px' },
    { cls: 'outline-4', w: 4,  sub: '4px' },
    { cls: 'outline-8', w: 8,  sub: '8px' },
  ]

  const offsets = [
    { cls: 'outline-offset-0', off: 0,  sub: '0px' },
    { cls: 'outline-offset-1', off: 1,  sub: '1px' },
    { cls: 'outline-offset-2', off: 2,  sub: '2px' },
    { cls: 'outline-offset-4', off: 4,  sub: '4px' },
    { cls: 'outline-offset-8', off: 8,  sub: '8px' },
  ]

  const outlineStyles = [
    { cls: 'outline',        style: 'solid',  sub: 'solid' },
    { cls: 'outline-dashed', style: 'dashed', sub: 'dashed' },
    { cls: 'outline-dotted', style: 'dotted', sub: 'dotted' },
  ]

  return (
    <>
      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Width</p>
      <div style={{ ...demoGrid, overflow: 'visible' }}>
        {widths.map(({ cls, w, sub }) => (
          <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 56,
              height: 40,
              background: 'var(--bg-elevated)',
              margin: '10px',
              outline: w === 0 ? 'none' : `${w}px solid ` + accentRgba(0.85),
              outlineOffset: 0,
              borderRadius: 4,
            }} />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-light)' }}>{cls}</code>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sub}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Offset</p>
      <div style={{ ...demoGrid, overflow: 'visible' }}>
        {offsets.map(({ cls, off, sub }) => (
          <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 56,
              height: 40,
              background: 'var(--bg-elevated)',
              margin: '12px',
              outline: `2px solid ` + accentRgba(0.85),
              outlineOffset: off,
              borderRadius: 4,
            }} />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-light)' }}>{cls}</code>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sub}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 0.6rem' }}>Style</p>
      <div style={{ ...demoGrid, overflow: 'visible' }}>
        {outlineStyles.map(({ cls, style, sub }) => (
          <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 72,
              height: 44,
              background: 'var(--bg-elevated)',
              margin: '10px',
              outline: `2px ${style} ` + accentRgba(0.85),
              outlineOffset: 2,
              borderRadius: 4,
            }} />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-light)' }}>{cls}</code>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sub}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export function Outline() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Borders</p>
      <h1>Outline</h1>
      <p>
        Outline renders outside the border box and does not affect layout — ideal for
        accessible focus rings. Supports width (0–8px), offset (0–8px), style, and color.
      </p>

      <CodeBlock
        code={`<!-- Accessible focus ring (keyboard only) -->
<button class="outline-none
               focus-visible:outline-2
               focus-visible:outline-blue-500
               focus-visible:outline-offset-2">
  Accessible button
</button>

<!-- Custom visible outline -->
<div class="outline-2 outline-violet-500 outline-offset-4">
  2px violet outline, 4px offset
</div>

<!-- Dashed outline with arbitrary width -->
<div class="outline-dashed outline-[3px] outline-emerald-400 outline-offset-2">
  3px dashed
</div>`}
        lang="html"
      />

      <OutlineDemo />

      <h2>Width</h2>
      <ClassTable
        rows={[
          { cls: 'outline-0', css: 'outline-width: 0px' },
          { cls: 'outline-1', css: 'outline-width: 1px' },
          { cls: 'outline-2', css: 'outline-width: 2px' },
          { cls: 'outline-4', css: 'outline-width: 4px' },
          { cls: 'outline-8', css: 'outline-width: 8px' },
          { cls: 'outline-[3px]',     css: 'outline-width: 3px',     note: 'arbitrary px' },
          { cls: 'outline-[0.25rem]', css: 'outline-width: 0.25rem', note: 'arbitrary rem' },
        ]}
      />

      <h2>Offset</h2>
      <ClassTable
        rows={[
          { cls: 'outline-offset-0', css: 'outline-offset: 0px' },
          { cls: 'outline-offset-1', css: 'outline-offset: 1px' },
          { cls: 'outline-offset-2', css: 'outline-offset: 2px' },
          { cls: 'outline-offset-4', css: 'outline-offset: 4px' },
          { cls: 'outline-offset-8', css: 'outline-offset: 8px' },
        ]}
      />

      <h2>Style</h2>
      <ClassTable
        rows={[
          { cls: 'outline',        css: 'outline-style: solid' },
          { cls: 'outline-dashed', css: 'outline-style: dashed' },
          { cls: 'outline-dotted', css: 'outline-style: dotted' },
          { cls: 'outline-none',   css: 'outline: 2px solid transparent; outline-offset: 2px', note: 'hides outline' },
        ]}
      />

      <h2>Color</h2>
      <ClassTable
        rows={[
          { cls: 'outline-{color}-{shade}', css: 'outline-color: {hex}',    note: 'e.g. outline-blue-500' },
          { cls: 'outline-white',           css: 'outline-color: #ffffff' },
          { cls: 'outline-black',           css: 'outline-color: #000000' },
          { cls: 'outline-[#7c6cf2]',       css: 'outline-color: #7c6cf2',  note: 'arbitrary' },
        ]}
      />
    </div>
  )
}
