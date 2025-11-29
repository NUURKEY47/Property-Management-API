# RealApi - Real Estate Management Backend

## Description
A full-featured backend API for real estate management, built with Express.js, Prisma (PostgreSQL), JWT authentication, role-based access (Admin, Landlord, Tenant), Zod validation, and global error handling. Features user management, property/unit CRUD with ownership checks, and relationships for secure data isolation. Ideal for broker-style apps where admins oversee, landlords manage properties/tenants, and tenants book/pay.

## Features
- User authentication (register/login with roles, password hashing)
- Admin-only user CRUD with pagination, status toggle, tenant assignment
- Landlord-owned property/unit CRUD with filters, availability checks
- Relationships: Landlords own properties/units; tenants assigned to units
- Validation and error handling (Zod, AppError)
- Swagger docs for API endpoints
- Secure: Ownership filters, role restrictions

## Tech Stack
- Node.js / Express.js
- Prisma ORM with PostgreSQL
- JWT & bcrypt for auth
- Zod for validation
- Swagger for docs

## Installation
1. Clone the repo: `git clone https://github.com/yourusername/RealApi.git`
2. Install deps: `npm install`
3. Copy `.env.example` to `.env` and fill in (DATABASE_URL, JWT_SECRET)
4. Prisma setup: `npx prisma generate` and `npx prisma migrate dev`
5. Start server: `npm start` (or nodemon for dev)

## Usage
- Register admin first (no token needed).
- Use Postman/Swagger at /docs for testing endpoints.
- Example: POST /api/v1/auth/registry with body { "name": "Admin", "email": "admin@example.com", "password": "securepass", "role": "ADMIN" }

## API Endpoints
- Auth: /auth/registry (POST), /auth/login (POST)
- Users: /users (GET list/filter), /users/{id} (GET/PUT/DELETE)—admin only
- Properties: /properties (POST/GET list/filter), /properties/{id} (PUT/DELETE)—landlord own/admin all
- Units: /units (POST/GET list/filter), /units/{id} (PUT/DELETE)—landlord own/admin all
(See Swagger for full details/responses)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Pull requests welcome!

## License
MIT License—see [LICENSE](LICENSE) for details.

