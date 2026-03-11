# RealEstate Management System API

Backend API for a complete real estate platform — manage properties, units, landlords, tenants, and role-based access (super-admin, sub-admin, landlord, tenant).

Built with clean architecture, JWT authentication, role-based authorization, Prisma ORM, Zod validation, and global error handling.

## Tech Stack

- **Node.js** — Runtime  
- **Express.js** — Web framework  
- **Prisma** — ORM & database migrations  
- **PostgreSQL** — Relational database  
- **JWT** — Authentication & authorization  
- **bcrypt** — Password hashing  
- **Zod** — Input validation  
- **AppError** — Custom error handling  

## Features

- User authentication (register, login, JWT)  
- Role-based access control (ADMIN, LANDLORD, TENANT)  
- Super-admin / sub-admin hierarchy (managedById)  
- Property management (CRUD)  
- Unit management (CRUD)  
- Landlord module (list, dashboard, update, delete)  
- Tenant management (create, assign to unit, list, dashboard)  
- Ownership & supervision checks (landlord → units → tenants)  
- Global error handling & consistent responses  

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/realestate-api.git
   cd realestate-api

Install dependenciesBashnpm install
Set up environment variables
Create .env file in root:envDATABASE_URL="postgresql://user:password@localhost:5432/realestate?schema=public"
JWT_SECRET=your_very_long_random_secret_here
PORT=3000
NODE_ENV=development
Run database migrations (Prisma)Bashnpx prisma migrate dev --name init
Start the serverDevelopment mode (with auto-restart):Bashnpm run devProduction mode:Bashnpm startServer runs on http://localhost:3000/api/v1

Project Structure
textrealestate-api/
├── src/
│   ├── config/               # Prisma client, env
│   ├── middlewares/          # auth, validation, error handler
│   ├── modules/              # Feature modules (auth, user, property, unit, landlord, tenant)
│   │   ├── auth/
│   │   ├── user/
│   │   ├── property/
│   │   ├── unit/
│   │   ├── landlord/
│   │   └── tenant/
│   ├── utils/                # AppError, sendResponse, etc.
│   ├── validation/           # Zod schemas
│   └── server.js             # Main entry point
├── prisma/
│   └── schema.prisma         # Database schema
├── .env                      # Environment variables (never commit!)
├── package.json
└── README.md
Available Scripts
Bashnpm run dev       # Development with nodemon (auto-restart)
npm start         # Production mode
npx prisma studio # Open Prisma Studio (visual DB explorer)
npx prisma migrate dev  # Run migrations

API Documentation
See API_DOCUMENTATION.md for full endpoint details.
Authentication

POST /api/v1/auth/registry — Register new user
POST /api/v1/auth/login — Login and get JWT

Users

GET /api/v1/users — List users (Admin only)
PUT /api/v1/users/:id — Update user (Admin only)

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

GET /api/v1/landlords — List landlords (role-filtered)
GET /api/v1/landlords/:id — Get landlord
GET /api/v1/landlords/dashboard — Landlord dashboard

Tenants

POST /api/v1/tenants — Create tenant
PUT /api/v1/tenants/:id/assign-unit — Assign tenant to unit
GET /api/v1/tenants — List tenants
GET /api/v1/tenants/:id — Get tenant
GET /api/v1/tenants/dashboard — Tenant dashboard

Security Highlights

Passwords hashed with bcrypt
JWT tokens for authentication
Role-based middleware & service checks
Ownership verification (landlord → property → unit → tenant)
Supervision chain (super-admin → sub-admin → landlord)
Global error handling with AppError

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/add-invoice)
Commit your changes (git commit -m 'Add invoice module')
Push to the branch (git push origin feature/add-invoice)
Open a Pull Request

License
ISC
Made with ❤️ in Nairobi by noor
Last updated: March 2026
