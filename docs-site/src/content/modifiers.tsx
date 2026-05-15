import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

// ─── HoverFocusActive ─────────────────────────────────────────────────────────

export function HoverFocusActive() {
  const [focused, setFocused] = useState(false)
  const [active, setActive]   = useState(false)
  const [hovered, setHovered] = useState(false)

  const hoverCardStyle: React.CSSProperties = {
    width: 160,
    height: 80,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    background: hovered ? 'rgba(124,108,242,0.15)' : 'var(--bg-surface)',
    border: hovered ? '1px solid rgba(124,108,242,0.5)' : '1px solid var(--border)',
    boxShadow: hovered ? '0 4px 16px rgba(124,108,242,0.2)' : 'none',
  }

  const inputStyle: React.CSSProperties = {
    width: 200,
    padding: '8px 12px',
    background: 'var(--bg-elevated)',
    border: focused
      ? '1px solid rgba(124,108,242,0.8)'
      : '1px solid var(--border)',
    borderRadius: 7,
    color: 'var(--text)',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(124,108,242,0.2)' : 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
  }

  const activeButtonStyle: React.CSSProperties = {
    width: 120,
    height: 48,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 100ms ease',
    background: active ? 'rgba(124,108,242,0.35)' : 'rgba(124,108,242,0.2)',
    border: '1px solid rgba(124,108,242,0.4)',
    boxShadow: active ? 'none' : '0 2px 8px rgba(124,108,242,0.15)',
    transform: active ? 'scale(0.95)' : 'scale(1)',
    fontSize: '0.875rem',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
  }

  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>Hover / Focus / Active</h1>
      <p>
        State modifiers apply styles on DOM events. Original styles are saved before application
        and restored when the event ends.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '1.5rem',
      }}>
        {/* Hover card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
            hover:bg-violet-100
          </span>
          <div
            style={hoverCardStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              hover:*
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>hover me</span>
          </div>
        </div>

        {/* Focus ring input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'flex-start' }}>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
            focus:border-violet-500
          </span>
          <input
            style={inputStyle}
            placeholder="Tab or click to focus"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {/* Active press */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
            active:scale-95
          </span>
          <div
            style={activeButtonStyle}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onMouseLeave={() => setActive(false)}
          >
            Press me
          </div>
        </div>
      </div>

      <CodeBlock
        code={`<!-- Hover: background + shadow -->
<div class="bg-white p-4 rounded-lg shadow
            transition duration-200
            hover:bg-blue-50 hover:shadow-lg">
  Hover card
</div>

<!-- Focus: ring on input -->
<input class="border border-gray-300 rounded px-3 py-2 outline-none
              transition duration-150
              focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"
       placeholder="Focus me" />

<!-- Active: press down effect -->
<button class="bg-violet-500 text-white px-4 py-2 rounded
               transition duration-100
               hover:bg-violet-600
               active:scale-95 active:shadow-none">
  Press me
</button>`}
        lang="html"
      />
      <ClassTable
        headers={['Modifier', 'Trigger', 'Restore']}
        rows={[
          { cls: 'hover:*',   css: 'mouseenter',  note: 'mouseleave' },
          { cls: 'focus:*',   css: 'focus',        note: 'blur' },
          { cls: 'active:*',  css: 'mousedown',    note: 'mouseup / mouseleave' },
        ]}
      />
      <div className="callout callout-info">
        <span className="callout-icon">ℹ️</span>
        <span>
          snapcss saves the original inline style before applying a state modifier.
          When the event ends, it restores exactly those properties — it won't remove
          styles set by other classes.
        </span>
      </div>
    </div>
  )
}

// ─── FocusVisible ─────────────────────────────────────────────────────────────

export function FocusVisible() {
  const [mouseButtonFocused, setMouseButtonFocused] = useState(false)
  const [kbButtonFocused, setKbButtonFocused]       = useState(false)

  const baseButtonStyle: React.CSSProperties = {
    padding: '8px 18px',
    borderRadius: 7,
    border: '1px solid var(--border)',
    background: 'var(--bg-surface)',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    cursor: 'pointer',
    outline: 'none',
    transition: 'box-shadow 150ms, border-color 150ms',
  }

  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>Focus Visible</h1>
      <p>
        Applies styles only when focused via keyboard (Tab), not on mouse click. This is
        the correct accessible pattern for focus rings.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        {/* Click — no ring */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button
            style={{
              ...baseButtonStyle,
              outline: mouseButtonFocused ? '2px solid transparent' : 'none',
            }}
            onFocus={() => setMouseButtonFocused(true)}
            onBlur={() => setMouseButtonFocused(false)}
          >
            Click (mouse)
          </button>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
            no ring on click
          </span>
        </div>

        {/* Tab to focus — ring visible */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <button
            style={{
              ...baseButtonStyle,
              outline: kbButtonFocused ? '2px solid rgba(124,108,242,0.85)' : 'none',
              outlineOffset: kbButtonFocused ? 2 : 0,
              boxShadow: kbButtonFocused ? '0 0 0 4px rgba(124,108,242,0.18)' : 'none',
            }}
            onFocus={() => setKbButtonFocused(true)}
            onBlur={() => setKbButtonFocused(false)}
          >
            (Tab to focus)
          </button>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
            ring appears on keyboard Tab
          </span>
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        snapcss implements this by checking{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-light)' }}>
          el.matches(':focus-visible')
        </code>{' '}
        before applying styles.
      </p>

      <CodeBlock
        code={`<!-- The right way to do accessible focus rings -->
<button class="outline-none px-4 py-2 rounded bg-blue-500 text-white
               focus-visible:outline focus-visible:outline-2
               focus-visible:outline-offset-2 focus-visible:outline-blue-500">
  Tab to see focus ring; click does nothing
</button>

<a href="#" class="no-underline text-blue-600
                   focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-blue-500 focus-visible:rounded">
  Accessible link
</a>`}
        lang="html"
      />
      <div className="callout callout-tip">
        <span className="callout-icon">💡</span>
        <span>
          Implementation: <code>focus</code> event fires → checks{' '}
          <code>el.matches(':focus-visible')</code> → only applies styles if <code>true</code>.
          <code>blur</code> always removes the styles.
        </span>
      </div>
    </div>
  )
}

// ─── Responsive ───────────────────────────────────────────────────────────────

const breakpoints: Array<{ name: string; px: number }> = [
  { name: 'sm',  px: 640  },
  { name: 'md',  px: 768  },
  { name: 'lg',  px: 1024 },
  { name: 'xl',  px: 1280 },
  { name: '2xl', px: 1536 },
]
const SCALE_MAX = 1600

export function Responsive() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>Responsive</h1>
      <p>
        Apply utilities at specific breakpoints using <code>sm:</code>, <code>md:</code>,
        <code>lg:</code>, <code>xl:</code>, or <code>2xl:</code> prefixes. Styles are applied
        when <code>window.innerWidth ≥ breakpoint</code> and removed below.
      </p>

      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
      }}>
        {/* Gradient bar */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div style={{
            width: '100%',
            height: 8,
            borderRadius: 4,
            background: 'linear-gradient(90deg, #6366f1 0%, #7c6cf2 50%, #a855f7 100%)',
          }} />

          {/* Tick marks */}
          {breakpoints.map(({ name, px }) => {
            const pct = (px / SCALE_MAX) * 100
            return (
              <div key={name} style={{
                position: 'absolute',
                top: 0,
                left: `${pct}%`,
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* Tick */}
                <div style={{ width: 2, height: 18, background: 'var(--border-bright)', marginTop: -5 }} />
                {/* Labels */}
                <span style={{
                  marginTop: 4,
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-light)',
                  whiteSpace: 'nowrap',
                }}>
                  {name}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-subtle)',
                  whiteSpace: 'nowrap',
                }}>
                  {px}px
                </span>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <p style={{ margin: 0, paddingTop:'24px', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
          Scaled to 1600 px total. All breakpoints are min-width based (mobile-first).
        </p>
      </div>

      <CodeBlock
        code={`<!-- Responsive layout: stack → row → 3 columns -->
<div class="flex flex-col md:flex-row lg:grid lg:grid-cols-3 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Responsive padding -->
<div class="p-4 md:p-8 lg:p-[48px]">Responsive padding</div>

<!-- Responsive text size -->
<h1 class="text-2xl md:text-4xl lg:text-[3.5rem]">Responsive heading</h1>

<!-- Show/hide at breakpoints -->
<div class="hidden md:block">Visible at md+</div>`}
        lang="html"
      />
      <ClassTable
        headers={['Prefix', 'Min-width', 'Description']}
        rows={[
          { cls: 'sm:',  css: '640px',  note: 'Small tablets and up' },
          { cls: 'md:',  css: '768px',  note: 'Tablets and up' },
          { cls: 'lg:',  css: '1024px', note: 'Laptops and up' },
          { cls: 'xl:',  css: '1280px', note: 'Desktops and up' },
          { cls: '2xl:', css: '1536px', note: 'Large desktops' },
        ]}
      />
      <div className="callout callout-info">
        <span className="callout-icon">ℹ️</span>
        <span>
          Responsive styles are re-evaluated on window resize with a 150ms debounce.
          All breakpoints are <strong>min-width</strong> based (mobile-first).
        </span>
      </div>
    </div>
  )
}

// ─── DarkMode ─────────────────────────────────────────────────────────────────

export function DarkMode() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>Dark Mode</h1>
      <p>
        Apply styles when the OS is in dark mode via <code>dark:</code>. Detected using{' '}
        <code>window.matchMedia("(prefers-color-scheme: dark)")</code> and updates automatically
        when the user toggles their system preference.
      </p>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Same element, different OS preference:
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '1.5rem',
      }}>
        {/* Light mode card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          padding: '1rem 1.25rem',
          color: '#111827',
          minWidth: 200,
          flex: '1 1 200px',
          maxWidth: 280,
        }}>
          <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>
            Light Mode
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#6b7280' }}>
            Adapts automatically
          </p>
          <code style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            background: '#f3f4f6',
            color: '#4b5563',
            padding: '2px 6px',
            borderRadius: 4,
          }}>
            bg-white text-gray-900
          </code>
        </div>

        {/* Dark mode card */}
        <div style={{
          background: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: 10,
          padding: '1rem 1.25rem',
          color: '#f1f5f9',
          minWidth: 200,
          flex: '1 1 200px',
          maxWidth: 280,
        }}>
          <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '0.9rem', color: '#f1f5f9' }}>
            Dark Mode
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#94a3b8' }}>
            Adapts automatically
          </p>
          <code style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            background: '#1e293b',
            color: '#94a3b8',
            padding: '2px 6px',
            borderRadius: 4,
          }}>
            dark:bg-gray-900
          </code>
        </div>
      </div>

      <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '1rem' }}>
        Detected via <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-light)' }}>prefers-color-scheme: dark</code> media query.
      </p>

      <CodeBlock
        code={`<!-- Adaptive card -->
<div class="bg-white text-gray-900 shadow
            dark:bg-gray-900 dark:text-white dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]
            rounded-xl p-6">
  Adapts to dark mode automatically
</div>

<!-- Dark mode text colors -->
<p class="text-gray-700 dark:text-gray-300">Body text</p>
<h1 class="text-gray-900 dark:text-white">Heading</h1>

<!-- Dark mode with arbitrary color -->
<div class="bg-gray-100 dark:bg-[#0a0a0f]">
  Custom dark background
</div>`}
        lang="html"
      />
      <div className="callout callout-tip">
        <span className="callout-icon">💡</span>
        <span>
          Dark mode changes are instant — a <code>MediaQueryList</code> change listener
          re-applies or removes dark styles on the fly without a page reload.
        </span>
      </div>
    </div>
  )
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export function Disabled() {
  const baseBtn: React.CSSProperties = {
    background: 'rgba(124,108,242,0.9)',
    color: '#ffffff',
    padding: '8px 20px',
    borderRadius: 7,
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: 'none',
    display: 'inline-block',
  }

  const baseInput: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 7,
    border: '1px solid var(--border)',
    background: 'var(--bg-elevated)',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    outline: 'none',
  }

  const items: Array<{ label: string; el: React.ReactNode }> = [
    {
      label: 'Normal',
      el: <div style={baseBtn}>Button</div>,
    },
    {
      label: 'disabled:opacity-50 + cursor-not-allowed',
      el: (
        <div style={{ ...baseBtn, opacity: 0.4, cursor: 'not-allowed' }}>
          Button
        </div>
      ),
    },
    {
      label: 'Normal',
      el: <input style={baseInput} defaultValue="Input field" readOnly />,
    },
    {
      label: 'disabled:bg-gray-100',
      el: (
        <input
          style={{
            ...baseInput,
            background: 'rgba(255,255,255,0.03)',
            color: 'var(--text-subtle)',
            cursor: 'not-allowed',
            borderColor: 'var(--border)',
          }}
          defaultValue="Disabled input"
          disabled
          readOnly
        />
      ),
    },
  ]

  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>Disabled</h1>
      <p>
        Apply styles when an element has the <code>disabled</code> HTML attribute.
        A MutationObserver watches for attribute changes, so toggling <code>disabled</code>
        dynamically works without re-running <code>init()</code>.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'flex-end',
        marginBottom: '1.5rem',
      }}>
        {items.map(({ label, el }, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {el}
            <span style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-light)',
              maxWidth: 200,
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <CodeBlock
        code={`<button class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer
               transition duration-150
               hover:bg-blue-600
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        disabled>
  Disabled button
</button>

<input class="border rounded px-3 py-2
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
       disabled value="Read only" />`}
        lang="html"
      />
    </div>
  )
}

// ─── FirstLast ────────────────────────────────────────────────────────────────

const firstLastItems = ['First item', 'Second item', 'Third item', 'Last item']

export function FirstLast() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>First / Last</h1>
      <p>
        Apply styles to the first or last child of a parent element.
        Useful for removing borders or padding from edge items.
      </p>

      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}>
        {firstLastItems.map((item, i) => {
          const isFirst = i === 0
          const isLast  = i === firstLastItems.length - 1

          const itemStyle: React.CSSProperties = {
            padding: isFirst ? '6px 14px 10px' : isLast ? '10px 14px 6px' : '10px 14px',
            borderBottom: isLast ? 'none' : '1px solid var(--border)',
            background: (isFirst || isLast) ? 'rgba(124,108,242,0.08)' : 'var(--bg-surface)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }

          return (
            <div key={i} style={itemStyle}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text)' }}>{item}</span>
              {isFirst && (
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
                  first child →
                </span>
              )}
              {isLast && (
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
                  ← last child
                </span>
              )}
            </div>
          )
        })}
      </div>

      <CodeBlock
        code={`<ul>
  <!-- Remove top padding on first, bottom padding on last -->
  <li class="py-3 border-b border-solid border-gray-100
             first:pt-0 last:pb-0 last:border-b-0">
    Item
  </li>
  <li class="py-3 border-b border-solid border-gray-100
             first:pt-0 last:pb-0 last:border-b-0">
    Item
  </li>
  <li class="py-3 border-b border-solid border-gray-100
             first:pt-0 last:pb-0 last:border-b-0">
    Last item — no bottom border
  </li>
</ul>`}
        lang="html"
      />
      <ClassTable
        rows={[
          { cls: 'first:*', css: 'Applied when el === parentElement.firstElementChild' },
          { cls: 'last:*',  css: 'Applied when el === parentElement.lastElementChild' },
        ]}
      />
    </div>
  )
}

// ─── OddEven ──────────────────────────────────────────────────────────────────

const oddEvenRows = ['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5', 'Row 6']

export function OddEven() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>Odd / Even</h1>
      <p>
        Apply styles to alternating children. Uses 0-based index:
        odd = index 0, 2, 4 (1st, 3rd, 5th children); even = index 1, 3, 5 (2nd, 4th, 6th).
      </p>

      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}>
        {oddEvenRows.map((label, i) => {
          const isOdd = i % 2 === 0
          return (
            <div key={i} style={{
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: isOdd ? 'rgba(124,108,242,0.06)' : 'var(--bg-surface)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--accent-light)',
                minWidth: 24,
                textAlign: 'right',
              }}>
                {i + 1}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text)' }}>
                {label}{' '}
                <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                  ({isOdd ? 'odd' : 'even'})
                </span>
              </span>
            </div>
          )
        })}
      </div>

      <CodeBlock
        code={`<table>
  <tbody>
    <tr class="odd:bg-gray-50 even:bg-white">
      <td class="px-4 py-2">Row 1 (odd — gray)</td>
    </tr>
    <tr class="odd:bg-gray-50 even:bg-white">
      <td class="px-4 py-2">Row 2 (even — white)</td>
    </tr>
    <tr class="odd:bg-gray-50 even:bg-white">
      <td class="px-4 py-2">Row 3 (odd — gray)</td>
    </tr>
  </tbody>
</table>`}
        lang="html"
      />
      <ClassTable
        rows={[
          { cls: 'odd:*',  css: 'Applied when el index (0-based) % 2 === 0 (1st, 3rd, 5th…)' },
          { cls: 'even:*', css: 'Applied when el index (0-based) % 2 === 1 (2nd, 4th, 6th…)' },
        ]}
      />
    </div>
  )
}

// ─── GroupHover ───────────────────────────────────────────────────────────────

export function GroupHover() {
  const [hovered, setHovered] = useState(false)

  const containerStyle: React.CSSProperties = {
    width: '100%',
    background: hovered ? 'rgba(124,108,242,0.15)' : 'var(--bg-surface)',
    border: hovered ? '1px solid rgba(124,108,242,0.5)' : '1px solid var(--border)',
    borderRadius: 12,
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 250ms ease',
    boxShadow: hovered ? '0 8px 24px rgba(124,108,242,0.2)' : 'none',
  }

  const titleStyle: React.CSSProperties = {
    margin: 0,
    color: hovered ? 'var(--accent-light)' : 'var(--text)',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'color 250ms',
  }

  const subtitleStyle: React.CSSProperties = {
    margin: '4px 0 12px',
    color: hovered ? 'var(--text-muted)' : 'var(--text-subtle)',
    fontSize: '0.85rem',
    transition: 'color 250ms',
  }

  const learnMoreStyle: React.CSSProperties = {
    opacity: hovered ? 1 : 0,
    fontSize: '0.8rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-light)',
    transition: 'opacity 250ms',
  }

  return (
    <div className="doc-section">
      <p className="doc-section-label">Modifiers</p>
      <h1>Group Hover</h1>
      <p>
        Mark a parent with <code>group</code>, then use <code>group-hover:*</code>
        on its children to react to the parent's hover state.
      </p>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Hover the card to see all children respond to the parent's hover state.
      </p>

      <div
        style={containerStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p style={titleStyle}>Card title</p>
        <p style={subtitleStyle}>Subtitle changes too</p>
        <span style={learnMoreStyle}>Learn more →</span>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <CodeBlock
          code={`<div class="group p-6 bg-white rounded-xl shadow cursor-pointer
            transition duration-300 hover:bg-violet-500 hover:shadow-xl">

  <p class="font-bold text-gray-800 transition duration-300
            group-hover:text-white">
    Card title
  </p>

  <p class="text-gray-500 text-sm transition duration-300
            group-hover:text-violet-100">
    Subtitle changes too
  </p>

  <!-- Arrow icon reveals on hover -->
  <span class="opacity-0 transition duration-300 text-white text-sm
               group-hover:opacity-100">
    Learn more →
  </span>
</div>`}
          lang="html"
        />
      </div>
      <div className="callout callout-info">
        <span className="callout-icon">ℹ️</span>
        <span>
          <strong>Implementation:</strong> snapcss scans for <code>group</code> elements
          to register group roots, then finds children with <code>group-hover:</code> classes
          and links them to the nearest ancestor group root.
          <code>mouseenter</code> / <code>mouseleave</code> on the root triggers styles on all children.
        </span>
      </div>
    </div>
  )
}
