import pino from "pino";
import type { Logger, LoggerOptions, Level, Bindings } from "pino";
// Detectar entorno
const isBrowser = typeof window !== "undefined";
const isEdge = !isBrowser && process.env.NEXT_RUNTIME === "edge";

let log: pino.Logger;

if (isBrowser) {
  // En el navegador usamos console directamente
  const browserLogger: any = {
    debug: (...args: any[]) => console.debug(...args),
    info: (...args: any[]) => console.info(...args),
    warn: (...args: any[]) => console.warn(...args),
    error: (...args: any[]) => console.error(...args),
    child: () => browserLogger, // child devuelve el mismo logger (no hacemos binding real)
    level: "debug",
  };
  log = browserLogger;
} else if (isEdge) {
  // En Edge Runtime de Next.js solo podemos hacer console.log con JSON
  const edgeLogger: any = {
    debug: (obj: Bindings, msg?: string) =>
      console.log(JSON.stringify({ level: "debug", ...obj, message: msg })),
    info: (obj: Bindings, msg?: string) =>
      console.log(JSON.stringify({ level: "info", ...obj, message: msg })),
    warn: (obj: Bindings, msg?: string) =>
      console.warn(JSON.stringify({ level: "warn", ...obj, message: msg })),
    error: (obj: Bindings, msg?: string) =>
      console.error(JSON.stringify({ level: "error", ...obj, message: msg })),
    child: () => edgeLogger,
    level: "info",
  };
  log = edgeLogger;
} else {
  // Entorno Node.js normal (servidor Next.js, etc.)
  const options: LoggerOptions = {
    level: (process.env.LOG_LEVEL as Level) || "info",
    browser: {
      write: (o: any) => {
        console.log(JSON.stringify(o));
      },
    },
  };

  if (process.env.NODE_ENV !== "production") {
    options.transport = {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    };
  }

  const pinoLogger: Logger = pino(options);

  // En Node.js devolvemos el logger real de pino (ya está tipado)
  log = pinoLogger;
}

export { log };
