import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const palette: Record<string, Record<number, string>> = {
  slate:   { 50:'#f8fafc', 100:'#f1f5f9', 200:'#e2e8f0', 300:'#cbd5e1', 400:'#94a3b8', 500:'#64748b', 600:'#475569', 700:'#334155', 800:'#1e293b', 900:'#0f172a', 950:'#020617' },
  gray:    { 50:'#f9fafb', 100:'#f3f4f6', 200:'#e5e7eb', 300:'#d1d5db', 400:'#9ca3af', 500:'#6b7280', 600:'#4b5563', 700:'#374151', 800:'#1f2937', 900:'#111827', 950:'#030712' },
  zinc:    { 50:'#fafafa', 100:'#f4f4f5', 200:'#e4e4e7', 300:'#d4d4d8', 400:'#a1a1aa', 500:'#71717a', 600:'#52525b', 700:'#3f3f46', 800:'#27272a', 900:'#18181b', 950:'#09090b' },
  neutral: { 50:'#fafafa', 100:'#f5f5f5', 200:'#e5e5e5', 300:'#d4d4d4', 400:'#a3a3a3', 500:'#737373', 600:'#525252', 700:'#404040', 800:'#262626', 900:'#171717', 950:'#0a0a0a' },
  stone:   { 50:'#fafaf9', 100:'#f5f5f4', 200:'#e7e5e4', 300:'#d6d3d1', 400:'#a8a29e', 500:'#78716c', 600:'#57534e', 700:'#44403c', 800:'#292524', 900:'#1c1917', 950:'#0c0a09' },
  red:     { 50:'#fef2f2', 100:'#fee2e2', 200:'#fecaca', 300:'#fca5a5', 400:'#f87171', 500:'#ef4444', 600:'#dc2626', 700:'#b91c1c', 800:'#991b1b', 900:'#7f1d1d', 950:'#450a0a' },
  orange:  { 50:'#fff7ed', 100:'#ffedd5', 200:'#fed7aa', 300:'#fdba74', 400:'#fb923c', 500:'#f97316', 600:'#ea580c', 700:'#c2410c', 800:'#9a3412', 900:'#7c2d12', 950:'#431407' },
  amber:   { 50:'#fffbeb', 100:'#fef3c7', 200:'#fde68a', 300:'#fcd34d', 400:'#fbbf24', 500:'#f59e0b', 600:'#d97706', 700:'#b45309', 800:'#92400e', 900:'#78350f', 950:'#451a03' },
  yellow:  { 50:'#fefce8', 100:'#fef9c3', 200:'#fef08a', 300:'#fde047', 400:'#facc15', 500:'#eab308', 600:'#ca8a04', 700:'#a16207', 800:'#854d0e', 900:'#713f12', 950:'#422006' },
  lime:    { 50:'#f7fee7', 100:'#ecfccb', 200:'#d9f99d', 300:'#bef264', 400:'#a3e635', 500:'#84cc16', 600:'#65a30d', 700:'#4d7c0f', 800:'#3f6212', 900:'#365314', 950:'#1a2e05' },
  green:   { 50:'#f0fdf4', 100:'#dcfce7', 200:'#bbf7d0', 300:'#86efac', 400:'#4ade80', 500:'#22c55e', 600:'#16a34a', 700:'#15803d', 800:'#166534', 900:'#14532d', 950:'#052e16' },
  emerald: { 50:'#ecfdf5', 100:'#d1fae5', 200:'#a7f3d0', 300:'#6ee7b7', 400:'#34d399', 500:'#10b981', 600:'#059669', 700:'#047857', 800:'#065f46', 900:'#064e3b', 950:'#022c22' },
  teal:    { 50:'#f0fdfa', 100:'#ccfbf1', 200:'#99f6e4', 300:'#5eead4', 400:'#2dd4bf', 500:'#14b8a6', 600:'#0d9488', 700:'#0f766e', 800:'#115e59', 900:'#134e4a', 950:'#042f2e' },
  cyan:    { 50:'#ecfeff', 100:'#cffafe', 200:'#a5f3fc', 300:'#67e8f9', 400:'#22d3ee', 500:'#06b6d4', 600:'#0891b2', 700:'#0e7490', 800:'#155e75', 900:'#164e63', 950:'#083344' },
  sky:     { 50:'#f0f9ff', 100:'#e0f2fe', 200:'#bae6fd', 300:'#7dd3fc', 400:'#38bdf8', 500:'#0ea5e9', 600:'#0284c7', 700:'#0369a1', 800:'#075985', 900:'#0c4a6e', 950:'#082f49' },
  blue:    { 50:'#eff6ff', 100:'#dbeafe', 200:'#bfdbfe', 300:'#93c5fd', 400:'#60a5fa', 500:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8', 800:'#1e40af', 900:'#1e3a8a', 950:'#172554' },
  indigo:  { 50:'#eef2ff', 100:'#e0e7ff', 200:'#c7d2fe', 300:'#a5b4fc', 400:'#818cf8', 500:'#6366f1', 600:'#4f46e5', 700:'#4338ca', 800:'#3730a3', 900:'#312e81', 950:'#1e1b4b' },
  violet:  { 50:'#f5f3ff', 100:'#ede9fe', 200:'#ddd6fe', 300:'#c4b5fd', 400:'#a78bfa', 500:'#8b5cf6', 600:'#7c3aed', 700:'#6d28d9', 800:'#5b21b6', 900:'#4c1d95', 950:'#2e1065' },
  purple:  { 50:'#faf5ff', 100:'#f3e8ff', 200:'#e9d5ff', 300:'#d8b4fe', 400:'#c084fc', 500:'#a855f7', 600:'#9333ea', 700:'#7e22ce', 800:'#6b21a8', 900:'#581c87', 950:'#3b0764' },
  fuchsia: { 50:'#fdf4ff', 100:'#fae8ff', 200:'#f5d0fe', 300:'#f0abfc', 400:'#e879f9', 500:'#d946ef', 600:'#c026d3', 700:'#a21caf', 800:'#86198f', 900:'#701a75', 950:'#4a044e' },
  pink:    { 50:'#fdf2f8', 100:'#fce7f3', 200:'#fbcfe8', 300:'#f9a8d4', 400:'#f472b6', 500:'#ec4899', 600:'#db2777', 700:'#be185d', 800:'#9d174d', 900:'#831843', 950:'#500724' },
  rose:    { 50:'#fff1f2', 100:'#ffe4e6', 200:'#fecdd3', 300:'#fda4af', 400:'#fb7185', 500:'#f43f5e', 600:'#e11d48', 700:'#be123c', 800:'#9f1239', 900:'#881337', 950:'#4c0519' },
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

function ColorSwatch({ family, shade, hex, prefix = 'bg' }: {
  family: string; shade: number; hex: string; prefix?: string
}) {
  const [copied, setCopied] = useState(false)
  const cls = `${prefix}-${family}-${shade}`

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(cls)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="color-swatch" style={{ background: hex }}>
      <div className="color-swatch-tooltip">
        <div className="color-swatch-tooltip-row">
          <span className="color-swatch-cls">{cls}</span>
          <button className={`color-swatch-copy ${copied ? 'copied' : ''}`} onClick={copy} title="Copy class name">
            {copied ? <Check size={11} /> : <Copy size={11} />}
          </button>
        </div>
        <span className="color-swatch-hex">{hex}</span>
      </div>
      <span
        className="color-swatch-shade"
        style={{ color: isLight(hex) ? '#00000066' : '#ffffff55' }}
      >
        {shade}
      </span>
    </div>
  )
}

// ─── Color Palette ─────────────────────────────────────────────────────────────

export function ColorPalette() {
  const [activePrefix, setActivePrefix] = useState<'bg' | 'text'>('bg')

  const special = [
    { label: 'white',       hex: '#ffffff',     bg: '#ffffff' },
    { label: 'black',       hex: '#000000',     bg: '#000000' },
    { label: 'transparent', hex: 'transparent', bg: 'transparent' },
  ]

  return (
    <div className="doc-section">
      <p className="doc-section-label">Colors</p>
      <h1>Color Palette</h1>
      <p>
        snapcss ships a full <strong>22-family × 11-shade</strong> color palette (shades 50–950).
        Every color works with <code>bg-</code> for backgrounds and <code>text-</code> for text.
        Hover any swatch to copy the class name.
      </p>

      <CodeBlock
        code={`<!-- Background -->
<div class="bg-violet-500 p-4 rounded-lg">Violet background</div>

<!-- Text -->
<p class="text-blue-600 font-semibold">Blue text</p>

<!-- Special values -->
<div class="bg-white">White background</div>
<p class="text-black">Black text</p>

<!-- Arbitrary hex / rgb -->
<div class="bg-[#7c6cf2]">Custom hex background</div>
<p class="text-[rgba(124,108,242,0.9)]">Custom rgba text</p>`}
        lang="html"
      />

      <h2>Special values</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {special.map(({ label, hex, bg }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 64,
              height: 44,
              background: bg,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {label === 'transparent' && (
                <span style={{ fontSize: '0.6rem', color: '#6b7280', fontFamily: 'var(--font-mono)' }}>none</span>
              )}
            </div>
            <code style={{ fontSize: '0.7rem', color: 'var(--accent-light)' }}>{label}</code>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{hex}</span>
          </div>
        ))}
      </div>

      <h2>Full palette</h2>

      {/* Prefix toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        {(['bg', 'text'] as const).map(p => (
          <button
            key={p}
            onClick={() => setActivePrefix(p)}
            style={{
              padding: '4px 14px',
              borderRadius: 20,
              border: '1px solid',
              borderColor: activePrefix === p ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
              background: activePrefix === p ? 'rgba(124,108,242,0.15)' : 'transparent',
              color: activePrefix === p ? 'var(--accent-light)' : 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {p}-*
          </button>
        ))}
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          — hover a swatch to copy the class
        </span>
      </div>

      <div className="color-palette">
        <div className="color-row color-row-header">
          <span className="color-family-label" />
          {shades.map(s => (
            <span key={s} className="color-shade-label">{s}</span>
          ))}
        </div>

        {Object.entries(palette).map(([family, shadeMap]) => (
          <div key={family} className="color-row">
            <span className="color-family-label">{family}</span>
            {shades.map(shade => (
              <ColorSwatch key={shade} family={family} shade={shade} hex={shadeMap[shade]} prefix={activePrefix} />
            ))}
          </div>
        ))}
      </div>

      <ClassTable
        rows={[
          { cls: `bg-{color}-{shade}`,   css: 'background-color: {hex}', note: 'e.g. bg-blue-500' },
          { cls: `text-{color}-{shade}`, css: 'color: {hex}',            note: 'e.g. text-red-700' },
          { cls: 'bg-white',             css: 'background-color: #ffffff' },
          { cls: 'bg-black',             css: 'background-color: #000000' },
          { cls: 'bg-transparent',       css: 'background-color: transparent' },
          { cls: 'text-white',           css: 'color: #ffffff' },
          { cls: 'text-black',           css: 'color: #000000' },
          { cls: 'bg-[#7c6cf2]',         css: 'background-color: #7c6cf2', note: 'arbitrary' },
          { cls: 'text-[rgba(0,0,0,.5)]',css: 'color: rgba(0,0,0,0.5)',   note: 'arbitrary' },
        ]}
      />
    </div>
  )
}

// ─── Background Color ─────────────────────────────────────────────────────────

export function BackgroundColor() {
  const demos = [
    { family: 'blue',    shade: 100, hex: '#dbeafe', label: 'Light tint' },
    { family: 'blue',    shade: 500, hex: '#3b82f6', label: 'Mid tone' },
    { family: 'blue',    shade: 900, hex: '#1e3a8a', label: 'Deep shade' },
    { family: 'violet',  shade: 500, hex: '#8b5cf6', label: 'Accent' },
    { family: 'emerald', shade: 500, hex: '#10b981', label: 'Success' },
    { family: 'rose',    shade: 500, hex: '#f43f5e', label: 'Danger' },
    { family: 'amber',   shade: 400, hex: '#fbbf24', label: 'Warning' },
    { family: 'slate',   shade: 800, hex: '#1e293b', label: 'Dark surface' },
  ]

  return (
    <div className="doc-section">
      <p className="doc-section-label">Backgrounds & Colors</p>
      <h1>Background Color</h1>
      <p>
        Apply a background color using <code>bg-{'{color}-{shade}'}</code>.
        The full 22-family palette is on the{' '}
        <a href="#/docs/color-palette" style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Color Palette</a> page.
      </p>

      <CodeBlock
        code={`<div class="bg-blue-500">Blue background</div>
<div class="bg-red-100">Red 100 (light tint)</div>
<div class="bg-gray-950">Near-black</div>

<!-- Special values -->
<div class="bg-white">White</div>
<div class="bg-black">Black</div>
<div class="bg-transparent">Transparent</div>

<!-- Arbitrary -->
<div class="bg-[#7c6cf2]">Arbitrary hex</div>
<div class="bg-[rgb(124,108,242)]">Arbitrary rgb</div>`}
        lang="html"
      />

      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '1rem 0 1.75rem' }}>
        {demos.map(({ family, shade, hex, label }) => (
          <div
            key={`${family}-${shade}`}
            style={{
              background: hex,
              padding: '14px 18px',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: 140,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: isLight(hex) ? '#1f2937' : '#f8fafc',
            }}>
              bg-{family}-{shade}
            </span>
            <span style={{
              fontSize: '0.68rem',
              color: isLight(hex) ? '#374151cc' : '#e2e8f0aa',
            }}>
              {hex} · {label}
            </span>
          </div>
        ))}
      </div>

      <ClassTable
        rows={[
          { cls: 'bg-{color}-{shade}', css: 'background-color: {hex}',    note: 'e.g. bg-blue-500' },
          { cls: 'bg-white',           css: 'background-color: #ffffff' },
          { cls: 'bg-black',           css: 'background-color: #000000' },
          { cls: 'bg-transparent',     css: 'background-color: transparent' },
          { cls: 'bg-[#7c6cf2]',       css: 'background-color: #7c6cf2',  note: 'arbitrary hex' },
          { cls: 'bg-[rgb(0,0,0)]',    css: 'background-color: rgb(0,0,0)', note: 'arbitrary rgb' },
        ]}
      />
    </div>
  )
}

// ─── Background Extras ────────────────────────────────────────────────────────

export function BackgroundExtras() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Backgrounds & Colors</p>
      <h1>Background Extras</h1>
      <p>Control background size, position, repeat, and attachment.</p>
      <CodeBlock
        code={`<div class="bg-[url('/photo.jpg')] bg-cover bg-center bg-no-repeat h-64">
  Hero image
</div>

<!-- Fixed parallax background -->
<div class="bg-[url('/texture.png')] bg-fixed bg-repeat">
  Parallax texture
</div>`}
        lang="html"
      />
      <h2>Size</h2>
      <ClassTable
        rows={[
          { cls: 'bg-auto',    css: 'background-size: auto' },
          { cls: 'bg-cover',   css: 'background-size: cover' },
          { cls: 'bg-contain', css: 'background-size: contain' },
        ]}
      />
      <h2>Position</h2>
      <ClassTable
        rows={[
          { cls: 'bg-center',       css: 'background-position: center' },
          { cls: 'bg-top',          css: 'background-position: top' },
          { cls: 'bg-bottom',       css: 'background-position: bottom' },
          { cls: 'bg-left',         css: 'background-position: left' },
          { cls: 'bg-right',        css: 'background-position: right' },
          { cls: 'bg-left-top',     css: 'background-position: left top' },
          { cls: 'bg-right-top',    css: 'background-position: right top' },
          { cls: 'bg-left-bottom',  css: 'background-position: left bottom' },
          { cls: 'bg-right-bottom', css: 'background-position: right bottom' },
        ]}
      />
      <h2>Repeat & Attachment</h2>
      <ClassTable
        rows={[
          { cls: 'bg-no-repeat',     css: 'background-repeat: no-repeat' },
          { cls: 'bg-repeat',        css: 'background-repeat: repeat' },
          { cls: 'bg-repeat-x',      css: 'background-repeat: repeat-x' },
          { cls: 'bg-repeat-y',      css: 'background-repeat: repeat-y' },
          { cls: 'bg-repeat-round',  css: 'background-repeat: round',   note: 'scales to avoid clipping' },
          { cls: 'bg-repeat-space',  css: 'background-repeat: space',   note: 'spaced without clipping' },
          { cls: 'bg-fixed',         css: 'background-attachment: fixed' },
          { cls: 'bg-local',         css: 'background-attachment: local' },
          { cls: 'bg-scroll',        css: 'background-attachment: scroll' },
        ]}
      />
    </div>
  )
}

// ─── Text Color ────────────────────────────────────────────────────────────────

export function TextColor() {
  const textDemos = [
    { family: 'gray',    shade: 400, hex: '#9ca3af', sample: 'Muted placeholder text' },
    { family: 'gray',    shade: 700, hex: '#374151', sample: 'Default body text' },
    { family: 'blue',    shade: 600, hex: '#2563eb', sample: 'Hyperlink or action' },
    { family: 'red',     shade: 500, hex: '#ef4444', sample: 'Error or danger message' },
    { family: 'green',   shade: 600, hex: '#16a34a', sample: 'Success confirmation' },
    { family: 'amber',   shade: 600, hex: '#d97706', sample: 'Warning notice' },
    { family: 'violet',  shade: 600, hex: '#7c3aed', sample: 'Accent / brand text' },
    { family: 'rose',    shade: 500, hex: '#f43f5e', sample: 'Highlight or badge' },
  ]

  return (
    <div className="doc-section">
      <p className="doc-section-label">Backgrounds & Colors</p>
      <h1>Text Color</h1>
      <p>
        Apply text color using <code>text-{'{color}-{shade}'}</code>. The same
        22-family palette is available. See the{' '}
        <a href="#/docs/color-palette" style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Color Palette</a> for all shades.
        When an arbitrary value looks like a CSS size unit it is treated as font-size; otherwise as color.
      </p>

      <CodeBlock
        code={`<p class="text-gray-700">Body gray</p>
<p class="text-blue-600">Blue link</p>
<h1 class="text-white">White heading</h1>

<!-- Arbitrary colors -->
<p class="text-[#7c6cf2]">Arbitrary hex</p>
<p class="text-[rgba(0,0,0,0.5)]">Semi-transparent</p>

<!-- text-xl is font-size, text-blue-500 is color — resolver distinguishes automatically -->
<p class="text-xl text-blue-500">Large blue text</p>`}
        lang="html"
      />

      <h2>Examples</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 10,
        margin: '1rem 0 1.75rem',
      }}>
        {textDemos.map(({ family, shade, hex, sample }) => (
          <div
            key={`${family}-${shade}`}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span style={{ color: hex, fontSize: '0.95rem', fontWeight: 500 }}>{sample}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: hex, flexShrink: 0 }} />
              <code style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>text-{family}-{shade}</code>
              <code style={{ fontSize: '0.65rem', color: 'var(--text-muted)', opacity: 0.6 }}>{hex}</code>
            </div>
          </div>
        ))}
      </div>

      <ClassTable
        rows={[
          { cls: 'text-{color}-{shade}', css: 'color: {hex value}',         note: 'e.g. text-blue-500' },
          { cls: 'text-white',           css: 'color: #ffffff' },
          { cls: 'text-black',           css: 'color: #000000' },
          { cls: 'text-transparent',     css: 'color: transparent' },
          { cls: 'text-[#7c6cf2]',       css: 'color: #7c6cf2',             note: 'arbitrary hex' },
          { cls: 'text-[rgba(0,0,0,.5)]',css: 'color: rgba(0,0,0,0.5)',     note: 'arbitrary rgba' },
        ]}
      />
    </div>
  )
}
