from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import Review
from app.schemas import ReviewCreate, ReviewResponse
from app.services.groq_service import analyze_code
from app.routes.auth import get_current_user

router = APIRouter()

@router.post("/analyze", response_model=ReviewResponse)
async def analyze_code_endpoint(
    project_id: int,
    review_create: ReviewCreate,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Analyze code and save review"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    # Verify project ownership
    from app.services.project_service import ProjectService
    project = ProjectService.get_project(db, project_id, user.id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Analyze code using Groq
    analysis = await analyze_code(review_create.code, review_create.language)
    
    # Save review to database
    score = analysis.get("score", 0) if isinstance(analysis, dict) else 0
    
    db_review = Review(
        project_id=project_id,
        code=review_create.code,
        language=review_create.language,
        score=score,
        analysis_json=analysis
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    
    return db_review

@router.get("", response_model=list[ReviewResponse])
async def get_reviews(
    project_id: Optional[int] = None,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Get reviews for user's projects"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    query = db.query(Review).join(Review.project)
    
    if project_id:
        # Verify project ownership
        from app.services.project_service import ProjectService
        project = ProjectService.get_project(db, project_id, user.id)
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )
        query = query.filter(Review.project_id == project_id)
    else:
        # Filter to user's projects only
        from app.models import Project
        query = query.filter(Project.user_id == user.id)
    
    reviews = query.all()
    return reviews

@router.get("/{review_id}", response_model=ReviewResponse)
async def get_review(
    review_id: int,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Get a specific review"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    review = db.query(Review).join(Review.project).filter(
        Review.id == review_id
    ).first()
    
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Verify ownership
    if review.project.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    return review

@router.delete("/{review_id}")
async def delete_review(
    review_id: int,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Delete a review"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    review = db.query(Review).join(Review.project).filter(
        Review.id == review_id
    ).first()
    
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Verify ownership
    if review.project.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    db.delete(review)
    db.commit()
    
    return {"message": "Review deleted successfully"}
