# HD Notes - Simple Note Taking App

A simple and elegant note-taking application with Google OAuth authentication, built with React, Node.js, and Supabase.

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

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google account
- 📝 **Note Management** - Create, edit, and delete notes
- 💾 **Cloud Storage** - All notes stored securely in Supabase
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Clean UI** - Modern and minimalist design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google Cloud Console account (for OAuth)

### Environment Setup

1. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:5173` to authorized JavaScript origins
   - Copy the Client ID

2. **Supabase Setup**
   - Create a new project at [Supabase](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase_schema.sql`
   - Get your project URL and anon key from Settings > API

3. **Backend Configuration**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your credentials:
     ```env
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     JWT_SECRET=any_random_secret_key
     ```

4. **Frontend Configuration**
   - Copy `frontend/.env.example` to `frontend/.env`
   - Add your Google Client ID:
     ```env
     VITE_GOOGLE_CLIENT_ID=your_google_client_id
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

#### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout

#### Notes (Protected Routes)
- `GET /api/notes` - Get all user's notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

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

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite, React Router, Google OAuth
- **Backend**: Node.js, Express, TypeScript, JWT
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Google OAuth 2.0

## Screenshots

- Desktop Login View: Based on `desk.png` design
- Mobile Login View: Based on `mob.png` design
- Dashboard with notes management

## Troubleshooting

1. **Google OAuth Error**: Make sure your Google Client ID is correctly set in both frontend and backend
2. **Supabase Connection Error**: Verify your Supabase URL and anon key are correct
3. **CORS Error**: Ensure the frontend URL is correctly set in backend's CORS configuration
4. **Database Error**: Run the SQL schema in Supabase SQL Editor

## License

MIT