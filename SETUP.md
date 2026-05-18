# Codeflow AI - Full Stack SaaS Setup Guide

This guide walks you through setting up the production-ready Codeflow AI application with a FastAPI backend and Next.js frontend.

## Project Structure

```
codeflow-ai/
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── models.py       # SQLAlchemy ORM models
│   │   ├── schemas.py      # Pydantic request/response schemas
│   │   ├── database.py     # Database connection & setup
│   │   ├── auth/           # Authentication utilities
│   │   ├── services/       # Business logic services
│   │   └── routes/         # API endpoints
│   ├── main.py             # FastAPI app entry point
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
├── app/                     # Next.js application
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # User dashboard
│   ├── review/             # Code review page
│   ├── projects/           # Project management page
│   └── layout.jsx          # Root layout with auth provider
├── lib/
│   ├── api-client.ts       # Backend API client
│   ├── auth-context.tsx    # Authentication context
│   └── protected-page.tsx  # Protected route wrapper
├── components/             # Reusable React components
├── .env.example            # Frontend env variables
└── DEPLOYMENT_GUIDE.md     # Production deployment guide
```

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Python 3.8+
- PostgreSQL (or use Neon online)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd codeflow-ai
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# DATABASE_URL=postgresql://user:password@localhost:5432/codeflow_ai
# GROQ_API_KEY=your-groq-api-key
# SECRET_KEY=your-secret-key (generate with: python -c "import secrets; print(secrets.token_urlsafe(32))")
```

### 3. Setup Database

```bash
# Create PostgreSQL database
createdb codeflow_ai

# Run the app to create tables (migrations on startup)
python main.py
```

The app will automatically create all tables on the first run.

### 4. Setup Frontend

```bash
# In the root directory (not backend)
npm install
# or
yarn install
# or
pnpm install

# Create .env.local file
cp .env.example .env.local

# Update NEXT_PUBLIC_API_URL if backend is on different port
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 5. Run Both Services

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python main.py
```

Backend runs on: `http://localhost:8000`
API Docs available at: `http://localhost:8000/docs`

**Terminal 2 - Frontend:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Frontend runs on: `http://localhost:3000`

### 6. Access the Application

1. Open `http://localhost:3000` in your browser
2. Click "Sign Up" to create a new account
3. Create a project
4. Start reviewing code!

## Architecture Details

### Database Models

**Users**
- Store user accounts with bcrypt-hashed passwords
- One-to-many relationship with Projects

**Projects**
- Organize code reviews by project
- Each project belongs to one user
- One-to-many relationships with Reviews and GeneratedDocs

**Reviews**
- Store code review results
- JSON field for Groq analysis
- Include code quality score

**GeneratedDocs**
- Store generated documentation
- One doc per code submission

### Authentication Flow

1. User signs up with email/password
2. Password hashed with bcrypt
3. JWT token returned on successful login
4. Token stored in localStorage
5. All API requests include `Authorization: Bearer {token}` header
6. Backend validates token and extracts user ID

### API Security

- API keys (Groq) never sent to frontend
- All AI API calls made from backend
- JWT tokens expire in 30 minutes
- Refresh endpoint available for new tokens
- CORS configured for local development
- Production CORS must be set to your Vercel domain

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:5432/database
SECRET_KEY=generate-a-strong-secret-key
GROQ_API_KEY=your-groq-api-key
ENVIRONMENT=development|production
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Endpoints

### Auth Routes
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user
- `POST /api/auth/refresh` - Refresh token

### Project Routes
- `POST /api/projects` - Create
- `GET /api/projects` - List
- `GET /api/projects/{id}` - Get one
- `PUT /api/projects/{id}` - Update
- `DELETE /api/projects/{id}` - Delete

### Review Routes
- `POST /api/reviews/analyze` - Submit code
- `GET /api/reviews` - List reviews
- `GET /api/reviews/{id}` - Get review
- `DELETE /api/reviews/{id}` - Delete review

### Docs Routes
- `POST /api/docs/generate` - Generate docs
- `GET /api/docs` - List docs
- `GET /api/docs/{id}` - Get doc
- `DELETE /api/docs/{id}` - Delete doc

## Common Issues & Solutions

### "Cannot connect to database"
- Verify PostgreSQL is running: `psql -U postgres`
- Check DATABASE_URL format
- Ensure database exists: `createdb codeflow_ai`

### "ModuleNotFoundError: No module named 'fastapi'"
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`

### "GROQ_API_KEY not found"
- Add to backend/.env file
- Get key from [Groq Console](https://console.groq.com)

### "Cannot login - Invalid token"
- Check SECRET_KEY is set and consistent
- Clear localStorage and try again
- Check backend logs for JWT errors

### Frontend shows "Not authenticated"
- Verify backend API URL in .env.local
- Check token is stored in localStorage
- Verify backend CORS settings

## Deployment

See `DEPLOYMENT_GUIDE.md` for:
- Deploying backend to Render
- Deploying frontend to Vercel
- Setting up PostgreSQL on Neon
- Production configuration

## Development Tips

### Testing API Endpoints
Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).

### Debugging
- Frontend: Check browser DevTools console
- Backend: Check terminal output (enable SQL logging)
- Database: Connect with `psql codeflow_ai`

### Database Inspection
```bash
# Connect to database
psql codeflow_ai

# List tables
\dt

# Inspect table structure
\d users

# Query data
SELECT * FROM users;
```

## Next Steps

1. ✅ Local development setup complete
2. 📦 Create additional features (subscriptions, teams, etc.)
3. 🚀 Deploy to production using DEPLOYMENT_GUIDE.md
4. 📊 Set up analytics and monitoring
5. 💳 Add Stripe for payments (optional)

## Support

For issues or questions:
1. Check console logs in both frontend and backend
2. Verify environment variables are set
3. Read API documentation at `http://localhost:8000/docs`
4. Check GitHub issues if deployed from GitHub

## License

[Add your license here]
