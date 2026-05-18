from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.database import get_db
from app.schemas import UserCreate, LoginRequest, LoginResponse, UserResponse
from app.services.auth_service import AuthService
from app.auth.jwt import create_access_token, verify_token

router = APIRouter()

def get_current_user(token: str = None, db: Session = Depends(get_db)):
    """Dependency to get current authenticated user"""
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user = AuthService.get_user_by_id(db, int(user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return user

@router.post("/signup", response_model=LoginResponse)
async def signup(user_create: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    try:
        user = AuthService.create_user(db, user_create)
        access_token = create_access_token(data={"sub": str(user.id)})
        
        return LoginResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse(
                id=user.id,
                email=user.email,
                created_at=user.created_at
            )
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/login", response_model=LoginResponse)
async def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    """Login user and return JWT token"""
    try:
        user = AuthService.authenticate_user(db, login_request.email, login_request.password)
        access_token = create_access_token(data={"sub": str(user.id)})
        
        return LoginResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse(
                id=user.id,
                email=user.email,
                created_at=user.created_at
            )
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    token: str,
    db: Session = Depends(get_db)
):
    """Get current user info"""
    user = get_current_user(token, db)
    return UserResponse(
        id=user.id,
        email=user.email,
        created_at=user.created_at
    )

@router.post("/refresh")
async def refresh_token(token: str, db: Session = Depends(get_db)):
    """Refresh access token"""
    user = get_current_user(token, db)
    new_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": new_token,
        "token_type": "bearer"
    }
