# Stage 1: build with Node (full compatibility for Next.js/Turbopack)
FROM node:22-alpine AS builder

WORKDIR /app

# Build-time envs (Railway/GitHub Actions pass via --build-arg)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Install Bun for dependency install, keep Node for build compatibility
RUN npm install -g bun

# Install deps using bun.lock for reproducible builds
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build (standalone output is configured in next.config.ts)
COPY . .
# Use Node (npm) to run the build to avoid Bun runtime gaps during Next.js build
RUN npm run build

# Stage 2: minimal runtime image using Bun
FROM oven/bun:1.1.29-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user for security (BusyBox adduser syntax)
RUN adduser -S -D nextjs

# Copy the standalone server plus public assets and static files
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Next.js standalone server entrypoint
CMD ["bun", "server.js"]
