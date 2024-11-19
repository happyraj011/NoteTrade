import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value || null

  const isPublicPath = ['/login', '/sign-up'].includes(path)

  // Redirect if the user is already logged in and trying to access public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // Redirect if the user is not logged in and trying to access protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // Allow the request to continue if no conditions are met
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/sign-up',
    '/book',
    '/notes',
    '/ownBook',
    '/ownNotes',
    '/NotesPage',
    '/bookPage',
    '/profile',
    '/addBook',
    '/addNotes',
    '/addToCart',
  ]
}
