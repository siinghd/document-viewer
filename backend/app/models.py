from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    fullname = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    projects = relationship("Project", back_populates="owner")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="projects")
    documents = relationship("Document", back_populates="project")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    overall_score = Column(Integer)
    summary = Column(String)
    feedback = Column(String)
    assessment_data = Column(JSON)
    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="documents")
