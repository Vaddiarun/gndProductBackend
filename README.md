# Thinxview Product Engineering – Backend (Node.js + MongoDB)

Production-ready backend with JWT auth and RBAC (admin/user) for managing Products and Tasks.

## Features
- Login with JWT (`/api/auth/login`)
- Role based access (admin = CRUD, user = read-only)
- Products and Tasks APIs
- Input validation with Zod
- Security middleware (Helmet, Rate Limit, CORS)
- Seed script to create first admin

## Quickstart
```bash
cp .env.example .env
# edit .env (Mongo URI, JWT secret, CORS origins)

# Start MongoDB (Docker example)
docker run -d --name mongo -p 27017:27017 -v mongo_data:/data/db mongo:7

npm install
npm run seed:admin
npm run dev
```

Login:
```json
{ "email": "admin@thinxview.com", "password": "Admin@12345" }
```

Auth header for other APIs:
```
Authorization: Bearer <token>
```
