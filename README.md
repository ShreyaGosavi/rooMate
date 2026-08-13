# RooMate
**Find your place. Feel at home.**

RooMate is a full-stack platform that helps students and young professionals find PGs, hostels, and roommates — replacing scattered WhatsApp groups and broker fees with verified listings, a trusted community, and real-time chat.

🔗 **Live:** [roomate.site](https://roomate.site)

---

## At a Glance

- 8 independent microservices
- 95 REST endpoints
- 137 Jest tests
- Event-driven architecture (Kafka) with polyglot persistence (PostgreSQL + MongoDB)
- Deployed on AWS EC2 with a full CI/CD pipeline via GitHub Actions

---

## Documentation

| Doc | What it covers |
|---|---|
| [Motivation](docs/motivation.md) | Why this problem, why now, why me |
| [Architecture](docs/architecture.md) | System design & reasoning |
| [Tech Stack](docs/tech-stack.md) | Every technology used & why |
| [ER Diagram](docs/er-diagram.md) | Cross-service data model |
| [API Documentation](docs/api-documentation.md) | Consolidated API reference |
| [Deployment](docs/deployment.md) | Infra setup & environments |
| [Deployment Experience](docs/deployment-experience.md) | Real bugs hit shipping to production, and how each was fixed |
| [Security Considerations](docs/security.md) | Auth flow, JWT strategy, gateway-level guards |
| [Local Setup](docs/local-setup.md) | Running the whole stack locally |
| [Design](docs/design.md) | Branding, colour palette, typography |
| [Future Scope](docs/future-scope.md) | What's next |

### Per-Service Docs

| Service | Docs |
|---|---|
| Gateway | [→](docs/services/gateway.md) |
| Auth | [→](docs/services/auth.md) |
| Listing | [→](docs/services/listing.md) |
| Community | [→](docs/services/community.md) |
| Admin | [→](docs/services/admin.md) |
| Chat | [→](docs/services/chat.md) |
| Notification | [→](docs/services/notification.md) |
| Email | [→](docs/services/email.md) |

Each service doc includes: responsibilities, ER diagram (where applicable), Swagger link, testing strategy, and screenshots.

---

## Quick Start

```bash
git clone https://github.com/ShreyaGosavi/rooMate.git
cd rooMate
npm install --legacy-peer-deps
cp .env.example .env
docker compose up -d
```

Full walkthrough: [docs/local-setup.md](docs/local-setup.md)

---

## Author

**Shreya Gosavi**
[GitHub](https://github.com/ShreyaGosavi) · [LinkedIn](#) · [roomate.site](https://roomate.site)
