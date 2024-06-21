from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

@pytest.fixture(scope="module")
def create_test_user():
    user = {
        "email": "project_test@example.com",
        "fullname": "Project Test User",
        "password": "password"
    }
    response = client.post("/api/v1/users/", json=user)
    assert response.status_code == 200
    yield response.json()["id"]

def test_create_project(create_test_user):
    project = {
        "name": "Test Project"
    }
    response = client.post(f"/api/v1/projects/{create_test_user}/", json=project)
    assert response.status_code == 200
    assert response.json()["name"] == "Test Project"

def test_get_project():
    response = client.get("/api/v1/projects/1")
    assert response.status_code == 200
    assert response.json()["name"] == "Test Project"

def test_list_projects():
    response = client.get("/api/v1/projects/")
    assert response.status_code == 200
    assert len(response.json()) > 0
