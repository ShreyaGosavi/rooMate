FROM node:20-alpine AS builder
WORKDIR /app

# Copy entire monorepo - avoids all dependency resolution issues
COPY . .

# Install ALL root dependencies
RUN npm install --legacy-peer-deps

# Generate Prisma client
RUN cd apps/auth && DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate --generator client

# Build shared-types
RUN cd packages/shared-types && npm run build

# Build service
RUN cd apps/auth && npx tsc

# ── Production image ──────────────────────────────────────────
FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

# Copy compiled output and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder /app/packages/shared-types/package.json ./packages/shared-types/package.json
COPY --from=builder /app/apps/auth/dist ./apps/auth/dist
COPY --from=builder /app/apps/auth/package.json ./apps/auth/package.json
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

WORKDIR /app/apps/auth
CMD ["node", "dist/src/main.js"]
