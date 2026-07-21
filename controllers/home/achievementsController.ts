'use client';

import { useState, useCallback, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import {
  ACHIEVEMENTS,
  Achievement,
  UserStats,
  calculateLevel,
  getXPToNextLevel,
} from '@/models/achievements';

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

interface AchievementsState {
  achievements: Achievement[];
  userStats: UserStats | null;
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: AchievementsState = {
  achievements: ACHIEVEMENTS.map(a => ({ ...a, unlocked: false })),
  userStats: null,
  isLoading: false,
  error: null,
};

export function useAchievementsController() {
  const [state, setState] = useState<AchievementsState>(INITIAL_STATE);

  // Cargar logros del usuario desde Supabase
  const loadAchievements = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Cargar logros desbloqueados
      const { data: userAchievements, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Crear mapa de logros desbloqueados
      const unlockedMap = new Map(
        (userAchievements || []).map((ua: any) => [ua.achievement_id, ua])
      );

      // Actualizar estado de logros
      const updatedAchievements = ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        unlocked: unlockedMap.has(achievement.id),
        unlockedAt: unlockedMap.get(achievement.id)?.unlocked_at,
      }));

      // Calcular estadísticas del usuario
      const totalXP = (userAchievements || []).reduce((acc: number, ua: any) => acc + ua.xp_earned, 0);
      const level = calculateLevel(totalXP);
      
      // Cargar estadísticas adicionales de activity_logs
      const { data: activityLogs } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', user.id);

      const activeDays = new Set(
        (activityLogs || []).map((log: any) => 
          new Date(log.created_at).toDateString()
        )
      ).size;

      const joinedDate = user?.created_at || new Date().toISOString();

      const userStats: UserStats = {
        activeDays,
        totalXP,
        level,
        missionsCompleted: unlockedMap.get('mission-completed') ? 1 : 0,
        topicsExplored: unlockedMap.get('development-explored') ? 1 : 0,
        hoursSpent: Math.floor(activeDays * 0.5), // Estimado
        streakDays: 0, // Se calcularía con lógica de racha
        joinedDate,
      };

      setState({
        achievements: updatedAchievements,
        userStats,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error loading achievements:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error al cargar logros',
      }));
    }
  }, []);

  // Desbloquear un logro
  const unlockAchievement = useCallback(async (achievementId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setState(prev => ({ ...prev, isLoading: false, error: 'Usuario no autenticado' }));
        return;
      }

      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (!achievement) {
        setState(prev => ({ ...prev, isLoading: false, error: 'Logro no encontrado' }));
        return;
      }

      // Verificar si ya está desbloqueado
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .eq('achievement_id', achievementId)
        .single();

      if (existing) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Insertar nuevo logro
      const { error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_id: achievementId,
          xp_earned: achievement.xp,
          unlocked_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Recargar logros
      await loadAchievements();
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error al desbloquear logro',
      }));
    }
  }, [loadAchievements]);

  // Verificar y desbloquear logros automáticamente
  const checkAndUnlockAchievements = useCallback(async (triggers: {
    firstLogin?: boolean;
    moduleCompleted?: boolean;
    aiChatUsed?: boolean;
    headsetRegistered?: boolean;
    classroomJoined?: boolean;
    missionCompleted?: boolean;
    developmentExplored?: boolean;
    topicLearned?: boolean;
    aiQuestionsCount?: number;
  }) => {
    const achievementsToUnlock: string[] = [];

    if (triggers.firstLogin) achievementsToUnlock.push('first-login');
    if (triggers.moduleCompleted) achievementsToUnlock.push('first-module');
    if (triggers.aiChatUsed) achievementsToUnlock.push('first-ai-chat');
    if (triggers.headsetRegistered) achievementsToUnlock.push('headset-registered');
    if (triggers.classroomJoined) achievementsToUnlock.push('classroom-joined');
    if (triggers.missionCompleted) achievementsToUnlock.push('mission-completed');
    if (triggers.developmentExplored) achievementsToUnlock.push('development-explored');
    if (triggers.topicLearned) achievementsToUnlock.push('topic-learned');

    // Desbloquear logros por cantidad
    if (triggers.aiQuestionsCount && triggers.aiQuestionsCount >= 10) {
      achievementsToUnlock.push('ai-questions-10');
    }

    // Desbloquear cada logro
    for (const achievementId of achievementsToUnlock) {
      await unlockAchievement(achievementId);
    }
  }, [unlockAchievement]);

  // Cargar datos iniciales
  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  return {
    state,
    achievements: state.achievements,
    userStats: state.userStats,
    loadAchievements,
    unlockAchievement,
    checkAndUnlockAchievements,
    xpToNextLevel: state.userStats ? getXPToNextLevel(state.userStats.totalXP) : 100,
  };
}
