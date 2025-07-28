import { clerkMiddleware } from '@clerk/nextjs/server';
/**
 * Esta configuración hará que:
 * - El middleware de Clerk se ejecute en todas las rutas de tu aplicación
 * - Se excluyan los archivos estáticos y las rutas internas de Next.js
 * - Se aplique a todas las rutas de API (/api/**) y rutas de tRPC (/trpc/**)
 */

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
