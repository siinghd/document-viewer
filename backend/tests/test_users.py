from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def delete_test_users():
    response = client.get("/api/v1/users/")
    users = response.json()
    for user in users:
        if user["id"] != 1:
            client.delete(f"/api/v1/users/{user['id']}")

@pytest.fixture(scope="module")
def create_test_user():
    delete_test_users()
    user = {
        "email": "test@example.com",
        "fullname": "Test User",
        "password": "password"
    }
    response = client.post("/api/v1/users/", json=user)
    assert response.status_code == 200
    yield response.json()["id"]

def test_get_user(create_test_user):
    response = client.get(f"/api/v1/users/{create_test_user}")
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
    assert response.json()["fullname"] == "Test User"

def test_delete_user(create_test_user):
    response = client.delete(f"/api/v1/users/{create_test_user}")
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"
    assert response.json()["fullname"] == "Test User"

    response = client.get(f"/api/v1/users/{create_test_user}")
    assert response.status_code == 404
