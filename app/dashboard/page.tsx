'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useAdminController } from '@/controllers/Admin/dashboardControl'
import {
  AdminSection, AdminUser, ActivityLog, ChartPoint,
  AdminStats, UserRole, VRGlassesModel,
  getRoleMeta, getActionMeta, getVRMeta, getFullName, getInitials,
  formatDateTime, formatDate, PAGE_SIZE,
} from '@/models/Admin/dashboard'

// ── Design tokens ──────────────────────────────────────────────
const F = { orb: "'Orbitron',sans-serif", raj: "'Rajdhani',sans-serif" }
const C = {
  bg:     '#08040c',
  surf:   'rgba(14,6,20,0.96)',
  s2:     'rgba(20,8,28,0.9)',
  orange: '#ff6b35', red: '#ff4e50', purple: '#c060ff',
  cyan:   '#00e5a0', gold: '#ffaa00', blue: '#60a5fa',
  pink:   '#f43f5e', text: '#ede0d4',
  dim:    'rgba(210,170,140,0.55)',
  dimmer: 'rgba(210,170,140,0.3)',
  bdrO:   'rgba(180,60,40,0.2)',
  bdrP:   'rgba(180,60,200,0.2)',
}
const CARD: React.CSSProperties = {
  background:   C.surf,
  border:       `1px solid ${C.bdrO}`,
  borderRadius: 14,
  boxShadow:    '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
}

// ── Icons ──────────────────────────────────────────────────────
const Ico = {
  Menu:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>,
  Chart:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>,
  Users:   () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>,
  Logs:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/></svg>,
  Glasses: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>,
  Mission: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/></svg>,
  Logout:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/></svg>,
  Refresh: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>,
  Search:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>,
  Edit:    () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/></svg>,
  Close:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>,
  ChevL:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>,
  ChevR:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>,
  Star:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/></svg>,
  Chat:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg>,
  Trophy:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"/></svg>,
}

// ── Shared primitives ──────────────────────────────────────────

function Spinner() {
  return (
    <div style={{ display:'flex', justifyContent:'center', padding:48 }}>
      <svg className="spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,100,50,0.2)" strokeWidth="3"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke={C.orange} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize:'0.55rem', letterSpacing:'0.3em', textTransform:'uppercase',
      color:`${C.orange}88`, fontFamily:F.raj, marginBottom:14 }}>
      {children}
    </div>
  )
}

// ── KPI Stat card ──────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon }: {
  label: string; value: number | string; sub?: string; color: string; icon?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="stat-card"
      style={{ ...CARD, padding:'18px 20px', position:'relative', overflow:'hidden', cursor:'default' }}
      onMouseEnter={() => gsap.to(ref.current, { y:-3, duration:0.2, ease:'power2.out' })}
      onMouseLeave={() => gsap.to(ref.current, { y:0,  duration:0.2, ease:'power2.out' })}>
      <div style={{ position:'absolute', top:0, left:0, width:'100%', height:2,
        background:`linear-gradient(90deg,transparent,${color},transparent)` }}/>
      <div style={{ position:'absolute', top:12, right:14, fontSize:'1.1rem', opacity:0.12 }}>{icon}</div>
      <div style={{ fontSize:'0.55rem', letterSpacing:'0.28em', textTransform:'uppercase',
        color:`${color}88`, fontFamily:F.raj, marginBottom:8 }}>{label}</div>
      <div style={{ fontFamily:F.orb, fontSize:'1.9rem', fontWeight:900, color, lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:'0.62rem', color:C.dimmer, fontFamily:F.raj, marginTop:6, letterSpacing:'0.08em' }}>{sub}</div>}
    </div>
  )
}

// ── Progress bar row ───────────────────────────────────────────
function ProgressRow({ label, value, max, color, suffix = '' }: {
  label: string; value: number; max: number; color: string; suffix?: string
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dim }}>{label}</span>
        <span style={{ fontFamily:F.orb, fontSize:'0.68rem', color, fontWeight:700 }}>
          {value.toLocaleString()}{suffix}
        </span>
      </div>
      <div style={{ height:5, borderRadius:99, background:'rgba(255,100,50,0.08)', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, borderRadius:99,
          background:`linear-gradient(90deg,${color}88,${color})`,
          boxShadow:`0 0 8px ${color}50`, transition:'width 0.8s cubic-bezier(.4,0,.2,1)' }}/>
      </div>
    </div>
  )
}

// ── Bar chart ──────────────────────────────────────────────────
function BarChart({ data }: { data: ChartPoint[] }) {
  const show = data.slice(-28)
  const max  = Math.max(...show.map(d => d.count), 1)
  return (
    <div style={{ ...CARD, padding:'20px 20px 14px' }}>
      <SectionLabel>Registros — Últimos 30 días</SectionLabel>
      {show.length === 0 ? (
        <div style={{ textAlign:'center', color:C.dimmer, fontFamily:F.raj, fontSize:'0.75rem', padding:'20px 0' }}>
          Sin datos aún
        </div>
      ) : (
        <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:90 }}>
          {show.map((d, i) => (
            <div key={i} title={`${d.day}: ${d.count}`}
              style={{ flex:1, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end' }}>
              <div style={{ width:'100%', borderRadius:'3px 3px 0 0',
                height:`${Math.max((d.count/max)*100, 4)}%`,
                background:`linear-gradient(180deg,${C.orange},${C.red})`,
                opacity: 0.5 + (i/show.length)*0.5,
                transition:'height 0.6s ease' }}/>
            </div>
          ))}
        </div>
      )}
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
        {[show[0], show[Math.floor(show.length/2)], show[show.length-1]].filter(Boolean).map((d,i) => (
          <span key={i} style={{ fontSize:'0.54rem', color:C.dimmer, fontFamily:F.raj }}>{d.day}</span>
        ))}
      </div>
    </div>
  )
}

// ── Donut chart (roles) ────────────────────────────────────────
function RoleDonut({ byRole }: { byRole: AdminStats['by_role'] }) {
  const total  = Object.values(byRole).reduce((a,b)=>a+b,0) || 1
  const slices = [
    { key:'Student',  pct: byRole.Student/total  },
    { key:'Teacher',  pct: byRole.Teacher/total  },
    { key:'Personal', pct: byRole.Personal/total },
    { key:'admin',    pct: byRole.admin/total    },
  ]
  const R=36, cx=44, cy=44, circ=2*Math.PI*R
  let offset = 0

  return (
    <div style={{ ...CARD, padding:'20px', display:'flex', gap:20, alignItems:'center', minWidth:200 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" style={{ flexShrink:0 }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,100,50,0.08)" strokeWidth="12"/>
        {slices.map((s,i) => {
          const meta  = getRoleMeta(s.key)
          const len   = s.pct*circ, start=offset
          offset += len
          return (
            <circle key={i} cx={cx} cy={cy} r={R} fill="none"
              stroke={meta.color} strokeWidth="12"
              strokeDasharray={`${len} ${circ-len}`}
              strokeDashoffset={-start}
              transform={`rotate(-90 ${cx} ${cy})`} opacity="0.85"/>
          )
        })}
        <text x={cx} y={cy-4} textAnchor="middle" fill={C.text} fontSize="12" fontFamily={F.orb} fontWeight="700">{total}</text>
        <text x={cx} y={cy+10} textAnchor="middle" fill={C.dimmer} fontSize="7" fontFamily={F.raj}>usuarios</text>
      </svg>
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7 }}>
        {slices.map(s => {
          const meta = getRoleMeta(s.key)
          const val  = byRole[s.key as keyof typeof byRole]
          return (
            <div key={s.key} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:meta.color, flexShrink:0 }}/>
              <span style={{ fontFamily:F.raj, fontSize:'0.68rem', color:C.dim, flex:1, letterSpacing:'0.08em' }}>{meta.label}</span>
              <span style={{ fontFamily:F.orb, fontSize:'0.68rem', color:meta.color }}>{val}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── VR Glasses distribution chart ─────────────────────────────
function GlassesChart({ byGlasses, unset }: {
  byGlasses: AdminStats['by_glasses']
  unset: number
}) {
  const entries = Object.entries(byGlasses)
    .map(([id, count]) => ({ id: id as VRGlassesModel, count, meta: getVRMeta(id) }))
    .filter(e => e.count > 0)
    .sort((a,b) => b.count - a.count)

  const total = entries.reduce((s,e) => s+e.count, 0) + unset
  if (total === 0) return (
    <div style={{ ...CARD, padding:24, textAlign:'center', color:C.dimmer, fontFamily:F.raj, fontSize:'0.75rem' }}>
      Sin datos de gafas aún
    </div>
  )

  // Group by brand for the donut
  const brandMap: Record<string, { count:number; color:string }> = {}
  entries.forEach(e => {
    const b = e.meta.brand
    if (!brandMap[b]) brandMap[b] = { count:0, color:e.meta.color }
    brandMap[b].count += e.count
  })

  const R=30, cx=38, cy=38, circ=2*Math.PI*R
  let off=0
  const brandSlices = Object.entries(brandMap).map(([brand,v]) => {
    const pct = v.count/total
    const s   = { brand, pct, color:v.color, count:v.count, start:off }
    off += pct*circ
    return s
  })

  return (
    <div style={{ ...CARD, padding:'20px' }}>
      <SectionLabel>Distribución de headsets VR</SectionLabel>
      <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
        {/* Mini donut by brand */}
        <svg width="76" height="76" viewBox="0 0 76 76" style={{ flexShrink:0 }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,100,50,0.08)" strokeWidth="10"/>
          {brandSlices.map((s,i) => (
            <circle key={i} cx={cx} cy={cy} r={R} fill="none"
              stroke={s.color} strokeWidth="10"
              strokeDasharray={`${s.pct*circ} ${circ-s.pct*circ}`}
              strokeDashoffset={-s.start}
              transform={`rotate(-90 ${cx} ${cy})`} opacity="0.88"/>
          ))}
          <text x={cx} y={cy+4} textAnchor="middle" fill={C.text} fontSize="10" fontFamily={F.orb} fontWeight="700">{total}</text>
        </svg>
        {/* Brand legend */}
        <div style={{ display:'flex', flexDirection:'column', gap:5, flexShrink:0 }}>
          {brandSlices.map(s => (
            <div key={s.brand} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:s.color }}/>
              <span style={{ fontFamily:F.raj, fontSize:'0.65rem', color:C.dim }}>{s.brand}</span>
              <span style={{ fontFamily:F.orb, fontSize:'0.62rem', color:s.color, marginLeft:'auto' }}>{s.count}</span>
            </div>
          ))}
          {unset > 0 && (
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'rgba(255,100,50,0.25)' }}/>
              <span style={{ fontFamily:F.raj, fontSize:'0.65rem', color:C.dimmer }}>Sin asignar</span>
              <span style={{ fontFamily:F.orb, fontSize:'0.62rem', color:C.dimmer, marginLeft:'auto' }}>{unset}</span>
            </div>
          )}
        </div>
      </div>
      {/* Bar list per model */}
      {entries.length > 0 && (
        <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:6 }}>
          {entries.slice(0,6).map(e => (
            <ProgressRow key={e.id} label={e.meta.label} value={e.count} max={total} color={e.meta.color} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Missions panel ─────────────────────────────────────────────
function MissionsPanel({ stats }: { stats: AdminStats }) {
  const total     = stats.missions_total     || 1
  const completed = stats.missions_completed || 0
  const active    = stats.missions_active    || 0
  const abandoned = stats.missions_abandoned || 0
  const completionRate = Math.round((completed / Math.max(completed+active+abandoned,1))*100)

  return (
    <div style={{ ...CARD, padding:'20px' }}>
      <SectionLabel>Misiones — resumen de plataforma</SectionLabel>
      {/* Rate ring */}
      <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:16 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ flexShrink:0 }}>
          <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,100,50,0.08)" strokeWidth="8"/>
          <circle cx="36" cy="36" r="28" fill="none"
            stroke={C.cyan} strokeWidth="8"
            strokeDasharray={`${completionRate*1.759} ${175.9-completionRate*1.759}`}
            strokeDashoffset="43.98"
            strokeLinecap="round" opacity="0.9"/>
          <text x="36" y="32" textAnchor="middle" fill={C.cyan} fontSize="13" fontFamily={F.orb} fontWeight="900">{completionRate}%</text>
          <text x="36" y="44" textAnchor="middle" fill={C.dimmer} fontSize="6.5" fontFamily={F.raj} letterSpacing="1">COMPLETADO</text>
        </svg>
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:C.cyan }}/>
            <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dim, flex:1 }}>Completadas</span>
            <span style={{ fontFamily:F.orb, fontSize:'0.72rem', color:C.cyan }}>{completed.toLocaleString()}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:C.gold }}/>
            <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dim, flex:1 }}>En progreso</span>
            <span style={{ fontFamily:F.orb, fontSize:'0.72rem', color:C.gold }}>{active.toLocaleString()}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:C.red }}/>
            <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dim, flex:1 }}>Abandonadas</span>
            <span style={{ fontFamily:F.orb, fontSize:'0.72rem', color:C.red }}>{abandoned.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div style={{ height:1, background:C.bdrO, marginBottom:14 }}/>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:F.raj, fontSize:'0.68rem', color:C.dimmer }}>Misiones disponibles</span>
        <span style={{ fontFamily:F.orb, fontSize:'0.82rem', color:C.purple, fontWeight:700 }}>{total}</span>
      </div>
    </div>
  )
}

// ── XP panel ──────────────────────────────────────────────────
function XPPanel({ stats }: { stats: AdminStats }) {
  const categories = Object.entries(stats.xp_by_category || {})
    .sort(([,a],[,b]) => b-a)
  const totalXP = stats.xp_total || 0

  const catColors = ['#ff6b35','#a855f7','#60a5fa','#00e5a0','#fbbf24','#f43f5e']

  return (
    <div style={{ ...CARD, padding:'20px' }}>
      <SectionLabel>Experiencia — distribución XP</SectionLabel>
      <div style={{ display:'flex', gap:16, marginBottom:16 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:F.orb, fontSize:'1.6rem', fontWeight:900, color:C.gold, lineHeight:1 }}>
            {totalXP.toLocaleString()}
          </div>
          <div style={{ fontFamily:F.raj, fontSize:'0.62rem', color:C.dimmer, marginTop:3, letterSpacing:'0.12em' }}>
            XP TOTAL PLATAFORMA
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:F.orb, fontSize:'1.1rem', fontWeight:700, color:C.orange }}>
            {(stats.xp_avg_per_user || 0).toLocaleString()}
          </div>
          <div style={{ fontFamily:F.raj, fontSize:'0.6rem', color:C.dimmer, marginTop:3, letterSpacing:'0.1em' }}>
            PROM / USUARIO
          </div>
        </div>
      </div>
      {categories.length > 0 ? (
        <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
          {categories.slice(0,5).map(([cat, xp], i) => (
            <ProgressRow
              key={cat} label={cat} value={xp as number}
              max={totalXP} color={catColors[i % catColors.length]} suffix=" xp"
            />
          ))}
        </div>
      ) : (
        <div style={{ fontFamily:F.raj, fontSize:'0.72rem', color:C.dimmer, textAlign:'center', padding:'8px 0' }}>
          Sin categorías registradas
        </div>
      )}
    </div>
  )
}

// ── Chat sessions panel ────────────────────────────────────────
function ChatPanel({ stats }: { stats: AdminStats }) {
  const total    = stats.chats_total    || 0
  const active   = stats.chats_active   || 0
  const archived = stats.chats_archived || 0
  const archPct  = total > 0 ? Math.round((archived/total)*100) : 0

  return (
    <div style={{ ...CARD, padding:'20px' }}>
      <SectionLabel>Chat con Ather — sesiones</SectionLabel>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>
        {[
          { label:'Total', value:total,    color:C.blue   },
          { label:'Activas',  value:active,   color:C.cyan   },
          { label:'Archivadas',value:archived, color:C.dimmer },
        ].map(item => (
          <div key={item.label} style={{ textAlign:'center', padding:'10px 8px', borderRadius:10,
            background:'rgba(255,255,255,0.02)', border:`1px solid rgba(255,100,50,0.1)` }}>
            <div style={{ fontFamily:F.orb, fontSize:'1.1rem', fontWeight:900, color:item.color }}>{item.value.toLocaleString()}</div>
            <div style={{ fontFamily:F.raj, fontSize:'0.58rem', color:C.dimmer, letterSpacing:'0.1em', textTransform:'uppercase', marginTop:3 }}>{item.label}</div>
          </div>
        ))}
      </div>
      {/* Archive rate bar */}
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
          <span style={{ fontFamily:F.raj, fontSize:'0.68rem', color:C.dim }}>Tasa de archivado</span>
          <span style={{ fontFamily:F.orb, fontSize:'0.68rem', color:C.purple }}>{archPct}%</span>
        </div>
        <div style={{ height:6, borderRadius:99, background:'rgba(255,100,50,0.08)', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${archPct}%`, borderRadius:99,
            background:`linear-gradient(90deg,${C.purple}88,${C.purple})`,
            transition:'width 0.8s ease' }}/>
        </div>
        <div style={{ fontFamily:F.raj, fontSize:'0.6rem', color:C.dimmer, marginTop:5 }}>
          Chats cerrados vs total generado
        </div>
      </div>
    </div>
  )
}

// ── Collectables panel ─────────────────────────────────────────
function CollectablesPanel({ stats }: { stats: AdminStats }) {
  const total   = stats.collectables_total     || 0
  const byRarity = stats.collectables_by_rarity || {}
  const rarityColors: Record<string,string> = {
    common:    '#9ca3af',
    uncommon:  '#00e5a0',
    rare:      '#60a5fa',
    epic:      '#a855f7',
    legendary: '#ffaa00',
  }
  const rarityEntries = Object.entries(byRarity).sort(([,a],[,b]) => (b as number)-(a as number))

  return (
    <div style={{ ...CARD, padding:'20px' }}>
      <SectionLabel>Coleccionables entregados</SectionLabel>
      <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:14 }}>
        <span style={{ fontFamily:F.orb, fontSize:'2rem', fontWeight:900, color:C.gold }}>{total.toLocaleString()}</span>
        <span style={{ fontFamily:F.raj, fontSize:'0.68rem', color:C.dimmer }}>ítems en circulación</span>
      </div>
      {rarityEntries.length > 0 ? (
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {rarityEntries.map(([rarity, count]) => {
            const color = rarityColors[rarity.toLowerCase()] ?? C.orange
            return (
              <div key={rarity} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:color,
                  boxShadow:`0 0 6px ${color}`, flexShrink:0 }}/>
                <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dim, flex:1, textTransform:'capitalize' }}>{rarity}</span>
                <div style={{ flex:2, height:4, borderRadius:99, background:'rgba(255,100,50,0.08)', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${((count as number)/total)*100}%`, borderRadius:99,
                    background:`linear-gradient(90deg,${color}60,${color})`, transition:'width 0.8s ease' }}/>
                </div>
                <span style={{ fontFamily:F.orb, fontSize:'0.65rem', color, minWidth:28, textAlign:'right' }}>{(count as number).toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ fontFamily:F.raj, fontSize:'0.72rem', color:C.dimmer, textAlign:'center' }}>Sin coleccionables aún</div>
      )}
    </div>
  )
}

// ── Platform health score ──────────────────────────────────────
function HealthScore({ stats }: { stats: AdminStats }) {
  // Composite score 0-100
  const suspendRate   = stats.total_users > 0 ? (stats.suspended/stats.total_users)*100 : 0
  const missionRate   = (stats.missions_completed + stats.missions_active) > 0
    ? (stats.missions_completed / (stats.missions_completed+stats.missions_active+stats.missions_abandoned)) * 100 : 0
  const chatEngagement = stats.total_users > 0 ? Math.min((stats.chats_total/stats.total_users)*100,100) : 0
  const score = Math.round(Math.max(0, 100 - suspendRate*2 + missionRate*0.3 + chatEngagement*0.2))
  const clamped = Math.min(score, 100)

  const color = clamped >= 75 ? C.cyan : clamped >= 50 ? C.gold : C.red
  const label = clamped >= 75 ? 'ÓPTIMO' : clamped >= 50 ? 'ESTABLE' : 'ATENCIÓN'

  return (
    <div style={{ ...CARD, padding:'20px', display:'flex', alignItems:'center', gap:20 }}>
      {/* Gauge */}
      <svg width="84" height="50" viewBox="0 0 84 50" style={{ flexShrink:0 }}>
        <path d="M 7 44 A 35 35 0 0 1 77 44" fill="none" stroke="rgba(255,100,50,0.1)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M 7 44 A 35 35 0 0 1 77 44" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${(clamped/100)*110} 110`} opacity="0.9"/>
        <text x="42" y="42" textAnchor="middle" fill={color} fontSize="14" fontFamily={F.orb} fontWeight="900"></text>
      </svg>
      <div>
        <div style={{ fontFamily:F.raj, fontSize:'0.55rem', letterSpacing:'0.25em', textTransform:'uppercase', color:`${color}88`, marginBottom:4 }}>
          Salud de plataforma
        </div>
        <div style={{ fontFamily:F.orb, fontSize:'0.85rem', color, fontWeight:900, letterSpacing:'0.1em' }}>{label}</div>
        <div style={{ fontFamily:F.raj, fontSize:'0.62rem', color:C.dimmer, marginTop:3 }}>
          Basado en actividad, misiones y suspensiones
        </div>
      </div>
    </div>
  )
}

// ── Quick metrics row ──────────────────────────────────────────
function QuickMetrics({ stats }: { stats: AdminStats }) {
  const items = [
    { icon:'⚡', label:'XP promedio',    value: `${(stats.xp_avg_per_user||0).toLocaleString()} xp`, color: C.gold   },
    { icon:'💬', label:'Chats activos',  value: `${(stats.chats_active||0).toLocaleString()}`,         color: C.blue   },
    { icon:'🏆', label:'Coleccionables', value: `${(stats.collectables_total||0).toLocaleString()}`,   color: C.purple },
    { icon:'📋', label:'Logs hoy',       value: `${(stats.logs_today||0).toLocaleString()}`,            color: C.orange },
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
      {items.map(item => (
        <div key={item.label} style={{ ...CARD, padding:'14px 16px', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:'1.2rem', filter:`drop-shadow(0 0 6px ${item.color})` }}>{item.icon}</span>
          <div>
            <div style={{ fontFamily:F.orb, fontSize:'0.85rem', fontWeight:900, color:item.color }}>{item.value}</div>
            <div style={{ fontFamily:F.raj, fontSize:'0.58rem', color:C.dimmer, letterSpacing:'0.1em', textTransform:'uppercase' }}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Overview section ───────────────────────────────────────────
function OverviewSection({ stats, chart, loading }: {
  stats: AdminStats | null; chart: ChartPoint[]; loading: boolean
}) {
  if (loading || !stats) return <Spinner />

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

      {/* Row 1 — KPIs principales */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10 }}>
        <StatCard label="Total usuarios"  value={stats.total_users}   color={C.orange} icon="👥" sub={`+${stats.new_this_month} este mes`}/>
        <StatCard label="Activos"         value={stats.active_users}  color={C.cyan}   icon="✅" sub="no suspendidos"/>
        <StatCard label="Suspendidos"     value={stats.suspended}     color={C.red}    icon="🚫"/>
        <StatCard label="Nuevos 7 días"   value={stats.new_this_week} color={C.purple} icon="🆕"/>
        <StatCard label="Misiones total"  value={stats.missions_total || 0} color={C.gold}   icon="🗺️"/>
        <StatCard label="XP plataforma"   value={(stats.xp_total||0).toLocaleString()} color='#fbbf24' icon="⚡"/>
      </div>

      {/* Row 2 — quick metrics */}
      <QuickMetrics stats={stats} />

      {/* Row 3 — chart + donut + health */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 220px', gap:12 }}>
        <BarChart data={chart} />
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <RoleDonut byRole={stats.by_role} />
          <HealthScore stats={stats} />
        </div>
      </div>

      {/* Row 4 — missions + xp + chat */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
        <MissionsPanel stats={stats} />
        <XPPanel stats={stats} />
        <ChatPanel stats={stats} />
      </div>

      {/* Row 5 — glasses + collectables */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <GlassesChart byGlasses={stats.by_glasses || {}} unset={stats.glasses_unset || 0} />
        <CollectablesPanel stats={stats} />
      </div>
    </div>
  )
}

// ── Users section ──────────────────────────────────────────────
function UsersSection({ users, loading, search, page, total, onSearch, onPage, onEdit, onToggle, totalPages }: {
  users: AdminUser[]; loading: boolean; search: string; page: number; total: number
  onSearch: (v:string)=>void; onPage: (p:number)=>void
  onEdit: (u:AdminUser)=>void; onToggle: (u:AdminUser)=>void
  totalPages: (n:number)=>number
}) {
  const pages = totalPages(total)
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* Search */}
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.03)',
          border:`1px solid ${C.bdrP}`, borderRadius:9, padding:'8px 12px' }}>
          <span style={{ color:C.dimmer }}><Ico.Search /></span>
          <input value={search} onChange={e=>onSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            style={{ flex:1, background:'transparent', border:'none', outline:'none',
              color:C.text, fontFamily:F.raj, fontSize:'0.8rem', caretColor:C.purple }}/>
        </div>
        <div style={{ fontFamily:F.raj, fontSize:'0.68rem', color:C.dimmer, whiteSpace:'nowrap' }}>
          {total} usuarios
        </div>
      </div>

      {loading ? <Spinner /> : (
        <div style={{ ...CARD, overflow:'hidden' }}>
          {/* Table header */}
          <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1.1fr 110px 110px 90px 80px',
            gap:8, padding:'10px 16px', borderBottom:`1px solid ${C.bdrO}`,
            fontFamily:F.raj, fontSize:'0.56rem', letterSpacing:'0.22em', textTransform:'uppercase', color:C.dimmer }}>
            <span>Nombre</span>
            <span>Email</span>
            <span>Rol</span>
            <span>Headset VR</span>
            <span>Registro</span>
            <span style={{ textAlign:'right' }}>Acc.</span>
          </div>

          {users.length === 0 ? (
            <div style={{ textAlign:'center', padding:32, color:C.dimmer, fontFamily:F.raj, fontSize:'0.75rem' }}>
              Sin resultados
            </div>
          ) : users.map((u,i) => {
            const roleMeta = getRoleMeta(u.role)
            const vrMeta   = getVRMeta(u.vr_glasses)
            return (
              <div key={u.id} className="user-row" style={{
                display:'grid', gridTemplateColumns:'1.2fr 1.1fr 110px 110px 90px 80px',
                gap:8, padding:'10px 16px', alignItems:'center',
                borderBottom: i < users.length-1 ? `1px solid rgba(180,60,40,0.07)` : 'none',
                opacity: u.suspended ? 0.4 : 1, transition:'background 0.15s',
              }}>
                {/* Name */}
                <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
                  <div style={{ width:26, height:26, borderRadius:6, flexShrink:0, display:'flex',
                    alignItems:'center', justifyContent:'center', fontSize:'0.55rem', fontFamily:F.orb,
                    fontWeight:700, background:`${roleMeta.color}15`, border:`1px solid ${roleMeta.color}40`, color:roleMeta.color }}>
                    {getInitials(u)}
                  </div>
                  <span style={{ fontFamily:F.raj, fontSize:'0.76rem', color:C.text,
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {getFullName(u)}
                  </span>
                </div>
                {/* Email */}
                <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dimmer,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.email ?? '—'}</span>
                {/* Role */}
                <div style={{ padding:'2px 8px', borderRadius:4, background:roleMeta.bg,
                  border:`1px solid ${roleMeta.color}40`, color:roleMeta.color,
                  fontFamily:F.raj, fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.12em',
                  display:'inline-flex', width:'fit-content' }}>
                  {roleMeta.label}
                </div>
                {/* Headset VR */}
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontSize:'0.8rem' }}>{vrMeta.icon}</span>
                  <div>
                    <div style={{ fontFamily:F.raj, fontSize:'0.62rem', color:vrMeta.color,
                      fontWeight:700, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:80 }}>
                      {u.vr_glasses && u.vr_glasses !== 'none' ? vrMeta.label : '—'}
                    </div>
                    {u.vr_glasses && u.vr_glasses !== 'none' && (
                      <div style={{ fontFamily:F.raj, fontSize:'0.56rem', color:C.dimmer }}>{vrMeta.brand}</div>
                    )}
                  </div>
                </div>
                {/* Date */}
                <span style={{ fontFamily:F.raj, fontSize:'0.66rem', color:C.dimmer }}>
                  {formatDate(u.created_at)}
                </span>
                {/* Actions */}
                <div style={{ display:'flex', gap:5, justifyContent:'flex-end' }}>
                  <button onClick={()=>onEdit(u)} title="Editar usuario"
                    style={{ width:26, height:26, borderRadius:6, background:'rgba(255,107,53,0.08)',
                      border:`1px solid rgba(255,107,53,0.25)`, color:C.orange, cursor:'pointer',
                      display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.18s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,107,53,0.2)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,107,53,0.08)'}}>
                    <Ico.Edit />
                  </button>
                  <button onClick={()=>onToggle(u)} title={u.suspended ? 'Reactivar' : 'Suspender'}
                    style={{ width:26, height:26, borderRadius:6,
                      background: u.suspended ? 'rgba(0,229,160,0.08)' : 'rgba(255,48,96,0.08)',
                      border:`1px solid ${u.suspended ? 'rgba(0,229,160,0.25)' : 'rgba(255,48,96,0.25)'}`,
                      color: u.suspended ? C.cyan : C.red, cursor:'pointer',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'0.65rem', fontWeight:700, transition:'all 0.18s' }}
                    onMouseEnter={e=>{e.currentTarget.style.opacity='0.7'}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity='1'}}>
                    {u.suspended ? '▶' : '⏸'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pages > 1 && (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8 }}>
          <button onClick={()=>onPage(page-1)} disabled={page===0}
            style={{ width:28, height:28, borderRadius:6, background:'transparent', border:`1px solid ${C.bdrO}`,
              color:C.dim, cursor:page===0?'not-allowed':'pointer', opacity:page===0?0.3:1,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico.ChevL />
          </button>
          <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dimmer, letterSpacing:'0.1em' }}>
            {page+1} / {pages}
          </span>
          <button onClick={()=>onPage(page+1)} disabled={page>=pages-1}
            style={{ width:28, height:28, borderRadius:6, background:'transparent', border:`1px solid ${C.bdrO}`,
              color:C.dim, cursor:page>=pages-1?'not-allowed':'pointer', opacity:page>=pages-1?0.3:1,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico.ChevR />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Edit user modal (rol + gafas) ──────────────────────────────
function EditUserModal({ user, role, onClose, onSave, onSetRole }: {
  user: AdminUser; role: UserRole
  onClose:()=>void; onSave:()=>void; onSetRole:(r:UserRole)=>void
}) {
  const roles: UserRole[]    = ['admin','Teacher','Student','Personal']
  const glasses: VRGlassesModel[] = [
    'meta-quest-2','meta-quest-3','meta-quest-3s','meta-quest-pro',
    'apple-vision-pro','playstation-vr2','valve-index',
    'htc-vive-xr-elite','htc-vive-focus-vision','htc-vive-pro-2',
    'pico-4','pico-4-ultra','samsung-galaxy-xr','hp-reverb-g2','none',
  ]
  const [tab, setTab] = useState<'role'|'glasses'>('role')

  return (
    <div style={{ position:'fixed', inset:0, zIndex:100, display:'flex', alignItems:'center',
      justifyContent:'center', background:'rgba(4,2,8,0.9)', backdropFilter:'blur(8px)' }}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{ ...CARD, padding:28, width:360, border:`1px solid ${C.bdrP}`,
        boxShadow:`0 0 50px rgba(200,80,255,0.15)` }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <div>
            <div style={{ fontFamily:F.orb, fontSize:'0.62rem', color:C.text, letterSpacing:'0.15em' }}>
              EDITAR USUARIO
            </div>
            <div style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dimmer, marginTop:2 }}>
              {getFullName(user)}
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:C.dimmer, cursor:'pointer', padding:4 }}>
            <Ico.Close />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:16 }}>
          {(['role','glasses'] as const).map(t => (
            <button key={t} onClick={()=>setTab(t)}
              style={{ flex:1, padding:'7px 0', borderRadius:8, fontFamily:F.raj, fontSize:'0.68rem',
                fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer',
                transition:'all 0.18s',
                background: tab===t ? 'rgba(255,107,53,0.12)' : 'transparent',
                border: `1px solid ${tab===t ? 'rgba(255,107,53,0.4)' : C.bdrO}`,
                color: tab===t ? C.orange : C.dimmer }}>
              {t === 'role' ? 'Rol' : 'Headset VR'}
            </button>
          ))}
        </div>

        {/* Tab: Role */}
        {tab === 'role' && (
          <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:20 }}>
            {roles.map(r => {
              const meta = getRoleMeta(r)
              const sel  = role===r
              return (
                <button key={r} onClick={()=>onSetRole(r)}
                  style={{ padding:'10px 14px', borderRadius:8, textAlign:'left', cursor:'pointer',
                    fontFamily:F.raj, fontSize:'0.74rem', fontWeight:700, letterSpacing:'0.12em',
                    transition:'all 0.18s',
                    background: sel ? meta.bg : 'transparent',
                    border: `1px solid ${sel ? meta.color : C.bdrO}`,
                    color: sel ? meta.color : C.dim }}>
                  {meta.label}
                </button>
              )
            })}
          </div>
        )}

        {/* Tab: Glasses */}
        {tab === 'glasses' && (
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:20, maxHeight:260, overflowY:'auto' }}>
            {glasses.map(g => {
              const meta = getVRMeta(g)
              const sel  = (user.vr_glasses ?? 'none') === g
              return (
                <button key={g}
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:8,
                    textAlign:'left', cursor:'pointer', fontFamily:F.raj, fontSize:'0.72rem', fontWeight:600,
                    transition:'all 0.18s',
                    background: sel ? `${meta.color}18` : 'transparent',
                    border: `1px solid ${sel ? meta.color+'55' : C.bdrO}`,
                    color: sel ? meta.color : C.dim }}>
                  <span style={{ fontSize:'0.9rem' }}>{meta.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{meta.label}</div>
                    {g !== 'none' && <div style={{ fontSize:'0.58rem', color:C.dimmer, marginTop:1 }}>{meta.brand} · {meta.type}</div>}
                  </div>
                  {sel && <span style={{ fontSize:'0.7rem', color:meta.color }}>✓</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* Actions */}
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={onClose}
            style={{ flex:1, padding:'9px 0', borderRadius:8, background:'transparent',
              border:`1px solid ${C.bdrO}`, color:C.dimmer, fontFamily:F.raj,
              fontSize:'0.72rem', cursor:'pointer', letterSpacing:'0.08em' }}>
            Cancelar
          </button>
          <button onClick={onSave}
            style={{ flex:1, padding:'9px 0', borderRadius:8,
              background:'linear-gradient(135deg,#ff4e50,#f7931e)', border:'none',
              color:'#fff', fontFamily:F.orb, fontSize:'0.6rem', fontWeight:700,
              cursor:'pointer', letterSpacing:'0.1em' }}>
            GUARDAR
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Logs section ───────────────────────────────────────────────
function LogsSection({ logs, loading, filter, page, total, onFilter, onPage, totalPages }: {
  logs: ActivityLog[]; loading: boolean; filter: string; page: number; total: number
  onFilter:(v:string)=>void; onPage:(p:number)=>void; totalPages:(n:number)=>number
}) {
  const pages = totalPages(total)

  // Action quick filters
  const quickFilters = ['LOGIN','LOGOUT','ROLE_CHANGE','GLASSES_CHANGE','SUSPENDED','MISSION_COMPLETE']

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* Quick filter chips */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {quickFilters.map(qf => {
          const am  = getActionMeta(qf)
          const sel = filter === qf
          return (
            <button key={qf} onClick={()=>onFilter(sel ? '' : qf)}
              style={{ padding:'4px 10px', borderRadius:99, fontFamily:F.raj, fontSize:'0.6rem',
                fontWeight:700, letterSpacing:'0.15em', cursor:'pointer', transition:'all 0.18s',
                background: sel ? `${am.color}20` : 'transparent',
                border: `1px solid ${sel ? am.color+'60' : 'rgba(180,60,40,0.2)'}`,
                color: sel ? am.color : C.dimmer }}>
              {am.label}
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.03)',
          border:`1px solid ${C.bdrP}`, borderRadius:9, padding:'8px 12px' }}>
          <span style={{ color:C.dimmer }}><Ico.Search /></span>
          <input value={filter} onChange={e=>onFilter(e.target.value)}
            placeholder="Filtrar por acción (LOGIN, ROLE_CHANGE, GLASSES_CHANGE...)..."
            style={{ flex:1, background:'transparent', border:'none', outline:'none',
              color:C.text, fontFamily:F.raj, fontSize:'0.78rem', caretColor:C.purple }}/>
        </div>
        <div style={{ fontFamily:F.raj, fontSize:'0.68rem', color:C.dimmer, whiteSpace:'nowrap' }}>
          {total} eventos
        </div>
      </div>

      {loading ? <Spinner /> : (
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          {logs.length === 0 ? (
            <div style={{ ...CARD, padding:32, textAlign:'center', color:C.dimmer, fontFamily:F.raj, fontSize:'0.75rem' }}>
              Sin logs registrados
            </div>
          ) : logs.map(log => {
            const am = getActionMeta(log.action)
            const rm = getRoleMeta(log.user_role ?? '')
            return (
              <div key={log.id} className="log-row"
                style={{ ...CARD, padding:'11px 16px', display:'grid',
                  gridTemplateColumns:'100px 1fr 100px 80px', gap:10, alignItems:'center',
                  borderLeft:`3px solid ${am.color}55`, borderRadius:10 }}>
                <div style={{ padding:'3px 8px', borderRadius:4, background:`${am.color}12`,
                  border:`1px solid ${am.color}35`, color:am.color, fontFamily:F.raj,
                  fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.18em', textAlign:'center' }}>
                  {am.label}
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontFamily:F.raj, fontSize:'0.74rem', color:C.text,
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {log.user_name ?? 'Sistema'}
                  </div>
                  <div style={{ fontFamily:F.raj, fontSize:'0.6rem', color:C.dimmer,
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {log.user_email}
                  </div>
                </div>
                <div style={{ padding:'2px 7px', borderRadius:4, background:rm.bg, color:rm.color,
                  fontFamily:F.raj, fontSize:'0.56rem', fontWeight:700, letterSpacing:'0.12em', textAlign:'center' }}>
                  {rm.label}
                </div>
                <div style={{ fontFamily:F.raj, fontSize:'0.6rem', color:C.dimmer, textAlign:'right' }}>
                  {formatDateTime(log.created_at)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pages > 1 && (
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8 }}>
          <button onClick={()=>onPage(page-1)} disabled={page===0}
            style={{ width:28, height:28, borderRadius:6, background:'transparent', border:`1px solid ${C.bdrO}`,
              color:C.dim, cursor:page===0?'not-allowed':'pointer', opacity:page===0?0.3:1,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico.ChevL />
          </button>
          <span style={{ fontFamily:F.raj, fontSize:'0.7rem', color:C.dimmer, letterSpacing:'0.1em' }}>
            {page+1} / {pages}
          </span>
          <button onClick={()=>onPage(page+1)} disabled={page>=pages-1}
            style={{ width:28, height:28, borderRadius:6, background:'transparent', border:`1px solid ${C.bdrO}`,
              color:C.dim, cursor:page>=pages-1?'not-allowed':'pointer', opacity:page>=pages-1?0.3:1,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico.ChevR />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Sidebar nav item ───────────────────────────────────────────
function NavItem({ label, icon, active, onClick, collapsed }: {
  label:string; icon:React.ReactNode; active:boolean; onClick:()=>void; collapsed:boolean
}) {
  return (
    <button onClick={onClick} style={{
      width:'100%', display:'flex', alignItems:'center', gap:10,
      padding: collapsed ? '10px 0' : '10px 12px', borderRadius:9,
      justifyContent: collapsed ? 'center' : 'flex-start',
      background:    active ? 'rgba(255,107,53,0.1)'  : 'transparent',
      border:        `1px solid ${active ? 'rgba(255,107,53,0.3)' : 'transparent'}`,
      color:         active ? C.orange : C.dimmer,
      fontFamily:    F.raj, fontSize:'0.72rem', fontWeight:700,
      letterSpacing: '0.12em', textTransform:'uppercase',
      cursor:'pointer', transition:'all 0.18s',
      boxShadow: active ? `0 0 14px rgba(255,107,53,0.12)` : 'none',
    }}
    onMouseEnter={e=>{ if(!active){e.currentTarget.style.background='rgba(255,107,53,0.05)';e.currentTarget.style.color=C.dim} }}
    onMouseLeave={e=>{ if(!active){e.currentTarget.style.background='transparent';e.currentTarget.style.color=C.dimmer} }}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  )
}

// ── Main View ──────────────────────────────────────────────────
export default function AdminDashboardView() {
  const {
    state, setSection, toggleSidebar, handleSignOut, handleRefresh,
    handleUsersSearch, handleUsersPage, openEditUser, closeEditUser,
    setEditRole, handleSaveRole, handleToggleSuspend,
    handleLogsFilter, handleLogsPage, totalPages,
  } = useAdminController()

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(mainRef.current,
      { opacity:0, y:14 },
      { opacity:1, y:0, duration:0.4, ease:'power2.out' }
    )
    gsap.fromTo('.stat-card',
      { opacity:0, y:18 },
      { opacity:1, y:0, stagger:0.06, duration:0.4, ease:'power2.out', delay:0.1 }
    )
  }, [state.section])

  const { section, sidebarOpen } = state
  const collapsed = !sidebarOpen

  const SECTIONS: { key: AdminSection; label:string; icon:React.ReactNode }[] = [
    { key:'overview', label:'Overview',  icon:<Ico.Chart   /> },
    { key:'users',    label:'Usuarios',  icon:<Ico.Users   /> },
    { key:'logs',     label:'Logs',      icon:<Ico.Logs    /> },
  ]

  const sectionTitle: Record<AdminSection,string> = {
    overview: 'PANEL DE CONTROL',
    users:    'GESTIÓN DE USUARIOS',
    logs:     'LOGS DE ACTIVIDAD',
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
        @keyframes spinA { to { transform:rotate(360deg) } }
        .spin { animation: spinA 0.9s linear infinite }
        @keyframes sigSlide { to { left:120% } }
        #adm-scroll::-webkit-scrollbar { width:4px }
        #adm-scroll::-webkit-scrollbar-thumb { background:rgba(180,60,40,0.2);border-radius:4px }
        .user-row:hover { background:rgba(255,107,53,0.025) !important }
        .log-row:hover  { background:rgba(255,107,53,0.03)  !important }
      `}</style>

      <div style={{ display:'flex', minHeight:'100vh', background:C.bg, fontFamily:F.raj, overflow:'hidden', position:'relative' }}>

        {/* Hex grid bg */}
        <div style={{ position:'absolute', inset:0, opacity:0.06, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ahex2" x="0" y="0" width="50" height="58" patternUnits="userSpaceOnUse">
                <polygon points="25,2 48,14 48,44 25,56 2,44 2,14" fill="none" stroke="#c060ff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ahex2)"/>
          </svg>
        </div>

        {/* Sidebar */}
        <div style={{
          position:'relative', zIndex:5, flexShrink:0,
          width: collapsed ? 56 : 210, transition:'width 0.28s cubic-bezier(.4,0,.2,1)',
          background:'rgba(8,3,14,0.98)', borderRight:`1px solid ${C.bdrP}`,
          display:'flex', flexDirection:'column', overflow:'hidden',
        }}>
          {/* Logo */}
          <div style={{ padding: collapsed ? '18px 0 14px' : '18px 16px 14px',
            borderBottom:`1px solid ${C.bdrP}`, display:'flex', alignItems:'center',
            gap:10, justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <div style={{ width:28, height:28, borderRadius:7,
              background:'linear-gradient(135deg,#ff4e50,#f7931e)',
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0, boxShadow:'0 0 12px rgba(255,100,50,0.35)' }}>
              <span style={{ fontFamily:F.orb, fontWeight:900, fontSize:'0.68rem', color:'#fff' }}>A</span>
            </div>
            {!collapsed && (
              <div>
                <div style={{ fontFamily:F.orb, fontSize:'0.56rem', color:C.text, letterSpacing:'0.15em' }}>ATHERNIX</div>
                <div style={{ fontFamily:F.raj, fontSize:'0.5rem', color:'rgba(200,80,255,0.5)', letterSpacing:'0.2em', textTransform:'uppercase' }}>Admin Panel</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ flex:1, padding: collapsed ? '12px 6px' : '12px 10px', display:'flex', flexDirection:'column', gap:4 }}>
            {!collapsed && (
              <div style={{ fontFamily:F.raj, fontSize:'0.5rem', color:C.dimmer, letterSpacing:'0.25em', textTransform:'uppercase', padding:'4px 12px 8px' }}>
                Navegación
              </div>
            )}
            {SECTIONS.map(s => (
              <NavItem key={s.key} label={s.label} icon={s.icon}
                active={section===s.key} onClick={()=>setSection(s.key)} collapsed={collapsed}/>
            ))}
          </div>

          {/* Bottom */}
          <div style={{ padding: collapsed ? '12px 6px' : '12px 10px', borderTop:`1px solid ${C.bdrP}`, display:'flex', flexDirection:'column', gap:6 }}>
            <button onClick={handleSignOut}
              style={{ width:'100%', display:'flex', alignItems:'center', gap:10,
                padding: collapsed ? '8px 0' : '8px 12px', justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius:8, background:'transparent', border:'1px solid transparent',
                color:'rgba(255,48,96,0.5)', fontFamily:F.raj, fontSize:'0.7rem', fontWeight:700,
                letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.18s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,48,96,0.08)';e.currentTarget.style.borderColor='rgba(255,48,96,0.25)';e.currentTarget.style.color=C.red}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='transparent';e.currentTarget.style.color='rgba(255,48,96,0.5)'}}>
              <Ico.Logout />
              {!collapsed && <span>Salir</span>}
            </button>
            <button onClick={toggleSidebar}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center',
                padding:'7px 0', borderRadius:8, background:'transparent', border:`1px solid ${C.bdrO}`,
                color:C.dimmer, cursor:'pointer', transition:'all 0.18s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,107,53,0.08)';e.currentTarget.style.color=C.orange}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=C.dimmer}}>
              <Ico.Menu />
            </button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, position:'relative', zIndex:4 }}>
          {/* Topbar */}
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 22px',
            borderBottom:`1px solid ${C.bdrO}`, background:'rgba(8,3,14,0.85)',
            backdropFilter:'blur(16px)', flexShrink:0 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:F.orb, fontSize:'0.68rem', color:C.text, letterSpacing:'0.2em' }}>
                {sectionTitle[section]}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:C.cyan, boxShadow:`0 0 6px ${C.cyan}` }}/>
                <span style={{ fontFamily:F.raj, fontSize:'0.56rem', color:'rgba(0,229,160,0.5)', letterSpacing:'0.2em', textTransform:'uppercase' }}>
                  Sistema activo
                </span>
              </div>
            </div>
            <button onClick={handleRefresh}
              style={{ width:30, height:30, borderRadius:7, background:'rgba(255,107,53,0.08)',
                border:`1px solid rgba(255,107,53,0.22)`, color:C.orange, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.18s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,107,53,0.2)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,107,53,0.08)'}}
              title="Actualizar datos">
              <Ico.Refresh />
            </button>
          </div>

          {/* Signal bar */}
          <div style={{ height:1.5, background:C.bdrO, position:'relative', overflow:'hidden', flexShrink:0 }}>
            <div style={{ position:'absolute', top:0, left:'-60%', width:'60%', height:'100%',
              background:`linear-gradient(90deg,transparent,${C.orange},${C.purple},transparent)`,
              animation:'sigSlide 3s linear infinite' }}/>
          </div>

          {/* Content */}
          <div id="adm-scroll" ref={mainRef} style={{ flex:1, overflowY:'auto', padding:20 }}>
            {section === 'overview' && (
              <OverviewSection stats={state.stats} chart={state.chartData} loading={state.statsLoading}/>
            )}
            {section === 'users' && (
              <UsersSection
                users={state.users} loading={state.usersLoading}
                search={state.usersSearch} page={state.usersPage} total={state.usersTotal}
                onSearch={handleUsersSearch} onPage={handleUsersPage}
                onEdit={openEditUser} onToggle={handleToggleSuspend}
                totalPages={totalPages}/>
            )}
            {section === 'logs' && (
              <LogsSection
                logs={state.logs} loading={state.logsLoading}
                filter={state.logsFilter} page={state.logsPage} total={state.logsTotal}
                onFilter={handleLogsFilter} onPage={handleLogsPage}
                totalPages={totalPages}/>
            )}
          </div>
        </div>

        {/* Edit modal */}
        {state.editUser && (
          <EditUserModal
            user={state.editUser} role={state.editRole}
            onClose={closeEditUser} onSave={handleSaveRole} onSetRole={setEditRole}/>
        )}
      </div>
    </>
  )
}