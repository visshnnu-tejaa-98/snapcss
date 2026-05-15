import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Check, Copy } from 'lucide-react'

// ─── Syntax themes ────────────────────────────────────────────────────────────

const darkTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: '#cdd6f4', background: 'none', fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem', textAlign: 'left', whiteSpace: 'pre',
    wordSpacing: 'normal', wordBreak: 'normal', lineHeight: '1.65',
    tabSize: '2', hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#cdd6f4', background: 'transparent', fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem', textAlign: 'left', whiteSpace: 'pre',
    wordSpacing: 'normal', wordBreak: 'normal', lineHeight: '1.65',
    tabSize: '2', hyphens: 'none', padding: '1.125rem 1.25rem',
    margin: '0', overflow: 'auto',
  },
  comment:     { color: '#6272a4', fontStyle: 'italic' },
  prolog:      { color: '#6272a4' },
  doctype:     { color: '#6272a4' },
  cdata:       { color: '#6272a4' },
  punctuation: { color: '#cdd6f4' },
  property:    { color: '#ff79c6' },
  tag:         { color: '#ff79c6' },
  boolean:     { color: '#bd93f9' },
  number:      { color: '#bd93f9' },
  constant:    { color: '#bd93f9' },
  symbol:      { color: '#bd93f9' },
  deleted:     { color: '#ff5555' },
  selector:    { color: '#50fa7b' },
  'attr-name': { color: '#50fa7b' },
  string:      { color: '#f1fa8c' },
  char:        { color: '#f1fa8c' },
  builtin:     { color: '#50fa7b' },
  inserted:    { color: '#50fa7b' },
  operator:    { color: '#ff79c6' },
  entity:      { color: '#f1fa8c', cursor: 'help' },
  url:         { color: '#8be9fd' },
  variable:    { color: '#8be9fd' },
  atrule:      { color: '#ff79c6' },
  'attr-value':{ color: '#f1fa8c' },
  function:    { color: '#50fa7b' },
  'class-name':{ color: '#8be9fd' },
  keyword:     { color: '#ff79c6' },
  regex:       { color: '#ffb86c' },
  important:   { color: '#ffb86c', fontWeight: 'bold' },
  bold:        { fontWeight: 'bold' },
  italic:      { fontStyle: 'italic' },
}

const lightTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: '#1f2328', background: 'none', fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem', textAlign: 'left', whiteSpace: 'pre',
    wordSpacing: 'normal', wordBreak: 'normal', lineHeight: '1.65',
    tabSize: '2', hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#1f2328', background: 'transparent', fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem', textAlign: 'left', whiteSpace: 'pre',
    wordSpacing: 'normal', wordBreak: 'normal', lineHeight: '1.65',
    tabSize: '2', hyphens: 'none', padding: '1.125rem 1.25rem',
    margin: '0', overflow: 'auto',
  },
  comment:     { color: '#6e7781', fontStyle: 'italic' },
  prolog:      { color: '#6e7781' },
  doctype:     { color: '#6e7781' },
  cdata:       { color: '#6e7781' },
  punctuation: { color: '#1f2328' },
  property:    { color: '#116329' },
  tag:         { color: '#116329' },
  boolean:     { color: '#0550ae' },
  number:      { color: '#0550ae' },
  constant:    { color: '#0550ae' },
  symbol:      { color: '#0550ae' },
  deleted:     { color: '#82071e' },
  selector:    { color: '#cf222e' },
  'attr-name': { color: '#0550ae' },
  string:      { color: '#0a3069' },
  char:        { color: '#0a3069' },
  builtin:     { color: '#0550ae' },
  inserted:    { color: '#116329' },
  operator:    { color: '#1f2328' },
  entity:      { color: '#953800', cursor: 'help' },
  url:         { color: '#0550ae' },
  variable:    { color: '#0550ae' },
  atrule:      { color: '#cf222e' },
  'attr-value':{ color: '#0a3069' },
  function:    { color: '#8250df' },
  'class-name':{ color: '#953800' },
  keyword:     { color: '#cf222e' },
  regex:       { color: '#953800' },
  important:   { color: '#953800', fontWeight: 'bold' },
  bold:        { fontWeight: 'bold' },
  italic:      { fontStyle: 'italic' },
}

// ─── Hook: react to data-theme changes ────────────────────────────────────────

function useDocTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (document.documentElement.dataset.theme as 'dark' | 'light') ?? 'dark'
  })

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme((document.documentElement.dataset.theme as 'dark' | 'light') ?? 'dark')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CodeBlockProps {
  code: string
  lang?: string
  title?: string
}

export default function CodeBlock({ code, lang = 'html', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const docTheme = useDocTheme()
  const syntaxTheme = docTheme === 'light' ? lightTheme : darkTheme

  const copy = () => {
    navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-lang">{title || lang}</span>
        <button className={`code-block-copy ${copied ? 'copied' : ''}`} onClick={copy}>
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={syntaxTheme}
        customStyle={{ margin: 0, background: 'transparent', padding: '1.125rem 1.25rem' }}
        wrapLongLines={false}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
