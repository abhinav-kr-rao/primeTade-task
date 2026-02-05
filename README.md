# PrimeTrade Backend Assignment

A Scalable REST API with Authentication & Role-Based Access, built with Next.js App Router, Prisma, and PostgreSQL.

## Features
- **Authentication**: Custom JWT implementation (bcrypt + jsonwebtoken).
- **Authorization**: Role-Based Access Control (RBAC) middleware.
- **Database**: PostgreSQL with Prisma ORM.
- **Frontend**: Simple Next.js UI for Task Management.
- **Security**: HttpOnly cookies, password hashing, and input validation (Zod).

## Prerequisites
- Node.js v18+
- PostgreSQL

## Getting Started

1.  **Clone & Install**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create `.env` in the root:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
    JWT_SECRET="your-jwt-secret"
    ```

3.  **Database Setup**
    ```bash
    # Push schema to database
    npx prisma db push

    # Generate Prisma Client
    npx prisma generate
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## API Testing
Import `swagger.json` into Postman or use the following endpoints:

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/tasks` | List user tasks | Private |
| POST | `/api/tasks` | Create task | Private |

## Scalability
See [SCALABILITY.md](./SCALABILITY.md) for architectural decisions.
