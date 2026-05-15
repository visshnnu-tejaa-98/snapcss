import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

export function ClassSyntax() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Core Concepts</p>
      <h1>Class Syntax</h1>
      <p>
        snapcss classes consist of an optional modifier, a utility name, and a value — no prefix required.
        Just write class names directly.
      </p>

      <div className="flow-diagram">
        <span className="flow-step" style={{ color: '#fbbf24' }}>[modifier:]</span>
        <span className="flow-arrow">+</span>
        <span className="flow-step" style={{ color: '#4ade80' }}>utility</span>
        <span className="flow-arrow">+</span>
        <span className="flow-step" style={{ color: '#60a5fa' }}>-value</span>
      </div>

      <h2>Scale-based classes</h2>
      <p>Predefined token values resolved from the theme's scale maps.</p>
      <ClassTable
        rows={[
          { cls: 'p-4',         css: 'padding: 16px' },
          { cls: 'm-2',         css: 'margin: 4px' },
          { cls: 'text-xl',     css: 'font-size: 20px' },
          { cls: 'bg-red-500',  css: 'background-color: #ef4444' },
          { cls: 'rounded-lg',  css: 'border-radius: 8px' },
          { cls: 'shadow-md',   css: 'box-shadow: 0 4px 6px …' },
          { cls: 'flex',        css: 'display: flex' },
          { cls: 'grid-cols-3', css: 'grid-template-columns: repeat(3, 1fr)' },
        ]}
      />

      <h2>Classes with modifiers</h2>
      <ClassTable
        rows={[
          { cls: 'hover:bg-blue-500',    css: 'background-color: #3b82f6 (on hover)' },
          { cls: 'md:p-4',               css: 'padding: 16px (when ≥ 768px)' },
          { cls: 'dark:bg-gray-900',     css: 'background-color: … (dark mode)' },
          { cls: 'focus-visible:outline-2', css: 'outline-width: 2px (keyboard focus)' },
          { cls: 'disabled:opacity-50',  css: 'opacity: 0.5 (when disabled)' },
          { cls: 'group-hover:text-white', css: 'color: white (parent hovered)' },
        ]}
      />

      <h2>Multi-property utilities</h2>
      <p>Some utilities set multiple CSS properties at once:</p>
      <ClassTable
        rows={[
          { cls: 'px-4', css: 'padding-left: 16px; padding-right: 16px' },
          { cls: 'inset-0', css: 'top: 0; right: 0; bottom: 0; left: 0' },
          { cls: 'transition', css: 'transition-property: …; timing: …; duration: 150ms' },
          { cls: 'truncate', css: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap' },
        ]}
      />
    </div>
  )
}

export function ArbitraryValues() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Core Concepts</p>
      <h1>Arbitrary Values</h1>
      <p>
        Any utility that accepts a value supports raw CSS inside <code>[…]</code>.
        Underscores inside brackets are converted to spaces, enabling multi-word values.
      </p>

      <CodeBlock
        code={`<!-- Arbitrary spacing -->
<div class="p-[150px] mt-[2.5rem]">…</div>

<!-- Arbitrary color -->
<div class="bg-[#ff5733] text-[rgba(255,255,255,0.9)]">…</div>

<!-- Arbitrary grid -->
<div class="grid grid-cols-[1fr_2fr_1fr]">…</div>

<!-- Arbitrary shadow (underscores → spaces) -->
<div class="shadow-[0_4px_24px_rgba(0,0,0,0.25)]">…</div>

<!-- Arbitrary with modifier -->
<div class="hover:bg-[#7c6cf2] md:pt-[150px]">…</div>`}
        lang="html"
      />

      <h2>How the pipeline processes arbitrary values</h2>
      <div className="flow-diagram">
        <span className="flow-step"><code>px-[24px]</code></span>
        <span className="flow-arrow">→</span>
        <span className="flow-step">tokens: <code>["px","[24px]"]</code></span>
        <span className="flow-arrow">→</span>
        <span className="flow-step"><code>isArbitrary = true</code></span>
        <span className="flow-arrow">→</span>
        <span className="flow-step"><code>paddingLeft/Right: "24px"</code></span>
      </div>

      <ClassTable
        rows={[
          { cls: 'p-[150px]',              css: 'padding: 150px' },
          { cls: 'pt-[150px]',             css: 'padding-top: 150px' },
          { cls: 'px-[24px]',              css: 'padding-left: 24px; padding-right: 24px' },
          { cls: 'bg-[#ff5733]',           css: 'background-color: #ff5733' },
          { cls: 'text-[20px]',            css: 'font-size: 20px' },
          { cls: 'w-[200px]',              css: 'width: 200px' },
          { cls: 'grid-cols-[1fr_2fr]',    css: 'grid-template-columns: 1fr 2fr' },
          { cls: 'shadow-[0_2px_8px_#000]', css: 'box-shadow: 0 2px 8px #000' },
          { cls: 'rotate-[-45deg]',        css: 'rotate: -45deg' },
          { cls: 'duration-[400ms]',       css: 'transition-duration: 400ms' },
        ]}
      />

      <div className="callout callout-tip">
        <span className="callout-icon">💡</span>
        <span>
          Underscore → space conversion lets you write multi-word values like
          <code>font-[system-ui,_sans-serif]</code> which becomes
          <code>font-family: system-ui, sans-serif</code>.
        </span>
      </div>
    </div>
  )
}

export function ModifiersOverview() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Core Concepts</p>
      <h1>Modifiers Overview</h1>
      <p>
        Modifiers are prefixes separated by <code>:</code> that conditionally apply a utility.
        They can be combined with any utility, including arbitrary values.
      </p>

      <h2>Modifier types</h2>
      <ClassTable
        headers={['Type', 'Prefix', 'Trigger']}
        rows={[
          { cls: 'State',       css: 'hover: focus: active: focus-visible:', note: 'DOM events' },
          { cls: 'Responsive',  css: 'sm: md: lg: xl: 2xl:',                note: 'window.innerWidth ≥ breakpoint' },
          { cls: 'Dark Mode',   css: 'dark:',                               note: 'prefers-color-scheme: dark' },
          { cls: 'Structural',  css: 'disabled: first: last: odd: even:',   note: 'DOM attribute / position' },
          { cls: 'Group',       css: 'group-hover:',                        note: 'ancestor with group is hovered' },
        ]}
      />

      <h2>Responsive breakpoints</h2>
      <ClassTable
        headers={['Prefix', 'Min-width', 'Example']}
        rows={[
          { cls: 'sm:',  css: '640px',  note: 'sm:text-lg' },
          { cls: 'md:',  css: '768px',  note: 'md:flex' },
          { cls: 'lg:',  css: '1024px', note: 'lg:grid-cols-3' },
          { cls: 'xl:',  css: '1280px', note: 'xl:max-w-6xl' },
          { cls: '2xl:', css: '1536px', note: '2xl:px-20' },
        ]}
      />

      <h2>Combining modifiers with arbitrary values</h2>
      <CodeBlock
        code={`<!-- Responsive + arbitrary -->
<div class="p-4 md:p-[32px] lg:p-[48px]">…</div>

<!-- Dark mode + arbitrary color -->
<div class="bg-white dark:bg-[#1a1a2e]">…</div>

<!-- Hover + arbitrary transform -->
<button class="hover:scale-[1.08] transition duration-200">…</button>`}
        lang="html"
      />
    </div>
  )
}
