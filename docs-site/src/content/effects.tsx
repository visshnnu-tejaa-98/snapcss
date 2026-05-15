import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

const demoGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 14,
  marginBottom: '1.75rem',
}

// ─── Shadows ──────────────────────────────────────────────────────────────────

const shadowItems = [
  { cls: 'shadow-none',  shadow: 'none',                                                           desc: 'No shadow' },
  { cls: 'shadow-sm',    shadow: '0 1px 2px rgba(0,0,0,0.05)',                                     desc: '0 1px 2px' },
  { cls: 'shadow',       shadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',         desc: '0 1px 3px' },
  { cls: 'shadow-md',    shadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',         desc: '0 4px 6px' },
  { cls: 'shadow-lg',    shadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',       desc: '0 10px 15px' },
  { cls: 'shadow-xl',    shadow: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',     desc: '0 20px 25px' },
  { cls: 'shadow-2xl',   shadow: '0 25px 50px rgba(0,0,0,0.25)',                                   desc: '0 25px 50px' },
  { cls: 'shadow-inner', shadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',                               desc: 'inset 0 2px 4px' },
]

function ShadowDemo() {
  return (
    <div
      style={{
        background: '#e8ecf2',
        borderRadius: 12,
        padding: '1.5rem',
        ...demoGrid,
      }}
    >
      {shadowItems.map(({ cls, shadow, desc }) => (
        <div
          key={cls}
          style={{
            background: '#ffffff',
            borderRadius: 10,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            boxShadow: shadow,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: '#5b4fc7', fontSize: '0.7rem' }}>{cls}</div>
            <div style={{ color: '#6b7280', fontSize: '0.65rem', marginTop: 3 }}>{desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Opacity ──────────────────────────────────────────────────────────────────

const opacityValues = [0, 10, 25, 50, 75, 90, 100]

function OpacityDemo() {
  return (
    <div style={{ ...demoGrid }}>
      {opacityValues.map((val) => (
        <div
          key={val}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            background: 'var(--bg-surface)',
            borderRadius: 8,
            padding: '12px 8px',
          }}
        >
          <div
            style={{
              height: 44,
              width: '100%',
              background: 'rgba(124,108,242,1)',
              borderRadius: 6,
              opacity: val / 100,
            }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.68rem', textAlign: 'center' }}>
            opacity-{val}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.62rem' }}>{val}%</span>
        </div>
      ))}
    </div>
  )
}

// ─── Transitions ──────────────────────────────────────────────────────────────

interface HoverBoxProps {
  label: string
  baseStyle: React.CSSProperties
  hoverStyle: React.CSSProperties
  transition: string
  description: string
}

function HoverBox({ label, baseStyle, hoverStyle, transition, description }: HoverBoxProps) {
  const [hovered, setHovered] = useState(false)

  const merged: React.CSSProperties = {
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    border: '1px solid var(--border-bright)',
    transition,
    cursor: 'pointer',
    ...(hovered ? hoverStyle : baseStyle),
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={merged}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', userSelect: 'none' }}>hover me</span>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.7rem' }}>{label}</div>
        <div style={{ color: 'var(--text-subtle)', fontSize: '0.68rem', marginTop: 2 }}>{description}</div>
      </div>
    </div>
  )
}

function TransitionsDemo() {
  return (
    <div style={{ ...demoGrid, margin: '1.25rem 0' }}>
      <HoverBox
        label="transition-colors"
        baseStyle={{ background: 'rgba(124,108,242,0.1)' }}
        hoverStyle={{ background: 'rgba(124,108,242,0.35)' }}
        transition="background-color 300ms ease-in-out"
        description="Background fades on hover"
      />
      <HoverBox
        label="transition-transform"
        baseStyle={{ transform: 'scale(1)', background: 'var(--bg-surface)' }}
        hoverStyle={{ transform: 'scale(1.1)', background: 'var(--bg-surface)' }}
        transition="transform 200ms ease-out"
        description="Scales up smoothly"
      />
      <HoverBox
        label="transition-shadow"
        baseStyle={{ boxShadow: 'none', background: 'var(--bg-surface)' }}
        hoverStyle={{ boxShadow: '0 8px 24px rgba(124,108,242,0.45)', background: 'var(--bg-surface)' }}
        transition="box-shadow 300ms ease"
        description="Shadow appears on hover"
      />
      <HoverBox
        label="transition-opacity"
        baseStyle={{ opacity: 0.35, background: 'var(--bg-surface)' }}
        hoverStyle={{ opacity: 1, background: 'var(--bg-surface)' }}
        transition="opacity 200ms ease"
        description="Opacity fades in"
      />
    </div>
  )
}

// ─── Transforms ───────────────────────────────────────────────────────────────

const scaleItems = [
  { key: '0',   val: 0 },
  { key: '50',  val: 0.5 },
  { key: '75',  val: 0.75 },
  { key: '90',  val: 0.9 },
  { key: '95',  val: 0.95 },
  { key: '100', val: 1 },
  { key: '105', val: 1.05 },
  { key: '110', val: 1.1 },
  { key: '125', val: 1.25 },
  { key: '150', val: 1.5 },
]

const rotateItems = [
  { key: '0',   deg: 0 },
  { key: '1',   deg: 1 },
  { key: '2',   deg: 2 },
  { key: '3',   deg: 3 },
  { key: '6',   deg: 6 },
  { key: '12',  deg: 12 },
  { key: '45',  deg: 45 },
  { key: '90',  deg: 90 },
  { key: '180', deg: 180 },
]

const skewItems = [
  { key: '0',  deg: 0 },
  { key: '1',  deg: 1 },
  { key: '2',  deg: 2 },
  { key: '3',  deg: 3 },
  { key: '6',  deg: 6 },
  { key: '12', deg: 12 },
]

function TransformsDemo() {
  return (
    <>
      {/* Scale */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '1.25rem 0 0.5rem', fontWeight: 600 }}>Scale</p>
      <div style={{ ...demoGrid }}>
        {scaleItems.map(({ key, val }) => (
          <div
            key={key}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 8,
              padding: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              minHeight: 90,
              overflow: 'visible',
            }}
          >
            <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(124,108,242,0.2)',
                  border: '1.5px solid rgba(124,108,242,0.55)',
                  borderRadius: 5,
                  transform: `scale(${val})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'var(--text-muted)',
                }}
              >
                {val}
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.65rem', textAlign: 'center' }}>
              scale-{key}
            </span>
          </div>
        ))}
      </div>

      {/* Rotate */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 0.5rem', fontWeight: 600 }}>Rotate</p>
      <div style={{ ...demoGrid }}>
        {rotateItems.map(({ key, deg }) => (
          <div
            key={key}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 8,
              padding: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              minHeight: 90,
              overflow: 'visible',
            }}
          >
            <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: 'rgba(96,165,250,0.2)',
                  border: '1.5px solid rgba(96,165,250,0.55)',
                  borderRadius: 4,
                  transform: `rotate(${deg}deg)`,
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.65rem' }}>rotate-{key}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: 2 }}>{deg}deg</div>
            </div>
          </div>
        ))}
      </div>

      {/* Skew */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 0.5rem', fontWeight: 600 }}>Skew X</p>
      <div style={{ ...demoGrid }}>
        {skewItems.map(({ key, deg }) => (
          <div
            key={key}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 8,
              padding: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              minHeight: 90,
              overflow: 'visible',
            }}
          >
            <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  width: 40,
                  height: 28,
                  background: 'rgba(74,222,128,0.2)',
                  border: '1.5px solid rgba(74,222,128,0.55)',
                  transform: `skewX(${deg}deg)`,
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.65rem' }}>skew-x-{key}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: 2 }}>{deg}deg</div>
            </div>
          </div>
        ))}
      </div>

      {/* Translate */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.5rem 0 0.5rem', fontWeight: 600 }}>Translate X</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: '1.75rem' }}>
        {[
          { px: -16, cls: 'translate-x-[-16px]', label: '−16px' },
          { px: -8,  cls: 'translate-x-[-8px]',  label: '−8px' },
          { px: 0,   cls: 'translate-x-0',        label: '0 (origin)' },
          { px: 8,   cls: 'translate-x-2',        label: '+8px' },
          { px: 16,  cls: 'translate-x-4',        label: '+16px' },
        ].map(({ px, cls, label }) => (
          <div
            key={px}
            style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            {/* track area with ghost origin + translated box */}
            <div style={{ position: 'relative', width: '100%', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* horizontal baseline */}
              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'rgba(124,108,242,0.25)' }} />
              {/* ghost box at origin */}
              <div style={{ position: 'absolute', width: 28, height: 28, border: '1.5px dashed rgba(251,191,36,0.3)', borderRadius: 4 }} />
              {/* translated box */}
              <div style={{
                position: 'relative',
                width: 28,
                height: 28,
                background: 'rgba(251,191,36,0.2)',
                border: '1.5px solid rgba(251,191,36,0.75)',
                borderRadius: 4,
                transform: `translateX(${px}px)`,
                zIndex: 1,
              }} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', fontSize: '0.6rem', textAlign: 'center', wordBreak: 'break-all' }}>{cls}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>{label}</div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export function Shadows() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Effects</p>
      <h1>Box Shadow</h1>
      <p>Eight predefined shadow levels from subtle to dramatic, plus arbitrary values.</p>
      <CodeBlock
        code={`<div class="shadow-sm bg-white p-4 rounded">Subtle</div>
<div class="shadow bg-white p-4 rounded">Default</div>
<div class="shadow-lg bg-white p-4 rounded">Large</div>
<div class="shadow-inner bg-gray-100 p-4 rounded">Inset</div>

<!-- Hover shadow transition -->
<div class="shadow transition duration-300 hover:shadow-xl rounded bg-white p-4">
  Hover me
</div>

<!-- Arbitrary -->
<div class="shadow-[0_4px_24px_rgba(124,108,242,0.4)] bg-white rounded p-4">
  Glow shadow
</div>`}
        lang="html"
      />
      <ShadowDemo />
      <ClassTable
        rows={[
          { cls: 'shadow-none',  css: 'box-shadow: none' },
          { cls: 'shadow-sm',    css: '0 1px 2px rgba(0,0,0,0.05)' },
          { cls: 'shadow',       css: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)' },
          { cls: 'shadow-md',    css: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)' },
          { cls: 'shadow-lg',    css: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)' },
          { cls: 'shadow-xl',    css: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)' },
          { cls: 'shadow-2xl',   css: '0 25px 50px rgba(0,0,0,0.25)' },
          { cls: 'shadow-inner', css: 'inset 0 2px 4px rgba(0,0,0,0.06)' },
          { cls: 'shadow-[0_4px_6px_rgba(0,0,0,0.1)]', css: 'custom box-shadow', note: 'arbitrary — underscores → spaces' },
        ]}
      />
    </div>
  )
}

export function Opacity() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Effects</p>
      <h1>Opacity</h1>
      <p>Control element transparency with a numeric scale (0–100) or arbitrary values.</p>
      <CodeBlock
        code={`<div class="opacity-100">Fully visible</div>
<div class="opacity-50">Half transparent</div>
<div class="opacity-0">Invisible (still occupies space)</div>

<!-- Hover fade-in -->
<div class="opacity-50 transition hover:opacity-100">
  Fade in on hover
</div>

<!-- Arbitrary -->
<div class="opacity-[0.35]">35% opacity</div>`}
        lang="html"
      />
      <OpacityDemo />
      <ClassTable
        rows={[
          { cls: 'opacity-0',      css: 'opacity: 0' },
          { cls: 'opacity-5',      css: 'opacity: 0.05' },
          { cls: 'opacity-10',     css: 'opacity: 0.1' },
          { cls: 'opacity-25',     css: 'opacity: 0.25' },
          { cls: 'opacity-50',     css: 'opacity: 0.5' },
          { cls: 'opacity-75',     css: 'opacity: 0.75' },
          { cls: 'opacity-90',     css: 'opacity: 0.9' },
          { cls: 'opacity-100',    css: 'opacity: 1' },
          { cls: 'opacity-[0.35]', css: 'opacity: 0.35', note: 'arbitrary' },
        ]}
      />
    </div>
  )
}

export function Transitions() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Effects</p>
      <h1>Transitions</h1>
      <p>
        Smooth state changes. Combine <code>transition</code>, <code>duration-{'{n}'}</code>,
        and <code>ease-{'{type}'}</code> with any state modifier.
      </p>
      <CodeBlock
        code={`<!-- Standard hover transition -->
<button class="bg-blue-500 text-white px-4 py-2 rounded
               transition duration-200 ease-in-out
               hover:bg-blue-700 hover:shadow-lg">
  Hover me
</button>

<!-- Scale on hover with transform transition -->
<div class="transition-transform duration-300
            hover:scale-110 hover:rotate-3">
  Scale + rotate
</div>

<!-- Color transition with delay -->
<p class="transition-colors duration-500 delay-100
          hover:text-violet-500">
  Color change with delay
</p>`}
        lang="html"
      />
      <TransitionsDemo />
      <h2>Transition properties</h2>
      <ClassTable
        rows={[
          { cls: 'transition',           css: 'color, bg, border, opacity, shadow, transform; 150ms' },
          { cls: 'transition-all',       css: 'all properties; 150ms' },
          { cls: 'transition-colors',    css: 'color, background-color, border-color; 150ms' },
          { cls: 'transition-opacity',   css: 'opacity; 150ms' },
          { cls: 'transition-shadow',    css: 'box-shadow; 150ms' },
          { cls: 'transition-transform', css: 'transform; 150ms' },
          { cls: 'transition-none',      css: 'transition-property: none' },
        ]}
      />
      <h2>Duration</h2>
      <ClassTable
        rows={[
          { cls: 'duration-0',    css: 'transition-duration: 0ms' },
          { cls: 'duration-75',   css: 'transition-duration: 75ms' },
          { cls: 'duration-100',  css: 'transition-duration: 100ms' },
          { cls: 'duration-150',  css: 'transition-duration: 150ms', note: 'default' },
          { cls: 'duration-200',  css: 'transition-duration: 200ms' },
          { cls: 'duration-300',  css: 'transition-duration: 300ms' },
          { cls: 'duration-500',  css: 'transition-duration: 500ms' },
          { cls: 'duration-700',  css: 'transition-duration: 700ms' },
          { cls: 'duration-1000', css: 'transition-duration: 1000ms' },
          { cls: 'duration-[400ms]', css: 'transition-duration: 400ms', note: 'arbitrary' },
        ]}
      />
      <h2>Easing</h2>
      <ClassTable
        rows={[
          { cls: 'ease-linear',  css: 'transition-timing-function: linear' },
          { cls: 'ease-in',      css: 'transition-timing-function: cubic-bezier(0.4,0,1,1)' },
          { cls: 'ease-out',     css: 'transition-timing-function: cubic-bezier(0,0,0.2,1)' },
          { cls: 'ease-in-out',  css: 'transition-timing-function: cubic-bezier(0.4,0,0.2,1)' },
        ]}
      />
      <h2>Delay</h2>
      <ClassTable
        rows={[
          { cls: 'delay-0',    css: 'transition-delay: 0ms' },
          { cls: 'delay-75',   css: 'transition-delay: 75ms' },
          { cls: 'delay-100',  css: 'transition-delay: 100ms' },
          { cls: 'delay-150',  css: 'transition-delay: 150ms' },
          { cls: 'delay-200',  css: 'transition-delay: 200ms' },
          { cls: 'delay-300',  css: 'transition-delay: 300ms' },
          { cls: 'delay-500',  css: 'transition-delay: 500ms' },
          { cls: 'delay-700',  css: 'transition-delay: 700ms' },
          { cls: 'delay-1000', css: 'transition-delay: 1000ms' },
        ]}
      />
    </div>
  )
}

export function Transforms() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Effects</p>
      <h1>Transforms</h1>
      <p>
        snapcss uses CSS Transforms Level 2 individual properties (<code>scale</code>,
        <code>rotate</code>, <code>translate</code>) — multiple transforms on the same element compose naturally.
      </p>
      <CodeBlock
        code={`<!-- Scale on hover -->
<div class="transition-transform duration-200 hover:scale-110">
  Scale up on hover
</div>

<!-- Rotate -->
<div class="rotate-45 bg-blue-500 w-8 h-8">Rotated square</div>

<!-- Translate -->
<div class="translate-x-4 translate-y-[-8px]">Shifted</div>

<!-- Combined (compose naturally) -->
<div class="scale-110 rotate-12 translate-x-4">
  Multiple transforms
</div>

<!-- Transform origin -->
<div class="origin-top-left rotate-45">Rotate from top-left</div>`}
        lang="html"
      />
      <TransformsDemo />
      <h2>Scale</h2>
      <ClassTable
        rows={[
          { cls: 'scale-0',     css: 'scale: 0' },
          { cls: 'scale-50',    css: 'scale: 0.5' },
          { cls: 'scale-75',    css: 'scale: 0.75' },
          { cls: 'scale-90',    css: 'scale: 0.9' },
          { cls: 'scale-95',    css: 'scale: 0.95' },
          { cls: 'scale-100',   css: 'scale: 1' },
          { cls: 'scale-105',   css: 'scale: 1.05' },
          { cls: 'scale-110',   css: 'scale: 1.1' },
          { cls: 'scale-125',   css: 'scale: 1.25' },
          { cls: 'scale-150',   css: 'scale: 1.5' },
          { cls: 'scale-x-110', css: 'scale: 1.1 1',   note: 'x-axis only' },
          { cls: 'scale-y-110', css: 'scale: 1 1.1',   note: 'y-axis only' },
          { cls: 'scale-[1.35]', css: 'scale: 1.35',   note: 'arbitrary' },
        ]}
      />
      <h2>Rotate</h2>
      <ClassTable
        rows={[
          { cls: 'rotate-0',   css: 'rotate: 0deg' },
          { cls: 'rotate-1',   css: 'rotate: 1deg' },
          { cls: 'rotate-2',   css: 'rotate: 2deg' },
          { cls: 'rotate-3',   css: 'rotate: 3deg' },
          { cls: 'rotate-6',   css: 'rotate: 6deg' },
          { cls: 'rotate-12',  css: 'rotate: 12deg' },
          { cls: 'rotate-45',  css: 'rotate: 45deg' },
          { cls: 'rotate-90',  css: 'rotate: 90deg' },
          { cls: 'rotate-180', css: 'rotate: 180deg' },
          { cls: 'rotate-[-45deg]', css: 'rotate: -45deg', note: 'arbitrary negative' },
        ]}
      />
      <h2>Translate</h2>
      <ClassTable
        rows={[
          { cls: 'translate-x-0',   css: 'translate: 0 0' },
          { cls: 'translate-x-1',   css: 'translate: 0.25rem 0' },
          { cls: 'translate-x-2',   css: 'translate: 0.5rem 0' },
          { cls: 'translate-x-4',   css: 'translate: 1rem 0' },
          { cls: 'translate-x-8',   css: 'translate: 2rem 0' },
          { cls: 'translate-x-16',  css: 'translate: 4rem 0' },
          { cls: 'translate-y-0',   css: 'translate: 0 0' },
          { cls: 'translate-y-1',   css: 'translate: 0 0.25rem' },
          { cls: 'translate-y-2',   css: 'translate: 0 0.5rem' },
          { cls: 'translate-y-4',   css: 'translate: 0 1rem' },
          { cls: 'translate-y-8',   css: 'translate: 0 2rem' },
          { cls: 'translate-x-[-50%]', css: 'translate: -50% 0', note: 'arbitrary — centering trick' },
        ]}
      />
      <h2>Skew</h2>
      <ClassTable
        rows={[
          { cls: 'skew-x-0',  css: 'transform: skewX(0deg)' },
          { cls: 'skew-x-1',  css: 'transform: skewX(1deg)' },
          { cls: 'skew-x-2',  css: 'transform: skewX(2deg)' },
          { cls: 'skew-x-3',  css: 'transform: skewX(3deg)' },
          { cls: 'skew-x-6',  css: 'transform: skewX(6deg)' },
          { cls: 'skew-x-12', css: 'transform: skewX(12deg)' },
          { cls: 'skew-y-0',  css: 'transform: skewY(0deg)' },
          { cls: 'skew-y-1',  css: 'transform: skewY(1deg)' },
          { cls: 'skew-y-2',  css: 'transform: skewY(2deg)' },
          { cls: 'skew-y-3',  css: 'transform: skewY(3deg)' },
          { cls: 'skew-y-6',  css: 'transform: skewY(6deg)' },
          { cls: 'skew-y-12', css: 'transform: skewY(12deg)' },
        ]}
      />
      <h2>Transform Origin</h2>
      <ClassTable
        rows={[
          { cls: 'origin-center',       css: 'transform-origin: center' },
          { cls: 'origin-top',          css: 'transform-origin: top' },
          { cls: 'origin-top-right',    css: 'transform-origin: top right' },
          { cls: 'origin-right',        css: 'transform-origin: right' },
          { cls: 'origin-bottom-right', css: 'transform-origin: bottom right' },
          { cls: 'origin-bottom',       css: 'transform-origin: bottom' },
          { cls: 'origin-bottom-left',  css: 'transform-origin: bottom left' },
          { cls: 'origin-left',         css: 'transform-origin: left' },
          { cls: 'origin-top-left',     css: 'transform-origin: top left' },
        ]}
      />
    </div>
  )
}
