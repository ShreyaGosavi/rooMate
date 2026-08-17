# Local Setup

How to get RooMate running on your own machine, end to end.

## Prerequisites

- Node.js 18+
- npm
- Docker + Docker Compose
- Git

## 1. Clone the repo

```bash
git clone https://github.com/ShreyaGosavi/rooMate.git
cd rooMate
```

## 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is needed because of some peer dependency conflicts across the monorepo's packages — a plain `npm install` will fail here.

## 3. Environment variables

The dev setup runs its own local Postgres, MongoDB, Redis, and Kafka in Docker — so most of the values (JWT secrets, DB URLs, Kafka broker) are already hardcoded with dev defaults in `docker-compose.dev.yml`. You don't need real credentials for any of that.

You *do* need real credentials for a few third-party services that don't have a local equivalent:

| Variable | Used by | Why you need it |
|---|---|---|
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION` / `AWS_S3_BUCKET` | Listing | Image uploads go to real S3 even in dev |
| `GOOGLE_MAPS_KEY` | Listing | Location/maps features |
| `SENDGRID_API_KEY` | Email | Sending real emails even in dev |

Create a `.env` file at the repo root with just these three sets of values. Everything else works out of the box.

## 4. Run the backend

```bash
docker compose -f docker-compose.dev.yml up -d
```

This spins up Postgres, MongoDB, Redis, Kafka (+ Zookeeper), and all 8 services.

Check everything's healthy:

```bash
docker compose -f docker-compose.dev.yml ps
```

> **Note:** only the Gateway's port (`3007`) is published to your host machine. The other 7 services aren't reachable directly at `localhost:<port>` in this setup — everything goes through the Gateway, same as production.

## 5. Run the frontend

```bash
cd apps/web
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## 6. Verify it's working

- Frontend: `http://localhost:3000`
- Gateway: `http://localhost:3007/api/health`
- Gateway Swagger docs: `http://localhost:3007/docs`

If a service isn't coming up, check its logs:

```bash
docker compose -f docker-compose.dev.yml logs -f <service-name>
```

Common first-run issue: Postgres needs a moment to initialize the three databases (`auth_db`, `listing_db`, `community_db`) via the init script before the services that depend on it can connect — if a service fails on first boot, give Postgres a few seconds and restart it.

---

*See also: [Architecture](architecture.md) · [Tech Stack](tech-stack.md) · [Deployment](deployment.md)*
