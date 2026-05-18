from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenRefreshResponse(BaseModel):
    access_token: str
    token_type: str

# Project Schemas
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Review Schemas
class ReviewCreate(BaseModel):
    code: str
    language: str

class ReviewResponse(BaseModel):
    id: int
    project_id: int
    code: str
    language: str
    score: Optional[float]
    analysis_json: Optional[Dict[str, Any]]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Documentation Schemas
class DocCreate(BaseModel):
    code: str
    language: str

class DocResponse(BaseModel):
    id: int
    project_id: int
    code: str
    language: str
    content: str
    created_at: datetime
    
    class Config:
        from_attributes = True
