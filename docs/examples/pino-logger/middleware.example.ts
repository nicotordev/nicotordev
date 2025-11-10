/**
 * Ejemplo de uso de Pino Logger en Middleware (Edge Runtime)
 * Ubicación: src/middleware.ts
 */

import { log } from '@/lib/logger';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const startTime = Date.now();

  // En Edge Runtime, el logger usa JSON.stringify automáticamente
  const middlewareLogger = log.child({
    module: 'Middleware',
    path: request.nextUrl.pathname,
    method: request.method,
  });

  middlewareLogger.info('Request received');

  // Ejemplo: Logging de headers
  const userAgent = request.headers.get('user-agent');
  middlewareLogger.debug({ userAgent }, 'Request headers');

  // Ejemplo: Rate limiting logging
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  middlewareLogger.debug({ ip }, 'Client IP detected');

  // Ejemplo: Autenticación
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    middlewareLogger.warn('Missing authorization header');
  }

  const response = NextResponse.next();

  // Logging de tiempo de respuesta
  const duration = Date.now() - startTime;
  middlewareLogger.info({ duration }, 'Request completed');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
