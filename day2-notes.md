## 1.What happens when user submits a form??

When a user submits a form, the browser takes the input data entered in the form fields.

This data is sent as a request to the backend server over the internet using HTTP.

The backend server receives the request and processes the data. It may check the information, store it in a database, or validate it.

After processing, the backend sends a response back to the browser.

The browser then shows the result to the user, such as a success message or an error message.

## 2. MVC vs API – Two Differences

1. Structure Difference:
MVC architecture follows Route → Controller → Model → View, where backend and frontend are tightly connected in the same system.

API-based architecture follows Frontend → API → Database → API → Frontend, where frontend and backend are separated and communicate through APIs.

2. Output Difference:
MVC directly returns a View (UI page) to the user.

API returns data in JSON format, which can be used by mobile apps, web apps, or other systems.


## 3. Simple Architecture Diagram

Browser
   ↓
Backend
   ↓
Database
   ↓
Backend
   ↓
Browser


## 4. What is MVC?

MVC stands for Model-View-Controller. It is a software architecture pattern where:
- Model handles data and database operations.
- View handles the user interface.
- Controller handles the application logic and user requests.


## 5. What is API?

API (Application Programming Interface) is a bridge between the frontend and backend. It allows applications to send and receive data. APIs usually exchange data in JSON format.

## 6. Real-Life Example – Login Form

When a user enters a username and password and clicks Login, the data is sent to the backend. The backend checks the credentials in the database and returns a success or error response.
