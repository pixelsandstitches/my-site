import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const C = {
  cactus:  '#3A5C3E',
  thistle: '#B8A0C8',
  taupe:   '#CEC8BE',
  bark:    '#6B5550',
  olive:   '#8C8C2A',
  mint:    '#B8D9C2',
  bg:      '#F5F3EF',
}

const projects = [
  {
    title: 'Weekly Meal Plan',
    description: 'A personal tool for planning and tracking meals through the week.',
    path: '/meal-plan',
    tag: 'Tool',
    cardBg: '#3A5C3E',
    tagColor: '#B8D9C2',
    titleColor: '#CEC8BE',
    descColor: '#a8c4b0',
    arrowColor: '#B8D9C2',
  },
  {
    title: 'Beachcrest — Google Site Redesign',
    description: 'The existing Beachcrest community association website, turned Google Site for Board Member Review.',
    path: '/beachcrest',
    tag: 'Site Redesign',
    cardBg: '#B8A0C8',
    tagColor: '#3d2a4a',
    titleColor: '#2a1a38',
    descColor: '#5a3d70',
    arrowColor: '#3d2a4a',
  },
  {
    title: 'Beachcrest — Full Redesign',
    description: 'A fresh, modern take on the Beachcrest neighborhood site -- just for comparison.',
    path: '/beachcrest-redesign',
    tag: 'Site Redesign',
    cardBg: '#CEC8BE',
    tagColor: '#6B5550',
    titleColor: '#3A5C3E',
    descColor: '#6B5550',
    arrowColor: '#3A5C3E',
  },
  {
  title: 'Workout Builder',
  description: 'A personal gym session planner with set & rep tracking, rest timers, and weight logging.',
  path: '/workout-builder',
  tag: 'Tool',
  cardBg: '#3A5C3E',
  tagColor: '#B8D9C2',
  titleColor: '#CEC8BE',
  descColor: '#a8c4b0',
  arrowColor: '#B8D9C2',
},
]

export default function Landing() {
  useEffect(() => {
    const id = 'ps-fonts'
    if (!document.getElementById(id)) {
      const l = document.createElement('link')
      l.id = id
      l.rel = 'stylesheet'
      l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400;1,9..144,700&family=Zilla+Slab:wght@400;500;600&display=swap'
      document.head.appendChild(l)
    }
    const s = document.createElement('style')
    s.id = 'ps-styles'
    if (!document.getElementById('ps-styles')) {
      s.textContent = `
        .ps-card { transition: transform 0.18s ease, box-shadow 0.18s ease; cursor: pointer; }
        .ps-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(58,92,62,0.18); }
        .ps-card:hover .ps-arrow { transform: translateX(4px); }
        .ps-arrow { transition: transform 0.18s ease; display: inline-block; }
      `
      document.head.appendChild(s)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F3EF', fontFamily: "'Zilla Slab', Georgia, serif", padding: '72px 32px 80px', boxSizing: 'border-box' }}>

      {/* Header */}
      <header style={{ maxWidth: '640px', margin: '0 auto 64px', textAlign: 'center' }}>

        {/* Top ornament */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ height: '1px', width: '48px', backgroundColor: '#B8D9C2' }} />
          <div style={{ width: '6px', height: '6px', backgroundColor: '#B8A0C8', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ height: '1px', width: '48px', backgroundColor: '#B8D9C2' }} />
        </div>

        <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6B5550', fontWeight: 600, marginBottom: '18px' }}>
          a small collection of things
        </p>

        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(40px, 7vw, 58px)', fontWeight: 700, fontStyle: 'italic', color: '#3A5C3E', margin: '0 0 6px', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          Pixels &amp; <span style={{ color: '#B8A0C8' }}>Stitches</span>
        </h1>

        <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: '16px', color: '#8C8C2A', margin: '10px 0 28px' }}>
          hand-crafted, pixel by pixel
        </p>

        {/* Bottom ornament */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ height: '1px', width: '32px', backgroundColor: '#B8D9C2' }} />
          <div style={{ height: '1px', width: '64px', backgroundColor: '#CEC8BE' }} />
          <div style={{ height: '1px', width: '32px', backgroundColor: '#B8D9C2' }} />
        </div>
      </header>

      {/* Section label */}
      <div style={{ maxWidth: '860px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#6B5550', whiteSpace: 'nowrap' }}>Projects</span>
        <div style={{ height: '1px', flex: 1, backgroundColor: '#B8D9C2' }} />
      </div>

      {/* Cards */}
      <main style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '18px' }}>
        {projects.map((p) => (
          <Link key={p.path} to={p.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="ps-card" style={{ backgroundColor: p.cardBg, borderRadius: '8px', padding: '28px 26px 24px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '200px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: p.tagColor }}>
                {p.tag}
              </span>
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '20px', fontWeight: 700, color: p.titleColor, margin: 0, lineHeight: 1.2 }}>
                {p.title}
              </h2>
              <div style={{ height: '1px', backgroundColor: p.tagColor, opacity: 0.25 }} />
              <p style={{ fontSize: '13px', color: p.descColor, margin: 0, lineHeight: 1.65, flexGrow: 1, fontWeight: 400 }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span className="ps-arrow" style={{ color: p.arrowColor, fontSize: '18px' }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer style={{ maxWidth: '860px', margin: '64px auto 0', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ height: '1px', flex: 1, backgroundColor: '#B8D9C2' }} />
        <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#CEC8BE', fontWeight: 500, whiteSpace: 'nowrap' }}>Sarah Osentowski</span>
        <div style={{ height: '1px', flex: 1, backgroundColor: '#B8D9C2' }} />
      </footer>

    </div>
  )
}
