# ZAIPIO 🚀

**Multi-Platform E-commerce Seller Tool**

> Unifying label automation, stock sync, payment reconciliation, and profit visibility into one dashboard — for Amazon, Flipkart, Meesho & Shopify sellers.

---

## 🗂️ Project Structure

```
zaipio/
├── apps/
│   ├── web/          # Next.js — Seller Panel + Landing Page
│   ├── api/          # NestJS — Backend API + Job Queue
│   └── admin/        # Next.js — Internal Admin Panel
├── packages/
│   ├── shared/       # Shared TypeScript types, utils, constants
│   ├── ui/           # Shared UI component library
│   ├── database/     # Drizzle ORM schema + migrations + repos
│   └── config/       # Shared environment & app config
├── infra/
│   ├── docker/       # Dockerfiles per app
│   ├── nginx/        # Reverse proxy config
│   └── scripts/      # Deploy & maintenance scripts
└── docs/             # Architecture, API docs, onboarding
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + Tailwind CSS |
| Backend | NestJS (Node.js) |
| Database | PostgreSQL + Drizzle ORM |
| Queue/Cache | Redis + BullMQ |
| Auth | JWT (access + refresh tokens) |
| File Storage | Cloudflare R2 |
| Payments | Razorpay (subscriptions) |
| PDF Processing | pdf-lib + Tesseract OCR |
| Notifications | WhatsApp Business API + Telegram Bot |
| Package Manager | pnpm (monorepo) |
| Build System | Turborepo |

---

## ⚡ Quick Start

### Prerequisites
- Node.js >= 20
- pnpm >= 9
- PostgreSQL (local or Docker)
- Redis (local or Docker)

### 1. Clone & Install
```bash
git clone https://github.com/your-org/zaipio.git
cd zaipio
pnpm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Fill in your values in .env
```

### 3. Start local services (Docker)
```bash
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

### 4. Run database migrations
```bash
pnpm db:migrate
pnpm db:seed
```

### 5. Start all apps
```bash
pnpm dev
```

| App | URL |
|-----|-----|
| Seller Panel | http://localhost:3000 |
| API | http://localhost:4000 |
| Admin Panel | http://localhost:3001 |
| API Docs (Swagger) | http://localhost:4000/docs |

---

## 🗺️ Platform Integrations

| Platform | Auth Method | Status |
|----------|------------|--------|
| Shopify | OAuth 2.0 | 🔨 Building first |
| Amazon SP-API | OAuth 2.0 | ⏳ Pending approval |
| Flipkart | API Key | ⏳ Pending approval |
| Meesho | API Key + CSV fallback | 📋 Planned |

---

## 📦 Subscription Tiers

| Tier | Price | Key Features |
|------|-------|-------------|
| Free | ₹0 | 1 platform, 50 orders/mo, manual labels |
| Starter | ₹999/mo | Auto label download, basic sync, email alerts |
| Growth | ₹2,999/mo | All platforms, profit calc, WhatsApp alerts, returns tracker |
| Pro | ₹6,999+/mo | Multi-brand, team roles, ad tracker, API access |

---

## 📄 License
Private — All rights reserved © ZAIPIO
