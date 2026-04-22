# Task Management System (Primetrade.ai Assignment)

## Overview
A scalable RESTful API with Role-Based Access Control (RBAC) and a React-based Admin Dashboard.

## Features
- **Auth:** JWT-based registration/login with bcrypt hashing.
- **RBAC:** Admin and User roles with protected routes.
- **CRUD:** Full management of tasks for users (Admin override).
- **Docs:** API documentation via Swagger.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React.js, Axios
- **Security:** Helmet, JWT, CORS

## Scalability Strategy
- **Caching:** Future implementation of Redis for high-frequency Task retrieval.
- **Database:** MongoDB indexing on `userId` to optimize query performance.
- **Architecture:** Modular structure facilitates future migration to microservices.