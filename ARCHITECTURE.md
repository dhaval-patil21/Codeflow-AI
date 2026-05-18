# Codeflow AI - Full Stack Architecture

## System Overview

Codeflow AI is a production-ready SaaS application for AI-powered code review and documentation generation. It follows a modern full-stack architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────────┐
│                      User's Browser                             │
│                    (Next.js Frontend)                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Pages: Home, Dashboard, Review, Projects, Auth Pages   │  │
│  │  Components: CodeEditor, LanguageSelector, etc.         │  │
│  │  Auth: AuthContext + JWT Token Management              │  │
│  │  API: Client-side API calls (no sensitive data)        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                         ↓ HTTPS ↓                               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Vercel CDN / Hosting                                    │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

                           ↓ HTTP/HTTPS ↓

┌─────────────────────────────────────────────────────────────────┐
│                    FastAPI Backend                              │
│                   (Render Deployment)                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Routes: /api/auth, /api/projects, /api/reviews, /api/ │  │
│  │  docs                                                   │  │
│  │  Security: JWT validation, CORS, Input validation      │  │
│  │  Services: AuthService, ProjectService, GroqService   │  │
│  │  Database: ORM models for Users, Projects, Reviews     │  │
│  └─────────────────────────────────────────────────────────┘  │
│                         ↓↓ HTTPS ↓↓                             │
│          ┌──────────────┴─────────────────────┐               │
│          ↓                                      ↓               │
│   ┌─────────────────┐                  ┌──────────────────┐  │
│   │  PostgreSQL DB  │                  │  Groq API        │  │
│   │  (Neon)         │                  │  (AI Models)     │  │
│   └─────────────────┘                  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Core Technologies

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS
- **State Management**: React Context API + AuthContext
- **HTTP Client**: Fetch API
- **Language**: TypeScript/JavaScript

### Backend
- **Framework**: FastAPI (Python)
- **Web Server**: Uvicorn
- **Database ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Authentication**: JWT (python-jose) + bcrypt
- **AI Integration**: Groq SDK

### Database
- **Type**: PostgreSQL
- **Schema**: 4 main tables (Users, Projects, Reviews, GeneratedDocs)
- **Provider**: Neon (serverless PostgreSQL)

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Neon

## Data Flow

### User Registration & Login
```
1. User fills signup form
2. Frontend sends POST /api/auth/signup
3. Backend:
   - Validates email format
   - Hashes password with bcrypt
   - Creates user in database
   - Generates JWT token
4. Frontend stores token in localStorage
5. Frontend redirects to dashboard
```

### Code Review Flow
```
1. User selects project
2. User pastes/uploads code
3. User clicks "Run Review"
4. Frontend sends POST /api/reviews/analyze with code
5. Backend:
   - Validates project ownership
   - Calls Groq API with code
   - Parses Groq response
   - Stores review in database
   - Returns analysis to frontend
6. Frontend displays results
7. Review persisted in database (not localStorage)
```

### Project Management
```
1. User navigates to /projects
2. Frontend fetches GET /api/projects
3. Backend queries database, filters by user_id
4. Frontend displays projects in grid
5. User can create, update, or delete projects
6. All changes persisted to database
```

## Authentication & Security

### JWT Token Flow
```
Signup/Login
    ↓
Generate JWT (contains user_id)
    ↓
Store in localStorage
    ↓
Include in every API request header
    ↓
Backend verifies signature
    ↓
Extract user_id from token
    ↓
Enforce ownership checks
```

### Security Best Practices Implemented
- ✅ Password hashing with bcrypt (not stored in plaintext)
- ✅ JWT tokens with expiration (30 minutes)
- ✅ Secure token validation on every protected route
- ✅ CORS configured per environment
- ✅ SQL injection prevention (SQLAlchemy ORM)
- ✅ API keys never exposed to frontend
- ✅ Environment-based configuration
- ✅ Input validation with Pydantic schemas

## Database Schema

### Users Table
```sql
id (PK)
email (UNIQUE)
password_hash
created_at
updated_at
```

### Projects Table
```sql
id (PK)
user_id (FK → Users)
name
description
created_at
updated_at
```

### Reviews Table
```sql
id (PK)
project_id (FK → Projects)
code
language
score
analysis_json (stores full Groq response)
created_at
```

### GeneratedDocs Table
```sql
id (PK)
project_id (FK → Projects)
code
language
content
created_at
```

## API Design

### RESTful Conventions
- `POST` for creation
- `GET` for retrieval
- `PUT` for updates
- `DELETE` for deletion
- Consistent status codes
- JSON request/response format

### Response Format
Success:
```json
{
  "id": 1,
  "name": "Project Name",
  "created_at": "2024-01-01T00:00:00"
}
```

Error:
```json
{
  "detail": "Error message"
}
```

## Deployment Architecture

### Development
```
localhost:3000 ← → localhost:8000
Frontend          Backend
(hot reload)      (auto-reload)
```

### Production
```
vercel.app (frontend) ← → render.com (backend)
                               ↓
                         neon.tech (database)
```

## Performance Considerations

### Frontend
- Code splitting with Next.js
- Image optimization
- Lazy component loading
- Token caching in localStorage
- SWR/React Query patterns ready

### Backend
- Connection pooling for database
- Async/await throughout
- Request validation prevents bad data
- Groq API called asynchronously
- Future: Caching with Redis

### Database
- Indexes on frequently queried columns
- Foreign key relationships
- Proper table normalization
- Connection pooling via SQLAlchemy

## Scalability Path

### Current Setup (Single User)
- Simple authentication
- Direct database queries
- Single API instance

### To Scale (Multiple Users)
1. Add Stripe for payments
2. Implement team/organization model
3. Add caching layer (Redis)
4. Database read replicas
5. API rate limiting
6. CDN for static assets
7. Email service (SendGrid)
8. Analytics (PostHog)
9. Error tracking (Sentry)
10. Load testing & optimization

## Monitoring & Logging

### What to Monitor
- API response times
- Error rates per endpoint
- Database query performance
- Token validation failures
- API key usage (Groq)

### Logging Strategy
- Backend logs all requests
- Log authentication attempts
- Log API call durations
- Log database errors
- Frontend logs to console

### Future Additions
- Sentry for error tracking
- PostHog for analytics
- Custom logging service
- Prometheus metrics
- Grafana dashboards

## Extension Points

### Easy Additions
- New code review logic (modify groq_service.py)
- New project metadata fields (extend models.py)
- Additional API endpoints (add to routes/)
- UI customization (Tailwind classes)

### Moderate Additions
- Team/organization support (schema changes)
- Email notifications (add email service)
- Payment processing (Stripe integration)
- Real-time updates (WebSockets)

### Complex Additions
- Multi-tenancy (database isolation)
- Machine learning models
- Advanced analytics
- Mobile app (React Native)

## Development Workflow

1. **Feature development**: Create feature branch
2. **Testing**: Test locally on both frontend and backend
3. **Git commit**: Push to GitHub
4. **Code review**: Review before merging to main
5. **Deployment**: 
   - Frontend auto-deploys from Vercel
   - Backend: Trigger redeploy on Render
   - Update environment variables if needed
6. **Monitoring**: Check logs and metrics

## Future Improvements

### High Priority
- [ ] Email verification on signup
- [ ] Forgot password flow
- [ ] User profile page
- [ ] Project settings/collaboration
- [ ] Review history export

### Medium Priority
- [ ] Team accounts
- [ ] Payment system (Stripe)
- [ ] API usage analytics
- [ ] Code review templates
- [ ] Integration with GitHub

### Low Priority
- [ ] Mobile app
- [ ] Custom AI model training
- [ ] Advanced IDE integrations
- [ ] Real-time collaboration

## Troubleshooting Guide

See specific sections in SETUP.md and DEPLOYMENT_GUIDE.md for detailed troubleshooting.

Key files:
- Frontend errors → Check browser console
- Backend errors → Check terminal output
- Database errors → Check PostgreSQL logs
- API errors → Check `/api/auth/me` endpoint
