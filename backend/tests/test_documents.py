from fastapi.testclient import TestClient
from app.main import app
import os
import pytest

client = TestClient(app)

def delete_test_users_and_documents():
    response = client.get("/api/v1/users/")
    users = response.json()
    for user in users:
        if user["projects"]:
            for project in user["projects"]:
                if project["documents"]:
                    for document in project["documents"]:
                        client.delete(f"/api/v1/documents/{document['id']}")
        if user["id"] != 1:
            user_id = user["id"]
            client.delete(f"/api/v1/users/{user_id}")

@pytest.fixture(scope="module")
def create_test_user_and_project():
    delete_test_users_and_documents()
    user = {
        "email": "upload_test@example.com",
        "fullname": "Upload Test User",
        "password": "password"
    }
    response = client.post("/api/v1/users/", json=user)
    assert response.status_code == 200
    user_id = response.json()["id"]

    project = {
        "name": "Test Project"
    }
    response = client.post(f"/api/v1/projects/{user_id}/", json=project)
    assert response.status_code == 200
    project_id = response.json()["id"]

    return user_id, project_id

def test_upload_document(create_test_user_and_project):
    user_id, project_id = create_test_user_and_project
    with open("test.pdf", "rb") as f:
        response = client.post(f"/api/v1/documents/upload/{project_id}/", files={"file": ("test.pdf", f, "application/pdf")})
        assert response.status_code == 200
        assert response.json()["name"] == "upload_test@example.com_test.pdf"

def test_get_document(create_test_user_and_project):
    response = client.get("/api/v1/documents/1")
    assert response.status_code == 200
    assert response.json()["name"] == "upload_test@example.com_test.pdf"
    assert response.json()["overall_score"] == 40
    assert response.json()["summary"] == "Document summary here"
    assert response.json()["feedback"] == "Our feedback here"
    assert response.json()["assessment_data"]["criteria_1"]["score"] == 35

def test_get_document_file(create_test_user_and_project):
    response = client.get("/api/v1/documents/1/file")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"

def test_list_documents(create_test_user_and_project):
    response = client.get("/api/v1/documents/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_delete_document(create_test_user_and_project):
    response = client.delete("/api/v1/documents/1")
    assert response.status_code == 200
    assert response.json()["name"] == "upload_test@example.com_test.pdf"

    response = client.get("/api/v1/documents/1")
    assert response.status_code == 404
