from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional

class Criterion(BaseModel):
    score: int
    justification: str

class AssessmentData(BaseModel):
    criteria_1: Criterion
    criteria_2: Criterion
    criteria_3: Criterion
    criteria_4: Criterion
    criteria_5: Criterion
    criteria_6: Criterion

class DocumentBase(BaseModel):
    name: str
    overall_score: int
    summary: str
    feedback: str
    assessment_data: AssessmentData

class DocumentCreate(DocumentBase):
    project_id: int

class Document(DocumentBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

class ProjectBase(BaseModel):
    name: str

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    documents: List[Document] = []

    model_config = ConfigDict(from_attributes=True)

class UserBase(BaseModel):
    email: str
    fullname: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    projects: List[Project] = []

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
