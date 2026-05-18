# Codeflow AI - Full Stack Deployment Guide

This guide covers deploying the production-ready Codeflow AI SaaS application with a FastAPI backend and Next.js frontend.

## Architecture Overview

- **Frontend**: Next.js 16 (Vercel)
- **Backend**: FastAPI + Python (Render)
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT with bcrypt password hashing
- **AI Service**: Groq API (backend only)

## Prerequisites

Before deploying, ensure you have:
- GitHub account (for repo management)
- Vercel account (for frontend)
- Render account (for backend)
- Neon account (for database)
- Groq API key

## 1. Database Setup (Neon)

### Create a PostgreSQL database on Neon:

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy your connection string (looks like: `postgresql://user:password@host/database`)
4. Note this for backend setup

## 2. Backend Setup (Render)

### Prepare the backend for deployment:

1. Create `.env` file in `/backend` directory:
```
DATABASE_URL=postgresql://user:password@host/database
SECRET_KEY=your-super-secret-key-generate-a-strong-one
GROQ_API_KEY=your-groq-api-key
ENVIRONMENT=production
```

2. Install Python dependencies locally:
```bash
cd backend
pip install -r requirements.txt
```

3. Test the backend locally:
```bash
cd backend
python main.py
```

### Deploy to Render:

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: codeflow-ai-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && python main.py`
   - **Instance Type**: Free or Paid

5. Add Environment Variables in Render dashboard:
   - `DATABASE_URL`: Your Neon connection string
   - `SECRET_KEY`: Generate a strong secret key
   - `GROQ_API_KEY`: Your Groq API key
   - `ENVIRONMENT`: production

6. Deploy and note the URL (e.g., `https://codeflow-ai-backend.onrender.com`)

## 3. Frontend Setup (Vercel)

### Configure the frontend:

1. Update `NEXT_PUBLIC_API_URL` in `.env.production`:
```
NEXT_PUBLIC_API_URL=https://codeflow-ai-backend.onrender.com
```

2. Update CORS in backend `main.py` to include Vercel domain:
```python
origins = [
    "http://localhost:3000",
    "https://your-vercel-domain.vercel.app",
]
```

### Deploy to Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL

5. Deploy

## 4. API Endpoints Reference

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh JWT token

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - List user projects
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Code Reviews
- `POST /api/reviews/analyze` - Submit code for review
- `GET /api/reviews` - List user reviews
- `GET /api/reviews/{id}` - Get review details
- `DELETE /api/reviews/{id}` - Delete review

### Documentation
- `POST /api/docs/generate` - Generate documentation
- `GET /api/docs` - List generated docs
- `GET /api/docs/{id}` - Get doc details
- `DELETE /api/docs/{id}` - Delete doc

## 5. Local Development

### Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`

### Frontend:
```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 6. Database Migrations

If you need to modify the database schema:

1. Update models in `backend/app/models.py`
2. The app will automatically create tables on startup
3. For production, consider using Alembic for migrations

## 7. Security Checklist

- [ ] Generate strong `SECRET_KEY` (use `secrets` module in Python)
- [ ] Keep API keys secure - never commit to git
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS on production
- [ ] Configure CORS properly for your domain
- [ ] Regular database backups
- [ ] Monitor API rate limits
- [ ] Update dependencies regularly

## 8. Troubleshooting

### Backend won't start
- Check `DATABASE_URL` is correct
- Verify Python version is 3.8+
- Check all required packages are installed

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend CORS settings
- Ensure backend is running and accessible

### Database connection errors
- Verify Neon connection string
- Check IP allowlist in Neon settings
- Ensure `psycopg2-binary` is installed

### Authentication issues
- Verify `SECRET_KEY` matches between restarts
- Check token expiration settings
- Ensure JWT tokens are being sent in Authorization header

## 9. Next Steps

1. Monitor application performance
2. Set up error tracking (Sentry)
3. Configure email notifications
4. Add payment processing (Stripe)
5. Set up CI/CD pipeline
6. Configure custom domain

For detailed API documentation, visit `{backend_url}/docs` after deployment.
