// the middleware will be re-enabled once Supabase is properly configured

export async function proxy(request: any) {
  // Temporarily disabled - causing @supabase/ssr import errors
  return undefined
}

export const config = {
  matcher: [],
}
