# Pino Logger - Guía de Implementación

## 📚 Descripción

Sistema de logging estructurado con Pino para Next.js 16, compatible con:
- ✅ **SSR (Node.js runtime)** - Logging completo con Pino
- ✅ **Cliente (Browser)** - Fallback a console con interfaz compatible
- ✅ **Edge Runtime** - Logging JSON estructurado sin APIs de Node

## 🚀 Instalación

Ya está instalado en el proyecto:
```bash
bun add pino
bun add -d pino-pretty
```

## 📁 Estructura

```
src/
└── lib/
    └── logger.ts        # Módulo principal de logging
```

## 🔧 Configuración

### next.config.ts
```typescript
serverExternalPackages: ['pino', 'pino-pretty']
```

### Variables de entorno (.env.local)
```bash
# Nivel de logging (debug, info, warn, error)
LOG_LEVEL=info

# En producción, NODE_ENV=production desactiva pino-pretty
NODE_ENV=development
```

## 📖 Uso

### En API Routes (Node Runtime)
```typescript
import { log } from '@/lib/logger';

export async function GET(request: Request) {
  log.info({ path: request.url }, 'Incoming API request');
  
  try {
    const data = await fetchData();
    log.debug({ data }, 'Data fetched successfully');
    return Response.json(data);
  } catch (error) {
    log.error({ error }, 'Failed to fetch data');
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### En Server Components
```typescript
import { log } from '@/lib/logger';

export default async function HomePage() {
  log.info({ component: 'HomePage' }, 'Rendering home page');
  
  const data = await getData();
  log.debug({ recordCount: data.length }, 'Data loaded');
  
  return <div>{/* ... */}</div>;
}
```

### En Client Components
```typescript
'use client';

import { log } from '@/lib/logger';
import { useEffect } from 'react';

export default function ClientComponent() {
  useEffect(() => {
    log.info({ component: 'ClientComponent' }, 'Component mounted');
    
    // En browser, esto usa console.info
    log.debug({ state: 'active' }, 'Component state changed');
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

### En Middleware (Edge Runtime)
```typescript
import { log } from '@/lib/logger';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  log.info({ 
    method: request.method, 
    path: request.nextUrl.pathname 
  }, 'Edge middleware hit');
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

### En Server Actions
```typescript
'use server';

import { log } from '@/lib/logger';

export async function submitForm(formData: FormData) {
  const email = formData.get('email');
  
  log.info({ email }, 'Processing form submission');
  
  try {
    await saveToDatabase(email);
    log.info({ email }, 'Form submitted successfully');
    return { success: true };
  } catch (error) {
    log.error({ email, error }, 'Form submission failed');
    return { success: false, error: 'Failed to submit' };
  }
}
```

### Child Loggers (Contexto)
```typescript
import { log } from '@/lib/logger';

// Crear logger con contexto específico
const userLogger = log.child({ module: 'UserService', userId: 123 });

userLogger.info('User logged in');  
// Output: { module: 'UserService', userId: 123, message: 'User logged in' }

userLogger.debug({ action: 'profile_update' }, 'Profile updated');
// Output: { module: 'UserService', userId: 123, action: 'profile_update', message: 'Profile updated' }
```

## 🎯 Niveles de Log

```typescript
log.debug({ detail: 'value' }, 'Debug information');  // Desarrollo
log.info({ user: 'john' }, 'Informational message');  // General
log.warn({ resource: 'X' }, 'Warning message');        // Advertencias
log.error({ error }, 'Error occurred');                // Errores
```

## 🔍 Formato de Output

### Desarrollo (con pino-pretty)
```
[2025-11-10 06:00:00] INFO: Incoming request
    path: "/api/users"
    method: "GET"
```

### Producción (JSON estructurado)
```json
{
  "level": 30,
  "time": 1699603200000,
  "msg": "Incoming request",
  "path": "/api/users",
  "method": "GET"
}
```

## ⚠️ Consideraciones

### Edge Runtime
- No usar APIs de Node.js (fs, crypto, etc.) en edge
- El logger usa JSON.stringify para compatibilidad
- No disponible pino-pretty en edge

### Producción
- pino-pretty se desactiva automáticamente
- Logs en formato JSON para agregadores (Datadog, CloudWatch, etc.)
- Configurar LOG_LEVEL según necesidades

### Performance
- Pino es uno de los loggers más rápidos para Node.js
- En cliente usa console nativo (sin overhead)
- En edge, JSON.stringify mínimo

## 🔗 Integración con Sistemas Externos

### Datadog / CloudWatch
```typescript
// En producción, los logs JSON se envían automáticamente
// Configurar transporte si es necesario:
const logger = pino({
  transport: process.env.NODE_ENV === 'production' ? {
    target: 'pino-datadog',
    options: {
      apiKey: process.env.DATADOG_API_KEY,
    }
  } : undefined
});
```

### Sentry (Errores)
```typescript
import * as Sentry from '@sentry/nextjs';
import { log } from '@/lib/logger';

try {
  await riskyOperation();
} catch (error) {
  log.error({ error }, 'Operation failed');
  Sentry.captureException(error);
  throw error;
}
```

## 📝 Best Practices

1. **Siempre incluir contexto relevante**
   ```typescript
   // ❌ Malo
   log.info('User updated');
   
   // ✅ Bueno
   log.info({ userId, fields: ['email', 'name'] }, 'User updated');
   ```

2. **Usar child loggers para módulos**
   ```typescript
   const authLogger = log.child({ module: 'Auth' });
   const dbLogger = log.child({ module: 'Database' });
   ```

3. **No loguear información sensible**
   ```typescript
   // ❌ Malo
   log.info({ password: user.password }, 'Login attempt');
   
   // ✅ Bueno
   log.info({ userId: user.id }, 'Login attempt');
   ```

4. **Niveles apropiados**
   - `debug`: Información detallada para debugging
   - `info`: Eventos normales de la aplicación
   - `warn`: Situaciones inusuales pero manejables
   - `error`: Errores que requieren atención

## 🧪 Testing

```typescript
import { log } from '@/lib/logger';

// En tests, el logger funciona normalmente
describe('My Feature', () => {
  it('should log correctly', () => {
    const spy = jest.spyOn(console, 'info');
    log.info({ test: true }, 'Test message');
    expect(spy).toHaveBeenCalled();
  });
});
```

## 📚 Referencias

- [Pino Documentation](https://getpino.io/)
- [Next.js Edge Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
- [Structured Logging Best Practices](https://blog.arcjet.com/structured-logging-in-json-for-next-js/)
