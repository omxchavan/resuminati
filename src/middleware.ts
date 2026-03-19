export { default } from "next-auth/middleware";

export const config = {
  // Protect all routes except the ones listed in the matcher
  // This will redirect unauthenticated users to the sign-in page
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - auth (auth pages like signin)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder assets)
     */
    "/((?!api/auth|auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
