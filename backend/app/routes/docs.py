from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import GeneratedDoc
from app.schemas import DocCreate, DocResponse
from app.services.groq_service import generate_documentation
from app.routes.auth import get_current_user

router = APIRouter()

@router.post("/generate", response_model=DocResponse)
async def generate_doc_endpoint(
    project_id: int,
    doc_create: DocCreate,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Generate documentation for code"""
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
    
    # Generate documentation using Groq
    content = await generate_documentation(doc_create.code, doc_create.language)
    
    # Save doc to database
    db_doc = GeneratedDoc(
        project_id=project_id,
        code=doc_create.code,
        language=doc_create.language,
        content=content
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    
    return db_doc

@router.get("", response_model=list[DocResponse])
async def get_docs(
    project_id: Optional[int] = None,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Get generated docs for user's projects"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    query = db.query(GeneratedDoc).join(GeneratedDoc.project)
    
    if project_id:
        # Verify project ownership
        from app.services.project_service import ProjectService
        project = ProjectService.get_project(db, project_id, user.id)
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )
        query = query.filter(GeneratedDoc.project_id == project_id)
    else:
        # Filter to user's projects only
        from app.models import Project
        query = query.filter(Project.user_id == user.id)
    
    docs = query.all()
    return docs

@router.get("/{doc_id}", response_model=DocResponse)
async def get_doc(
    doc_id: int,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Get a specific doc"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    doc = db.query(GeneratedDoc).join(GeneratedDoc.project).filter(
        GeneratedDoc.id == doc_id
    ).first()
    
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doc not found"
        )
    
    # Verify ownership
    if doc.project.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    return doc

@router.delete("/{doc_id}")
async def delete_doc(
    doc_id: int,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Delete a doc"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    doc = db.query(GeneratedDoc).join(GeneratedDoc.project).filter(
        GeneratedDoc.id == doc_id
    ).first()
    
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doc not found"
        )
    
    # Verify ownership
    if doc.project.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    db.delete(doc)
    db.commit()
    
    return {"message": "Doc deleted successfully"}
