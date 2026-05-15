import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/:slug" element={<Docs />} />
      </Routes>
    </>
  )
}
