import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log("token is",token)
  const { pathname } = request.nextUrl;
  
  // Define public routes (accessible without token)
  const publicRoutes = ["/login", "/signup", "/", "/items"];
  // Define auth routes (login/signup - shouldn't be accessible when logged in)
  const authRoutes = ["/login", "/signup"];
  
  // Redirect to login if accessing protected route without token
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Redirect to home if accessing auth route with valid token
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/orderconfirmation/:path*",
    "/login",
    "/signup",
    "/home",
    "/items",
    "/checkout",
    "/cart"
  ],
};