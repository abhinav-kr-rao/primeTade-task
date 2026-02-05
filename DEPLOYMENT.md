# Deployment Guide (Vercel)

This application is ready to be deployed on Vercel. However, since Vercel utilizes Serverless Functions, you cannot use a local SQLite or local PostgreSQL database. You must use a cloud-hosted PostgreSQL database.

## 1. Prepare Database

You need a public PostgreSQL database. Recommended providers (Free Tier):
- **Neon** (https://neon.tech) - *Easiest for Vercel*
- **Supabase** (https://supabase.com)
- **Railway** (https://railway.app)

1.  Create a project on one of these providers.
2.  Get the **Connection String** (Postgres URL).
    *   It looks like: `postgres://user:password@host-name.com:5432/db-name`

## 2. Prepare Code

I have already added the `"postinstall": "prisma generate"` script to your `package.json`. This ensures Prisma Client is generated automatically when Vercel installs dependencies.

## 3. Deploy to Vercel

### Option A: Via GitHub (Recommended)
1.  Push this project to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com).
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your GitHub repository.
5.  **Configure Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Add `DATABASE_URL` = (Your Cloud Postgres Connection String)
    *   Add `JWT_SECRET` = (A long random string)
6.  Click **"Deploy"**.

### Option B: Via Vercel CLI
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel login`
3.  Run `vercel` in the project folder.
4.  Follow the prompts.
5.  When asked for Environment Variables, add them in the [Vercel Dashboard](https://vercel.com/dashboard) under Settings -> Environment Variables.

## 4. Run Migrations
After deployment, your database tables might be empty. You need to push the schema to your cloud database.

From your local terminal:
```bash
# Update .env temporarily to your CLOUD database url, OR run this command:
DATABASE_URL="your-cloud-connection-string" npx prisma db push

## 5. Verify
Open your Vercel URL (e.g., `https://my-app.vercel.app`).
1.  Go to `/register`.
2.  Create a user.
3.  Login and create tasks!
