// models/collectibles.ts — Catálogo de coleccionables + progreso del usuario
//
// El catálogo vive en Unity como ScriptableObjects (CollectableItem.idUnico).
// Supabase solo guarda las filas que el usuario ya coleccionó en `colectable`.
// Si se agregan items nuevos en Unity, actualizar COLLECTIBLE_CATALOG.

import { createClient } from '@/lib/supabase/client';

export interface CollectibleDef {
  id: number;          // = colectable.id_object = CollectableItem.idUnico en Unity
  name: string;
  emoji: string;
  category: string;
}

// Catálogo espejo de Assets/Scripts Inventory/Items/*.asset
export const COLLECTIBLE_CATALOG: CollectibleDef[] = [
  { id: 1, name: 'Botella',         emoji: '🍾', category: 'General'     },
  { id: 2, name: 'Chicken',         emoji: '🍗', category: 'Comida'      },
  { id: 3, name: 'Antiguedad',      emoji: '🏺', category: 'Arqueologia' },
  { id: 4, name: 'Jarra',           emoji: '🫖', category: 'General'     },
  { id: 5, name: 'Brujula',         emoji: '🧭', category: 'Arqueologia' },
  { id: 6, name: 'Moneda Romana',   emoji: '🪙', category: 'Arqueologia' },
  { id: 7, name: 'Estatua de Buda', emoji: '🗿', category: 'Meditacion'  },
  { id: 8, name: 'Bacon Hamburger', emoji: '🍔', category: 'General'     },
];

export interface UserCollectibleRow {
  id: number;
  id_object: number;
  namecol: string;
  rarity: string;      // NOTA: Unity guarda aquí la categoría, no una rareza real
  quantity: number;
  created_at: string;
}

export interface CollectibleEntry {
  def: CollectibleDef;
  obtained: boolean;
  count: number;          // veces coleccionado (suma de quantity)
  firstAt: string | null; // fecha del primer coleccionado
}

// Lee las filas de `colectable` del usuario autenticado y las cruza con el catálogo.
export async function getUserInventory(): Promise<CollectibleEntry[]> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const rows: UserCollectibleRow[] = user
    ? (await supabase
        .from('colectable')
        .select('id,id_object,namecol,rarity,quantity,created_at')
        .eq('user_id', user.id)).data ?? []
    : [];

  return COLLECTIBLE_CATALOG.map(def => {
    const owned = rows.filter(r => r.id_object === def.id);
    const fechas = owned.map(r => r.created_at).sort();
    return {
      def,
      obtained: owned.length > 0,
      count: owned.reduce((acc, r) => acc + (r.quantity || 1), 0),
      firstAt: fechas[0] ?? null,
    };
  });
}
