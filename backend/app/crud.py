from sqlalchemy.orm import Session, joinedload
from . import models, schemas
import random
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = user.password  # Hash the password here, for production
    db_user = models.User(email=user.email, fullname=user.fullname, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id=user_id)
    if db_user:
        for project in db_user.projects:
            for document in project.documents:
                db.delete(document)
            db.delete(project)
        db.delete(db_user)
        db.commit()
    return db_user

def get_project(db: Session, project_id: int):
    return db.query(models.Project).filter(models.Project.id == project_id).first()

def get_projects(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Project).offset(skip).limit(limit).all()

def create_project(db: Session, project: schemas.ProjectCreate, user_id: int):
    db_project = models.Project(name=project.name, owner_id=user_id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_documents_for_project(db: Session, project_id: int, skip: int = 0, limit: int = 10):
    return (
        db.query(models.Document)
        .filter(models.Document.project_id == project_id)
        .options(joinedload(models.Document.user))
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_document(db: Session, document_id: int):
    return db.query(models.Document).filter(models.Document.id == document_id).options(joinedload(models.Document.user)).first()

def get_documents(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Document).offset(skip).limit(limit).all()

def create_document(db: Session, document: schemas.DocumentCreate, user_id: int):
    db_document = models.Document(
        name=document.name,
        overall_score=document.overall_score,
        summary=document.summary,
        feedback=document.feedback,
        assessment_data=document.assessment_data.model_dump(),
        result_summary=document.result_summary,
        project_id=document.project_id,
        user_id=user_id,
        status=random.choice(["Pending", "Evaluating", "Evaluated", "Needs Review", "Approved", "Rejected"])
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def delete_document(db: Session, document_id: int):
    db_document = get_document(db, document_id=document_id)
    if db_document:
        db.delete(db_document)
        db.commit()
    return db_document
