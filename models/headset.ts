// models/useHeadsets.ts
import { createBrowserClient } from '@supabase/ssr'

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

function getSupabase() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
  }
  return supabaseClient;
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
  controllers?: string
  resolution?: string
  refreshRate?: string
  fov?: string
  tracking?: string
  displayTech?: string
  releaseYear?: string
  features?: string[]
}

// Mismo catálogo que usa el panel de administración (profiles.vr_glasses),
// para que admin y usuario compartan una única fuente de verdad.
export const HEADSET_META: Record<VRGlassesModel, HeadsetMeta> = {
  'meta-quest-2':          { 
    label:'Meta Quest 2', 
    brand:'Meta', 
    type:'standalone', 
    sdk:'Meta OpenXR SDK', 
    color:'#1877f2', 
    icon:'🥽', 
    tier:'ENTRY', 
    imageUrl:'/media/MetaQuest2.jpg',
    controllers:'Touch Controllers',
    resolution:'1832 x 1920 por ojo',
    refreshRate:'72/90/120 Hz',
    fov:'~100°',
    tracking:'6DOF Inside-Out',
    displayTech:'LCD Fast-Switch',
    releaseYear:'2020',
    features:['Hand Tracking', 'Passthrough', 'Guardian System', 'Oculus Link']
  },
  'meta-quest-3':          { 
    label:'Meta Quest 3', 
    brand:'Meta', 
    type:'standalone', 
    sdk:'Meta OpenXR SDK', 
    color:'#1877f2', 
    icon:'🥽', 
    tier:'MID', 
    imageUrl:'/media/MetaQuest3.webp',
    controllers:'Touch Plus Controllers',
    resolution:'2064 x 2208 por ojo',
    refreshRate:'90/120 Hz',
    fov:'~110°',
    tracking:'6DOF Inside-Out + Eye/Face',
    displayTech:'LCD Pancake',
    releaseYear:'2023',
    features:['Full Color Passthrough', 'MR Experiences', 'Hand Tracking 2.0', 'Direct Touch']
  },
  'meta-quest-3s':         { 
    label:'Meta Quest 3S', 
    brand:'Meta', 
    type:'standalone', 
    sdk:'Meta OpenXR SDK', 
    color:'#1877f2', 
    icon:'🥽', 
    tier:'ENTRY', 
    imageUrl:'/media/MetaQuest3S.jpe',
    controllers:'Touch Plus Controllers',
    resolution:'1832 x 1920 por ojo',
    refreshRate:'90/120 Hz',
    fov:'~100°',
    tracking:'6DOF Inside-Out',
    displayTech:'LCD Fast-Switch',
    releaseYear:'2024',
    features:['Color Passthrough', 'Guardian System', 'Hand Tracking', 'Mixed Reality']
  },
  'meta-quest-pro':        { 
    label:'Meta Quest Pro', 
    brand:'Meta', 
    type:'standalone', 
    sdk:'Meta OpenXR SDK', 
    color:'#1877f2', 
    icon:'🥽', 
    tier:'PRO', 
    imageUrl:'/media/MetaQuestPro.jpg',
    controllers:'Touch Pro Controllers',
    resolution:'1800 x 1920 por ojo',
    refreshRate:'90/120 Hz',
    fov:'~106°',
    tracking:'6DOF Inside-Out + Eye/Face/Body',
    displayTech:'Mini-LED LCD Pancake',
    releaseYear:'2022',
    features:['Full Color Passthrough', 'Eye Tracking', 'Face Tracking', 'Mixed Reality', 'Infinite Display']
  },
  'apple-vision-pro':      { 
    label:'Apple Vision Pro', 
    brand:'Apple', 
    type:'standalone', 
    sdk:'Unity PolySpatial', 
    color:'#dfe3e8', 
    icon:'🍎', 
    tier:'ELITE', 
    imageUrl:'/media/AppleVisionPro.jpg',
    controllers:'Gaze + Pinch + Voice',
    resolution:'23 millones de pixeles',
    refreshRate:'90/120 Hz',
    fov:'~120°',
    tracking:'6DOF Inside-Out + Eye/Hand',
    displayTech:'Micro-OLED',
    releaseYear:'2024',
    features:['EyeSight', 'Spatial Video', 'Environments', 'Hand Tracking', 'Gaze Interaction']
  },
  'playstation-vr2':       { 
    label:'PlayStation VR2', 
    brand:'Sony', 
    type:'console', 
    sdk:'PSVR2 OpenXR Plugin', 
    color:'#2c6fd1', 
    icon:'🎮', 
    tier:'PRO', 
    imageUrl:'/media/PSVR2.jpe',
    controllers:'Sense Controllers',
    resolution:'2000 x 2040 por ojo',
    refreshRate:'90/120 Hz',
    fov:'~110°',
    tracking:'6DOF Inside-Out + Eye',
    displayTech:'OLED',
    releaseYear:'2023',
    features:['Haptic Feedback', 'Adaptive Triggers', 'Eye Tracking', 'Tempest 3D Audio', 'HDR']
  },
  'valve-index':           { 
    label:'Valve Index', 
    brand:'Valve', 
    type:'pcvr', 
    sdk:'OpenVR XR Plugin', 
    color:'#9aa0a8', 
    icon:'🖥️', 
    tier:'PRO', 
    imageUrl:'/media/Valve.jpe',
    controllers:'Index Controllers',
    resolution:'1440 x 1600 por ojo',
    refreshRate:'80/120/144 Hz',
    fov:'~130°',
    tracking:'6DOF Outside-In',
    displayTech:'LCD RGB',
    releaseYear:'2019',
    features:['Off-Ear Audio', 'Finger Tracking', 'Knuckle Controllers', 'SteamVR Tracking 2.0']
  },
  'htc-vive-xr-elite':     { 
    label:'VIVE XR Elite', 
    brand:'HTC', 
    type:'standalone', 
    sdk:'VIVE OpenXR SDK', 
    color:'#e0435a', 
    icon:'🥽', 
    tier:'MID', 
    imageUrl:'/media/ViveXR.jpe',
    controllers:'XR Elite Controllers',
    resolution:'1920 x 1920 por ojo',
    refreshRate:'90 Hz',
    fov:'~100°',
    tracking:'6DOF Inside-Out + Color Passthrough',
    displayTech:'LCD',
    releaseYear:'2023',
    features:['Color Passthrough', 'Hand Tracking', 'Compact Design', 'SteamVR Support']
  },
  'htc-vive-focus-vision': { 
    label:'VIVE Focus Vision', 
    brand:'HTC', 
    type:'standalone', 
    sdk:'VIVE OpenXR SDK', 
    color:'#e0435a', 
    icon:'🥽', 
    tier:'PRO', 
    imageUrl:'/media/ViveXR.jpe',
    controllers:'Focus 3 Controllers',
    resolution:'2448 x 2448 por ojo',
    refreshRate:'90/120 Hz',
    fov:'~120°',
    tracking:'6DOF Inside-Out + Eye',
    displayTech:'LCD',
    releaseYear:'2024',
    features:['Auto-IPD', 'Eye Tracking', 'MR Passthrough', 'Wireless Streaming']
  },
  'htc-vive-pro-2':        { 
    label:'VIVE Pro 2', 
    brand:'HTC', 
    type:'pcvr', 
    sdk:'VIVE OpenXR SDK', 
    color:'#e0435a', 
    icon:'🖥️', 
    tier:'ELITE', 
    imageUrl:'/media/ViveXR.jpe',
    controllers:'VIVE Controllers',
    resolution:'2448 x 2448 por ojo',
    refreshRate:'90/120 Hz',
    fov:'~120°',
    tracking:'6DOF Outside-In/Inside-Out',
    displayTech:'LCD',
    releaseYear:'2021',
    features:['SteamVR Tracking 2.0', 'Eye Tracking', 'High Resolution', 'Dual Mode Tracking']
  },
  'pico-4':                { 
    label:'Pico 4', 
    brand:'ByteDance', 
    type:'standalone', 
    sdk:'Pico OpenXR SDK', 
    color:'#2dd4bf', 
    icon:'🥽', 
    tier:'MID',
    imageUrl:'/media/Pico4Ultra.jpg',
    controllers:'Pico 4 Controllers',
    resolution:'2160 x 2160 por ojo',
    refreshRate:'72/90/120 Hz',
    fov:'~105°',
    tracking:'6DOF Inside-Out',
    displayTech:'LCD Pancake',
    releaseYear:'2022',
    features:['Color Passthrough', 'Hand Tracking', '6DoF Controllerless', 'Pico Motion']
  },
  'pico-4-ultra':          { 
    label:'Pico 4 Ultra', 
    brand:'ByteDance', 
    type:'standalone', 
    sdk:'Pico OpenXR SDK', 
    color:'#2dd4bf', 
    icon:'🥽', 
    tier:'PRO', 
    imageUrl:'/media/Pico4Ultra.jpg',
    controllers:'Pico 4 Controllers',
    resolution:'2160 x 2160 por ojo',
    refreshRate:'90/120 Hz',
    fov:'~105°',
    tracking:'6DOF Inside-Out + Eye',
    displayTech:'LCD Pancake',
    releaseYear:'2024',
    features:['Eye Tracking', 'MR Passthrough', 'Hand Tracking', 'Wireless Streaming']
  },
  'samsung-galaxy-xr':     { 
    label:'Samsung Galaxy XR', 
    brand:'Samsung', 
    type:'standalone', 
    sdk:'Android XR OpenXR', 
    color:'#4d7cff', 
    icon:'🥽', 
    tier:'PRO',
    imageUrl:'',
    controllers:'Hand Tracking + Samsung Controllers',
    resolution:'~3000 PPD',
    refreshRate:'90/120 Hz',
    fov:'~110°',
    tracking:'6DOF Inside-Out + Eye/Hand',
    displayTech:'OLED Microdisplay',
    releaseYear:'2025',
    features:['Samsung XR OS', 'Galaxy Ecosystem', '5G Connectivity', 'Spatial Audio']
  },
  'hp-reverb-g2':          { 
    label:'HP Reverb G2', 
    brand:'HP', 
    type:'pcvr', 
    sdk:'Windows MR OpenXR', 
    color:'#38b6e8', 
    icon:'🖥️', 
    tier:'MID', 
    imageUrl:'/media/WindowsMixed.webp',
    controllers:'HP Reverb G2 Controllers',
    resolution:'2160 x 2160 por ojo',
    refreshRate:'90 Hz',
    fov:'~98°',
    tracking:'6DOF Inside-Out',
    displayTech:'LCD',
    releaseYear:'2020',
    features:['High Resolution', 'Lightweight Design', 'Windows Mixed Reality', 'Flip-up Visor']
  },
  'none':                  { 
    label:'Sin asignar', 
    brand:'—', 
    type:'standalone', 
    sdk:'—', 
    color:'#ff6b35', 
    icon:'❓', 
    tier:'ENTRY',
    controllers:'—',
    resolution:'—',
    refreshRate:'—',
    fov:'—',
    tracking:'—',
    displayTech:'—',
    releaseYear:'—',
    features:[]
  },
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