/**
 * Ejemplo de uso de Pino Logger en API Route (Node Runtime)
 * Ubicación sugerida: src/app/api/example/route.ts
 */

import { log } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestLogger = log.child({
    module: 'ExampleAPI',
    method: 'GET',
    path: request.nextUrl.pathname,
  });

  requestLogger.info('Processing GET request');

  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    requestLogger.debug({ userId }, 'Extracted query parameters');

    // Simular operación
    const data = { id: userId, name: 'Example User' };

    requestLogger.info({ userId, recordsFound: 1 }, 'Request completed successfully');

    return NextResponse.json(data);
  } catch (error) {
    requestLogger.error({ error }, 'Request failed');

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestLogger = log.child({
    module: 'ExampleAPI',
    method: 'POST',
  });

  requestLogger.info('Processing POST request');

  try {
    const body = await request.json();

    requestLogger.debug({ bodyKeys: Object.keys(body) }, 'Request body received');

    // Validación
    if (!body.email) {
      requestLogger.warn({ body }, 'Validation failed: missing email');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Simular guardado
    requestLogger.info({ email: body.email }, 'Data saved successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    requestLogger.error({ error }, 'Failed to process POST request');

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
