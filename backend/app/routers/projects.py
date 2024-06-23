from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()

@router.get("/projects/", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects

@router.get("/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@router.post("/projects/{user_id}/", response_model=schemas.Project)
def create_project_for_user(user_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_project(db=db, project=project, user_id=user_id)

@router.get("/projects/{project_id}/documents", response_model=List[schemas.Document])
def read_project_documents(
    project_id: int,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    documents = crud.get_documents_for_project(db, project_id=project_id, skip=skip, limit=limit)
    return documents

@router.get("/projects/{project_id}/stats", response_model=schemas.ProjectStats)
def get_project_stats(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    documents = db_project.documents

    total_score = sum(doc.overall_score for doc in documents)
    percentage_assessed = f"{len(documents)}/{len(documents)}" if documents else "0/0"
    
    submission_quality = {
        "0-10": sum(1 for doc in documents if 0 <= doc.overall_score <= 10),
        "11-20": sum(1 for doc in documents if 11 <= doc.overall_score <= 20),
        "21-30": sum(1 for doc in documents if 21 <= doc.overall_score <= 30),
        "31-40": sum(1 for doc in documents if 31 <= doc.overall_score <= 40),
        "41-50": sum(1 for doc in documents if 41 <= doc.overall_score <= 50),
        "51-60": sum(1 for doc in documents if 51 <= doc.overall_score <= 60),
        "61-70": sum(1 for doc in documents if 61 <= doc.overall_score <= 70),
        "71-80": sum(1 for doc in documents if 71 <= doc.overall_score <= 80),
        "81-90": sum(1 for doc in documents if 81 <= doc.overall_score <= 90),
        "91-100": sum(1 for doc in documents if 91 <= doc.overall_score <= 100)
    }
    
    submission_quality_detail = {}
    for doc in documents:
        for criterion_key, criterion in doc.assessment_data.items():
            if criterion["name"] not in submission_quality_detail:
                submission_quality_detail[criterion["name"]] = 0
            submission_quality_detail[criterion["name"]] += criterion["score"]
    
    return {
        "total_score": total_score,
        "percentage_assessed": percentage_assessed,
        "submission_quality": submission_quality,
        "submission_quality_detail": submission_quality_detail,
        "number_of_documents": len(documents)
    }
