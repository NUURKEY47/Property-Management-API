# RealEstate API

Backend API for RealEstate Management System — a complete platform for managing properties, units, landlords, and tenants in Nairobi with role-based access control.

This backend powers user authentication, property & unit management, tenant assignment, and role-based dashboards.

## Tech Stack

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **Prisma** — ORM
- **PostgreSQL** — Database
- **JWT** — Authentication
- **bcrypt** — Password hashing
- **Zod** — Input validation

## Features

✅ User authentication (register, login, JWT)  
✅ Role-based access control (ADMIN, LANDLORD, TENANT)  
✅ User management with managedById hierarchy (super-admin & sub-admin)  
✅ Property management (CRUD with ownership)  
✅ Unit management (CRUD with availability status)  
✅ Landlord management (list, dashboard, assignment)  
✅ Tenant creation & assignment to units  
✅ Protected routes with ownership checks  
✅ Global error handling with custom AppError  

## Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd RealEstateApiV2/backend
   Install dependenciesBashnpm install
Set up environment variables
Create a .env file in the root:envDATABASE_URL=postgresql://user:password@localhost:5432/realstate_MasterApi143
JWT_SECRET=your_very_long_random_secret_here
PORT=3000
NODE_ENV=development
Run Prisma commandsBashnpx prisma generate
npx prisma db push
Run the serverDevelopment mode (with auto-restart):Bashnpm run devProduction mode:Bashnpm start


**Project Structure**
textRealEstateApiV2/backend/
├── src/
│   ├── config/              # Database connection
│   ├── middlewares/         # Auth, validation, error handler
│   ├── modules/
│   │   ├── auth/            # Login, register, checkFirstAdmin
│   │   ├── user/            # User CRUD + managedById
│   │   ├── property/        # Property CRUD
│   │   ├── unit/            # Unit CRUD + assignment
│   │   ├── landlord/        # Landlord dashboard & list
│   │   └── tenant/          # Tenant create & assign
│   ├── routes/              # All route files
│   ├── utils/               # AppError, sendResponse, catchAsync
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md

Models
User

Authentication, roles (ADMIN, LANDLORD, TENANT)
managedById hierarchy for sub-admins
unitId for tenant assignment

Property

Name, location, category, description
Linked to Landlord (User)

Unit

Name, price, status (available/occupied), size
Linked to Property

Landlord & Tenant

Both are User records with different roles
API Endpoints
Authentication

POST /api/v1/auth/registry — Register user
POST /api/v1/auth/login — Login user

Users

GET /api/v1/users — List users (Admin only)
PUT /api/v1/users/:id — Update user (assign managedById, unitId)
DELETE /api/v1/users/:id — Delete user

Properties

POST /api/v1/properties — Create property
GET /api/v1/properties — List properties
PUT /api/v1/properties/:id — Update property
DELETE /api/v1/properties/:id — Delete property

Units

POST /api/v1/units — Create unit
GET /api/v1/units — List units
PUT /api/v1/units/:id — Update unit
DELETE /api/v1/units/:id — Delete unit

Landlords

GET /api/v1/landlords — List landlords (filtered by role)
GET /api/v1/landlords/dashboard — Landlord dashboard

Tenants

POST /api/v1/tenants — Create tenant
PUT /api/v1/tenants/:id/assign-unit — Assign tenant to unit
GET /api/v1/tenants — List tenants

Security

Passwords hashed with bcrypt
JWT tokens for authentication
Protected routes with verifyToken + authorizeRoles
Ownership checks (landlordId, managedById)
Global error handling with AppError

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

License
ISC
Made with ❤️ in Nairobi by Noor
Last updated: March 2026
