import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { logSecurityEvent } from '@/lib/security'

const PROTECTED_ROUTES = [
  '/profile',
  '/settings',
  '/home',
  '/chatbot',
  '/development',
  '/headsets',
  '/mundi',
  '/missions',
  '/explore',
]

const AUTH_ROUTES = [
  '/login',
  '/register',
  '/forgotpassword',
  '/experience',
  '/discover',
  '/ather',
  '/vrtech',
  '/modulos',
]

// ── Admin Route
const ADMIN_ONLY_ROUTES = [
  '/dashboard',
]

// ── Teacher Route
const TEACHER_ONLY_ROUTE = [
  '/teacher',
]

// ── Student Route
const STUDENT_ONLY_ROUTE = [
  '/student',
]


const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Anti-CSRF para la API ────────────────────────────────────────
  // Las rutas /api/* usan cookies de sesión (SameSite=Lax ya mitiga, pero
  // añadimos defensa en profundidad): un request mutador con Origin
  // ajeno al host, o marcado como cross-site por el navegador, se rechaza.
  // Requests sin Origin ni cookies no pueden autenticarse de todos modos.
  if (pathname.startsWith('/api/') && MUTATING_METHODS.has(request.method)) {
    const origin = request.headers.get('origin')
    const fetchSite = request.headers.get('sec-fetch-site')
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')

    const foreignOrigin = (() => {
      if (!origin) return false
      try {
        return new URL(origin).host !== host
      } catch {
        return true // Origin malformado → tratar como ajeno
      }
    })()

    if (foreignOrigin || fetchSite === 'cross-site') {
      logSecurityEvent('csrf.blocked', { route: pathname, origin, fetchSite })
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

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
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  
  const isResetRoute = pathname.startsWith('/update-password')

  const isAdminRoute = ADMIN_ONLY_ROUTES.some(r => pathname.startsWith(r));
  const isTeacherRoute = TEACHER_ONLY_ROUTE.some(r => pathname.startsWith(r));
  const isStudentRoute = STUDENT_ONLY_ROUTE.some(r => pathname.startsWith(r));

  // Ruta de reset de contraseña 
  if (isResetRoute) {
    
    if (user) return supabaseResponse;

    const hasCode = request.nextUrl.searchParams.has('code');
    if (hasCode) return supabaseResponse;

    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('error', 'invalid_session');
    return NextResponse.redirect(url);
  }

  //Ruta protegida sin sesión → /login 
  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    const redirectRes = NextResponse.redirect(url)
    redirectRes.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    return redirectRes
  }

  //Admin 
  if (user && isAdminRoute) {
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

  if (!profile || profile.role !== 'admin') {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  // Es admin → dejar pasar normalmente
  return supabaseResponse;
  }

  //Teacher 
  if(user && isTeacherRoute){
    const { data: profile} = await supabase.from('profiles').select('role').eq('id', user.id).single();
    
    if (!profile || profile.role !== 'Teacher'){
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return supabaseResponse;
  }

  //Student
  if(user && isStudentRoute){
    const { data: profile} = await supabase.from('profiles').select('role').eq('id', user.id).single();
    
    if (!profile || profile.role !== 'Student'){
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return supabaseResponse;
  }

  // Ruta de auth con sesión activa → /dashboard 
  // FIX: Antes faltaba cubrir el caso de pathname === '/login' con sesión
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  // Index con sesión → /dashboard 
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  // Anti-caché para rutas protegidas: evita que el navegador muestre páginas tras cerrar sesión
  if (user && isProtected) {
    supabaseResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  }

  // siempre retornar supabaseResponse para que las cookies de sesión se propaguen correctamente al browser.
  return supabaseResponse
}