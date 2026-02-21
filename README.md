# Dashy - Full-Stack User Profile & Management App

Dashy is a premium user management application built with a modern tech stack. It features a complete authentication system, a unified search engine, and full CRUD capabilities for tasks and posts.

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API (AuthContext)
- **Icons**: Custom SVG icons & Lucide-inspired design

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Database**: [Neon DB](https://neon.com/) (Serverless PostgreSQL)
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Password hashing with `bcryptjs`

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Neon DB account (for `DATABASE_URL`)

### 1. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install express pg bcryptjs jsonwebtoken dotenv cors morgan

# Configure environment variables (.env)
# Create a .env file with the following:
# PORT=5000
# DATABASE_URL=your_neon_db_url
# JWT_SECRET=your_jwt_secret

# Start the server
npm run dev
```

### 2. Frontend Setup
```bash
# Navigate to the root (my-app)
cd ..

# Install dependencies
npm install

# Configure environment variables (.env)
# Create a .env file with:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the dev server
npm run dev
```

---

## 📡 API Documentation

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate and get a JWT
- `GET /api/auth/profile` - Get authenticated user profile (Protected)

### Tasks (Protected)
- `GET /api/tasks` - List all user tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

### Posts (Protected)
- `GET /api/posts` - List all user posts
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update an existing post
- `DELETE /api/posts/:id` - Delete a post

### Search (Protected)
- `GET /api/search?q=query` - Unified search across tasks and posts

---

## 🔗 Integration Details

The frontend and backend communicate via a centralized **`apiService.ts`** located in the `services` folder. This service abstraction ensures:
- Automatic token injection for protected routes.
- Consistent error handling.
- SSR compatibility using `typeof window !== 'undefined'` checks for local storage.

---

## 📈 Scalability & Performance

- **Stateless Authentication**: Using JWT allows the backend to be horizontally scaled without session sharing issues.
- **Serverless Database**: Neon DB automatically scales compute resources based on demand, ensuring zero-latency spikes.
- **Optimized UI**: Tailwind CSS ensures a minimal CSS bundle size, and Next.js optimizes asset delivery via edge caching.
- **Modular Codebase**: Separate controllers, routes, and middlewares make the system easy to extend.

---

## 🌍 Deployment

### Database
- Already handled by **Neon DB**. Simply ensure your cloud connection string is set in the production environment variables.

### Backend
- Can be deployed to platforms like **Render**, **Railway**, or **AWS App Runner**.
- Ensure `CORS` origins are restricted to your frontend URL in production.

### Frontend
- Deployment to **Vercel** is recommended for seamless Next.js support.
- Set `NEXT_PUBLIC_API_URL` to your deployed backend URL.
