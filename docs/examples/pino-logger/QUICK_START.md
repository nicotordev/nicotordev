# 🚀 Pino Logger - Quick Start

## Instalación Verificada ✅

```bash
✓ pino@10.1.0
✓ pino-pretty@13.1.2
```

## Test Rápido

```bash
# Test del logger con pino-pretty
node docs/examples/pino-logger/test-logger.mjs
```

**Output esperado:**
```
[2025-11-10 03:07:26] INFO: Basic test message
    test: "basic"
[2025-11-10 03:07:26] DEBUG: Debug level message
...
```

## Uso Inmediato en Tu Código

### 1. Importar
```typescript
import { log } from '@/lib/logger';
```

### 2. Usar
```typescript
// Simple logging
log.info({ userId: 123 }, 'User action performed');

// Con contexto
const logger = log.child({ module: 'MyModule' });
logger.debug({ action: 'processing' }, 'Processing data');

// Errores
try {
  await someOperation();
} catch (error) {
  log.error({ error }, 'Operation failed');
}
```

## Variables de Entorno

Añade a tu `.env.local`:

```bash
# Nivel de logging (debug | info | warn | error)
LOG_LEVEL=info

# Entorno (development usa pino-pretty, production usa JSON)
NODE_ENV=development
```

## Verificar Funcionamiento

### 1. Type Check
```bash
bun run type-check
# ✓ No errors
```

### 2. Build
```bash
bun run build
# ✓ Compiled successfully
```

### 3. Dev Server
```bash
bun run dev
# Abre http://localhost:3090
# Los logs aparecerán en la terminal con formato pretty
```

## Ejemplos por Contexto

| Contexto | Archivo de Ejemplo |
|----------|-------------------|
| API Route | `api-route.example.ts` |
| Server Component | `server-component.example.tsx` |
| Client Component | `client-component.example.tsx` |
| Middleware (Edge) | `middleware.example.ts` |
| Server Action | `server-action.example.ts` |

## Migrar Código Existente

### Antes (console.log)
```typescript
console.log('User logged in:', userId);
console.error('Error:', error);
```

### Después (Pino)
```typescript
import { log } from '@/lib/logger';

log.info({ userId }, 'User logged in');
log.error({ error }, 'Error occurred');
```

## Beneficios Inmediatos

✅ **Logs estructurados** - Fácil búsqueda y filtrado
✅ **Contexto enriquecido** - Más información sin esfuerzo
✅ **Performance** - Uno de los loggers más rápidos
✅ **Compatible con agregadores** - Datadog, CloudWatch, etc.
✅ **Type-safe** - Funciona con TypeScript
✅ **Triple runtime** - Node, Browser, Edge

## Troubleshooting

### Problema: "Cannot find module 'pino'"
**Solución:**
```bash
bun install
```

### Problema: Logs no aparecen en desarrollo
**Solución:** Verifica que `LOG_LEVEL` en `.env.local` sea `debug` o `info`

### Problema: Error en Edge Runtime
**Solución:** El logger ya tiene fallback automático, verifica que no estés importando APIs de Node

## Próximos Pasos

1. ✅ **Test básico completado**
2. 🔄 Migrar `console.log` existentes a `log.info()`
3. 🔄 Añadir child loggers por módulo
4. 🔄 Configurar transporte para producción (opcional)
5. 🔄 Integrar con sistema de monitoreo (opcional)

## Recursos

- 📖 [Documentación Completa](../../PINO_LOGGER.md)
- 📝 [Resumen de Implementación](../../PINO_IMPLEMENTATION_SUMMARY.md)
- 💻 [Implementación del Logger](../../../src/lib/logger.ts)
- 🔧 [Configuración Next.js](../../../next.config.ts)

---

**¡Listo para usar!** 🎉
