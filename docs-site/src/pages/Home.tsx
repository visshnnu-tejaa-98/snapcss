import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

// ── window.snapcss type ───────────────────────────────────────────────────────
declare global {
  interface Window {
    snapcss: {
      compile: (cls: string) => {
        base: Record<string, string>
        hover: Record<string, string>
        focus: Record<string, string>
        active: Record<string, string>
        dark: Record<string, string>
        responsive: Array<{ bp: string; style: Record<string, string> }>
      }
      apply: (el: HTMLElement, compiled: ReturnType<Window['snapcss']['compile']>) => void
      resolve: (cls: string) => Record<string, string> | null
      parse: (cls: string) => { variant: string[] | null; base: string }
    }
  }
}

// ── Playground ────────────────────────────────────────────────────────────────
const DEFAULT_CLASSES = 'p-8 px-12 bg-cyan-500 text-black text-2xl font-bold rounded-2xl shadow-2xl hover:bg-violet-500 hover:text-white'

const CHIPS = [
  'bg-violet-500', 'bg-pink-500', 'bg-emerald-400',
  'text-white', 'text-black',
  'rounded-full', 'rounded-none',
  'p-4', 'p-12', 'px-16',
  'shadow-lg', 'shadow-2xl',
  'hover:bg-pink-500', 'hover:rounded-full',
  'text-3xl', 'text-xs', 'tracking-widest',
  'border-4', 'border-cyan-400',
]

function ClassInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const tokens = useMemo(() => {
    const out: Array<{ t: string; k: string }> = []
    const re = /(\S+)|(\s+)/g
    let m: RegExpExecArray | null
    while ((m = re.exec(value))) {
      if (m[1]) out.push({ t: m[1], k: m[1].includes(':') ? 'var' : 'cls' })
      else out.push({ t: m[2], k: 'sp' })
    }
    return out
  }, [value])

  return (
    <div style={{ position: 'relative', padding: '14px 18px 6px' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '14px 18px 6px 18px',
          fontFamily: 'var(--hp-mono)', fontSize: 13.5, lineHeight: 1.65,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          pointerEvents: 'none', color: 'transparent',
        }}
      >
        {tokens.map((tok, i) => {
          if (tok.k === 'sp') return <span key={i}>{tok.t}</span>
          if (tok.k === 'var') {
            const idx = tok.t.indexOf(':')
            return (
              <span key={i}>
                <span style={{ color: '#f472b6' }}>{tok.t.slice(0, idx)}</span>
                <span style={{ color: '#737373' }}>:</span>
                <span style={{ color: '#22d3ee' }}>{tok.t.slice(idx + 1)}</span>
              </span>
            )
          }
          return <span key={i} style={{ color: '#22d3ee' }}>{tok.t}</span>
        })}
      </div>
      <textarea
        value={value}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', minHeight: 70,
          fontFamily: 'var(--hp-mono)', fontSize: 13.5, lineHeight: 1.65,
          color: 'rgba(250,250,250,0.0)', caretColor: '#fafafa',
          background: 'transparent', border: 0, outline: 0, resize: 'none', padding: 0,
        }}
      />
    </div>
  )
}

function Playground() {
  const [value, setValue] = useState(DEFAULT_CLASSES)
  const [hovered, setHovered] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const [meta, setMeta] = useState({ count: 0, recognized: 0, css: 0 })
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    const check = () => { if (window.snapcss) setEngineReady(true) }
    check()
    const t = setInterval(check, 100)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!targetRef.current || !engineReady) return
    const compiled = window.snapcss.compile(value)
    window.snapcss.apply(targetRef.current, compiled)
    const all = value.trim() ? value.trim().split(/\s+/) : []
    const recognized = all.filter((c) => {
      const { base } = window.snapcss.parse(c)
      return window.snapcss.resolve(base) != null
    }).length
    const cssCount =
      Object.keys(compiled.base).length +
      Object.keys(compiled.hover).length +
      Object.keys(compiled.focus).length +
      Object.keys(compiled.active).length +
      compiled.responsive.reduce((a, r) => a + Object.keys(r.style).length, 0)
    setMeta({ count: all.length, recognized, css: cssCount })
  }, [value, engineReady])

  const norm = (k: string) => {
    if (k.startsWith('padding')) return 'padding'
    if (k.startsWith('margin')) return 'margin'
    if (k.startsWith('border') && k !== 'borderRadius') return 'border'
    return k
  }

  const classConflicts = (a: string, b: string) => {
    if (!window.snapcss) return false
    const ca = window.snapcss.compile(a)
    const cb = window.snapcss.compile(b)
    for (const bucket of ['base', 'hover', 'focus', 'active', 'dark'] as const) {
      const ka = new Set(Object.keys(ca[bucket] as Record<string,string>).map(norm))
      const kb = Object.keys(cb[bucket] as Record<string,string>).map(norm)
      if (kb.some((k) => ka.has(k))) return true
    }
    return false
  }

  const toggleChip = (chip: string) => {
    let parts = value.trim().split(/\s+/).filter(Boolean)
    if (parts.includes(chip)) { setValue(parts.filter((p) => p !== chip).join(' ')); return }
    parts = parts.filter((p) => !classConflicts(p, chip))
    parts.push(chip)
    setValue(parts.join(' '))
  }

  const activeChips = new Set(value.trim().split(/\s+/))

  return (
    <div className="hp-pg">
      <div className="hp-pg-head">
        <div className="hp-dots"><i /><i /><i /></div>
        <span className="hp-pg-label">playground.html</span>
        <div className="hp-pg-right">
          <span className="hp-live-dot" />
          <span>live · runtime engine</span>
        </div>
      </div>
      <div className="hp-pg-body">
        <ClassInput value={value} onChange={setValue} />
        <div className="hp-pg-chips">
          {CHIPS.map((c) => (
            <button
              key={c}
              className={'hp-chip' + (activeChips.has(c) ? ' hp-chip-on' : '')}
              onClick={() => toggleChip(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="hp-pg-preview">
          <div
            ref={targetRef}
            className="hp-pg-target"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            snap.
          </div>
        </div>
        <div className="hp-pg-foot">
          <span>
            <span className="hp-ok">●</span> {meta.recognized}/{meta.count} classes resolved
            {meta.count !== meta.recognized && <span style={{ color: '#737373' }}> · unknown skipped</span>}
          </span>
          <span>
            {hovered ? 'hover state applied →' : '→ hover the preview'} · {meta.css} props
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hp-hero" id="top">
      <div className="hp-grid-bg" />
      <div className="hp-orb" />
      <div className="hp-wrap hp-hero-inner">
        <div className="hp-hero-left">
          <span className="hp-eyebrow">
            <span className="hp-dot" />
            runtime utility engine · ~6kb gzipped
          </span>
          <h1 className="hp-h1">
            Utility-first CSS,<br />
            <span className="hp-em">without</span> the build step.
          </h1>
          <p className="hp-sub">
            snapcss is a tiny utility-first CSS engine that runs in the browser. Drop in a script,
            sprinkle classes, ship. No config, no compiler, no opinions on your stack.
          </p>
          <div className="hp-cta-row">
            <Link className="hp-btn hp-btn-primary" to="/docs/introduction">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="hp-stats">
            <div className="hp-stat">
              <div className="hp-stat-n">~6<span className="hp-unit">kb</span></div>
              <div className="hp-stat-l">gzipped</div>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-n">0<span className="hp-unit">deps</span></div>
              <div className="hp-stat-l">dependencies</div>
            </div>
            <div className="hp-stat">
              <div className="hp-stat-n">&lt;50<span className="hp-unit">ms</span></div>
              <div className="hp-stat-l">scan / 1k nodes</div>
            </div>
          </div>
        </div>
        <div className="hp-hero-right" id="hp-playground">
          <Playground />
        </div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
    title: 'Pure runtime',
    body: 'No bundler, no PostCSS, no config. snapcss scans the DOM, parses your classes, and applies styles inline — in milliseconds.',
    code: <><span className="hp-acc">scan</span>(DOM) <span className="hp-v">→</span> <span className="hp-acc">apply</span></>,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 11h18"/><path d="M8 5v14"/></svg>,
    title: 'Responsive prefixes',
    body: 'Match your design across breakpoints with sm: md: lg: xl: prefixes — re-evaluated on resize, automatically.',
    code: <><span className="hp-acc">md:</span>p-8 <span className="hp-acc">lg:</span>p-12</>,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/></svg>,
    title: 'Dark mode, free',
    body: 'A dark: prefix wired to prefers-color-scheme — no theme provider required.',
    code: <><span className="hp-acc">dark:</span>bg-zinc-900</>,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7"/></svg>,
    title: 'Pseudo states',
    body: 'hover: focus: active: variants compile to real event listeners — no global stylesheet pollution.',
    code: <><span className="hp-acc">hover:</span>bg-violet-500</>,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
    title: 'Themeable tokens',
    body: 'Override colors, spacing, typography with a single configure() call. Bring your own design system.',
    code: <>snapcss.<span className="hp-acc">configure</span>(...)</>,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 5-9 12-9 12s-9-7-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="12" r="3"/></svg>,
    title: 'MutationObserver-aware',
    body: 'Add nodes from anywhere — React, htmx, vanilla JS — and snapcss notices. New classes parsed and applied automatically.',
    code: <><span className="hp-acc">observe</span>(document.body)</>,
  },
]

function Features() {
  return (
    <section className="hp-bay" id="features">
      <div className="hp-wrap">
        <span className="hp-section-eyebrow">/ what's inside</span>
        <h2 className="hp-section-title">Everything you reach for.<br />Nothing you don't.</h2>
        <p className="hp-section-sub">
          snapcss ships the utilities developers actually use day-to-day — spacing, color, flex, grid,
          typography, borders, shadows — wired through a runtime parser you can read in an afternoon.
        </p>
        <div className="hp-features">
          {FEATURES.map((f, i) => (
            <div className="hp-feat" key={i}>
              <div className="hp-feat-icon">{f.icon}</div>
              <h3 className="hp-feat-h3">{f.title}</h3>
              <p className="hp-feat-p">{f.body}</p>
              <div className="hp-code-sample">&lt;div class="{f.code}"&gt;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Install ───────────────────────────────────────────────────────────────────
const INSTALL: Record<string, string> = {
  npm:  'npm install snapcss',
  pnpm: 'pnpm add snapcss',
  yarn: 'yarn add snapcss',
  cdn:  '<script src="https://unpkg.com/snapcss"></script>',
}

function Install() {
  const [tab, setTab] = useState('npm')
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(INSTALL[tab])
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <section className="hp-bay" id="install" style={{ paddingTop: 40 }}>
      <div className="hp-wrap">
        <span className="hp-section-eyebrow">/ five-minute setup</span>
        <h2 className="hp-section-title">Up and running in three steps.</h2>
        <div className="hp-install-wrap">
          <div>
            <div className="hp-tabs">
              {Object.keys(INSTALL).map((k) => (
                <button key={k} className={'hp-tab' + (tab === k ? ' hp-tab-on' : '')} onClick={() => setTab(k)}>{k}</button>
              ))}
            </div>
            <div className="hp-codebox">
              <span>
                <span className="hp-prompt">{tab === 'cdn' ? '<' : '$'}</span>
                {tab === 'cdn' ? INSTALL[tab].slice(1) : INSTALL[tab]}
              </span>
              <button className="hp-copy" onClick={copy}>{copied ? 'copied ✓' : 'copy'}</button>
            </div>
            <div style={{ marginTop: 18, fontFamily: 'var(--hp-mono)', fontSize: 12, color: '#737373', lineHeight: 1.7 }}>
              # works with anything that ships HTML to a browser<br />
              # vanilla · react · vue · svelte · htmx · plain html
            </div>
          </div>
          <div className="hp-steps">
            <div className="hp-step">
              <div className="hp-step-n">01</div>
              <div>
                <h4 className="hp-step-h4">Install</h4>
                <p className="hp-step-p">Add snapcss with your favourite package manager — or drop in the CDN one-liner. Zero dependencies, &lt;6kb gzipped.</p>
              </div>
            </div>
            <div className="hp-step">
              <div className="hp-step-n">02</div>
              <div>
                <h4 className="hp-step-h4">Import &amp; init</h4>
                <p className="hp-step-p">One call: <code className="hp-inline-code">snapcss.init()</code>. The engine scans the DOM, wires up a MutationObserver, and listens for resize.</p>
              </div>
            </div>
            <div className="hp-step">
              <div className="hp-step-n">03</div>
              <div>
                <h4 className="hp-step-h4">Use utility classes</h4>
                <p className="hp-step-p">Write <code className="hp-inline-code">p-4</code>, <code className="hp-inline-code">bg-violet-500</code>, <code className="hp-inline-code">hover:rounded-full</code>. The syntax you know — without the build pipeline.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Pipeline ──────────────────────────────────────────────────────────────────
const STAGES = [
  {
    label: 'INPUT',
    name: 'HTML source',
    color: '#a5a3a3',
    accent: 'rgba(250,250,250,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z"/><path d="M9 9l-3 3 3 3"/><path d="M15 9l3 3-3 3"/>
      </svg>
    ),
    desc: 'Your HTML lands in the browser as-is — no preprocessor, no bundler, no compilation gate. Any element with a class attribute is fair game.',
    snippet: '<div class="p-8 bg-violet-500 hover:bg-pink-500 rounded-2xl">',
  },
  {
    label: '01',
    name: 'Scanner',
    color: '#22d3ee',
    accent: 'rgba(34,211,238,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
      </svg>
    ),
    desc: 'A DOM walker collects every class token from every element. A MutationObserver keeps the list fresh as your app renders new nodes — zero polling.',
    snippet: 'scan(document.body) → ["p-8","bg-violet-500","hover:bg-pink-500","rounded-2xl"]',
  },
  {
    label: '02',
    name: 'Parser',
    color: '#a78bfa',
    accent: 'rgba(167,139,250,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3l-3 9 3 9"/><path d="M16 3l3 9-3 9"/><path d="M12 8v8"/>
      </svg>
    ),
    desc: 'Each token is split into variant prefix(es) and a base utility name. Variants become conditions (hover, focus, sm:, dark:) — the base feeds the resolver.',
    snippet: 'parse("hover:bg-pink-500") → { variant: ["hover"], base: "bg-pink-500" }',
  },
  {
    label: '03',
    name: 'Resolver',
    color: '#f472b6',
    accent: 'rgba(244,114,182,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/>
        <path d="M9 12h6M9 12l6-6M9 12l6 6"/>
      </svg>
    ),
    desc: 'The base name is looked up in the token registry — spacing scale, color palette, typography, borders. Unrecognised classes are silently skipped, never errored.',
    snippet: 'resolve("bg-violet-500") → { background: "#8b5cf6" }',
  },
  {
    label: 'OUTPUT',
    name: 'Inline styles',
    color: '#4ade80',
    accent: 'rgba(74,222,128,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/>
      </svg>
    ),
    desc: 'Resolved properties are written directly onto the element\'s style object. Pseudo-state variants wire up native event listeners. Responsive variants re-evaluate on resize.',
    snippet: 'el.style.padding = "32px"; el.style.background = "#8b5cf6"; ...',
  },
]

function Pipeline() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 2200)
    return () => clearInterval(id)
  }, [paused])

  const stage = STAGES[active]

  return (
    <section className="hp-bay hp-how-section" id="how" style={{ paddingTop: 40 }}>
      <div className="hp-wrap">
        <span className="hp-section-eyebrow">/ how it works</span>
        <h2 className="hp-section-title">From class string to pixels, in one pass.</h2>
        <p className="hp-section-sub">
          The whole engine is a five-stage pipeline. Each stage is a single small function — readable,
          replaceable, and trivially testable. No magic.
        </p>

        <div className="hp-how-layout">
          {/* Left: step selector */}
          <div className="hp-how-steps">
            {STAGES.map((s, i) => (
              <button
                key={i}
                className={'hp-how-step' + (active === i ? ' hp-how-step-active' : '')}
                style={{ '--step-color': s.color } as React.CSSProperties}
                onClick={() => { setActive(i); setPaused(true) }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="hp-how-step-indicator">
                  <div className="hp-how-step-dot" />
                  {i < STAGES.length - 1 && <div className="hp-how-step-connector" />}
                </div>
                <div className="hp-how-step-body">
                  <span className="hp-how-step-label">{s.label}</span>
                  <span className="hp-how-step-name">{s.name}</span>
                </div>
                <div className="hp-how-step-icon">{s.icon}</div>
              </button>
            ))}
          </div>

          {/* Right: detail card */}
          <div
            className="hp-how-card"
            style={{ '--card-color': stage.color, '--card-accent': stage.accent } as React.CSSProperties}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="hp-how-card-glow" />
            <div className="hp-how-card-inner">
              <div className="hp-how-card-header">
                <div className="hp-how-card-icon-wrap">
                  {stage.icon}
                </div>
                <div>
                  <div className="hp-how-card-label">{stage.label}</div>
                  <div className="hp-how-card-title">{stage.name}</div>
                </div>
                <div className="hp-how-progress">
                  {STAGES.map((_, i) => (
                    <button
                      key={i}
                      className={'hp-how-pip' + (i === active ? ' hp-how-pip-on' : '')}
                      onClick={() => { setActive(i); setPaused(true) }}
                    />
                  ))}
                </div>
              </div>
              <p className="hp-how-card-desc">{stage.desc}</p>
              <div className="hp-how-card-snippet">
                <div className="hp-how-snippet-bar">
                  <div className="hp-dots"><i /><i /><i /></div>
                  <span className="hp-how-snippet-lang">engine.ts</span>
                </div>
                <pre className="hp-how-snippet-code"><code>{stage.snippet}</code></pre>
              </div>
            </div>
            <div className="hp-how-card-footer">
              <span className="hp-how-card-step-count">step {active + 1} / {STAGES.length}</span>
              {active + 1 !== 5 && <button
                className="hp-how-next"
                onClick={() => { setActive((active + 1) % STAGES.length); setPaused(true) }}
              >
                next step
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>}
            </div>
          </div>
        </div>

        <div className="hp-how-out">
          <span className="hp-how-out-label">end-to-end</span>
          <span><b style={{ color: '#737373', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>in</b> <code style={{ color: '#22d3ee' }}>"p-4 bg-violet-500 rounded-2xl"</code></span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          <span>
            <b style={{ color: '#737373', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>out</b>{' '}
            <span className="hp-k">padding</span>: <span className="hp-v2">16px</span>;{' '}
            <span className="hp-k">background</span>: <span className="hp-v2">#8b5cf6</span>;{' '}
            <span className="hp-k">border-radius</span>: <span className="hp-v2">16px</span>;
          </span>
        </div>
      </div>
    </section>
  )
}

// ── Big CTA ───────────────────────────────────────────────────────────────────
function BigCTA() {
  return (
    <section className="hp-wrap">
      <div className="hp-bigcta">
        <h2 className="hp-bigcta-h2">Stop fighting your <span className="hp-em">build pipeline</span>.</h2>
        <p className="hp-bigcta-p">Drop snapcss into any page and start shipping. The full source is &lt;500 lines — fork it, learn from it, make it yours.</p>
        <div className="hp-cta-row" style={{ justifyContent: 'center' }}>
          <Link className="hp-btn hp-btn-primary" to="/docs/installation">Install snapcss</Link>
          <a className="hp-btn hp-btn-ghost" href="https://github.com" target="_blank" rel="noopener noreferrer">Read the source</a>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function HomeFooter() {
  return (
    <footer className="hp-footer">
      <div className="hp-wrap">
        <div className="hp-footer-cols">
          <div>
            <Logo />
            <p className="hp-footer-lede">
              A tiny runtime utility-first CSS engine. Built to be readable, hackable, and to disappear into your stack.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hp-social-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.14 1.18.91-.25 1.89-.38 2.86-.39.97 0 1.95.13 2.86.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.15v3.18c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg>
              </a>
              <a href="https://npmjs.com/package/snapcss" target="_blank" rel="noopener noreferrer" aria-label="npm" className="hp-social-btn hp-social-npm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h5 className="hp-footer-h5">Docs</h5>
            <ul className="hp-footer-ul">
              <li><Link to="/docs/introduction">Getting started</Link></li>
              <li><Link to="/docs/class-syntax">Utilities</Link></li>
              <li><Link to="/docs/modifiers-overview">Variants</Link></li>
              <li><Link to="/docs/theme-config">Theming</Link></li>
              <li><Link to="/docs/arbitrary-values">Arbitrary values</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="hp-footer-h5">Resources</h5>
            <ul className="hp-footer-ul">
              <li><a href="#hp-playground">Playground</a></li>
              <li><Link to="/docs/quick-start">Quick start</Link></li>
              <li><Link to="/docs/compatibility">Compatibility</Link></li>
              <li><Link to="/docs/performance">Performance</Link></li>
              <li><Link to="/docs/dynamic-dom">Dynamic DOM</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="hp-footer-h5">Community</h5>
            <ul className="hp-footer-ul">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="hp-footer-bottom">
          <span>© {new Date().getFullYear()} snapcss · MIT licensed · made with <span className="hp-blob">curiosity</span></span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}

// ── Page root ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="hp">
      <Navbar onMenuClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <Hero />
      <Features />
      <Install />
      <Pipeline />
      <BigCTA />
      <HomeFooter />
    </div>
  )
}
