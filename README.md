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
   git clone <your-repo-url>
   cd RealEstateApiV2/backend

Server runs at: http://localhost:3000/api/v1
## Project Structure

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
