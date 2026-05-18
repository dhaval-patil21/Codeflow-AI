# Migration Guide: localStorage to Full-Stack Architecture

This document explains what changed when converting from a localStorage-based app to a production-ready full-stack SaaS.

## What Changed

### Before: localStorage-based architecture
```
┌─────────────────────────────┐
│   Next.js Frontend Only      │
│                             │
│  - Reviews in localStorage  │
│  - Groq API called from    │
│    frontend (keys exposed) │
│  - No authentication       │
│  - No multi-user support   │
│  - No data persistence     │
└─────────────────────────────┘
```

**Problems:**
- Groq API key exposed in browser
- No user accounts or authentication
- Data lost when browser storage cleared
- Single browser per user only
- No backend for scaling
- Vulnerable to XSS attacks

### After: Full-stack SaaS architecture
```
┌─────────────────────────┐         ┌──────────────────┐
│   Next.js Frontend      │◄───────►│   FastAPI        │
│ (Vercel)                │         │   Backend        │
│                         │         │   (Render)       │
│ - Protected routes      │         │                  │
│ - Auth context          │         │ - JWT validation │
│ - API client            │         │ - DB models      │
│ - No sensitive data     │         │ - Groq service   │
└─────────────────────────┘         └────────┬─────────┘
                                             │
                                    ┌────────▼──────────┐
                                    │  PostgreSQL DB    │
                                    │  (Neon)           │
                                    └───────────────────┘
```

**Benefits:**
- Secure API key management (backend only)
- Multi-user support with authentication
- Data persistence across sessions
- Scalable architecture
- Team collaboration ready
- Production deployment ready

## Migration Path

If you had data in localStorage, here's how to handle it:

### Option 1: Start Fresh (Recommended)
1. New users sign up
2. No data migration needed
3. All data stored in PostgreSQL
4. Clean start with full-stack benefits

### Option 2: Manual Data Migration
If you need to preserve old reviews:

1. Export localStorage data before switching:
```javascript
const reviews = JSON.parse(localStorage.getItem('codeflow_reviews') || '[]');
const docs = JSON.parse(localStorage.getItem('codeflow_docs') || '[]');
// Save these somewhere
```

2. After setup, import via API:
```javascript
// Create project first
const project = await fetch('/api/projects', {
  method: 'POST',
  body: JSON.stringify({ name: 'Imported Reviews' })
});

// Then create reviews
reviews.forEach(review => {
  fetch('/api/reviews/analyze', {
    method: 'POST',
    body: JSON.stringify({
      project_id: project.id,
      code: review.code,
      language: review.language
    })
  });
});
```

## Code Changes

### Frontend - Removed
```javascript
// ❌ No longer used
import { addReview, getReviews } from '@/lib/localStorage';

// ❌ Direct localStorage calls removed
const reviews = JSON.parse(localStorage.getItem('codeflow_reviews'));

// ❌ No direct API key exposure
const response = await fetch('https://api.groq.com/...', {
  headers: { 'Authorization': 'Bearer ' + GROQ_KEY }
});
```

### Frontend - Added
```javascript
// ✅ New imports
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';

// ✅ Authentication required
const { isAuthenticated, user } = useAuth();

// ✅ API calls through backend
const response = await apiClient.analyzeCode(projectId, code, language);

// ✅ Protected routes
if (!isAuthenticated) {
  router.push('/auth/login');
}
```

### API Structure

**Old Next.js API Routes** (before):
```javascript
// app/api/review/route.js - Called Groq directly
export async function POST(req) {
  const { code, language } = await req.json();
  const response = await groq.review(code, language); // ❌ Exposed key
}
```

**New FastAPI Routes** (after):
```python
# backend/app/routes/reviews.py - Secure backend call
@router.post("/analyze")
async def analyze_code_endpoint(
    project_id: int,
    review_create: ReviewCreate,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    # ✅ Validate user
    user = get_current_user(authorization, db)
    # ✅ Call Groq from backend
    analysis = await analyze_code(review_create.code, review_create.language)
    # ✅ Save to database
    db_review = Review(..., project_id=project_id, ...)
```

## Breaking Changes for Users

### Before Sign-up
- Users could review code without account
- Data stored locally in browser

### After Sign-up Required
- Users must sign up first
- Each session persists across devices
- Data stored securely in database
- Access from any browser with credentials

### Data Structure Changes

**Old localStorage structure:**
```json
{
  "codeflow_reviews": [
    {
      "id": "uuid",
      "title": "JavaScript Code Review",
      "code": "...",
      "language": "javascript",
      "score": 75,
      "createdAt": 1234567890
    }
  ]
}
```

**New database structure:**
```json
{
  "id": 1,
  "project_id": 1,
  "code": "...",
  "language": "javascript",
  "score": 75,
  "analysis_json": { "full": "groq", "response": "here" },
  "created_at": "2024-01-01T00:00:00Z"
}
```

## Environment Changes

### Old Setup
```bash
# Frontend only
GROQ_API_KEY=... (exposed in browser) ❌
```

### New Setup
```bash
# Backend (secure)
DATABASE_URL=postgresql://...
GROQ_API_KEY=... (backend only) ✅
SECRET_KEY=... (for JWT) ✅

# Frontend (safe)
NEXT_PUBLIC_API_URL=http://localhost:8000
# NO sensitive keys here
```

## User Experience Changes

### Old Flow
1. Visit app
2. Paste code
3. Click "Review"
4. Results appear (lost on refresh)

### New Flow
1. Sign up / Log in
2. Create project
3. Select project
4. Paste code
5. Click "Review"
6. Results saved permanently
7. View history in dashboard
8. Access from any device

## Performance Implications

### Improved
- ✅ No localStorage size limits
- ✅ Faster subsequent access (database lookup)
- ✅ Concurrent requests safe
- ✅ Server-side caching possible

### Slightly Slower
- ⚠️ Network latency to backend
- ⚠️ Database queries (minimal impact)

**Trade-off**: Worth it for security and features

## Testing Changes

### Old Tests
```javascript
// ❌ Testing localStorage
test('should save review to localStorage', () => {
  // Direct localStorage access
});
```

### New Tests
```javascript
// ✅ Testing API integration
test('should send review to backend', async () => {
  // Mock API calls
  await apiClient.analyzeCode(projectId, code, language);
  // Verify API was called
});
```

## Authentication Differences

### Old: No Authentication
- Anyone could access the app
- Multiple users on same device share data
- No user identity tracking

### New: JWT Authentication
- Email/password signup and login
- Each user has isolated data
- Tokens expire in 30 minutes
- Refresh tokens available

## Database Migration Path (If Needed)

If you need to migrate existing PostgreSQL data:

1. **Export current data:**
```bash
pg_dump old_database > backup.sql
```

2. **Create new Neon database:**
Visit neon.tech and create new project

3. **Run migrations:**
```bash
# Backend models create tables automatically
python main.py
```

4. **Import old data (if compatible):**
```bash
psql new_database < backup.sql
```

5. **Verify data:**
```bash
psql new_database
\dt  # List tables
SELECT COUNT(*) FROM users;
```

## Rollback Plan

If you need to revert to localStorage:

1. All old code is still available in git history
2. Checkout previous commit: `git checkout commit-hash`
3. Run old version locally
4. Data might be cached in localStorage

**Note:** This is only a development rollback option.

## Common Questions

### Q: Can old users access their data?
**A:** No. They must sign up as new users with the new system. Data starts fresh.

### Q: Are my API keys now safe?
**A:** Yes! Keys are stored only on the backend. Frontend never sees them.

### Q: Can I still use it offline?
**A:** No, it requires internet connection for backend API. Use a service worker for offline caching (future feature).

### Q: How do I handle data privacy?
**A:** All user data is in PostgreSQL on Neon. You own the data. Add terms of service as needed.

### Q: Is my data encrypted?
**A:** In transit (HTTPS). At rest on Neon. You can add field-level encryption if needed.

### Q: Can users export their data?
**A:** Yes! Add a CSV export endpoint. See future improvements in ARCHITECTURE.md.

## Next Steps

1. ✅ Setup local development (SETUP.md)
2. ✅ Test authentication flow
3. ✅ Test code review process
4. ✅ Test project management
5. 🚀 Deploy to production (DEPLOYMENT_GUIDE.md)
6. 📊 Monitor and improve

## Support

If you encounter issues during migration:
1. Check SETUP.md for local development
2. Check DEPLOYMENT_GUIDE.md for production
3. Check console logs and backend logs
4. Verify environment variables
5. Check API docs at `localhost:8000/docs`
