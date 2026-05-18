# Quick Start - 5 Minutes to Running Code

The fastest way to get Codeflow AI running locally.

## 1. Prerequisites Check (30 seconds)
```bash
# Check Node.js
node --version  # Should be 18+

# Check Python
python --version  # Should be 3.8+

# Check Git
git --version
```

## 2. Clone & Install (2 minutes)
```bash
# Clone the repo
git clone <your-repo-url>
cd codeflow-ai

# Install frontend dependencies
npm install
# or: yarn install / pnpm install

# Setup backend
cd backend
python -m venv venv
source venv/bin/activate  # or: venv\Scripts\activate on Windows
pip install -r requirements.txt
cd ..
```

## 3. Configure Environment (1 minute)
```bash
# Frontend
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local

# Backend
cat > backend/.env << EOF
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=dev-secret-key-change-in-production
GROQ_API_KEY=your-groq-api-key
ENVIRONMENT=development
EOF
```

## 4. Start Services (1 minute)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
# Should output: Uvicorn running on http://127.0.0.1:8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Should output: ready on http://localhost:3000
```

## 5. Test It! (30 seconds)

Open browser to: **http://localhost:3000**

1. Click "Sign Up"
2. Enter email: `test@example.com`
3. Password: `password123`
4. Click "Create Project"
5. Go to "Code Review"
6. Paste code and click "Run Review"

Done! 🎉

## Useful Commands

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Check code quality
npm test          # Run tests
```

### Backend
```bash
python main.py              # Start server
python -m pytest           # Run tests
python -m pytest -v        # Verbose tests
# Open: http://localhost:8000/docs for API docs
```

### Database (with PostgreSQL)
```bash
# Create database
createdb codeflow_ai

# Update .env
DATABASE_URL=postgresql://user:password@localhost:5432/codeflow_ai

# Restart backend - tables created automatically
```

## Troubleshooting

### "Cannot find module"
```bash
npm install
```

### "ModuleNotFoundError: fastapi"
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Port already in use
```bash
# Change port in backend/main.py line 47:
# uvicorn.run(app, host="0.0.0.0", port=8001)

# Update frontend .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Database connection error
- Check PostgreSQL is running
- Update DATABASE_URL in backend/.env
- Restart backend

### Still stuck?
1. Read SETUP.md for detailed guide
2. Check console logs (browser DevTools & terminal)
3. Visit http://localhost:8000/docs for API info
4. Check GitHub issues

## What's Running

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Next.js app |
| Backend | http://localhost:8000 | FastAPI server |
| API Docs | http://localhost:8000/docs | Interactive API docs |
| Database | localhost:5432 | PostgreSQL (if using) |

## Next Steps

After verifying it works:

1. **Read SETUP.md** - Detailed setup guide
2. **Read ARCHITECTURE.md** - How it all works
3. **Read DEPLOYMENT_GUIDE.md** - Deploy to production
4. **Explore API** - Visit http://localhost:8000/docs

## Key Files to Know

```
app/                          # Frontend (Next.js)
├── auth/login/page.tsx       # Login page
├── auth/signup/page.tsx      # Sign up page
├── dashboard/page.jsx        # User dashboard
├── review/page.jsx           # Code review page
└── projects/page.jsx         # Projects management

lib/
├── api-client.ts             # API calls
├── auth-context.tsx          # Authentication state
└── protected-page.tsx        # Protected routes

backend/
├── main.py                   # Backend entry point
├── app/
│   ├── models.py            # Database models
│   ├── schemas.py           # Data validation
│   ├── database.py          # DB setup
│   ├── routes/              # API endpoints
│   └── services/            # Business logic
└── requirements.txt         # Python dependencies
```

## Architecture in 30 Seconds

```
Browser (Next.js)
       ↓ HTTPS
FastAPI Backend
       ↓ SQL
PostgreSQL Database
       ↓ API Call
Groq AI Service
```

- **Frontend**: Handles UI, authentication, displays results
- **Backend**: Validates requests, calls Groq API, stores data
- **Database**: Persists user data, reviews, and projects
- **Groq**: Analyzes code using AI

## Deployment Quick Links

When ready to deploy:

- Frontend: [Deploy to Vercel](https://vercel.com/import)
- Backend: [Deploy to Render](https://render.com)
- Database: [Create Neon Database](https://neon.tech)

See DEPLOYMENT_GUIDE.md for step-by-step instructions.

---

**That's it! You're ready to develop. Happy coding!**

For issues: Check SETUP.md or read console logs carefully.
