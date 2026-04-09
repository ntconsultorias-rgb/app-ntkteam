import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  const isAdmin =
    hostname.startsWith("admin.") ||
    hostname === "admin.teamntk.site";

  // Já está em /admin, deixa passar
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Subdomínio admin → reescreve para /admin
  if (isAdmin) {
    return NextResponse.rewrite(
      new URL(`/admin${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
