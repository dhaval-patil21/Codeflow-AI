from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.schemas import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import ProjectService
from app.routes.auth import get_current_user

router = APIRouter()

@router.post("", response_model=ProjectResponse)
async def create_project(
    project_create: ProjectCreate,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Create a new project"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    project = ProjectService.create_project(db, user.id, project_create)
    return project

@router.get("", response_model=list[ProjectResponse])
async def get_projects(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Get all projects for current user"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    projects = ProjectService.get_user_projects(db, user.id)
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: int,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Get a specific project"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    project = ProjectService.get_project(db, project_id, user.id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Update a project"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    project = ProjectService.update_project(db, project_id, user.id, project_update)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return project

@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """Delete a project"""
    token = authorization.replace("Bearer ", "") if authorization else None
    user = get_current_user(token, db)
    
    success = ProjectService.delete_project(db, project_id, user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return {"message": "Project deleted successfully"}
