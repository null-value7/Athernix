import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// ── Rutas que REQUIEREN sesión activa ────────────────────────
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
]

// ── Rutas solo para usuarios NO autenticados ─────────────────
const AUTH_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
]

// ── Rutas públicas ────────────────────────────────────────────
const PUBLIC_ROUTES = [
  '/',
  '/auth/callback',
  '/auth/confirm',
]

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  const isAuthRoute  = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  const isResetRoute = pathname.startsWith('/update-password')

  // ── Regla 1: /update-password solo accesible via recovery ────
  // - Sin sesión            → /login
  // - Con sesión normal     → /dashboard
  // - Con sesión recovery   → pasa ✓ (vino del enlace del correo)
  if (isResetRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // El tipo Session de Supabase no expone amr directamente.
    // La forma segura es leer el JWT del access_token manualmente:
    // el payload contiene amr:[{ method: "recovery" }] cuando
    // el usuario llegó desde el enlace del correo.
    const { data: sessionData } = await supabase.auth.getSession()
    const accessToken = sessionData?.session?.access_token

    let isRecoverySession = false

    if (accessToken) {
      try {
        // Decodificar el payload del JWT (parte central en base64)
        const payload = JSON.parse(
          Buffer.from(accessToken.split('.')[1], 'base64').toString('utf-8')
        )
        const amr = payload?.amr as { method: string }[] | undefined
        isRecoverySession = amr?.some((m) => m.method === 'recovery') ?? false
      } catch {
        isRecoverySession = false
      }
    }

    if (!isRecoverySession) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
  }

  // ── Regla 2: Ruta protegida sin sesión → /login ──────────────
  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // ── Regla 3: Ruta de auth con sesión → /dashboard ────────────
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ── Regla 4: Index con sesión → /dashboard ───────────────────
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}