
# --------------------------------------------------
# Base image
# --------------------------------------------------
FROM node:22-bookworm-slim AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1


# --------------------------------------------------
# Dependencies
# --------------------------------------------------
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm ci


# --------------------------------------------------
# Build application
# --------------------------------------------------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Ensure public exists for the runtime copy.
RUN mkdir -p public

RUN npm run build


# --------------------------------------------------
# Production runtime
# --------------------------------------------------
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user.
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

# Copy the standalone application.
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/standalone ./

# Copy static assets.
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

# Copy public assets.
COPY --from=builder --chown=nextjs:nodejs \
    /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
