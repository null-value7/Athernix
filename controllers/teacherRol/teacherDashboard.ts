// controller/useTeacherDashboard.ts
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { SUBJECTS, TEACHER_COPY, EMPTY_MISSION_DRAFT, type Subject, type NewMissionDraft, type TeacherSection, type MissionStatus,} from '@/models/teacher'

interface ClassGroupDTO {
  id: string
  name: string
  gradeLevel: string
  color: string
  joinCode: string
  studentCount: number
  avgProgress: number
}

interface StudentDTO {
  id: string
  classId: string
  name: string
  initials: string
  missionsDone: number
  missionsTotal: number
  xp: number
  level: number
  streakDays: number
  lastActive: string
  status: string
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
  status: MissionStatus
  assignedCount: number
  completedCount: number
}

interface TeacherViewState {
  section:           TeacherSection
  classes:           ClassGroupDTO[]
  studentsByClass:   Record<string, StudentDTO[]>
  missions:          MissionDTO[]
  loading:           boolean
  selectedClassId:   string
  studentSearch:     string
  selectedStudentId: string | null
  showMissionModal:  boolean
  missionDraft:      NewMissionDraft
}

const initialState: TeacherViewState = {
  section: 'resumen',
  classes: [],
  studentsByClass: {},
  missions: [],
  loading: true,
  selectedClassId: 'all',
  studentSearch: '',
  selectedStudentId: null,
  showMissionModal: false,
  missionDraft: EMPTY_MISSION_DRAFT,
}

function mapClassroom(row: any): ClassGroupDTO {
  return {
    id: row.id,
    name: row.name,
    gradeLevel: row.grade_level ?? '',
    color: row.color ?? '#FF6B00',
    joinCode: row.join_code,
    studentCount: row.classroom_members?.[0]?.count ?? 0,
    avgProgress: 0, // se recalcula tras cargar students
  }
}

function mapMission(row: any): MissionDTO {
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
    assignedCount: 0,   // opcional: calcular con otro fetch si lo necesitas exacto
    completedCount: 0,
  }
}

export function useTeacherDashboard() {
  const [subjects] = useState<Subject[]>(SUBJECTS)
  const [subjectAssignments, setSubjectAssignments] = useState<Record<string, string[]>>(
    () => Object.fromEntries(SUBJECTS.map(s => [s.id, [] as string[]]))
  )
  const [state, setState] = useState<TeacherViewState>(initialState)

  const loadData = useCallback(async () => {
    setState(s => ({ ...s, loading: true }))

    const classesRes = await fetch('/api/classrooms').then(r => r.json())
    const rawClasses = classesRes.classrooms ?? []
    const classes = rawClasses.map(mapClassroom)

    // trae estudiantes y misiones de todas las clases en paralelo
    const [studentsResults, missionsResults] = await Promise.all([
      Promise.all(classes.map((c: ClassGroupDTO) =>
        fetch(`/api/classrooms/${c.id}/students`).then(r => r.json()).then(j => ({ classId: c.id, students: j.students ?? [] }))
      )),
      Promise.all(classes.map((c: ClassGroupDTO) =>
        fetch(`/api/missions?classroomId=${c.id}`).then(r => r.json()).then(j => (j.missions ?? []).map(mapMission))
      )),
    ])

    const studentsByClass: Record<string, StudentDTO[]> = {}
    studentsResults.forEach(({ classId, students }) => {
      studentsByClass[classId] = students.map((s: any) => ({ ...s, classId }))
    })

    const classesWithProgress = classes.map((c: ClassGroupDTO) => {
      const roster = studentsByClass[c.id] ?? []
      const avgProgress = roster.length
        ? Math.round((roster.reduce((a, s) => a + (s.missionsTotal ? s.missionsDone / s.missionsTotal : 0), 0) / roster.length) * 100)
        : 0
      return { ...c, studentCount: roster.length, avgProgress }
    })

    const missions = missionsResults.flat()

    setState(s => ({ ...s, classes: classesWithProgress, studentsByClass, missions, loading: false }))
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const goSection = useCallback((section: TeacherSection) => setState(s => ({ ...s, section })), [])
  const selectClass = useCallback((classId: string) => setState(s => ({ ...s, selectedClassId: classId })), [])
  const setStudentSearch = useCallback((studentSearch: string) => setState(s => ({ ...s, studentSearch })), [])
  const selectStudent = useCallback((id: string) => setState(s => ({ ...s, selectedStudentId: s.selectedStudentId === id ? null : id })), [])

  const openMissionModal = useCallback((presetClassId?: string) => {
    setState(s => ({
      ...s,
      showMissionModal: true,
      missionDraft: { ...EMPTY_MISSION_DRAFT, classId: presetClassId || s.classes[0]?.id || '' },
    }))
  }, [])

  const closeMissionModal = useCallback(() => setState(s => ({ ...s, showMissionModal: false })), [])

  const updateDraft = useCallback((patch: Partial<NewMissionDraft>) => {
    setState(s => ({ ...s, missionDraft: { ...s.missionDraft, ...patch } }))
  }, [])

  const createMission = useCallback(async () => {
    const draft = state.missionDraft
    if (!draft.title.trim()) return

    const res = await fetch('/api/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        classroomId: draft.classId,
        subjectId: draft.subjectId,
        title: draft.title.trim(),
        description: draft.description.trim(),
        difficulty: draft.difficulty,
        xpReward: draft.xpReward,
        dueDate: draft.dueDate || 'Sin fecha',
      }),
    })
    if (!res.ok) return // opcional: manejar error en UI

    setState(s => ({ ...s, showMissionModal: false, missionDraft: EMPTY_MISSION_DRAFT }))
    await loadData() // refresca lista de misiones
  }, [state.missionDraft, loadData])

  const toggleMissionStatus = useCallback(async (id: string) => {
    const mission = state.missions.find(m => m.id === id)
    if (!mission) return
    const next: MissionStatus =
      mission.status === 'borrador' ? 'publicada' :
      mission.status === 'publicada' ? 'cerrada' : 'publicada'

    setState(s => ({ ...s, missions: s.missions.map(m => m.id === id ? { ...m, status: next } : m) }))

    await fetch(`/api/missions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
  }, [state.missions])

  // Nota: crear clase (con código único) va aparte — ver createClassroom más abajo
  const createClassroom = useCallback(async (data: { name: string; gradeLevel?: string; subjectId: string }) => {
    const res = await fetch('/api/classrooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error)
    await loadData()
    return json.classroom
  }, [loadData])

  const toggleSubjectClass = useCallback((subjectId: string, classId: string) => {
    setSubjectAssignments(prev => {
      const current = prev[subjectId] || []
      const has = current.includes(classId)
      return { ...prev, [subjectId]: has ? current.filter(id => id !== classId) : [...current, classId] }
    })
  }, [])

  // ── Derivados ──────────────────────────────────────────────
  const allStudents = useMemo(
    () => Object.values(state.studentsByClass).flat(),
    [state.studentsByClass]
  )

  const filteredStudents = useMemo(() => {
    const q = state.studentSearch.trim().toLowerCase()
    const pool = state.selectedClassId === 'all' ? allStudents : (state.studentsByClass[state.selectedClassId] ?? [])
    return pool.filter(s => !q || s.name.toLowerCase().includes(q))
  }, [allStudents, state.studentsByClass, state.selectedClassId, state.studentSearch])

  const filteredMissions = useMemo(
    () => state.missions.filter(m => state.selectedClassId === 'all' || m.classId === state.selectedClassId),
    [state.missions, state.selectedClassId]
  )

  const stats = useMemo(() => {
    const totalStudents = allStudents.length
    const activeMissions = state.missions.filter(m => m.status === 'publicada').length
    const avgProgress = allStudents.length
      ? Math.round((allStudents.reduce((a, s) => a + (s.missionsTotal ? s.missionsDone / s.missionsTotal : 0), 0) / allStudents.length) * 100)
      : 0
    const avgStreak = 0 // no disponible en el schema todavía
    const atRisk = allStudents.filter(s => s.status === 'en_riesgo').length
    return { totalStudents, activeMissions, avgProgress, avgStreak, atRisk }
  }, [allStudents, state.missions])

  return {
    state, copy: TEACHER_COPY,
    subjects, classes: state.classes, students: allStudents, missions: state.missions,
    filteredStudents, filteredMissions, subjectAssignments, stats,
    goSection, selectClass, setStudentSearch, selectStudent,
    openMissionModal, closeMissionModal, updateDraft, createMission, createClassroom,
    toggleMissionStatus, toggleSubjectClass,
  }
}