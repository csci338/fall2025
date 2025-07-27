from fastapi.testclient import TestClient
from server import app  # Assuming your FastAPI app is in a file named 'main.py'

# Create a test client for the FastAPI app
client = TestClient(app)


def test_homepage_up():
    response = client.get("/")
    assert response.status_code == 200  # OK


def test_yelp_api_up():
    # should you mock it or depend on the external service?
    # "flakey tests"
    response = client.get("/data/yelp")
    assert response.status_code == 200  # OK


def test_yelp_ui_up():
    # should you mock it or depend on the external service?
    response = client.get("/ui/yelp")
    assert response.status_code == 200  # OK


# Run the tests by issuing the command: pytest on the cli (from within src)
if __name__ == "__main__":
    test_homepage_up()
    test_yelp_api_up()
    test_yelp_ui_up()
