# Setup Guide

## Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Docker)

## 1. Database Setup

### Option A: Using Docker (Recommended)
If you have Docker installed, you can spin up a Postgres container quickly:

```bash
# Run a Postgres container
docker run --name primetrade-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=primetrade_db -p 5432:5432 -d postgres
```

### Option B: Local Installation
1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).
2. Create a database named `primetrade_db`.
3. Ensure your username is `postgres` and password is `postgres` (or update `.env` accordingly).

## 2. Environment Variables
Ensure your `.env` file exists in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/primetrade_db?schema=public"
JWT_SECRET="super-secure-jwt-secret-key-12345"
```

## 3. Install & Setup
```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push Schema to DB (Creates tables)
npx prisma db push
```

## 4. Running the App
```bash
npm run dev
```

## Testing API
You can use Postman or curl.

**Register:**
POST http://localhost:3000/api/auth/register
```json
{
  "email": "test@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Login:**
POST http://localhost:3000/api/auth/login
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
