import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log("token is",token);
  
  const publicPaths = ["/login", "/signup", "/", "/items"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",        // Protects /cart and all its subpages
    "/orderconfirmation/:path*", // Protects /orderhistory and all its subpages (like /orderhistory/orderconfirmation)
    "/login",
    "/signup",
    "/home",
    "/items",
  ],
};
