import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react'
import { searchIndex, SearchEntry } from '../content/searchIndex'

interface Props {
  open: boolean
  onClose: () => void
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

function score(entry: SearchEntry, q: string): number {
  const lq = q.toLowerCase()
  if (entry.title.toLowerCase() === lq) return 3
  if (entry.title.toLowerCase().startsWith(lq)) return 2
  if (entry.title.toLowerCase().includes(lq)) return 1
  return 0
}

function search(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return searchIndex
    .filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.keywords.toLowerCase().includes(q) ||
      e.group.toLowerCase().includes(q)
    )
    .sort((a, b) => score(b, q) - score(a, q))
    .slice(0, 12)
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const navigate = useNavigate()

  const results = search(query)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  // Keep selected item visible
  useEffect(() => {
    const el = listRef.current?.children[selected] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const go = useCallback((slug: string) => {
    navigate(`/docs/${slug}`)
    onClose()
  }, [navigate, onClose])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && results[selected]) {
      go(results[selected].slug)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  // Reset selection when results change
  useEffect(() => { setSelected(0) }, [query])

  if (!open) return null

  return (
    <div className="search-overlay" onMouseDown={onClose}>
      <div
        className="search-box"
        onMouseDown={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search docs"
      >
        {/* Input row */}
        <div className="search-input-row">
          <Search size={16} className="search-input-icon" />
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search docs…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button className="search-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }} aria-label="Clear">
              <X size={14} />
            </button>
          )}
          <kbd className="search-esc-badge">Esc</kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="search-results" ref={listRef} role="listbox">
            {results.map((entry, i) => (
              <li
                key={entry.slug}
                className={`search-result-item ${i === selected ? 'active' : ''}`}
                role="option"
                aria-selected={i === selected}
                onMouseEnter={() => setSelected(i)}
                onMouseDown={() => go(entry.slug)}
              >
                <span className="search-result-icon"><ArrowRight size={13} /></span>
                <span className="search-result-body">
                  <span className="search-result-title">{highlight(entry.title, query)}</span>
                  <span className="search-result-group">{entry.group}</span>
                </span>
                {i === selected && (
                  <span className="search-result-enter"><CornerDownLeft size={12} /></span>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {query.trim() !== '' && results.length === 0 && (
          <div className="search-empty">
            <Search size={20} className="search-empty-icon" />
            <span>No results for <strong>"{query}"</strong></span>
          </div>
        )}

        {/* Footer hint */}
        <div className="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
