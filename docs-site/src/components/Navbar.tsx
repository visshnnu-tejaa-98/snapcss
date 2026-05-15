import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, Search, Sun, Moon } from 'lucide-react'
import SearchModal from './SearchModal'
import Logo from './Logo'

interface NavbarProps {
  onMenuClick?: () => void
  menuOpen?: boolean
}

export default function Navbar({ onMenuClick, menuOpen }: NavbarProps) {
  const location = useLocation()
  const isDocs = location.pathname.startsWith('/docs')
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('snapcss-theme') as 'dark' | 'light') ?? 'dark'
  })

  // Apply saved theme on first render
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('snapcss-theme', next)
    document.documentElement.dataset.theme = next
  }

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cmd+K / Ctrl+K opens search globally
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <Link to="/" className="navbar-logo">
          <Logo size={15} showBadge badgeText={`v${import.meta.env.VITE_APP_VERSION ?? '1.0.0'}`} />
        </Link>

        <div className="navbar-divider" />

        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${!isDocs ? 'active' : ''}`}>Home</Link>
          <Link to="/docs" className={`navbar-link ${isDocs ? 'active' : ''}`}>Docs</Link>
        </div>

        <div className="navbar-spacer" />

        {/* Search trigger */}
        <button className="navbar-search-btn" onClick={() => setSearchOpen(true)} aria-label="Search docs">
          <Search size={14} />
          <span className="navbar-search-placeholder">Search docs…</span>
          <span className="navbar-search-kbd">
            <kbd>⌘</kbd><kbd>K</kbd>
          </span>
        </button>

        <a
          href={import.meta.env.VITE_GITHUB_URL ?? 'https://github.com/your-org/snapcss'}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-github"
        >
          <Github size={14} />
          GitHub
        </a>

        {/* Theme toggle */}
        <button
          className="navbar-theme-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {onMenuClick && (
          <button className="navbar-mobile-btn" onClick={onMenuClick} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
