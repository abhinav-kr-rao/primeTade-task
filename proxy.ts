import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// Paths that require authentication
const protectedPaths = ['/dashboard', '/api/tasks'];
// Paths restricted to ADMIN role
const adminPaths = ['/api/admin'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if path is protected
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
    const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));

    if (isProtected || isAdminPath) {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            // If valid API request, return 401
            if (pathname.startsWith('/api')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            // Otherwise redirect to login
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const payload = verifyToken(token);

        if (!payload) {
            if (pathname.startsWith('/api')) {
                return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Role-based access control
        if (isAdminPath && payload.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden: Admin access only' }, { status: 403 });
        }

        // Attach user info to headers for downstream access if needed
        // Note: Next.js Middleware runs before the Request is processed by the route handler.
        // modifying headers is a legitimate way to pass data.
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.userId);
        requestHeaders.set('x-user-role', payload.role);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/tasks/:path*',
        '/api/admin/:path*',
    ],
};
