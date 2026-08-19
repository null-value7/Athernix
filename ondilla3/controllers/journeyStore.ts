// ═══════════════════════════════════════════
// CONTROLLER — Almacén mutable del progreso del recorrido.
// No usa React state a propósito: la cámara 3D lo lee cada frame
// dentro de useFrame (60fps) sin provocar renders de React. Los
// elementos de UI que sí necesitan reaccionar pueden suscribirse.
// ═══════════════════════════════════════════

type Listener = (progress: number) => void;

class JourneyStore {
  private listeners = new Set<Listener>();
  private progress = 0;

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.progress);
    return () => {
      this.listeners.delete(fn);
    };
  }

  set(progress: number): void {
    this.progress = progress;
    this.listeners.forEach((fn) => fn(progress));
  }

  get(): number {
    return this.progress;
  }
}

export const journeyStore = new JourneyStore();
