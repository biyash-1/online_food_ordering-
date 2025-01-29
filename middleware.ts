import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken'; // Install this library using npm or yarn

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("Token in middleware:", token);

  const pathname = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/food', '/home'];
  const isPublicPath = publicPaths.includes(pathname);

  // If the path is public, allow the request to proceed
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If no token is present, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/orderconfirmation/:path*','/cart', '/food/:path*', '/login', '/signup'], // Match routes for middleware
};
