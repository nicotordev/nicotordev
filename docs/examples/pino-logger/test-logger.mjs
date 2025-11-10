/**
 * Test simple del logger de Pino
 * Ejecutar: node docs/examples/pino-logger/test-logger.mjs
 */

// Simulación del logger para ambiente Node.js
import pino from 'pino';

const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

console.log('🧪 Testing Pino Logger...\n');

// Test básico
logger.info({ test: 'basic', timestamp: new Date().toISOString() }, 'Basic test message');

// Test con diferentes niveles
logger.debug({ level: 'debug' }, 'Debug level message');
logger.info({ level: 'info' }, 'Info level message');
logger.warn({ level: 'warn' }, 'Warning level message');
logger.error({ level: 'error' }, 'Error level message');

// Test con child logger
const childLogger = logger.child({ module: 'TestModule', userId: 123 });
childLogger.info({ action: 'test' }, 'Child logger message');

// Test con contexto enriquecido
const apiLogger = logger.child({ module: 'API', service: 'UserService' });
apiLogger.info({ method: 'GET', path: '/api/users', duration: 45 }, 'API request completed');

console.log('\n✅ Logger test completed successfully!');
console.log('📝 Check the output above to see formatted logs\n');
