'use client'

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from 'gsap'
import { redirect } from "next/navigation";
import { getNavSession } from "@/lib/supabase/navSession";
import NavBar from "@/app/navbar/NavBar";


import { useAdminController } from '@/controllers/Admin/dashboardControl'
import {
  AdminSection, AdminUser, ActivityLog, ChartPoint,
  AdminStats, UserRole,
  getRoleMeta, getActionMeta, getFullName, getInitials,
  formatDateTime, formatDate, PAGE_SIZE,
} from '@/models/Admin/dashboard'

/*
interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getNavSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <NavBar user={user} />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
*/


// ── Design tokens ──────────────────────────────────────────────
const F  = { orb: "'Orbitron',sans-serif", raj: "'Rajdhani',sans-serif" }
const C  = {
  bg:     '#08040c', surface: 'rgba(14,6,20,0.96)',
  s2:     'rgba(20,8,28,0.9)',
  orange: '#ff6b35', red: '#ff4e50', purple: '#c060ff',
  cyan:   '#00e5a0', text: '#ede0d4',
  dim:    'rgba(210,170,140,0.55)', dimmer: 'rgba(210,170,140,0.3)',
  bdrO:   'rgba(180,60,40,0.2)', bdrP: 'rgba(180,60,200,0.2)',
}
const CARD: React.CSSProperties = {
  background:    C.surface,
  border:        `1px solid ${C.bdrO}`,
  borderRadius:  12,
  boxShadow:     '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
}

// ── Icons ──────────────────────────────────────────────────────
const Ico = {
  Menu:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>,
  Chart:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>,
  Users:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>,
  Logs:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/></svg>,
  Logout:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/></svg>,
  Refresh:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>,
  Search:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>,
  Edit:     () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/></svg>,
  Close:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>,
  ChevL:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>,
  ChevR:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>,
}

// ── Spinner ────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
      <svg className="spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,100,50,0.2)" strokeWidth="3"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke={C.orange} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

// ── Stat card ──────────────────────────────────────────────────
function StatCard({ label, value, sub, color }: { label: string; value: number | string; sub?: string; color: string }) {
  return (
    <div className="stat-card" style={{ ...CARD, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: `linear-gradient(90deg,transparent,${color},transparent)` }}/>
      <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: `${color}88`, fontFamily: F.raj, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: F.orb, fontSize: '1.8rem', fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.65rem', color: C.dimmer, fontFamily: F.raj, marginTop: 6, letterSpacing: '0.1em' }}>{sub}</div>}
    </div>
  )
}

// ── Mini bar chart ─────────────────────────────────────────────
function BarChart({ data }: { data: ChartPoint[] }) {
  const max   = Math.max(...data.map(d => d.count), 1)
  const show  = data.slice(-20)

  return (
    <div style={{ ...CARD, padding: '20px 20px 16px' }}>
      <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: `${C.orange}88`, fontFamily: F.raj, marginBottom: 16 }}>
        REGISTROS — ÚLTIMOS 30 DÍAS
      </div>
      {data.length === 0 ? (
        <div style={{ textAlign: 'center', color: C.dimmer, fontFamily: F.raj, fontSize: '0.75rem', padding: '20px 0' }}>Sin datos aún</div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
          {show.map((d, i) => (
            <div key={i} title={`${d.day}: ${d.count}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{
                width: '100%', borderRadius: '3px 3px 0 0',
                height: `${Math.max((d.count / max) * 100, 4)}%`,
                background: `linear-gradient(180deg,${C.orange},${C.red})`,
                opacity: 0.7 + (i / show.length) * 0.3,
                transition: 'height 0.4s ease',
              }}/>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {[show[0], show[Math.floor(show.length/2)], show[show.length-1]].filter(Boolean).map((d,i) => (
          <span key={i} style={{ fontSize: '0.56rem', color: C.dimmer, fontFamily: F.raj }}>{d.day}</span>
        ))}
      </div>
    </div>
  )
}

// ── Role donut (CSS) ───────────────────────────────────────────
function RoleDonut({ byRole }: { byRole: AdminStats['by_role'] }) {
  const total = Object.values(byRole).reduce((a, b) => a + b, 0) || 1
  const roles = [
    { key: 'Student',  pct: byRole.Student  / total },
    { key: 'Teacher',  pct: byRole.Teacher  / total },
    { key: 'Personal', pct: byRole.Personal / total },
    { key: 'admin',    pct: byRole.admin    / total },
  ]
  let offset = 0
  const R = 36, cx = 44, cy = 44, circ = 2 * Math.PI * R

  return (
    <div style={{ ...CARD, padding: '20px', display: 'flex', gap: 20, alignItems: 'center' }}>
      <div style={{ flexShrink: 0 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,100,50,0.08)" strokeWidth="12"/>
          {roles.map((r, i) => {
            const meta   = getRoleMeta(r.key)
            const len    = r.pct * circ
            const start  = offset
            offset      += len
            return (
              <circle key={i} cx={cx} cy={cy} r={R} fill="none"
                stroke={meta.color} strokeWidth="12"
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={-start}
                transform={`rotate(-90 ${cx} ${cy})`}
                opacity="0.85"/>
            )
          })}
          <text x={cx} y={cy+4} textAnchor="middle" fill={C.text} fontSize="11" fontFamily={F.orb} fontWeight="700">{total}</text>
        </svg>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {roles.map(r => {
          const meta = getRoleMeta(r.key)
          const val  = byRole[r.key as keyof typeof byRole]
          return (
            <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: meta.color, flexShrink: 0 }}/>
              <span style={{ fontFamily: F.raj, fontSize: '0.7rem', color: C.dim, flex: 1, letterSpacing: '0.1em' }}>{meta.label}</span>
              <span style={{ fontFamily: F.orb, fontSize: '0.7rem', color: meta.color }}>{val}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Overview section ───────────────────────────────────────────
function OverviewSection({ stats, chart, loading }: { stats: AdminStats | null; chart: ChartPoint[]; loading: boolean }) {
  if (loading || !stats) return <Spinner />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12 }}>
        <StatCard label="Total usuarios"   value={stats.total_users}    color={C.orange} sub={`+${stats.new_this_month} este mes`}/>
        <StatCard label="Activos"          value={stats.active_users}   color={C.cyan}   sub="no suspendidos"/>
        <StatCard label="Suspendidos"      value={stats.suspended}      color={C.red}    />
        <StatCard label="Nuevos 7 días"    value={stats.new_this_week}  color={C.purple} />
        <StatCard label="Logs hoy"         value={stats.logs_today}     color='#ffaa00'  sub="eventos registrados"/>
      </div>
      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
        <BarChart data={chart} />
        <RoleDonut byRole={stats.by_role} />
      </div>
    </div>
  )
}

// ── Users section ──────────────────────────────────────────────
function UsersSection({
  users, loading, search, page, total,
  onSearch, onPage, onEdit, onToggle, totalPages,
}: {
  users: AdminUser[]; loading: boolean; search: string; page: number; total: number
  onSearch: (v: string) => void; onPage: (p: number) => void
  onEdit: (u: AdminUser) => void; onToggle: (u: AdminUser) => void
  totalPages: (n: number) => number
}) {
  const pages = totalPages(total)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Search + count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.bdrP}`, borderRadius: 8, padding: '8px 12px' }}>
          <span style={{ color: C.dimmer }}><Ico.Search /></span>
          <input value={search} onChange={e => onSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontFamily: F.raj, fontSize: '0.8rem', caretColor: C.purple }}/>
        </div>
        <div style={{ fontFamily: F.raj, fontSize: '0.68rem', color: C.dimmer, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
          {total} usuarios
        </div>
      </div>

      {/* Table */}
      {loading ? <Spinner /> : (
        <div style={{ ...CARD, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 100px 80px', gap: 8, padding: '10px 16px', borderBottom: `1px solid ${C.bdrO}`, fontFamily: F.raj, fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.dimmer }}>
            <span>Nombre</span><span>Email</span><span>Rol</span><span>Registro</span><span style={{ textAlign: 'right' }}>Acc.</span>
          </div>
          {users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 32, color: C.dimmer, fontFamily: F.raj, fontSize: '0.75rem' }}>Sin resultados</div>
          ) : users.map((u, i) => {
            const meta = getRoleMeta(u.role)
            return (
              <div key={u.id} className="user-row" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 120px 100px 80px',
                gap: 8, padding: '10px 16px', alignItems: 'center',
                borderBottom: i < users.length - 1 ? `1px solid rgba(180,60,40,0.08)` : 'none',
                opacity: u.suspended ? 0.45 : 1, transition: 'background 0.15s',
              }}>
                {/* Name + avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.58rem', fontFamily: F.orb, fontWeight: 700, background: `${meta.color}15`, border: `1px solid ${meta.color}40`, color: meta.color }}>
                    {getInitials(u)}
                  </div>
                  <span style={{ fontFamily: F.raj, fontSize: '0.78rem', color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getFullName(u)}</span>
                </div>
                {/* Email */}
                <span style={{ fontFamily: F.raj, fontSize: '0.72rem', color: C.dimmer, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email ?? '—'}</span>
                {/* Role badge */}
                <div style={{ padding: '2px 8px', borderRadius: 4, background: meta.bg, border: `1px solid ${meta.color}40`, color: meta.color, fontFamily: F.raj, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', display: 'inline-flex', width: 'fit-content' }}>
                  {meta.label}
                </div>
                {/* Date */}
                <span style={{ fontFamily: F.raj, fontSize: '0.68rem', color: C.dimmer }}>{formatDate(u.created_at)}</span>
                {/* Actions */}
                <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
                  <button onClick={() => onEdit(u)} title="Cambiar rol"
                    style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,107,53,0.08)', border: `1px solid rgba(255,107,53,0.25)`, color: C.orange, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.18)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)' }}>
                    <Ico.Edit />
                  </button>
                  <button onClick={() => onToggle(u)} title={u.suspended ? 'Reactivar' : 'Suspender'}
                    style={{ width: 26, height: 26, borderRadius: 6, background: u.suspended ? 'rgba(0,229,160,0.08)' : 'rgba(255,48,96,0.08)', border: `1px solid ${u.suspended ? 'rgba(0,229,160,0.25)' : 'rgba(255,48,96,0.25)'}`, color: u.suspended ? C.cyan : C.red, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, transition: 'all 0.18s' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                    {u.suspended ? '▶' : '⏸'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onPage(page - 1)} disabled={page === 0}
            style={{ width: 28, height: 28, borderRadius: 6, background: 'transparent', border: `1px solid ${C.bdrO}`, color: C.dim, cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico.ChevL />
          </button>
          <span style={{ fontFamily: F.raj, fontSize: '0.7rem', color: C.dimmer, letterSpacing: '0.1em' }}>
            {page + 1} / {pages}
          </span>
          <button onClick={() => onPage(page + 1)} disabled={page >= pages - 1}
            style={{ width: 28, height: 28, borderRadius: 6, background: 'transparent', border: `1px solid ${C.bdrO}`, color: C.dim, cursor: page >= pages - 1 ? 'not-allowed' : 'pointer', opacity: page >= pages - 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico.ChevR />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Edit role modal ────────────────────────────────────────────
function EditRoleModal({ user, role, onClose, onSave, onSetRole }: {
  user: AdminUser; role: UserRole
  onClose: () => void; onSave: () => void; onSetRole: (r: UserRole) => void
}) {
  const roles: UserRole[] = ['admin', 'Teacher', 'Student', 'Personal']
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(4,2,8,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ ...CARD, padding: 28, width: 340, border: `1px solid ${C.bdrP}`, boxShadow: `0 0 40px rgba(200,80,255,0.15)` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: F.orb, fontSize: '0.65rem', color: C.text, letterSpacing: '0.15em' }}>CAMBIAR ROL</div>
            <div style={{ fontFamily: F.raj, fontSize: '0.7rem', color: C.dimmer, marginTop: 3 }}>{getFullName(user)}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.dimmer, cursor: 'pointer', padding: 4 }}><Ico.Close /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {roles.map(r => {
            const meta = getRoleMeta(r)
            const sel  = role === r
            return (
              <button key={r} onClick={() => onSetRole(r)}
                style={{ padding: '10px 14px', borderRadius: 8, background: sel ? meta.bg : 'transparent', border: `1px solid ${sel ? meta.color : C.bdrO}`, color: sel ? meta.color : C.dim, fontFamily: F.raj, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s' }}>
                {meta.label}
              </button>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '9px 0', borderRadius: 8, background: 'transparent', border: `1px solid ${C.bdrO}`, color: C.dimmer, fontFamily: F.raj, fontSize: '0.72rem', cursor: 'pointer', letterSpacing: '0.1em' }}>Cancelar</button>
          <button onClick={onSave} style={{ flex: 1, padding: '9px 0', borderRadius: 8, background: 'linear-gradient(135deg,#ff4e50,#f7931e)', border: 'none', color: '#fff', fontFamily: F.orb, fontSize: '0.62rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.1em' }}>GUARDAR</button>
        </div>
      </div>
    </div>
  )
}

// ── Logs section ───────────────────────────────────────────────
function LogsSection({ logs, loading, filter, page, total, onFilter, onPage, totalPages }: {
  logs: ActivityLog[]; loading: boolean; filter: string; page: number; total: number
  onFilter: (v: string) => void; onPage: (p: number) => void
  totalPages: (n: number) => number
}) {
  const pages = totalPages(total)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Filter + count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.bdrP}`, borderRadius: 8, padding: '8px 12px' }}>
          <span style={{ color: C.dimmer }}><Ico.Search /></span>
          <input value={filter} onChange={e => onFilter(e.target.value)}
            placeholder="Filtrar por acción (LOGIN, ROLE_CHANGE...)..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: C.text, fontFamily: F.raj, fontSize: '0.8rem', caretColor: C.purple }}/>
        </div>
        <div style={{ fontFamily: F.raj, fontSize: '0.68rem', color: C.dimmer, whiteSpace: 'nowrap' }}>{total} eventos</div>
      </div>

      {loading ? <Spinner /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {logs.length === 0 ? (
            <div style={{ ...CARD, padding: 32, textAlign: 'center', color: C.dimmer, fontFamily: F.raj, fontSize: '0.75rem' }}>Sin logs registrados</div>
          ) : logs.map((log, i) => {
            const am   = getActionMeta(log.action)
            const rm   = getRoleMeta(log.user_role ?? '')
            return (
              <div key={log.id} className="log-row" style={{ ...CARD, padding: '12px 16px', display: 'grid', gridTemplateColumns: '110px 1fr 100px 80px', gap: 12, alignItems: 'center', borderLeft: `3px solid ${am.color}50` }}>
                {/* Action badge */}
                <div style={{ padding: '3px 8px', borderRadius: 4, background: `${am.color}12`, border: `1px solid ${am.color}35`, color: am.color, fontFamily: F.raj, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textAlign: 'center' }}>
                  {am.label}
                </div>
                {/* User */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: F.raj, fontSize: '0.75rem', color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {log.user_name ?? 'Sistema'}
                  </div>
                  <div style={{ fontFamily: F.raj, fontSize: '0.62rem', color: C.dimmer, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {log.user_email}
                  </div>
                </div>
                {/* Role */}
                <div style={{ padding: '2px 7px', borderRadius: 4, background: rm.bg, color: rm.color, fontFamily: F.raj, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textAlign: 'center' }}>
                  {rm.label}
                </div>
                {/* Date */}
                <div style={{ fontFamily: F.raj, fontSize: '0.62rem', color: C.dimmer, textAlign: 'right' }}>
                  {formatDateTime(log.created_at)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onPage(page - 1)} disabled={page === 0}
            style={{ width: 28, height: 28, borderRadius: 6, background: 'transparent', border: `1px solid ${C.bdrO}`, color: C.dim, cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico.ChevL />
          </button>
          <span style={{ fontFamily: F.raj, fontSize: '0.7rem', color: C.dimmer, letterSpacing: '0.1em' }}>{page + 1} / {pages}</span>
          <button onClick={() => onPage(page + 1)} disabled={page >= pages - 1}
            style={{ width: 28, height: 28, borderRadius: 6, background: 'transparent', border: `1px solid ${C.bdrO}`, color: C.dim, cursor: page >= pages - 1 ? 'not-allowed' : 'pointer', opacity: page >= pages - 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ico.ChevR />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Sidebar nav item ───────────────────────────────────────────
function NavItem({ label, icon, active, onClick, collapsed }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void; collapsed: boolean }) {
  return (
    <button onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: collapsed ? '10px 0' : '10px 12px', borderRadius: 8,
        justifyContent: collapsed ? 'center' : 'flex-start',
        background:  active ? 'rgba(255,107,53,0.1)'  : 'transparent',
        border:      `1px solid ${active ? 'rgba(255,107,53,0.3)' : 'transparent'}`,
        color:       active ? C.orange : C.dimmer,
        fontFamily:  F.raj, fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        cursor: 'pointer', transition: 'all 0.18s',
        boxShadow: active ? `0 0 14px rgba(255,107,53,0.1)` : 'none',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,107,53,0.05)'; e.currentTarget.style.color = C.dim } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.dimmer } }}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  )
}

// ── Main View ──────────────────────────────────────────────────
export default function AdminDashboardView() {
  const {
    state, setSection, toggleSidebar, handleSignOut, handleRefresh, handleUsersSearch, handleUsersPage, openEditUser, closeEditUser, setEditRole, handleSaveRole,
    handleToggleSuspend, handleLogsFilter, handleLogsPage, totalPages,} = useAdminController()  
  const mainRef = useRef<HTMLDivElement>(null)

  // GSAP section transition
  useEffect(() => {
    gsap.fromTo(mainRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
    gsap.fromTo('.stat-card',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    )
  }, [state.section])

  const { section, sidebarOpen } = state
  const collapsed = !sidebarOpen

  const SECTIONS: { key: AdminSection; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview',  icon: <Ico.Chart  /> },
    { key: 'users',    label: 'Usuarios',  icon: <Ico.Users  /> },
    { key: 'logs',     label: 'Logs',      icon: <Ico.Logs   /> },
  ]

  const sectionTitle: Record<AdminSection, string> = {
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
        #adm-scroll::-webkit-scrollbar { width:4px }
        #adm-scroll::-webkit-scrollbar-thumb { background:rgba(180,60,40,0.2);border-radius:4px }
        .user-row:hover { background:rgba(255,107,53,0.03) }
        .log-row { transition:background 0.15s }
        .log-row:hover { background:rgba(255,107,53,0.04) !important }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: F.raj, overflow: 'hidden', borderRadius: 0, position: 'relative' }}>

        {/* ── Hex grid bg ── */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ahex" x="0" y="0" width="50" height="58" patternUnits="userSpaceOnUse">
                <polygon points="25,2 48,14 48,44 25,56 2,44 2,14" fill="none" stroke="#c060ff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ahex)"/>
          </svg>
        </div>

        {/* ── Sidebar ── */}
        <div style={{
          position: 'relative', zIndex: 5, flexShrink: 0,
          width: collapsed ? 56 : 200, transition: 'width 0.28s cubic-bezier(.4,0,.2,1)',
          background: 'rgba(8,3,14,0.97)', borderRight: `1px solid ${C.bdrP}`,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Logo */}
          <div style={{ padding: collapsed ? '18px 0 14px' : '18px 16px 14px', borderBottom: `1px solid ${C.bdrP}`, display: 'flex', alignItems: 'center', gap: 10, justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#ff4e50,#f7931e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 12px rgba(255,100,50,0.35)' }}>
              <span style={{ fontFamily: F.orb, fontWeight: 900, fontSize: '0.7rem', color: '#fff' }}>A</span>
            </div>
            {!collapsed && (
              <div>
                <div style={{ fontFamily: F.orb, fontSize: '0.58rem', color: C.text, letterSpacing: '0.15em' }}>ATHERNIX</div>
                <div style={{ fontFamily: F.raj, fontSize: '0.52rem', color: 'rgba(200,80,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Admin Panel</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ flex: 1, padding: collapsed ? '12px 6px' : '12px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {!collapsed && (
              <div style={{ fontFamily: F.raj, fontSize: '0.52rem', color: C.dimmer, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '4px 12px 8px' }}>Navegación</div>
            )}
            {SECTIONS.map(s => (
              <NavItem key={s.key} label={s.label} icon={s.icon} active={section === s.key} onClick={() => setSection(s.key)} collapsed={collapsed} />
            ))}
          </div>

          {/* Bottom: toggle + logout */}
          <div style={{ padding: collapsed ? '12px 6px' : '12px 10px', borderTop: `1px solid ${C.bdrP}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button onClick={handleSignOut}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '8px 0' : '8px 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 8, background: 'transparent', border: '1px solid transparent', color: 'rgba(255,48,96,0.55)', fontFamily: F.raj, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,48,96,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,48,96,0.25)'; e.currentTarget.style.color = C.red }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,48,96,0.55)' }}>
              <Ico.Logout />
              {!collapsed && <span>Salir</span>}
            </button>
            <button onClick={toggleSidebar}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 0', borderRadius: 8, background: 'transparent', border: `1px solid ${C.bdrO}`, color: C.dimmer, cursor: 'pointer', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)'; e.currentTarget.style.color = C.orange }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.dimmer }}>
              <Ico.Menu />
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative', zIndex: 4 }}>

          {/* Topbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: `1px solid ${C.bdrO}`, background: 'rgba(8,3,14,0.8)', backdropFilter: 'blur(14px)', flexShrink: 0 }}>
            {/* Section title */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F.orb, fontSize: '0.7rem', color: C.text, letterSpacing: '0.2em' }}>{sectionTitle[section]}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.cyan, boxShadow: `0 0 6px ${C.cyan}` }}/>
                <span style={{ fontFamily: F.raj, fontSize: '0.58rem', color: 'rgba(0,229,160,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Sistema activo</span>
              </div>
            </div>
            {/* Refresh */}
            <button onClick={handleRefresh}
              style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(255,107,53,0.08)', border: `1px solid rgba(255,107,53,0.22)`, color: C.orange, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,107,53,0.08)' }}
              title="Actualizar">
              <Ico.Refresh />
            </button>
          </div>

          {/* Signal bar */}
          <div style={{ height: 1.5, background: C.bdrO, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: 0, left: '-60%', width: '60%', height: '100%', background: `linear-gradient(90deg,transparent,${C.orange},${C.purple},transparent)`, animation: 'altSig 3s linear infinite' }}/>
          </div>
          <style>{`@keyframes altSig{to{left:120%}}`}</style>

          {/* Scrollable content */}
          <div id="adm-scroll" ref={mainRef} style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {section === 'overview' && (
              <OverviewSection stats={state.stats} chart={state.chartData} loading={state.statsLoading} />
            )}
            {section === 'users' && (
              <UsersSection
                users={state.users} loading={state.usersLoading}
                search={state.usersSearch} page={state.usersPage} total={state.usersTotal}
                onSearch={handleUsersSearch} onPage={handleUsersPage}
                onEdit={openEditUser} onToggle={handleToggleSuspend}
                totalPages={totalPages}
              />
            )}
            {section === 'logs' && (
              <LogsSection
                logs={state.logs} loading={state.logsLoading}
                filter={state.logsFilter} page={state.logsPage} total={state.logsTotal}
                onFilter={handleLogsFilter} onPage={handleLogsPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>

        {/* ── Edit role modal ── */}
        {state.editUser && (
          <EditRoleModal
            user={state.editUser} role={state.editRole}
            onClose={closeEditUser} onSave={handleSaveRole} onSetRole={setEditRole}
          />
        )}
      </div>
    </>
  )
}