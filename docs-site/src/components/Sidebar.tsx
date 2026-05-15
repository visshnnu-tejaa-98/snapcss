import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { navGroups } from '../content/nav'

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { slug } = useParams<{ slug: string }>()
  const sidebarRef = useRef<HTMLElement>(null)

  // Scroll the active item to roughly 1/3 from the top of the sidebar
  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return
    const active = sidebar.querySelector('.sidebar-item.active') as HTMLElement | null
    if (!active) return
    const targetScroll = active.offsetTop - sidebar.clientHeight / 3
    sidebar.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' })
  }, [slug])

  return (
    <aside ref={sidebarRef} className={`sidebar ${open ? 'open' : ''}`}>
      {navGroups.map((group) => (
        <div key={group.title} className="sidebar-section">
          <div className="sidebar-section-title">{group.title}</div>
          {group.items.map((item) => (
            <Link
              key={item.slug}
              to={`/docs/${item.slug}`}
              className={`sidebar-item ${slug === item.slug ? 'active' : ''}`}
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  )
}
