import { auth } from "@/auth"
import { kv } from '@vercel/kv'
import { NextResponse } from "next/server"
import type { NextFetchEvent, NextRequest } from 'next/server'

const MAX_REQUESTS = 50

// Rate limiting middleware
async function ratelimit(req: NextRequest) {
  if (req.method === 'POST') {
    const realIp = req.headers.get('x-real-ip') || 'no-ip'
    const pipeline = kv.pipeline()
    pipeline.incr(`rate-limit:${realIp}`)
    pipeline.expire(`rate-limit:${realIp}`, 60 * 60 * 24)
    const [requests] = (await pipeline.exec()) as [number]

    if (process.env.NODE_ENV !== 'development' && requests > MAX_REQUESTS) {
      return new NextResponse('Too many requests', { status: 429 })
    }
  }
  return null
}

// Main middleware function
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Apply rate limiting only to specific paths
  if (req.nextUrl.pathname === '/' || 
      req.nextUrl.pathname.startsWith('/chat/') || 
      req.nextUrl.pathname.startsWith('/share/')) {
    const ratelimitResult = await ratelimit(req)
    if (ratelimitResult) return ratelimitResult
  }

  // Apply NextAuth to all paths
  const session = await auth()
  
  // If no session, redirect to login page (except for public paths)
  if (!session) {
    const isPublicPath = req.nextUrl.pathname === '/login' || 
                         req.nextUrl.pathname === '/register' ||
                         req.nextUrl.pathname.startsWith('/api/auth')
    
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

// This config applies the middleware to all routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}