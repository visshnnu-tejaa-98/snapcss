import CodeBlock from '../components/CodeBlock'
import ClassTable from '../components/ClassTable'

export function Sizing() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Sizing</p>
      <h1>Width & Height</h1>
      <p>Utilities for setting the dimensions of an element.</p>
      <CodeBlock
        code={`<div class="w-full h-screen">Full viewport</div>
<div class="w-1/2 h-32">Half width, fixed height</div>
<div class="w-[200px] h-[200px]">Arbitrary size</div>
<div class="max-w-lg mx-auto">Constrained width, centered</div>
<img class="w-full h-48 object-cover" src="photo.jpg" />`}
        lang="html"
      />
      <h2>Width</h2>
      <ClassTable
        rows={[
          { cls: 'w-auto',    css: 'width: auto' },
          { cls: 'w-full',    css: 'width: 100%' },
          { cls: 'w-screen',  css: 'width: 100vw' },
          { cls: 'w-svw',     css: 'width: 100svw',      note: 'small viewport width' },
          { cls: 'w-fit',     css: 'width: fit-content' },
          { cls: 'w-min',     css: 'width: min-content' },
          { cls: 'w-max',     css: 'width: max-content' },
          { cls: 'w-1/2',     css: 'width: 50%' },
          { cls: 'w-1/3',     css: 'width: 33.333%' },
          { cls: 'w-2/3',     css: 'width: 66.667%' },
          { cls: 'w-1/4',     css: 'width: 25%' },
          { cls: 'w-2/4',     css: 'width: 50%' },
          { cls: 'w-3/4',     css: 'width: 75%' },
          { cls: 'w-1/5',     css: 'width: 20%' },
          { cls: 'w-2/5',     css: 'width: 40%' },
          { cls: 'w-3/5',     css: 'width: 60%' },
          { cls: 'w-4/5',     css: 'width: 80%' },
          { cls: 'w-1/6',     css: 'width: 16.667%' },
          { cls: 'w-5/6',     css: 'width: 83.333%' },
          { cls: 'w-{n}',     css: 'width: {spacing scale}' },
          { cls: 'w-[200px]', css: 'width: 200px',        note: 'arbitrary' },
        ]}
      />

      <h2>Min &amp; Max Width</h2>
      <ClassTable
        rows={[
          { cls: 'min-w-0',          css: 'min-width: 0' },
          { cls: 'min-w-full',        css: 'min-width: 100%' },
          { cls: 'min-w-min',         css: 'min-width: min-content' },
          { cls: 'min-w-max',         css: 'min-width: max-content' },
          { cls: 'max-w-none',        css: 'max-width: none' },
          { cls: 'max-w-xs',          css: 'max-width: 320px' },
          { cls: 'max-w-sm',          css: 'max-width: 384px' },
          { cls: 'max-w-md',          css: 'max-width: 448px' },
          { cls: 'max-w-lg',          css: 'max-width: 512px' },
          { cls: 'max-w-xl',          css: 'max-width: 576px' },
          { cls: 'max-w-2xl',         css: 'max-width: 672px' },
          { cls: 'max-w-3xl',         css: 'max-width: 768px' },
          { cls: 'max-w-4xl',         css: 'max-width: 896px' },
          { cls: 'max-w-5xl',         css: 'max-width: 1024px' },
          { cls: 'max-w-6xl',         css: 'max-width: 1152px' },
          { cls: 'max-w-7xl',         css: 'max-width: 1280px' },
          { cls: 'max-w-full',        css: 'max-width: 100%' },
          { cls: 'max-w-prose',       css: 'max-width: 65ch',     note: 'optimal reading width' },
          { cls: 'max-w-min',         css: 'max-width: min-content' },
          { cls: 'max-w-max',         css: 'max-width: max-content' },
          { cls: 'max-w-fit',         css: 'max-width: fit-content' },
          { cls: 'max-w-screen-sm',   css: 'max-width: 640px' },
          { cls: 'max-w-screen-md',   css: 'max-width: 768px' },
          { cls: 'max-w-screen-lg',   css: 'max-width: 1024px' },
          { cls: 'max-w-screen-xl',   css: 'max-width: 1280px' },
          { cls: 'max-w-screen-2xl',  css: 'max-width: 1536px' },
        ]}
      />
      <h2>Height</h2>
      <ClassTable
        rows={[
          { cls: 'h-auto',    css: 'height: auto' },
          { cls: 'h-full',    css: 'height: 100%' },
          { cls: 'h-screen',  css: 'height: 100vh' },
          { cls: 'h-svh',     css: 'height: 100svh',      note: 'small viewport height' },
          { cls: 'h-dvh',     css: 'height: 100dvh',      note: 'dynamic viewport height' },
          { cls: 'h-fit',     css: 'height: fit-content' },
          { cls: 'h-{n}',     css: 'height: {spacing scale}' },
          { cls: 'h-[300px]', css: 'height: 300px',        note: 'arbitrary' },
          { cls: 'min-h-0',      css: 'min-height: 0' },
          { cls: 'min-h-full',   css: 'min-height: 100%' },
          { cls: 'min-h-screen', css: 'min-height: 100vh' },
          { cls: 'max-h-full',   css: 'max-height: 100%' },
          { cls: 'max-h-screen', css: 'max-height: 100vh' },
          { cls: 'max-h-{n}',    css: 'max-height: {spacing scale}' },
        ]}
      />
    </div>
  )
}

export function Inset() {
  return (
    <div className="doc-section">
      <p className="doc-section-label">Sizing</p>
      <h1>Inset</h1>
      <p>
        Utilities for the <code>top</code>, <code>right</code>, <code>bottom</code>, and
        <code>left</code> CSS properties. Use with <code>relative</code>,
        <code>absolute</code>, <code>fixed</code>, or <code>sticky</code>.
      </p>
      <CodeBlock
        code={`<!-- Cover entire parent -->
<div class="absolute inset-0 bg-black opacity-50">Overlay</div>

<!-- Position in corners -->
<div class="absolute top-4 right-4">Top-right badge</div>

<!-- Center with translate trick -->
<div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
  Centered
</div>`}
        lang="html"
      />
      <ClassTable
        rows={[
          { cls: 'top-{n}',     css: 'top: {value}' },
          { cls: 'right-{n}',   css: 'right: {value}' },
          { cls: 'bottom-{n}',  css: 'bottom: {value}' },
          { cls: 'left-{n}',    css: 'left: {value}' },
          { cls: 'inset-{n}',   css: 'top: {v}; right: {v}; bottom: {v}; left: {v}' },
          { cls: 'inset-x-{n}', css: 'left: {value}; right: {value}' },
          { cls: 'inset-y-{n}', css: 'top: {value}; bottom: {value}' },
          { cls: 'inset-0',     css: 'inset: 0', note: 'common overlay' },
          { cls: 'top-auto',    css: 'top: auto' },
          { cls: 'top-full',    css: 'top: 100%' },
          { cls: 'top-[10px]',  css: 'top: 10px', note: 'arbitrary' },
          { cls: 'left-[-16px]',css: 'left: -16px', note: 'negative arbitrary' },
        ]}
      />
    </div>
  )
}
