from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from .routers import documents, users,projects
from .database import engine, Base
from fastapi.staticfiles import StaticFiles

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(documents.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(projects.router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.exception_handler(Exception)
async def validation_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)},
    )
