import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

// ─── Cursor ──────────────────────────────────────────────────────────────────

export function Cursor() {
  const cursors: Array<{ label: string; cursor: React.CSSProperties['cursor'] }> = [
    { label: 'cursor-auto',        cursor: 'auto' },
    { label: 'cursor-default',     cursor: 'default' },
    { label: 'cursor-pointer',     cursor: 'pointer' },
    { label: 'cursor-wait',        cursor: 'wait' },
    { label: 'cursor-text',        cursor: 'text' },
    { label: 'cursor-move',        cursor: 'move' },
    { label: 'cursor-not-allowed', cursor: 'not-allowed' },
    { label: 'cursor-grab',        cursor: 'grab' },
    { label: 'cursor-grabbing',    cursor: 'grabbing' },
    { label: 'cursor-crosshair',   cursor: 'crosshair' },
    { label: 'cursor-zoom-in',     cursor: 'zoom-in' },
    { label: 'cursor-zoom-out',    cursor: 'zoom-out' },
  ]

  return (
    <div className="doc-section">
      <p className="doc-section-label">Interactivity</p>
      <h1>Cursor</h1>
      <p>Control the mouse cursor appearance when hovering over an element.</p>

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        Hover each box to see the cursor change.
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        {cursors.map(({ label, cursor }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 110,
              height: 56,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor,
              transition: 'border-color 150ms',
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {String(cursor)}
              </span>
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-light)',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <ClassTable
        rows={[
          { cls: 'cursor-auto',        css: 'cursor: auto' },
          { cls: 'cursor-default',     css: 'cursor: default' },
          { cls: 'cursor-pointer',     css: 'cursor: pointer' },
          { cls: 'cursor-wait',        css: 'cursor: wait' },
          { cls: 'cursor-text',        css: 'cursor: text' },
          { cls: 'cursor-move',        css: 'cursor: move' },
          { cls: 'cursor-not-allowed', css: 'cursor: not-allowed' },
          { cls: 'cursor-grab',        css: 'cursor: grab' },
          { cls: 'cursor-grabbing',    css: 'cursor: grabbing' },
          { cls: 'cursor-crosshair',   css: 'cursor: crosshair' },
          { cls: 'cursor-zoom-in',     css: 'cursor: zoom-in' },
          { cls: 'cursor-zoom-out',    css: 'cursor: zoom-out' },
          { cls: 'cursor-none',        css: 'cursor: none' },
        ]}
      />
      <CodeBlock
        code={`<!-- Interactive button pattern -->
<button class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded
               hover:bg-blue-600 transition duration-150">
  Click me
</button>

<!-- Disabled state -->
<button class="cursor-not-allowed opacity-50" disabled>Disabled</button>`}
        lang="html"
      />
    </div>
  )
}

// ─── PointerEvents ────────────────────────────────────────────────────────────

export function PointerEvents() {
  const boxBase: React.CSSProperties = {
    borderRadius: 8,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    minWidth: 180,
  }

  return (
    <div className="doc-section">
      <p className="doc-section-label">Interactivity</p>
      <h1>Pointer Events & User Select</h1>
      <p>Control whether an element receives pointer events and text selection behavior.</p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '1.5rem',
      }}>
        {/* pointer-events: none */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            ...boxBase,
            background: 'rgba(139,92,246,0.12)',
            border: '1.5px dashed rgba(139,92,246,0.45)',
            opacity: 0.5,
            cursor: 'default',
          }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              pointer-events: none
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              clicks pass through
            </span>
          </div>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-light)',
            textAlign: 'center',
          }}>
            pointer-events-none
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
            ignores all mouse events
          </span>
        </div>

        {/* user-select: none */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            ...boxBase,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            userSelect: 'none',
            cursor: 'default',
          }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              user-select: none
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Try selecting this text
            </span>
          </div>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-light)',
            textAlign: 'center',
          }}>
            select-none
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
            text cannot be selected
          </span>
        </div>

        {/* user-select: all */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            ...boxBase,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            userSelect: 'all',
            cursor: 'text',
          }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              user-select: all
            </span>
            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)' }}>
              console.log("click to select")
            </span>
          </div>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-light)',
            textAlign: 'center',
          }}>
            select-all
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
            click selects everything
          </span>
        </div>
      </div>

      <CodeBlock
        code={`<!-- Overlay that passes clicks through -->
<div class="pointer-events-none absolute inset-0">
  Click-through overlay
</div>

<!-- Prevent text selection on UI elements -->
<div class="select-none cursor-pointer">
  Can't select this text
</div>

<!-- Allow selecting all (code blocks) -->
<pre class="select-all font-mono">console.log("click to select all")</pre>`}
        lang="html"
      />
      <ClassTable
        rows={[
          { cls: 'pointer-events-none', css: 'pointer-events: none' },
          { cls: 'pointer-events-auto', css: 'pointer-events: auto' },
          { cls: 'select-none',         css: 'user-select: none' },
          { cls: 'select-text',         css: 'user-select: text' },
          { cls: 'select-all',          css: 'user-select: all' },
          { cls: 'select-auto',         css: 'user-select: auto' },
        ]}
      />
    </div>
  )
}

// ─── AspectRatio ──────────────────────────────────────────────────────────────

export function AspectRatio() {
  const ratios: Array<{
    label: string
    ratio: string
    width: number
    bg: string
  }> = [
    {
      label: '1 / 1',
      ratio: '1/1',
      width: 80,
      bg: 'linear-gradient(135deg, rgba(124,108,242,0.45) 0%, rgba(124,108,242,0.2) 100%)',
    },
    {
      label: '16 / 9',
      ratio: '16/9',
      width: 160,
      bg: 'linear-gradient(135deg, rgba(96,165,250,0.45) 0%, rgba(96,165,250,0.2) 100%)',
    },
    {
      label: '4 / 3',
      ratio: '4/3',
      width: 120,
      bg: 'linear-gradient(135deg, rgba(52,211,153,0.45) 0%, rgba(52,211,153,0.2) 100%)',
    },
    {
      label: '21 / 9',
      ratio: '21/9',
      width: 200,
      bg: 'linear-gradient(135deg, rgba(251,191,36,0.45) 0%, rgba(251,191,36,0.2) 100%)',
    },
  ]

  return (
    <div className="doc-section">
      <p className="doc-section-label">Interactivity</p>
      <h1>Aspect Ratio</h1>
      <p>Maintain a consistent width-to-height ratio.</p>

      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '20px' }}>
          {ratios.map(({ label, ratio, width, bg }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width,
                aspectRatio: ratio,
                background: bg,
                borderRadius: 6,
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                }}>
                  {label}
                </span>
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-light)',
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        code={`<!-- Square container -->
<div class="aspect-square w-32 bg-blue-100">Square</div>

<!-- 16:9 video placeholder -->
<div class="aspect-video w-full bg-gray-900">
  <video class="w-full h-full object-cover" src="…" />
</div>

<!-- Custom ratio (4:3) -->
<div class="aspect-[4/3] w-full bg-gray-100">4:3</div>`}
        lang="html"
      />
      <ClassTable
        rows={[
          { cls: 'aspect-auto',   css: 'aspect-ratio: auto' },
          { cls: 'aspect-square', css: 'aspect-ratio: 1 / 1' },
          { cls: 'aspect-video',  css: 'aspect-ratio: 16 / 9' },
          { cls: 'aspect-[4/3]',  css: 'aspect-ratio: 4/3',   note: 'arbitrary' },
          { cls: 'aspect-[21/9]', css: 'aspect-ratio: 21/9',  note: 'ultrawide' },
        ]}
      />
    </div>
  )
}

// ─── ObjectFit ────────────────────────────────────────────────────────────────

const imgGradient = 'linear-gradient(135deg, #7c6cf2 0%, #60a5fa 50%, #34d399 100%)'

const objectFitModes: Array<{
  cls: string
  desc: string
  innerStyle: React.CSSProperties
}> = [
  {
    cls: 'object-contain',
    desc: 'fits inside',
    innerStyle: {
      width: 80,
      height: 50,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: imgGradient,
      borderRadius: 3,
    },
  },
  {
    cls: 'object-cover',
    desc: 'fills, may clip',
    innerStyle: {
      width: '100%',
      height: '100%',
      background: imgGradient,
    },
  },
  {
    cls: 'object-fill',
    desc: 'stretched',
    innerStyle: {
      width: '100%',
      height: '100%',
      background: imgGradient,
    },
  },
  {
    cls: 'object-none',
    desc: 'original size, clipped',
    innerStyle: {
      width: 160,
      height: 100,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: imgGradient,
    },
  },
  {
    cls: 'object-scale-down',
    desc: 'scaled down',
    innerStyle: {
      width: 80,
      height: 50,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: imgGradient,
      borderRadius: 3,
    },
  },
]

export function ObjectFit() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Interactivity</p>
      <h1>Object Fit & Position</h1>
      <p>Control how replaced elements (images, videos) fit within their container.</p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '1.5rem',
      }}>
        {objectFitModes.map(({ cls, desc, innerStyle }) => (
          <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 120,
              height: 80,
              overflow: 'hidden',
              position: 'relative',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 6,
            }}>
              <div style={innerStyle} />
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-light)',
              textAlign: 'center',
            }}>
              {cls}
            </span>
            <span style={{
              fontSize: '0.68rem',
              color: 'var(--text-subtle)',
              textAlign: 'center',
            }}>
              {desc}
            </span>
          </div>
        ))}
      </div>

      <CodeBlock
        code={`<!-- Cover image that fills and crops -->
<img class="w-full h-48 object-cover object-center"
     src="photo.jpg" alt="Cover" />

<!-- Contain (letterbox) -->
<img class="w-full h-48 object-contain object-center"
     src="logo.png" alt="Logo" />

<!-- Video fill -->
<video class="w-full h-full object-cover" autoplay loop />`}
        lang="html"
      />
      <h2>Object Fit</h2>
      <ClassTable
        rows={[
          { cls: 'object-contain',    css: 'object-fit: contain' },
          { cls: 'object-cover',      css: 'object-fit: cover' },
          { cls: 'object-fill',       css: 'object-fit: fill' },
          { cls: 'object-none',       css: 'object-fit: none' },
          { cls: 'object-scale-down', css: 'object-fit: scale-down' },
        ]}
      />
      <h2>Object Position</h2>
      <ClassTable
        rows={[
          { cls: 'object-center',       css: 'object-position: center' },
          { cls: 'object-top',          css: 'object-position: top' },
          { cls: 'object-bottom',       css: 'object-position: bottom' },
          { cls: 'object-left',         css: 'object-position: left' },
          { cls: 'object-right',        css: 'object-position: right' },
          { cls: 'object-left-top',     css: 'object-position: left top' },
          { cls: 'object-right-top',    css: 'object-position: right top' },
          { cls: 'object-left-bottom',  css: 'object-position: left bottom' },
          { cls: 'object-right-bottom', css: 'object-position: right bottom' },
        ]}
      />
    </div>
  )
}
