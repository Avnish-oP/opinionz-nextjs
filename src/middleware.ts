import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.SECRET});
    const url = request.nextUrl;
    if (
      token &&
      (url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/signup") ||
        url.pathname.startsWith("/verify"))
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    if (!token && url.pathname.startsWith("/home")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

export const config = {
  matcher: [
    "/sign-in",
    "/signup",
    "/profile/:path*",
    "/home",
    "/home/:path*",
    "/",
    "/verify/:path*",
  ],
};
