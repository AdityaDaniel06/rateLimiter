Simple rate limiter MERN application.

SETUP LOCALLY
1) Clone respository
2) install dependancies
Create a .env file in the backend directory and add:
PORT=8000

-----------------------------------------------------------
APP TESTING

Using POSTMAN
curl -X GET http://127.0.0.1:8000/api/v1/user-data

Using Browser
Open the frontend in http://localhost:3000.
Set the number of requests and click Send Requests.
If you exceed the limit, you should see a 429 Too Many Requests status.
