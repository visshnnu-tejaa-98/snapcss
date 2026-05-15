import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TableOfContents from '../components/TableOfContents'
import { allItems } from '../content/nav'
import { registry } from '../content/registry'

export default function Docs() {
  const { slug } = useParams<{ slug: string }>()
  const [menuOpen, setMenuOpen] = useState(false)

  const currentIndex = allItems.findIndex((item) => item.slug === slug)
  if (currentIndex === -1) {
    return <Navigate to="/docs/introduction" replace />
  }

  const Content = registry[slug!]
  if (!Content) {
    return <Navigate to="/docs/introduction" replace />
  }

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null

  return (
    <>
      <Navbar onMenuClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 49, backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="docs-layout">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main className="docs-content">
          <div className="docs-inner">
            <Content />

            {/* Prev / Next Navigation */}
            <div className="doc-nav">
              {prev ? (
                <Link to={`/docs/${prev.slug}`} className="doc-nav-btn prev">
                  <span className="doc-nav-dir">
                    <ChevronLeft size={13} /> Previous
                  </span>
                  <span className="doc-nav-title">{prev.title}</span>
                </Link>
              ) : <div />}

              {next ? (
                <Link to={`/docs/${next.slug}`} className="doc-nav-btn next">
                  <span className="doc-nav-dir">
                    Next <ChevronRight size={13} />
                  </span>
                  <span className="doc-nav-title">{next.title}</span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </main>

        <TableOfContents />
      </div>
    </>
  )
}
