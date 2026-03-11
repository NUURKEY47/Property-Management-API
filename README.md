RealEstate Management System API

Backend API for a complete real estate management platform that manages:

properties

units

landlords

tenants

role-based access control

The system is built using clean architecture and modern backend practices including authentication, authorization, validation, and centralized error handling.

Tech Stack

Node.js — Runtime environment
Express.js — Web framework
PostgreSQL — Relational database
Prisma — ORM & database management
JWT — Authentication & authorization
bcrypt — Password hashing
Zod — Input validation
AppError — Custom error handling system

Features
Authentication

User registration

Login with JWT authentication

Password hashing with bcrypt

Role-Based Access Control

Supported roles:

SUPER_ADMIN

SUB_ADMIN

LANDLORD

TENANT

Includes role middleware and permission checks.

Property Management

Create property

List properties

Update property

Delete property

Unit Management

Create unit

List units

Update unit

Delete unit

Landlord Module

List landlords

Landlord dashboard

Update landlord

Delete landlord

Tenant Management

Create tenant

Assign tenant to unit

List tenants

Tenant dashboard

Security

Ownership validation (landlord → property → unit → tenant)

Supervision hierarchy (super-admin → sub-admin → landlord)

Global error handling with consistent responses

Installation
Clone the repository
git clone https://github.com/yourusername/realestate-api.git
cd RealEstateApiV2/backend
Install dependencies
npm install
Setup environment variables

Create a .env file in the root directory:

DATABASE_URL=postgresql://user:password@localhost:5432/realstate_MasterApi143
JWT_SECRET=your_very_long_random_secret_here
PORT=3000
NODE_ENV=development
Run Prisma commands
npx prisma generate
npx prisma db push
Start the server

Development mode (auto restart)

npm run dev

Production mode

npm start

Server runs at:

http://localhost:3000/api/v1
Project Structure
RealEstateApiV2/backend
│
├── src
│   ├── config
│   │   └── Database connection
│   │
│   ├── middlewares
│   │   ├── auth middleware
│   │   ├── validation middleware
│   │   └── global error handler
│   │
│   ├── modules
│   │   ├── auth        # Login, register, checkFirstAdmin
│   │   ├── user        # User CRUD + managedById
│   │   ├── property    # Property CRUD
│   │   ├── unit        # Unit CRUD + assignment
│   │   ├── landlord    # Landlord dashboard & listing
│   │   └── tenant      # Tenant creation & assignment
│   │
│   ├── routes
│   │   └── All route files
│   │
│   ├── utils
│   │   ├── AppError
│   │   ├── sendResponse
│   │   └── catchAsync
│   │
│   ├── app.js
│   └── server.js
│
├── prisma
│   └── schema.prisma
│
├── .env
├── package.json
└── README.md
Models
User

Handles authentication and roles.

Fields include:

role (ADMIN, LANDLORD, TENANT)

managedById for sub-admin hierarchy

unitId for tenant unit assignment

Property

Represents a real estate property.

Fields include:

name

location

category

description

landlordId (linked to User)

Unit

Represents individual units within a property.

Fields include:

name

price

status (available / occupied)

size

propertyId

Landlord & Tenant

Both are stored as User records but distinguished by their role.

API Endpoints

Base URL

/api/v1
Authentication

Register user

POST /auth/registry

Login user

POST /auth/login
Users
GET /users
PUT /users/:id
DELETE /users/:id
Properties
POST /properties
GET /properties
PUT /properties/:id
DELETE /properties/:id
Units
POST /units
GET /units
PUT /units/:id
DELETE /units/:id
Landlords
GET /landlords
GET /landlords/dashboard
Tenants
POST /tenants
PUT /tenants/:id/assign-unit
GET /tenants
Security

Passwords hashed using bcrypt

JWT tokens for authentication

Protected routes with verifyToken middleware

Role-based access control

Ownership verification (landlordId, managedById)

Centralized error handling with AppError

Available Scripts
npm run dev

Run development server using nodemon

npm start

Run server in production mode

npx prisma studio

Open Prisma database UI

Contributing

Fork the repository

Create your feature branch

git checkout -b feature/amazing-feature

Commit your changes

git commit -m "Add amazing feature"

Push the branch

git push origin feature/amazing-feature

Open a Pull Request

License

ISC

Author

Made with ❤️ in Nairobi by Noor Mohamed Abdikadir

Last updated: March 2026
