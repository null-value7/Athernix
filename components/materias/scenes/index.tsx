import type { ComponentType } from "react";
import type { MateriaSlug } from "@/models/materia.model";
import type { Vec3 } from "@/models/vr-viewer.model";
import MathIsland from "./MathIsland";
import LanguageIsland from "./LanguageIsland";
import ScienceIsland from "./ScienceIsland";
import SocialIsland from "./SocialIsland";

export interface IslandSceneProps {
  position?: Vec3;
  scale?: number;
  reducedMotion?: boolean;
  /** Habilita hover/click (páginas de detalle). */
  interactive?: boolean;
}

export const ISLAND_SCENES: Record<MateriaSlug, ComponentType<IslandSceneProps>> = {
  matematica: MathIsland,
  lenguaje: LanguageIsland,
  ciencia: ScienceIsland,
  sociales: SocialIsland,
};
