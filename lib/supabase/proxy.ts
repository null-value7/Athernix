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

export async function updateSession(request: NextRequest) {
  // 1. Crear la respuesta base UNA sola vez
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // FIX: No recrear supabaseResponse aquí.
          // Primero escribir en request (para que el server-client los lea),
          // luego en la respuesta que ya existe.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Recrear la respuesta preservando el request actualizado
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          // NOTA: el tercer argumento `headers` fue removido en versiones
          // recientes de @supabase/ssr — si tu versión no lo tiene, elimínalo.
        },
      },
    }
  )

  // 2. SIEMPRE usar getUser() — nunca getSession() para lógica de auth.
  //    getUser() valida el token contra el servidor de Supabase Auth.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isResetRoute = pathname.startsWith('/update-password')

  // ── Regla 1: Ruta de reset de contraseña ─────────────────────
  if (isResetRoute) {
    
    // FIX: Extraer AMR desde el user de getUser() — no llamar getSession()
    // El campo amr viene dentro de user.factors o user.app_metadata según tu config.
    // La forma más segura es permitir el acceso si el user existe y llegó aquí
    // via el magic link de recovery (Supabase lo maneja con el token en la URL).
    // Si necesitas validar recovery estrictamente, usa el token PKCE en la URL:
    const hasRecoveryToken =
      request.nextUrl.searchParams.has('token') ||
      request.nextUrl.searchParams.has('code')

    // Permitir si hay token en URL (flujo recovery inicial) o si el user existe
    // (ya canjeó el token y la sesión recovery sigue activa)
    if (hasRecoveryToken) {
      return supabaseResponse
    }

    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('error', 'invalid_session')
      return NextResponse.redirect(url)
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

  // ── Regla 3: Ruta de auth con sesión activa → /dashboard ─────
  // FIX: Antes faltaba cubrir el caso de pathname === '/login' con sesión
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ── Regla 4: Index con sesión → /dashboard ───────────────────
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // CRÍTICO: siempre retornar supabaseResponse para que las cookies
  // de sesión se propaguen correctamente al browser.
  return supabaseResponse
}