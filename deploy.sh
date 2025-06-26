#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Zero-downtime deploy – nicotordev (Arch Linux)
# Adaptado para múltiples entornos (production | stage)
# Fecha: 2025-06-03
# ---------------------------------------------------------------------------
set -Eeuo pipefail

### ─────────────────────────── PARÁMETROS / CONFIG ─────────────────────────── ###
# Permite invocar el script con ENV=production o ENV=stage. Si no se especifica, asume production.
ENVIRONMENT="${ENV:-production}"

# Configuración por defecto para producción
if [[ "$ENVIRONMENT" == "production" ]]; then
  APP="nicotordev"
  USER="deploy"
  BASE="/home/${USER}/${APP}"
  BRANCH="main"
else
  # Configuración para staging
  APP="nicotordev-stage"
  USER="deploy"
  BASE="/home/${USER}/${APP}"
  BRANCH="stage"
fi

RELEASES="${BASE}/releases"
SHARED="${BASE}/shared"
CURRENT="${BASE}/current"

# Versión mínima de Node requerida
REQUIRED_NODE="22"
PARALLEL_BUILDS=5
KEEP_RELEASES=3

### ───────────────────────────── UTILIDADES ───────────────────────────── ###
log() { printf '[%(%H:%M:%S)T] %s\n' -1 "$*"; }
fail() {
  log "❌  $*"
  exit 1
}
cleanup() { [[ -n ${TMP_RELEASE:-} && -d $TMP_RELEASE ]] && rm -rf "$TMP_RELEASE"; }
trap cleanup ERR INT

need() { command -v "$1" &>/dev/null || fail "$1 no encontrado"; }

have_node() {
  local v
  v="$(node -v 2>/dev/null || true)"
  [[ $v =~ ^v([0-9]+) ]] && ((${BASH_REMATCH[1]} >= REQUIRED_NODE))
}

### ───────────────────────────── PRE-FLIGHT ───────────────────────────── ###
log "🌐 Iniciando despliegue (${ENVIRONMENT})"
log "🔧 Verificando Node ${REQUIRED_NODE}+…"

# Carga nvm si existe
if [[ -f $HOME/.nvm/nvm.sh ]]; then
  source "$HOME/.nvm/nvm.sh"
elif [[ -f /usr/share/nvm/init-nvm.sh ]]; then
  source /usr/share/nvm/init-nvm.sh
fi

if command -v nvm &>/dev/null; then
  nvm use "$REQUIRED_NODE" --silent || nvm install "$REQUIRED_NODE"
elif ! have_node; then
  fail "Node ${REQUIRED_NODE}+ no encontrado; instala con pacman o nvm."
fi

# Verifica bun, pm2, rsync, git
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
need bun
need pm2
need rsync
need git

### ───────────────────────── PREPARAR DIRECTORIOS Y NUEVO RELEASE ───────────────────── ###
mkdir -p "$RELEASES" "$SHARED/uploads"

TS="$(date +%Y%m%d%H%M%S)"
TMP_RELEASE="$(mktemp -d -p "$RELEASES" "${TS}-XXXX")"
log "📂 Nuevo release temporario: $TMP_RELEASE"

### ───────────────────────── SINCRONIZAR REPO ─────────────────────────── ###
# Si no existe /repo, clona; si existe, hace fetch/reset
if [[ ! -d ${BASE}/repo ]]; then
  log "📥 Clonando repo (${BRANCH})…"
  git clone -b "$BRANCH" git@github.com:nicotordev/nicotordev.git "${BASE}/repo"
else
  log "🔄 Actualizando repo local (${BRANCH})"
  (
    cd "${BASE}/repo"
    git fetch -q origin "$BRANCH"
    git reset --hard "origin/$BRANCH"
  )
fi

# Copia al folder del release
rsync -a --delete --exclude='.git' --exclude='node_modules' \
  "${BASE}/repo/" "$TMP_RELEASE/"

cd "$TMP_RELEASE"

### ────────────────────── VINCULACIÓN DE .env Y UPLOADS ────────────────────── ###
# Enlaza el .env correspondiente y la carpeta de subidas
if [[ "$ENVIRONMENT" == "production" ]]; then
  ln -sf "${SHARED}/.env.production" .env
else
  ln -sf "${SHARED}/.env.stage" .env
fi

# Subidas compartidas
ln -snf "${SHARED}/uploads" public/uploads

### ───────────────────────────── DEPENDENCIAS ───────────────────────────── ###
log "📦 bun install (frozen) — entorno: ${ENVIRONMENT}"
if ! bun install --frozen-lockfile --jobs "$PARALLEL_BUILDS"; then
  log "⚠️  Lockfile fuera de sync; regenerando…"
  bun install --jobs "$PARALLEL_BUILDS"
fi

### ────────────────────────── PRISMA & BUILD ──────────────────────────── ###
log "🛠️  Prisma generate + migrate deploy"
bunx prisma generate
bunx prisma migrate deploy

log "🏗️  Construyendo Next.js"
export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=6144"
bun run build || fail "❌ Next build falló"

### ─────────────────── ACTIVACIÓN ATÓMICA (zero-downtime) ─────────────────── ###
log "🪄 Swap symlink (.next + current) — entorno: ${ENVIRONMENT}"
# Renombra .next y crea enlace compartido
mv "${TMP_RELEASE}/.next" "${SHARED}/.next-${TS}"
ln -sfn "${SHARED}/.next-${TS}" "${TMP_RELEASE}/.next"

# Actualiza el enlace “current”
ln -snf "$TMP_RELEASE" "${BASE}/next_release"
mv -T "${BASE}/next_release" "${CURRENT}"

### ───────────── RELOAD DE PM2 ───────────── ###
# Elegimos dinámicamente el archivo de PM2 según el entorno
if [[ "$ENVIRONMENT" == "production" ]]; then
  ECOSYSTEM_FILE="ecosystem.config.js"
  APP_NAME="nicotordev"
else
  ECOSYSTEM_FILE="ecosystem.stage.config.js"
  APP_NAME="nicotordev-stage"
fi

log "🚀 Recargando PM2 con ${ECOSYSTEM_FILE} (app: ${APP_NAME})"
# Asegurarnos de que PM2 busque el archivo en la carpeta 'current', donde está el repo actualizado
cd "${CURRENT}"

# Recarga solo la app correspondiente (--only)
pm2 reload "${ECOSYSTEM_FILE}" --env "${ENVIRONMENT}" --only "${APP_NAME}" --update-env
pm2 save

### ──────────────── LIMPIEZA DE RELEASES ANTIGUOS ──────────────── ###
log "🧹 Limpiando releases viejos (mantener ${KEEP_RELEASES})"
(
  cd "$RELEASES"
  ls -1dt */ | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf
) &

log "✅ Despliegue ${ENVIRONMENT} completado sin downtime 🚀"
