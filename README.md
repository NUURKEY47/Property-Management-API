🏢 RealEstate Management System API

Backend API for a complete real estate management platform that manages:

properties

units

landlords

tenants

role-based access control

The system is built using clean architecture and modern backend practices including authentication, authorization, validation, and error handling.

🚀 Tech Stack
Technology	Purpose
Node.js	Runtime environment
Express.js	Web framework
PostgreSQL	Relational database
Prisma	ORM & migrations
JWT	Authentication
bcrypt	Password hashing
Zod	Input validation
AppError	Custom error handling
✨ Features
Authentication

User registration

Login with JWT authentication

Secure password hashing with bcrypt

Role-Based Access Control

Supported roles:

SUPER_ADMIN

SUB_ADMIN

LANDLORD

TENANT

Includes:

role middleware

permission checks

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

Landlord listing

Landlord dashboard

Update landlord

Delete landlord

Tenant Management

Create tenant

Assign tenant to unit

List tenants

Tenant dashboard

Security

Ownership checks (landlord → property → unit → tenant)

Supervision hierarchy (super-admin → sub-admin → landlord)

Global error handling with consistent responses

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/realestate-api.git
cd realestate-api
2️⃣ Install dependencies
npm install
3️⃣ Setup environment variables

Create a .env file in the root directory.

DATABASE_URL="postgresql://user:password@localhost:5432/realestate?schema=public"
JWT_SECRET=your_very_long_random_secret_here
PORT=3000
NODE_ENV=development
4️⃣ Run database migrations
npx prisma migrate dev --name init
5️⃣ Start the server

Development mode (auto restart)

npm run dev

Production mode

npm start

Server runs at:

http://localhost:3000/api/v1
📁 Project Structure
realestate-api
│
├── prisma
│   └── schema.prisma
│
├── src
│   ├── config
│   │   └── prisma client & environment setup
│   │
│   ├── middlewares
│   │   ├── auth middleware
│   │   ├── validation middleware
│   │   └── global error handler
│   │
│   ├── modules
│   │   ├── auth
│   │   ├── user
│   │   ├── property
│   │   ├── unit
│   │   ├── landlord
│   │   └── tenant
│   │
│   ├── validation
│   │   └── Zod schemas
│   │
│   ├── utils
│   │   ├── AppError
│   │   └── sendResponse
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md
🌐 API Overview

Base URL

/api/v1
Authentication
POST /auth/register
POST /auth/login
Users
GET /users
PUT /users/:id
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
GET /landlords/:id
GET /landlords/dashboard
Tenants
POST /tenants
PUT /tenants/:id/assign-unit
GET /tenants
GET /tenants/:id
GET /tenants/dashboard
🛡 Security Highlights

Password hashing using bcrypt

JWT authentication

Role-based middleware

Ownership validation

Supervision hierarchy

Centralized error handling using AppError

🤝 Contributing

Fork the repository

Create a feature branch

git checkout -b feature/add-invoice

Commit your changes

git commit -m "Add invoice module"

Push the branch

git push origin feature/add-invoice

Open a Pull Request

📄 License

ISC

👨‍💻 Author

Made with ❤️ in Nairobi by Noor Mohamed Abdikadir

Last updated: March 2026
