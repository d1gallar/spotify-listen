import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Checks if the token exists
  const token = await getToken({ req, secret: process.env.NEXTAUTH_URL });

  // Allows request only if it is a next auth session or token exists
  const { pathname } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // protects all dashboard routes
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard","/artists","/songs","/liked","/profile","/stats","/albums","/queue"]
};
