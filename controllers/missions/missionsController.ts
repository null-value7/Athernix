// controllers/missions/missionsController.ts - Controller for VR Missions System
// Ahora lee misiones reales de Supabase (tabla `missions` + `user_mission`),
// las mismas que usa el juego Unity via SupabaseBridge.

import { useState, useCallback, useEffect } from 'react';
import {
  Mission,
  MissionType,
  MissionStatus,
  calculateMissionProgress,
  missionTypeMeta
} from '@/models/missions';
import { getPublishedMissionsWithProgress } from '@/models/mission';
import { createClient } from '@/lib/supabase/client';

export interface MissionsState {
  missions: Mission[];
  selectedMission: Mission | null;
  selectedCategory: MissionType | 'all';
  isLoading: boolean;
  error: string | null;
}

const initialMissionsState: MissionsState = {
  missions: [],
  selectedMission: null,
  selectedCategory: 'all',
  isLoading: true,
  error: null,
};

export function useMissionsController() {
  const [state, setState] = useState<MissionsState>(initialMissionsState);

  // ── Cargar misiones reales de Supabase al montar ──────────────────
  const loadMissions = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        setState(prev => ({
          ...prev,
          missions: [],
          isLoading: false,
          error: 'Debes iniciar sesión para ver tus misiones.',
        }));
        return;
      }

      const missions = await getPublishedMissionsWithProgress(supabase, user.id);

      setState(prev => ({
        ...prev,
        missions,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al cargar misiones',
      }));
    }
  }, []);

  useEffect(() => {
    loadMissions();
  }, [loadMissions]);

  const selectCategory = useCallback((category: MissionType | 'all') => {
    setState(prev => ({
      ...prev,
      selectedCategory: category,
      selectedMission: null,
    }));
  }, []);

  const selectMission = useCallback((missionId: string) => {
    setState(prev => {
      const mission = prev.missions.find(m => m.id === missionId);
      return mission ? { ...prev, selectedMission: mission } : prev;
    });
  }, []);

  // ── Acciones que sincronizan con Supabase (user_mission) ──────────
  const startMission = useCallback(async (missionId: string) => {
    // Actualización optimista del estado local
    setState(prev => ({
      ...prev,
      missions: prev.missions.map(m =>
        m.id === missionId
          ? { ...m, status: 'in_progress' as MissionStatus }
          : m
      ),
      selectedMission: prev.selectedMission?.id === missionId
        ? { ...prev.selectedMission, status: 'in_progress' as MissionStatus }
        : prev.selectedMission,
    }));

    // Sync a Supabase: crea/actualiza user_mission con progress=0, state=false
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('user_mission')
        .upsert(
          {
            user_id: user.id,
            mission_id: Number(missionId),
            state: false,
            progress: 0,
            completed_at: null,
          },
          { onConflict: 'user_id,mission_id' }
        );
    } catch {
      // Error silencioso — el estado local ya está actualizado
    }
  }, []);

  const completeSubMission = useCallback(async (missionId: string, _subMissionId: string) => {
    setState(prev => ({
      ...prev,
      missions: prev.missions.map(m => {
        if (m.id !== missionId) return m;

        const updatedSubMissions = m.subMissions.map(sm =>
          sm.id === _subMissionId ? { ...sm, completed: true } : sm
        );

        const newProgress = calculateMissionProgress({
          ...m,
          subMissions: updatedSubMissions
        });

        const allCompleted = updatedSubMissions.every(sm => sm.completed);

        return {
          ...m,
          subMissions: updatedSubMissions,
          progress: newProgress,
          status: allCompleted ? 'completed' as MissionStatus : m.status
        };
      }),
      selectedMission: prev.selectedMission?.id === missionId
        ? (() => {
            const updatedSubMissions = prev.selectedMission.subMissions.map(sm =>
              sm.id === _subMissionId ? { ...sm, completed: true } : sm
            );
            const newProgress = calculateMissionProgress({
              ...prev.selectedMission,
              subMissions: updatedSubMissions
            });
            const allCompleted = updatedSubMissions.every(sm => sm.completed);
            return {
              ...prev.selectedMission,
              subMissions: updatedSubMissions,
              progress: newProgress,
              status: allCompleted ? 'completed' as MissionStatus : prev.selectedMission.status
            };
          })()
        : prev.selectedMission,
    }));

    // Sync progreso a Supabase
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const mission = state.missions.find(m => m.id === missionId);
      if (!mission) return;

      const allCompleted = mission.subMissions.every(sm => sm.completed);

      await supabase
        .from('user_mission')
        .upsert(
          {
            user_id: user.id,
            mission_id: Number(missionId),
            state: allCompleted,
            progress: allCompleted ? 100 : mission.progress,
            completed_at: allCompleted ? new Date().toISOString() : null,
          },
          { onConflict: 'user_id,mission_id' }
        );
    } catch {
      // Error silencioso
    }
  }, [state.missions]);

  const resetMission = useCallback(async (missionId: string) => {
    setState(prev => ({
      ...prev,
      missions: prev.missions.map(m =>
        m.id === missionId
          ? {
              ...m,
              status: 'available' as MissionStatus,
              progress: 0,
              subMissions: m.subMissions.map(sm => ({ ...sm, completed: false }))
            }
          : m
      ),
      selectedMission: prev.selectedMission?.id === missionId
        ? {
            ...prev.selectedMission,
            status: 'available' as MissionStatus,
            progress: 0,
            subMissions: prev.selectedMission.subMissions.map(sm => ({ ...sm, completed: false }))
          }
        : prev.selectedMission,
    }));

    // Sync reset a Supabase
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('user_mission')
        .upsert(
          {
            user_id: user.id,
            mission_id: Number(missionId),
            state: false,
            progress: 0,
            completed_at: null,
          },
          { onConflict: 'user_id,mission_id' }
        );
    } catch {
      // Error silencioso
    }
  }, []);

  // ── Consultas derivadas ──────────────────────────────────────────
  const getFilteredMissions = useCallback(() => {
    if (state.selectedCategory === 'all') {
      return state.missions;
    }
    return state.missions.filter(m => m.type === state.selectedCategory);
  }, [state.selectedCategory, state.missions]);

  const getMissionStats = useCallback(() => {
    const total = state.missions.length;
    const completed = state.missions.filter(m => m.status === 'completed').length;
    const inProgress = state.missions.filter(m => m.status === 'in_progress').length;
    const totalXP = state.missions.reduce((sum, m) => sum + (m.status === 'completed' ? m.totalXP : 0), 0);

    return { total, completed, inProgress, totalXP };
  }, [state.missions]);

  // ── Conteos por categoría (para los CategoryCard) ────────────────
  const getCategoryCount = useCallback((type: MissionType): number => {
    return state.missions.filter(m => m.type === type).length;
  }, [state.missions]);

  return {
    state,
    selectCategory,
    selectMission,
    startMission,
    completeSubMission,
    resetMission,
    getFilteredMissions,
    getMissionStats,
    getCategoryCount,
    loadMissions,
  };
}
