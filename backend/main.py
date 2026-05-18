from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routes import auth, projects, reviews, docs

# Initialize FastAPI app
app = FastAPI(
    title="Codeflow AI API",
    description="Production API for code review and documentation generation",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
@app.on_event("startup")
async def startup():
    await init_db()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])
app.include_router(docs.router, prefix="/api/docs", tags=["docs"])

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Codeflow AI API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
