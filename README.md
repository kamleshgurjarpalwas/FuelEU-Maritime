# FuelEU Maritime Application

A full-stack application for managing maritime fuel efficiency and compliance with FuelEU regulations.
<img width="1893" height="737" alt="image" src="https://github.com/user-attachments/assets/f884a335-6464-480e-8ccc-3a14986b9c97" />

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm (v9 or higher)

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/kamleshgurjarpalwas/FuelEU-Maritime.git
cd FuelEU-Maritime
```

2. Set up PostgreSQL database:
```bash
# Log into PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE fueleu_maritime;
```

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend directory:
```env
PORT=4000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/fueleu_maritime"
```

4. Run database migrations and seed data:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

The backend server will start at http://localhost:4000

To run tests:
```bash
npm run test
```

## Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the frontend directory:
```env
VITE_API_BASE=http://localhost:4000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will start at http://localhost:5173

To run tests:
```bash
npm run test
```

## Verify Setup

1. Backend Health Check:
```bash
curl http://localhost:4000/api/routes
```
Should return a JSON array of routes.

2. Frontend:
- Open http://localhost:5173 in your browser
- You should see the application with routes data loaded
- Try different tabs: Routes, Comparison, Banking, and Pools

## Folder Structure

```
FuelEU-Maritime/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── core/           # Business logic
│   │   ├── adapters/       # API routes & DB
│   │   └── infrastructure/ # Server & DB setup
│   ├── prisma/             # Database schema
│   └── tests/              # Backend tests
└── frontend/               # Frontend application
    ├── src/
    │   ├── core/           # Domain logic
    │   ├── adapters/       # UI & API client
    │   └── shared/         # Utilities
    └── tests/              # Frontend tests
```

## Development Workflow

1. Start both servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

2. Run tests in watch mode:
```bash
# Backend tests
cd backend
npm run test:watch

# Frontend tests
cd frontend
npm run test:watch
```

## Common Issues & Solutions

1. **Database Connection Error**
```
Error: P1001: Can't reach database server
```
- Check if PostgreSQL is running
- Verify DATABASE_URL in backend/.env
- Ensure database exists

2. **Frontend API Error**
```
Failed to fetch
```
- Ensure backend is running
- Check VITE_API_BASE in frontend/.env
- Verify network requests in browser dev tools

3. **TypeScript Errors**
```
Cannot find module '...' or its corresponding type declarations
```
- Run `npm install` in both directories
- Check if all dependencies are installed
- Verify tsconfig.json settings

## Available Scripts

### Backend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with test data

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## API Documentation

See detailed API documentation in:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
