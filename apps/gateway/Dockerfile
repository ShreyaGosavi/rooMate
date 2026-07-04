FROM node:20-alpine AS builder
WORKDIR /app

# Copy entire monorepo - avoids all dependency resolution issues
COPY . .

# Install ALL root dependencies
RUN npm install --legacy-peer-deps

# Build shared-types
RUN cd packages/shared-types && npm run build

# Build service
RUN cd apps/gateway && npx tsc

# ── Production image ──────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

# Copy compiled output and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder /app/packages/shared-types/package.json ./packages/shared-types/package.json
COPY --from=builder /app/apps/gateway/dist ./apps/gateway/dist
COPY --from=builder /app/apps/gateway/package.json ./apps/gateway/package.json

WORKDIR /app/apps/gateway
CMD ["node", "dist/src/main.js"]
