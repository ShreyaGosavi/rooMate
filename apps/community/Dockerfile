FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build 2>/dev/null || npx tsc 2>/dev/null || true
CMD ["node", "dist/main.js"]
