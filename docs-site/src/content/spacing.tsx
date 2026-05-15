import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

const scale = [
  { token: 'px',  px: 1  },
  { token: '0.5', px: 2  },
  { token: '1',   px: 2  },
  { token: '1.5', px: 6  },
  { token: '2',   px: 4  },
  { token: '2.5', px: 10 },
  { token: '3',   px: 8  },
  { token: '3.5', px: 14 },
  { token: '4',   px: 16 },
  { token: '5',   px: 32 },
  { token: '6',   px: 48 },
  { token: '7',   px: 64 },
  { token: '8',   px: 96 },
]

// Padding demos: show all-sides + directional variants
const paddingDemos = [
  { token: '1', px: 2  },
  { token: '2', px: 4  },
  { token: '3', px: 8  },
  { token: '4', px: 16 },
  { token: '5', px: 32 },
  { token: '6', px: 48 },
]

const marginDemos = [
  { token: '1', px: 2  },
  { token: '2', px: 4  },
  { token: '3', px: 8  },
  { token: '4', px: 16 },
  { token: '5', px: 32 },
  { token: '6', px: 48 },
]

const spaceBetweenDemos = [
  { token: '1', px: 2  },
  { token: '2', px: 4  },
  { token: '3', px: 8  },
  { token: '4', px: 16 },
  { token: '6', px: 48 },
]

// Shared styles
const contentBox: React.CSSProperties = {
  background: 'rgba(124,108,242,0.25)',
  borderRadius: 4,
  fontSize: '0.7rem',
  fontFamily: 'var(--font-mono)',
  color: 'var(--text-muted)',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 40,
  minHeight: 24,
}

export function Padding() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Spacing</p>
      <h1>Padding</h1>
      <p>
        Utilities for controlling an element's padding. All padding utilities support both
        scale values and arbitrary values.
      </p>

      <CodeBlock
        code={`<div class="p-4">padding: 16px on all sides</div>
<div class="pt-2 pb-4 pl-6 pr-2">per-side control</div>
<div class="px-4 py-2">horizontal + vertical</div>
<div class="p-[150px]">arbitrary value</div>`}
        lang="html"
      />

      {/* All-sides padding visual */}
      <h2>All sides — p-{'{n}'}</h2>
      <p>The highlighted zone is the padding area. The inner box is the content.</p>
      <div className="spacing-grid">
        {paddingDemos.map(({ token, px }) => (
          <div key={token} className="spacing-demo-cell">
            <div
              className="spacing-demo-outer"
              style={{ padding: px, background: 'rgba(124,108,242,0.12)', border: '1px dashed rgba(124,108,242,0.4)', borderRadius: 6, display: 'inline-flex' }}
            >
              <div style={contentBox}>content</div>
            </div>
            <div className="spacing-demo-label">
              <code>p-{token}</code>
              <span>{px}px</span>
            </div>
          </div>
        ))}
      </div>

      {/* Directional padding visual */}
      <h2>Directional variants</h2>
      <div className="spacing-dir-grid">
        {/* pt */}
        <div className="spacing-dir-item">
          <div style={{ background: 'rgba(124,108,242,0.1)', border: '1px dashed rgba(124,108,242,0.35)', borderRadius: 6, padding: '16px 4px 4px', display: 'inline-flex' }}>
            <div style={contentBox}>content</div>
          </div>
          <code>pt-4</code>
        </div>
        {/* pb */}
        <div className="spacing-dir-item">
          <div style={{ background: 'rgba(124,108,242,0.1)', border: '1px dashed rgba(124,108,242,0.35)', borderRadius: 6, padding: '4px 4px 16px', display: 'inline-flex' }}>
            <div style={contentBox}>content</div>
          </div>
          <code>pb-4</code>
        </div>
        {/* pl */}
        <div className="spacing-dir-item">
          <div style={{ background: 'rgba(124,108,242,0.1)', border: '1px dashed rgba(124,108,242,0.35)', borderRadius: 6, padding: '4px 4px 4px 16px', display: 'inline-flex' }}>
            <div style={contentBox}>content</div>
          </div>
          <code>pl-4</code>
        </div>
        {/* pr */}
        <div className="spacing-dir-item">
          <div style={{ background: 'rgba(124,108,242,0.1)', border: '1px dashed rgba(124,108,242,0.35)', borderRadius: 6, padding: '4px 16px 4px 4px', display: 'inline-flex' }}>
            <div style={contentBox}>content</div>
          </div>
          <code>pr-4</code>
        </div>
        {/* px */}
        <div className="spacing-dir-item">
          <div style={{ background: 'rgba(124,108,242,0.1)', border: '1px dashed rgba(124,108,242,0.35)', borderRadius: 6, padding: '4px 16px', display: 'inline-flex' }}>
            <div style={contentBox}>content</div>
          </div>
          <code>px-4</code>
        </div>
        {/* py */}
        <div className="spacing-dir-item">
          <div style={{ background: 'rgba(124,108,242,0.1)', border: '1px dashed rgba(124,108,242,0.35)', borderRadius: 6, padding: '16px 4px', display: 'inline-flex' }}>
            <div style={contentBox}>content</div>
          </div>
          <code>py-4</code>
        </div>
      </div>

      {/* Scale reference */}
      <h2>Spacing scale</h2>
      <div className="spacing-scale">
        {scale.map(({ token, px }) => (
          <div key={token} className="spacing-scale-row">
            <span className="spacing-scale-token">{token}</span>
            <div className="spacing-scale-bar-track">
              <div
                className="spacing-scale-bar"
                style={{ width: Math.max(px, 1), maxWidth: '100px' }}
              />
            </div>
            <span className="spacing-scale-px">{px}px</span>
          </div>
        ))}
      </div>

      <h2>Reference</h2>
      <ClassTable
        rows={[
          { cls: 'p-{n}',  css: 'padding',                          note: 'all sides' },
          { cls: 'pt-{n}', css: 'padding-top' },
          { cls: 'pb-{n}', css: 'padding-bottom' },
          { cls: 'pl-{n}', css: 'padding-left' },
          { cls: 'pr-{n}', css: 'padding-right' },
          { cls: 'px-{n}', css: 'padding-left + padding-right',     note: 'horizontal' },
          { cls: 'py-{n}', css: 'padding-top + padding-bottom',     note: 'vertical' },
        ]}
      />
    </div>
  )
}

export function Margin() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Spacing</p>
      <h1>Margin</h1>
      <p>Utilities for controlling an element's outer spacing.</p>

      <CodeBlock
        code={`<div class="m-4">margin: 16px on all sides</div>
<div class="mt-8 mb-4">top + bottom</div>
<div class="mx-auto w-[600px]">horizontally centered</div>
<div class="mt-[150px]">arbitrary value</div>`}
        lang="html"
      />

      {/* Margin-top visual */}
      <h2>Margin top — mt-{'{n}'}</h2>
      <p>The highlighted gap above each block is the margin.</p>
      <div className="spacing-margin-list">
        {marginDemos.map(({ token, px }) => (
          <div key={token} className="spacing-margin-row">
            {/* margin gap zone */}
            <div
              className="spacing-margin-gap"
              style={{ height: Math.max(px, 2) }}
            >
              <span className="spacing-margin-gap-label">{px}px</span>
            </div>
            {/* the block */}
            <div className="spacing-margin-block">
              <code>mt-{token}</code>
            </div>
          </div>
        ))}
      </div>

      {/* mx-auto visual */}
      <h2>Auto centering — mx-auto</h2>
      <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px dashed rgba(96,165,250,0.3)', borderRadius: 8, padding: '12px', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ flex: 1, height: 2, background: 'rgba(96,165,250,0.4)', borderRadius: 2 }} />
          <div style={{ background: 'rgba(96,165,250,0.18)', border: '1px solid rgba(96,165,250,0.4)', borderRadius: 6, padding: '6px 20px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            content
          </div>
          <div style={{ flex: 1, height: 2, background: 'rgba(96,165,250,0.4)', borderRadius: 2 }} />
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-subtle)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>mx-auto</div>
      </div>

      <h2>Reference</h2>
      <ClassTable
        rows={[
          { cls: 'm-{n}',   css: 'margin',                        note: 'all sides' },
          { cls: 'mt-{n}',  css: 'margin-top' },
          { cls: 'mb-{n}',  css: 'margin-bottom' },
          { cls: 'ml-{n}',  css: 'margin-left' },
          { cls: 'mr-{n}',  css: 'margin-right' },
          { cls: 'mx-{n}',  css: 'margin-left + margin-right',    note: 'horizontal' },
          { cls: 'my-{n}',  css: 'margin-top + margin-bottom',    note: 'vertical' },
          { cls: 'mx-auto', css: 'margin-left: auto; margin-right: auto', note: 'center block' },
        ]}
      />
    </div>
  )
}

export function SpaceBetween() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Spacing</p>
      <h1>Space Between</h1>
      <p>
        Applies margin to all direct children (except the first) to space them evenly —
        without needing <code>gap</code> on a flex/grid container.
      </p>

      <CodeBlock
        code={`<div class="flex space-x-4">
  <div>A</div>
  <div>B</div>  <!-- margin-left: 16px -->
  <div>C</div>  <!-- margin-left: 16px -->
</div>

<ul class="space-y-2">
  <li>Item 1</li>
  <li>Item 2</li>  <!-- margin-top: 4px -->
</ul>`}
        lang="html"
      />

      {/* Horizontal space-x visual */}
      <h2>Horizontal — space-x-{'{n}'}</h2>
      <p>The highlighted gap between each child is the applied margin-left.</p>
      <div className="spacing-sb-list">
        {spaceBetweenDemos.map(({ token, px }) => (
          <div key={token} className="spacing-sb-row">
            <code className="spacing-sb-label">space-x-{token}</code>
            <div className="spacing-sb-children">
              {['A', 'B', 'C', 'D'].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && (
                    <div
                      className="spacing-sb-gap"
                      style={{ width: Math.max(px, 2) }}
                    >
                      <span className="spacing-sb-gap-label">{px}px</span>
                    </div>
                  )}
                  <div className="spacing-sb-child">{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vertical space-y visual */}
      <h2>Vertical — space-y-{'{n}'}</h2>
      <div className="spacing-sb-y-list">
        {spaceBetweenDemos.map(({ token, px }) => (
          <div key={token} className="spacing-sb-y-row">
            <code className="spacing-sb-label">space-y-{token}</code>
            <div>
              {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
                <div key={item}>
                  {i > 0 && (
                    <div
                      className="spacing-sb-gap-y"
                      style={{ height: Math.max(px, 2) }}
                    >
                      <span className="spacing-sb-gap-label">{px}px</span>
                    </div>
                  )}
                  <div className="spacing-sb-child-y">{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Reference</h2>
      <ClassTable
        rows={[
          { cls: 'space-x-{n}',     css: 'margin-left on children (except first)',  note: 'horizontal' },
          { cls: 'space-y-{n}',     css: 'margin-top on children (except first)',   note: 'vertical' },
          { cls: 'space-x-reverse', css: 'uses margin-right instead',               note: 'for row-reverse' },
          { cls: 'space-y-reverse', css: 'uses margin-bottom instead',              note: 'for col-reverse' },
        ]}
      />

      <div className="callout callout-info">
        <span className="callout-icon">ℹ️</span>
        <span>
          Space-between applies styles to <strong>child elements</strong>, not the container itself.
        </span>
      </div>
    </div>
  )
}
