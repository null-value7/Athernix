export default class Signal {
  /**
   * Get properties and values for a given signal mode.
   * @param {string} mode - 'neural', 'seismic', 'vr', 'bio', 'chaos'
   * @returns {object} Signal metrics and status string
   */
  static getModeData(mode) {
    const modes = {
      neural: {
        frequency: '8.45 Hz',
        amplitude: '64%',
        state: 'SINCRONIZACIÓN NEURAL COMPLETA',
        intensity: 0.64
      },
      seismic: {
        frequency: '2.10 Hz',
        amplitude: '12%',
        state: 'ACTIVIDAD SÍSMICA ESTABLE',
        intensity: 0.12
      },
      vr: {
        frequency: '120.00 Hz',
        amplitude: '95%',
        state: 'SINC DE VISOR AL 95%',
        intensity: 0.95
      },
      bio: {
        frequency: '1.25 Hz',
        amplitude: '42%',
        state: 'FRECUENCIA CARDÍACA NOMINAL',
        intensity: 0.42
      },
      chaos: {
        frequency: '57.89 Hz',
        amplitude: '88%',
        state: 'FLUCTUACIONES CAÓTICAS DETECTADAS',
        intensity: 0.88
      }
    };
    
    return modes[mode.toLowerCase()] || {
      frequency: '0.00 Hz',
      amplitude: '0%',
      state: 'MODO INDETERMINADO - ESPERANDO...',
      intensity: 0.0
    };
  }
}
