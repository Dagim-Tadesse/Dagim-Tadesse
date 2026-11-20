// Real-time reactive store connecting Interactive Graphics Lab controls with NeuralBackground canvas
export type WireColor = "cyan" | "violet" | "emerald" | "amber";

export interface GraphicsConfig {
  waveSpeed: number;      // 0.4 to 2.8 (default 1.3)
  amplitude: number;      // 8 to 55 (default 32)
  focalLength: number;    // 320 to 620 (default 450)
  wireColor: WireColor;   // Primary aesthetic gradient
  shockwave: number;      // Timestamp of shockwave trigger
}

const DEFAULT_CONFIG: GraphicsConfig = {
  waveSpeed: 1.3,
  amplitude: 32,
  focalLength: 450,
  wireColor: "cyan",
  shockwave: 0,
};

let currentConfig: GraphicsConfig = { ...DEFAULT_CONFIG };
const listeners = new Set<(cfg: GraphicsConfig) => void>();

export const graphicsStore = {
  get(): GraphicsConfig {
    return currentConfig;
  },

  set(partial: Partial<GraphicsConfig>) {
    currentConfig = { ...currentConfig, ...partial };
    listeners.forEach((fn) => fn(currentConfig));
  },

  triggerShockwave() {
    this.set({ shockwave: performance.now() });
  },

  reset() {
    this.set(DEFAULT_CONFIG);
  },

  subscribe(fn: (cfg: GraphicsConfig) => void): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
