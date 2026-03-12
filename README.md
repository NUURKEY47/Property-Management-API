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

Install dependenciesBashnpm install
Create .env file in rootenvDATABASE_URL=postgresql://user:password@localhost:5432/realstate_MasterApi143
JWT_SECRET=your_very_long_random_secret_here
PORT=3000
NODE_ENV=development
Generate Prisma client & push schemaBashnpx prisma generate
npx prisma db push
Start the serverDevelopment (auto-restart):Bashnpm run devProduction:Bashnpm start

Server runs at: http://localhost:3000/api/v1
**Project Structure**
RealEstateApiV2/backend/
├── src/
│   ├── config/              # DB connection
│   ├── middlewares/         # auth, validation, error
│   ├── modules/
│   │   ├── auth/            # login, register
│   │   ├── user/            # user CRUD + managedById
│   │   ├── property/        # property CRUD
│   │   ├── unit/            # unit CRUD + assignment
│   │   ├── landlord/        # landlord list/dashboard
│   │   └── tenant/          # tenant create/assign
│   ├── routes/              # all route files
│   ├── utils/               # AppError, sendResponse, catchAsync
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md
