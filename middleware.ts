export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/:path*",
    "/students/:path*",
    "/fees/:path*",
    "/results/:path*",
    "/attendance/:path*",
    "/inquiries/:path*",
    "/applications/:path*",
    "/print/:path*",
  ],
};
