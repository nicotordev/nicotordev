# nicotordev.com: Guía de Arquitectura, Seguridad y Optimización (Cloudflare Free + VPS/Caddy)

> **Última actualización y validación:** 20 de noviembre de 2026  
> **Contexto:** Portafolio, blog, proyectos y captación de leads de `nicotordev.com` corriendo en Next.js 16 (`next-intl`, `output: "standalone"`), Directus 11 CMS + PostGIS 17 (`compose.yaml`), detrás de un **Caddy compartido** (`deploy/Caddyfile.nicotordev`, red `docker-projects-edge`) en VPS Linux compartida con otros proyectos, y **Cloudflare (Plan Free)**.  
> **Etiquetas:** Las notas marcadas con **(recomendación)** reflejan criterio arquitectónico; los límites, menús y comportamientos están verificados contra documentación oficial de Cloudflare (agosto–noviembre 2026).

---

## Objetivos Principales

1. **Máximo offload en el borde (POP Santiago `SCL`):** Aprovechar que la mayor parte de `nicotordev.com` es contenido público (home, `/about`, `/blog/*`, `/projects/*`, `/links`) y servir estáticos e imágenes de Directus desde Cloudflare.
2. **Proteger la superficie real de ataque:** Blindar `directus.nicotordev.com/admin`, el origen en la VPS compartida y las **Server Actions** públicas (`lead`, `newsletter`, `auth`) contra spam y fuerza bruta.
3. **Costo $0 adicional:** Aprovechar Cloudflare Free, R2 Free, Cloudflare Images Free (5.000 transformaciones/mes), Turnstile y Cloudflare Access (Zero Trust Free).
4. **Convivencia segura en VPS compartida:** Acotar consumo de RAM/CPU y rotación de logs para que un pico en `nicotordev.com` no afecte a otros proyectos (como `nicodigos.cl`) en el mismo host.

---

## 1. Mapa de Superficie de `nicotordev.com`

Según la configuración actual del repositorio:

- **Dominios en Caddy (`deploy/Caddyfile.nicotordev`):**
  - `www.nicotordev.com` → redirect permanente `301` a `https://nicotordev.com{uri}`.
  - `nicotordev.com` → `nicotordev-web:3000` (Next.js 16 + `next-intl`).
  - `directus.nicotordev.com` → `directus:8055` (Directus 11 CMS con `CACHE_ENABLED: "false"`).
- **Endpoints sensibles y mutaciones:**
  - **Next.js Server Actions** (`POST` a rutas públicas con cabecera `Next-Action`): `lead.actions.ts`, `newsletter.actions.ts`, `auth.actions.ts`, `locale.actions.ts`, `currency.actions.ts`, `timezone.actions.ts`.
  - **API Routes:** `/api/health`, `/api/web-vitals`.
  - **CMS:** `directus.nicotordev.com/admin*`, `/auth/*`, `/items/*`, `/assets/*`.
- **Diferencias clave frente a un marketplace:**
  - **No requiere** bucket R2 privado con URLs firmadas para descargas pagadas (el foco multimedia son imágenes de portada/blog/proyectos).
  - **No depende** de webhooks de pasarelas de pago chilenas (Flow/Webpay/MercadoPago), lo que permite activar **Bot Fight Mode** con mucho menor riesgo operativo.

---

## 2. Configuración en Cloudflare (Plan Free — Dashboard Nov 2026)

### 2.1 DNS y SSL/TLS

- **DNS:** Registros proxificados (nube naranja) para `nicotordev.com`, `www` y `directus` (y `assets` si migras media a R2). Activar **DNSSEC** en `DNS > Settings`.
- **SSL/TLS Encryption Mode (`SSL/TLS > Overview`):**
  - Seleccionar **Full (strict)** (o **Automatic SSL/TLS** si tu zona usa el modo automático).
  - *Importante:* `next.config.ts` ya emite `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, lo cual exige HTTPS válido en `nicotordev.com`, `www` y `directus.nicotordev.com`. Nunca usar modo `Flexible`.
- **Edge Certificates (`SSL/TLS > Edge Certificates`):**
  - **Always Use HTTPS:** Activado.
  - **Automatic HTTPS Rewrites:** Activado.
  - **Minimum TLS Version:** `TLS 1.2` (con **TLS 1.3** activo).
  - **Encrypted Client Hello (ECH):** Activado.
  - **Criptografía Post-Cuántica (PQC):** Activa por defecto en el borde y en Cloudflare Tunnel.

### 2.2 Protección del Origen y Caddy (`deploy/Caddyfile.nicotordev`)

#### Elección de conexión origen ↔ Cloudflare

- **Vía A: Cloudflare Tunnel (`cloudflared:2026.11.1`) hacia el Caddy compartido (recomendada):**
  - Permite cerrar los puertos 80 y 443 en la VPS y ocultar la IP pública.
  - Gestionado en **Networking > Tunnels**; pasar `TUNNEL_TOKEN` mediante `.env` (`chmod 600`), nunca con `--token` en `command:`.
  - **Authenticated Origin Pulls (AOP) no aplica** con Tunnel (es incompatible y no hace falta).
  - Si `cloudflared` conecta a Caddy por HTTP interno, desactivar el redirect HTTP→HTTPS de Caddy para evitar bucles; si conecta por HTTPS, configurar `Origin Server Name` en la ruta del túnel.
- **Vía B: Caddy directo en 80/443:**
  - Permitir solo los rangos de `https://www.cloudflare.com/ips` en la cadena **`DOCKER-USER`** (Docker se salta UFW/`INPUT`; usar `conntrack --ctorigdstport 443` o `ufw-docker`).
  - Activar **Authenticated Origin Pulls (mTLS, gratis)** en modo *Zone-level* con certificado propio y validar certificado cliente (`client_auth`) en Caddy.

#### IP real del cliente en Caddy (corrección necesaria)

Actualmente `deploy/Caddyfile.nicotordev` envía `header_up X-Forwarded-For {client_ip}` y `header_up X-Real-IP {client_ip}`. Detrás de Cloudflare, `{client_ip}` será la IP del POP de Cloudflare (o del contenedor `cloudflared`) a menos que Caddy confíe explícitamente en ese proxy.

En el **bloque global del Caddyfile compartido** de la VPS:

```caddyfile
{
	servers {
		# Vía A (Tunnel): CIDR de la red Docker `docker-projects-edge` (ej. 172.28.0.0/24)
		# Vía B (Directo): rangos IPv4/IPv6 de https://www.cloudflare.com/ips (o plugin caddy-cloudflare-ip)
		trusted_proxies static 172.28.0.0/24
		client_ip_headers CF-Connecting-IP X-Forwarded-For
	}
}
```

### 2.3 Caché y Rendimiento (POP `SCL` + Novedades 2026)

1. **Tiered Cache (`Caching > Tiered Cache` — Gratis):**
   - Activar **Smart Tiered Cache**. *(Novedad abr 2026: si la VPS está en AWS, GCP, Azure u Oracle Cloud, configura el Cloud Region Hint en `Origin Configuration`.)*

2. **Cache Rules (`Caching > Cache Rules` — 10 reglas gratis):**
   - El orden de prioridad evita que cookies de preferencias/sesión rompan el cacheo de estáticos e imágenes:

   | Prioridad | Nombre | Expresión | Acción |
   | :--- | :--- | :--- | :--- |
   | **1** | Estáticos Next.js e imágenes de Directus | `(http.request.uri.path starts_with "/_next/static/") or (http.host eq "directus.nicotordev.com" and http.request.uri.path starts_with "/assets/") or (http.request.uri.path.extension in {"css" "js" "woff2" "woff" "jpg" "jpeg" "png" "webp" "avif" "svg" "ico"})` | **Eligible for cache**<br>· Edge TTL: `1 month`<br>· Browser TTL: `Respect origin`<br>· **Cache Deception Armor:** Activado |
   | **2** | Bypass API, Directus Admin/Auth y Server Actions | `(http.request.uri.path starts_with "/api/") or (http.host eq "directus.nicotordev.com" and (http.request.uri.path starts_with "/admin" or http.request.uri.path starts_with "/auth" or http.request.uri.path starts_with "/items")) or (http.request.method ne "GET" and http.request.method ne "HEAD")` | **Bypass cache** |

   - *Nota sobre Directus:* Hoy `compose.yaml` tiene `CACHE_ENABLED: "false"` en `directus`. La Regla 1 sobre `directus.nicotordev.com/assets/*` descarga inmediatamente el tráfico de imágenes desde el POP `SCL` hacia la VPS.
   - *Nota sobre `next-intl`:* Usa **Vary en Cache Rules** (disponible en todos los planes desde jul 2026) con `normalize` si necesitas respetar `Accept-Language` sin fragmentar la caché, y **Cache Response Rules** (mar 2026, 10 reglas gratis) si necesitas limpiar headers `Set-Cookie` en respuestas públicas.

3. **Optimización de Protocolos y Contenido (`Speed > Settings` — Gratis):**
   - **Compresión:** **Zstandard (`zstd`)** ya es el default en el plan Free en 2026 (con fallback a **Brotli** y **Gzip**). Caddy ya comprime con `encode zstd gzip` hacia el origen.
   - **HTTP/3 (with QUIC):** Activado en `Protocol Optimization`.
   - **0-RTT Connection Resumption:** Activado (solo aplica a `GET`/`HEAD`/`OPTIONS`, nunca a `POST`/Server Actions; añade `Early-Data: 1`).
   - **Early Hints (103):** Activado en `Content Optimization`.
   - **Speed Brain (Speculation Rules API):** Activado por defecto en Free; acelera la navegación entre home, `/blog/*` y `/projects/*` sin tocar el origen (solo prefetch de contenido cacheado).
   - **Cloudflare Web Analytics:** Activado (gratis, sin cookies; complementa `/api/web-vitals` con RUM real).

4. **Imágenes y Media a $0 (Directus → R2 + Cloudflare Images Free):**
   - Actualmente las subidas de Directus viven en el volumen local `cms_uploads` y pasan por Next Image (`directus.nicotordev.com`).
   - **Evolución recomendada:** Configurar un **bucket R2 público** (Free tier: 10 GB-mes Standard, 1M Clase A, 10M Clase B, $0 egress) conectado a un Custom Domain (`assets.nicotordev.com`, nunca `r2.dev`) para los assets de Directus, y habilitar **Cloudflare Images Free** (**5.000 transformaciones únicas/mes gratis** con `format=auto,onerror=redirect`). Esto elimina CPU de `sharp`/Next Image y espacio en disco en la VPS.

### 2.4 Seguridad en Plan Free (`Security > Security rules`, Dashboard 2026)

| Capacidad | Límite Free (verificado oct–nov 2026) | Configuración recomendada para `nicotordev.com` |
| :--- | :--- | :--- |
| **Cloudflare Access (Zero Trust)** | Plan Free (hasta 50 usuarios) | **Prioridad #1:** Proteger `directus.nicotordev.com/admin` con OTP por email o GitHub. `web` puede seguir leyendo Directus por la red interna `http://directus:8055` sin pasar por Internet. |
| **Rate Limiting Rules** | **1 regla**, clave fija `IP`, periodo fijo **`10 s`**, acción **`Block`**, duración **`10 s`** | Proteger Server Actions (`POST` con `Next-Action`) y login de Directus:<br>`(http.request.method eq "POST" and any(http.request.headers["next-action"][*] ne "")) or (http.host eq "directus.nicotordev.com" and http.request.uri.path starts_with "/auth/login")`<br>Umbral: **5 req / 10 s**. |
| **Leaked Credentials Detection** | **Gratis** (`password_leaked`) | Activar en `Security > Settings` + Custom Rule (`Managed Challenge`) en `directus.nicotordev.com/auth/login` cuando `cf.waf.credential_check.password_leaked` sea verdadero. |
| **WAF Custom Rules** | **5 reglas** (sin Regex ni Log) | Reservar 1 para credenciales filtradas y otras para bloquear abuso obvio o rutas de escaneo (`/wp-login.php`, `/.env`, etc.). |
| **Free Managed Ruleset + DDoS** | Activos por defecto | Mantener activos. |
| **Bot Fight Mode** | On/Off (no admite `Skip` en Free) | **Viable activar** en `nicotordev.com` (no hay webhooks de pago). Verificar únicamente que tu monitor externo de `/api/health` o webhooks externos a Directus no sean desafiados. |
| **AI Bots** | Gratis | Activar `Block AI bots` / `Managed robots.txt` desde `Security > Settings` (no consumen cuota de las 5 Custom Rules; usar AI Crawl Control personalizado sí consume 1 regla). |
| **Turnstile** | **20 widgets**, challenges ilimitados | Ya tienes `next-turnstile` instalado. En la validación server-side (`siteverify`) exigir siempre `success === true`, `action` esperado y `hostname` exacto (`nicotordev.com`, sin `localhost` en prod), fallando cerrado en timeout. |

---

## 3. Hardening de `compose.yaml`, VPS y Backups

### 3.1 Qué ya está bien en `compose.yaml`

- Sin clave `version:` obsoleta.
- `restart: unless-stopped` y `security_opt: [no-new-privileges:true]` mediante `&common`.
- Rotación de logs configurada (`driver: local`, `max-size: 10m`, `max-file: 3`).
- `healthcheck` en `cms-db`, `directus` y `web`.
- **Ningún puerto publicado (`ports:`) al host** — completamente protegido frente al bypass de UFW por Docker.

### 3.2 Mejoras recomendadas en `compose.yaml`

1. **Aislar completamente la red de base de datos:** añadir `internal: true` en la red `private` para que `cms-db` no tenga salida a Internet.
2. **Acotar RAM y CPU (VPS compartida):** añadir `deploy.resources.limits` a cada servicio para evitar que un pico provoque OOM en la VPS compartida:
   - `web`: `memory: 512M`, `cpus: "1.0"`
   - `directus`: `memory: 384M`, `cpus: "0.5"`
   - `cms-db` (PostGIS 17): `memory: 384M`, `cpus: "0.5"` (y acotar `max_connections=50`).
3. **Fijar versión menor exacta de Directus:** cambiar `directus/directus:11` por una versión pinneada (`directus/directus:11.x.y`) para evitar migraciones automáticas no planeadas en producción.
4. **Capacidades mínimas:** evaluar `cap_drop: [ALL]` en `web` y `directus` (verificando permisos de escritura en `/directus/uploads`).
5. **Hardening base de la VPS** (compartido con el resto de proyectos): SSH solo llaves (`PermitRootLogin no`, `PasswordAuthentication no`), UFW default-deny, `fail2ban` (`sshd`) y `unattended-upgrades`.

### 3.3 Backups Automatizados a R2 (`nicotordev_cms` + `cms_uploads`)

Mientras las imágenes de Directus vivan en el volumen local `cms_uploads`, respalda **tanto la base PostGIS como los uploads** en un bucket R2 dedicado de backups (con *Lifecycle Rule* de expiración a 30 días):

```bash
#!/usr/bin/env bash
set -euo pipefail

DATE=$(date +%F)
DB_FILE="/backups/nicotordev-cms-${DATE}.dump"
UPLOADS_FILE="/backups/nicotordev-uploads-${DATE}.tar.gz"

# 1. Dump y validación de PostGIS
docker compose -p nicotordev exec -T cms-db \
  pg_dump -U nicotordev_cms -Fc nicotordev_cms > "$DB_FILE"
docker compose -p nicotordev exec -T cms-db \
  pg_restore -l < "$DB_FILE" >/dev/null

# 2. Respaldo de uploads locales de Directus (omitir si migras storage a R2)
docker run --rm -v nicotordev_cms_uploads:/data:ro -v /backups:/backup alpine \
  tar -czf "/backup/nicotordev-uploads-${DATE}.tar.gz" -C /data .

# 3. Subida a R2
aws s3 cp "$DB_FILE" "s3://${R2_BACKUPS_BUCKET}/nicotordev/postgres/" \
  --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
aws s3 cp "$UPLOADS_FILE" "s3://${R2_BACKUPS_BUCKET}/nicotordev/uploads/" \
  --endpoint-url "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

# 4. Limpieza local > 7 días
find /backups -name 'nicotordev-*' -mtime +7 -delete
```

> Respalda también (cifrados) `.env.docker`, `.env.cms-db`, `.env.directus` y `deploy/Caddyfile.nicotordev`, y realiza al menos **una prueba real de restauración**.

---

## 4. Plan de Ejecución por Fases

### Fase 1: Hoy (Quick Wins)
- [ ] Verificar **Full (strict)**, **Always Use HTTPS**, **TLS 1.2+**, **ECH** y **DNSSEC** (compatible con HSTS `includeSubDomains` de `next.config.ts`).
- [ ] Activar **Smart Tiered Cache**, **HTTP/3**, **0-RTT**, **Early Hints (103)**, **Speed Brain** y **Cloudflare Web Analytics**.
- [ ] Activar **Cloudflare Access (Zero Trust Free)** sobre `directus.nicotordev.com/admin`.
- [ ] Desplegar las **2 Cache Rules** (Prioridad 1 estáticos + `directus.nicotordev.com/assets/*`; Prioridad 2 bypass `/api/*`, Directus admin/auth/items y métodos no-GET/HEAD).
- [ ] Configurar backup nocturno de `nicotordev_cms` y `cms_uploads` a R2 + probar restore.

### Fase 2: Esta Semana (Blindaje y Limpieza)
- [ ] Configurar `trusted_proxies` y `client_ip_headers CF-Connecting-IP` en el Caddy compartido de la VPS.
- [ ] Crear la **Rate Limiting Rule** (`10 s`, `Block`, `IP`) para Server Actions (`Next-Action`) y `/auth/login` de Directus.
- [ ] Activar **Leaked Credentials Detection** + Custom Rule en login de Directus.
- [ ] Completar/verificar validación server-side estricta de **Turnstile** (`success`, `action`, `hostname`) en formularios de lead/newsletter.
- [ ] Activar **Bot Fight Mode** y verificar que `/api/health` y monitores externos sigan respondiendo `200 OK`.
- [ ] Actualizar `compose.yaml`: `internal: true` en red `private`, límites de RAM/CPU y tag pinneado de Directus (`11.x.y`).

### Fase 3: Optimización de Media (Opcional)
- [ ] Migrar storage de Directus a un **bucket R2 público** con Custom Domain (`assets.nicotordev.com`).
- [ ] Habilitar **Cloudflare Images Free** (5.000 transformaciones/mes) con `format=auto,onerror=redirect` para portadas de blog y proyectos.

---

## 5. Verificación Rápida

```bash
# 1. Caché de estáticos Next.js y compresión Zstd/Brotli en POP SCL
curl -sI --http3 -H "Accept-Encoding: zstd, br, gzip" \
  "https://nicotordev.com/_next/static/<archivo.js>" | \
  grep -iE "cf-cache-status|cf-ray|content-encoding|cache-control"

# 2. Caché de assets servidos por Directus
curl -sI "https://directus.nicotordev.com/assets/<asset-id>" | \
  grep -iE "cf-cache-status|cf-ray|content-type"
# Esperado: MISS en primera petición, HIT en la segunda

# 3. Verificar que Directus Admin pide Cloudflare Access (302 hacia cloudflareaccess.com)
curl -sI "https://directus.nicotordev.com/admin" | grep -iE "HTTP/|location"

# 4. Verificar que /api/health hace bypass y devuelve 200
curl -sI "https://nicotordev.com/api/health" | grep -iE "HTTP/|cf-cache-status"

# 5. Estado de contenedores y ausencia de puertos publicados al host
docker compose -p nicotordev ps
docker ps --format "table {{.Names}}\t{{.Ports}}"
```

---

## 6. Fuentes Oficiales Verificadas (Noviembre 2026)

- Cloudflare SSL/TLS Modes & ECH: https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/ y https://developers.cloudflare.com/ssl/edge-certificates/ech/
- Cloudflare Tunnel & `cloudflared` `2026.11.1`: https://developers.cloudflare.com/tunnel/ y https://github.com/cloudflare/cloudflared/releases/tag/2026.11.1
- Authenticated Origin Pulls (mTLS): https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/
- Tiered Cache, Cache Rules, Cache Response Rules y Vary:
  - https://developers.cloudflare.com/cache/how-to/tiered-cache/
  - https://developers.cloudflare.com/cache/how-to/cache-rules/
  - https://developers.cloudflare.com/cache/how-to/cache-response-rules/
  - https://developers.cloudflare.com/cache/concepts/vary/
- Compresión (Zstd default en Free), HTTP/3, 0-RTT, Early Hints y Speed Brain:
  - https://developers.cloudflare.com/speed/optimization/content/compression/
  - https://developers.cloudflare.com/speed/optimization/protocol/http3/
  - https://developers.cloudflare.com/speed/optimization/protocol/0-rtt-connection-resumption/
  - https://developers.cloudflare.com/cache/advanced-configuration/early-hints/
  - https://developers.cloudflare.com/speed/optimization/content/speed-brain/
- WAF Custom Rules, Rate Limiting, Bot Fight Mode, Leaked Credentials y AI Crawl Control:
  - https://developers.cloudflare.com/waf/custom-rules/
  - https://developers.cloudflare.com/waf/rate-limiting-rules/
  - https://developers.cloudflare.com/bots/get-started/bot-fight-mode/
  - https://developers.cloudflare.com/waf/detections/
  - https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-waf/
- Cloudflare Access (Zero Trust), Turnstile, R2 e Images Free:
  - https://developers.cloudflare.com/cloudflare-one/access-controls/
  - https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
  - https://developers.cloudflare.com/r2/pricing/
  - https://developers.cloudflare.com/images/pricing/
