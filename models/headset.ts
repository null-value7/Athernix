// models/useHeadsets.ts
import { createBrowserClient } from '@supabase/ssr'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}

// ── Tipos ────────────────────────────────────────────────────
export type VRGlassesModel =
  | 'meta-quest-2' | 'meta-quest-3' | 'meta-quest-3s' | 'meta-quest-pro'
  | 'apple-vision-pro' | 'playstation-vr2' | 'valve-index'
  | 'htc-vive-xr-elite' | 'htc-vive-focus-vision' | 'htc-vive-pro-2'
  | 'pico-4' | 'pico-4-ultra' | 'samsung-galaxy-xr' | 'hp-reverb-g2' | 'none'

export type HeadsetType = 'standalone' | 'pcvr' | 'console'
export type HeadsetTier = 'ENTRY' | 'MID' | 'PRO' | 'ELITE'

export interface HeadsetMeta {
  label: string
  brand: string
  type:  HeadsetType
  sdk:   string
  color: string
  icon:  string
  tier:  HeadsetTier
  imageUrl?: string
}

// Mismo catálogo que usa el panel de administración (profiles.vr_glasses),
// para que admin y usuario compartan una única fuente de verdad.
export const HEADSET_META: Record<VRGlassesModel, HeadsetMeta> = {
  'meta-quest-2':          { label:'Meta Quest 2',      brand:'Meta',      type:'standalone', sdk:'Meta OpenXR SDK',     color:'#1877f2', icon:'🥽', tier:'ENTRY', imageUrl:'/media/MetaQuest2.jpg' },
  'meta-quest-3':          { label:'Meta Quest 3',      brand:'Meta',      type:'standalone', sdk:'Meta OpenXR SDK',     color:'#1877f2', icon:'🥽', tier:'MID',   imageUrl:'/media/MetaQuest3.webp' },
  'meta-quest-3s':         { label:'Meta Quest 3S',     brand:'Meta',      type:'standalone', sdk:'Meta OpenXR SDK',     color:'#1877f2', icon:'🥽', tier:'ENTRY', imageUrl:'/media/MetaQuest3S.jpe' },
  'meta-quest-pro':        { label:'Meta Quest Pro',    brand:'Meta',      type:'standalone', sdk:'Meta OpenXR SDK',     color:'#1877f2', icon:'🥽', tier:'PRO',   imageUrl:'/media/MetaQuestPro.jpg' },
  'apple-vision-pro':      { label:'Apple Vision Pro',  brand:'Apple',     type:'standalone', sdk:'Unity PolySpatial',   color:'#dfe3e8', icon:'🍎', tier:'ELITE', imageUrl:'/media/AppleVisionPro.jpg' },
  'playstation-vr2':       { label:'PlayStation VR2',   brand:'Sony',      type:'console',    sdk:'PSVR2 OpenXR Plugin', color:'#2c6fd1', icon:'🎮', tier:'PRO',   imageUrl:'/media/PSVR2.jpe' },
  'valve-index':           { label:'Valve Index',       brand:'Valve',     type:'pcvr',       sdk:'OpenVR XR Plugin',    color:'#9aa0a8', icon:'🖥️', tier:'PRO',   imageUrl:'/media/Valve.jpe' },
  'htc-vive-xr-elite':     { label:'VIVE XR Elite',     brand:'HTC',       type:'standalone', sdk:'VIVE OpenXR SDK',     color:'#e0435a', icon:'🥽', tier:'MID',   imageUrl:'/media/ViveXR.jpe' },
  'htc-vive-focus-vision': { label:'VIVE Focus Vision', brand:'HTC',       type:'standalone', sdk:'VIVE OpenXR SDK',     color:'#e0435a', icon:'🥽', tier:'PRO',   imageUrl:'/media/ViveXR.jpe' },
  'htc-vive-pro-2':        { label:'VIVE Pro 2',        brand:'HTC',       type:'pcvr',       sdk:'VIVE OpenXR SDK',     color:'#e0435a', icon:'🖥️', tier:'ELITE', imageUrl:'/media/ViveXR.jpe' },
  'pico-4':                { label:'Pico 4',            brand:'ByteDance', type:'standalone', sdk:'Pico OpenXR SDK',     color:'#2dd4bf', icon:'🥽', tier:'MID',   imageUrl:'/media/MetaQuest3.webp' },
  'pico-4-ultra':          { label:'Pico 4 Ultra',      brand:'ByteDance', type:'standalone', sdk:'Pico OpenXR SDK',     color:'#2dd4bf', icon:'🥽', tier:'PRO',   imageUrl:'/media/MetaQuest3.webp' },
  'samsung-galaxy-xr':     { label:'Samsung Galaxy XR', brand:'Samsung',   type:'standalone', sdk:'Android XR OpenXR',   color:'#4d7cff', icon:'🥽', tier:'PRO',   imageUrl:'/media/MetaQuest3.webp' },
  'hp-reverb-g2':          { label:'HP Reverb G2',      brand:'HP',        type:'pcvr',       sdk:'Windows MR OpenXR',   color:'#38b6e8', icon:'🖥️', tier:'MID',   imageUrl:'/media/Valve.jpe' },
  'none':                  { label:'Sin asignar',       brand:'—',         type:'standalone', sdk:'—',                   color:'#ff6b35', icon:'❓', tier:'ENTRY' },
}

export function getHeadsetMeta(id?: string | null): HeadsetMeta {
  return HEADSET_META[id as VRGlassesModel] ?? HEADSET_META['none']
}

export const TIER_LABEL: Record<HeadsetTier, string> = {
  ENTRY: 'ENTRADA', MID: 'INTERMEDIO', PRO: 'PROFESIONAL', ELITE: 'ÉLITE',
}
export const TYPE_LABEL: Record<HeadsetType, string> = {
  standalone: 'AUTÓNOMO', pcvr: 'CONECTADO A PC', console: 'CONSOLA',
}

// ── Módulos Athernix y su compatibilidad real por tipo de headset ──
export interface ModuleCompat {
  id: string
  name: string
  color: string
  supports: HeadsetType[]
  href: string
  note: string
}
export const ATHERNIX_MODULES: ModuleCompat[] = [
  { id: 'historia', name: 'Historia Viva VR', color: '#FF006E', href: '/modulos/history',
    supports: ['standalone', 'pcvr', 'console'], note: 'Corre en cualquier headset · acceso universal' },
  { id: 'svirtual', name: 'SVirtual Tours', color: '#FF6B00', href: '/modulos/tours',
    supports: ['standalone', 'pcvr', 'console'], note: 'Streaming ligero de recorridos guiados por IA' },
  { id: 'mente', name: 'MenteLibre VR', color: '#FFD700', href: '/modulos/brain',
    supports: ['standalone', 'pcvr'], note: 'Requiere hápticos y biofeedback avanzado' },
]

// ── Estado del hook ──────────────────────────────────────────
export interface MyHeadsetState {
  current: VRGlassesModel
  setAt:   string | null
  loading: boolean
  saving:  boolean
}
export const initialMyHeadsetState: MyHeadsetState = {
  current: 'none', setAt: null, loading: false, saving: false,
}

// ── Fetchers (Supabase) ──────────────────────────────────────
export async function fetchMyHeadset(): Promise<{ model: VRGlassesModel; setAt: string | null }> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { model: 'none', setAt: null }

  const { data, error } = await supabase
    .from('profiles')
    .select('vr_glasses, vr_glasses_set_at')
    .eq('id', user.id)
    .single()

  if (error || !data) return { model: 'none', setAt: null }
  return { model: (data.vr_glasses ?? 'none') as VRGlassesModel, setAt: data.vr_glasses_set_at }
}

export async function updateMyHeadset(model: VRGlassesModel): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'No autenticado' }

  // El usuario solo puede actualizar su propia fila — cubierto por la policy
  // "Solo el dueño edita su perfil" (auth.uid() = id) ya existente en profiles.
  const { data, error } = await supabase
    .from('profiles')
    .update({
      vr_glasses:        model,
      vr_glasses_set_at: new Date().toISOString(),
      updated_at:        new Date().toISOString(),
    })
    .eq('id', user.id)
    .select()

  if (error) return { success: false, error: error.message }
  if (!data || data.length === 0) return { success: false, error: 'No se pudo actualizar (0 filas afectadas)' }

  await supabase.from('activity_logs').insert({
    user_id: user.id, action: 'GLASSES_CHANGE', entity: 'user', entity_id: user.id,
    metadata: { new_glasses: model },
  })

  return { success: true }
}