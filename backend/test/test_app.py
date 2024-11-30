import pytest # type: ignore
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_login_success(client, mocker):
    """Test successful login."""
    # Mock the authenticate_user function to return a successful response
    mocker.patch("services.mosip.authenticate_user", return_value={
        "authStatus": True,  # Endpoint expects this field for success
        "authToken": "valid_token"
    })

    # Send a POST request to the /auth/login endpoint
    response = client.post("/auth/login", json={
        "misp_license_key": "test_key",
        "auth_partner_id": "test_partner",
        "partner_api_key": "test_api_key",
        "individual_id": "1234567890"
    })

    assert response.status_code == 200
    assert response.json["message"] == "Authentication successful"


def test_login_failure(client, mocker):
    """Test failed login."""
    # Mock the authenticate_user function to return a failure response
    mocker.patch("services.mosip.authenticate_user", return_value={
        "authStatus": False,  # Endpoint expects this field for failure
        "errors": [{"errorCode": "INVALID_ID", "errorMessage": "Invalid ID"}]
    })

    # Send a POST request to the /auth/login endpoint with invalid credentials
    response = client.post("/auth/login", json={
        "misp_license_key": "test_key",
        "auth_partner_id": "test_partner",
        "partner_api_key": "test_api_key",
        "individual_id": "invalid_id"
    })

    assert response.status_code == 401
    assert response.json["error"] == "Authentication failed"