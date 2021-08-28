import requests
import unittest


class TestRoutes(unittest.TestCase):
    def test_fetch_case_details(self):
        print("running fetch user details test...")
        url = "http://localhost:5000/case_details"
        success = None
        case_id = {"case_id": 0}
        response = requests.get(url, params=case_id)
        success = response.json()["success"]
        data = response.json()["data"]
        print(data)
        code = response.status_code
        self.assertTrue(code == 200, "Correct status code received.")
        self.assertTrue(success == True, "Success equals true.")

    def test_fetch_case_data(self):
        url = "http://localhost:5000/case_data"
        success = None
        response = requests.get(url)
        success = response.json()["success"]
        data = response.json()["data"]
        print(data)
        code = response.status_code
        self.assertTrue(code == 200, "Correct status code received.")
        self.assertTrue(success == True, "Success equals true.")

    def test_create_user_endpoint(self):
        url = "http://localhost:5000/user/create"
        data = {"username": "john_doe1234", "first_name": "john", "last_name": "doe"}
        response = requests.post(url=url, json=data)
        success = response.json()["success"]
        code = response.status_code
        self.assertTrue(code == 200, "Correct status code received.")
        self.assertTrue(success == True, "Success equals true.")


if __name__ == "__main__":
    unittest.main()
