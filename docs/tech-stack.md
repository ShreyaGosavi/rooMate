# Tech Stack

What RooMate is built with, and why each piece got picked. Full reasoning on *why microservices at all* is in [`architecture.md`](architecture.md) — this doc is just the individual tools.

## Frontend

| Technology | Used for |
|---|---|
| Next.js | Frontend framework |
| React | UI |
| Tailwind CSS | Styling |
| Vercel | Hosting/deploy |

Went with Next.js mainly because it's the React framework I was already most comfortable in, and it made deployment almost free — push to `main` and Vercel handles the rest. Tailwind because writing custom CSS for every component was slowing me down more than it was helping.

## Backend

| Technology | Used for |
|---|---|
| NestJS | All 8 microservices |
| Node.js / TypeScript | Runtime + language |
| Turborepo | Monorepo management |

NestJS over plain Express/Node was a deliberate switch partway through — the story behind that pivot is in [`motivation.md`](motivation.md). Once I actually needed real structure (modules, dependency injection, guards, decorators) instead of hand-rolling all of it in plain Node, NestJS just fit. Turborepo keeps all 8 services and the frontend in one repo without them stepping on each other's builds — shared code lives in one place instead of being copy-pasted across services.

## Databases

| Technology | Used by |
|---|---|
| PostgreSQL (AWS RDS) | Auth, Listing, Community |
| MongoDB (Atlas) | Chat, Notification |
| Prisma | ORM for the Postgres services |
| Mongoose | ODM for the Mongo services |

Postgres for anything relational and structured — users, listings, community memberships all have clear relationships worth enforcing at the schema level. MongoDB for Chat and Notification instead, because messages and notification feeds are high-write and don't really have a fixed shape worth forcing into tables. Prisma over writing raw SQL because it catches schema mistakes at compile time instead of at 2 AM in production.

## Cache & Messaging

| Technology | Used for |
|---|---|
| Redis (Upstash) | Auth service caching |
| Kafka (Confluent Cloud) | Cross-service events |

Kafka is the one piece of this stack I didn't know going in — I picked it up specifically because REST calls between every service would've re-coupled everything I was trying to decouple. Confluent Cloud over self-hosting Kafka because running and babysitting a Kafka cluster on a `t3.micro` was never going to happen.

## External services & APIs

| Technology | Used for |
|---|---|
| SendGrid | Transactional emails |
| AWS S3 | Listing image storage |
| Google Maps API | Location data for listings |
| Google Geocoding API | Address → coordinates |

Nothing exotic here — these are the kind of things you don't build yourself unless you have a very good reason to, and I didn't.

## Infra & DevOps

| Technology | Used for |
|---|---|
| Docker | Containerizing every service |
| Docker Compose | Running the full stack (local + prod) |
| AWS EC2 | Hosting the backend |
| AWS ECR | Container image registry |
| Nginx | Reverse proxy on EC2 |
| Cloudflare | DNS + proxy in front of the API |
| GitHub Actions | CI/CD |
| AWS CloudWatch | Centralized logging |

This layer changed the most as I actually deployed the thing — the EC2 instance couldn't build 8 Docker images locally without running out of memory, which is what pushed the ECR pipeline into existence. That whole story, and the other infra decisions that came from getting burned, is in [`deployment-experience.md`](deployment-experience.md).

## Auth

| Technology | Used for |
|---|---|
| JWT (access + refresh tokens) | Auth across all services |

Standard access + refresh token setup, verified at the Gateway level so individual services don't each need to re-implement auth logic.

---

*See also: [Motivation](motivation.md) · [Architecture](architecture.md) · [Deployment Experience](deployment-experience.md)*
