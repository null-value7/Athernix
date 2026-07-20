// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTeacherDashboard } from '@/controllers/teacherRol/teacherDashboard';
import { STATUS_META, MISSION_STATUS_META, DIFFICULTY_META } from '@/models/teacher';
import '../styles/teacher.css';

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

// ── Sub-secciones ────────────────────────────────────────────

function ResumenSection({ classes, stats, missions, onNewMission, onGoSection, onSelectClass }) {
  const cards = [
    { label: 'ESTUDIANTES', value: stats.totalStudents, color: C_PINK, icon: '👥' },
    { label: 'MISIONES ACTIVAS', value: stats.activeMissions, color: C_ORANGE, icon: '🚀' },
    { label: 'PROGRESO PROMEDIO', value: `${stats.avgProgress}%`, color: C_YELLOW, icon: '📈' },
    { label: 'EN RIESGO', value: stats.atRisk, color: '#FF3B5C', icon: '⚠️' },
  ]

  return (
    <div className="space-y-10">
      <div className="tch-stagger grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="tch-stagger-item tch-glass tch-stat">
            <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
            <strong style={{ color: c.color }}>{c.value}</strong>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="tch-reveal">
        <div className="flex items-center justify-between mb-5">
          <p className="tch-tag" style={{ color: C_ORANGE }}><span className="tch-tag-dot" style={{ background: C_ORANGE }}></span> TUS CLASES</p>
          <button onClick={onNewMission} className="mono text-xs px-4 py-2 rounded-full" style={{ background: `linear-gradient(135deg,${C_PINK},${C_ORANGE})`, color: '#08000a', fontWeight: 700 }}>
            + NUEVA MISIÓN
          </button>
        </div>
        <div className="tch-stagger grid grid-cols-1 md:grid-cols-3 gap-4">
          {classes.map((c) => (
            <div key={c.id} className="tch-stagger-item tch-glass tch-class-card" onClick={() => { onSelectClass(c.id); onGoSection('estudiantes') }}>
              <p className="mono text-xs text-white/40">{c.gradeLevel.toUpperCase()}</p>
              <h4 className="mt-1 text-xl" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>{c.name}</h4>
              <p className="mt-2 text-xs text-white/50">{c.studentCount} estudiantes</p>
              <div className="mt-3 tch-progress-track">
                <div className="tch-progress-fill" style={{ width: `${c.avgProgress}%`, background: c.color }}></div>
              </div>
              <p className="mono text-xs mt-1.5" style={{ color: c.color }}>{c.avgProgress}% de avance promedio</p>
            </div>
          ))}
        </div>
      </div>

      <div className="tch-reveal">
        <p className="tch-tag mb-5" style={{ color: C_PINK }}><span className="tch-tag-dot" style={{ background: C_PINK }}></span> MISIONES RECIENTES</p>
        <div className="space-y-3">
          {missions.slice(0, 3).map((m) => {
            const st = MISSION_STATUS_META[m.status]
            return (
              <div key={m.id} className="tch-glass p-4 flex items-center justify-between gap-4 cursor-pointer" onClick={() => onGoSection('misiones')}>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{m.title}</p>
                  <p className="mono text-xs text-white/40 mt-0.5">Vence: {m.dueDate}</p>
                </div>
                <span className="tch-status-pill mono flex-shrink-0" style={{ color: st.color }}>{st.label.toUpperCase()}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MissionCard({ mission, subject, cls, onToggleStatus }) {
  const st = MISSION_STATUS_META[mission.status]
  const diff = DIFFICULTY_META[mission.difficulty]
  const pct = mission.assignedCount ? Math.round((mission.completedCount / mission.assignedCount) * 100) : 0
  return (
    <div className="tch-stagger-item tch-glass tch-mission">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.2rem' }}>{subject?.icon}</span>
          <div>
            <p className="mono text-xs" style={{ color: subject?.color }}>{subject?.name?.toUpperCase()}</p>
            <p className="mono text-xs text-white/35">{cls?.name}</p>
          </div>
        </div>
        <span className="tch-status-pill mono" style={{ color: st.color }} onClick={(e) => { e.stopPropagation(); onToggleStatus(mission.id) }}>
          {st.label.toUpperCase()}
        </span>
      </div>

      <h4 className="mt-4 text-lg font-bold" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>{mission.title}</h4>
      <p className="mt-1 text-sm text-white/55 leading-relaxed">{mission.description}</p>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <span className="mono text-xs px-2.5 py-1 rounded-full border" style={{ color: diff.color, borderColor: diff.color }}>{diff.label}</span>
        <span className="mono text-xs text-white/45">✦ {mission.xpReward} XP</span>
        <span className="mono text-xs text-white/45">📅 {mission.dueDate}</span>
      </div>

      <div className="mt-4">
        <div className="tch-progress-track">
          <div className="tch-progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${C_PINK},${C_ORANGE})` }}></div>
        </div>
        <p className="mono text-xs text-white/40 mt-1.5">{mission.completedCount}/{mission.assignedCount} completadas · {pct}%</p>
      </div>
    </div>
  )
}

function MisionesSection({ subjects, classes, filteredMissions, selectedClassId, onSelectClass, onOpenModal, onToggleStatus }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className={`tch-pill ${selectedClassId === 'all' ? 'tch-pill-active' : ''}`} onClick={() => onSelectClass('all')}>TODAS LAS CLASES</span>
          {classes.map((c) => (
            <span key={c.id} className={`tch-pill ${selectedClassId === c.id ? 'tch-pill-active' : ''}`} onClick={() => onSelectClass(c.id)}>{c.name.toUpperCase()}</span>
          ))}
        </div>
        <button onClick={() => onOpenModal()} className="mono text-xs px-4 py-2 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg,${C_PINK},${C_ORANGE})`, color: '#08000a', fontWeight: 700 }}>
          + NUEVA MISIÓN
        </button>
      </div>

      {filteredMissions.length === 0 ? (
        <div className="tch-glass p-10 text-center text-white/40 text-sm">No hay misiones para este filtro todavía.</div>
      ) : (
        <div className="tch-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissions.map((m) => (
            <MissionCard
              key={m.id}
              mission={m}
              subject={subjects.find((s) => s.id === m.subjectId)}
              cls={classes.find((c) => c.id === m.classId)}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function StudentRow({ student, cls, isExpanded, onSelect }) {
  const status = STATUS_META[student.status]
  const pct = student.missionsTotal ? Math.round((student.missionsDone / student.missionsTotal) * 100) : 0
  return (
    <div className={`tch-stagger-item tch-glass tch-student ${isExpanded ? 'tch-expanded' : ''}`} onClick={() => onSelect(student.id)}>
      <div className="flex items-center gap-3">
        <div className="tch-avatar" style={{ background: `${cls?.color}22`, border: `1px solid ${cls?.color}55`, color: cls?.color }}>
          {student.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{student.name}</p>
          <p className="mono text-xs text-white/40">{cls?.name} · {student.lastActive}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="mono text-xs" style={{ color: C_YELLOW }}>Nv.{student.level} · {student.xp} XP</p>
          <span className="mono text-xs px-2 py-0.5 rounded-full border mt-1 inline-block" style={{ color: status.color, borderColor: status.color }}>{status.label}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="tch-progress-track flex-1">
          <div className="tch-progress-fill" style={{ width: `${pct}%`, background: status.color }}></div>
        </div>
        <span className="mono text-xs text-white/40 flex-shrink-0">{student.missionsDone}/{student.missionsTotal}</span>
        <span className="mono text-xs text-white/40 flex-shrink-0">🔥 {student.streakDays}d</span>
      </div>

      <div className="tch-student-detail">
        <div className="pt-3 border-t grid grid-cols-2 gap-3" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
          <div>
            <p className="mono text-xs text-white/35">MISIONES PENDIENTES</p>
            <p className="text-sm font-semibold mt-0.5">{student.missionsTotal - student.missionsDone}</p>
          </div>
          <div>
            <p className="mono text-xs text-white/35">ÚLTIMA CONEXIÓN</p>
            <p className="text-sm font-semibold mt-0.5">{student.lastActive}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function EstudiantesSection({ classes, filteredStudents, selectedClassId, onSelectClass, search, onSearch, selectedStudentId, onSelectStudent }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="tch-search flex-1">
          <span className="mono text-white/30 text-xs">🔎</span>
          <input placeholder="Buscar estudiante…" value={search} onChange={e => onSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={`tch-pill ${selectedClassId === 'all' ? 'tch-pill-active' : ''}`} onClick={() => onSelectClass('all')}>TODAS</span>
          {classes.map((c) => (
            <span key={c.id} className={`tch-pill ${selectedClassId === c.id ? 'tch-pill-active' : ''}`} onClick={() => onSelectClass(c.id)}>{c.name.split(' — ')[0].toUpperCase()}</span>
          ))}
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="tch-glass p-10 text-center text-white/40 text-sm">No se encontraron estudiantes.</div>
      ) : (
        <div className="tch-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map((s) => (
            <StudentRow
              key={s.id}
              student={s}
              cls={classes.find((c) => c.id === s.classId)}
              isExpanded={selectedStudentId === s.id}
              onSelect={onSelectStudent}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MateriasSection({ subjects, classes, assignments, onToggle }) {
  return (
    <div className="tch-stagger grid grid-cols-1 md:grid-cols-2 gap-5">
      {subjects.map((s) => (
        <div key={s.id} className="tch-stagger-item tch-glass tch-subject">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
            <span className="mono text-xs px-2.5 py-1 rounded-full" style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}40` }}>{s.moduleLabel}</span>
          </div>
          <h4 className="mt-4 text-xl" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>{s.name}</h4>
          <p className="mt-1 text-xs text-white/45">Asignar a clases:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {classes.map((c) => {
              const on = (assignments[s.id] || []).includes(c.id)
              return (
                <span key={c.id} className={`tch-chip ${on ? 'tch-chip-on' : ''}`} onClick={() => onToggle(s.id, c.id)}>
                  {on ? '✓ ' : ''}{c.name.split(' — ')[0]}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function MissionModal({ classes, subjects, draft, onChange, onCancel, onSubmit }) {
  return (
    <div className="tch-modal-overlay" onClick={onCancel}>
      <div className="tch-modal" onClick={e => e.stopPropagation()}>
        <p className="tch-tag mb-1" style={{ color: C_ORANGE }}><span className="tch-tag-dot" style={{ background: C_ORANGE }}></span> NUEVA MISIÓN</p>
        <h3 className="text-2xl mb-6" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>ASIGNA UNA TAREA</h3>

        <div className="space-y-4">
          <div className="tch-field">
            <label>TÍTULO</label>
            <input value={draft.title} onChange={e => onChange({ title: e.target.value })} placeholder="Ej. Recorre la Ruta de las Flores" />
          </div>
          <div className="tch-field">
            <label>DESCRIPCIÓN</label>
            <textarea value={draft.description} onChange={e => onChange({ description: e.target.value })} placeholder="¿Qué deben hacer tus estudiantes?" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="tch-field">
              <label>MATERIA</label>
              <select value={draft.subjectId} onChange={e => onChange({ subjectId: e.target.value })}>
                {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="tch-field">
              <label>CLASE</label>
              <select value={draft.classId} onChange={e => onChange({ classId: e.target.value })}>
                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="tch-field">
              <label>DIFICULTAD</label>
              <select value={draft.difficulty} onChange={e => onChange({ difficulty: e.target.value })}>
                <option value="fácil">Fácil</option>
                <option value="media">Media</option>
                <option value="difícil">Difícil</option>
              </select>
            </div>
            <div className="tch-field">
              <label>XP</label>
              <input type="number" min={10} step={10} value={draft.xpReward} onChange={e => onChange({ xpReward: Number(e.target.value) || 0 })} />
            </div>
            <div className="tch-field">
              <label>FECHA LÍMITE</label>
              <input value={draft.dueDate} onChange={e => onChange({ dueDate: e.target.value })} placeholder="Ej. 20 jul" />
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-end gap-3">
          <button onClick={onCancel} className="mono text-xs px-5 py-2.5 rounded-full border border-white/15 text-white/60 hover:border-white/35 transition-colors">CANCELAR</button>
          <button onClick={onSubmit} disabled={!draft.title.trim()}
            className="mono text-xs px-6 py-2.5 rounded-full font-bold"
            style={{ background: draft.title.trim() ? `linear-gradient(135deg,${C_PINK},${C_ORANGE})` : 'rgba(255,255,255,.08)', color: draft.title.trim() ? '#08000a' : 'rgba(255,255,255,.35)', cursor: draft.title.trim() ? 'pointer' : 'not-allowed' }}>
            PUBLICAR MISIÓN
          </button>
        </div>
      </div>
    </div>
  )
}

// ── ═══════════════════════════════════════════════════════════
// ── MAIN VIEW ─────────────────────────────────────────────────
// ── ═══════════════════════════════════════════════════════════

export default function TeacherDashboardPage() {
  const {
    state, copy, subjects, classes, filteredStudents, filteredMissions,
    subjectAssignments, stats, missions,
    goSection, selectClass, setStudentSearch, selectStudent,
    openMissionModal, closeMissionModal, updateDraft, createMission,
    toggleMissionStatus, toggleSubjectClass,
  } = useTeacherDashboard()

  const containerRef = useRef(null)
  const heroCanvasRef = useRef(null)

  // ── THREE.JS: partículas ambiente del hero (con protección WebGL) ──
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = heroCanvasRef.current
    if (!canvas) return

    if (!isWebGLAvailable()) {
      canvas.closest('.tch-hero-canvas-wrap')?.classList.add('tch-no-webgl')
      return
    }

    const W = canvas.offsetWidth || 800
    const H = canvas.offsetHeight || 340

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, failIfMajorPerformanceCaveat: false })
    } catch (err) {
      console.warn('[Athernix] WebGL no disponible, se omite la animación del hero:', err)
      canvas.closest('.tch-hero-canvas-wrap')?.classList.add('tch-no-webgl')
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
    const c1 = new THREE.Color(C_PINK), c2 = new THREE.Color(C_ORANGE), c3 = new THREE.Color(C_GREEN)
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
      tl.fromTo('.tch-badge', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo('.tch-title', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.2')
        .fromTo('.tch-sub', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.25')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // ── GSAP: reveals con scroll ──
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.tch-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.utils.toArray('.tch-stagger').forEach((group) => {
        const items = group.querySelectorAll('.tch-stagger-item')
        gsap.fromTo(items, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [state.section])

  const tabs = [
    ['resumen', 'Resumen', '◈'],
    ['misiones', 'Misiones', '🚀'],
    ['estudiantes', 'Estudiantes', '👥'],
    ['materias', 'Materias', '📚'],
  ]

  return (
    <div ref={containerRef} className="tch-root relative min-h-screen" style={{ paddingTop: '80px' }}>
      <div className="tch-orb" style={{ width: 560, height: 560, top: '-15%', right: '-10%', background: 'radial-gradient(circle,rgba(255,0,110,0.12) 0%,transparent 70%)' }} />
      <div className="tch-orb" style={{ width: 420, height: 420, bottom: '0%', left: '-10%', background: 'radial-gradient(circle,rgba(0,229,160,0.08) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">

        {/* HERO */}
        <section className="tch-hero p-6 md:p-10">
          <div className="tch-hero-canvas-wrap">
            <canvas ref={heroCanvasRef}></canvas>
          </div>
          <div className="relative z-10">
            <div className="tch-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(255,107,0,0.07)', border: '1px solid rgba(255,107,0,0.22)', opacity: 0 }}>
              <span style={{ color: C_ORANGE, fontSize: '0.7rem' }}>◈</span>
              <span className="mono text-xs font-bold tracking-widest uppercase" style={{ color: `${C_ORANGE}cc`, letterSpacing: '0.2em', fontSize: '0.6rem' }}>{copy.eyebrow}</span>
            </div>
            <h1 className="tch-title font-black leading-none mb-4" style={{ fontFamily: F_DISPLAY, fontSize: 'clamp(2.2rem,5vw,3.6rem)', letterSpacing: '.01em', opacity: 0 }}>
              PANEL DE <span style={{ background: `linear-gradient(90deg,${C_PINK},${C_ORANGE},${C_YELLOW})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CLASSROOM</span>
            </h1>
            <p className="tch-sub text-sm text-white/60 max-w-lg leading-relaxed" style={{ opacity: 0 }}>{copy.heroSub}</p>
          </div>
        </section>

        {/* TABS */}
        <div className="tch-tabs tch-reveal">
          {tabs.map(([id, label, icon]) => (
            <span key={id} className={`tch-tab ${state.section === id ? 'tch-tab-active' : ''}`} onClick={() => goSection(id)}>
              {icon} {label.toUpperCase()}
            </span>
          ))}
        </div>

        {/* CONTENIDO POR SECCIÓN */}
        {state.section === 'resumen' && (
          <ResumenSection classes={classes} stats={stats} missions={missions} onNewMission={() => openMissionModal()} onGoSection={goSection} onSelectClass={selectClass} />
        )}
        {state.section === 'misiones' && (
          <MisionesSection
            subjects={subjects} classes={classes} filteredMissions={filteredMissions}
            selectedClassId={state.selectedClassId} onSelectClass={selectClass}
            onOpenModal={openMissionModal} onToggleStatus={toggleMissionStatus}
          />
        )}
        {state.section === 'estudiantes' && (
          <EstudiantesSection
            classes={classes} filteredStudents={filteredStudents}
            selectedClassId={state.selectedClassId} onSelectClass={selectClass}
            search={state.studentSearch} onSearch={setStudentSearch}
            selectedStudentId={state.selectedStudentId} onSelectStudent={selectStudent}
          />
        )}
        {state.section === 'materias' && (
          <MateriasSection subjects={subjects} classes={classes} assignments={subjectAssignments} onToggle={toggleSubjectClass} />
        )}

        {/* PORTAL DEL ESTUDIANTE — próximamente */}
        <div className="tch-reveal tch-glass p-8 text-center" style={{ borderColor: `${C_GREEN}30` }}>
          <p className="mono text-xs tracking-widest text-white/40 mb-3">🔒 PRÓXIMAMENTE</p>
          <h3 className="text-2xl mb-3" style={{ fontFamily: F_DISPLAY, letterSpacing: '.02em' }}>
            PORTAL DEL <span style={{ color: C_GREEN }}>ESTUDIANTE</span>
          </h3>
          <p className="text-sm text-white/55 max-w-md mx-auto">{copy.comingSoon}</p>
        </div>
      </div>

      {state.showMissionModal && (
        <MissionModal
          classes={classes} subjects={subjects} draft={state.missionDraft}
          onChange={updateDraft} onCancel={closeMissionModal} onSubmit={createMission}
        />
      )}
    </div>
  )
}