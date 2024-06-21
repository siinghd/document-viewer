from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
import os
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()

DOCUMENTS_FOLDER = "static/documents"

@router.get("/documents/", response_model=List[schemas.Document])
def read_documents(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    documents = crud.get_documents(db, skip=skip, limit=limit)
    return documents

@router.get("/documents/{document_id}", response_model=schemas.Document)
def read_document(document_id: int, db: Session = Depends(get_db)):
    db_document = crud.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document

@router.get("/documents/{document_id}/file", response_class=FileResponse)
def get_document_file(document_id: int, db: Session = Depends(get_db)):
    db_document = crud.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")

    file_path = os.path.join(DOCUMENTS_FOLDER, db_document.name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(path=file_path, filename=db_document.name, media_type='application/pdf')

@router.post("/documents/{project_id}/", response_model=schemas.Document)
def create_document_for_project(project_id: int, document: schemas.DocumentCreate, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return crud.create_document(db=db, document=document, user_id=db_project.owner_id)

@router.post("/documents/upload/{project_id}/")
async def upload_file(project_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")

    db_user = crud.get_user(db, user_id=db_project.owner_id)
    unique_filename = f"{db_user.email}_{file.filename}"
    file_location = os.path.join(DOCUMENTS_FOLDER, unique_filename)
    
    with open(file_location, "wb") as file_object:
        file_object.write(await file.read())

    metadata = {
        "criteria_1": {"score": 35, "justification": "Justification for the score"},
        "criteria_2": {"score": 45, "justification": "Justification for the score"},
        "criteria_3": {"score": 35, "justification": "Justification for the score"},
        "criteria_4": {"score": 45, "justification": "Justification for the score"},
        "criteria_5": {"score": 30, "justification": "Justification for the score"},
        "criteria_6": {"score": 30, "justification": "Justification for the score"},
    }

    document = schemas.DocumentCreate(
        name=unique_filename,
        overall_score=40,
        summary="Document summary here",
        feedback="Our feedback here",
        assessment_data=metadata,
        project_id=project_id
    )

    return crud.create_document(db=db, document=document, user_id=db_project.owner_id)

@router.delete("/documents/{document_id}", response_model=schemas.Document)
def delete_document(document_id: int, db: Session = Depends(get_db)):
    db_document = crud.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(db_document)
    db.commit()
    return db_document
