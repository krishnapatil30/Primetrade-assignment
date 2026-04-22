📖 Overview
A scalable Full-Stack Task Management application featuring JWT-based Authentication, Role-Based Access Control (RBAC), and a responsive React dashboard. This project is built to demonstrate secure API development, database management, and cloud-native deployment practices.

🚀 Live Access
Frontend Dashboard (Vercel): https://primetrade-assignment-gamma.vercel.app/

Backend API (Render): https://primetrade-assignment-jkwc.onrender.com/

🛠 Tech Stack
Backend: Node.js, Express.js, MongoDB (Atlas)

Frontend: React.js, Vite, Axios, Tailwind CSS

Security: JWT (JSON Web Tokens), bcrypt (password hashing), Helmet, CORS

Deployment: Vercel (Frontend), Render (Backend)

📋 Key Features
Secure Authentication: User registration and login flow utilizing encrypted JWT tokens for session management.

Role-Based Access (RBAC): Admin and User roles to restrict route access and ensure data privacy.

CRUD Operations: Full lifecycle management for tasks (Create, Read, Update, Delete) with persistent storage.

API Documentation: RESTful endpoints documented via Swagger/Postman for ease of integration.

⚙️ Development Setup
To run this project locally, ensure you have Node.js installed.

Clone the repository:

Bash
git clone https://github.com/krishnapatil30/Primetrade-assignment.git
Environment Variables: Create a .env file in the backend/ directory based on the .env.example template:

Plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
Run Services:

Backend: cd backend && npm install && npm start

Frontend: cd frontend && npm install && npm run dev

📈 Scalability Strategy
This application is architected for growth and production-readiness:

Database Optimization: Implemented indexing on userId to ensure fast query performance as the task dataset scales.

Caching: Modular structure is designed for the future integration of Redis to cache high-frequency read requests, minimizing database load.

Architectural Modularity: The separation of concerns (Controllers, Models, and Routes) allows for a seamless transition into a Microservices architecture as the feature set expands.

Developer: Krishna Dhanraj Patil

Assignment: Primetrade.ai Backend Internship Assessment
