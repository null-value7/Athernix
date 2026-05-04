export type UserRole = "admin" | "Personal" | "Teacher" | "Student";

const ROLE_LABELS: Record<UserRole, string> = {
  admin:    "ADMIN",
  Personal: "PERSONAL",
  Teacher:  "DOCENTE",
  Student:  "ESTUDIANTE",
};

export function getRoleLabel(role?: UserRole | string): string {
  if (!role) return "OPERADOR";
  return ROLE_LABELS[role as UserRole] ?? role.toUpperCase();
}

// ── Colores por rol ──────────────────────────────────────────
export const ROLE_COLORS: Record<string, string> = {
  admin:    "#ff3060",
  Personal: "#ff6020",
  Teacher:  "#ffaa00",
  Student:  "#00e5a0",
};

export function getRoleColor(role?: string): string {
  return ROLE_COLORS[role ?? ""] ?? "#ff6020";
}

// ── Interfaz de usuario para la navbar ──────────────────────
export interface NavUser {
  id:         string;
  name:       string;       // first_name + last_name
  email:      string;
  role:       UserRole;
  avatarUrl?: string | null;
}

// ── Links de navegación principales ─────────────────────────
export interface NavModule {
  href:  string;
  label: string;
  tag:   string;
  color: string;
  desc:  string;
  icon:  string;
}

export const NAV_MODULES: NavModule[] = [
  {
    href:  "/modulos/historia-viva",
    label: "HISTORIA_VIVA",
    tag:   "Cultural",
    color: "#ff3060",
    desc:  "Patrimonio VR · Joya de Cerén",
    icon:  "◈",
  },
  {
    href:  "/modulos/svirtual-tours",
    label: "SVIRTUAL_TOURS",
    tag:   "Turismo",
    color: "#ff6020",
    desc:  "Recorridos IA · Multilingüe",
    icon:  "◎",
  },
  {
    href:  "/modulos/mentelibre-vr",
    label: "MENTELIBRE_VR",
    tag:   "Salud",
    color: "#ffaa00",
    desc:  "Biofeedback · Terapia XR",
    icon:  "⬡",
  },
];

// ── Links del dropdown de usuario ───────────────────────────
export interface UserMenuItem {
  href:   string;
  label:  string;
  icon:   string;
}

export const USER_MENU_ITEMS: UserMenuItem[] = [
  { href: "/dashboard",     label: "DASHBOARD",     icon: "⬡" },
  { href: "/perfil",        label: "MI_PERFIL",      icon: "◈" },
  { href: "/configuracion", label: "CONFIGURACIÓN",  icon: "◎" },
];

// getNavSession() fue movido a @/lib/supabase/navSession.ts
// para evitar que next/headers llegue al bundle del cliente.