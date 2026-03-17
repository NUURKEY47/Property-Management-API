# RealEstate Management System API

Backend API for a complete real estate platform — managing properties, units, landlords, tenants, and role-based access control.

Built with clean architecture, modern Node.js practices, Prisma + PostgreSQL, JWT authentication, and centralized error handling.

## Tech Stack

- **Node.js** — Runtime  
- **Express.js** — Web framework  
- **Prisma** — ORM  
- **PostgreSQL** — Database  
- **JWT** — Authentication & authorization  
- **bcrypt** — Password hashing  
- **Zod** — Input validation  
- **AppError** — Custom error handling  

## Features

- Full user authentication (register, login, JWT)  
- Role-based access control  
  - SUPER_ADMIN: full access  
  - SUB_ADMIN: restricted to managed landlords/tenants  
  - LANDLORD: own properties/units/tenants  
  - TENANT: own unit dashboard  
- Property CRUD with ownership checks  
- Unit CRUD with availability status  
- Landlord list, dashboard, update, delete  
- Tenant creation & unit assignment  
- Hierarchy via managedById  
- Protected routes & ownership validation  

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/RealEstateApiV2.git
   cd RealEstateApiV2/backend

Install dependenciesBashnpm install
Create .env file in rootenvDATABASE_URL=postgresql://user:password@localhost:5432/realstate_MasterApi143
JWT_SECRET=your_very_long_random_secret_here
PORT=3000
NODE_ENV=development
Generate Prisma client & sync schemaBashnpx prisma generate
npx prisma db push
Start the serverDevelopment mode (auto-restart):Bashnpm run devProduction mode:Bashnpm start

Server available at: http://localhost:3000/api/v1
## Project Structure
Clean architecture with modules separated by domain (user, property, unit, landlord, tenant).

```text
RealEstateApiV2/backend/
├── src/
│   ├── config/                  # Database connection
│   ├── middlewares/             # Auth, validation, error handler
│   ├── modules/
│   │   ├── auth/                # Login, register, checkFirstAdmin
│   │   ├── user/                # User CRUD + managedById
│   │   ├── property/            # Property CRUD
│   │   ├── unit/                # Unit CRUD + assignment
│   │   ├── landlord/            # Landlord list/dashboard
│   │   └── tenant/              # Tenant create/assign
│   ├── routes/                  # All route files
│   ├── utils/                   # AppError, sendResponse, catchAsync
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md

API Endpoints (Overview)
Authentication

POST /auth/registry — Register user
POST /auth/login — Login

Users

GET /users — List users (Admin only)
PUT /users/:id — Update user (managedById, unitId, etc.)
DELETE /users/:id — Delete user

Properties

POST /properties — Create property
GET /properties — List properties
PUT /properties/:id — Update property
DELETE /properties/:id — Delete property

Units

POST /units — Create unit
GET /units — List units
PUT /units/:id — Update unit
DELETE /units/:id — Delete unit

Landlords

GET /landlords — List landlords (role-filtered)
GET /landlords/dashboard — Landlord dashboard

Tenants

POST /tenants — Create tenant
PUT /tenants/:id/assign-unit — Assign tenant to unit
GET /tenants — List tenants

Full Swagger documentation available at /api-docs (if enabled) or via Postman.
Security Highlights

Passwords hashed with bcrypt
JWT tokens for authentication
Protected routes with verifyToken & authorizeRoles
Ownership checks (landlordId, managedById)
Global error handling with AppError

Contributing

Fork the repository
Create feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push (git push origin feature/amazing-feature)
Open Pull Request

License
ISC
Made with ❤️ in Nairobi by Noor Mohamed Abdikadir
Last updated: March 2026
