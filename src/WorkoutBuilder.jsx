import { useState, useEffect, useRef } from 'react'
import HomeBanner from './HomeBanner'

const C = {
  cactus:  '#3A5C3E',
  thistle: '#B8A0C8',
  taupe:   '#CEC8BE',
  bark:    '#6B5550',
  olive:   '#8C8C2A',
  mint:    '#B8D9C2',
  bg:      '#F5F3EF',
  white:   '#FAFAF8',
}

// Derived tints used for selected states / badges
const T = {
  cactusLt:  '#e6ede7',
  cactusDk:  '#2a4330',
  thistleLt: '#f0eaf5',
  thistleDk: '#3d2a4a',
  oliveLt:   '#f0f0e0',
  oliveDk:   '#4a4a10',
  mintLt:    '#f0f7f3',
}

const REST_SECS = 90
const MAX_EX    = 3

const DAYS = [
  { id: 'upper', label: 'Upper body' },
  { id: 'lower', label: 'Lower body' },
  { id: 'class', label: 'Class day'  },
]

const DAY_COLORS = {
  upper: { bg: C.cactus,  lt: T.cactusLt,  dk: T.cactusDk,  pill: '#c8deca' },
  lower: { bg: C.thistle, lt: T.thistleLt, dk: T.thistleDk, pill: '#d8c8e8' },
  class: { bg: C.olive,   lt: T.oliveLt,   dk: T.oliveDk,   pill: '#d4d4a0' },
}

const FEEL_NOTES = {
  easy: 'Go up 5 lbs next time',
  good: 'Stay here or nudge up',
  hard: 'Stay here or drop 5 lbs',
}

const EXERCISES = {
  upper: {
    label: 'Upper body — pick 3 exercises',
    items: [
      { id: 'chest-press',     name: 'Chest press',        target: 'Chest, front shoulders, triceps', desc: 'Sit and push the handles straight out in front of you, then slowly bring them back.', machines: ['Chest press machine'],          sets: '3 sets of 12 reps' },
      { id: 'shoulder-press',  name: 'Shoulder press',     target: 'Shoulders, upper chest, triceps', desc: 'Seated with handles at shoulder height, press straight up overhead, then lower with control.', machines: ['Shoulder press machine'],    sets: '3 sets of 12 reps' },
      { id: 'tricep-pushdown', name: 'Tricep pushdown',    target: 'Back of arms (triceps)',           desc: 'Grip the rope or bar at chest height on the cable machine and push it straight down until your arms are fully extended.', machines: ['Cable machine'], sets: '3 sets of 15 reps — last set AMRAP' },
      { id: 'pec-fly',         name: 'Pec fly',            target: 'Inner chest, front shoulders',    desc: 'Arms out wide like wings, bring the handles together in front of your chest in a hugging motion.', machines: ['Chest fly machine'],   sets: '3 sets of 12 reps' },
      { id: 'lat-pulldown',    name: 'Lat pulldown',       target: 'Upper back (lats), biceps',       desc: 'Pull a bar down toward your collarbone, leading with your elbows — like pulling yourself up to the bar.', machines: ['Lat pulldown machine'], sets: '3 sets of 12 reps' },
      { id: 'seated-row',      name: 'Seated row',         target: 'Mid back, rear shoulders, biceps', desc: 'Feet on the platform, pull handles toward your belly button while keeping your back straight.', machines: ['Seated cable row machine'], sets: '3 sets of 12 reps' },
      { id: 'bicep-curl',      name: 'Bicep curl machine', target: 'Front of arms (biceps)',           desc: 'Rest arms on the pad and curl the handles up toward your shoulders, then slowly lower back down.', machines: ['Bicep curl machine'], sets: '3 sets of 15 reps — last set AMRAP' },
    ],
  },
  lower: {
    label: 'Lower body — pick 3 exercises',
    items: [
      { id: 'leg-press',      name: 'Leg press',       target: 'Quads, hamstrings, glutes', desc: 'Feet shoulder-width on the platform, push it away from you. Lower slowly with control.', machines: ['Leg press machine'],                    sets: '3 sets of 15 reps' },
      { id: 'leg-extension',  name: 'Leg extension',   target: 'Front of thighs (quads)',   desc: 'Pad resting on your shins, straighten your legs against the resistance, then lower with control.', machines: ['Leg extension machine'],       sets: '3 sets of 15 reps — last set AMRAP' },
      { id: 'ham-curl',       name: 'Hamstring curl',  target: 'Back of thighs (hamstrings)', desc: 'Curl your legs toward your body against resistance, then return slowly.', machines: ['Hamstring curl machine'],                          sets: '3 sets of 15 reps' },
      { id: 'hip-abductor',   name: 'Hip abductor',    target: 'Outer hips, glutes',        desc: 'Seated, push your knees outward against the pads. Great for hip stability and counteracting desk-sitting tightness.', machines: ['Hip abductor machine'], sets: '3 sets of 20 reps' },
      { id: 'hip-adductor',   name: 'Hip adductor',    target: 'Inner thighs',              desc: 'Seated, squeeze your knees together against the pads.', machines: ['Hip adductor machine'],                                                  sets: '3 sets of 20 reps' },
      { id: 'glute-kickback', name: 'Glute kickback',  target: 'Glutes',                    desc: 'Push one leg backward at a time, squeezing your glute at the top of the movement.', machines: ['Glute kickback machine'],                 sets: '3 sets of 15 reps each leg' },
      { id: 'calf-raise',     name: 'Calf raise',      target: 'Calves',                    desc: 'Rise up onto your toes as high as you can from the platform edge, then lower slowly.', machines: ['Standing calf raise machine'],          sets: '3 sets of 20 reps — last set AMRAP' },
    ],
  },
  class: {
    label: 'Class day — pick your class',
    items: [
      { id: 'cycle',   name: 'Cycling / Spin', target: 'Cardio, quads, calves',              desc: 'High-energy stationary bike class. Low impact on joints, serious cardio. Great complement to lower body lifting days.', machines: ['Stationary / spin bike'], sets: 'Instructor-led · ~45 min' },
      { id: 'zumba',   name: 'Zumba',          target: 'Cardio, full body',                  desc: 'Dance-based cardio set to Latin-inspired music. Fun, social, and a surprisingly solid workout.', machines: ['No equipment needed'],             sets: 'Instructor-led · ~45–60 min' },
      { id: 'hiit',    name: 'HIIT class',     target: 'Cardio, strength endurance',         desc: 'High-Intensity Interval Training — alternating bursts of hard effort with short rest. Burns a lot in a short time.', machines: ['Varies by class'],     sets: 'Instructor-led · ~30–45 min' },
      { id: 'yoga',    name: 'Yoga',           target: 'Flexibility, balance, core',         desc: 'Breath-focused, builds flexibility and body awareness. Excellent for counteracting desk-work and pickleball tightness.', machines: ['Yoga mat'],          sets: 'Instructor-led · ~60 min' },
      { id: 'pilates', name: 'Pilates',        target: 'Core, posture, stability',           desc: 'Low-impact movements focused on core and posture alignment. Deceptively challenging and great for joints.', machines: ['Mat or reformer (varies)'],  sets: 'Instructor-led · ~45–60 min' },
    ],
  },
}

// ─── Storage ────────────────────────────────────────────────────────────────

function loadStored() {
  try { return JSON.parse(localStorage.getItem('ps_workout') || '{}') } catch { return {} }
}
function persist(data) {
  try { localStorage.setItem('ps_workout', JSON.stringify(data)) } catch {}
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSetCount(setsStr) {
  const m = setsStr.match(/^(\d+)\s+sets/)
  return m ? parseInt(m[1]) : 3
}

function fmtTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${secs}s`
}

// ─── Shared mini-components ──────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: C.bark, margin: '0 0 14px' }}>
      {children}
    </p>
  )
}

function Ornament() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 32px' }}>
      <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
      <div style={{ width: '5px', height: '5px', backgroundColor: C.thistle, transform: 'rotate(45deg)', flexShrink: 0 }} />
      <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
    </div>
  )
}

function MachinePill({ name }) {
  return (
    <span style={{ fontSize: '10px', fontFamily: "'Zilla Slab', Georgia, serif", fontWeight: 500, letterSpacing: '0.04em', background: C.white, border: `1px solid ${C.mint}`, borderRadius: '20px', padding: '2px 9px', color: C.bark }}>
      {name}
    </span>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function WorkoutBuilder() {
  const stored = loadStored()

  const [selectedDay, setSelectedDay]         = useState(null)
  const [selected, setSelected]               = useState(new Set())
  const [completedSets, setCompletedSets]     = useState({})
  const [timers, setTimers]                   = useState({})
  const [weights, setWeights]                 = useState(stored.weights  || {})
  const [feelings, setFeelings]               = useState(stored.feelings || {})

  const intervalRefs = useRef({})

  // Inject hover styles once
  useEffect(() => {
    const id = 'ps-workout-styles'
    if (document.getElementById(id)) return
    const s = document.createElement('style')
    s.id = id
    s.textContent = `
      .wb-ex-card { transition: box-shadow 0.15s ease, transform 0.15s ease; }
      .wb-ex-card:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(58,92,62,0.13); }
      .wb-day-tab { transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; }
      .wb-feel-btn { transition: background 0.12s ease, border-color 0.12s ease; }
      .wb-weight-btn { transition: background 0.12s ease, border-color 0.12s ease; }
      .wb-set-pill { transition: background 0.12s ease, border-color 0.12s ease; }
    `
    document.head.appendChild(s)
  }, [])

  // Persist weights + feelings
  useEffect(() => { persist({ weights, feelings }) }, [weights, feelings])

  // Cleanup timers on unmount
  useEffect(() => () => Object.values(intervalRefs.current).forEach(clearInterval), [])

  // ── Day selection ──────────────────────────────────────────────────────────

  function selectDay(dayId) {
    if (dayId === selectedDay) return
    Object.values(intervalRefs.current).forEach(clearInterval)
    intervalRefs.current = {}
    setSelectedDay(dayId)
    setSelected(new Set())
    setCompletedSets({})
    setTimers({})
  }

  // ── Exercise toggle ────────────────────────────────────────────────────────

  function toggleExercise(exId) {
    const isClass  = selectedDay === 'class'
    const maxAllow = isClass ? 1 : MAX_EX
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(exId)) {
        next.delete(exId)
        clearTimerFor(exId)
        setCompletedSets(s => { const n = { ...s }; delete n[exId]; return n })
      } else if (next.size < maxAllow) {
        next.add(exId)
      }
      return next
    })
  }

  // ── Rest timer ─────────────────────────────────────────────────────────────

  function startTimer(exId) {
    clearTimerFor(exId)
    setTimers(prev => ({ ...prev, [exId]: { remaining: REST_SECS, total: REST_SECS } }))
    intervalRefs.current[exId] = setInterval(() => {
      setTimers(prev => {
        const t = prev[exId]
        if (!t || t.remaining <= 1) {
          clearInterval(intervalRefs.current[exId])
          delete intervalRefs.current[exId]
          const n = { ...prev }; delete n[exId]; return n
        }
        return { ...prev, [exId]: { ...t, remaining: t.remaining - 1 } }
      })
    }, 1000)
  }

  function clearTimerFor(exId) {
    if (intervalRefs.current[exId]) {
      clearInterval(intervalRefs.current[exId])
      delete intervalRefs.current[exId]
    }
    setTimers(prev => { const n = { ...prev }; delete n[exId]; return n })
  }

  // ── Set tracking ───────────────────────────────────────────────────────────

  function toggleSet(exId, index, numSets) {
    setCompletedSets(prev => {
      const done = prev[exId] || 0
      if (index === done) {
        if (done + 1 < numSets) startTimer(exId)
        return { ...prev, [exId]: done + 1 }
      } else if (index === done - 1) {
        clearTimerFor(exId)
        return { ...prev, [exId]: done - 1 }
      }
      return prev
    })
  }

  // ── Weight + feeling ───────────────────────────────────────────────────────

  function adjustWeight(exId, delta) {
    setWeights(prev => ({ ...prev, [exId]: Math.max(0, (prev[exId] || 0) + delta) }))
  }

  function setFeeling(exId, feel) {
    setFeelings(prev => ({ ...prev, [exId]: feel }))
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const isClass   = selectedDay === 'class'
  const maxAllow  = isClass ? 1 : MAX_EX
  const dayData   = selectedDay ? EXERCISES[selectedDay] : null
  const allItems  = dayData ? dayData.items : []
  const chosen    = allItems.filter(ex => selected.has(ex.id))
  const dc        = selectedDay ? DAY_COLORS[selectedDay] : null
  const isComplete = selected.size >= maxAllow

  const hintText = !selectedDay ? ''
    : selected.size === 0 ? (isClass ? 'Select 1 class for today.' : `Select ${MAX_EX} exercises to build your workout.`)
    : selected.size < maxAllow ? `${maxAllow - selected.size} more to go.`
    : isClass ? 'Your class is selected below.' : 'All 3 selected — your workout is ready!'

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
<div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: "...", boxSizing: 'border-box' }}>
  <HomeBanner />
  <div style={{ maxWidth: '820px', margin: '0 auto', padding: '64px 24px 80px' }}>
    
        {/* Page header */}
        <header style={{ textAlign: 'center', marginBottom: '52px' }}>
          <Ornament />
          <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.bark, fontWeight: 600, marginBottom: '14px' }}>
            your personal plan
          </p>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 700, fontStyle: 'italic', color: C.cactus, margin: '0 0 10px', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            Workout Builder
          </h1>
          <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: '15px', color: C.olive, margin: '0 0 28px' }}>
            pick your day, build your session
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ height: '1px', width: '32px', backgroundColor: C.mint }} />
            <div style={{ height: '1px', width: '64px', backgroundColor: C.taupe }} />
            <div style={{ height: '1px', width: '32px', backgroundColor: C.mint }} />
          </div>
        </header>

        {/* Day tabs */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: C.bark, whiteSpace: 'nowrap' }}>Choose your day</span>
            <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {DAYS.map(d => {
              const active = selectedDay === d.id
              const col    = DAY_COLORS[d.id]
              return (
                <button
                  key={d.id}
                  className="wb-day-tab"
                  onClick={() => selectDay(d.id)}
                  style={{
                    fontFamily: "'Zilla Slab', Georgia, serif",
                    fontSize: '13px', fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '9px 22px',
                    borderRadius: '24px',
                    border: `1.5px solid ${active ? col.bg : C.taupe}`,
                    background: active ? col.bg : C.white,
                    color: active ? '#fff' : C.bark,
                    cursor: 'pointer',
                  }}
                >
                  {d.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Exercise picker */}
        {dayData && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto 10px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: C.bark, whiteSpace: 'nowrap' }}>{dayData.label}</span>
              <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
            </div>
            {hintText && (
              <p style={{ fontSize: '12px', color: C.bark, fontStyle: 'italic', margin: '0 0 16px' }}>{hintText}</p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {allItems.map(ex => {
                const isSel  = selected.has(ex.id)
                const isDis  = !isSel && selected.size >= maxAllow
                return (
                  <button
                    key={ex.id}
                    className="wb-ex-card"
                    disabled={isDis}
                    onClick={() => !isDis && toggleExercise(ex.id)}
                    style={{
                      background: isSel ? dc.lt : C.white,
                      border: `1.5px solid ${isSel ? dc.bg : C.mint}`,
                      borderRadius: '8px',
                      padding: '14px',
                      textAlign: 'left',
                      cursor: isDis ? 'not-allowed' : 'pointer',
                      opacity: isDis ? 0.4 : 1,
                      fontFamily: "'Zilla Slab', Georgia, serif",
                    }}
                  >
                    {/* Check + name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                      <span style={{
                        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                        border: `1.5px solid ${isSel ? dc.bg : C.taupe}`,
                        background: isSel ? dc.bg : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '9px', color: '#fff',
                      }}>
                        {isSel && '✓'}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: C.cactus, lineHeight: 1.2 }}>{ex.name}</span>
                    </div>
                    {/* Target */}
                    <p style={{ fontSize: '11px', color: C.bark, margin: '0 0 9px', lineHeight: 1.4 }}>{ex.target}</p>
                    {/* Machine chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {ex.machines.map(m => <MachinePill key={m} name={m} />)}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Workout card */}
        {chosen.length > 0 && (
          <>
            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '36px 0 28px' }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: C.thistle, transform: 'rotate(45deg)', flexShrink: 0 }} />
              <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
            </div>

            <div style={{ maxWidth: '820px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: C.bark, whiteSpace: 'nowrap' }}>Your session</span>
              <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
            </div>
            
            <div style={{ background: C.white, border: `1px solid ${C.mint}`, borderRadius: '10px', padding: '28px 26px', textAlign: 'left' }}>              {/* Card header */}
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '22px', fontWeight: 700, color: C.cactus, margin: '0 0 4px' }}>
                {DAYS.find(d => d.id === selectedDay)?.label} session
              </h2>
              <p style={{ fontSize: '12px', color: C.bark, margin: '0 0 22px' }}>
                45–60 min · {chosen.length} of {maxAllow} selected{isComplete ? ' · Ready to go ✓' : ''}
              </p>

              {chosen.map((ex, idx) => {
                const numSets = getSetCount(ex.sets)
                const done    = completedSets[ex.id] || 0
                const w       = weights[ex.id]  || 0
                const feel    = feelings[ex.id] || null
                const timer   = timers[ex.id]   || null
                const pct     = timer ? Math.max(0, (timer.remaining / timer.total) * 100) : 100

                return (
                  <div key={ex.id} style={{ borderTop: `1px solid ${C.mint}`, paddingTop: '20px', marginTop: idx === 0 ? 0 : '20px' }}>
                    <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '17px', fontWeight: 700, color: C.cactus, margin: '0 0 4px' }}>
                      {ex.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: C.bark, lineHeight: 1.65, margin: '0 0 12px' }}>{ex.desc}</p>

                    {/* Sets badge */}
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{
                        fontFamily: "'Zilla Slab', Georgia, serif", fontSize: '12px', fontWeight: 600,
                        background: dc.lt, color: dc.dk,
                        padding: '4px 12px', borderRadius: '20px',
                        border: `1px solid ${dc.pill}`,
                      }}>
                        {ex.sets}
                      </span>
                    </div>

                    {/* Machine chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                      {ex.machines.map(m => <MachinePill key={m} name={m} />)}
                    </div>

                    {!isClass && (
                      <>
                        {/* Weight control */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          <span style={{ fontSize: '11px', color: C.bark, whiteSpace: 'nowrap' }}>Weight (lbs)</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <button className="wb-weight-btn" onClick={() => adjustWeight(ex.id, -5)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${C.taupe}`, background: C.bg, color: C.cactus, fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 1 }}>−</button>
                            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '15px', fontWeight: 700, color: C.cactus, minWidth: '72px', textAlign: 'center' }}>
                              {w === 0 ? 'Start light' : `${w} lbs`}
                            </span>
                            <button className="wb-weight-btn" onClick={() => adjustWeight(ex.id, 5)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${C.taupe}`, background: C.bg, color: C.cactus, fontSize: '17px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 1 }}>+</button>
                          </div>
                          {w === 0
                            ? <span style={{ fontSize: '11px', color: C.bark, fontStyle: 'italic' }}>Last 2–3 reps should feel challenging but your form stays solid</span>
                            : <span style={{ fontSize: '11px', color: C.bark }}>Last used</span>
                          }
                        </div>

                        {/* Set tracker */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
                          {Array.from({ length: numSets }, (_, i) => {
                            const isDone = i < done
                            return (
                              <button
                                key={i}
                                className="wb-set-pill"
                                onClick={() => toggleSet(ex.id, i, numSets)}
                                style={{
                                  fontFamily: "'Zilla Slab', Georgia, serif",
                                  fontSize: '12px', fontWeight: 500,
                                  padding: '5px 13px', borderRadius: '20px',
                                  border: `1px solid ${isDone ? dc.bg : C.taupe}`,
                                  background: isDone ? dc.lt : C.bg,
                                  color: isDone ? dc.dk : C.bark,
                                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                                }}
                              >
                                {isDone && <span style={{ fontSize: '10px' }}>✓</span>}
                                Set {i + 1}
                              </button>
                            )
                          })}
                          {done > 0 && done < numSets && <span style={{ fontSize: '12px', color: C.bark }}>{numSets - done} left</span>}
                          {done === numSets && <span style={{ fontSize: '12px', fontWeight: 600, color: C.cactus }}>Done!</span>}
                        </div>

                        {/* Rest timer */}
                        {timer && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', borderRadius: '8px', background: C.bg, border: `1px solid ${C.mint}`, marginBottom: '12px' }}>
                            <span style={{ fontSize: '11px', color: C.bark, whiteSpace: 'nowrap' }}>Rest</span>
                            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '17px', fontWeight: 700, color: C.cactus, minWidth: '40px' }}>{fmtTime(timer.remaining)}</span>
                            <div style={{ flex: 1, height: '4px', background: C.taupe, borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ height: '4px', width: `${pct}%`, background: C.cactus, borderRadius: '2px', transition: 'width 1s linear' }} />
                            </div>
                            <button onClick={() => clearTimerFor(ex.id)} style={{ fontFamily: "'Zilla Slab', Georgia, serif", fontSize: '11px', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${C.taupe}`, background: C.white, color: C.bark, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                              Skip
                            </button>
                          </div>
                        )}

                        {/* How'd it feel */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11px', color: C.bark, marginRight: '2px' }}>How'd it feel?</span>
                          {[['easy', 'Too easy'], ['good', 'Good'], ['hard', 'Hard']].map(([key, label]) => {
                            const isActive = feel === key
                            const activeBg = key === 'easy' ? T.cactusLt : key === 'good' ? '#e8edf5' : '#f5ece8'
                            const activeBorder = key === 'easy' ? C.cactus : key === 'good' ? '#4a6a9a' : '#9a5a4a'
                            const activeColor  = key === 'easy' ? T.cactusDk : key === 'good' ? '#2a4a7a' : '#7a3a2a'
                            return (
                              <button key={key} className="wb-feel-btn" onClick={() => setFeeling(ex.id, key)} style={{
                                fontFamily: "'Zilla Slab', Georgia, serif",
                                fontSize: '11px', fontWeight: 500,
                                padding: '4px 11px', borderRadius: '20px',
                                border: `1px solid ${isActive ? activeBorder : C.taupe}`,
                                background: isActive ? activeBg : C.bg,
                                color: isActive ? activeColor : C.bark,
                                cursor: 'pointer',
                              }}>
                                {label}
                              </button>
                            )
                          })}
                          {feel && <span style={{ fontSize: '11px', color: C.bark, fontStyle: 'italic' }}>{FEEL_NOTES[feel]}</span>}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Footer */}
        <footer style={{ marginTop: '64px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.taupe, fontWeight: 500, whiteSpace: 'nowrap' }}>Sarah Osentowski</span>
          <div style={{ height: '1px', flex: 1, backgroundColor: C.mint }} />
        </footer>

      </div>
    </div>
  )
}
