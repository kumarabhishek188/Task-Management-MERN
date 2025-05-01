```markdown
# Task Management - MERN

A full-stack Task Management application built with the MERN (MongoDB, Express, React, Node.js) stack. This app allows users to create, read, update, and delete tasks, manage their status, and organize tasks into categories.

---

## 📋 Table of Contents

- Features
- Demo
- Tech Stack
- Folder Structure
- Installation
- Usage
- API Endpoints
- Environment Variables
- Contact

---

## 🚀 Features

- User authentication with JWT (signup, login)
- Create, Read, Update, Delete (CRUD) operations for tasks
- Mark tasks as completed or pending
- Filter tasks by status or category
- Responsive UI built with React and Tailwind CSS
- RESTful API powered by Express and Node.js
- MongoDB for data storage

---

## 🌐 Demo

Live demo: [Your Live Demo URL]

---

## 🛠️ Tech Stack

- Frontend: React, Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT

---

## 📁 Folder Structure

Task-Management-MERN/
  client/               # React frontend
    public/           # Static files
    src/              # React components & assets
      components/   # Shared UI components
      pages/        # Page views
      services/     # API service calls
      App.js
      index.js
  server/               # Express backend
    models/           # Mongoose models
    routes/           # API routes
    utils/            # Utility functions & middleware
    index.js          # App entry point
  .gitignore
  package.json          # Root scripts & dependencies
  README.md             # Project overview

---

## ⚙️ Installation

1. Clone the repository:
   git clone https://github.com/kumarabhishek188/Task-Management-MERN.git
   cd Task-Management-MERN

2. Install backend dependencies:
   cd server
   npm install

3. Install frontend dependencies:
   cd ../client
   npm install

---

## 🧪 Usage

1. Start the backend server:
   cd server
   node index.js
   The server will run on http://localhost:5100.

2. Start the React app:
   cd client
   npm start
   The frontend will run on http://localhost:3000.

3. Access the app:
   Open your browser at http://localhost:3000.

---

## 📡 API Endpoints

Method  Endpoint             Description
GET     /api/tasks         Get all tasks
GET     /api/tasks/:id     Get task by ID
POST    /api/tasks         Create a new task
PUT     /api/tasks/:id     Update an existing task
DELETE  /api/tasks/:id     Delete a task
POST    /api/auth/signup   Register a new user
POST    /api/auth/login    Authenticate a user & get JWT

---

## 🔐 Environment Variables

Backend (server/.env):
  PORT=5100
  ACCESS_TOKEN_SECRET=your_access_token_secret
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  DATABASE_URL=mongodb://localhost:27017/mern-task-management
  FRONTEND_URL=http://localhost:3000

Frontend (client/.env):
REACT_APP_BASE_API_URL=http://localhost:5100

---

## 📬 Contact

- Email: abhishekkumarada12@gmail.com
- LinkedIn: https://www.linkedin.com/in/abhishek-kumar-92157823a/

---

Feel free to reach out for any questions or collaboration opportunities!
```

