'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { TextSplitter } from '@/components/ui/TextSplitter'
import { MagneticElement } from '@/components/ui/MagneticElement'
import { ParallaxLayer } from '@/components/ui/ParallaxLayer'
gsap.registerPlugin(ScrollTrigger)
import * as THREE from 'three'
import { useAdminController } from '@/controllers/Admin/dashboardControl'
import {
  AdminSection, AdminUser, ActivityLog, ChartPoint,
  AdminStats, UserRole, VRGlassesModel,
  getRoleMeta, getActionMeta, getVRMeta, getFullName, getInitials,
  formatDateTime, formatDate,
} from '@/models/Admin/dashboard'
import '../styles/Admindashboard.css'

// ── Design tokens ──────────────────────────────────────────────
// Misma paleta/tipografía que /modulos: rosa · naranja · amarillo,
// Bebas Neue para display, JetBrains Mono para etiquetas/datos.
const F = {
  display: "'Bebas Neue','Plus Jakarta Sans',sans-serif",
  mono:    "'JetBrains Mono',monospace",
  body:    "'Plus Jakarta Sans',sans-serif",
}
const C = {
  pink:   '#FF006E', orange: '#FF6B00', gold: '#FFD700',
  cyan:   '#00e5a0', blue:   '#60a5fa', purple: '#c060ff', red: '#ff4e50',
  text:   '#f5eee8',
  dim:    'rgba(255,255,255,0.55)',
  dimmer: 'rgba(255,255,255,0.28)',
}

// ── Icons ──────────────────────────────────────────────────────
const Ico = {
  Menu:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>,
  Chart:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>,
  Users:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>,
  Logs:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/></svg>,
  Logout:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/></svg>,
  Refresh: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>,
  Search:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>,
  Edit:    () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/></svg>,
  Close:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>,
  ChevL:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>,
  ChevR:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>,
}

// ── Ambient Three.js particle field (idéntico lenguaje visual al hero de /modulos,
//    pero discreto: baja densidad y opacidad para no competir con los datos) ─────
function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const W = window.innerWidth, H = window.innerHeight
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200)
    camera.position.set(0, 0, 11)

    const N = 3200
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const seed = new Float32Array(N * 2)
    const c1 = new THREE.Color('#FF006E')
    const c2 = new THREE.Color('#FF6B00')
    const c3 = new THREE.Color('#FFD700')

    for (let i = 0; i < N; i++) {
      const r = 5 + Math.random() * 6
      const ang = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(ang)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(ang) * 0.55
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 4

      const t = Math.random()
      const mix = t < 0.5 ? t * 2 : (t - 0.5) * 2
      const [a, b] = t < 0.5 ? [c1, c2] : [c2, c3]
      col[i * 3]     = a.r + (b.r - a.r) * mix
      col[i * 3 + 1] = a.g + (b.g - a.g) * mix
      col[i * 3 + 2] = a.b + (b.b - a.b) * mix

      seed[i * 2] = Math.random() * 100
      seed[i * 2 + 1] = Math.random() * 100
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.028, vertexColors: true, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    })
    const group = new THREE.Group()
    group.add(new THREE.Points(geo, mat))
    scene.add(group)
    const base = pos.slice()

    let mx = 0, my = 0
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const clock = new THREE.Clock()
    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const arr = geo.attributes.position.array as Float32Array
      for (let i = 0; i < N; i++) {
        const s0 = seed[i * 2], s1 = seed[i * 2 + 1]
        arr[i * 3]     = base[i * 3]     + Math.sin(t * 0.25 + s0) * 0.06
        arr[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.2 + s1) * 0.06
      }
      geo.attributes.position.needsUpdate = true
      group.rotation.y += 0.0009 + mx * 0.0006
      group.rotation.x += my * 0.0003
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      geo.dispose(); mat.dispose(); renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="adm-particles" />
}

// ── Shared primitives ──────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex justify-center py-12">
      <svg className="spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,107,0,0.2)" strokeWidth="3"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke={C.orange} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow mb-3">
    {typeof children === 'string' ? <TextSplitter text={children} effect="rise" /> : children}
  </div>
}

// ── KPI Stat card ──────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon }: {
  label: string; value: number | string; sub?: string; color: string; icon?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="stat-card glass-card glass-card-interactive card-3d rise-in relative overflow-hidden cursor-default px-5 py-4"
      onMouseEnter={() => gsap.to(ref.current, { y: -3, duration: 0.2, ease: 'power2.out' })}
      onMouseLeave={() => gsap.to(ref.current, { y: 0, duration: 0.2, ease: 'power2.out' })}>
      <div className="absolute top-0 left-0 w-full h-[2px]"
        style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }}/>
      {icon && <div className="absolute top-3 right-3.5 text-lg opacity-10">{icon}</div>}
      <div className="mb-2 text-[0.55rem] uppercase" style={{ fontFamily: F.mono, letterSpacing: '.28em', color: `${color}88` }}>
        {label}
      </div>
      <div className="text-[1.9rem] font-bold leading-none" style={{ fontFamily: F.display, color }}>{value}</div>
      {sub && <div className="mt-1.5 text-[0.62rem]" style={{ fontFamily: F.mono, color: C.dimmer, letterSpacing: '.06em' }}>{sub}</div>}
    </div>
  )
}

// ── Progress bar row ───────────────────────────────────────────
function ProgressRow({ label, value, max, color, suffix = '' }: {
  label: string; value: number; max: number; color: string; suffix?: string
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="mb-2.5">
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: F.body, fontSize: '0.7rem', color: C.dim }}>{label}</span>
        <span style={{ fontFamily: F.mono, fontSize: '0.66rem', color, fontWeight: 700 }}>
          {value.toLocaleString()}{suffix}
        </span>
      </div>
      <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(255,107,0,0.08)' }}>
        <div className="h-full rounded-full transition-[width] duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg,${color}88,${color})`, boxShadow: `0 0 8px ${color}50` }}/>
      </div>
    </div>
  )
}

// ── Bar chart ──────────────────────────────────────────────────
function BarChart({ data }: { data: ChartPoint[] }) {
  const show = data.slice(-28)
  const max = Math.max(...show.map(d => d.count), 1)
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in px-5 pt-5 pb-3.5">
      <SectionLabel>Registros — Últimos 30 días</SectionLabel>
      {show.length === 0 ? (
        <div className="text-center py-5" style={{ fontFamily: F.body, color: C.dimmer, fontSize: '0.75rem' }}>Sin datos aún</div>
      ) : (
        <div className="flex items-end gap-[3px] h-[90px]">
          {show.map((d, i) => (
            <div key={i} title={`${d.day}: ${d.count}`} className="flex-1 h-full flex flex-col items-center justify-end">
              <div className="w-full rounded-t-[3px] transition-[height] duration-500"
                style={{
                  height: `${Math.max((d.count / max) * 100, 4)}%`,
                  background: `linear-gradient(180deg,${C.pink},${C.orange})`,
                  opacity: 0.5 + (i / show.length) * 0.5,
                }}/>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-2">
        {[show[0], show[Math.floor(show.length / 2)], show[show.length - 1]].filter(Boolean).map((d, i) => (
          <span key={i} style={{ fontSize: '0.54rem', color: C.dimmer, fontFamily: F.mono }}>{d.day}</span>
        ))}
      </div>
    </div>
  )
}

// ── Donut chart (roles) ────────────────────────────────────────
function RoleDonut({ byRole }: { byRole: AdminStats['by_role'] }) {
  const total = Object.values(byRole).reduce((a, b) => a + b, 0) || 1
  const slices = [
    { key: 'Student', pct: byRole.Student / total },
    { key: 'Teacher', pct: byRole.Teacher / total },
    { key: 'Personal', pct: byRole.Personal / total },
    { key: 'admin', pct: byRole.admin / total },
  ]
  const R = 36, cx = 44, cy = 44, circ = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5 flex gap-5 items-center" style={{ minWidth: 200 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" className="shrink-0">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,107,0,0.08)" strokeWidth="12"/>
        {slices.map((s, i) => {
          const meta = getRoleMeta(s.key)
          const len = s.pct * circ, start = offset
          offset += len
          return (
            <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={meta.color} strokeWidth="12"
              strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-start}
              transform={`rotate(-90 ${cx} ${cy})`} opacity="0.85"/>
          )
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fill={C.text} fontSize="12" fontFamily={F.display}>{total}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill={C.dimmer} fontSize="7" fontFamily={F.mono}>usuarios</text>
      </svg>
      <div className="flex-1 flex flex-col gap-1.5">
        {slices.map(s => {
          const meta = getRoleMeta(s.key)
          const val = byRole[s.key as keyof typeof byRole]
          return (
            <div key={s.key} className="flex items-center gap-2">
              <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: meta.color }}/>
              <span className="flex-1" style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.dim }}>{meta.label}</span>
              <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: meta.color }}>{val}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── VR Glasses distribution chart ─────────────────────────────
function GlassesChart({ byGlasses, unset }: { byGlasses: AdminStats['by_glasses']; unset: number }) {
  const entries = Object.entries(byGlasses)
    .map(([id, count]) => ({ id: id as VRGlassesModel, count, meta: getVRMeta(id) }))
    .filter(e => e.count > 0).sort((a, b) => b.count - a.count)
  const total = entries.reduce((s, e) => s + e.count, 0) + unset
  if (total === 0) return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-6 text-center" style={{ fontFamily: F.body, color: C.dimmer, fontSize: '0.75rem' }}>
      Sin datos de gafas aún
    </div>
  )
  const brandMap: Record<string, { count: number; color: string }> = {}
  entries.forEach(e => {
    const b = e.meta.brand
    if (!brandMap[b]) brandMap[b] = { count: 0, color: e.meta.color }
    brandMap[b].count += e.count
  })
  const R = 30, cx = 38, cy = 38, circ = 2 * Math.PI * R
  let off = 0
  const brandSlices = Object.entries(brandMap).map(([brand, v]) => {
    const pct = v.count / total
    const s = { brand, pct, color: v.color, count: v.count, start: off }
    off += pct * circ
    return s
  })
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5">
      <SectionLabel>Distribución de headsets VR</SectionLabel>
      <div className="flex gap-5 items-start">
        <svg width="76" height="76" viewBox="0 0 76 76" className="shrink-0">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,107,0,0.08)" strokeWidth="10"/>
          {brandSlices.map((s, i) => (
            <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={s.color} strokeWidth="10"
              strokeDasharray={`${s.pct * circ} ${circ - s.pct * circ}`} strokeDashoffset={-s.start}
              transform={`rotate(-90 ${cx} ${cy})`} opacity="0.88"/>
          ))}
          <text x={cx} y={cy + 4} textAnchor="middle" fill={C.text} fontSize="10" fontFamily={F.display}>{total}</text>
        </svg>
        <div className="flex flex-col gap-[5px] shrink-0">
          {brandSlices.map(s => (
            <div key={s.brand} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }}/>
              <span style={{ fontFamily: F.body, fontSize: '0.65rem', color: C.dim }}>{s.brand}</span>
              <span className="ml-auto" style={{ fontFamily: F.mono, fontSize: '0.62rem', color: s.color }}>{s.count}</span>
            </div>
          ))}
          {unset > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,107,0,0.25)' }}/>
              <span style={{ fontFamily: F.body, fontSize: '0.65rem', color: C.dimmer }}>Sin asignar</span>
              <span className="ml-auto" style={{ fontFamily: F.mono, fontSize: '0.62rem', color: C.dimmer }}>{unset}</span>
            </div>
          )}
        </div>
      </div>
      {entries.length > 0 && (
        <div className="mt-4 flex flex-col gap-1.5">
          {entries.slice(0, 6).map(e => (
            <ProgressRow key={e.id} label={e.meta.label} value={e.count} max={total} color={e.meta.color}/>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Missions panel ─────────────────────────────────────────────
function MissionsPanel({ stats }: { stats: AdminStats }) {
  const total = stats.missions_total || 1
  const completed = stats.missions_completed || 0
  const active = stats.missions_active || 0
  const abandoned = stats.missions_abandoned || 0
  const completionRate = Math.round((completed / Math.max(completed + active + abandoned, 1)) * 100)
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5">
      <SectionLabel>Misiones — resumen de plataforma</SectionLabel>
      <div className="flex gap-5 items-center mb-4">
        <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0">
          <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,107,0,0.08)" strokeWidth="8"/>
          <circle cx="36" cy="36" r="28" fill="none" stroke={C.cyan} strokeWidth="8"
            strokeDasharray={`${completionRate * 1.759} ${175.9 - completionRate * 1.759}`}
            strokeDashoffset="43.98" strokeLinecap="round" opacity="0.9"/>
          <text x="36" y="32" textAnchor="middle" fill={C.cyan} fontSize="13" fontFamily={F.display}>{completionRate}%</text>
          <text x="36" y="44" textAnchor="middle" fill={C.dimmer} fontSize="6.5" fontFamily={F.mono} letterSpacing="1">COMPLETADO</text>
        </svg>
        <div className="flex-1 flex flex-col gap-2">
          {[
            { label: 'Completadas', v: completed, c: C.cyan },
            { label: 'En progreso', v: active, c: C.gold },
            { label: 'Abandonadas', v: abandoned, c: C.red },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-2">
              <div className="w-[7px] h-[7px] rounded-full" style={{ background: r.c }}/>
              <span className="flex-1" style={{ fontFamily: F.body, fontSize: '0.7rem', color: C.dim }}>{r.label}</span>
              <span style={{ fontFamily: F.mono, fontSize: '0.72rem', color: r.c }}>{r.v.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-px mb-3.5" style={{ background: 'rgba(255,107,0,0.16)' }}/>
      <div className="flex justify-between items-center">
        <span style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.dimmer }}>Misiones disponibles</span>
        <span style={{ fontFamily: F.display, fontSize: '1rem', color: C.purple }}>{total}</span>
      </div>
    </div>
  )
}

// ── XP panel ──────────────────────────────────────────────────
function XPPanel({ stats }: { stats: AdminStats }) {
  const categories = Object.entries(stats.xp_by_category || {}).sort(([, a], [, b]) => b - a)
  const totalXP = stats.xp_total || 0
  const catColors = [C.pink, C.purple, C.blue, C.cyan, C.gold, C.orange]
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5">
      <SectionLabel>Experiencia — distribución XP</SectionLabel>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <div className="text-[1.6rem] leading-none" style={{ fontFamily: F.display, color: C.gold }}>{totalXP.toLocaleString()}</div>
          <div className="mt-1" style={{ fontFamily: F.mono, fontSize: '0.6rem', color: C.dimmer, letterSpacing: '.1em' }}>XP TOTAL PLATAFORMA</div>
        </div>
        <div className="text-right">
          <div style={{ fontFamily: F.display, fontSize: '1.1rem', color: C.orange }}>{(stats.xp_avg_per_user || 0).toLocaleString()}</div>
          <div style={{ fontFamily: F.mono, fontSize: '0.58rem', color: C.dimmer, marginTop: 3, letterSpacing: '.08em' }}>PROM / USUARIO</div>
        </div>
      </div>
      {categories.length > 0 ? (
        <div className="flex flex-col gap-px">
          {categories.slice(0, 5).map(([cat, xp], i) => (
            <ProgressRow key={cat} label={cat} value={xp as number} max={totalXP} color={catColors[i % catColors.length]} suffix=" xp"/>
          ))}
        </div>
      ) : (
        <div className="text-center py-2" style={{ fontFamily: F.body, fontSize: '0.72rem', color: C.dimmer }}>Sin categorías registradas</div>
      )}
    </div>
  )
}

// ── Chat sessions panel ────────────────────────────────────────
function ChatPanel({ stats }: { stats: AdminStats }) {
  const total = stats.chats_total || 0
  const active = stats.chats_active || 0
  const archived = stats.chats_archived || 0
  const archPct = total > 0 ? Math.round((archived / total) * 100) : 0
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5">
      <SectionLabel>Chat con Ather — sesiones</SectionLabel>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Total', value: total, color: C.blue },
          { label: 'Activas', value: active, color: C.cyan },
          { label: 'Archivadas', value: archived, color: C.dimmer },
        ].map(item => (
          <div key={item.label} className="text-center py-2.5 px-2 rounded-[10px]"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,0,0.1)' }}>
            <div style={{ fontFamily: F.display, fontSize: '1.15rem', color: item.color }}>{item.value.toLocaleString()}</div>
            <div className="mt-0.5 uppercase" style={{ fontFamily: F.mono, fontSize: '0.56rem', color: C.dimmer, letterSpacing: '.1em' }}>{item.label}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.dim }}>Tasa de archivado</span>
          <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.purple }}>{archPct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,107,0,0.08)' }}>
          <div className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${archPct}%`, background: `linear-gradient(90deg,${C.purple}88,${C.purple})` }}/>
        </div>
        <div className="mt-1" style={{ fontFamily: F.mono, fontSize: '0.58rem', color: C.dimmer }}>Chats cerrados vs total generado</div>
      </div>
    </div>
  )
}

// ── Collectables panel ─────────────────────────────────────────
function CollectablesPanel({ stats }: { stats: AdminStats }) {
  const total = stats.collectables_total || 0
  const byRarity = stats.collectables_by_rarity || {}
  const rarityColors: Record<string, string> = { common: '#9ca3af', uncommon: C.cyan, rare: C.blue, epic: C.purple, legendary: C.gold }
  const rarityEntries = Object.entries(byRarity).sort(([, a], [, b]) => (b as number) - (a as number))
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5">
      <SectionLabel>Coleccionables entregados</SectionLabel>
      <div className="flex items-baseline gap-2 mb-3.5">
        <span style={{ fontFamily: F.display, fontSize: '2rem', color: C.gold }}>{total.toLocaleString()}</span>
        <span style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.dimmer }}>ítems en circulación</span>
      </div>
      {rarityEntries.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {rarityEntries.map(([rarity, count]) => {
            const color = rarityColors[rarity.toLowerCase()] ?? C.orange
            return (
              <div key={rarity} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }}/>
                <span className="flex-1 capitalize" style={{ fontFamily: F.body, fontSize: '0.7rem', color: C.dim }}>{rarity}</span>
                <div className="flex-[2] h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,107,0,0.08)' }}>
                  <div className="h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${((count as number) / total) * 100}%`, background: `linear-gradient(90deg,${color}60,${color})` }}/>
                </div>
                <span style={{ fontFamily: F.mono, fontSize: '0.65rem', color, minWidth: 28, textAlign: 'right' }}>{(count as number).toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center" style={{ fontFamily: F.body, fontSize: '0.72rem', color: C.dimmer }}>Sin coleccionables aún</div>
      )}
    </div>
  )
}

// ── Platform health score ──────────────────────────────────────
function HealthScore({ stats }: { stats: AdminStats }) {
  const suspendRate = stats.total_users > 0 ? (stats.suspended / stats.total_users) * 100 : 0
  const missionRate = (stats.missions_completed + stats.missions_active) > 0
    ? (stats.missions_completed / (stats.missions_completed + stats.missions_active + stats.missions_abandoned)) * 100 : 0
  const chatEngagement = stats.total_users > 0 ? Math.min((stats.chats_total / stats.total_users) * 100, 100) : 0
  const score = Math.round(Math.max(0, 100 - suspendRate * 2 + missionRate * 0.3 + chatEngagement * 0.2))
  const clamped = Math.min(score, 100)
  const color = clamped >= 75 ? C.cyan : clamped >= 50 ? C.gold : C.red
  const label = clamped >= 75 ? 'ÓPTIMO' : clamped >= 50 ? 'ESTABLE' : 'ATENCIÓN'
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5 flex items-center gap-5">
      <svg width="84" height="50" viewBox="0 0 84 50" className="shrink-0">
        <path d="M 7 44 A 35 35 0 0 1 77 44" fill="none" stroke="rgba(255,107,0,0.1)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M 7 44 A 35 35 0 0 1 77 44" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${(clamped / 100) * 110} 110`} opacity="0.9"/>
      </svg>
      <div>
        <div className="mb-1 uppercase" style={{ fontFamily: F.mono, fontSize: '0.55rem', letterSpacing: '.25em', color: `${color}88` }}>
          Salud de plataforma
        </div>
        <div style={{ fontFamily: F.display, fontSize: '1rem', color, letterSpacing: '.06em' }}>{label}</div>
        <div className="mt-1" style={{ fontFamily: F.body, fontSize: '0.62rem', color: C.dimmer }}>
          Basado en actividad, misiones y suspensiones
        </div>
      </div>
    </div>
  )
}

// ── Quick metrics row ──────────────────────────────────────────
function QuickMetrics({ stats }: { stats: AdminStats }) {
  const items = [
    { icon: '⚡', label: 'XP promedio', value: `${(stats.xp_avg_per_user || 0).toLocaleString()} xp`, color: C.gold },
    { icon: '💬', label: 'Chats activos', value: `${(stats.chats_active || 0).toLocaleString()}`, color: C.blue },
    { icon: '🏆', label: 'Coleccionables', value: `${(stats.collectables_total || 0).toLocaleString()}`, color: C.purple },
    { icon: '📋', label: 'Logs hoy', value: `${(stats.logs_today || 0).toLocaleString()}`, color: C.orange },
  ]
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {items.map(item => (
        <div key={item.label} className="glass-card glass-card-interactive card-3d rise-in px-4 py-3.5 flex items-center gap-2.5">
          <span className="text-xl" style={{ filter: `drop-shadow(0 0 6px ${item.color})` }}>{item.icon}</span>
          <div>
            <div style={{ fontFamily: F.display, fontSize: '1rem', color: item.color }}>{item.value}</div>
            <div className="uppercase" style={{ fontFamily: F.mono, fontSize: '0.56rem', color: C.dimmer, letterSpacing: '.1em' }}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── User Status Chart ──────────────────────────────────────────
function UserStatusChart({ stats }: { stats: AdminStats }) {
  const active = stats.active_users || 0
  const suspended = stats.suspended || 0
  const total = active + suspended || 1
  const slices = [
    { label: 'Activos', count: active, color: C.cyan, pct: active / total },
    { label: 'Suspendidos', count: suspended, color: C.red, pct: suspended / total },
  ]
  const R = 36, cx = 44, cy = 44, circ = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5 flex gap-5 items-center" style={{ minWidth: 200 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" className="shrink-0">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,107,0,0.08)" strokeWidth="12"/>
        {slices.map((s, i) => {
          const len = s.pct * circ, start = offset
          offset += len
          return (
            <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={s.color} strokeWidth="12"
              strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-start}
              transform={`rotate(-90 ${cx} ${cy})`} opacity="0.85"/>
          )
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fill={C.text} fontSize="12" fontFamily={F.display}>{active + suspended}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill={C.dimmer} fontSize="7" fontFamily={F.mono}>estado</text>
      </svg>
      <div className="flex-1 flex flex-col gap-1.5">
        {slices.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: s.color }}/>
            <span className="flex-1" style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.dim }}>{s.label}</span>
            <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: s.color }}>{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Architecture Chart ──────────────────────────────────────────
function ArchitectureChart({ byGlasses, unset }: { byGlasses: AdminStats['by_glasses']; unset: number }) {
  const types = { standalone: 0, pcvr: 0, console: 0 }
  Object.entries(byGlasses).forEach(([id, count]) => {
    const meta = getVRMeta(id)
    if (meta.type in types) types[meta.type as keyof typeof types] += count
  })
  const total = types.standalone + types.pcvr + types.console + unset || 1
  const slices = [
    { label: 'Standalone', count: types.standalone, color: C.blue, pct: types.standalone / total },
    { label: 'PCVR', count: types.pcvr, color: C.gold, pct: types.pcvr / total },
    { label: 'Consola', count: types.console, color: C.purple, pct: types.console / total },
    { label: 'Sin asignar', count: unset, color: 'rgba(255,107,0,0.25)', pct: unset / total },
  ].filter(s => s.count > 0)
  const R = 36, cx = 44, cy = 44, circ = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="glass-card glass-card-interactive card-3d rise-in p-5 flex gap-5 items-center" style={{ minWidth: 200 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" className="shrink-0">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,107,0,0.08)" strokeWidth="12"/>
        {slices.map((s, i) => {
          const len = s.pct * circ, start = offset
          offset += len
          return (
            <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={s.color} strokeWidth="12"
              strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-start}
              transform={`rotate(-90 ${cx} ${cy})`} opacity="0.85"/>
          )
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fill={C.text} fontSize="12" fontFamily={F.display}>{total}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill={C.dimmer} fontSize="7" fontFamily={F.mono}>arquitectura</text>
      </svg>
      <div className="flex-1 flex flex-col gap-1.5">
        {slices.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: s.color }}/>
            <span className="flex-1" style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.dim }}>{s.label}</span>
            <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: s.color }}>{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Overview section ───────────────────────────────────────────
function OverviewSection({ stats, chart, loading }: { stats: AdminStats | null; chart: ChartPoint[]; loading: boolean }) {
  if (loading || !stats) return <Spinner />
  return (
    <ScrollReveal effect="fadeUp" stagger={0.05} className="flex flex-col gap-3.5">
      <div className="grid gap-2.5 float-gentle" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))' }}>
        <StatCard label="Total usuarios" value={stats.total_users} color={C.orange} icon="👥" sub={`+${stats.new_this_month} este mes`}/>
        <StatCard label="Activos" value={stats.active_users} color={C.cyan} icon="✅" sub="no suspendidos"/>
        <StatCard label="Suspendidos" value={stats.suspended} color={C.red} icon="🚫"/>
        <StatCard label="Nuevos 7 días" value={stats.new_this_week} color={C.purple} icon="🆕"/>
        <StatCard label="Misiones total" value={stats.missions_total || 0} color={C.gold} icon="🗺️"/>
        <StatCard label="XP plataforma" value={(stats.xp_total || 0).toLocaleString()} color={C.pink} icon="⚡"/>
      </div>
      <QuickMetrics stats={stats}/>
      <div className="section-divider line-gradient-animated my-1" />
      <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 220px 220px' }}>
        <BarChart data={chart}/>
        <div className="flex flex-col gap-3">
          <RoleDonut byRole={stats.by_role}/>
          <UserStatusChart stats={stats}/>
        </div>
        <div className="flex flex-col gap-3">
          <HealthScore stats={stats}/>
          <ArchitectureChart byGlasses={stats.by_glasses || {}} unset={stats.glasses_unset || 0}/>
        </div>
      </div>
      <div className="section-divider line-gradient-animated my-1" />
      <div className="grid grid-cols-3 gap-3">
        <MissionsPanel stats={stats}/>
        <XPPanel stats={stats}/>
        <ChatPanel stats={stats}/>
      </div>
      <div className="section-divider line-gradient-animated my-1" />
      <div className="grid grid-cols-2 gap-3">
        <GlassesChart byGlasses={stats.by_glasses || {}} unset={stats.glasses_unset || 0}/>
        <CollectablesPanel stats={stats}/>
      </div>
    </ScrollReveal>
  )
}

// ── Users section ──────────────────────────────────────────────
function UsersSection({ users, loading, search, page, total, onSearch, onPage, onEdit, onToggle, totalPages }: {
  users: AdminUser[]; loading: boolean; search: string; page: number; total: number
  onSearch: (v: string) => void; onPage: (p: number) => void
  onEdit: (u: AdminUser) => void; onToggle: (u: AdminUser) => void
  totalPages: (n: number) => number
}) {
  const pages = totalPages(total)
  return (
    <ScrollReveal effect="fadeUp" stagger={0.05} className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex-1 flex items-center gap-2 rounded-[9px] px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,110,0.2)' }}>
          <span style={{ color: C.dimmer }}><Ico.Search/></span>
          <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Buscar por nombre o email..."
            className="flex-1 bg-transparent border-none outline-none"
            style={{ color: C.text, fontFamily: F.body, fontSize: '0.8rem', caretColor: C.purple }}/>
        </div>
        <div className="whitespace-nowrap" style={{ fontFamily: F.mono, fontSize: '0.66rem', color: C.dimmer }}>{total} usuarios</div>
      </div>

      {loading ? <Spinner/> : (
        <div className="glass-card glass-card-interactive card-3d overflow-hidden">
          <div className="grid gap-2 px-4 py-2.5 uppercase" style={{
            gridTemplateColumns: '1.2fr 1.1fr 110px 110px 90px 80px',
            borderBottom: '1px solid rgba(255,107,0,0.16)', fontFamily: F.mono, fontSize: '0.56rem', letterSpacing: '.2em', color: C.dimmer,
          }}>
            <span>Nombre</span><span>Email</span><span>Rol</span><span>Headset VR</span><span>Registro</span>
            <span className="text-right">Acc.</span>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-8" style={{ fontFamily: F.body, color: C.dimmer, fontSize: '0.75rem' }}>Sin resultados</div>
          ) : users.map((u, i) => {
            const roleMeta = getRoleMeta(u.role)
            const vrMeta = getVRMeta(u.vr_glasses)
            return (
              <div key={u.id} className="user-row grid gap-2 px-4 py-2.5 items-center transition-colors" style={{
                gridTemplateColumns: '1.2fr 1.1fr 110px 110px 90px 80px',
                borderBottom: i < users.length - 1 ? '1px solid rgba(255,107,0,0.06)' : 'none',
                opacity: u.suspended ? 0.4 : 1,
              }}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-[26px] h-[26px] rounded-md shrink-0 flex items-center justify-center"
                    style={{ fontSize: '0.55rem', fontFamily: F.display, background: `${roleMeta.color}15`, border: `1px solid ${roleMeta.color}40`, color: roleMeta.color }}>
                    {getInitials(u)}
                  </div>
                  <span className="truncate" style={{ fontFamily: F.body, fontSize: '0.76rem', color: C.text }}>{getFullName(u)}</span>
                </div>
                <span className="truncate" style={{ fontFamily: F.body, fontSize: '0.7rem', color: C.dimmer }}>{u.email ?? '—'}</span>
                <div className="inline-flex w-fit rounded px-2 py-0.5" style={{
                  background: roleMeta.bg, border: `1px solid ${roleMeta.color}40`, color: roleMeta.color,
                  fontFamily: F.mono, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '.1em',
                }}>{roleMeta.label}</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.8rem]">{vrMeta.icon}</span>
                  <div>
                    <div className="truncate" style={{ fontFamily: F.body, fontSize: '0.62rem', color: vrMeta.color, fontWeight: 700, maxWidth: 80 }}>
                      {u.vr_glasses && u.vr_glasses !== 'none' ? vrMeta.label : '—'}
                    </div>
                    {u.vr_glasses && u.vr_glasses !== 'none' && (
                      <div style={{ fontFamily: F.mono, fontSize: '0.54rem', color: C.dimmer }}>{vrMeta.brand}</div>
                    )}
                  </div>
                </div>
                <span style={{ fontFamily: F.mono, fontSize: '0.64rem', color: C.dimmer }}>{formatDate(u.created_at)}</span>
                <div className="flex gap-1.5 justify-end">
                  <button onClick={() => onEdit(u)} title="Editar usuario" className="btn-ghost w-[26px] h-[26px] flex items-center justify-center">
                    <Ico.Edit/>
                  </button>
                  <button onClick={() => onToggle(u)} title={u.suspended ? 'Reactivar' : 'Suspender'}
                    className="w-[26px] h-[26px] rounded-md flex items-center justify-center transition-opacity"
                    style={{
                      background: u.suspended ? 'rgba(0,229,160,0.08)' : 'rgba(255,78,80,0.08)',
                      border: `1px solid ${u.suspended ? 'rgba(0,229,160,0.25)' : 'rgba(255,78,80,0.25)'}`,
                      color: u.suspended ? C.cyan : C.red, fontSize: '0.65rem', fontWeight: 700,
                    }}>
                    {u.suspended ? '▶' : '⏸'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => onPage(page - 1)} disabled={page === 0} className="btn-ghost w-7 h-7 flex items-center justify-center"
            style={{ opacity: page === 0 ? 0.3 : 1, cursor: page === 0 ? 'not-allowed' : 'pointer' }}><Ico.ChevL/></button>
          <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.dimmer, letterSpacing: '.1em' }}>{page + 1} / {pages}</span>
          <button onClick={() => onPage(page + 1)} disabled={page >= pages - 1} className="btn-ghost w-7 h-7 flex items-center justify-center"
            style={{ opacity: page >= pages - 1 ? 0.3 : 1, cursor: page >= pages - 1 ? 'not-allowed' : 'pointer' }}><Ico.ChevR/></button>
        </div>
      )}
    </ScrollReveal>
  )
}

// ── Edit user modal (rol + gafas) ──────────────────────────────
function EditUserModal({ user, role, glasses, onClose, onSave, onSetRole, onSetGlasses }: {
  user: AdminUser; role: UserRole; glasses: VRGlassesModel
  onClose: () => void; onSave: () => void; onSetRole: (r: UserRole) => void; onSetGlasses: (g: VRGlassesModel) => void
}) {
  const roles: UserRole[] = ['admin', 'Teacher', 'Student', 'Personal']
  const glassesList: VRGlassesModel[] = [
    'meta-quest-2', 'meta-quest-3', 'meta-quest-3s', 'meta-quest-pro',
    'apple-vision-pro', 'playstation-vr2', 'valve-index',
    'htc-vive-xr-elite', 'htc-vive-focus-vision', 'htc-vive-pro-2',
    'pico-4', 'pico-4-ultra', 'samsung-galaxy-xr', 'hp-reverb-g2', 'none',
  ]
  const [tab, setTab] = useState<'role' | 'glasses'>('role')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(4,0,6,0.9)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="glass-card p-7" style={{ width: 360, border: '1px solid rgba(255,0,110,0.24)', boxShadow: '0 0 50px rgba(255,0,110,0.14)' }}>
        <div className="flex items-center justify-between mb-4.5">
          <div>
            <div style={{ fontFamily: F.display, fontSize: '1rem', color: C.text, letterSpacing: '.06em' }}>EDITAR USUARIO</div>
            <div className="mt-0.5" style={{ fontFamily: F.body, fontSize: '0.7rem', color: C.dimmer }}>{getFullName(user)}</div>
          </div>
          <button onClick={onClose} className="p-1" style={{ background: 'none', border: 'none', color: C.dimmer, cursor: 'pointer' }}><Ico.Close/></button>
        </div>

        <div className="flex gap-1.5 mb-4">
          {(['role', 'glasses'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className="flex-1 py-1.5 rounded-lg uppercase transition-all"
              style={{
                fontFamily: F.mono, fontSize: '0.66rem', fontWeight: 700, letterSpacing: '.1em', cursor: 'pointer',
                background: tab === t ? 'rgba(255,107,0,0.12)' : 'transparent',
                border: `1px solid ${tab === t ? 'rgba(255,107,0,0.4)' : 'rgba(255,107,0,0.16)'}`,
                color: tab === t ? C.orange : C.dimmer,
              }}>
              {t === 'role' ? 'Rol' : 'Headset VR'}
            </button>
          ))}
        </div>

        {tab === 'role' && (
          <div className="flex flex-col gap-1.5 mb-5">
            {roles.map(r => {
              const meta = getRoleMeta(r)
              const sel = role === r
              return (
                <button key={r} onClick={() => onSetRole(r)} className="text-left px-3.5 py-2.5 rounded-lg transition-all"
                  style={{
                    fontFamily: F.mono, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '.1em', cursor: 'pointer',
                    background: sel ? meta.bg : 'transparent',
                    border: `1px solid ${sel ? meta.color : 'rgba(255,107,0,0.16)'}`,
                    color: sel ? meta.color : C.dim,
                  }}>{meta.label}</button>
              )
            })}
          </div>
        )}

        {tab === 'glasses' && (
          <div className="flex flex-col gap-1.5 mb-5 overflow-y-auto" style={{ maxHeight: 260 }}>
            {glassesList.map(g => {
              const meta = getVRMeta(g)
              const sel = glasses === g
              return (
                <button key={g} onClick={() => onSetGlasses(g)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all"
                  style={{
                    fontFamily: F.body, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                    background: sel ? `${meta.color}18` : 'transparent',
                    border: `1px solid ${sel ? meta.color + '55' : 'rgba(255,107,0,0.16)'}`,
                    color: sel ? meta.color : C.dim,
                  }}>
                  <span className="text-sm">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{meta.label}</div>
                    {g !== 'none' && <div className="mt-px" style={{ fontSize: '0.58rem', color: C.dimmer, fontFamily: F.mono }}>{meta.brand} · {meta.type}</div>}
                  </div>
                  {sel && <span style={{ fontSize: '0.7rem', color: meta.color }}>✓</span>}
                </button>
              )
            })}
          </div>
        )}

        <div className="flex gap-2.5">
          <MagneticElement><button onClick={onClose} className="btn-ghost flex-1 py-2.5">Cancelar</button></MagneticElement>
          <MagneticElement><button onClick={onSave} className="btn-launch flex-1">GUARDAR</button></MagneticElement>
        </div>
      </div>
    </div>
  )
}

// ── Logs section ───────────────────────────────────────────────
function LogsSection({ logs, loading, filter, page, total, onFilter, onPage, totalPages }: {
  logs: ActivityLog[]; loading: boolean; filter: string; page: number; total: number
  onFilter: (v: string) => void; onPage: (p: number) => void; totalPages: (n: number) => number
}) {
  const pages = totalPages(total)
  const quickFilters = ['LOGIN', 'LOGOUT', 'ROLE_CHANGE', 'GLASSES_CHANGE', 'SUSPENDED', 'MISSION_COMPLETE']
  return (
    <ScrollReveal effect="fadeUp" stagger={0.05} className="flex flex-col gap-3.5">
      <div className="flex flex-wrap gap-1.5">
        {quickFilters.map(qf => {
          const am = getActionMeta(qf)
          const sel = filter === qf
          return (
            <button key={qf} onClick={() => onFilter(sel ? '' : qf)} className="rounded-full px-2.5 py-1 uppercase transition-all"
              style={{
                fontFamily: F.mono, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.14em', cursor: 'pointer',
                background: sel ? `${am.color}20` : 'transparent',
                border: `1px solid ${sel ? am.color + '60' : 'rgba(255,107,0,0.16)'}`,
                color: sel ? am.color : C.dimmer,
              }}>{am.label}</button>
          )
        })}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex-1 flex items-center gap-2 rounded-[9px] px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,0,110,0.2)' }}>
          <span style={{ color: C.dimmer }}><Ico.Search/></span>
          <input value={filter} onChange={e => onFilter(e.target.value)}
            placeholder="Filtrar por acción (LOGIN, ROLE_CHANGE, GLASSES_CHANGE...)..."
            className="flex-1 bg-transparent border-none outline-none"
            style={{ color: C.text, fontFamily: F.body, fontSize: '0.78rem', caretColor: C.purple }}/>
        </div>
        <div className="whitespace-nowrap" style={{ fontFamily: F.mono, fontSize: '0.66rem', color: C.dimmer }}>{total} eventos</div>
      </div>

      {loading ? <Spinner/> : (
        <div className="flex flex-col gap-1.5">
          {logs.length === 0 ? (
            <div className="glass-card p-8 text-center" style={{ fontFamily: F.body, color: C.dimmer, fontSize: '0.75rem' }}>Sin logs registrados</div>
          ) : logs.map(log => {
            const am = getActionMeta(log.action)
            const rm = getRoleMeta(log.user_role ?? '')
            return (
              <div key={log.id} className="log-row glass-card grid gap-2.5 items-center px-4 py-2.5" style={{
                gridTemplateColumns: '100px 1fr 100px 80px', borderLeft: `3px solid ${am.color}55`,
              }}>
                <div className="text-center rounded px-2 py-0.5" style={{
                  background: `${am.color}12`, border: `1px solid ${am.color}35`, color: am.color,
                  fontFamily: F.mono, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '.16em',
                }}>{am.label}</div>
                <div className="min-w-0">
                  <div className="truncate" style={{ fontFamily: F.body, fontSize: '0.74rem', color: C.text }}>{log.user_name ?? 'Sistema'}</div>
                  <div className="truncate" style={{ fontFamily: F.mono, fontSize: '0.58rem', color: C.dimmer }}>{log.user_email}</div>
                </div>
                <div className="text-center rounded px-1.5 py-0.5" style={{ background: rm.bg, color: rm.color, fontFamily: F.mono, fontSize: '0.56rem', fontWeight: 700, letterSpacing: '.1em' }}>
                  {rm.label}
                </div>
                <div className="text-right" style={{ fontFamily: F.mono, fontSize: '0.58rem', color: C.dimmer }}>{formatDateTime(log.created_at)}</div>
              </div>
            )
          })}
        </div>
      )}

      {pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => onPage(page - 1)} disabled={page === 0} className="btn-ghost w-7 h-7 flex items-center justify-center"
            style={{ opacity: page === 0 ? 0.3 : 1, cursor: page === 0 ? 'not-allowed' : 'pointer' }}><Ico.ChevL/></button>
          <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.dimmer, letterSpacing: '.1em' }}>{page + 1} / {pages}</span>
          <button onClick={() => onPage(page + 1)} disabled={page >= pages - 1} className="btn-ghost w-7 h-7 flex items-center justify-center"
            style={{ opacity: page >= pages - 1 ? 0.3 : 1, cursor: page >= pages - 1 ? 'not-allowed' : 'pointer' }}><Ico.ChevR/></button>
        </div>
      )}
    </ScrollReveal>
  )
}

// ── Main View ──────────────────────────────────────────────────
export default function AdminDashboardView() {
  const {
    state, setSection, toggleSidebar, handleSignOut, handleRefresh,
    handleUsersSearch, handleUsersPage, openEditUser, closeEditUser,
    setEditRole, setEditGlasses, handleSaveRole, handleToggleSuspend, totalPages,
    handleLogsFilter, handleLogsPage,
  } = useAdminController()

  const mainRef = useRef<HTMLDivElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)

  // ── Scanline flash al navegar (firma visual, idéntica al scanline de /modulos) ──
  const flashScan = useCallback(() => {
    const el = scanRef.current
    if (!el) return
    el.classList.remove('active')
    void el.offsetWidth // reflow para reiniciar la animación
    el.classList.add('active')
  }, [])

  const navigate = useCallback((s: AdminSection) => {
    flashScan()
    setSection(s)
  }, [flashScan, setSection])

  useEffect(() => {
    gsap.fromTo(mainRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
  }, [state.section])

  // Se dispara cada vez que el contenido de la sección activa realmente
  // termina de montarse (no solo al cambiar de pestaña), para que los
  // gráficos que llegan async (stats/users/logs) no se queden en opacity:0.
  useEffect(() => {
    const loadingBySection: Record<AdminSection, boolean> = {
      overview: state.statsLoading || !state.stats,
      users: state.usersLoading,
      logs: state.logsLoading,
    }
    if (loadingBySection[state.section]) return

    const ctx = gsap.context(() => {
      gsap.set('.rise-in', { clearProps: 'opacity,transform,filter' })
      gsap.fromTo('.rise-in', { opacity: 0, y: 16, filter: 'blur(3px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.05, duration: 0.45, ease: 'power2.out' })
    }, mainRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.section, state.statsLoading, state.stats, state.usersLoading, state.logsLoading])

  const { section, sidebarOpen } = state
  const collapsed = !sidebarOpen

  const SECTIONS: { key: AdminSection; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Ico.Chart/> },
    { key: 'users', label: 'Usuarios', icon: <Ico.Users/> },
    { key: 'logs', label: 'Logs', icon: <Ico.Logs/> },
  ]
  const sectionTitle: Record<AdminSection, string> = {
    overview: 'PANEL DE CONTROL', users: 'GESTIÓN DE USUARIOS', logs: 'LOGS DE ACTIVIDAD',
  }

  // ── Ticker: KPIs vivos, no decorativo — refleja el estado real de la plataforma
  const tickerItems: { label: string; value: string | number }[] = state.stats ? [
    { label: 'USUARIOS', value: state.stats.total_users },
    { label: 'ACTIVOS', value: state.stats.active_users },
    { label: 'NUEVOS 7D', value: state.stats.new_this_week },
    { label: 'MISIONES ACTIVAS', value: state.stats.missions_active || 0 },
    { label: 'CHATS ACTIVOS', value: state.stats.chats_active || 0 },
    { label: 'SUSPENDIDOS', value: state.stats.suspended },
    { label: 'LOGS HOY', value: state.stats.logs_today || 0 },
  ] : []

  return (
    <div className="adm-root">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>

      <ParallaxLayer speed={0.05} className="absolute inset-0 pointer-events-none z-0">
        <div className="float-gentle w-full h-full opacity-60">
          <AmbientParticles/>
        </div>
      </ParallaxLayer>

      <div className="relative z-10 flex min-h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="relative shrink-0 flex flex-col overflow-hidden transition-[width] duration-300"
          style={{ width: collapsed ? 56 : 212, background: 'rgba(8,0,10,0.98)', borderRight: '1px solid rgba(255,0,110,0.16)' }}>
          <div className={`flex items-center gap-2.5 px-4 py-4 ${collapsed ? 'justify-center px-0' : ''}`}
            style={{ borderBottom: '1px solid rgba(255,0,110,0.16)' }}>
            <div className="w-7 h-7 rounded-md shrink-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#FF006E,#FF6B00)', boxShadow: '0 0 12px rgba(255,107,0,0.35)' }}>
              <span style={{ fontFamily: F.display, fontSize: '0.85rem', color: '#fff' }}>A</span>
            </div>
            {!collapsed && (
              <div>
                <div className="grad-text" style={{ fontFamily: F.display, fontSize: '0.85rem', letterSpacing: '.08em' }}>ATHERNIX</div>
                <div className="uppercase" style={{ fontFamily: F.mono, fontSize: '0.5rem', color: 'rgba(255,0,110,0.55)', letterSpacing: '.2em' }}>Admin Panel</div>
              </div>
            )}
          </div>

          <div className={`flex-1 flex flex-col gap-1 ${collapsed ? 'p-1.5' : 'p-2.5'}`}>
            {!collapsed && <div className="eyebrow px-3 pt-1 pb-2">Navegación</div>}
            {SECTIONS.map(s => (
              <MagneticElement key={s.key}>
                <button onClick={() => navigate(s.key)}
                  className={`nav-pill ${section === s.key ? 'active' : ''} ${collapsed ? 'justify-center py-2.5' : 'justify-start px-3 py-2.5'}`}>
                  {s.icon}{!collapsed && <span>{s.label}</span>}
                </button>
              </MagneticElement>
            ))}
          </div>

          <div className={`flex flex-col gap-1.5 ${collapsed ? 'p-1.5' : 'p-2.5'}`} style={{ borderTop: '1px solid rgba(255,0,110,0.16)' }}>
            <button onClick={handleSignOut}
              className={`w-full flex items-center gap-2.5 rounded-lg transition-all ${collapsed ? 'justify-center py-2' : 'justify-start px-3 py-2'}`}
              style={{ background: 'transparent', border: '1px solid transparent', color: 'rgba(255,78,80,0.55)', fontFamily: F.mono, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.1em', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,78,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,78,80,0.25)'; e.currentTarget.style.color = C.red }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,78,80,0.55)' }}>
              <Ico.Logout/>{!collapsed && <span>Salir</span>}
            </button>
            <button onClick={toggleSidebar} className="btn-ghost w-full py-1.5 flex items-center justify-center"><Ico.Menu/></button>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Topbar */}
          <div className="flex items-center gap-3 px-5 py-3 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,107,0,0.16)', background: 'rgba(8,0,10,0.85)', backdropFilter: 'blur(16px)' }}>
            <div className="flex-1">
              <div style={{ fontFamily: F.display, fontSize: '1.05rem', color: C.text, letterSpacing: '.08em' }}>
                <TextSplitter text={sectionTitle[section]} effect="rise" />
              </div>
              <div className="status-badge mt-1"><span className="status-dot ok"/>Sistema activo</div>
            </div>
            <button onClick={handleRefresh} className="btn-ghost w-[30px] h-[30px] flex items-center justify-center" title="Actualizar datos">
              <Ico.Refresh/>
            </button>
          </div>

          {/* Ticker de KPIs en vivo (reemplaza el signal bar decorativo por contenido real) */}
          {tickerItems.length > 0 && (
            <div className="ticker shrink-0">
              <div className="ticker-track">
                {[...tickerItems, ...tickerItems].map((it, i) => (
                  <span key={i} className="ticker-item">{it.label} <b>{it.value.toLocaleString()}</b> <span style={{ color: 'var(--orange)' }}>✦</span></span>
                ))}
              </div>
            </div>
          )}
          <div className="signal-bar shrink-0"/>

          {/* Content */}
          <div id="adm-scroll" ref={mainRef} className="flex-1 overflow-y-auto p-5">
            {section === 'overview' && <OverviewSection stats={state.stats} chart={state.chartData} loading={state.statsLoading}/>}
            {section === 'users' && (
              <UsersSection users={state.users} loading={state.usersLoading} search={state.usersSearch} page={state.usersPage} total={state.usersTotal}
                onSearch={handleUsersSearch} onPage={handleUsersPage} onEdit={openEditUser} onToggle={handleToggleSuspend} totalPages={totalPages}/>
            )}
            {section === 'logs' && (
              <LogsSection logs={state.logs} loading={state.logsLoading} filter={state.logsFilter} page={state.logsPage} total={state.logsTotal}
                onFilter={handleLogsFilter} onPage={handleLogsPage} totalPages={totalPages}/>
            )}
          </div>
        </div>

        {state.editUser && (
          <EditUserModal user={state.editUser} role={state.editRole} glasses={state.editGlasses}
            onClose={closeEditUser} onSave={handleSaveRole} onSetRole={setEditRole} onSetGlasses={setEditGlasses}/>
        )}
      </div>
    </div>
  )
}