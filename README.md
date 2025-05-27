# BiteSpeed Identity Reconciliation API

This project is a solution to BiteSpeed's **identity reconciliation** challenge. It identifies and links user contacts based on their email and/or phone number, returning a unified structure of linked contacts.

### 🔗 Live API URL  
👉 *(Replace with your actual deployed backend URL)*

---

## 🧩 Problem Overview

The system stores contact information such as emails and phone numbers. When a new contact is submitted via an API request, the system checks for existing contacts with matching details and links them together using a **primary/secondary contact model**.

---

## 📦 Features

- Accepts `email` and/or `phoneNumber` in a POST request
- Checks for existing matches in the MySQL database
- Maintains a single `primary` contact and links others as `secondary`
- Returns a structured identity response

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Deployment:** Render
- **Other Tools:** dotenv, CORS

---

🚀 Running Locally (for developers)
1.Clone the repository:
git clone https://github.com/DusaDeepika/bitespeed-backend.git
cd bitespeed-backend

2.Install dependencies:
npm install

3.Create a .env file:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=bitespeed
PORT=8000

4.Start the server:
npm start
Server will start on:
http://localhost:8000


## 📨 API Usage

### POST `/identify`

🔸 Request Body
```json

{
  "email": "deepika@example.com",
  "phoneNumber": "9876543210"
}
```
🔸 Response Body
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["deepika@example.com"],
    "phoneNumbers": ["9876543210"],
    "secondaryContactIds": []
  }
}
