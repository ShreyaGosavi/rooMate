FROM node:20-alpine AS builder
WORKDIR /app

# Copy entire monorepo - avoids all dependency resolution issues
COPY . .

# Install ALL root dependencies
RUN npm install --legacy-peer-deps

# Build shared-types
RUN cd packages/shared-types && npm run build

# Build service
RUN cd apps/notification && npx tsc

# ── Production image ──────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

# Copy compiled output and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder /app/packages/shared-types/package.json ./packages/shared-types/package.json
COPY --from=builder /app/apps/notification/dist ./apps/notification/dist
COPY --from=builder /app/apps/notification/package.json ./apps/notification/package.json

WORKDIR /app/apps/notification
CMD ["node", "dist/src/main.js"]
