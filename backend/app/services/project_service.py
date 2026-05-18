from sqlalchemy.orm import Session
from app.models import Project, User
from app.schemas import ProjectCreate, ProjectUpdate

class ProjectService:
    
    @staticmethod
    def create_project(db: Session, user_id: int, project_create: ProjectCreate) -> Project:
        """Create a new project for a user"""
        db_project = Project(
            user_id=user_id,
            name=project_create.name,
            description=project_create.description
        )
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project
    
    @staticmethod
    def get_user_projects(db: Session, user_id: int) -> list:
        """Get all projects for a user"""
        return db.query(Project).filter(Project.user_id == user_id).all()
    
    @staticmethod
    def get_project(db: Session, project_id: int, user_id: int) -> Project:
        """Get a project (verify ownership)"""
        return db.query(Project).filter(
            Project.id == project_id,
            Project.user_id == user_id
        ).first()
    
    @staticmethod
    def update_project(db: Session, project_id: int, user_id: int, project_update: ProjectUpdate) -> Project:
        """Update a project"""
        db_project = db.query(Project).filter(
            Project.id == project_id,
            Project.user_id == user_id
        ).first()
        
        if not db_project:
            return None
        
        if project_update.name is not None:
            db_project.name = project_update.name
        if project_update.description is not None:
            db_project.description = project_update.description
        
        db.commit()
        db.refresh(db_project)
        return db_project
    
    @staticmethod
    def delete_project(db: Session, project_id: int, user_id: int) -> bool:
        """Delete a project"""
        db_project = db.query(Project).filter(
            Project.id == project_id,
            Project.user_id == user_id
        ).first()
        
        if not db_project:
            return False
        
        db.delete(db_project)
        db.commit()
        return True
