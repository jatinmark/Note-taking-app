# Full-Stack Application

A modern full-stack application built with Vite, React, TypeScript, Node.js, Express, and Supabase (PostgreSQL).

## Project Structure

```
fullstack-app/
├── frontend/               # Frontend application
│   ├── src/               # Source files
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── backend/               # Backend API
│   ├── src/              # Source files
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   ├── dist/             # Compiled files
│   └── package.json      # Backend dependencies
└── README.md
```

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Development Port**: 5173

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (via Supabase)
- **Development Port**: 5000

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account for database

### Environment Setup

1. **Backend Configuration**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your Supabase credentials:
     ```env
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### Installation

1. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

### Development

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

### API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api` - API information
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Database Setup

1. Go to your Supabase project dashboard
2. Create a `users` table with the following schema:
   ```sql
   CREATE TABLE users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     name VARCHAR(255),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

### Build for Production

**Frontend Build**
```bash
cd frontend
npm run build
```

**Backend Build**
```bash
cd backend
npm run build
npm start
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Features

- ✅ TypeScript support for both frontend and backend
- ✅ Hot reload in development
- ✅ Tailwind CSS for styling
- ✅ Supabase integration for database
- ✅ CORS configured
- ✅ Error handling middleware
- ✅ Environment variables support
- ✅ RESTful API structure

## Next Steps

You can now:
1. Add authentication with Supabase Auth
2. Create more database tables and services
3. Build your UI components
4. Add state management (Redux, Zustand, etc.)
5. Implement real-time features with Supabase Realtime
6. Add testing (Jest, React Testing Library, etc.)

## License

MIT