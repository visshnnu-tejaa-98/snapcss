import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.5rem 0.875rem',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
}

// ─── Font Size ───────────────────────────────────────────────────────────────

const fontSizes: { cls: string; px: number; size: number }[] = [
  { cls: 'text-xs',   px: 12, size: 12 },
  { cls: 'text-sm',   px: 14, size: 14 },
  { cls: 'text-base', px: 16, size: 16 },
  { cls: 'text-lg',   px: 18, size: 18 },
  { cls: 'text-xl',   px: 20, size: 20 },
  { cls: 'text-2xl',  px: 24, size: 24 },
  { cls: 'text-3xl',  px: 30, size: 30 },
  { cls: 'text-4xl',  px: 36, size: 36 },
]

function FontSizeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: '1.25rem 0' }}>
      {fontSizes.map(({ cls, px, size }) => (
        <div key={cls} style={row}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', width: '9rem', flexShrink: 0, fontSize: '0.78rem' }}>{cls}</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', width: '3rem', flexShrink: 0, fontSize: '0.75rem' }}>{px}px</span>
          <span style={{ fontSize: size, color: 'var(--text)', lineHeight: 1.2 }}>The quick brown fox</span>
        </div>
      ))}
    </div>
  )
}

// ─── Font Weight ─────────────────────────────────────────────────────────────

const fontWeights: { cls: string; weight: number }[] = [
  { cls: 'font-thin',       weight: 100 },
  { cls: 'font-extralight', weight: 200 },
  { cls: 'font-light',      weight: 300 },
  { cls: 'font-normal',     weight: 400 },
  { cls: 'font-medium',     weight: 500 },
  { cls: 'font-semibold',   weight: 600 },
  { cls: 'font-bold',       weight: 700 },
  { cls: 'font-extrabold',  weight: 800 },
  { cls: 'font-black',      weight: 900 },
]

function FontWeightDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: '1.25rem 0' }}>
      {fontWeights.map(({ cls, weight }) => (
        <div key={cls} style={row}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', width: '11rem', flexShrink: 0, fontSize: '0.78rem' }}>{cls}</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', width: '2.5rem', flexShrink: 0, fontSize: '0.75rem' }}>{weight}</span>
          <span style={{ fontWeight: weight, fontSize: '0.95rem', color: 'var(--text)' }}>The quick brown fox jumps over the lazy dog</span>
        </div>
      ))}
    </div>
  )
}

// ─── Font Family ─────────────────────────────────────────────────────────────

const fontFamilies: { cls: string; family: string; label: string }[] = [
  { cls: 'font-sans',  family: 'ui-sans-serif,system-ui,sans-serif',  label: 'Sans-serif' },
  { cls: 'font-serif', family: 'ui-serif,Georgia,serif',              label: 'Serif' },
  { cls: 'font-mono',  family: 'ui-monospace,Menlo,monospace',        label: 'Monospace' },
]

function FontFamilyDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '1.25rem 0' }}>
      {fontFamilies.map(({ cls, family, label }) => (
        <div key={cls} style={{ ...row, flexDirection: 'column', alignItems: 'flex-start', padding: '0.75rem 1rem', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.78rem' }}>{cls}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', fontSize: '0.72rem' }}>{label}</span>
          </div>
          <span style={{ fontFamily: family, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.5 }}>
            The quick brown fox jumps over the lazy dog — 0123456789
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Line Height ──────────────────────────────────────────────────────────────

const lineHeights: { cls: string; value: number }[] = [
  { cls: 'leading-none',    value: 1 },
  { cls: 'leading-tight',   value: 1.25 },
  { cls: 'leading-snug',    value: 1.375 },
  { cls: 'leading-normal',  value: 1.5 },
  { cls: 'leading-relaxed', value: 1.625 },
  { cls: 'leading-loose',   value: 2 },
]

const numericLineHeights: { cls: string; px: number }[] = [
  { cls: 'leading-3',  px: 12 },
  { cls: 'leading-4',  px: 16 },
  { cls: 'leading-5',  px: 20 },
  { cls: 'leading-6',  px: 24 },
  { cls: 'leading-7',  px: 28 },
  { cls: 'leading-8',  px: 32 },
  { cls: 'leading-9',  px: 36 },
  { cls: 'leading-10', px: 40 },
]

function LineHeightDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '1.25rem 0' }}>
      {lineHeights.map(({ cls, value }) => (
        <div
          key={cls}
          style={{
            flex: '1 1 160px',
            minWidth: 150,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '0.75rem',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.72rem', marginBottom: '0.5rem' }}>{cls}</div>
          <p style={{ lineHeight: value, fontSize: '0.83rem', color: 'var(--text)', margin: 0 }}>
            Pack my box with five<br />
            dozen liquor jugs for<br />
            the party tonight.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', fontSize: '0.68rem', marginTop: '0.4rem' }}>lh: {value}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Letter Spacing ───────────────────────────────────────────────────────────

const trackings: { cls: string; value: string }[] = [
  { cls: 'tracking-tighter', value: '-0.05em' },
  { cls: 'tracking-tight',   value: '-0.025em' },
  { cls: 'tracking-normal',  value: '0' },
  { cls: 'tracking-wide',    value: '0.025em' },
  { cls: 'tracking-wider',   value: '0.05em' },
  { cls: 'tracking-widest',  value: '0.1em' },
]

function LetterSpacingDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: '1.25rem 0' }}>
      {trackings.map(({ cls, value }) => (
        <div key={cls} style={row}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', width: '13rem', flexShrink: 0, fontSize: '0.78rem' }}>{cls}</span>
          <span
            style={{
              letterSpacing: value,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          >
            SNAPCSS FRAMEWORK
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Text Decoration ─────────────────────────────────────────────────────────

type DecorationItem = { cls: string; style: React.CSSProperties }

const decorations: DecorationItem[] = [
  { cls: 'underline',    style: { textDecorationLine: 'underline' } },
  { cls: 'overline',     style: { textDecorationLine: 'overline' } },
  { cls: 'line-through', style: { textDecorationLine: 'line-through' } },
  { cls: 'italic',       style: { fontStyle: 'italic' } },
  { cls: 'uppercase',    style: { textTransform: 'uppercase' } },
  { cls: 'lowercase',    style: { textTransform: 'lowercase' } },
  { cls: 'capitalize',   style: { textTransform: 'capitalize' } },
  {
    cls: 'truncate',
    style: {
      maxWidth: 100,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
]

function TextDecorationDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '1.25rem 0' }}>
      {decorations.map(({ cls, style }) => (
        <div
          key={cls}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '0.5rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            minWidth: 90,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.68rem' }}>{cls}</span>
          <span style={{ fontSize: '0.88rem', color: 'var(--text)', ...style }}>
            {cls === 'truncate' ? 'This is a very long text for truncation' : 'Sample Text'}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function Typography() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Typography</p>
      <h1>Font & Text</h1>
      <p>Comprehensive utilities for typography — font size, weight, family, line height, letter spacing, and text manipulation.</p>

      <CodeBlock
        code={`<h1 class="text-4xl font-bold tracking-tight text-gray-900">
  Big Heading
</h1>

<p class="text-base leading-relaxed text-gray-600">
  Body text with relaxed line height and gray color.
</p>

<span class="text-sm font-medium uppercase tracking-widest text-violet-500">
  Label
</span>

<!-- Truncate long text -->
<p class="truncate w-64">This text will be truncated with ellipsis if too long</p>

<!-- Clamp to 2 lines -->
<p class="line-clamp-2 w-64">
  This text will be clamped after exactly two lines regardless of its length.
</p>`}
        lang="html"
      />

      <h2>Font Size</h2>
      <FontSizeDemo />
      <ClassTable
        rows={[
          { cls: 'text-xs',   css: 'font-size: 12px' },
          { cls: 'text-sm',   css: 'font-size: 14px' },
          { cls: 'text-base', css: 'font-size: 16px' },
          { cls: 'text-lg',   css: 'font-size: 18px' },
          { cls: 'text-xl',   css: 'font-size: 20px' },
          { cls: 'text-2xl',  css: 'font-size: 24px' },
          { cls: 'text-3xl',  css: 'font-size: 30px' },
          { cls: 'text-4xl',  css: 'font-size: 36px' },
          { cls: 'text-[20px]', css: 'font-size: 20px', note: 'arbitrary' },
        ]}
      />

      <h2>Font Weight</h2>
      <FontWeightDemo />
      <ClassTable
        rows={[
          { cls: 'font-thin',       css: 'font-weight: 100' },
          { cls: 'font-extralight', css: 'font-weight: 200' },
          { cls: 'font-light',      css: 'font-weight: 300' },
          { cls: 'font-normal',     css: 'font-weight: 400' },
          { cls: 'font-medium',     css: 'font-weight: 500' },
          { cls: 'font-semibold',   css: 'font-weight: 600' },
          { cls: 'font-bold',       css: 'font-weight: 700' },
          { cls: 'font-extrabold',  css: 'font-weight: 800' },
          { cls: 'font-black',      css: 'font-weight: 900' },
          { cls: 'font-[600]',      css: 'font-weight: 600', note: 'arbitrary' },
        ]}
      />

      <h2>Font Family</h2>
      <FontFamilyDemo />
      <ClassTable
        rows={[
          { cls: 'font-sans',  css: 'font-family: ui-sans-serif, system-ui, sans-serif' },
          { cls: 'font-serif', css: 'font-family: ui-serif, Georgia, serif' },
          { cls: 'font-mono',  css: 'font-family: ui-monospace, Menlo, monospace' },
        ]}
      />

      <h2>Line Height</h2>
      <LineHeightDemo />
      <ClassTable
        rows={[
          { cls: 'leading-none',     css: 'line-height: 1' },
          { cls: 'leading-tight',    css: 'line-height: 1.25' },
          { cls: 'leading-snug',     css: 'line-height: 1.375' },
          { cls: 'leading-normal',   css: 'line-height: 1.5' },
          { cls: 'leading-relaxed',  css: 'line-height: 1.625' },
          { cls: 'leading-loose',    css: 'line-height: 2' },
          { cls: 'leading-[1.8]',    css: 'line-height: 1.8', note: 'arbitrary' },
        ]}
      />

      <h2>Numeric line heights</h2>
      <p>Fixed pixel-based line heights for precise control over vertical rhythm.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, margin: '1.25rem 0' }}>
        {numericLineHeights.map(({ cls, px }) => (
          <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0.875rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', width: '9rem', flexShrink: 0, fontSize: '0.78rem' }}>{cls}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', width: '3rem', flexShrink: 0, fontSize: '0.75rem' }}>{px}px</span>
            <span style={{ lineHeight: `${px}px`, fontSize: '0.85rem', color: 'var(--text)' }}>
              Pack my box with five<br />dozen liquor jugs.
            </span>
          </div>
        ))}
      </div>
      <ClassTable
        rows={[
          { cls: 'leading-3',  css: 'line-height: 12px' },
          { cls: 'leading-4',  css: 'line-height: 16px' },
          { cls: 'leading-5',  css: 'line-height: 20px' },
          { cls: 'leading-6',  css: 'line-height: 24px' },
          { cls: 'leading-7',  css: 'line-height: 28px' },
          { cls: 'leading-8',  css: 'line-height: 32px' },
          { cls: 'leading-9',  css: 'line-height: 36px' },
          { cls: 'leading-10', css: 'line-height: 40px' },
        ]}
      />

      <h2>Letter Spacing</h2>
      <LetterSpacingDemo />
      <ClassTable
        rows={[
          { cls: 'tracking-tighter', css: 'letter-spacing: -0.05em' },
          { cls: 'tracking-tight',   css: 'letter-spacing: -0.025em' },
          { cls: 'tracking-normal',  css: 'letter-spacing: 0' },
          { cls: 'tracking-wide',    css: 'letter-spacing: 0.025em' },
          { cls: 'tracking-wider',   css: 'letter-spacing: 0.05em' },
          { cls: 'tracking-widest',  css: 'letter-spacing: 0.1em' },
        ]}
      />

      <h2>Text Alignment & Decoration</h2>
      <TextDecorationDemo />
      <ClassTable
        rows={[
          { cls: 'text-left',       css: 'text-align: left' },
          { cls: 'text-center',     css: 'text-align: center' },
          { cls: 'text-right',      css: 'text-align: right' },
          { cls: 'text-justify',    css: 'text-align: justify' },
          { cls: 'italic',          css: 'font-style: italic' },
          { cls: 'not-italic',      css: 'font-style: normal' },
          { cls: 'uppercase',       css: 'text-transform: uppercase' },
          { cls: 'lowercase',       css: 'text-transform: lowercase' },
          { cls: 'capitalize',      css: 'text-transform: capitalize' },
          { cls: 'normal-case',     css: 'text-transform: none' },
          { cls: 'underline',       css: 'text-decoration-line: underline' },
          { cls: 'overline',        css: 'text-decoration-line: overline' },
          { cls: 'line-through',    css: 'text-decoration-line: line-through' },
          { cls: 'no-underline',    css: 'text-decoration-line: none' },
          { cls: 'truncate',        css: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap' },
          { cls: 'text-ellipsis',   css: 'text-overflow: ellipsis' },
          { cls: 'whitespace-nowrap',css: 'white-space: nowrap' },
          { cls: 'whitespace-pre',  css: 'white-space: pre' },
          { cls: 'break-words',     css: 'overflow-wrap: break-word' },
          { cls: 'break-all',       css: 'word-break: break-all' },
          { cls: 'line-clamp-1',    css: '-webkit-line-clamp: 1; display: -webkit-box; …' },
          { cls: 'line-clamp-2',    css: '-webkit-line-clamp: 2; …' },
          { cls: 'line-clamp-3',    css: '-webkit-line-clamp: 3; …' },
          { cls: 'line-clamp-none', css: 'unsets line-clamp' },
        ]}
      />
    </div>
  )
}
