import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

/* ── Shared helpers ──────────────────────────────────────────────────────── */

const track: React.CSSProperties = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: 8,
  width: '100%',
  boxSizing: 'border-box',
}

function Item({ label, h, accent }: { label?: string; h?: number; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? 'var(--demo-accent-dim)' : 'var(--bg-elevated)',
      border: `1px solid ${accent ? 'var(--demo-accent-mid)' : 'var(--border-bright)'}`,
      borderRadius: 5,
      padding: '4px 10px',
      fontSize: '0.72rem',
      fontFamily: 'var(--font-mono)',
      color: accent ? 'var(--accent-light)' : 'var(--text-muted)',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: h,
      boxSizing: 'border-box',
    }}>
      {label ?? 'item'}
    </div>
  )
}

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: '0.7rem',
      fontFamily: 'var(--font-mono)',
      color: 'var(--accent-light)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      width: '14rem',
    }}>
      {children}
    </span>
  )
}

function GridItem({ label, span, rowSpan, accent }: {
  label: string; span?: number; rowSpan?: number; accent?: boolean
}) {
  return (
    <div style={{
      gridColumn: span ? `span ${span}` : undefined,
      gridRow: rowSpan ? `span ${rowSpan}` : undefined,
      background: accent ? 'var(--demo-accent-dim)' : 'var(--bg-elevated)',
      border: `1px solid ${accent ? 'var(--demo-accent-mid)' : 'var(--border-bright)'}`,
      borderRadius: 5,
      padding: '6px 10px',
      fontSize: '0.72rem',
      fontFamily: 'var(--font-mono)',
      color: accent ? 'var(--accent-light)' : 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 32,
    }}>
      {label}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLEX BASICS
═══════════════════════════════════════════════════════════════════════════ */

export function FlexBasics() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Flexbox</p>
      <h1>Flex Basics</h1>
      <p>Core flexbox utilities for direction, alignment, justification, and wrapping.</p>
      <CodeBlock
        code={`<div class="flex items-center justify-between gap-4">
  <span>Left</span><span>Center</span><span>Right</span>
</div>

<div class="flex flex-col gap-3">
  <div>Item 1</div><div>Item 2</div>
</div>`}
        lang="html"
      />

      {/* Direction */}
      <h2>Direction</h2>
      <div className="fg-demo-grid">
        {[
          { cls: 'flex-row',         dir: 'row' as const },
          { cls: 'flex-row-reverse', dir: 'row-reverse' as const },
          { cls: 'flex-col',         dir: 'column' as const },
          { cls: 'flex-col-reverse', dir: 'column-reverse' as const },
        ].map(({ cls, dir }) => (
          <div key={cls} className="fg-demo-cell">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', flexDirection: dir, gap: 5, minHeight: 60 }}>
              {['1','2','3'].map(n => <Item key={n} label={n} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Justify Content */}
      <h2>Justify Content</h2>
      <div className="fg-demo-rows">
        {[
          { cls: 'justify-start',   jc: 'flex-start' },
          { cls: 'justify-end',     jc: 'flex-end' },
          { cls: 'justify-center',  jc: 'center' },
          { cls: 'justify-between', jc: 'space-between' },
          { cls: 'justify-around',  jc: 'space-around' },
          { cls: 'justify-evenly',  jc: 'space-evenly' },
          { cls: 'justify-stretch', jc: 'stretch' },
          { cls: 'justify-normal',  jc: 'normal' },
        ].map(({ cls, jc }) => (
          <div key={cls} className="fg-demo-row-item">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', justifyContent: jc, gap: 4 }}>
              {['A','B','C'].map(n => <Item key={n} label={n} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Align Items */}
      <h2>Align Items</h2>
      <div className="fg-demo-rows">
        {[
          { cls: 'items-start',    ai: 'flex-start', heights: [32, 24, 40] as (number|undefined)[] },
          { cls: 'items-end',      ai: 'flex-end',   heights: [32, 24, 40] as (number|undefined)[] },
          { cls: 'items-center',   ai: 'center',     heights: [32, 24, 40] as (number|undefined)[] },
          { cls: 'items-stretch',  ai: 'stretch',    heights: [undefined, undefined, undefined] as (number|undefined)[] },
          { cls: 'items-baseline', ai: 'baseline',   heights: [36, 24, 44] as (number|undefined)[] },
        ].map(({ cls, ai, heights }) => (
          <div key={cls} className="fg-demo-row-item">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', alignItems: ai, gap: 4, height: 64 }}>
              {(['A','B','C'] as const).map((n, i) => <Item key={n} label={n} h={heights[i]} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Wrap */}
      <h2>Wrap</h2>
      <div className="fg-demo-rows">
        {[
          { cls: 'flex-wrap',         wrap: 'wrap' as const },
          { cls: 'flex-nowrap',        wrap: 'nowrap' as const },
          { cls: 'flex-wrap-reverse',  wrap: 'wrap-reverse' as const },
        ].map(({ cls, wrap }) => (
          <div key={cls} className="fg-demo-row-item">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', flexWrap: wrap, gap: 4, overflow: 'hidden', maxWidth: 220 }}>
              {['one','two','three','four','five'].map(n => <Item key={n} label={n} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Gap */}
      <h2>Gap</h2>
      <div className="fg-demo-rows">
        {([2, 4, 8, 16] as const).map(px => (
          <div key={px} className="fg-demo-row-item">
            <DemoLabel>gap-{px === 2 ? 1 : px === 4 ? 2 : px === 8 ? 3 : 4}</DemoLabel>
            <div style={{ ...track, display: 'flex', gap: px }}>
              {['A','B','C','D'].map(n => <Item key={n} label={n} />)}
            </div>
          </div>
        ))}
      </div>

      <h2>Reference</h2>
      <ClassTable rows={[
        { cls: 'flex-row',          css: 'flex-direction: row' },
        { cls: 'flex-row-reverse',  css: 'flex-direction: row-reverse' },
        { cls: 'flex-col',          css: 'flex-direction: column' },
        { cls: 'flex-col-reverse',  css: 'flex-direction: column-reverse' },
        { cls: 'flex-wrap',         css: 'flex-wrap: wrap' },
        { cls: 'flex-nowrap',       css: 'flex-wrap: nowrap' },
        { cls: 'flex-wrap-reverse', css: 'flex-wrap: wrap-reverse' },
        { cls: 'justify-start',     css: 'justify-content: flex-start' },
        { cls: 'justify-end',       css: 'justify-content: flex-end' },
        { cls: 'justify-center',    css: 'justify-content: center' },
        { cls: 'justify-between',   css: 'justify-content: space-between' },
        { cls: 'justify-around',    css: 'justify-content: space-around' },
        { cls: 'justify-evenly',    css: 'justify-content: space-evenly' },
        { cls: 'justify-stretch',   css: 'justify-content: stretch' },
        { cls: 'justify-normal',    css: 'justify-content: normal' },
        { cls: 'items-start',       css: 'align-items: flex-start' },
        { cls: 'items-end',         css: 'align-items: flex-end' },
        { cls: 'items-center',      css: 'align-items: center' },
        { cls: 'items-stretch',     css: 'align-items: stretch' },
        { cls: 'items-baseline',    css: 'align-items: baseline' },
        { cls: 'gap-{n}',           css: 'gap: {value}' },
        { cls: 'gap-x-{n}',         css: 'column-gap: {value}' },
        { cls: 'gap-y-{n}',         css: 'row-gap: {value}' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLEX EXTRAS
═══════════════════════════════════════════════════════════════════════════ */

export function FlexExtras() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Flexbox</p>
      <h1>Flex Extras</h1>
      <p>Fine-grained control over individual flex items: grow, shrink, basis, self-alignment, order, and content alignment.</p>
      <CodeBlock
        code={`<div class="flex gap-4">
  <div class="flex-1">Grows to fill space</div>
  <div class="shrink-0 w-24">Fixed, won't shrink</div>
  <div class="self-end">Aligned to bottom</div>
</div>`}
        lang="html"
      />

      {/* Grow / Shrink */}
      <h2>Grow & Shrink</h2>
      <div className="fg-demo-rows">
        <div className="fg-demo-row-item">
          <DemoLabel>grow</DemoLabel>
          <div style={{ ...track, display: 'flex', gap: 4 }}>
            <Item label="fixed" />
            <div style={{ flex: 1, background: 'var(--demo-accent-dim)', border: '1px solid var(--demo-accent-mid)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
              grow →
            </div>
            <Item label="fixed" />
          </div>
        </div>
        <div className="fg-demo-row-item">
          <DemoLabel>grow-0</DemoLabel>
          <div style={{ ...track, display: 'flex', gap: 4 }}>
            <Item label="A" />
            <div style={{ flexGrow: 0, background: 'var(--demo-accent-dim)', border: '1px solid var(--demo-accent-mid)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
              grow-0
            </div>
            <Item label="B" />
          </div>
        </div>
        <div className="fg-demo-row-item">
          <DemoLabel>shrink-0</DemoLabel>
          <div style={{ ...track, display: 'flex', gap: 4, overflow: 'hidden' }}>
            <div style={{ flex: 1, background: 'var(--bg-elevated)', border: '1px solid var(--border-bright)', borderRadius: 5, padding: '4px 8px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
              this item shrinks
            </div>
            <div style={{ flexShrink: 0, background: 'var(--demo-accent-dim)', border: '1px solid var(--demo-accent-mid)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', whiteSpace: 'nowrap' }}>
              shrink-0
            </div>
          </div>
        </div>
      </div>

      {/* Flex shorthand */}
      <h2>Flex shorthand</h2>
      <div className="fg-demo-rows">
        {[
          { cls: 'flex-1',       flex: '1 1 0%',   label: 'flex-1'       },
          { cls: 'flex-auto',    flex: '1 1 auto',  label: 'flex-auto'   },
          { cls: 'flex-initial', flex: '0 1 auto',  label: 'flex-initial' },
          { cls: 'flex-none',    flex: 'none',      label: 'flex-none'   },
        ].map(({ cls, flex, label }) => (
          <div key={cls} className="fg-demo-row-item">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', gap: 4 }}>
              <div style={{ flex, background: 'var(--demo-accent-dim)', border: '1px solid var(--demo-accent-mid)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', textAlign: 'center', boxSizing: 'border-box' }}>
                {label}
              </div>
              <Item label="B" />
              <Item label="C" />
            </div>
          </div>
        ))}
      </div>

      {/* Flex Basis */}
      <h2>Flex Basis</h2>
      <div className="fg-demo-rows">
        {[
          { cls: 'basis-0',   basis: '0px',    label: '0px'  },
          { cls: 'basis-1/2', basis: '50%',    label: '50%'  },
          { cls: 'basis-1/3', basis: '33.33%', label: '33%'  },
          { cls: 'basis-1/4', basis: '25%',    label: '25%'  },
          { cls: 'basis-3/4', basis: '75%',    label: '75%'  },
          { cls: 'basis-auto', basis: 'auto',  label: 'auto' },
          { cls: 'basis-full', basis: '100%',  label: '100%' },
        ].map(({ cls, basis, label }) => (
          <div key={cls} className="fg-demo-row-item">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', gap: 4 }}>
              <div style={{ flexBasis: basis, flexShrink: 0, background: 'var(--demo-accent-dim)', border: '1px solid var(--demo-accent-mid)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
                {label}
              </div>
              <Item label="rest" />
            </div>
          </div>
        ))}
      </div>

      {/* Align Self */}
      <h2>Align Self</h2>
      <div className="fg-demo-rows">
        {[
          { cls: 'self-auto',     as: 'auto' },
          { cls: 'self-start',    as: 'flex-start' },
          { cls: 'self-center',   as: 'center' },
          { cls: 'self-end',      as: 'flex-end' },
          { cls: 'self-stretch',  as: 'stretch' },
          { cls: 'self-baseline', as: 'baseline' },
        ].map(({ cls, as: alignSelf }) => (
          <div key={cls} className="fg-demo-row-item">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', alignItems: 'stretch', gap: 4, height: 64 }}>
              <Item label="A" />
              <div style={{ alignSelf, background: 'var(--demo-accent-dim)', border: '1px solid var(--demo-accent-mid)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
                B ←
              </div>
              <Item label="C" />
            </div>
          </div>
        ))}
      </div>

      {/* Align Content */}
      <h2>Align Content</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '-0.25rem 0 0.75rem' }}>
        Controls spacing between lines when items wrap. Requires <code>flex-wrap</code> and a fixed height.
      </p>
      <div className="fg-demo-rows">
        {[
          { cls: 'content-start',   ac: 'flex-start' },
          { cls: 'content-end',     ac: 'flex-end' },
          { cls: 'content-center',  ac: 'center' },
          { cls: 'content-between', ac: 'space-between' },
          { cls: 'content-around',  ac: 'space-around' },
          { cls: 'content-evenly',  ac: 'space-evenly' },
          { cls: 'content-stretch', ac: 'stretch' },
          { cls: 'content-normal',  ac: 'normal' },
        ].map(({ cls, ac }) => (
          <div key={cls} className="fg-demo-row-item">
            <DemoLabel>{cls}</DemoLabel>
            <div style={{ ...track, display: 'flex', flexWrap: 'wrap', alignContent: ac, gap: 4, height: 80, maxWidth: 220 }}>
              {['1','2','3','4','5','6'].map(n => <Item key={n} label={n} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Order */}
      <h2>Order</h2>
      <div className="fg-demo-rows">
        <div className="fg-demo-row-item">
          <DemoLabel>order-first / last</DemoLabel>
          <div style={{ ...track, display: 'flex', gap: 4 }}>
            <div style={{ order: 9999, background: 'var(--bg-elevated)', border: '1px solid var(--border-bright)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
              A <span style={{ fontSize: '0.6rem', marginLeft: 4, color: 'var(--text-subtle)' }}>last</span>
            </div>
            <div style={{ order: -9999, background: 'var(--demo-accent-dim)', border: '1px solid var(--demo-accent-mid)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center' }}>
              B <span style={{ fontSize: '0.6rem', marginLeft: 4 }}>first</span>
            </div>
            <Item label="C" />
          </div>
        </div>
        <div className="fg-demo-row-item">
          <DemoLabel>order-none (0)</DemoLabel>
          <div style={{ ...track, display: 'flex', gap: 4 }}>
            {['A','B','C'].map(n => <Item key={n} label={`${n} (order:0)`} />)}
          </div>
        </div>
      </div>
      <div className="callout callout-info" style={{ marginTop: '0.5rem' }}>
        <span className="callout-icon">ℹ️</span>
        <span>HTML order: A · B · C — Visual order: B · C · A because B has <code>order: -9999</code> (first) and A has <code>order: 9999</code> (last).</span>
      </div>

      <h2>Reference</h2>
      <ClassTable rows={[
        { cls: 'flex-1',          css: 'flex: 1 1 0%' },
        { cls: 'flex-auto',       css: 'flex: 1 1 auto' },
        { cls: 'flex-initial',    css: 'flex: 0 1 auto' },
        { cls: 'flex-none',       css: 'flex: none' },
        { cls: 'grow',            css: 'flex-grow: 1' },
        { cls: 'grow-0',          css: 'flex-grow: 0' },
        { cls: 'shrink',          css: 'flex-shrink: 1' },
        { cls: 'shrink-0',        css: 'flex-shrink: 0' },
        { cls: 'basis-0',         css: 'flex-basis: 0px' },
        { cls: 'basis-auto',      css: 'flex-basis: auto' },
        { cls: 'basis-full',      css: 'flex-basis: 100%' },
        { cls: 'basis-1/2',       css: 'flex-basis: 50%' },
        { cls: 'basis-1/3',       css: 'flex-basis: 33.333%' },
        { cls: 'basis-2/3',       css: 'flex-basis: 66.667%' },
        { cls: 'basis-1/4',       css: 'flex-basis: 25%' },
        { cls: 'basis-3/4',       css: 'flex-basis: 75%' },
        { cls: 'basis-1/5',       css: 'flex-basis: 20%' },
        { cls: 'basis-2/5',       css: 'flex-basis: 40%' },
        { cls: 'basis-3/5',       css: 'flex-basis: 60%' },
        { cls: 'basis-4/5',       css: 'flex-basis: 80%' },
        { cls: 'order-first',     css: 'order: -9999' },
        { cls: 'order-last',      css: 'order: 9999' },
        { cls: 'order-none',      css: 'order: 0' },
        { cls: 'order-{n}',       css: 'order: {n}',            note: '1–12' },
        { cls: 'self-auto',       css: 'align-self: auto' },
        { cls: 'self-start',      css: 'align-self: flex-start' },
        { cls: 'self-end',        css: 'align-self: flex-end' },
        { cls: 'self-center',     css: 'align-self: center' },
        { cls: 'self-stretch',    css: 'align-self: stretch' },
        { cls: 'self-baseline',   css: 'align-self: baseline' },
        { cls: 'content-start',   css: 'align-content: flex-start' },
        { cls: 'content-end',     css: 'align-content: flex-end' },
        { cls: 'content-center',  css: 'align-content: center' },
        { cls: 'content-between', css: 'align-content: space-between' },
        { cls: 'content-around',  css: 'align-content: space-around' },
        { cls: 'content-evenly',  css: 'align-content: space-evenly' },
        { cls: 'content-stretch', css: 'align-content: stretch' },
        { cls: 'content-normal',  css: 'align-content: normal' },
      ]} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GRID
═══════════════════════════════════════════════════════════════════════════ */

export function Grid() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Grid</p>
      <h1>Grid Layout</h1>
      <p>Comprehensive CSS Grid utilities — columns, rows, spanning, placement, auto flow, and alignment shortcuts.</p>
      <CodeBlock
        code={`<!-- 3-column equal grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div><div>2</div><div>3</div>
</div>

<!-- 2-row grid with auto flow column -->
<div class="grid grid-cols-3 grid-rows-2 flow-col gap-3">
  <div class="col-span-2">Wide</div>
  <div class="row-span-2">Tall</div>
  <div>1</div><div>2</div>
</div>

<!-- Explicit placement -->
<div class="grid grid-cols-4 gap-2">
  <div class="col-start-2 col-end-4">Cols 2→4</div>
</div>`}
        lang="html"
      />

      {/* Column presets */}
      <h2>Column presets</h2>
      <div className="fg-demo-rows">
        {[1, 2, 3, 4, 6, 12].map(cols => (
          <div key={cols} className="fg-demo-row-item">
            <DemoLabel>grid-cols-{cols}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4 }}>
              {Array.from({ length: Math.min(cols, 6) }).map((_, i) => (
                <GridItem key={i} label={String(i + 1)} accent={i % 2 === 0} />
              ))}
            </div>
          </div>
        ))}
        <div className="fg-demo-row-item">
          <DemoLabel>grid-cols-none</DemoLabel>
          <div style={{ ...track, display: 'grid', gridTemplateColumns: 'none', gap: 4 }}>
            {['A','B','C'].map(n => <GridItem key={n} label={n} />)}
          </div>
        </div>
      </div>

      {/* Row presets */}
      <h2>Row presets</h2>
      <div className="fg-demo-rows">
        {[1, 2, 3, 4, 5, 6].map(rows => (
          <div key={rows} className="fg-demo-row-item">
            <DemoLabel>grid-rows-{rows}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateRows: `repeat(${rows}, 1fr)`, gridAutoFlow: 'column', gap: 4, height: Math.min(rows * 30, 120) }}>
              {Array.from({ length: rows }).map((_, i) => (
                <GridItem key={i} label={`r${i + 1}`} accent={i % 2 === 0} />
              ))}
            </div>
          </div>
        ))}
        <div className="fg-demo-row-item">
          <DemoLabel>grid-rows-none</DemoLabel>
          <div style={{ ...track, display: 'grid', gridTemplateRows: 'none', gap: 4 }}>
            {['A','B'].map(n => <GridItem key={n} label={n} />)}
          </div>
        </div>
      </div>

      {/* Column spanning */}
      <h2>Column spanning</h2>
      <div className="fg-demo-rows">
        {[
          { label: 'col-span-1',    span: 1, cols: 4 },
          { label: 'col-span-2',    span: 2, cols: 4 },
          { label: 'col-span-3',    span: 3, cols: 4 },
          { label: 'col-span-4',    span: 4, cols: 4 },
          { label: 'col-span-full', span: 4, cols: 4 },
          { label: 'col-span-auto', span: 1, cols: 4 },
        ].map(({ label, span, cols }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4 }}>
              <GridItem label={`spans ${span}`} span={span} accent />
              {Array.from({ length: cols - span }).map((_, i) => (
                <GridItem key={i} label={String(i + 1)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Row spanning */}
      <h2>Row spanning</h2>
      <div className="fg-demo-rows">
        {[
          { label: 'row-span-1', rowSpan: 1 },
          { label: 'row-span-2', rowSpan: 2 },
          { label: 'row-span-3', rowSpan: 3 },
          { label: 'row-span-full', rowSpan: 3 },
          { label: 'row-span-auto', rowSpan: 1 },
        ].map(({ label, rowSpan }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              <GridItem label={`rows ${rowSpan}`} rowSpan={rowSpan} accent />
              {Array.from({ length: 6 - rowSpan }).map((_, i) => (
                <GridItem key={i} label={String(i + 1)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Column placement */}
      <h2>Column placement (start / end)</h2>
      <div className="fg-demo-rows">
        {[
          { label: 'col-start-1', colStart: 1, colEnd: 3 },
          { label: 'col-start-2', colStart: 2, colEnd: 4 },
          { label: 'col-start-3', colStart: 3, colEnd: 5 },
          { label: 'col-end-3',   colStart: 1, colEnd: 3 },
          { label: 'col-end-5',   colStart: 3, colEnd: 5 },
          { label: 'col-start-auto', colStart: 'auto' as unknown as number, colEnd: 3 },
        ].map(({ label, colStart, colEnd }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
              <div style={{
                gridColumnStart: colStart,
                gridColumnEnd: colEnd,
                background: 'var(--demo-accent-dim)',
                border: '1px solid rgba(124,108,242,0.5)',
                borderRadius: 5,
                padding: '4px 8px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row placement */}
      <h2>Row placement (start / end)</h2>
      <div className="fg-demo-rows">
        {[
          { label: 'row-start-1', rs: 1, re: 2 },
          { label: 'row-start-2', rs: 2, re: 3 },
          { label: 'row-end-3',   rs: 2, re: 3 },
        ].map(({ label, rs, re }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 28px)', gap: 4 }}>
              <div style={{
                gridRowStart: rs,
                gridRowEnd: re,
                gridColumn: '1 / -1',
                background: 'var(--demo-accent-dim)',
                border: '1px solid rgba(124,108,242,0.5)',
                borderRadius: 5,
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {label}
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <GridItem key={i} label={`r${i + 1}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Auto flow */}
      <h2>Auto flow</h2>
      <div className="fg-demo-rows">
        {[
          { label: 'flow-row',       flow: 'row' as const },
          { label: 'flow-col',       flow: 'column' as const },
          { label: 'flow-dense',     flow: 'dense' as const },
          { label: 'flow-row-dense', flow: 'row dense' as const },
          { label: 'flow-col-dense', flow: 'column dense' as const },
        ].map(({ label, flow }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoFlow: flow, gap: 4 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <GridItem key={i} label={String(i + 1)} accent={i % 2 === 0} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Auto cols */}
      <h2>Auto columns</h2>
      <div className="fg-demo-rows">
        {[
          { label: 'auto-cols-auto', ac: 'auto' },
          { label: 'auto-cols-min',  ac: 'min-content' },
          { label: 'auto-cols-max',  ac: 'max-content' },
          { label: 'auto-cols-fr',   ac: 'minmax(0, 1fr)' },
        ].map(({ label, ac }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridAutoFlow: 'column', gridAutoColumns: ac, gap: 4 }}>
              {['A','B','C'].map(n => <GridItem key={n} label={n} accent={n === 'A'} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Auto rows */}
      <h2>Auto rows</h2>
      <div className="fg-demo-rows">
        {[
          { label: 'auto-rows-auto', ar: 'auto' },
          { label: 'auto-rows-min',  ar: 'min-content' },
          { label: 'auto-rows-max',  ar: 'max-content' },
          { label: 'auto-rows-fr',   ar: 'minmax(0, 1fr)' },
        ].map(({ label, ar }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridAutoRows: ar, gap: 4, height: 72 }}>
              {['A','B','C','D'].map(n => <GridItem key={n} label={n} accent={n === 'A' || n === 'C'} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Custom column widths */}
      <h2>Arbitrary column widths</h2>
      <div className="fg-demo-rows">
        <div className="fg-demo-row-item">
          <DemoLabel>grid-cols-[1fr_2fr_1fr]</DemoLabel>
          <div style={{ ...track, display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 4 }}>
            <GridItem label="sidebar" />
            <GridItem label="main" accent />
            <GridItem label="sidebar" />
          </div>
        </div>
        <div className="fg-demo-row-item">
          <DemoLabel>grid-cols-[2fr_1fr]</DemoLabel>
          <div style={{ ...track, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4 }}>
            <GridItem label="content" accent />
            <GridItem label="aside" />
          </div>
        </div>
        <div className="fg-demo-row-item">
          <DemoLabel>grid-cols-[auto_1fr]</DemoLabel>
          <div style={{ ...track, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 4 }}>
            <GridItem label="auto" />
            <GridItem label="fills remaining" accent />
          </div>
        </div>
      </div>

      {/* Gap */}
      <h2>Gap</h2>
      <div className="fg-demo-rows">
        {[{ n: 1, px: 2 }, { n: 2, px: 4 }, { n: 4, px: 16 }, { n: 6, px: 48 }].map(({ n, px }) => (
          <div key={n} className="fg-demo-row-item">
            <DemoLabel>gap-{n} ({px}px)</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: px }}>
              {[1,2,3,4].map(i => <GridItem key={i} label={String(i)} accent={i % 2 !== 0} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Place Items */}
      <h2>Place Items</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '-0.25rem 0 0.75rem' }}>
        Shorthand for <code>align-items + justify-items</code> in a grid context.
      </p>
      <div className="fg-demo-rows">
        {[
          { label: 'place-items-start',   pi: 'start' },
          { label: 'place-items-end',     pi: 'end' },
          { label: 'place-items-center',  pi: 'center' },
          { label: 'place-items-stretch', pi: 'stretch' },
        ].map(({ label, pi }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', placeItems: pi, gap: 4, height: 60 }}>
              {['A','B','C'].map((n, i) => <GridItem key={n} label={n} accent={i === 1} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Place Content */}
      <h2>Place Content</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '-0.25rem 0 0.75rem' }}>
        Shorthand for <code>align-content + justify-content</code> — distributes tracks within the grid container.
      </p>
      <div className="fg-demo-rows">
        {[
          { label: 'place-content-start',   pc: 'start' },
          { label: 'place-content-end',     pc: 'end' },
          { label: 'place-content-center',  pc: 'center' },
          { label: 'place-content-between', pc: 'space-between' },
          { label: 'place-content-around',  pc: 'space-around' },
          { label: 'place-content-evenly',  pc: 'space-evenly' },
          { label: 'place-content-stretch', pc: 'stretch' },
        ].map(({ label, pc }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', placeContent: pc, gap: 4, height: 80 }}>
              {['A','B','C'].map((n, i) => <GridItem key={n} label={n} accent={i === 1} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Place Self */}
      <h2>Place Self</h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '-0.25rem 0 0.75rem' }}>
        Shorthand for <code>align-self + justify-self</code> — overrides placement for a single grid item.
      </p>
      <div className="fg-demo-rows">
        {[
          { label: 'place-self-auto',    ps: 'auto' },
          { label: 'place-self-start',   ps: 'start' },
          { label: 'place-self-end',     ps: 'end' },
          { label: 'place-self-center',  ps: 'center' },
          { label: 'place-self-stretch', ps: 'stretch' },
        ].map(({ label, ps }) => (
          <div key={label} className="fg-demo-row-item">
            <DemoLabel>{label}</DemoLabel>
            <div style={{ ...track, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, height: 60 }}>
              <GridItem label="A" />
              <div style={{ placeSelf: ps, background: 'var(--demo-accent-dim)', border: '1px solid rgba(124,108,242,0.5)', borderRadius: 5, padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                B ←
              </div>
              <GridItem label="C" />
            </div>
          </div>
        ))}
      </div>

      {/* Reference */}
      <h2>Columns & Rows</h2>
      <ClassTable rows={[
        { cls: 'grid-cols-{1–12}', css: 'grid-template-columns: repeat(n, minmax(0,1fr))', note: 'e.g. grid-cols-3' },
        { cls: 'grid-cols-none',   css: 'grid-template-columns: none' },
        { cls: 'grid-cols-[…]',    css: 'grid-template-columns: …',                        note: 'arbitrary' },
        { cls: 'grid-rows-{1–6}',  css: 'grid-template-rows: repeat(n, minmax(0,1fr))',    note: 'e.g. grid-rows-2' },
        { cls: 'grid-rows-none',   css: 'grid-template-rows: none' },
      ]} />

      <h2>Spanning</h2>
      <ClassTable rows={[
        { cls: 'col-span-{1–12}', css: 'grid-column: span n / span n',  note: 'e.g. col-span-2' },
        { cls: 'col-span-full',   css: 'grid-column: 1 / -1' },
        { cls: 'col-span-auto',   css: 'grid-column: auto' },
        { cls: 'row-span-{1–6}',  css: 'grid-row: span n / span n',     note: 'e.g. row-span-2' },
        { cls: 'row-span-full',   css: 'grid-row: 1 / -1' },
        { cls: 'row-span-auto',   css: 'grid-row: auto' },
      ]} />

      <h2>Placement</h2>
      <ClassTable rows={[
        { cls: 'col-start-{1–13}', css: 'grid-column-start: n',  note: 'e.g. col-start-2' },
        { cls: 'col-start-auto',   css: 'grid-column-start: auto' },
        { cls: 'col-end-{1–13}',   css: 'grid-column-end: n',    note: 'e.g. col-end-4' },
        { cls: 'col-end-auto',     css: 'grid-column-end: auto' },
        { cls: 'row-start-{1–13}', css: 'grid-row-start: n',     note: 'e.g. row-start-1' },
        { cls: 'row-start-auto',   css: 'grid-row-start: auto' },
        { cls: 'row-end-{1–13}',   css: 'grid-row-end: n',       note: 'e.g. row-end-3' },
        { cls: 'row-end-auto',     css: 'grid-row-end: auto' },
      ]} />

      <h2>Auto flow & implicit tracks</h2>
      <ClassTable rows={[
        { cls: 'flow-row',        css: 'grid-auto-flow: row' },
        { cls: 'flow-col',        css: 'grid-auto-flow: column' },
        { cls: 'flow-dense',      css: 'grid-auto-flow: dense' },
        { cls: 'flow-row-dense',  css: 'grid-auto-flow: row dense' },
        { cls: 'flow-col-dense',  css: 'grid-auto-flow: column dense' },
        { cls: 'auto-cols-auto',  css: 'grid-auto-columns: auto' },
        { cls: 'auto-cols-min',   css: 'grid-auto-columns: min-content' },
        { cls: 'auto-cols-max',   css: 'grid-auto-columns: max-content' },
        { cls: 'auto-cols-fr',    css: 'grid-auto-columns: minmax(0, 1fr)' },
        { cls: 'auto-rows-auto',  css: 'grid-auto-rows: auto' },
        { cls: 'auto-rows-min',   css: 'grid-auto-rows: min-content' },
        { cls: 'auto-rows-max',   css: 'grid-auto-rows: max-content' },
        { cls: 'auto-rows-fr',    css: 'grid-auto-rows: minmax(0, 1fr)' },
      ]} />

      <h2>Gap</h2>
      <ClassTable rows={[
        { cls: 'gap-{n}',   css: 'gap: {value}' },
        { cls: 'gap-x-{n}', css: 'column-gap: {value}' },
        { cls: 'gap-y-{n}', css: 'row-gap: {value}' },
      ]} />

      <h2>Place utilities</h2>
      <ClassTable rows={[
        { cls: 'place-items-start',   css: 'place-items: start' },
        { cls: 'place-items-end',     css: 'place-items: end' },
        { cls: 'place-items-center',  css: 'place-items: center' },
        { cls: 'place-items-stretch', css: 'place-items: stretch' },
        { cls: 'place-content-start',   css: 'place-content: start' },
        { cls: 'place-content-end',     css: 'place-content: end' },
        { cls: 'place-content-center',  css: 'place-content: center' },
        { cls: 'place-content-between', css: 'place-content: space-between' },
        { cls: 'place-content-around',  css: 'place-content: space-around' },
        { cls: 'place-content-evenly',  css: 'place-content: space-evenly' },
        { cls: 'place-content-stretch', css: 'place-content: stretch' },
        { cls: 'place-self-auto',    css: 'place-self: auto' },
        { cls: 'place-self-start',   css: 'place-self: start' },
        { cls: 'place-self-end',     css: 'place-self: end' },
        { cls: 'place-self-center',  css: 'place-self: center' },
        { cls: 'place-self-stretch', css: 'place-self: stretch' },
      ]} />
    </div>
  )
}
