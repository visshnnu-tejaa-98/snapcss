import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface TocItem {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function TableOfContents() {
  const { slug } = useParams<{ slug: string }>()
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Scan headings and assign IDs whenever the page slug changes.
  // Reset activeId on page change — nothing is selected until user clicks.
  useEffect(() => {
    setActiveId('')
    const timer = setTimeout(() => {
      const content = document.querySelector('.docs-inner')
      if (!content) return

      const headings = Array.from(content.querySelectorAll('h1, h2'))
      const usedIds: Record<string, number> = {}
      const tocItems: TocItem[] = []

      headings.forEach((el) => {
        const text = el.textContent?.trim() ?? ''
        if (!text) return
        const level = el.tagName === 'H1' ? 1 : 2
        const base = slugify(text) || 'heading'
        usedIds[base] = (usedIds[base] ?? 0) + 1
        const id = usedIds[base] > 1 ? `${base}-${usedIds[base]}` : base
        if (!el.id) el.id = id
        tocItems.push({ id: el.id, text, level })
      })

      setItems(tocItems)
    }, 80)

    return () => clearTimeout(timer)
  }, [slug])

  if (items.length <= 1) return null

  return (
    <aside className="toc-sidebar">
      <span className="toc-label">On this page</span>
      <nav>
        {items.map(({ id, text, level }) => (
          <a
            key={id}
            className={`toc-item toc-level-${level}${activeId === id ? ' toc-active' : ''}`}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById(id)
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 76
                window.scrollTo({ top, behavior: 'smooth' })
                setActiveId(id)
              }
            }}
          >
            {text}
          </a>
        ))}
      </nav>
    </aside>
  )
}
