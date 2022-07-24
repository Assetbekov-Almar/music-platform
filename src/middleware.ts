import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET })
	const { pathname, origin } = req.nextUrl
	const PUBLIC_FILE = /\.(.*)$/

	if (
		pathname.includes('favicon.ico') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/static') ||
		pathname.includes('.') ||
		PUBLIC_FILE.test(pathname)
	)
		return NextResponse.next()

	if (!token && pathname !== '/auth') {
		return NextResponse.redirect(`${origin}/auth`)
	}

	if (token && pathname === '/auth') {
		return NextResponse.redirect(`${origin}`)
	}

	return NextResponse.next()
}
