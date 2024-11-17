import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value || ''

  const isPublicPath = ['/login', '/sign-up'].includes(path)

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
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
    '/addToCart'
  ]
}
