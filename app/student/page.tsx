// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Backpack, 
  Rocket, 
  Trophy, 
  Calendar, 
  User, 
  GraduationCap, 
  Check, 
  TrendingUp, 
  Wrench 
} from 'lucide-react';
import { useStudentDashboard } from '@/controllers/StudentRol/student';
import { DIFFICULTY_META } from '@/models/teacher';
import '../styles/student.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const F_DISPLAY = "'Bebas Neue', sans-serif"
const C_PINK = '#FF006E'
const C_ORANGE = '#FF6B00'
const C_YELLOW = '#FFD700'
const C_GREEN = '#00E5A0'

function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

function MisClasesSection({ joinedClasses, subjects, onOpenJoin, onLeave, onGoMissions }) {
  return (
    <div className="space-y-6">
      {joinedClasses.length === 0 && (
        <div className="std-glass p-10 text-center" style={{ borderColor: 'rgba(0,229,160,.3)' }}>
          <Backpack size={48} style={{ color: C_GREEN }} />
          <h3 className="mt-3 text-2xl" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>AÚN NO TIENES CLASES</h3>
          <p className="mt-2 text-sm text-white/55 max-w-md mx-auto">Pídele el código a tu profesor y únete para ver tus misiones.</p>
          <button onClick={onOpenJoin} className="mono mt-5 text-xs px-6 py-3 rounded-full font-bold" style={{ background: `linear-gradient(135deg,${C_GREEN},${C_YELLOW})`, color: '#08000a' }}>
            + UNIRME A UNA CLASE
          </button>
        </div>
      )}

      {joinedClasses.length > 0 && (
        <div className="std-stagger grid grid-cols-1 md:grid-cols-3 gap-4">
          {joinedClasses.map((c) => {
            const subjectsForClass = subjects.filter((s) => (s.classIds || []).includes(c.id))
            return (
              <div key={c.id} className="std-stagger-item std-glass std-class-card">
                <p className="mono text-xs text-white/40">{c.gradeLevel.toUpperCase()}</p>
                <h4 className="mt-1 text-xl" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>{c.name}</h4>
                <p className="mt-2 text-xs text-white/50 flex items-center gap-1"><User size={12} /> {c.teacherName}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {subjectsForClass.map((s) => (
                    <span key={s.id} className="mono text-xs px-2 py-0.5 rounded-full" style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}40` }}>{s.icon} {s.name}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button onClick={onGoMissions} className="mono text-xs px-3 py-1.5 rounded-full flex-1" style={{ background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.7)' }}>Ver misiones</button>
                  <button onClick={() => onLeave(c.id)} className="mono text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,0,110,.08)', color: C_PINK }}>Salir</button>
                </div>
              </div>
            )
          })}
          <div className="std-stagger-item std-join-card" onClick={onOpenJoin}>
            <span style={{ fontSize: '1.8rem', color: C_GREEN }}>＋</span>
            <p className="mono text-xs mt-2" style={{ color: C_GREEN }}>UNIRME A OTRA CLASE</p>
          </div>
        </div>
      )}
    </div>
  )
}

function MissionCard({ mission, subject, cls, onToggle }) {
  const diff = DIFFICULTY_META[mission.difficulty]
  const done = mission.studentState === 'completada'
  return (
    <div className={`std-stagger-item std-glass std-mission ${done ? 'std-done' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.2rem' }}>{subject?.icon}</span>
          <div>
            <p className="mono text-xs" style={{ color: subject?.color }}>{subject?.name?.toUpperCase()}</p>
            <p className="mono text-xs text-white/35">{cls?.name}</p>
          </div>
        </div>
        <span className="std-status-pill mono" style={{ color: done ? C_GREEN : 'rgba(255,255,255,.5)' }} onClick={() => onToggle(mission.id)}>
          {done ? '✓ COMPLETADA' : 'PENDIENTE'}
        </span>
      </div>

      <h4 className="mt-4 text-lg font-bold" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>{mission.title}</h4>
      <p className="mt-1 text-sm text-white/55 leading-relaxed">{mission.description}</p>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <span className="mono text-xs px-2.5 py-1 rounded-full border" style={{ color: diff.color, borderColor: diff.color }}>{diff.label}</span>
        <span className="mono text-xs text-white/45">✦ {mission.xpReward} XP</span>
        <span className="mono text-xs text-white/45 flex items-center gap-1"><Calendar size={12} /> {mission.dueDate}</span>
      </div>

      <button
        onClick={() => onToggle(mission.id)}
        className="std-complete-btn mono mt-5"
        style={{
          background: done ? 'rgba(0,229,160,.12)' : `linear-gradient(135deg,${C_PINK},${C_ORANGE})`,
          color: done ? C_GREEN : '#08000a',
          border: done ? '1px solid rgba(0,229,160,.4)' : 'none',
        }}>
        {done ? 'MARCAR COMO PENDIENTE' : `COMPLETAR MISIÓN (+${mission.xpReward} XP)`}
      </button>
    </div>
  )
}

function MisionesSection({ joinedClasses, subjects, filteredMissions, missionClassFilter, onSetFilter, onToggle, onOpenJoin }) {
  if (joinedClasses.length === 0) {
    return (
      <div className="std-glass p-10 text-center">
        <p className="text-sm text-white/50">Únete a una clase primero para ver tus misiones.</p>
        <button onClick={onOpenJoin} className="mono mt-4 text-xs px-6 py-3 rounded-full font-bold" style={{ background: `linear-gradient(135deg,${C_GREEN},${C_YELLOW})`, color: '#08000a' }}>
          + UNIRME A UNA CLASE
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <span className={`std-pill ${missionClassFilter === 'all' ? 'std-pill-active' : ''}`} onClick={() => onSetFilter('all')}>TODAS</span>
        {joinedClasses.map((c) => (
          <span key={c.id} className={`std-pill ${missionClassFilter === c.id ? 'std-pill-active' : ''}`} onClick={() => onSetFilter(c.id)}>{c.name.split(' — ')[0].toUpperCase()}</span>
        ))}
      </div>

      {filteredMissions.length === 0 ? (
        <div className="std-glass p-10 text-center text-white/40 text-sm">No hay misiones para este filtro todavía.</div>
      ) : (
        <div className="std-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissions.map((m) => (
            <MissionCard
              key={m.id}
              mission={m}
              subject={subjects.find((s) => s.id === m.subjectId)}
              cls={joinedClasses.find((c) => c.id === m.classId)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProgresoSection({ stats, badges }) {
  const cards = [
    { label: 'XP TOTAL', value: stats.xp, color: C_ORANGE, icon: Trophy },
    { label: 'NIVEL', value: stats.level, color: C_YELLOW, icon: GraduationCap },
    { label: 'COMPLETADAS', value: `${stats.completed}/${stats.total}`, color: C_GREEN, icon: Check },
    { label: 'AVANCE', value: `${stats.pct}%`, color: C_PINK, icon: TrendingUp },
  ]
  return (
    <div className="space-y-10">
      <div className="std-stagger grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="std-stagger-item std-glass std-stat">
            <span style={{ fontSize: '1.1rem' }}><c.icon size={20} style={{ color: c.color }} /></span>
            <strong style={{ color: c.color }}>{c.value}</strong>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="std-reveal std-glass p-6">
        <div className="flex justify-between mono text-xs mb-2" style={{ color: 'rgba(255,255,255,.5)' }}>
          <span>PROGRESO AL SIGUIENTE NIVEL</span>
          <span style={{ color: C_ORANGE }}>{stats.xpIntoLevel}/{stats.xpPerLevel} XP</span>
        </div>
        <div className="std-xp-track">
          <div className="std-xp-fill" style={{ width: `${Math.round((stats.xpIntoLevel / stats.xpPerLevel) * 100)}%` }}></div>
        </div>
      </div>

      <div className="std-reveal">
        <p className="std-tag mb-5" style={{ color: C_YELLOW }}><span className="std-tag-dot" style={{ background: C_YELLOW }}></span> LOGROS</p>
        <div className="std-stagger grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div key={b.id} className="std-stagger-item std-glass std-badge-card" style={{ opacity: b.unlocked ? 1 : 0.4 }}>
              <div className="std-badge-icon" style={{ background: b.unlocked ? `${b.color}22` : 'rgba(255,255,255,.05)', border: `1px solid ${b.unlocked ? b.color + '55' : 'rgba(255,255,255,.1)'}` }}>
                {b.icon}
              </div>
              <p className="text-xs font-semibold">{b.label}</p>
              <p className="mono text-xs text-white/40 mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JoinClassModal({ value, error, success, onChange, onCancel, onSubmit }) {
  return (
    <div className="std-modal-overlay" onClick={onCancel}>
      <div className="std-modal" onClick={e => e.stopPropagation()}>
        <p className="std-tag mb-1" style={{ color: C_GREEN }}><span className="std-tag-dot" style={{ background: C_GREEN }}></span> UNIRSE A UNA CLASE</p>
        <h3 className="text-2xl mb-2" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>CÓDIGO DE CLASE</h3>
        <p className="text-sm text-white/50 mb-5">Ingresa el código que te compartió tu profesor.</p>

        <div className="std-field">
          <label>CÓDIGO</label>
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSubmit()}
            placeholder="EJ. HIST-8A2K"
            autoFocus
          />
        </div>

        {error && <p className="mono text-xs mt-3" style={{ color: C_PINK }}>⚠ {error}</p>}
        {success && <p className="mono text-xs mt-3" style={{ color: C_GREEN }}>✓ {success}</p>}

        <div className="mt-7 flex items-center justify-end gap-3">
          <button onClick={onCancel} className="mono text-xs px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:border-white/35 transition-colors">CERRAR</button>
          <button onClick={onSubmit} className="mono text-xs px-6 py-2.5 rounded-full font-bold" style={{ background: `linear-gradient(135deg,${C_GREEN},${C_YELLOW})`, color: '#08000a' }}>
            UNIRME →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function StudentDashboardPage() {
  const {
    state, copy, profile, subjects,
    joinedClasses, filteredMissions, stats, badges,
    goSection, openJoinModal, closeJoinModal, setJoinCodeInput, joinClass, leaveClass,
    setMissionClassFilter, toggleMissionComplete,
  } = useStudentDashboard()

  const containerRef = useRef(null)
  const heroCanvasRef = useRef(null)

  // ── THREE.JS: partículas ambiente del hero (con protección WebGL) ──
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = heroCanvasRef.current
    if (!canvas) return

    if (!isWebGLAvailable()) {
      canvas.closest('.std-hero-canvas-wrap')?.classList.add('std-no-webgl')
      return
    }

    const W = canvas.offsetWidth || 800
    const H = canvas.offsetHeight || 340

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, failIfMajorPerformanceCaveat: false })
    } catch (err) {
      console.warn('[Athernix] WebGL no disponible, se omite la animación del hero:', err)
      canvas.closest('.std-hero-canvas-wrap')?.classList.add('std-no-webgl')
      return
    }
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.set(0, 0, 7)

    const N = 1800
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const seed = new Float32Array(N * 3)
    const c1 = new THREE.Color(C_GREEN), c2 = new THREE.Color(C_PINK), c3 = new THREE.Color(C_YELLOW)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      const c = [c1, c2, c3][i % 3]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
      seed[i * 3] = Math.random() * 100
      seed[i * 3 + 1] = Math.random() * 100
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
    const points = new THREE.Points(geo, mat)
    scene.add(points)
    const base = pos.slice()

    const clock = new THREE.Clock()
    let frameId
    function animate() {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const arr = geo.attributes.position.array
      for (let i = 0; i < N; i++) {
        const s0 = seed[i * 3], s1 = seed[i * 3 + 1]
        arr[i * 3] = base[i * 3] + Math.sin(t * 0.25 + s0) * 0.14
        arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.2 + s1) * 0.14
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.y += 0.0005
      renderer.render(scene, camera)
    }
    animate()

    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      geo.dispose(); mat.dispose(); renderer.dispose()
    }
  }, [])

  // ── GSAP: entrada del hero ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.std-badge', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo('.std-title', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.2')
        .fromTo('.std-sub', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.25')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // ── GSAP: reveals con scroll ──
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.std-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.utils.toArray('.std-stagger').forEach((group) => {
        const items = group.querySelectorAll('.std-stagger-item')
        gsap.fromTo(items, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [state.section, joinedClasses.length])

  const tabs = [
    ['clases', 'Mis Clases', Backpack],
    ['misiones', 'Misiones', Rocket],
    ['progreso', 'Progreso', Trophy],
  ]

  return (
    <div ref={containerRef} className="std-root relative min-h-screen" style={{ paddingTop: '80px' }}>
      <div className="std-orb" style={{ width: 560, height: 560, top: '-15%', right: '-10%', background: 'radial-gradient(circle,rgba(0,229,160,0.12) 0%,transparent 70%)' }} />
      <div className="std-orb" style={{ width: 420, height: 420, bottom: '0%', left: '-10%', background: 'radial-gradient(circle,rgba(255,0,110,0.08) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">

        {/* HERO */}
        <section className="std-hero p-6 md:p-10">
          <div className="std-hero-canvas-wrap">
            <canvas ref={heroCanvasRef}></canvas>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="std-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(0,229,160,0.07)', border: '1px solid rgba(0,229,160,0.22)', opacity: 0 }}>
                <span style={{ color: C_GREEN, fontSize: '0.7rem' }}>◈</span>
                <span className="mono text-xs font-bold tracking-widest uppercase" style={{ color: `${C_GREEN}cc`, letterSpacing: '0.2em', fontSize: '0.6rem' }}>{copy.eyebrow}</span>
              </div>
              <h1 className="std-title font-black leading-none mb-4" style={{ fontFamily: F_DISPLAY, fontSize: 'clamp(2.2rem,5vw,3.6rem)', letterSpacing: '.01em', opacity: 0 }}>
                HOLA, <span style={{ background: `linear-gradient(90deg,${C_GREEN},${C_PINK},${C_YELLOW})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{profile.firstName.toUpperCase()}</span>
              </h1>
              <p className="std-sub text-sm text-white/60 max-w-lg leading-relaxed" style={{ opacity: 0 }}>{copy.heroSub}</p>
            </div>
            <button onClick={openJoinModal} className="mono flex-shrink-0 text-xs px-6 py-3 rounded-full font-bold" style={{ background: `linear-gradient(135deg,${C_GREEN},${C_YELLOW})`, color: '#08000a' }}>
              + UNIRME A UNA CLASE
            </button>
          </div>
        </section>

        {/* TABS */}
        <div className="std-tabs std-reveal">
          {tabs.map(([id, label, icon]) => (
            <span key={id} className={`std-tab ${state.section === id ? 'std-tab-active' : ''}`} onClick={() => goSection(id)}>
              {typeof icon === 'string' ? icon : <icon size={16} />} {label.toUpperCase()}
            </span>
          ))}
        </div>

        {/* CONTENIDO POR SECCIÓN */}
        {state.section === 'clases' && (
          <MisClasesSection joinedClasses={joinedClasses} subjects={subjects} onOpenJoin={openJoinModal} onLeave={leaveClass} onGoMissions={() => goSection('misiones')} />
        )}
        {state.section === 'misiones' && (
          <MisionesSection
            joinedClasses={joinedClasses} subjects={subjects} filteredMissions={filteredMissions}
            missionClassFilter={state.missionClassFilter} onSetFilter={setMissionClassFilter}
            onToggle={toggleMissionComplete} onOpenJoin={openJoinModal}
          />
        )}
        {state.section === 'progreso' && (
          <ProgresoSection stats={stats} badges={badges} />
        )}

        {/* NOTA DE INTEGRACIÓN — próximamente conectado a la base de datos */}
        <div className="std-reveal std-glass p-8 text-center" style={{ borderColor: 'rgba(255,255,255,.1)' }}>
          <p className="mono text-xs tracking-widest text-white/40 mb-3 flex items-center justify-center gap-2"><Wrench size={12} /> EN CONSTRUCCIÓN</p>
          <h3 className="text-xl mb-2" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>
            TU PROGRESO SE GUARDA <span style={{ color: C_GREEN }}>LOCALMENTE</span> POR AHORA
          </h3>
          <p className="text-sm text-white/50 max-w-md mx-auto">Pronto conectaremos este panel con tu cuenta real, para que tus clases y misiones persistan entre sesiones.</p>
        </div>
      </div>

      {state.showJoinModal && (
        <JoinClassModal
          value={state.joinCodeInput} error={state.joinError} success={state.joinSuccess}
          onChange={setJoinCodeInput} onCancel={closeJoinModal} onSubmit={joinClass}
        />
      )}
    </div>
  )
}