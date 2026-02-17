# RealApi - Real Estate Management Backend
**A secure, scalable backend API for real estate management**  
Built with Node.js, Express, Prisma (PostgreSQL), JWT authentication, role-based access control (Admin, Landlord, Tenant), Zod validation, and global error handling. Ideal for broker platforms where admins oversee, landlords manage properties/units/tenants, and tenants book/pay.

## Features
- **Authentication**: Register/login with roles, password hashing (bcrypt), JWT tokens
- **Role-Based Access**: Admins manage all; Landlords own/manage properties/units; Tenants view/pay assigned units
- **User Management**: Admin CRUD users, assign tenants to units with availability checks
- **Property & Unit CRUD**: Ownership enforced, filters (location/category/status), delete restrictions (no delete if occupied/units exist)
- **Relationships**: Landlord → Properties (1:N), Property → Units (1:N), Tenant → Unit (M:1)
- **Validation & Errors**: Zod for input, AppError for custom messages, global handler
- **API Documentation**: Swagger UI at `/docs`
- **Clean Architecture**: Controller → Service → Repository pattern
- **Open Source**: MIT License, contributions welcome!

## Tech Stack
- Node.js + Express.js
- Prisma ORM + PostgreSQL
- JWT + bcrypt (auth)
- Zod (validation)
- Swagger (docs)
- Nodemon (dev)
- GitHub Actions (optional CI)

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/NUURKEY47/RealApi.git
   cd RealApi

Install dependencies:Bashnpm install
Create .env from .env.example and fill in:textDATABASE_URL="postgresql://user:pass@localhost:5432/realapi"
JWT_SECRET="your-very-secure-secret"
Initialize Prisma:Bashnpx prisma generate
npx prisma migrate dev --name init
Start development server:Bashnpm run dev
Access Swagger docs: http://localhost:3000/api-docs

Usage

Register first admin (no token needed): POST /api/v1/auth/registry with role "ADMIN"
Login for token: POST /api/v1/auth/login
Use Bearer token in Authorization header for protected routes
Test all endpoints in Postman (collection in repo: RealestateApi.postman_collection.json)

API Endpoints (Summary)

Auth: /auth/registry (POST), /auth/login (POST)
Users: /users (GET list/filter), /users/:id (GET/PUT/DELETE) – admin only
Properties: /properties (POST/GET list), /properties/:id (PUT/DELETE) – landlord own/admin all
Units: /units (POST/GET list), /units/:id (PUT/DELETE) – landlord own/admin all
See Swagger at /api-docs for full docs, schemas, and examples.

Contributing
Contributions are welcome! Please see CONTRIBUTING.md for guidelines.

Fork the repo
Create your branch (git checkout -b feature/awesome-feature)
Commit changes (git commit -m 'Add awesome feature')
Push (git push origin feature/awesome-feature)
Open a Pull Request

License
MIT License – see LICENSE for details.
Contact

GitHub: @NUURKEY47
LinkedIn: [Your LinkedIn Profile]
Email: [your.email@example.com]

Made with ❤️ in Nairobi, Kenya
