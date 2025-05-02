import { clerkMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - api/webhooks/clerk (webhook endpoint)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     * - static file extensions (.css, .js, .png, etc.)
     */
    "/((?!_next|api/webhooks/clerk|static|favicon\\.ico|public|.*\\.(?:css|js|jsx|ts|tsx|json|xml|ico|png|jpg|jpeg|gif|svg|ttf|woff|woff2)).*)",
    // Optional: Include specific API routes that should be protected
    "/(api(?!/webhooks/clerk))(.*)",
    "/trpc/(.*)",
  ],
};
