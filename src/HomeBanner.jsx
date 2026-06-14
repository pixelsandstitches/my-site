import { Link, useLocation } from 'react-router-dom'

function formatPageName(pathname) {
  const segment = pathname.split('/').filter(Boolean).pop()
  if (!segment) return 'Home'
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function HomeBanner() {
  const { pathname } = useLocation()
  const currentPage = formatPageName(pathname)

  return (
    <div style={{
      background: '#f5f0e8',
      borderBottom: '0.5px solid #8ab09a',
      padding: '7px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }}>
      <span style={{ color: '#3a6b52', fontSize: 13 }}>←</span>
      <Link to="/" style={{
        color: '#3a6b52',
        fontSize: 12,
        letterSpacing: '0.04em',
        textDecoration: 'none',
      }}>
        Pixels & Stitches
      </Link>
      <span style={{ color: '#8ab09a', fontSize: 11 }}>›</span>
      <span style={{ color: '#1e4a35', fontWeight: 500, fontSize: 12 }}>{currentPage}</span>
    </div>
  )
}