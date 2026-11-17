# API Starter

A complete TypeScript Express API starter with CRUD examples, validation, and tests.

## Features
- Express server
- TypeScript
- Zod validation
- Health check endpoint
- User CRUD endpoints
- Error handling middleware
- Environment variables
- Vitest tests

## Getting started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start in development mode:
```bash
npm run dev
```

4. Build:
```bash
npm run build
```

5. Run production:
```bash
npm start
```

6. Run tests:
```bash
npm test
```

## API routes

### GET /api/health
Returns service health information.

### GET /api/users
Returns all users.

### GET /api/users/:id
Returns a single user by id.

### POST /api/users
Creates a new user.

### PUT /api/users/:id
Updates an existing user.

### DELETE /api/users/:id
Deletes a user.

## Example request
```bash
curl http://localhost:3000/api/users
```

## Example create user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie","email":"charlie@example.com","active":true}'
```
