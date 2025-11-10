# 📝 Ejemplos de Pino Logger

Esta carpeta contiene ejemplos de uso de Pino Logger en diferentes contextos de Next.js 16.

## 📂 Archivos de Ejemplo

| Archivo | Descripción | Runtime |
|---------|-------------|---------|
| `api-route.example.ts` | Uso en API Routes con GET y POST | Node.js |
| `server-component.example.tsx` | Uso en Server Components con async | Node.js |
| `client-component.example.tsx` | Uso en Client Components con hooks | Browser |
| `middleware.example.ts` | Uso en Middleware con Edge Runtime | Edge |
| `server-action.example.ts` | Uso en Server Actions | Node.js |

## 🚀 Cómo Usar Estos Ejemplos

### 1. API Route
```bash
# Copiar a:
cp docs/examples/pino-logger/api-route.example.ts src/app/api/example/route.ts

# Probar:
curl http://localhost:3090/api/example
curl -X POST http://localhost:3090/api/example -H "Content-Type: application/json" -d '{"email":"test@example.com"}'
```

### 2. Server Component
```bash
# Copiar a:
cp docs/examples/pino-logger/server-component.example.tsx src/app/dashboard/page.tsx

# Visitar:
# http://localhost:3090/dashboard
```

### 3. Client Component
```bash
# Copiar a:
cp docs/examples/pino-logger/client-component.example.tsx src/components/features/example-form.tsx

# Importar en cualquier página cliente
```

### 4. Middleware
```bash
# Copiar a:
cp docs/examples/pino-logger/middleware.example.ts src/middleware.ts

# Se ejecuta automáticamente en cada request
```

### 5. Server Action
```bash
# Copiar a:
cp docs/examples/pino-logger/server-action.example.ts src/app/actions/user-actions.ts

# Usar desde componentes cliente con useTransition o useFormState
```

## 🎯 Patrones Comunes

### Logger con Contexto
```typescript
const logger = log.child({ module: 'MyModule', userId: 123 });
logger.info('Action performed'); // Incluye automáticamente module y userId
```

### Logging de Errores
```typescript
try {
  await riskyOperation();
} catch (error) {
  logger.error({ error }, 'Operation failed');
  throw error;
}
```

### Logging de Request/Response
```typescript
logger.info({ path, method, userId }, 'Request received');
// ... proceso ...
logger.info({ path, duration }, 'Request completed');
```

## 📊 Output Esperado

### En Desarrollo (pino-pretty)
```
[2025-11-10 06:00:00] INFO: Request received
    module: "ExampleAPI"
    method: "GET"
    path: "/api/example"
```

### En Producción (JSON)
```json
{
  "level": 30,
  "time": 1699603200000,
  "module": "ExampleAPI",
  "method": "GET",
  "path": "/api/example",
  "msg": "Request received"
}
```

## 🔗 Referencias

- Ver documentación completa: [docs/PINO_LOGGER.md](../../PINO_LOGGER.md)
- Implementación principal: [src/lib/logger.ts](../../../src/lib/logger.ts)
- Configuración Next.js: [next.config.ts](../../../next.config.ts)
