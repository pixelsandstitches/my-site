import { Link } from 'react-router-dom'

const projects = [
  {
    title: 'Weekly Meal Plan',
    description: 'A personal meal planning tool for the week ahead.',
    path: '/meal-plan',
    tag: 'Tool',
  },
  {
    title: 'Beachcrest — Current Site',
    description: 'The existing Beachcrest community association website.',
    path: '/beachcrest',
    tag: 'Community',
  },
  {
    title: 'Beachcrest — Redesign',
    description: 'A fresh take on the Beachcrest neighborhood site.',
    path: '/beachcrest-redesign',
    tag: 'Design',
  },
]

export default function Landing() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <p style={styles.eyebrow}>a small collection of things</p>
        <h1 style={styles.title}>pixels & stitches</h1>
        <div style={styles.rule} />
      </header>
      <main style={styles.grid}>
        {projects.map((project) => (
          <Link key={project.path} to={project.path} style={styles.cardLink}>
            <div style={styles.card}>
              <span style={styles.tag}>{project.tag}</span>
              <h2 style={styles.cardTitle}>{project.title}</h2>
              <p style={styles.cardDesc}>{project.description}</p>
              <span style={styles.arrow}>→</span>
            </div>
          </Link>
        ))}
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#c8ddd0',
    fontFamily: "'Georgia', serif",
    padding: '60px 32px',
    boxSizing: 'border-box',
  },
  header: {
    maxWidth: '680px',
    margin: '0 auto 48px',
    textAlign: 'center',
  },
  eyebrow: {
    fontSize: '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#3a6b52',
    marginBottom: '14px',
  },
  title: {
    fontSize: 'clamp(36px, 6vw, 52px)',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    color: '#1e4a35',
    margin: '0 0 24px',
    lineHeight: 1.1,
  },
  rule: {
    width: '48px',
    height: '1px',
    backgroundColor: '#3a6b52',
    margin: '0 auto',
  },
  grid: {
    maxWidth: '860px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    backgroundColor: '#b8d0c0',
    border: '1px solid #8ab09a',
    borderRadius: '4px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minHeight: '180px',
  },
  tag: {
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#3a6b52',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'normal',
    color: '#1e4a35',
    margin: 0,
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '13px',
    color: '#3a6b52',
    margin: 0,
    lineHeight: 1.6,
    flexGrow: 1,
  },
  arrow: {
    color: '#1e4a35',
    fontSize: '16px',
  },
}