import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTHENTICATION_COOKIE_NAME!;

export function middleware(request: NextRequest, response: NextResponse) {
  if (request.url.includes("/auth")) {
    if (request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/dashboard/clients", request.url));
    }
  }

  if (request.url.includes("/") && !request.url.includes("/auth")) {
    if (!request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
