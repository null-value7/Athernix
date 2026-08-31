// controller/useStudentDashboard.ts
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  SUBJECTS, STUDENT_PROFILE, BADGES, STUDENT_COPY, XP_PER_LEVEL,
  type StudentSection, type StudentMissionState,
} from '@/models/Student/student';

interface ClassroomDTO {
  id: string
  name: string
  gradeLevel: string
  teacherName: string
  joinCode?: string
  color: string
}

interface MissionDTO {
  id: string
  classId: string
  subjectId: string
  title: string
  description: string
  difficulty: string
  xpReward: number
  dueDate: string
  status: string
  studentState: StudentMissionState
}

interface StudentViewState {
  section:            StudentSection
  classes:            ClassroomDTO[]
  missions:            MissionDTO[]
  loading:            boolean
  missionClassFilter: string
  joinCodeInput:      string
  joinError:          string | null
  joinSuccess:        string | null
  showJoinModal:      boolean
}

const initialState: StudentViewState = {
  section: 'clases',
  classes: [],
  missions: [],
  loading: true,
  missionClassFilter: 'all',
  joinCodeInput: '',
  joinError: null,
  joinSuccess: null,
  showJoinModal: false,
}

function normalizeCode(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, '')
}

// mapea filas crudas de Supabase al shape que espera la View
function mapClassroom(row: any): ClassroomDTO {
  return {
    id: row.id,
    name: row.name,
    gradeLevel: row.grade_level ?? '',
    teacherName: row.teacher ? `${row.teacher.first_name ?? ''} ${row.teacher.last_name ?? ''}`.trim() : '',
    color: row.color ?? '#FF6B00',
  }
}

function mapMission(row: any): MissionDTO {
  const done = Array.isArray(row.user_mission) && row.user_mission[0]?.state === true
  return {
    id: String(row.id_mission),
    classId: row.classroom_id,
    subjectId: row.subject_id,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty,
    xpReward: row.gotpoints ?? 0,
    dueDate: row.due_date ?? 'Sin fecha',
    status: row.status,
    studentState: done ? 'completada' : 'pendiente',
  }
}

export function useStudentDashboard() {
  const [state, setState] = useState<StudentViewState>(initialState)

  const loadData = useCallback(async () => {
    setState(s => ({ ...s, loading: true }))
    const [classesRes, missionsRes] = await Promise.all([
      fetch('/api/classrooms/mine').then(r => r.json()),
      fetch('/api/missions').then(r => r.json()),
    ])
    setState(s => ({
      ...s,
      classes: (classesRes.classrooms ?? []).map(mapClassroom),
      missions: (missionsRes.missions ?? []).map(mapMission),
      loading: false,
    }))
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const goSection = useCallback((section: StudentSection) => {
    setState(s => ({ ...s, section }))
  }, [])

  const openJoinModal = useCallback(() => {
    setState(s => ({ ...s, showJoinModal: true, joinCodeInput: '', joinError: null, joinSuccess: null }))
  }, [])

  const closeJoinModal = useCallback(() => {
    setState(s => ({ ...s, showJoinModal: false }))
  }, [])

  const setJoinCodeInput = useCallback((v: string) => {
    setState(s => ({ ...s, joinCodeInput: v, joinError: null }))
  }, [])

  const joinClass = useCallback(async () => {
    const code = normalizeCode(state.joinCodeInput)
    if (!code) return setState(s => ({ ...s, joinError: 'Ingresa un código para continuar.' }))

    const res = await fetch('/api/classrooms/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    const json = await res.json()

    if (!res.ok) {
      const msg = json.error === 'Ya estás en esta clase' ? STUDENT_COPY.joinErrorAlready : STUDENT_COPY.joinErrorInvalid
      return setState(s => ({ ...s, joinError: msg }))
    }

    await loadData() // refresca clases y misiones tras unirse
    setState(s => ({
      ...s,
      joinCodeInput: '',
      joinError: null,
      joinSuccess: `${STUDENT_COPY.joinSuccess} (${json.classroom.name})`,
    }))
  }, [state.joinCodeInput, loadData])

  const leaveClass = useCallback(async (classId: string) => {
    // optimista: lo quita de la UI de inmediato
    setState(s => ({ ...s, classes: s.classes.filter(c => c.id !== classId) }))
    await fetch(`/api/classrooms/${classId}/leave`, { method: 'POST' })
  }, [])

  const setMissionClassFilter = useCallback((classId: string) => {
    setState(s => ({ ...s, missionClassFilter: classId }))
  }, [])

  const toggleMissionComplete = useCallback(async (missionId: string) => {
    const mission = state.missions.find(m => m.id === missionId)
    if (!mission) return
    const completed = mission.studentState !== 'completada'

    setState(s => ({
      ...s,
      missions: s.missions.map(m => m.id === missionId
        ? { ...m, studentState: completed ? 'completada' : 'pendiente' }
        : m),
    }))

    await fetch(`/api/missions/${missionId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
  }, [state.missions])

  // ── Derivados (igual que antes, ahora sobre state.classes/state.missions) ──
  const joinedClasses = state.classes

  const filteredMissions = useMemo(
    () => state.missions.filter(m => state.missionClassFilter === 'all' || m.classId === state.missionClassFilter),
    [state.missions, state.missionClassFilter]
  )

  const stats = useMemo(() => {
    const total = state.missions.length
    const completed = state.missions.filter(m => m.studentState === 'completada').length
    const xp = state.missions.filter(m => m.studentState === 'completada').reduce((a, m) => a + m.xpReward, 0)
    const level = Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1)
    const xpIntoLevel = xp % XP_PER_LEVEL
    const pct = total ? Math.round((completed / total) * 100) : 0
    return { total, completed, xp, level, xpIntoLevel, xpPerLevel: XP_PER_LEVEL, pct }
  }, [state.missions])

  const badges = useMemo(() => {
    const unlockedMap: Record<string, boolean> = {
      'first-mission': stats.completed >= 1,
      'streak-3':      STUDENT_PROFILE.streakDays >= 3,
      'multi-class':   joinedClasses.length >= 2,
      'halfway':       stats.total > 0 && stats.pct >= 50,
      'all-done':      stats.total > 0 && stats.pct === 100,
    }
    return BADGES.map(b => ({ ...b, unlocked: !!unlockedMap[b.id] }))
  }, [stats, joinedClasses])

  return {
    state, copy: STUDENT_COPY, profile: STUDENT_PROFILE,
    classes: joinedClasses, subjects: SUBJECTS,
    joinedClasses, filteredMissions, stats, badges,
    goSection, openJoinModal, closeJoinModal, setJoinCodeInput, joinClass, leaveClass,
    setMissionClassFilter, toggleMissionComplete,
  }
}