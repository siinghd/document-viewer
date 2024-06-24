from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import crud, schemas

def seed_db(db: Session):
    user = schemas.UserCreate(
        email="user@example.com",
        fullname="First User",
        password="password"
    )
    db_user = crud.create_user(db, user)

    project = schemas.ProjectCreate(
        name="First Project"
    )
    db_project = crud.create_project(db, project, db_user.id)

    print("Database seeded successfully.")

if __name__ == "__main__":
    db = SessionLocal()
    seed_db(db)
