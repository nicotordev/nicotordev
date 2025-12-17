# Stage 1: build with Node (full compatibility for Next.js/Turbopack)
# Use AWS ECR public mirror to avoid Docker Hub auth outages during CI builds
FROM public.ecr.aws/docker/library/node:22-alpine AS builder

WORKDIR /app

# Build-time envs (Railway/GitHub Actions pass via --build-arg)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Install Bun (avoid npm registry / extra failure points)
RUN apk add --no-cache curl bash \
  && curl -fsSL https://bun.sh/install | bash \
  && ln -s /root/.bun/bin/bun /usr/local/bin/bun

# Install deps using bun lockfile(s) for reproducible builds
COPY package.json bun.lockb* bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source and build (standalone output is configured in next.config.ts)
COPY . .
RUN npm run build

# Stage 2: minimal runtime image using Node (Next.js standalone expects Node)
FROM public.ecr.aws/docker/library/node:22-alpine AS runner

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
CMD ["node", "server.js"]
