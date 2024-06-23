from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, FastAPI, BackgroundTasks
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
import os
import time
import random
from .. import crud, models, schemas
from ..database import get_db
import asyncio
app = FastAPI()

async def process_document(document_id: int, db: Session):
    document = db.query(models.Document).filter(models.Document.id == document_id).first()

    if document is None:
        print(f"Document with id {document_id} not found.")
        return

    await asyncio.sleep(5)  #  Simulate processing time of 5 seconds, remove this line in production

    document.status = models.DocumentStatus.EVALUATING
    db.commit()
    db.refresh(document)

    criteria_names = [
        "Relevance to Critical Technology Areas",
        "Impact and Value",
        "Innovation",
        "Connection to U.S DoD Programs",
        "Commercial Potential",
        "Technical Feasibility"
    ]

    metadata = {
        f"criteria_{i+1}": {
            "name": criteria_names[i],
            "score": random.randint(20, 100),
            "justification": f"Justification for {criteria_names[i]}",
            "weightage": round(random.uniform(0.1, 0.5), 2)
        } for i in range(6)
    }

    result_summary = [
        {
            "name": criteria_names[i],
            "score": metadata[f"criteria_{i+1}"]["score"],
            "weightage": metadata[f"criteria_{i+1}"]["weightage"]
        } for i in range(6)
    ]

    overall_score = int(sum([criterion["score"] for criterion in metadata.values()]) / len(criteria_names))

    document.overall_score = overall_score
    document.assessment_data = metadata
    document.result_summary = result_summary
    document.status = models.DocumentStatus.EVALUATED

    db.commit()
    db.refresh(document)

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
    db_project = crud.get_project(db, project_id=db_document.project_id)
    document_data = schemas.Document.from_orm(db_document).dict()
    document_data["project"] = schemas.Project.from_orm(db_project).dict()
    return document_data

@router.get("/documents/{document_id}/file", response_class=FileResponse)
def get_document_file(document_id: int, db: Session = Depends(get_db)):
    db_document = crud.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")

    file_path = os.path.join(DOCUMENTS_FOLDER, db_document.name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(path=file_path, filename=db_document.name, media_type='application/pdf')

@router.post("/documents/upload/{project_id}/")
async def upload_file(
    project_id: int, 
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")

    db_user = crud.get_user(db, user_id=db_project.owner_id)
    timestamp = int(time.time())
    unique_filename = f"{project_id}_{db_user.email}_{timestamp}_{file.filename}"
    file_location = os.path.join(DOCUMENTS_FOLDER, unique_filename)
    
    with open(file_location, "wb") as file_object:
        file_object.write(await file.read())

    document = models.Document(
        name=unique_filename,
        overall_score=0,  
        summary="Document summary here",
        feedback="Our feedback here",
        assessment_data={
            "criteria_1": {"name": "", "score": 0, "justification": "", "weightage": 0},
            "criteria_2": {"name": "", "score": 0, "justification": "", "weightage": 0},
            "criteria_3": {"name": "", "score": 0, "justification": "", "weightage": 0},
            "criteria_4": {"name": "", "score": 0, "justification": "", "weightage": 0},
            "criteria_5": {"name": "", "score": 0, "justification": "", "weightage": 0},
            "criteria_6": {"name": "", "score": 0, "justification": "", "weightage": 0}
        },
        result_summary=[],
        project_id=project_id,
        user_id=db_project.owner_id,
        status= models.DocumentStatus.PENDING
    )
    
    db.add(document)
    db.commit()
    db.refresh(document)

    background_tasks.add_task(process_document, document.id, db)

    return schemas.Document.from_orm(document)

@router.delete("/documents/{document_id}", response_model=schemas.Document)
def delete_document(document_id: int, db: Session = Depends(get_db)):
    db_document = crud.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(db_document)
    db.commit()
    return db_document

