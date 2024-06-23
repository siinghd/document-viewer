from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
from datetime import datetime

class Criterion(BaseModel):
    name: str
    score: int
    justification: str
    weightage: float

class AssessmentData(BaseModel):
    criteria_1: Criterion
    criteria_2: Criterion
    criteria_3: Criterion
    criteria_4: Criterion
    criteria_5: Criterion
    criteria_6: Criterion

class ProjectBase(BaseModel):
    name: str

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class DocumentBase(BaseModel):
    name: str
    overall_score: int
    summary: str
    feedback: str
    assessment_data: AssessmentData
    result_summary: List[Dict[str, Any]]

class DocumentCreate(DocumentBase):
    project_id: int
    user_id: int

class Document(DocumentBase):
    id: int
    project_id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ReducedDocument(BaseModel):
    id: int
    name: str
    overall_score: int

    model_config = ConfigDict(from_attributes=True)

class UserBase(BaseModel):
    email: str
    fullname: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    projects: List[Project] = []
    documents: List[Document] = []

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ProjectStats(BaseModel):
    total_score: int
    percentage_assessed: str
    submission_quality: Dict[str, int]
    submission_quality_detail: Dict[str, int]
    number_of_documents: int
