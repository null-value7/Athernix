// controllers/missions/missionsController.ts - Controller for VR Missions System

import { useState, useCallback, useEffect } from 'react';
import { 
  Mission, 
  MissionType, 
  MissionStatus, 
  SubMission,
  getAllMissions,
  getMissionsByType,
  getMissionById,
  calculateMissionProgress,
  missionTypeMeta
} from '@/models/missions';

export interface MissionsState {
  missions: Mission[];
  selectedMission: Mission | null;
  selectedCategory: MissionType | 'all';
  isLoading: boolean;
  error: string | null;
}

const initialMissionsState: MissionsState = {
  missions: getAllMissions(),
  selectedMission: null,
  selectedCategory: 'all',
  isLoading: false,
  error: null,
};

export function useMissionsController() {
  const [state, setState] = useState<MissionsState>(initialMissionsState);

  // Load missions on mount
  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        const missions = getAllMissions();
        setState(prev => ({
          ...prev,
          missions,
          isLoading: false,
        }));
      }, 500);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al cargar misiones',
      }));
    }
  }, []);

  const selectCategory = useCallback((category: MissionType | 'all') => {
    setState(prev => ({
      ...prev,
      selectedCategory: category,
      selectedMission: null,
    }));
  }, []);

  const selectMission = useCallback((missionId: string) => {
    const mission = getMissionById(missionId);
    if (mission) {
      setState(prev => ({
        ...prev,
        selectedMission: mission,
      }));
    }
  }, []);

  const startMission = useCallback((missionId: string) => {
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
  }, []);

  const completeSubMission = useCallback((missionId: string, subMissionId: string) => {
    setState(prev => ({
      ...prev,
      missions: prev.missions.map(m => {
        if (m.id !== missionId) return m;
        
        const updatedSubMissions = m.subMissions.map(sm =>
          sm.id === subMissionId ? { ...sm, completed: true } : sm
        );
        
        const newProgress = calculateMissionProgress({
          ...m,
          subMissions: updatedSubMissions
        });
        
        // Check if all sub-missions are completed
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
              sm.id === subMissionId ? { ...sm, completed: true } : sm
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
  }, []);

  const resetMission = useCallback((missionId: string) => {
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
  }, []);

  const getFilteredMissions = useCallback(() => {
    if (state.selectedCategory === 'all') {
      return state.missions;
    }
    return getMissionsByType(state.selectedCategory);
  }, [state.selectedCategory, state.missions]);

  const getMissionStats = useCallback(() => {
    const total = state.missions.length;
    const completed = state.missions.filter(m => m.status === 'completed').length;
    const inProgress = state.missions.filter(m => m.status === 'in_progress').length;
    const totalXP = state.missions.reduce((sum, m) => sum + (m.status === 'completed' ? m.totalXP : 0), 0);
    
    return { total, completed, inProgress, totalXP };
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
    loadMissions,
  };
}
